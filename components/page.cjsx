React = require 'react'
Page = require ('./models/page')
`
var PageApp = new Backbone.Marionette.Application();

PageApp.model = new Page();
`
PageApp.commands.setHandler("postContents", () ->
  ce = $("<pre />").html($("#content").children().first().children().first().html())
  if($.browser.webkit)
    ce.find("div").replaceWith(() -> return "\n" + this.innerHTML)
  if($.browser.msie)
    ce.find("p").replaceWith(() -> return this.innerHTML + "<br>")
  if($.browser.mozilla || $.browser.opera ||$.browser.msie )
    ce.find("br").replaceWith("\n")

  PageApp.model.set({
    name: $("#pagenameinput").val()
    content: ce.text()
  })
  PageApp.model.url = () -> return $("#contents").attr("action")
  PageApp.model.save()
)
`
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

App = React.createClass(
  render: ->
    <div>
      <PageTitle />
      <div className="row">
        <PageContent />
      </div>
    </div>
)

PageTitle = React.createClass(
  getInitialState: ->
    {title: page.name}
  render: ->
    return (
      <div className="row">
        <div className="small-12 column">
          <section id="pagetitle" className="pagetitle">
            <h3 id="pagename" className="pageTitle border-dotted cursor-text" placeholder="no title">
              {this.state.title}
            </h3>
            <form id="pagenameform" className="pagename hide">
              <input id="pagenameinput" className="border-dotted" type="text" placeholder="no title" defaultValue={this.state.title} />
            </form>
          </section>
        </div>
      </div>
    )
)

PageContent = React.createClass(
  getInitialState: ->
    {content: page.content}
  componentDidMount: ->
    @focus()
    document.body.addEventListener('click', @focus)
  componentWillUnmount: ->
    document.body.removeEventListener('click', @focus)
  focus: ->
    @refs.content.getDOMNode().focus()
  handlePageSubmit: ->
    ce = $("<pre />").html(React.findDOMNode(@refs.content).innerHTML)
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
    style = {
      whiteSpace: 'pre'
      marginBottom: '20px'
    }
    return (
      <div className="small-12 column">
        <div className="editable cursor-text" contentEditable="true" style={style} ref="content">{this.state.content}</div>
        <PageForm onPageSubmit={@handlePageSubmit} />
      </div>
    )
)

PageForm = React.createClass(
  propTypes:
    onPageSubmit: React.PropTypes.func.isRequired
  handleSubmit: (e) ->
    e.preventDefault()
    @props.onPageSubmit()
  render: ->
    <form id="contents" action={if page.id then "/pages/#{page.id}" else "/pages/"} method="POST" onSubmit={@handleSubmit}>
      <input type="submit" value="save" />
    </form>
)

module.exports = PageContent
