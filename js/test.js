var posts = { '2016-03-29': { title: [ 'applyAndcall', 'jsChain' ], size: 2668 },
  '2016-03-30': { title: [ 'gulpAndBS' ], size: 1951 },
  '2016-04-01':
   { title: [ 'jsInherit', 'prototypeAndconstructor' ],
     size: 4528 },
  '2016-03-31': { title: [ 'jsModule' ], size: 2337 },
  '2016-04-02': { title: [ 'jsonpAndAjax' ], size: 2655 } };

var dates = [ '2016-03-29',
  '2016-03-30',
  '2016-04-01',
  '2016-03-31',
  '2016-04-02' ];

var selector = [ 'body > table > tbody > tr:nth-child(10) > td:nth-child(30)',
  'body > table > tbody > tr:nth-child(10) > td:nth-child(31)',
  'body > table > tbody > tr:nth-child(9) > td:nth-child(2)',
  'body > table > tbody > tr:nth-child(10) > td:nth-child(32)',
  'body > table > tbody > tr:nth-child(9) > td:nth-child(3)' ];

var t = document.querySelector("table");
t.addEventListener("click", function(event){
  alert(event.target);
  console.log(event.target);
});

function purefy(date){
  var newDate = [];
  var temp;
  date.forEach(function(item){
    temp = item.split('-');
    temp2 = [];
  });
}
