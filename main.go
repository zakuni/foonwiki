package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/zakuni/foon/models"
)

var db gorm.DB

func handler(w http.ResponseWriter, r *http.Request) {
	re := regexp.MustCompile("^/([^/]*)/?([^/]*)$")
	params := re.FindStringSubmatch(r.URL.Path)
	wikiName := params[1]
	pageName := params[2]

	if wikiName == "" {
		t, _ := template.ParseFiles("index.html")
		t.Execute(w, nil)
	} else if pageName == "" {
		var wiki models.Wiki
		var count int64
		db.Table("wikis").Count(&count)
		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		p := &models.Page{Name: wikiName, Body: strconv.FormatInt(count, 10)}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, p)
	} else {
		var wiki models.Wiki
		var page models.Page
		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.FirstOrCreate(&page, models.Page{Name: pageName, WikiId: wiki.Id})
		page = models.Page{Name: pageName, Body: ""}
		t, _ := template.ParseFiles("page.html")
		t.Execute(w, page)
	}
}

func initDb() gorm.DB {
	db, err := gorm.Open("postgres", "user=zakuni dbname=foon sslmode=disable")
	checkErr(err, "sql.Open failed")
	db.DB()

	db.AutoMigrate(models.Wiki{})
	db.AutoMigrate(models.Page{})

	return db
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func main() {
	db = initDb()
	defer db.Close()

	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
