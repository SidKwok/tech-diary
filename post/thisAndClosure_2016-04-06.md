# this和闭包
## 2016.04.06

今天面试的时候问到了关于闭包的问题，觉得自己没有说好，所以再系统的总结一下吧。

### this

`this`的官方定义是函数上下文。在函数创建的时候会生成两个内部对象，一个是`arguments`，另外一个就是`this`。而`this`是在运行时基于函数的执行环境绑定的。其实很简单，一句话，谁调用，`this`就指向谁。

来个栗子：
```
global.name = "global"; // 因为测试环境时Node，所以全局对象是global，在浏览器中是window

function sayName(){
  console.log(this.name);
}

var hotshot = {
  name: "sid",
  sayName: sayName
};

sayName();         // global
hotshot.sayName(); // sid
```

能够清晰地看到，第一个因为是在全局调用的`sayName()`，所以这个时候`this`的指向就是`global`。再看第二个，因为`hotshot`在内部定义了一个方法，其方法指向了`sayName`，后面`hotshot`调用了该方法，所以此时`this`指向`sid`。

够清楚了吧？再来！

```
function test(){}

var hotshot = new test();
hotshot.sayThis = function(){
  console.log(this);
};

hotshot.sayThis(); // test { sayThis: [Function] }
```

在这里，用`test`对`hotshot`进行了`new`操作，从下面的结果看，其实就是将`test`的`this`传递给了`hotshot`。

### 闭包

闭包的准确定义是一个函数在创建时允许该自身函数访问并操作该自身函数之外的变量时所创建的作用域。所以在讨论闭包之前，应该对作用域有一个清晰的了解。

简单说，作用域就是一个函数能够作用的范围，而函数只能访问到自己作用域中的变量，不能访问别的作用域。而这个时候就会有一个叫做作用域链的东西，其实它很简单，就是函数访问变量时候的顺序。首先，在函数创建的时候，其`arguements`肯定是在作用域链的最前端的，然后到自己的内部变量，然后再到外部函数的`arguements`，依次类推。

```
function oustside(value1){
  var value2;
  function inside(value3){
    var value4;
  }
}
```
在这里，作用域链是 value3->value4->value1->value2。在函数中如果使用到变量的话，就会沿着作用域链的前端进行搜索，直到`window`，如果还是没找到，就会显示`ReferenceError`。所谓的变量声明提升就是这么个意思。需要注意的是，这里说的是声明，跟赋值是不一样的，赋值还是按照语句的先后进行的。

我的天，铺垫了这么多终于可以开始说闭包了。

前面已经给了闭包的定义了，但是我们常说的必报，应该是在函数里面再定义一个函数的情况，通常是在函数里返回一个函数。如果在一个函数里面返回一个函数，那么这个返回的函数就会拥有一整条作用域链，也就是包涵着包括全局的整个作用域。通过这种方法我们可以对函数的内部变量进行访问或者操作。而闭包中保存的是变量的引用，并不是值，所以会产生这种情况：

```
function test(){
  var result = [];
  for(var i = 0; i < 4; i++){
    result[i] = function(){
      return i;
    };
  }

  console.log(result[0]()); // 4
  console.log(result[1]()); // 4
  console.log(result[2]()); // 4
  console.log(result[3]()); // 4
}

test();
```

`result`中保存的只是i的引用，所以最后的结果都是i。可以改成：

```
function test(){
  var result = [];
  for(var i = 0; i < 4; i++){
    result[i] = function(j){
      return function(j){
        return j
      }
    }(i);
  }

  console.log(result[0]()); // 0
  console.log(result[1]()); // 1
  console.log(result[2]()); // 2
  console.log(result[3]()); // 3
}

test();
```

这样子相当于将i当作参数传进去了，参数传的都是值，所以不会产生那样子的问题。还可以改成：

```
function test(){
  var result = [];
  for(var i = 0; i < 4; i++){
    result[i] = (function(){
      return i;
    })();
  }

  console.log(result[0]); // 0
  console.log(result[1]); // 1
  console.log(result[2]); // 2
  console.log(result[3]); // 3
}

test();
```
将其改为一个自执行的函数，一到那里马上执行，那么`result`马上就会接收到值，所以问题也解决了。

十分经典的一道题：一个数组`[1, 2, 3, 4, 5]`，每隔一秒钟输出一个字母。
```
var array = [1, 2, 3, 4, 5];

for(var i = 0; i < array.length; i++){
  (function(j){
    setTimeout(function(){
      console.log(array[j]);
      }, j*1000 + 1000)
    })(i)
}
```
原因就不解释了。

再结合上面的`this`举个栗子：
```
global.name = "global";

var test = {
  name: "test",
  sayName1: function(){
    return function(){
      console.log(this.name);
    };
  },
  sayName2: function(){
    console.log(this.name);
  }
};

test.sayName1()();
test.sayName2();

```

解释一下，首先在`test`中定义了一个`sayName1`的方法，而该方法返回了一个匿名函数的闭包，所以该函数包含了全局作用域，而`test`在全局中调用了`sayName1`，所以`this`指向的是`global`；第二个方法`sayName2`是对象的一个方法，所以this指向的是对象，输出`test`。
