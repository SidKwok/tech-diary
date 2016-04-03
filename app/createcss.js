var fs = require('fs');

function writeCss(w){
  var year, month, day;
  var css = "";
  var posts = {};
  var date = [];
  w.forEach(function(item){

    if(date.indexOf(item.date) == -1){
      date.push(item.date);
      posts[item.date] = {
        title: new Array(item.title),
        size: item.size
      };
    } else {
      posts[item.date].title.push(item.title);
      posts[item.date].size += item.size;
    }

  });

  // write js, i know it's ugly, but i need this data
  js = "function generateData(){return " + JSON.stringify(posts) + ";};";
  js += "module.exports=generateData;";
  // console.log(js);
  fs.writeFile('./data.js', js, function(err){
    if(err){
      console.error(err);
    }
  });

  date.forEach(function(item){
    year  = parseInt(item.split('-')[0]);
    month = parseInt(item.split('-')[1]);
    day   = parseInt(item.split('-')[2]);
    css += "body > table > tbody > tr:nth-child(" +
           (13 - month) +
           ") > td:nth-child(" +
           (1 + day) + ")" +
           "{background-color: rgba(62,172,168," + posts[item].size / 5000 + ");}\n";
  });

  fs.writeFile( '../build/css/table.css', css, function(err){
    if (err){
      console.error(err);
    }
  });
}

function createcss(){
  fs.readdir('../post', function(err, files){
    if (err){
      console.error(err);
    }

    // file size and path, and sorry that I cant get size right now
    var size, path, title, date;
    var wrap = [];
    var flength = files.length;
    var js;
    files.forEach(function(item){
      //sorry for mac
      if(item !== ".DS_Store"){
        path = '../post/' + item;
        fs.stat(path, function(err, stats){
          wrap.push({
            title: item.split("_")[0],
            date: item.split("_")[1].split(".")[0],
            size: stats.size,
            path: path
          });
          // need to put wrap into writeCss when the fs.stat event is done
          if(wrap.length == flength){
            // write css
            writeCss(wrap);
          }
        });
      } else {
        flength -= 1;
      }
    });
  });
}

createcss();

module.exports = createcss;
