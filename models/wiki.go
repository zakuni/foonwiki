package models

// Wiki has many pages
type Wiki struct {
	Id   int64
	Name string `sql:"not null;unique"`

	Pages []Page
}

// NewWiki creates new Wiki
func NewWiki(name string) Wiki {
	return Wiki{
		Name: name,
	}
}
