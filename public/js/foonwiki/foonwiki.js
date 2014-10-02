(function() {
  var Page,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Page = (function(_super) {
    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.urlRoot = '/pages';

    Page.prototype.initialize = function() {
      return this.on("change:name", function() {
        return localStorage.setItem("recentPages", JSON.stringify(this));
      });
    };

    return Page;

  })(Backbone.Model);

  
var PageApp = new Backbone.Marionette.Application();

PageApp.model = new Page();

PageApp.commands.setHandler("postContents", function(){
  var ce = $("<pre />").html($("#content").html());
  if($.browser.webkit)
    ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
  if($.browser.msie)
    ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
  if($.browser.mozilla || $.browser.opera ||$.browser.msie )
    ce.find("br").replaceWith("\n");

  PageApp.model.set({
    name: $("#pagenameinput").val(),
    content: ce.text()
  });
  PageApp.model.url = function(){ return $("#contents").attr("action"); };
  PageApp.model.save();
});

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
;

  $(function() {
    var pageContentView, recentPage;
    recentPage = localStorage.getItem("recentPages");
    if (recentPage != null) {
      $("#seen ul").append($("<li></li>")).append($("<a></a>")).text(JSON.parse(recentPage).name);
    }
    PageApp.titleRegion.attachView(new PageNameView({
      model: new Page()
    }));
    PageApp.titleRegion.attachView(new PageNameFormView());
    pageContentView = new PageContentView();
    pageContentView.focus();
    PageApp.contentRegion.attachView(pageContentView);
    return $("body").click(function() {
      return pageContentView.focus();
    });
  });

}).call(this);
