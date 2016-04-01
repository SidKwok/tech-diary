var fs = require('fs');

fs.readdir(__dirname + '/post', function(err, files){
  if (err){
    console.error(err);
  }

  // file size and path, and sorry that I cant get size right now
  var size, path, title, date;
  var wrap;
  files.forEach(function(item){
    //sorry for mac
    if(item !== ".DS_Store"){
      path = __dirname + '/post/' + item;
      // size = fs.statSync(path).size;
      fs.readFile(path, "utf-8", function(err, content){
        wrap = {
          title: item.split("_")[0],
          date: item.split("_")[1],
          content: content,
          size: 200
        };
      });
    }
  });
});
