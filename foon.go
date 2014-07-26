package main

import (
  "database/sql"
  "html/template"
  "log"
	"net/http"
	"os"
  "regexp"
  "github.com/coopernurse/gorp"
  _ "github.com/lib/pq"
)

type Page struct {
  Id int64 `db:"post_id"`
  Title string
  Body string
}

func handler(w http.ResponseWriter, r *http.Request) {
  re := regexp.MustCompile("^/([^/]*)/?([^/]*)$")
  params := re.FindStringSubmatch(r.URL.Path)
  wiki := params[1]
  page := params[2]
  if params[1] == "" {
    t, _ :=  template.ParseFiles("index.html")
    t.Execute(w, nil)
  } else if params[2] == "" {
    p := &Page{Title: wiki, Body: ""}
    t, _ := template.ParseFiles("page.html")
    t.Execute(w, p)
  } else {
    p := &Page{Title: page, Body: ""}
    t, _ := template.ParseFiles("page.html")
    t.Execute(w, p)
  }
}

func initDb() *gorp.DbMap {
  db, err := sql.Open("postgres", "user=zakuni dbname=foon sslmode=disable")
  checkErr(err, "sql.Open failed")

  dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}

  dbmap.AddTableWithName(Page{}, "posts").SetKeys(true, "Id")

  err = dbmap.CreateTablesIfNotExists()
  checkErr(err, "Create tables failed")

  return dbmap
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
  dbmap := initDb()
  defer dbmap.Db.Close()

  p1 := newPage("Hoge", "hogehoge-")
  err := dbmap.Insert(&p1)
  checkErr(err, "Insert failed")

  count, err := dbmap.SelectInt("select count(*) from posts")
  checkErr(err, "select count(*) failed")
  log.Println(count, "pages")

	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
