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

$('#pagename').hover(function() {
 $(this).css('cursor','text');
 }, function() {
 $(this).css('cursor','auto');
});

$('#content').hover(function() {
 $(this).css({
   'cursor': 'text',
   'background-color': '#fafafa'
 });
 }, function() {
 $(this).css({
   'cursor': 'auto',
   'background-color': '#fff'
 });
});


$("#contents").submit(function(e){
  var fd = new FormData();
  fd.append("content", $("#content").html());
  fd.append("pagename", $("#pagename").html());
  $.ajax({
    url: $("#contents").attr("action"),
    type: "POST",
    data: fd,
    processData: false,
    contentType: false
  });
  return false;
})

$(function (){
});
