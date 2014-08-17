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

$("#contents").submit(function(e){
  var fd = new FormData(document.getElementById("contents"));
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
