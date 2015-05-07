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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3pha3VuaS9kZXYvZm9vbndpa2kvcHVibGljL2pzL2Zvb253aWtpL21vZGVscy9wYWdlLmNvZmZlZSIsIi9Vc2Vycy96YWt1bmkvZGV2L2Zvb253aWtpL3B1YmxpYy9qcy9mb29ud2lraS9pbmRleC5janN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxJQUFBO0VBQUE7NkJBQUE7O0FBQUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFDckIsMEJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLGlCQUFBLE9BQUEsR0FBUyxRQUFULENBQUE7O0FBQUEsaUJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtXQUNWLElBQUksQ0FBQyxFQUFMLENBQVEsYUFBUixFQUF1QixTQUFBLEdBQUE7YUFDckIsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsYUFBckIsRUFBb0MsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXBDLEVBRHFCO0lBQUEsQ0FBdkIsRUFEVTtFQUFBLENBRlosQ0FBQTs7Y0FBQTs7R0FEa0MsUUFBUSxDQUFDLE1BQTdDLENBQUE7Ozs7O0FDQUEsSUFBQSxJQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVMsZUFBVCxDQUFQLENBQUE7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLENBQUE7O0FBQUEsQ0EwRkEsQ0FBRSxTQUFBLEdBQUE7QUFDQSxNQUFBLDJCQUFBO0FBQUEsRUFBQSxVQUFBLEdBQWEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsYUFBckIsQ0FBYixDQUFBO0FBQ0EsRUFBQSxJQUFHLGtCQUFIO0FBQ0UsSUFBQSxDQUFBLENBQUUsVUFBRixDQUNFLENBQUMsTUFESCxDQUNVLENBQUEsQ0FBRSxXQUFGLENBRFYsQ0FFRSxDQUFDLE1BRkgsQ0FFVSxDQUFBLENBQUUsU0FBRixDQUZWLENBR0UsQ0FBQyxJQUhILENBR1EsSUFBSSxDQUFDLEtBQUwsQ0FBVyxVQUFYLENBQXNCLENBQUMsSUFIL0IsQ0FBQSxDQURGO0dBREE7QUFBQSxFQU9BLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBcEIsQ0FBbUMsSUFBQSxZQUFBLENBQ2pDO0FBQUEsSUFBQSxLQUFBLEVBQVcsSUFBQSxJQUFBLENBQUEsQ0FBWDtHQURpQyxDQUFuQyxDQVBBLENBQUE7QUFBQSxFQVVBLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBcEIsQ0FBbUMsSUFBQSxnQkFBQSxDQUFBLENBQW5DLENBVkEsQ0FBQTtBQUFBLEVBV0EsZUFBQSxHQUFzQixJQUFBLGVBQUEsQ0FBQSxDQVh0QixDQUFBO0FBQUEsRUFZQSxlQUFlLENBQUMsS0FBaEIsQ0FBQSxDQVpBLENBQUE7QUFBQSxFQWFBLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBdEIsQ0FBaUMsZUFBakMsQ0FiQSxDQUFBO1NBZUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEtBQVYsQ0FBZ0IsU0FBQSxHQUFBO1dBQ2QsZUFBZSxDQUFDLEtBQWhCLENBQUEsRUFEYztFQUFBLENBQWhCLEVBaEJBO0FBQUEsQ0FBRixDQTFGQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIHVybFJvb3Q6ICcvcGFnZXMnXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICB0aGlzLm9uIFwiY2hhbmdlOm5hbWVcIiwgLT5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIFwicmVjZW50UGFnZXNcIiwgSlNPTi5zdHJpbmdpZnkodGhpcylcbiIsIlBhZ2UgPSByZXF1aXJlICgnLi9tb2RlbHMvcGFnZScpXG5gXG52YXIgUGFnZUFwcCA9IG5ldyBCYWNrYm9uZS5NYXJpb25ldHRlLkFwcGxpY2F0aW9uKCk7XG5cblBhZ2VBcHAubW9kZWwgPSBuZXcgUGFnZSgpO1xuXG5QYWdlQXBwLmNvbW1hbmRzLnNldEhhbmRsZXIoXCJwb3N0Q29udGVudHNcIiwgZnVuY3Rpb24oKXtcbiAgdmFyIGNlID0gJChcIjxwcmUgLz5cIikuaHRtbCgkKFwiI2NvbnRlbnRcIikuaHRtbCgpKTtcbiAgaWYoJC5icm93c2VyLndlYmtpdClcbiAgICBjZS5maW5kKFwiZGl2XCIpLnJlcGxhY2VXaXRoKGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJcXG5cIiArIHRoaXMuaW5uZXJIVE1MOyB9KTtcbiAgaWYoJC5icm93c2VyLm1zaWUpXG4gICAgY2UuZmluZChcInBcIikucmVwbGFjZVdpdGgoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmlubmVySFRNTCArIFwiPGJyPlwiOyB9KTtcbiAgaWYoJC5icm93c2VyLm1vemlsbGEgfHwgJC5icm93c2VyLm9wZXJhIHx8JC5icm93c2VyLm1zaWUgKVxuICAgIGNlLmZpbmQoXCJiclwiKS5yZXBsYWNlV2l0aChcIlxcblwiKTtcblxuICBQYWdlQXBwLm1vZGVsLnNldCh7XG4gICAgbmFtZTogJChcIiNwYWdlbmFtZWlucHV0XCIpLnZhbCgpLFxuICAgIGNvbnRlbnQ6IGNlLnRleHQoKVxuICB9KTtcbiAgUGFnZUFwcC5tb2RlbC51cmwgPSBmdW5jdGlvbigpeyByZXR1cm4gJChcIiNjb250ZW50c1wiKS5hdHRyKFwiYWN0aW9uXCIpOyB9O1xuICBQYWdlQXBwLm1vZGVsLnNhdmUoKTtcbn0pO1xuXG5QYWdlQXBwLmFkZFJlZ2lvbnMoe1xuICB0aXRsZVJlZ2lvbjogXCIjcGFnZXRpdGxlXCIsXG4gIGNvbnRlbnRSZWdpb246IFwiI2NvbnRlbnRcIlxufSk7XG5cbiQoXCIjcGFnZW5hbWVmb3JtXCIpLnN1Ym1pdChmdW5jdGlvbihlKXtcbiAgUGFnZUFwcC5leGVjdXRlKFwicG9zdENvbnRlbnRzXCIpO1xuICAkKFwiI3BhZ2VuYW1lXCIpLnRleHQoUGFnZUFwcC5tb2RlbC5lc2NhcGUoXCJuYW1lXCIpKTtcbiAgJChcIiNwYWdlbmFtZVwiKS5zaG93KCk7XG4gICQoXCIjcGFnZW5hbWVmb3JtXCIpLmhpZGUoKTtcbiAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbiQoXCIjY29udGVudHNcIikuc3VibWl0KGZ1bmN0aW9uKGUpe1xuICBQYWdlQXBwLmV4ZWN1dGUoXCJwb3N0Q29udGVudHNcIik7XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuXG52YXIgUGFnZU5hbWVWaWV3ID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICBlbDogJyNwYWdlbmFtZScsXG5cbiAgdGVtcGxhdGU6IGZhbHNlLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5tb2RlbC5zZXQoXCJuYW1lXCIsICQoXCIjcGFnZW5hbWVpbnB1dFwiKS52YWwoKSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCBcImNoYW5nZTpuYW1lXCIsIHRoaXMubW9kZWxOYW1lQ2hhbmdlZCk7XG4gIH0sXG5cbiAgZXZlbnRzOiB7XG4gICAgJ2NsaWNrJzogJ3Nob3dQYWdlRm9ybSdcbiAgfSxcblxuICBtb2RlbE5hbWVDaGFuZ2VkOiBmdW5jdGlvbihtb2RlbCl7XG4gICAgdGhpcy4kZWwuaHRtbChtb2RlbC5lc2NhcGUoXCJuYW1lXCIpKTtcbiAgfSxcblxuICBzaG93UGFnZUZvcm06IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kZWwuaGlkZSgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkKFwiI3BhZ2VuYW1lZm9ybVwiKS5zaG93KCkuZm9jdXNvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHRoYXQubW9kZWwuc2V0KFwibmFtZVwiLCAkKFwiI3BhZ2VuYW1laW5wdXRcIikudmFsKCkpO1xuICAgICAgJChcIiNwYWdlbmFtZWZvcm1cIikuaGlkZSgpO1xuICAgICAgdGhhdC4kZWwuc2hvdygpO1xuICAgIH0pLmNsaWNrKGZ1bmN0aW9uKCl7IHJldHVybiBmYWxzZTsgfSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJChcIiNwYWdlbmFtZWlucHV0XCIpLmZvY3VzKCk7XG4gICAgfSwgMCk7XG4gIH1cbn0pO1xuXG52YXIgUGFnZU5hbWVGb3JtVmlldyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgZWw6ICcjcGFnZW5hbWVmb3JtJyxcblxuICB0ZW1wbGF0ZTogZmFsc2Vcbn0pO1xuXG52YXIgUGFnZUNvbnRlbnRWaWV3ID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICBlbDogJyNjb250ZW50JyxcblxuICB0ZW1wbGF0ZTogZmFsc2UsXG5cbiAgZm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGVsLmZvY3VzKCk7XG4gIH1cbn0pO1xuYFxuXG4kIC0+XG4gIHJlY2VudFBhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlY2VudFBhZ2VzXCIpXG4gIGlmIHJlY2VudFBhZ2U/XG4gICAgJChcIiNzZWVuIHVsXCIpXG4gICAgICAuYXBwZW5kICQoXCI8bGk+PC9saT5cIilcbiAgICAgIC5hcHBlbmQgJChcIjxhPjwvYT5cIilcbiAgICAgIC50ZXh0KEpTT04ucGFyc2UocmVjZW50UGFnZSkubmFtZSlcblxuICBQYWdlQXBwLnRpdGxlUmVnaW9uLmF0dGFjaFZpZXcobmV3IFBhZ2VOYW1lVmlldyhcbiAgICBtb2RlbDogbmV3IFBhZ2UoKVxuICApKVxuICBQYWdlQXBwLnRpdGxlUmVnaW9uLmF0dGFjaFZpZXcobmV3IFBhZ2VOYW1lRm9ybVZpZXcoKSlcbiAgcGFnZUNvbnRlbnRWaWV3ID0gbmV3IFBhZ2VDb250ZW50VmlldygpXG4gIHBhZ2VDb250ZW50Vmlldy5mb2N1cygpXG4gIFBhZ2VBcHAuY29udGVudFJlZ2lvbi5hdHRhY2hWaWV3KHBhZ2VDb250ZW50VmlldylcblxuICAkKFwiYm9keVwiKS5jbGljayAtPlxuICAgIHBhZ2VDb250ZW50Vmlldy5mb2N1cygpXG4iXX0=
