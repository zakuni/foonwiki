React = require 'react'

PageForm = React.createClass
  propTypes:
    pageId: React.PropTypes.string
    onPageSubmit: React.PropTypes.func.isRequired
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onPageSubmit()
  render: ->
    pageId = @props.pageId
    <form id="contents" action={if pageId then "/pages/#{pageId}" else "/pages/"} method="PUT" onSubmit={@handleSubmit}></form>

module.exports = PageForm
