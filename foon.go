package main

import (
  "html/template"
	"net/http"
	"os"
  "regexp"
)

type Page struct {
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

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
