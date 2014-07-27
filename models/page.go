package models

// Page is the main content of wiki
type Page struct {
	ID     int64 `db:"page_id"`
	Title  string
	Body   string
	WikiID int64
}

// NewPage creates new Page
func NewPage(title, body string, wikiid int64) Page {
	return Page{
		Title:  title,
		Body:   body,
		WikiID: wikiid,
	}
}
