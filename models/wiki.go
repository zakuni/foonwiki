package models

// Wiki has many pages
type Wiki struct {
	ID    int64 `db:"wiki_id"`
	Title string
}
