# 跨域资源共享
## 2016.04.06

之前一直对CORS的概念模糊不清，今天在这里总结一下。

先说什么是跨域。

因为在web应用设计的时候，有时候要涉及到获取外部资源的过程，例如天气信息啊，球队比分啊之类的。但是由于同源策略（只能访问同域资源，何谓同域，就是要求协议、端口号和主机都相同，域名和域名相对的ip也不是同域），脚本只能访问同域资源，那么这时候要怎么办呢？之前的开发者想出了许多66嗒的方法，例如图像ping和JSONP。但是这终究不是官方的方法，所以CORS就出现了。

非IE8、9浏览器实现CORS很简单（其实IE8、9也不难，下面再讨论），在跨域发送`post`或者是`get`请求的时候，只需要将`xhr.open()`的url参数设置为相应的绝对定位，例如：

```Javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handler;
xhr.open("get", "http://example.com", true);
xhr.send(null);

```
就是酱紫。

在这个过程中发生了这么一系列事情：首先浏览器会发送一个请求头，其中的`Origin`被设置为了本地源，表明这个请求时来自哪里的；服务器接收请求头，然后响应一系列信息，其中最重要的是`Access-Control-Allow-Origin`，如果该值为\*，那么就意味着这个资源谁都可以拿，如果其值为任意一个网站的源，那么就只允许相应网站访问；浏览器处理返回信息。

如果想发送`cookie`过去咋办？用`withCredentials`，用一个例子去说明：

```Javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handler;
xhr.open("get", url, true);
xhr.withCredentials = true;
xhr.send(null);
```

那么这样子`cookie`就随着请求头一起发送过去了。整个过程与上面的差不多，不过需要注意的是响应头需要有`Access-Control-Allow-Credentials: true` 才行，而且`Access-Control-Allow-Origin`这个值必须为请求资源的域，换成\*是不可以的。

对于IE8、9来说需要定义的是`XDomainRequest`对象，这个和`XMLHttpRequest`差不多，还是用例子说明吧：

```Javascript
var xdr = new XDomainRequest();
xdr.onload = handler;
xdr.open("get", "http://example.com");
xdr.send(null);
```

需要注意的不同的地方是：

* `cookie`不会随请求发送，也不会随相应返回
* 只能设置请求头部信息的`Content-Type`字段
* 不能访问响应头部信息
* 只支持`GET`和`POST`
* 异步执行

[HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

[Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

今天早上收到了百度一面的电话面试，觉得表现的还不错，希望有二面啦。加油！
