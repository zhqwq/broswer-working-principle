<template><h1 id="加餐五-性能分析工具-如何分析performance中的main指标" tabindex="-1"><a class="header-anchor" href="#加餐五-性能分析工具-如何分析performance中的main指标" aria-hidden="true">#</a> 加餐五 | 性能分析工具：如何分析Performance中的Main指标？</h1>
<p>你好，我是李兵</p>
<p>上节我们介绍了如何使用 Performance，而且我们还提到了性能指标面板中的 Main 指标，它详细地记录了渲染主线程上的任务执行记录，通过分析 Main 指标，我们就能够定位到页面中所存在的性能问题，本节，我们就来介绍如何分析 Main 指标。</p>
<h2 id="任务-vs-过程" tabindex="-1"><a class="header-anchor" href="#任务-vs-过程" aria-hidden="true">#</a> 任务 vs 过程</h2>
<p>不过在开始之前，我们要讲清楚两个概念，那就是 Main 指标中的任务和过程，在《<a href="/guide/15" target="_blank" rel="noopener noreferrer">15 | 消息队列和事件循环：页面是怎么活起来的？<ExternalLinkIcon/></a>》和《<a href="/guide/extra-2" target="_blank" rel="noopener noreferrer">加餐二｜任务调度：有了 setTimeOut，为什么还要使用 rAF？<ExternalLinkIcon/></a>》这两节我们分析过，渲染进程中维护了消息队列，如果通过 SetTimeout 设置的回调函数，通过鼠标点击的消息事件，都会以任务的形式添加消息队列中，然后任务调度器会按照一定规则从消息队列中取出合适的任务，并让其在渲染主线程上执行。</p>
<p>而我们今天所分析的 Main 指标就记录渲染主线上所执行的全部<strong>任务</strong>，以及每个任务的详细执行<strong>过程</strong>。</p>
<p>你可以打开 Chrome 的开发者工具，选择 Performance 标签，然后录制加载阶段任务执行记录，然后关注 Main 指标，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/c3/cc/c3add6d821fd2a45a14bb2388c9c2dcc.png" alt="任务和过程"></p>
<p>观察上图，图上方有很多一段一段灰色横条，<strong>每个灰色横条就对应了一个任务，灰色长条的长度对应了任务的执行时长。<strong>通常，渲染主线程上的任务都是比较复杂的，如果只单纯记录任务执行的时长，那么依然很难定位问题，因此，还需要将任务执行过程中的一些关键的细节记录下来，这些细节就是任务的</strong>过程</strong>，灰线下面的横条就是一个个过程，同样这些横条的长度就代表这些过程执行的时长。</p>
<p>直观地理解，你可以把任务看成是一个 Task 函数，在执行 Task 函数的过程中，它会调用一系列的子函数，这些子函数就是我们所提到的<strong>过程</strong>。为了让你更好地理解，我们来分析下面这个任务的图形：</p>
<p><img src="https://static001.geekbang.org/resource/image/aa/18/aabfd0e5e746bbaeaf14c62c703a7718.png" alt="单个任务"></p>
<p>观察上面这个任务记录的图形，你可以把该图形看成是下面 Task 函数的执行过程：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token constant">A1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token constant">A2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">Task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">Task</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>结合代码和上面的图形，我们可以得出以下信息：</p>
<ul>
<li>
<p>Task 任务会首先调用 A 过程；</p>
</li>
<li>
<p>随后 A 过程又依次调用了 A1 和 A2 过程，然后 A 过程执行完毕；</p>
</li>
<li>
<p>随后 Task 任务又执行了 B 过程；</p>
</li>
<li>
<p>B 过程执行结束，Task 任务执行完成；</p>
</li>
<li>
<p>从图中可以看出，A 过程执行时间最长，所以在 A1 过程时，拉长了整个任务的执行时长。</p>
</li>
</ul>
<h2 id="分析页面加载过程" tabindex="-1"><a class="header-anchor" href="#分析页面加载过程" aria-hidden="true">#</a> 分析页面加载过程</h2>
<p>通过以上介绍，相信你已经掌握了如何解读 Main 指标中的任务了，那么接下来，我们就可以结合 Main 指标来分析页面的加载过程。我们先来分析一个简单的页面，代码如下所示：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Main<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">area</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 2px ridge<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token selector">box</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>106<span class="token punctuation">,</span> 24<span class="token punctuation">,</span> 238<span class="token punctuation">,</span> 0.26<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 5em<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 5em<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>area<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box rAF<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">function</span> <span class="token function">setNewArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span>
            el<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'class'</span><span class="token punctuation">,</span> <span class="token string">'area'</span><span class="token punctuation">)</span>
            el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'&lt;div class="box rAF">&lt;/div>'</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">setNewArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>观察这段代码，我们可以看出，它只是包含了一段 CSS 样式和一段 JavaScript 内嵌代码，其中在 JavaScript 中还执行了 DOM 操作了，我们就结合这段代码来分析页面的加载流程。</p>
<p>首先生成报告页，再观察报告页中的 Main 指标，由于阅读实际指标比较费劲，所以我手动绘制了一些关键的任务和其执行过程，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/51/4b/5175c0405fa4d9d1a1e4fd261b92dc4b.png" alt="Main 指标"></p>
<p>通过上面的图形我们可以看出，加载过程主要分为三个阶段，它们分别是：</p>
<ol>
<li>
<p>导航阶段，该阶段主要是从网络进程接收 HTML 响应头和 HTML 响应体。</p>
</li>
<li>
<p>解析 HTML 数据阶段，该阶段主要是将接收到的 HTML 数据转换为 DOM 和 CSSOM。</p>
</li>
<li>
<p>生成可显示的位图阶段，该阶段主要是利用 DOM 和 CSSOM，经过计算布局、生成层树 (LayerTree)、生成绘制列表 (Paint)、完成合成等操作，生成最终的图片。</p>
</li>
</ol>
<p>那么接下来，我就按照这三个步骤来介绍如何解读 Main 指标上的数据。</p>
<h2 id="导航阶段" tabindex="-1"><a class="header-anchor" href="#导航阶段" aria-hidden="true">#</a> 导航阶段</h2>
<p>我们先来<strong>看导航阶段</strong>，不过在分析这个阶段之前，我们简要地回顾下导航流程，大致的流程是这样的：</p>
<p>当你点击了 Performance 上的重新录制按钮之后，浏览器进程会通知网络进程去请求对应的 URL 资源；一旦网络进程从服务器接收到 URL 的响应头，便立即判断该响应头中的 content-type 字段是否属于 text/html 类型；如果是，那么浏览器进程会让当前的页面执行退出前的清理操作，比如执行 JavaScript 中的 beforunload 事件，清理操作执行结束之后就准备显示新页面了，这包括了解析、布局、合成、显示等一系列操作。</p>
<p>因此，在导航阶段，这些任务实际上是在老页面的渲染主线程上执行的。如果你想要了解导航流程的详细细节，我建议你回顾下《<a href="/guide/04" target="_blank" rel="noopener noreferrer">04 | 导航流程：从输入 URL 到页面展示，这中间发生了什么？<ExternalLinkIcon/></a>》这篇文章，在这篇文中我们有介绍导航流程，而导航阶段和导航流程又有着密切的关联。</p>
<p>回顾了导航流程之后，我们接着来分析第一个阶段的任务图形，为了让你更加清晰观察上图中的导航阶段，我将其放大了，最终效果如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/39/f3/39c8e28df9e60f2e0d8378da350dc6f3.png" alt="请求 HTML 数据阶段"></p>
<p>观察上图，如果你熟悉了导航流程，那么就很容易根据图形分析出这些任务的执行流程了。</p>
<p>具体地讲，当你点击重新加载按钮后，当前的页面会执行上图中的这个任务：</p>
<ul>
<li>
<p>该任务的第一个子过程就是 Send request，该过程表示网络请求已被发送。然后该任务进入了等待状态。</p>
</li>
<li>
<p>接着由网络进程负责下载资源，当接收到响应头的时候，该任务便执行 Receive Respone 过程，该过程表示接收到 HTTP 的响应头了。</p>
</li>
<li>
<p>接着执行 DOM 事件：pagehide、visibilitychange 和 unload 等事件，如果你注册了这些事件的回调函数，那么这些回调函数会依次在该任务中被调用。</p>
</li>
<li>
<p>这些事件被处理完成之后，那么接下来就接收 HTML 数据了，这体现在了 Recive Data 过程，Recive Data 过程表示请求的数据已被接收，如果 HTML 数据过多，会存在多个 Receive Data 过程。</p>
</li>
</ul>
<p>等到所有的数据都接收完成之后，渲染进程会触发另外一个任务，该任务主要执行 Finish load 过程，该过程表示网络请求已经完成。</p>
<h2 id="解析-html-数据阶段" tabindex="-1"><a class="header-anchor" href="#解析-html-数据阶段" aria-hidden="true">#</a> 解析 HTML 数据阶段</h2>
<p>好了，导航阶段结束之后，就进入到了解析 HTML 数据阶段了，这个阶段的主要任务就是通过解析 HTML 数据、解析 CSS 数据、执行 JavaScript 来生成 DOM 和 CSSOM。那么下面我们继续来分析这个阶段的图形，看看它到底是怎么执行的？同样，我也放大了这个阶段的图形，你可以观看下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/89/9d/89f2f61ed51d7a543390c4262489479d.png" alt="解析 HTML 数据阶段"></p>
<p>观察上图这个图形，我们可以看出，其中一个主要的过程是 HTMLParser，顾名思义，这个过程是用来解析 HTML 文件，解析的就是上个阶段接收到的 HTML 数据。</p>
<ol>
<li>
<p>在 ParserHTML 的过程中，如果解析到了 script 标签，那么便进入了脚本执行过程，也就是图中的 Evalute Script。</p>
</li>
<li>
<p>我们知道，要执行一段脚本我们需要首先编译该脚本，于是在 Evalute Script 过程中，先进入了脚本编译过程，也就是图中的 Complie Script。脚本编译好之后，就进入程序执行过程，执行全局代码时，V8 会先构造一个 anonymous 过程，在执行 anonymous 过程中，会调用 setNewArea 过程，setNewArea 过程中又调用了 createElement，由于之后调用了 document.append 方法，该方法会触发 DOM 内容的修改，所以又强制执行了 ParserHTML 过程生成的新的 DOM。</p>
</li>
<li>
<p>DOM 生成完成之后，会触发相关的 DOM 事件，比如典型的 DOMContentLoaded，还有 readyStateChanged。</p>
</li>
</ol>
<p>DOM 生成之后，ParserHTML 过程继续计算样式表，也就是 Reculate Style，这就是生成 CSSOM 的过程，关于 Reculate Style 过程，你可以参考我们在《<a href="/guide/05" target="_blank" rel="noopener noreferrer">05 | 渲染流程（上）：HTML、CSS 和 JavaScript，是如何变成页面的？<ExternalLinkIcon/></a>》节的内容，到了这里一个完整的 ParserHTML 任务就执行结束了。</p>
<h2 id="生成可显示位图阶段" tabindex="-1"><a class="header-anchor" href="#生成可显示位图阶段" aria-hidden="true">#</a> 生成可显示位图阶段</h2>
<p>生成了 DOM 和 CSSOM 之后，就进入了第三个阶段：生成页面上的位图。通常这需要经历<strong>布局 (Layout)、分层、绘制、合成</strong>等一系列操作，同样，我将第三个阶段的流程也放大了，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/2b/ce/2bfdcdbf340b0ee7ce5d8a6109a56bce.png" alt="生成可显示的位图"></p>
<p>结合上图，我们可以发现，在生成完了 DOM 和 CSSOM 之后，渲染主线程首先执行了一些 DOM 事件，诸如 readyStateChange、load、pageshow。具体地讲，如果你使用 JavaScript 监听了这些事件，那么这些监听的函数会被渲染主线程依次调用。</p>
<p>接下来就正式进入显示流程了，大致过程如下所示。</p>
<ol>
<li>
<p>首先执行布局，这个过程对应图中的 <strong>Layout</strong>。</p>
</li>
<li>
<p>然后更新层树 (LayerTree)，这个过程对应图中的 <strong>Update LayerTree</strong>。</p>
</li>
<li>
<p>有了层树之后，就需要为层树中的每一层准备绘制列表了，这个过程就称为 <strong>Paint</strong>。</p>
</li>
<li>
<p>准备每层的绘制列表之后，就需要利用绘制列表来生成相应图层的位图了，这个过程对应图中的 <strong>Composite Layers</strong>。</p>
</li>
</ol>
<p>走到了 Composite Layers 这步，主线程的任务就完成了，接下来主线程会将合成的任务完全教给合成线程来执行，下面是具体的过程，你也可以对照着 <strong>Composite、Raster 和 GPU</strong> 这三个指标来分析，参考下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/e6/12/e60c8c65dd3d364f73c19d4b0475d112.png" alt="显示流程"></p>
<p>结合渲染流水线和上图，我们再来梳理下最终图像是怎么显示出来的。</p>
<ol>
<li>
<p>首先主线程执行到 Composite Layers 过程之后，便会将绘制列表等信息提交给合成线程，合成线程的执行记录你可以通过 Compositor 指标来查看。</p>
</li>
<li>
<p>合成线程维护了一个 Raster 线程池，线程池中的每个线程称为 Rasterize，用来执行光栅化操作，对应的任务就是 Rasterize Paint。</p>
</li>
<li>
<p>当然光栅化操作并不是在 Rasterize 线程中直接执行的，而是在 GPU 进程中执行的，因此 Rasterize 线程需要和 GPU 线程保持通信。</p>
</li>
<li>
<p>然后 GPU 生成图像，最终这些图层会被提交给浏览器进程，浏览器进程将其合成并最终显示在页面上。</p>
</li>
</ol>
<h2 id="通用分析流程" tabindex="-1"><a class="header-anchor" href="#通用分析流程" aria-hidden="true">#</a> 通用分析流程</h2>
<p>通过对 Main 指标的分析，我们把导航流程，解析流程和最终的显示流程都串起来了，通过 Main 指标的分析，我们对页面的加载过程执行流程又有了新的认识，虽然实际情况比这个复杂，但是万变不离其宗，所有的流程都是围绕这条线来展开的，也就是说，先经历导航阶段，然后经历 HTML 解析，最后生成最终的页面。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>本文主要的目的是让我们学会如何分析 Main 指标。通过页面加载过程的分析，就能掌握一套标准的分析 Main 指标的方法，在该方法中，我将加载过程划分为三个阶段：</p>
<ol>
<li>
<p>导航阶段；</p>
</li>
<li>
<p>解析 HTML 文件阶段；</p>
</li>
<li>
<p>生成位图阶段。</p>
</li>
</ol>
<p>在导航流程中，主要是处理响应头的数据，并执行一些老页面退出之前的清理操作。在解析 HTML 数据阶段，主要是解析 HTML 数据、解析 CSS 数据、执行 JavaScript 来生成 DOM 和 CSSOM。最后在生成最终显示位图的阶段，主要是将生成的 DOM 和 CSSOM 合并，这包括了布局 (Layout)、分层、绘制、合成等一系列操作。</p>
<p>通过 Main 指标，我们完整地分析了一个页面从加载到显示的过程，了解这个流程，我们自然就会去分析页面的性能瓶颈，比如你可以通过 Main 指标来分析 JavaScript 是否执行时间过久，或者通过 Main 指标分析代码里面是否存在强制同步布局等操作，分析出来这些原因之后，我们可以有针对性地去优化我们的程序。</p>
<h2 id="思考题" tabindex="-1"><a class="header-anchor" href="#思考题" aria-hidden="true">#</a> 思考题</h2>
<p>在《<a href="/guide/18" target="_blank" rel="noopener noreferrer">18| 宏任务和微任务：不是所有任务都是一个待遇<ExternalLinkIcon/></a>》这节中介绍微任务时，我们提到过，在一个任务的执行过程中，会在一些特定的时间点来检查是否有微任务需要执行，我们把这些特定的检查时间点称为检查点。了解了<strong>检查点</strong>之后，你可以通过 Performance 的 Main 指标来分析下面这两段代码：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"成功!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">successMessage</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"p! "</span> <span class="token operator">+</span> successMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>


        <span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"成功!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">successMessage</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"p1! "</span> <span class="token operator">+</span> successMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bod</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"成功!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">successMessage</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"p! "</span> <span class="token operator">+</span> successMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"成功!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">successMessage</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"p1! "</span> <span class="token operator">+</span> successMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>今天留给你的任务是结合 Main 指标，来分析上面这两段代码中微任务执行的时间点有何不同，并给出分析结果和原因。欢迎在留言区与我交流。</p>
<p>感谢阅读，如果你觉得这篇文章对你有帮助的话，也欢迎把它分享给更多的朋友。</p>
</template>
