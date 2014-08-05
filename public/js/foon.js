$("#towiki").submit(function(e){
    gotoWiki();
});
$("#gobutton").click(function(e){
    gotoWiki();
});

function gotoWiki(){
  window.location.href = $("#towiki [name=wikiname]").val();
}

$(function (){
});
