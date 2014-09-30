`
var Page = Backbone.Model.extend({
  urlRoot: '/pages',

  initialize: function(){
    this.on("change:name", function(){
      localStorage.setItem("recentPages", JSON.stringify(this));
    });
  }
});
`
