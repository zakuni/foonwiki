package models

import (
  "testing"
)

func TestNewPage(t *testing.T) {
  page := NewPage("", "", 0)
  if page.Title != "" {
    t.Fail()
  }
}
