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

$(function (){
});
