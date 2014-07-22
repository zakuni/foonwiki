package main

import (
  "html/template"
	"net/http"
	"os"
)

type Page struct {
  Title string
  Body string
}

func handler(w http.ResponseWriter, r *http.Request) {
  t, _ :=  template.ParseFiles("index.html")
  t.Execute(w, nil)
}

func pageHandler(w http.ResponseWriter, r *http.Request) {
  t, _ := template.ParseFiles("page.html")
  title := r.URL.Path[len("/pages/"):]
  p := &Page{Title: title, Body: ""}
  t.Execute(w, p)
}

func main() {
	http.HandleFunc("/", handler)
  http.HandleFunc("/pages/", pageHandler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
