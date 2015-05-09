React = require 'react'
Page = require ('./models/page')
`
var PageApp = new Backbone.Marionette.Application();

PageApp.model = new Page();

PageApp.addRegions({
  titleRegion: "#pagetitle",
  contentRegion: "#content"
});

$("#pagenameform").submit(function(e){
  PageApp.execute("postContents");
  $("#pagename").text(PageApp.model.escape("name"));
  $("#pagename").show();
  $("#pagenameform").hide();
  return false;
});

var PageNameView = Marionette.ItemView.extend({
  el: '#pagename',

  template: false,

  initialize: function(){
    this.model.set("name", $("#pagenameinput").val());
    this.listenTo(this.model, "change:name", this.modelNameChanged);
  },

  events: {
    'click': 'showPageForm'
  },

  modelNameChanged: function(model){
    this.$el.html(model.escape("name"));
  },

  showPageForm: function(){
    this.$el.hide();
    var that = this;
    $("#pagenameform").show().focusout(function(){
      that.model.set("name", $("#pagenameinput").val());
      $("#pagenameform").hide();
      that.$el.show();
    }).click(function(){ return false; });
    setTimeout(function(){
      $("#pagenameinput").focus();
    }, 0);
  }
});

var PageNameFormView = Marionette.ItemView.extend({
  el: '#pagenameform',

  template: false
});

var PageContentView = Marionette.ItemView.extend({
  el: '#content',

  template: false,

  focus: function() {
    this.$el.focus();
  }
});
`

$ ->
  recentPage = localStorage.getItem("recentPages")
  if recentPage?
    $("#seen ul")
      .append $("<li></li>")
      .append $("<a></a>")
      .text(JSON.parse(recentPage).name)

  PageApp.titleRegion.attachView(new PageNameView(
    model: new Page()
  ))
  PageApp.titleRegion.attachView(new PageNameFormView())
  pageContentView = new PageContentView()
  pageContentView.focus()
  PageApp.contentRegion.attachView(pageContentView)

  $("body").click ->
    pageContentView.focus()

PageTitle = React.createClass(
  getInitialState: ->
    {title: page.name}
  render: ->
    return (
      <h3 className="pageTitle border-dotted cursor-text">
        {this.state.title}
      </h3>
    )
)

PageContent = React.createClass(
  getInitialState: ->
    {content: page.content}
  render: ->
    style = {
      whiteSpace: 'pre'
      marginBottom: '20px'
    }
    return (
      <div>
        <div style={style}>{this.state.content}</div>
        <PageForm />
      </div>
    )
)

PageForm = React.createClass(
  handleSubmit: (e) ->
    e.preventDefault()
    ce = $("<pre />").html($("#content").children().first().children().first().html())
    if($.browser.webkit)
      ce.find("div").replaceWith(()-> return "\n" + this.innerHTML)
    if($.browser.msie)
      ce.find("p").replaceWith(()-> return this.innerHTML + "<br>")
    if($.browser.mozilla || $.browser.opera ||$.browser.msie )
      ce.find("br").replaceWith("\n")

    PageApp.model.set({
      name: $("#pagenameinput").val(),
      content: ce.text()
    })
    PageApp.model.url = ()-> return $("#contents").attr("action")
    PageApp.model.save()
  render: ->
    <form id="contents" action={if page.id then "/pages/#{page.id}" else "/pages/"} method="POST" onSubmit={this.handleSubmit}>
      <input type="submit" value="save" />
    </form>
)

module.exports = PageContent
