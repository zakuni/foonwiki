package models

// Page is the main content of wiki
type Page struct {
	Id     int64
	Name   string
	Body   string
	WikiId int64
}

// NewPage creates new Page
func NewPage(name, body string, wikiid int64) Page {
	return Page{
		Name:   name,
		Body:   body,
		WikiId: wikiid,
	}
}
