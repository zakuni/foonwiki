(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Page,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = Page = (function(superClass) {
  extend(Page, superClass);

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



},{}],2:[function(require,module,exports){
var Page;

Page = require('./models/page');


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



},{"./models/page":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvemFrdW5pL2Rldi9mb29ud2lraS9wdWJsaWMvanMvZm9vbndpa2kvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL1VzZXJzL3pha3VuaS9kZXYvZm9vbndpa2kvcHVibGljL2pzL2Zvb253aWtpL2Zvb253aWtpLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsSUFBQTtFQUFBOzZCQUFBOztBQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBQ3JCLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxpQkFBQSxPQUFBLEdBQVMsUUFBVCxDQUFBOztBQUFBLGlCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FDVixJQUFJLENBQUMsRUFBTCxDQUFRLGFBQVIsRUFBdUIsU0FBQSxHQUFBO2FBQ3JCLFlBQVksQ0FBQyxPQUFiLENBQXFCLGFBQXJCLEVBQW9DLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUFwQyxFQURxQjtJQUFBLENBQXZCLEVBRFU7RUFBQSxDQUZaLENBQUE7O2NBQUE7O0dBRGtDLFFBQVEsQ0FBQyxNQUE3QyxDQUFBOzs7OztBQ0FBLElBQUEsSUFBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFTLGVBQVQsQ0FBUCxDQUFBOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFBOztBQUFBLENBMEZBLENBQUUsU0FBQSxHQUFBO0FBQ0EsTUFBQSwyQkFBQTtBQUFBLEVBQUEsVUFBQSxHQUFhLFlBQVksQ0FBQyxPQUFiLENBQXFCLGFBQXJCLENBQWIsQ0FBQTtBQUNBLEVBQUEsSUFBRyxrQkFBSDtBQUNFLElBQUEsQ0FBQSxDQUFFLFVBQUYsQ0FDRSxDQUFDLE1BREgsQ0FDVSxDQUFBLENBQUUsV0FBRixDQURWLENBRUUsQ0FBQyxNQUZILENBRVUsQ0FBQSxDQUFFLFNBQUYsQ0FGVixDQUdFLENBQUMsSUFISCxDQUdRLElBQUksQ0FBQyxLQUFMLENBQVcsVUFBWCxDQUFzQixDQUFDLElBSC9CLENBQUEsQ0FERjtHQURBO0FBQUEsRUFPQSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQXBCLENBQW1DLElBQUEsWUFBQSxDQUNqQztBQUFBLElBQUEsS0FBQSxFQUFXLElBQUEsSUFBQSxDQUFBLENBQVg7R0FEaUMsQ0FBbkMsQ0FQQSxDQUFBO0FBQUEsRUFVQSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQXBCLENBQW1DLElBQUEsZ0JBQUEsQ0FBQSxDQUFuQyxDQVZBLENBQUE7QUFBQSxFQVdBLGVBQUEsR0FBc0IsSUFBQSxlQUFBLENBQUEsQ0FYdEIsQ0FBQTtBQUFBLEVBWUEsZUFBZSxDQUFDLEtBQWhCLENBQUEsQ0FaQSxDQUFBO0FBQUEsRUFhQSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQXRCLENBQWlDLGVBQWpDLENBYkEsQ0FBQTtTQWVBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxLQUFWLENBQWdCLFNBQUEsR0FBQTtXQUNkLGVBQWUsQ0FBQyxLQUFoQixDQUFBLEVBRGM7RUFBQSxDQUFoQixFQWhCQTtBQUFBLENBQUYsQ0ExRkEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICB1cmxSb290OiAnL3BhZ2VzJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgdGhpcy5vbiBcImNoYW5nZTpuYW1lXCIsIC0+XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSBcInJlY2VudFBhZ2VzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMpXG4iLCJQYWdlID0gcmVxdWlyZSAoJy4vbW9kZWxzL3BhZ2UnKVxuYFxudmFyIFBhZ2VBcHAgPSBuZXcgQmFja2JvbmUuTWFyaW9uZXR0ZS5BcHBsaWNhdGlvbigpO1xuXG5QYWdlQXBwLm1vZGVsID0gbmV3IFBhZ2UoKTtcblxuUGFnZUFwcC5jb21tYW5kcy5zZXRIYW5kbGVyKFwicG9zdENvbnRlbnRzXCIsIGZ1bmN0aW9uKCl7XG4gIHZhciBjZSA9ICQoXCI8cHJlIC8+XCIpLmh0bWwoJChcIiNjb250ZW50XCIpLmh0bWwoKSk7XG4gIGlmKCQuYnJvd3Nlci53ZWJraXQpXG4gICAgY2UuZmluZChcImRpdlwiKS5yZXBsYWNlV2l0aChmdW5jdGlvbigpIHsgcmV0dXJuIFwiXFxuXCIgKyB0aGlzLmlubmVySFRNTDsgfSk7XG4gIGlmKCQuYnJvd3Nlci5tc2llKVxuICAgIGNlLmZpbmQoXCJwXCIpLnJlcGxhY2VXaXRoKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5pbm5lckhUTUwgKyBcIjxicj5cIjsgfSk7XG4gIGlmKCQuYnJvd3Nlci5tb3ppbGxhIHx8ICQuYnJvd3Nlci5vcGVyYSB8fCQuYnJvd3Nlci5tc2llIClcbiAgICBjZS5maW5kKFwiYnJcIikucmVwbGFjZVdpdGgoXCJcXG5cIik7XG5cbiAgUGFnZUFwcC5tb2RlbC5zZXQoe1xuICAgIG5hbWU6ICQoXCIjcGFnZW5hbWVpbnB1dFwiKS52YWwoKSxcbiAgICBjb250ZW50OiBjZS50ZXh0KClcbiAgfSk7XG4gIFBhZ2VBcHAubW9kZWwudXJsID0gZnVuY3Rpb24oKXsgcmV0dXJuICQoXCIjY29udGVudHNcIikuYXR0cihcImFjdGlvblwiKTsgfTtcbiAgUGFnZUFwcC5tb2RlbC5zYXZlKCk7XG59KTtcblxuUGFnZUFwcC5hZGRSZWdpb25zKHtcbiAgdGl0bGVSZWdpb246IFwiI3BhZ2V0aXRsZVwiLFxuICBjb250ZW50UmVnaW9uOiBcIiNjb250ZW50XCJcbn0pO1xuXG4kKFwiI3BhZ2VuYW1lZm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oZSl7XG4gIFBhZ2VBcHAuZXhlY3V0ZShcInBvc3RDb250ZW50c1wiKTtcbiAgJChcIiNwYWdlbmFtZVwiKS50ZXh0KFBhZ2VBcHAubW9kZWwuZXNjYXBlKFwibmFtZVwiKSk7XG4gICQoXCIjcGFnZW5hbWVcIikuc2hvdygpO1xuICAkKFwiI3BhZ2VuYW1lZm9ybVwiKS5oaWRlKCk7XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKFwiI2NvbnRlbnRzXCIpLnN1Ym1pdChmdW5jdGlvbihlKXtcbiAgUGFnZUFwcC5leGVjdXRlKFwicG9zdENvbnRlbnRzXCIpO1xuICByZXR1cm4gZmFsc2U7XG59KTtcblxudmFyIFBhZ2VOYW1lVmlldyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgZWw6ICcjcGFnZW5hbWUnLFxuXG4gIHRlbXBsYXRlOiBmYWxzZSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuICAgIHRoaXMubW9kZWwuc2V0KFwibmFtZVwiLCAkKFwiI3BhZ2VuYW1laW5wdXRcIikudmFsKCkpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2U6bmFtZVwiLCB0aGlzLm1vZGVsTmFtZUNoYW5nZWQpO1xuICB9LFxuXG4gIGV2ZW50czoge1xuICAgICdjbGljayc6ICdzaG93UGFnZUZvcm0nXG4gIH0sXG5cbiAgbW9kZWxOYW1lQ2hhbmdlZDogZnVuY3Rpb24obW9kZWwpe1xuICAgIHRoaXMuJGVsLmh0bWwobW9kZWwuZXNjYXBlKFwibmFtZVwiKSk7XG4gIH0sXG5cbiAgc2hvd1BhZ2VGb3JtOiBmdW5jdGlvbigpe1xuICAgIHRoaXMuJGVsLmhpZGUoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJChcIiNwYWdlbmFtZWZvcm1cIikuc2hvdygpLmZvY3Vzb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB0aGF0Lm1vZGVsLnNldChcIm5hbWVcIiwgJChcIiNwYWdlbmFtZWlucHV0XCIpLnZhbCgpKTtcbiAgICAgICQoXCIjcGFnZW5hbWVmb3JtXCIpLmhpZGUoKTtcbiAgICAgIHRoYXQuJGVsLnNob3coKTtcbiAgICB9KS5jbGljayhmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH0pO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjcGFnZW5hbWVpbnB1dFwiKS5mb2N1cygpO1xuICAgIH0sIDApO1xuICB9XG59KTtcblxudmFyIFBhZ2VOYW1lRm9ybVZpZXcgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gIGVsOiAnI3BhZ2VuYW1lZm9ybScsXG5cbiAgdGVtcGxhdGU6IGZhbHNlXG59KTtcblxudmFyIFBhZ2VDb250ZW50VmlldyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgZWw6ICcjY29udGVudCcsXG5cbiAgdGVtcGxhdGU6IGZhbHNlLFxuXG4gIGZvY3VzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5mb2N1cygpO1xuICB9XG59KTtcbmBcblxuJCAtPlxuICByZWNlbnRQYWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWNlbnRQYWdlc1wiKVxuICBpZiByZWNlbnRQYWdlP1xuICAgICQoXCIjc2VlbiB1bFwiKVxuICAgICAgLmFwcGVuZCAkKFwiPGxpPjwvbGk+XCIpXG4gICAgICAuYXBwZW5kICQoXCI8YT48L2E+XCIpXG4gICAgICAudGV4dChKU09OLnBhcnNlKHJlY2VudFBhZ2UpLm5hbWUpXG5cbiAgUGFnZUFwcC50aXRsZVJlZ2lvbi5hdHRhY2hWaWV3KG5ldyBQYWdlTmFtZVZpZXcoXG4gICAgbW9kZWw6IG5ldyBQYWdlKClcbiAgKSlcbiAgUGFnZUFwcC50aXRsZVJlZ2lvbi5hdHRhY2hWaWV3KG5ldyBQYWdlTmFtZUZvcm1WaWV3KCkpXG4gIHBhZ2VDb250ZW50VmlldyA9IG5ldyBQYWdlQ29udGVudFZpZXcoKVxuICBwYWdlQ29udGVudFZpZXcuZm9jdXMoKVxuICBQYWdlQXBwLmNvbnRlbnRSZWdpb24uYXR0YWNoVmlldyhwYWdlQ29udGVudFZpZXcpXG5cbiAgJChcImJvZHlcIikuY2xpY2sgLT5cbiAgICBwYWdlQ29udGVudFZpZXcuZm9jdXMoKVxuIl19
