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

  events: {
    'click': 'showPageForm'
  },

  showPageForm: function() {
    this.$el.hide();
    var that = this;
    $("#pagenameform").show().focusout(function(){
      $("#pagenameform").hide();
      $("#pagename").html($("#pagenameinput").val());
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
  var pageNameView = new PageNameView();
  var pageContentView = new PageContentView();
  pageContentView.focus();

  $("body").click(function(){
    pageContentView.focus();
  });
});
