# JSONP和Ajax
## 2016.04.02

Let's talk about JSONP and Ajax。

首先说Ajax。Ajax的全名是异步的javascript和XML，初期是用来异步传输XML的，但是现在通常是用来传输json数据的（起码我是这么干的）。Ajax的核心是XMLHttpRequest对象（IE中是ActiveXObject，其中有的属性是responseText、responseXML、status和statusText。一般用status来确定是否成功。status包含的是http状态码，所以是大于200且小于302，或者是等于304（传回来的数据与客户端的数据一致）。

所以Ajax的创建需要遵循几个步骤：创建xhr对象、监听事件、打开ajax连接和传输数据。有get和post，区别是get把传回去的数据放在url中，而post的数据由send发送。
```
function createXHR(){
  if (typeof XMLHttpRequest != "undefined"){
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined"){
    if (typeof arguments.callee.activeXString != "string"){
      var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                      "MSXML2.XMLHttp"],
          i, len;
      for(i = 0, len = versions.length; i < len; i++){
        try{
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch(ex){}
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR object available");
  }
}
// 我的天，其实如果不是IE根本不用这么麻烦，riIE。

var xhr = createXHR();
xhr.onreadystatechange = function(){
  if (xhr.readyState == 4){
    if ((xhr.state >= 200 && xhr.state < 302) || xhr.state == 304){
      //TODO, need xhr.responseXML or xhr.responseText
    } else {
      // error
    }
  }
};

xhr.open("get", "url", true); // or post, the third argument is async or not async
xhr.send(null); // if post, need data

```

再说JSONP。由于跨域安全策略，所以Ajax是没有办法获取跨域资源的（其实我觉得就是IE不可以，其他浏览器可以通过修改open里面的url来实现跨域资源访问，也就是CORS）。但是JSONP可以。因为JSONP是通过动态创建script标签来调用跨域服务器生成的文件。具体做法是，将script的src属性写相应url，添加所需要的callback，然后服务器根据传过来的callback生成相应的callback函数，将数据放进去，all is done。

它和Ajax有什么不同？完全就不同好吗，Ajax是通过xhr来与同域服务器通信的，JSONP是通过script标签，要多不同有多不同。

[参考文章](http://blog.csdn.net/superhosts/article/details/9057301)
