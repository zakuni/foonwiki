package main

import (
  "html/template"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
  t, _ :=  template.ParseFiles("index.html")
  t.Execute(w, nil)
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
