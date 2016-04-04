var data = require("./data")();
var $ = require('jquery');

var month, day;
var dates = [];
var rawdates = [];
var tmp;
var posts = {};

for(var i in data){
  month = parseInt(i.split('-')[1]);
  day   = parseInt(i.split('-')[2]);
  tmp = month + "-" + day;
  dates.push(tmp);
  posts[tmp] = data[i];
}
// console.log(dates);



$("table").bind({
  mouseover: function(event){
    if(dates.indexOf(event.target.dataset.date) !== -1){
      var top = $(event.target).offset().top;
      var left = $(event.target).offset().left;
      var string;
      var href;
      $("#tip").css("display", "block");
      $("#tip").offset({top: top - 100, left: left - 40});
      posts[event.target.dataset.date].title.forEach(function(item){
        $("#tip .title").append(item);
        $("#tip .title").append("\n");
      });
      string = event.target.dataset.date.split("-").join("月") + "日";
      $("#tip p").append(string);

      // add box-shadow
      $(event.target).css("box-shadow", "#5A5050 0px 0px 10px 0px");
    }
  },
  mouseout: function(event){
    if(dates.indexOf(event.target.dataset.date) !== -1){
      $(event.target).css("box-shadow", "none");
      $("#tip").css("display", "none");
      $("#tip .title").html("");
      $("#tip p").html("");
    }
  },
  click: function(event){
    month = event.target.dataset.date.split("-")[0];
    day   = event.target.dataset.date.split("-")[1];
    var title = posts[event.target.dataset.date].title[0];
    if(month.length == 1){
      month = "0" + month;
    }
    if(day.length == 1){
      day = "0" + day;
    }
    window.location = "_post/" +  title + "_2016-" + month + "-" + day + ".html";
  }
});
