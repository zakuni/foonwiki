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
	m.Use(render.Renderer(render.Options{
		Layout: "layout",
	}))

	m.Get("/", func(r render.Render) {
		var newPages []models.Page
		var updatedPages []models.Page
		db.Limit(5).Order("created_at").Find(&newPages)
		db.Limit(5).Order("updated_at").Find(&updatedPages)
		s := struct {
			Title        string
			NewPages     []models.Page
			UpdatedPages []models.Page
		}{
			"FoonWiki",
			newPages,
			updatedPages,
		}
		r.HTML(200, "index", s)
	})

	m.Get("/:wiki", func(w http.ResponseWriter, params martini.Params, r render.Render) {
		var wiki models.Wiki
		var pages []models.Page
		wikiName := params["wiki"]

		db.Where(models.Wiki{Name: wikiName}).FirstOrInit(&wiki)
		db.Model(&wiki).Related(&pages)
		wiki.Pages = pages

		s := struct {
			Title string
			Wiki  models.Wiki
		}{
			wikiName,
			wiki,
		}
		r.HTML(200, "wiki", s)
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

		s := struct {
			Title    string
			WikiName string
			Page     models.Page
		}{
			wikiName + "/" + pageName,
			wikiName,
			page,
		}
		r.HTML(200, "page", s)
	})

	m.Post("/:wiki/:page", func(w http.ResponseWriter, req *http.Request, params martini.Params, r render.Render) {
		var wiki models.Wiki
		var page models.Page
		wikiName := params["wiki"]
		pageName := params["page"]

		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.FirstOrCreate(&page, models.Page{
			Name:   pageName,
			WikiId: wiki.Id,
		})
		page.Content = req.FormValue("content")
		page.Wiki = wiki
		db.Save(&page)

		s := struct {
			Title    string
			WikiName string
			Page     models.Page
		}{
			wikiName + "/" + pageName,
			wikiName,
			page,
		}
		r.HTML(200, "page", s)
	})

	m.Run()
}
