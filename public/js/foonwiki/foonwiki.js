$("#towiki").submit(function(e){
  gotoWiki();
  return false;
});
$("#gobutton").click(function(e){
  gotoWiki();
});

function gotoWiki(){
  window.location.href = $("#towiki [name=wikiname]").val();
}

$('#content').hover(function() {
  $(this).css({
    'cursor': 'text'
  });
}, function() {
  $(this).css({
    'cursor': 'auto',
    'background-color': '#fff'
  });
});

$("#pagenameform").submit(function(e){
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
  $("#pagename").text($("#pagenameinput").val());
  $("#pagename").show();
  $("#pagenameform").hide();
  return false;
});

$("#contents").submit(function(e){
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
  pageNameView.render();
});
