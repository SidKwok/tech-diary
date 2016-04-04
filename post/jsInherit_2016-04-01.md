# js继承
## 2016.04.01
来吧，继承。

需要明确的一点是，js中的继承是通过原型（prototype）的，分析几种继承的方法，确实不能一言以蔽之。

* 原型链：用父类来重写子类的原型对象，但是这种方法会导致引用类型被所有实例共享。引用类型（Array、Object和Function）嘛，顾名思义是引用来的，保存的只是引用值，所有任何一个地方修改了都会导致全部修改（其实这样说也不妥，因为终究只有一个，其他的只是引用它并且有权力去修改它）。

```
function Father(){
  this.name = "sid";
  this.color = ["red"];
}

function Son(){
  this.age = 21;
}

Son.prototype = new Father();

var son1 = new Son();
var son2 = new Son();

console.log(son1.color); // [ 'red' ]
console.log(son2.color); // [ 'red' ]
son2.color.push("purple");
console.log(son1.color); // [ 'red', 'puple' ]
console.log(son2.color); // [ 'red', 'puple' ]
```
这样子看就十分明显了，color是Array类型，而Array是引用类型，so，后面虽然只有son2做了push操作，但是可以看到每一个对象的color值都有改变，因为这是引用，并不是复制。

* 借用构造函数：在子类中通过执行父类达成子类继承父类，要是用到上下文的变换，可以传递参数。

```
function Father(name){
  this.name = name;
  this.color = ["red"];
}

function Son(name){
  Father.call(this, name);
}

Son.prototype = new Father();

var son1 = new Son("sid");
var son2 = new Son("mingen");

console.log(son1.color); // [ 'red' ]
console.log(son2.color); // [ 'red' ]
son2.color.push("purple");
console.log(son1.color); // [ 'red' ]
console.log(son2.color); // [ 'red', 'purple']
```

这相当于从父类那里拷贝了一份，与其说是继承，还不如说是复制。感觉与构造函数模式有点相似。而且父类原型的方法子类是用不了的，所以说，我认为这种方法不算是继承。

* 组合继承：用构造函数来继承属性，用原型链继承公用的属性和方法。

```
function Father(name){
  this.name = name;
}

Father.prototype.sayName = function(){
  console.log(this.name);
};

function Son(name, age){
  Father.call(this, name);
  this.age = age;
}

Son.prototype = new Father();
Son.prototype.constructor = Son; //why?
Son.prototype.sayAge = function(){
  console.log(this.age);
};

var son1 = new Son("sid", 21);
var son2 = new Son("mingen", 20);

son1.sayName(); // sid
son1.sayAge(); // 21
son2.sayName(); // mingen
son2.sayAge(); // 20
```

在面向对象编程里面除了继承还有对象识别，在涉及污染`constructor`的地方应该要及时改正。尽管这对继承没有影响，但是将`constructor`修改为正确的，对后面的对象识别有好处。
