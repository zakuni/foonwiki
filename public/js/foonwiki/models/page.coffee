class Page extends Backbone.Model
  urlRoot: '/pages'

  initialize: ->
    this.on "change:name", ->
      localStorage.setItem "recentPages", JSON.stringify(this)
