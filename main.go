package main

import (
	"flag"
	"net/http"

	"github.com/go-martini/martini"
	"github.com/golang/glog"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/martini-contrib/render"
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
	m.Use(render.Renderer())

	m.Get("/", func(r render.Render) {
		r.HTML(200, "index", nil)
	})

	m.Get("/:wiki", func(w http.ResponseWriter, params martini.Params, r render.Render) {
		var wiki models.Wiki
		var pages []models.Page
		wikiName := params["wiki"]

		db.Where(models.Wiki{Name: wikiName}).FirstOrInit(&wiki)
		db.Model(&wiki).Related(&pages)
		wiki.Pages = pages

		r.HTML(200, "wiki", wiki)
	})

	m.Get("/:wiki/:page", func(w http.ResponseWriter, params martini.Params, r render.Render) {
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

		r.HTML(200, "page", page)
	})

	m.Post("/:wiki/:page", func(w http.ResponseWriter, req *http.Request, params martini.Params, r render.Render) {
		var wiki models.Wiki
		var page models.Page
		wikiName := params["wiki"]
		pageName := params["page"]

		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.FirstOrCreate(&page, models.Page{Name: pageName, WikiId: wiki.Id})
		page.Content = req.FormValue("content")
		db.Save(&page)

		r.HTML(200, "page", page)
	})

	m.Run()
}
