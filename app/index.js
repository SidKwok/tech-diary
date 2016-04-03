var data = require("./data")();
var $ = require('jquery');

var month, day;
var dates = [];
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
      $("#tip").css("display", "block");
      $("#tip").offset({top: top - 100, left: left});
      posts[event.target.dataset.date].title.forEach(function(item){
        $("#tip").append(item);
        $("#tip").append("\n");
      });
    }
  },
  mouseout: function(event){
    if(dates.indexOf(event.target.dataset.date) !== -1){
      $("#tip").css("display", "none");
      $("#tip").html("");
    }
  }
});
