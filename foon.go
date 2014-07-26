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
)

var dbmap *gorp.DbMap

// Wiki has many pages
type Wiki struct {
	ID    int64 `db:"wiki_id"`
	Title string
}

// Page is the main content of wiki
type Page struct {
	ID     int64 `db:"post_id"`
	Title  string
	Body   string
	WikiID int64
}

func handler(w http.ResponseWriter, r *http.Request) {
	re := regexp.MustCompile("^/([^/]*)/?([^/]*)$")
	params := re.FindStringSubmatch(r.URL.Path)
	wiki := params[1]
	page := params[2]

	if wiki == "" {
		t, _ := template.ParseFiles("index.html")
		t.Execute(w, nil)
	} else if page == "" {
		var wikiData Wiki
		count, err := dbmap.SelectInt("select count(*) from wikis")
		checkErr(err, "count failed")
		err = dbmap.SelectOne(&wikiData, "select * from wikis where title = $1", wiki)

		if wikiData.ID == 0 {
			w1 := newWiki(wiki)
			err = dbmap.Insert(&w1)
			checkErr(err, "Insert failed")
		}

		count, err = dbmap.SelectInt("select count(*) from posts")
		checkErr(err, "select count(*) failed")

		p := &Page{Title: wiki, Body: strconv.FormatInt(count, 10)}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, p)
	} else {
		p1 := newPage(page, "")
		err := dbmap.Insert(&p1)
		checkErr(err, "Insert failed")

		p := &Page{Title: page, Body: ""}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, p)
	}
}

func initDb() *gorp.DbMap {
	db, err := sql.Open("postgres", "user=zakuni dbname=foon sslmode=disable")
	checkErr(err, "sql.Open failed")

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	dbmap.AddTableWithName(Wiki{}, "wikis").SetKeys(true, "ID")
	dbmap.AddTableWithName(Page{}, "posts").SetKeys(true, "ID")

	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")

	return dbmap
}

func newWiki(title string) Wiki {
	return Wiki{
		Title: title,
	}
}

func newPage(title, body string) Page {
	return Page{
		Title: title,
		Body:  body,
	}
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
