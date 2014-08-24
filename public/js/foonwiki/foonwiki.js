var PageApp = new Backbone.Marionette.Application();
PageApp.reqres.setHandler("parseContentEditable", function(html){
  var ce = $("<pre />").html(html);
  if($.browser.webkit)
    ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
  if($.browser.msie)
    ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
  if($.browser.mozilla || $.browser.opera ||$.browser.msie )
    ce.find("br").replaceWith("\n");
  return ce;
});
PageApp.commands.setHandler("postContents", function(formData){
  $.ajax({
    url: $("#contents").attr("action"),
    type: "POST",
    data: formData,
    processData: false,
    contentType: false
  });
});

$("#pagenameform").submit(function(e){
  var ce = PageApp.request("parseContentEditable", $("#content").html());
  var fd = new FormData();
  fd.append("content", ce.text());
  fd.append("pagename", $("#pagenameinput").val());
  PageApp.execute("postContents", fd);
  $("#pagename").text($("#pagenameinput").val());
  $("#pagename").show();
  $("#pagenameform").hide();
  return false;
});

$("#contents").submit(function(e){
  var ce = PageApp.request("parseContentEditable", $("#content").html());
  var fd = new FormData();
  fd.append("content", ce.text());
  fd.append("pagename", $("#pagenameinput").val());
  PageApp.execute("postContents", fd);
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
    $("#pagenameform").show();
  }
});


$(function (){
  $("#content").focus();

  var pageNameView = new PageNameView();
});
