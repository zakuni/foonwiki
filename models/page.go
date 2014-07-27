package models

// Page is the main content of wiki
type Page struct {
	ID     int64 `db:"page_id"`
	Title  string
	Body   string
	WikiID int64
}
