package models

// Wiki has many pages
type Wiki struct {
	Id   int64
	Name string `sql:"not null;unique"`

	Pages []Page
}
