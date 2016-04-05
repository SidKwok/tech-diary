# Cookie、SessionStorage和LocalStorage
## 2016-04-04

oh Yeah! 终于把个人博客给整完了，个人感觉满意，而且明天又可以去新的地方安静地码代码了（听说还有双屏），虽然实习还是没有找到，但是无碍开心！。

好了，进正题了，今天深入了解一下浏览器的各种存储方式，之前一直都没有概念，今天来总结一下。

### Cookie

Cookie是用来存储客户端数据的，是存在于用户硬盘中的一个文件，每次浏览器发送请求都会将Cookie装进消息头中，所以这也会造成一定流量的浪费。在js中可以通过`document.cookie`对Cookie值进行访问与修改。每一个Cookie都对应着一个域名，意味着Cookie只能在同域中共享，不能跨域。Cookie能装的数据最大是4KB。

```javascript
document.cookie
"PHPSESSID=web3~ql1jnvp69avo9k373dvhblir86; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1459693551,1459694728,1459694733,1459755476; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1459775028; _ga=GA1.2.1014122426.1458707694; mp_18fe57584af9659dea732cf41c1c0416_mixpanel=%7B%22distinct_id%22%3A%20%22153c23d8ba5409-07f37ca14d64a1-3662760b-fa000-153c23d8ba6783%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; mp_mixpanel__c=724; sf_remember=877dc27158a668934259a466dcbcb49a"
```
大概就是这么一个东西。

说了那么多应该能够清楚Cookie是什么一个东西了，但它究竟有什么用呢？从上面可以知道，每一次的请求都会包括Cookie，所以个人认为Cookie最好就是用来做身份验证。当然它也可以用来传递部分的数据，例如用户行为啊之类的。

服务器通过发送一个名为 Set-Cookie 的HTTP头来创建一个cookie，作为 Response Headers 的一部分。如下图所示，每个Set-Cookie 表示一个 cookie（如果有多个cookie,需写多个Set-Cookie），每个属性也是以名/值对的形式（除了secure），属性间以分号加空格隔开。格式如下：

```
Set-Cookie: name=value[; expires=GMTDate][; domain=domain][; path=path][; secure]
```

注意，通过 Set-Cookie 指定的可选项(域、路径、失效时间、secure标志)只会在「浏览器端」使用，它们都是服务器给浏览器的指示，以指定何时应该发送cookie。这些参数不会被发送至服务器端，只有name和value才会被发送。

### SessionStorage

SessionStorage可以将一部分数据暂时存储下来，刷新了还是存在的，但是当浏览器或者页面关闭了之后，该数据就会消亡。SessionStorage并不参与服务器通信，最大数据量为5MB。

既然暂时存储，而且页面关闭就会消失，所以可以应用于分布操作。譬如有很多程序的教学网站，通常需要你做完一步然后激活下一步，如果用Cookie的话就会发送多次数据，而且数据还不完整，所以这个时候可以通过SessionStorage将分步的数据存储下来，然后一并发向服务器。

### LocalStorage

这是HTML5新加入的技术，虽然我没有用过，但是感觉这东西很6。首先，它可以通过直接添加属性的方式来进行数据的存储，通常会使用`setItem()`、`getItem()`和`removeItem()`，字面意思的方法。但是它只能存储`string`类型。LocalStorage并不参与服务器通信，最大数据量为5MB。

还说一个更6的，就是可以对`window`添加一个`storge`事件，当LocalStorage的值发生改变的时候就会触发该事件，有`key`,`oldValue`,`newValue`和`url/uri`等属性，字面意思。


[常用的本地存储——cookie篇](https://segmentfault.com/a/1190000004743454)

[详说 Cookie, LocalStorage 与 SessionStorage](https://segmentfault.com/a/1190000002723469)
