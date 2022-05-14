<template><h1 id="_13-垃圾回收-垃圾数据是如何自动回收的" tabindex="-1"><a class="header-anchor" href="#_13-垃圾回收-垃圾数据是如何自动回收的" aria-hidden="true">#</a> 13 | 垃圾回收：垃圾数据是如何自动回收的？</h1>
<p>在<a href="/guide/12" target="_blank" rel="noopener noreferrer">上一篇文章<ExternalLinkIcon/></a>中，我们提到了 JavaScript 中的数据是如何存储的，并通过例子分析了<strong>原始数据类型是存储在栈空间中的，引用类型的数据是存储在堆空间中的</strong>。通过这种分配方式，我们解决了数据的内存分配的问题。</p>
<p>不过有些数据被使用之后，可能就不再需要了，我们把这种数据称为<strong>垃圾数据</strong>。如果这些垃圾数据一直保存在内存中，那么内存会越用越多，所以我们需要<strong>对这些垃圾数据进行回收，以释放有限的内存空间</strong>。</p>
<h2 id="不同语言的垃圾回收策略" tabindex="-1"><a class="header-anchor" href="#不同语言的垃圾回收策略" aria-hidden="true">#</a> 不同语言的垃圾回收策略</h2>
<p>通常情况下，垃圾数据回收分为<strong>手动回收</strong>和<strong>自动回收</strong>两种策略。</p>
<p>如 C/C++ 就是使用手动回收策略，<strong>何时分配内存、何时销毁内存都是由代码控制的</strong>，你可以参考下面这段 C 代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//在堆中分配内存</span>
char<span class="token operator">*</span> p <span class="token operator">=</span> <span class="token punctuation">(</span>char<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">2048</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//在堆空间中分配2048字节的空间，并将分配后的引用地址保存到p中</span>

<span class="token comment">//使用p指向的内存</span>
<span class="token punctuation">{</span>
<span class="token comment">//....</span>
<span class="token punctuation">}</span>

<span class="token comment">//使用结束后，销毁这段内存</span>
<span class="token function">free</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>；
p <span class="token operator">=</span> <span class="token constant">NULL</span>；
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>从上面这段 C 代码可以看出来，要使用堆中的一块空间，我们需要先调用 mallco 函数分配内存，然后再使用；当不再需要这块数据的时候，就要手动调用 free 函数来释放内存。如果这段数据已经不再需要了，但是又没有主动调用 free 函数来销毁，那么这种情况就被称为<strong>内存泄漏</strong>。</p>
<p>另外一种使用的是自动垃圾回收的策略，如 JavaScript、Java、Python 等语言，<strong>产生的垃圾数据是由垃圾回收器来释放的</strong>，并不需要手动通过代码来释放。</p>
<p>对于 JavaScript 而言，也正是这个“自动”释放资源的特性带来了很多困惑，也让一些 JavaScript 开发者误以为可以不关心内存管理，这是一个很大的误解。</p>
<p>那么在本文，我们将围绕“JavaScript 的数据是如何回收的”这个话题来展开探讨。因为数据是存储在栈和堆两种内存空间中的，所以接下来我们就来分别介绍“栈中的垃圾数据”和“堆中的垃圾数据”是如何回收的。</p>
<h2 id="调用栈中的数据是如何回收的" tabindex="-1"><a class="header-anchor" href="#调用栈中的数据是如何回收的" aria-hidden="true">#</a> 调用栈中的数据是如何回收的</h2>
<p>首先是调用栈中的数据，我们还是通过一段示例代码的执行流程来分析其回收机制，具体如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"极客邦"</span><span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"极客时间"</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>当执行到第 6 行代码时，其调用栈和堆空间状态图如下所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/d8/b0/d807ca19c2c8853ef5a38dca0fb79ab0.jpg" alt="执行到 showName 函数时的内存模型"></p>
<p>从图中可以看出，原始类型的数据被分配到栈中，引用类型的数据会被分配到堆中。当 foo 函数执行结束之后，foo 函数的执行上下文会从堆中被销毁掉，那么它是怎么被销毁的呢？下面我们就来分析一下。</p>
<p>在<a href="/guide/12.md" target="_blank" rel="noopener noreferrer">上篇文章<ExternalLinkIcon/></a>中，我们简单介绍过了，如果执行到 showName 函数时，那么 JavaScript 引擎会创建 showName 函数的执行上下文，并将 showName 函数的执行上下文压入到调用栈中，最终执行到 showName 函数时，其调用栈就如上图所示。与此同时，还有一个<strong>记录当前执行状态的指针（称为 ESP）</strong>，指向调用栈中 showName 函数的执行上下文，表示当前正在执行 showName 函数。</p>
<p>接着，当 showName 函数执行完成之后，函数执行流程就进入了 foo 函数，那这时就需要销毁 showName 函数的执行上下文了。ESP 这时候就帮上忙了，JavaScript 会将 ESP 下移到 foo 函数的执行上下文，<strong>这个下移操作就是销毁 showName 函数执行上下文的过程</strong>。</p>
<p>你可能会有点懵，ESP 指针向下移动怎么就能把 showName 的执行上下文销毁了呢？具体你可以看下面这张移动 ESP 前后的对比图：</p>
<p><img src="https://static001.geekbang.org/resource/image/b8/f3/b899cb27c0d92c31f9377db59939aaf3.jpg" alt="从栈中回收 showName 执行上下文"></p>
<p>从图中可以看出，当 showName 函数执行结束之后，ESP 向下移动到 foo 函数的执行上下文中，上面 showName 的执行上下文虽然保存在栈内存中，但是已经是无效内存了。比如当 foo 函数再次调用另外一个函数时，这块内容会被直接覆盖掉，用来存放另外一个函数的执行上下文。</p>
<p>所以说，当一个函数执行结束之后，<strong>JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文</strong>。</p>
<h2 id="堆中的数据是如何回收的" tabindex="-1"><a class="header-anchor" href="#堆中的数据是如何回收的" aria-hidden="true">#</a> 堆中的数据是如何回收的</h2>
<p>通过上面的讲解，我想现在你应该已经知道，当上面那段代码的 foo 函数执行结束之后，ESP 应该是指向全局执行上下文的，那这样的话，showName 函数和 foo 函数的执行上下文就处于无效状态了，不过保存在堆中的两个对象依然占用着空间，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/e8/8c/e80ff553417572f77973b08256b6928c.png" alt="foo 函数执行结束后的内存状态"></p>
<p>从图中可以看出，1003 和 1050 这两块内存依然被占用。<strong>要回收堆中的垃圾数据，就需要用到 JavaScript 中的垃圾回收器了。</strong></p>
<p>所以，接下来我们就来通过 Chrome 的 JavaScript 引擎 V8 来分析下堆中的垃圾数据是如何回收的。</p>
<h2 id="代际假说和分代收集" tabindex="-1"><a class="header-anchor" href="#代际假说和分代收集" aria-hidden="true">#</a> 代际假说和分代收集</h2>
<p>不过在正式介绍 V8 是如何实现回收之前，你需要先学习下**代际假说（The Generational Hypothesis）**的内容，这是垃圾回收领域中一个重要的术语，后续垃圾回收的策略都是建立在该假说的基础之上的，所以很是重要。</p>
<p><strong>代际假说</strong>有以下两个特点：</p>
<ul>
<li>
<p>第一个是大部分对象在内存中存在的时间很短，简单来说，就是很多对象一经分配内存，很快就变得不可访问；</p>
</li>
<li>
<p>第二个是不死的对象，会活得更久。</p>
</li>
</ul>
<p>其实这两个特点不仅仅适用于 JavaScript，同样适用于大多数的动态语言，如 Java、Python 等。</p>
<p>有了代际假说的基础，我们就可以来探讨 V8 是如何实现垃圾回收的了。</p>
<p>通常，垃圾回收算法有很多种，但是并没有哪一种能胜任所有的场景，你需要权衡各种场景，根据对象的生存周期的不同而使用不同的算法，以便达到最好的效果。</p>
<p>所以，在 V8 中会把堆分为<strong>新生代</strong>和<strong>老生代</strong>两个区域，<strong>新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象</strong>。</p>
<p>新生区通常只支持 1～8M 的容量，而老生区支持的容量就大很多了。对于这两块区域，V8 分别使用两个不同的垃圾回收器，以便更高效地实施垃圾回收。</p>
<ul>
<li>
<p><strong>副垃圾回收器，主要负责新生代的垃圾回收。</strong></p>
</li>
<li>
<p><strong>主垃圾回收器，主要负责老生代的垃圾回收。</strong></p>
</li>
</ul>
<h2 id="垃圾回收器的工作流程" tabindex="-1"><a class="header-anchor" href="#垃圾回收器的工作流程" aria-hidden="true">#</a> 垃圾回收器的工作流程</h2>
<p>现在你知道了 V8 把堆分成两个区域——新生代和老生代，并分别使用两个不同的垃圾回收器。其实<strong>不论什么类型的垃圾回收器，它们都有一套共同的执行流程</strong>。</p>
<p>第一步是标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。</p>
<p>第二步是回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。</p>
<p>第三步是做内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为<strong>内存碎片</strong>。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如接下来我们要介绍的副垃圾回收器。</p>
<p>那么接下来，我们就按照这个流程来分析新生代垃圾回收器（副垃圾回收器）和老生代垃圾回收器（主垃圾回收器）是如何处理垃圾回收的。</p>
<h2 id="副垃圾回收器" tabindex="-1"><a class="header-anchor" href="#副垃圾回收器" aria-hidden="true">#</a> 副垃圾回收器</h2>
<p>副垃圾回收器主要负责新生区的垃圾回收。而通常情况下，大多数小的对象都会被分配到新生区，所以说这个区域虽然不大，但是垃圾回收还是比较频繁的。</p>
<p>新生代中用 <strong>Scavenge 算法</strong>来处理。所谓 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/4f/af/4f9310c7da631fa5a57f871099bfbeaf.png" alt="新生区要划分为对象区域和空闲区域"></p>
<p>新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。</p>
<p>在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。</p>
<p>完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，同时这种<strong>角色翻转的操作还能让新生代中的这两块区域无限重复使用下去</strong>。</p>
<p>由于新生代中采用的 Scavenge 算法，所以每次执行清理操作时，都需要将存活的对象从对象区域复制到空闲区域。但复制操作需要时间成本，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以<strong>为了执行效率，一般新生区的空间会被设置得比较小</strong>。</p>
<p>也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript 引擎采用了<strong>对象晋升策略</strong>，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。</p>
<h2 id="主垃圾回收器" tabindex="-1"><a class="header-anchor" href="#主垃圾回收器" aria-hidden="true">#</a> 主垃圾回收器</h2>
<p>主垃圾回收器主要负责老生区中的垃圾回收。除了新生区中晋升的对象，一些大的对象会直接被分配到老生区。因此老生区中的对象有两个特点，一个是对象占用空间大，另一个是对象存活时间长。</p>
<p>由于老生区的对象比较大，若要在老生区中使用 Scavenge 算法进行垃圾回收，复制这些大的对象将会花费比较多的时间，从而导致回收执行效率不高，同时还会浪费一半的空间。因而，主垃圾回收器是采用**标记 - 清除（Mark-Sweep）**的算法进行垃圾回收的。下面我们来看看该算法是如何工作的。</p>
<p>首先是标记过程阶段。标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为<strong>活动对象</strong>，没有到达的元素就可以判断为<strong>垃圾数据</strong>。</p>
<p>比如最开始的那段代码，当 showName 函数执行退出之后，这段代码的调用栈和堆空间如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/6c/69/6c8361d3e52c1c37a06699ed94652e69.png" alt="标记过程"></p>
<p>从上图你可以大致看到垃圾数据的标记过程，当 showName 函数执行结束之后，ESP 向下移动，指向了 foo 函数的执行上下文，这时候如果遍历调用栈，是不会找到引用 1003 地址的变量，也就意味着 1003 这块数据为垃圾数据，被标记为红色。由于 1050 这块数据被变量 b 引用了，所以这块数据会被标记为活动对象。这就是大致的标记过程。</p>
<p>接下来就是垃圾的清除过程。它和副垃圾回收器的垃圾清除过程完全不同，你可以理解这个过程是清除掉红色标记数据的过程，可参考下图大致理解下其清除过程：</p>
<p><img src="https://static001.geekbang.org/resource/image/d0/85/d015db8ad0df7f0ccb1bdb8e31f96e85.png" alt="标记清除过程"></p>
<p>上面的标记过程和清除过程就是标记 - 清除算法，不过对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了另外一种算法——<strong>标记 - 整理（Mark-Compact）</strong>，这个标记过程仍然与标记 - 清除算法里的是一样的，但后续步骤不是直接对可回收对象进行清理，而是让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。你可以参考下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/65/8c/652bd2df726d0aa5e67fe8489f39a18c.png" alt="标记整理过程"></p>
<h2 id="全停顿" tabindex="-1"><a class="header-anchor" href="#全停顿" aria-hidden="true">#</a> 全停顿</h2>
<p>现在你知道了 V8 是使用副垃圾回收器和主垃圾回收器处理垃圾回收的，不过由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做全<strong>停顿（Stop-The-World）</strong>。</p>
<p>比如堆中的数据有 1.5GB，V8 实现一次完整的垃圾回收需要 1 秒以上的时间，这也是由于垃圾回收而引起 JavaScript 线程暂停执行的时间，若是这样的时间花销，那么应用的性能和响应能力都会直线下降。主垃圾回收器执行一次完整的垃圾回收流程如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/98/0c/9898646a08b46bce4f12f918f3c1e60c.png" alt="全停顿"></p>
<p>在 V8 新生代的垃圾回收中，因其空间较小，且存活对象较少，所以全停顿的影响不大，但老生代就不一样了。如果在执行垃圾回收的过程中，占用主线程时间过久，就像上面图片展示的那样，花费了 200 毫秒，在这 200 毫秒内，主线程是不能做其他事情的。比如页面正在执行一个 JavaScript 动画，因为垃圾回收器在工作，就会导致这个动画在这 200 毫秒内无法执行的，这将会造成页面的卡顿现象。</p>
<p>为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为**增量标记（Incremental Marking）**算法。如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/de/e7/de117fc96ae425ed90366e9060aa14e7.png" alt="增量标记"></p>
<p>使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行，这样当执行上述动画效果时，就不会让用户因为垃圾回收任务而感受到页面的卡顿了。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>好了，今天就讲到这里，下面我们就来总结下今天的主要内容。</p>
<p>首先我们介绍了不同语言的垃圾回收策略，然后又说明了栈中的数据是如何回收的，最后重点讲解了 JavaScript 中的垃圾回收器是如何工作的。</p>
<p>从上面的分析你也能看出来，无论是垃圾回收的策略，还是处理全停顿的策略，往往都没有一个完美的解决方案，你需要花一些时间来做权衡，而这需要牺牲当前某几方面的指标来换取其他几个指标的提升。</p>
<p>其实站在工程师的视角，我们经常需要在满足需求的前提下，权衡各个指标的得失，把系统设计得尽可能适应最核心的需求。</p>
<p>生活中处理事情的原则也与之类似，古人很早就说过“两害相权取其轻，两利相权取其重”，所以与其患得患失，不如冷静地分析哪些才是核心诉求，然后果断决策牺牲哪些以使得利益最大化。</p>
<h2 id="思考时间" tabindex="-1"><a class="header-anchor" href="#思考时间" aria-hidden="true">#</a> 思考时间</h2>
<p>今天留给你的思考题是：你是如何判断 JavaScript 中内存泄漏的？可以结合一些你在工作中避免内存泄漏的方法。</p>
<p>欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。感谢阅读，如果你觉得这篇文章对你有帮助的话，也欢迎把它分享给更多的朋友。</p>
</template>
