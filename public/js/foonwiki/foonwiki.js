var PageApp = new Backbone.Marionette.Application();

PageApp.commands.setHandler("postContents", function(){
  var ce = $("<pre />").html($("#content").html());
  if($.browser.webkit)
    ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
  if($.browser.msie)
    ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
  if($.browser.mozilla || $.browser.opera ||$.browser.msie )
    ce.find("br").replaceWith("\n");

  var fd = new FormData();
  fd.append("content", ce.text());
  fd.append("pagename", $("#pagenameinput").val());

  $.ajax({
    url: $("#contents").attr("action"),
    type: "POST",
    data: fd,
    processData: false,
    contentType: false
  });
});

PageApp.addRegions({
  titleRegion: "#pagetitle"
});

var Page = Backbone.Model.extend({

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
    });
    setTimeout(function(){
      $("#pagenameinput").focus();
    }, 0);
  }
});

var PageContentView = Marionette.ItemView.extend({
  el: '#content',

  template: false,

  focus: function() {
    this.$el.focus();
  }
});

$(function (){
  var page = new Page();
  PageApp.titleRegion.attachView(new PageNameView({
    model: page
  }));
  var pageContentView = new PageContentView();
  pageContentView.focus();

  $("body").click(function(){
    pageContentView.focus();
  });
});
