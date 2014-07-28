package models

// Wiki has many pages
type Wiki struct {
	Id   int64
	Name string `sql:"unique"`

	Pages []Page
}
