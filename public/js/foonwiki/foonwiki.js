var PageApp = new Backbone.Marionette.Application();

PageApp.commands.setHandler("postContents", function(){
  var ce = $("<pre />").html($("#content").html());
  if($.browser.webkit)
    ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
  if($.browser.msie)
    ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
  if($.browser.mozilla || $.browser.opera ||$.browser.msie )
    ce.find("br").replaceWith("\n");

  page = new Page({
    name: $("#pagenameinput").val(),
    content: ce.text()
  });
  page.url = function(){ return $("#contents").attr("action"); };
  page.save();
});

PageApp.addRegions({
  titleRegion: "#pagetitle",
  contentRegion: "#content"
});

var Page = Backbone.Model.extend({
  urlRoot: '/pages',

  initialize: function(){
    this.on("change:name", function(){
      localStorage.setItem("recentPages", JSON.stringify(this));
    });
  }
});

$("#pagenameform").submit(function(e){
  PageApp.execute("postContents");
  $("#pagename").text($("#pagenameinput").val());
  $("#pagename").show();
  $("#pagenameform").hide();
  return false;
});

$("#contents").submit(function(e){
  PageApp.execute("postContents");
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

  modelNameChanged: function(model, value){
    this.$el.html(value);
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

$(function (){
  var recentPage = localStorage.getItem("recentPages");
  if(recentPage !== null){
    $("#seen ul").append("<li><a href='/?id='>"+JSON.parse(recentPage).name+"</a></li>");
  }

  PageApp.titleRegion.attachView(new PageNameView({
    model: new Page()
  }));
  PageApp.titleRegion.attachView(new PageNameFormView());
  var pageContentView = new PageContentView();
  pageContentView.focus();
  PageApp.contentRegion.attachView(pageContentView);

  $("body").click(function(){
    pageContentView.focus();
  });
});
