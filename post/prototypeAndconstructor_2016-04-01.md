#prototype与constructor的解释
##2016.04.01

在进入继承之前先弄懂`prototype`和`constructor`。官方解释，`function`定义的对象会有一个`prototype`的属性，这个属性是指向一个原型对象（也叫`prototype`）的一个指针。如果将一个对象的实例new到一个对象的`prototyp`e属性上，就相当于该对象的`prototype`被那个对象的实例改写了，那么就实现了继承，这个后面再说。
```
function Animal(){}
function Person(){}
var person1 = new Person();
console.log(Person.prototype); // Person{}
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Animal); // false

Person.prototype = new Animal();
var person2 = new Person();
console.log(Person.prototype); // Animal{}
console.log(person2 instanceof Object); // true
console.log(person2 instanceof Animal); // true
```

再看`constructor`，这个东西就是在创建对象（`new`）的时候的产物，也是一个指针，指向创建对象的构造函数。
```
function Animal(){}
function Person(){}
var person1 = new Person();
console.log(Person.prototype.constructor); // [Function: Person]
console.log(person1.constructor); // [Function: Person]

Person.prototype = new Animal();
var person2 = new Person();
console.log(Person.prototype.constructor); // [Function: Animal]
console.log(person2.constructor); // [Function: Animal]
```
这里有必要解释一下，免得自己又忘记了。前面用`Person`创建了一个新对象`person1`，所以`person1`的`constructor`指向`Person`。然后，`Person`的原型被`Animal`实例化了，其实也就相当于`Animal`构造了`Peple`，那么`People`构造了`person2`，那么`person2`的`constructor`就是`Animal`了。
