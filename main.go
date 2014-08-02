package main

import (
	"flag"
	"html/template"
	"net/http"

	"github.com/go-martini/martini"
	"github.com/golang/glog"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/zakuni/foon/models"
)

var db gorm.DB

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
		glog.Fatalln(msg, err)
	}
}

func main() {
	// necessary for glog
	flag.Parse()

	db = initDb()
	defer db.Close()

	m := martini.Classic()

	m.Get("/", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.ParseFiles("index.html")
		t.Execute(w, nil)
	})

	m.Get("/:wiki", func(w http.ResponseWriter, r *http.Request, params martini.Params) {
		var wiki models.Wiki
		var pages []models.Page
		wikiName := params["wiki"]

		db.FirstOrInit(&wiki, models.Wiki{Name: wikiName})
		db.Model(&wiki).Related(&pages)
		wiki.Pages = pages

		t, _ := template.ParseFiles("wiki.html")
		t.Execute(w, wiki)
	})

	m.Get("/:wiki/:page", func(w http.ResponseWriter, r *http.Request, params martini.Params) {
		var wiki models.Wiki
		var page models.Page
		wikiName := params["wiki"]
		pageName := params["page"]

		db.Where(models.Wiki{Name: wikiName}).FirstOrInit(&wiki)
		if !db.NewRecord(wiki) {
			db.Where(models.Page{Name: pageName, WikiId: wiki.Id}).FirstOrInit(&page)
		} else {
			page.Name = pageName
		}

		t, _ := template.ParseFiles("page.html")
		t.Execute(w, page)
	})

	m.Post("/:wiki/:page", func(w http.ResponseWriter, r *http.Request, params martini.Params) {
		var wiki models.Wiki
		var page models.Page
		wikiName := params["wiki"]
		pageName := params["page"]

		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.FirstOrCreate(&page, models.Page{Name: pageName, WikiId: wiki.Id})
		page.Content = r.FormValue("content")
		db.Save(&page)

		t, _ := template.ParseFiles("page.html")
		t.Execute(w, page)
	})

	m.Run()
}
