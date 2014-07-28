package models

// Page is the main content of wiki
type Page struct {
	Id      int64
	Name    string
	Content string
	WikiId  int64
}
