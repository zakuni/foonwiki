package main

import (
	"fmt"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is FoonWiki.")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
