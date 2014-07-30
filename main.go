package main

import (
	"flag"
	"html/template"
	"net/http"
	"os"
	"regexp"

	"github.com/golang/glog"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/zakuni/foon/models"
)

var db gorm.DB

func handler(w http.ResponseWriter, r *http.Request) {
	glog.Info(r.URL.Path)
	re := regexp.MustCompile("^/([^/]*)/?([^/]*)$")
	params := re.FindStringSubmatch(r.URL.Path)
	wikiName := params[1]
	pageName := params[2]

	if wikiName == "" {
		t, _ := template.ParseFiles("index.html")
		t.Execute(w, nil)
	} else if pageName == "" {
		var wiki models.Wiki
		var pages []models.Page

		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.Model(&wiki).Related(&pages)
		wiki.Pages = pages

		t, _ := template.ParseFiles("wiki.html")
		t.Execute(w, wiki)
	} else {
		var wiki models.Wiki
		var page models.Page

		db.FirstOrCreate(&wiki, models.Wiki{Name: wikiName})
		db.FirstOrCreate(&page, models.Page{Name: pageName, WikiId: wiki.Id})
		page = models.Page{Name: pageName, Content: ""}

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
		glog.Fatalln(msg, err)
	}
}

func main() {
	// necessary for glog
	flag.Parse()

	db = initDb()
	defer db.Close()

	glog.Infoln("start listening at port", os.Getenv("PORT"))
	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
