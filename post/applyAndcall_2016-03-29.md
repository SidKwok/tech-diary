# apply与call的用法详解
## 2016.3.29

搞了好久我都没有弄明白wtf is `apply` and `call`。现在总算有点眉目了。

其实一言以蔽之，`apply`和`call`是改变某个对象的`this`的。怎么改变？

具体用法：
```Javascript
function doSth(name, age, hobby){
  this.name = name;
  this.age = age;
  this.hobby = hobby;
}
var sid = {};
var arg = ["sid", 21, "sport"];
doSth.apply(sid, arg);

console.log(sid.name);  // sid
console.log(sid.age);   // 21
console.log(sid.hobby); // sport

// 解释一下，首先创建了一个构造函数。后来用了apply将sid的this传到了构造函数中，再看，这个时候回到doSth。在doSth中对this进行了赋值，而此时的this是sid的，所以在后面sid也就有了那几个属性

var newArg = Array.prototype.call(arguments); //让伪数组arguements也具有数组的各种方法
```

就是酱。

第一个参数是某个对象的上下文，第二个参数是参数列表。

`apply`和`call`唯一的区别就是`call`的第二个参数是所有的参数，`apply`的是一个参数数组。

还有各种风骚的方法之后再更新，反正自己的博客自己看，不急。
