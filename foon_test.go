package main

import (
	"testing"
)

func TestNewPage(t *testing.T) {
	page := newPage("", "")
	if page.Title != "" {
		t.Fail()
	}
}
