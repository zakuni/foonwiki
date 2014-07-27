package models

import (
  "testing"
)

func TestNewWiki(t *testing.T) {
  wiki := NewWiki("")
  if wiki.Title != "" {
    t.Fail()
  }
}
