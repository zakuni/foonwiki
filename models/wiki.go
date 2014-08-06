package models

import (
	"time"
)

// Wiki has many pages
type Wiki struct {
	Id   int64
	Name string `sql:"unique"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Pages []Page
}
