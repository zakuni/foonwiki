package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"

	"github.com/coopernurse/gorp"
	_ "github.com/lib/pq"

	"github.com/zakuni/foon/models"
)

var dbmap *gorp.DbMap

func handler(w http.ResponseWriter, r *http.Request) {
	re := regexp.MustCompile("^/([^/]*)/?([^/]*)$")
	params := re.FindStringSubmatch(r.URL.Path)
	wiki := params[1]
	page := params[2]

	if wiki == "" {
		t, _ := template.ParseFiles("index.html")
		t.Execute(w, nil)
	} else if page == "" {
		var wikiData models.Wiki
		count, err := dbmap.SelectInt("select count(*) from wikis")
		checkErr(err, "count failed")

		err = dbmap.SelectOne(&wikiData, "select * from wikis where title = $1", wiki)
		if err != nil {
			log.Println(err)
		}
		if wikiData.ID == 0 {
			wikiData := models.NewWiki(wiki)
			err = dbmap.Insert(&wikiData)
			checkErr(err, "Insert failed")
		}

		count, err = dbmap.SelectInt("select count(*) from pages")
		checkErr(err, "select count(*) failed")

		p := &models.Page{Title: wiki, Body: strconv.FormatInt(count, 10)}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, p)
	} else {
		var wikiData models.Wiki
		err := dbmap.SelectOne(&wikiData, "select * from wikis where title = $1", wiki)
		if err != nil {
			log.Println(err)
		}

		if wikiData.ID == 0 {
			wikiData = models.NewWiki(wiki)
			err = dbmap.Insert(&wikiData)
			checkErr(err, "Insert failed")
		}

		p1 := models.NewPage(page, "", wikiData.ID)
		err = dbmap.Insert(&p1)
		checkErr(err, "Insert failed")

		p := &models.Page{Title: page, Body: ""}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, p)
	}
}

func initDb() *gorp.DbMap {
	db, err := sql.Open("postgres", "user=zakuni dbname=foon sslmode=disable")
	checkErr(err, "sql.Open failed")

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	wikistable := dbmap.AddTableWithName(models.Wiki{}, "wikis").SetKeys(true, "ID")
	wikistable.ColMap("Title").SetUnique(true).SetNotNull(true)

	pagestable := dbmap.AddTableWithName(models.Page{}, "pages").SetKeys(true, "ID")
	pagestable.ColMap("Title").SetNotNull(true)

	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")

	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func main() {
	dbmap = initDb()
	defer dbmap.Db.Close()

	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
