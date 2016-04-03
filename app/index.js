var data = require("./data")();
var $ = require('jquery');

// var table = document.querySelector("table");
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

// table.addEventListener('mouseover', function(event){
//   var date = event.target.dataset.date;
//   if(dates.indexOf(date) !== -1){
//     console.log(posts[date].title);
//   }
// });
$("table").bind({
  mouseover: function(event){
    if(dates.indexOf(event.target.dataset.date) !== -1){
      $("#tip").html(posts[event.target.dataset.date].title);
    }
  },
  mouseout: function(event){
    if(dates.indexOf(event.target.dataset.date) !== -1){
      $("#tip").html("");
    }
  }
});
