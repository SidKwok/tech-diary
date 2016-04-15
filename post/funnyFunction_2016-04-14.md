# Funny function
## 2016.04.14

分享一段比较有意思的函数，是用以前的方法来写一段querySelector，感觉非常有意思。

先放代码。

```Javascript
function querySelect(el,className){
    var children = el.children;
    var result = [];
    if(el.classList.contains(className)){
        result.push(el);
    }
    for(var i; i<children.length; i++){
        var child = children[i];
        var arr = querySelect(child,className);
        result.push.apply(result, arr);
    }
    return result;
}
```

面试官果然是个大神，居然这么屌噼里啪啦一阵就写出来了这样子的函数，只能膜拜。

querySelector的作用就是将参数的字符串（css选择器）返回相应的html节点。在这里，该函数实现的功能是返回某一个根节点下所有css选择器对应的节点。首先传入了两个参数，一个是根节点，一个是类名（先讨论只有一种类名的情况）。对根节点取children，判断元素的classlist是否包含类名，如果有，就将其压进result中。根据children的子节点的数量进行递归操作，遍历所有的子节点。
