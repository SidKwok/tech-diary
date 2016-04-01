var fs = require('fs');

function writeCss(w){
  var year, month, day;
  var css = "";
  w.forEach(function(item){
    year  = parseInt(w.date.split('-')[0]);
    month = parseInt(w.date.split('-')[1]);
    day   = parseInt(w.date.split('-')[2]);

    css += "body > table > tbody > tr:nth-child(" +
           (13 - month) +
           ") > td:nth-child(" +
           (1 + day) + ")" +
           "{background: red}/n";
  });

  fs.writeFile( __dirname + '/css/table.css', css, function(err){
    if (err){
      console.error(err);
    }
  });
}

fs.readdir(__dirname + '/post', function(err, files){
  if (err){
    console.error(err);
  }

  // file size and path, and sorry that I cant get size right now
  var size, path, title, date;
  var wrap = [];
  files.forEach(function(item){
    //sorry for mac
    if(item !== ".DS_Store"){
      path = __dirname + '/post/' + item;
      fs.stat(path, function(err, stats){
        wrap.push({
          title: item.split("_")[0],
          date: item.split("_")[1],
          size: stats.size,
          path: path
        });
        // need to put wrap into writeCss when the fs.stat event is done
        // console.log(wrap);
      });
      // (function(s, p){
      //   fs.readFile(path, "utf-8", function(err, content){
      //     wrap = {
      //       title: item.split("_")[0],
      //       date: item.split("_")[1],
      //       content: 0,
      //       size: s,
      //       path: p
      //     };
      //     console.log(wrap);
      //   });
      // })(size, path);
    }
  });
});
