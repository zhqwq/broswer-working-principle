<template><h1 id="_07-变量提升-javascript代码是按顺序执行的吗" tabindex="-1"><a class="header-anchor" href="#_07-变量提升-javascript代码是按顺序执行的吗" aria-hidden="true">#</a> 07 | 变量提升：JavaScript代码是按顺序执行的吗？</h1>
<p>讲解完宏观视角下的浏览器后，从这篇文章开始，我们就进入下一个新的模块了，这里我会对 JavaScript 执行原理做深入介绍。</p>
<p>今天在该模块的第一篇文章，我们主要讲解<strong>执行上下文</strong>相关的内容。那为什么先讲执行上下文呢？它这么重要吗？可以这么说，<strong>只有理解了 JavaScrip 的执行上下文，你才能更好地理解 JavaScript 语言本身</strong>，比如变量提升、作用域和闭包等。不仅如此，理解执行上下文和调用栈的概念还能助你成为一名更合格的前端开发者。</p>
<p>不过由于我们专栏不是专门讲 JavaScript 语言的，所以我并不会对 JavaScript 语法本身做过多介绍。本文主要是从 JavaScript 的顺序执行讲起，然后<strong>一步步带你了解 JavaScript 是怎么运行的。</strong></p>
<p>接下来咱们先看段代码，你觉得下面这段代码输出的结果是什么？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
<span class="token keyword">var</span> myname <span class="token operator">=</span> <span class="token string">'极客时间'</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'函数showName被执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>使用过 JavaScript 开发的程序员应该都知道，JavaScript 是按顺序执行的。若按照这个逻辑来理解的话，那么：</p>
<ul>
<li>
<p>当执行到第 1 行的时候，由于函数 showName 还没有定义，所以执行应该会报错；</p>
</li>
<li>
<p>同样执行第 2 行的时候，由于变量 myname 也未定义，所以同样也会报错。</p>
</li>
</ul>
<p>然而实际执行结果却并非如此， 如下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/fb/03/fbafaba4ad7092cbee011a8a02e38903.png" alt="img"></p>
<p>第 1 行输出“函数 showName 被执行”，第 2 行输出“undefined”，这和前面想象中的顺序执行有点不一样啊！</p>
<p>通过上面的执行结果，你应该已经知道了函数或者变量可以在定义之前使用，那如果使用没有定义的变量或者函数，JavaScript 代码还能继续执行吗？为了验证这点，我们可以删除第 3 行变量 myname 的定义，如下所示：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'函数showName被执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后再次执行这段代码时，JavaScript 引擎就会报错，结果如下：</p>
<p><img src="https://static001.geekbang.org/resource/image/a5/c2/a5262e2ca891ea114dfaf1e37f9ca4c2.png" alt="img"></p>
<p>从上面两段代码的执行结果来看，我们可以得出如下三个结论。</p>
<ol>
<li>
<p>在执行过程中，若使用了未声明的变量，那么 JavaScript 执行会报错。</p>
</li>
<li>
<p>在一个变量定义之前使用它，不会出错，但是该变量的值会为 undefined，而不是定义时的值。</p>
</li>
<li>
<p>在一个函数定义之前使用它，不会出错，且函数能正确执行。</p>
</li>
</ol>
<p>第一个结论很好理解，因为变量没有定义，这样在执行 JavaScript 代码时，就找不到该变量，所以 JavaScript 会抛出错误。</p>
<p>但是对于第二个和第三个结论，就挺让人费解的：</p>
<ul>
<li>
<p>变量和函数为什么能在其定义之前使用？这似乎表明 JavaScript 代码并不是一行一行执行的。</p>
</li>
<li>
<p>同样的方式，变量和函数的处理结果为什么不一样？比如上面的执行结果，提前使用的 showName 函数能打印出来完整结果，但是提前使用的 myname 变量值却是 undefined，而不是定义时使用的“极客时间”这个值。</p>
</li>
</ul>
<h2 id="变量提升-hoisting" tabindex="-1"><a class="header-anchor" href="#变量提升-hoisting" aria-hidden="true">#</a> 变量提升（Hoisting）</h2>
<p>要解释这两个问题，你就需要先了解下什么是变量提升。</p>
<p>不过在介绍变量提升之前，我们先通过下面这段代码，来看看什么是 JavaScript 中的<strong>声明</strong>和<strong>赋值</strong>。</p>
<p><code v-pre>var myname = '极客时间'</code></p>
<p>这段代码你可以把它看成是两行代码组成的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myname <span class="token comment">//声明部分</span>
myname <span class="token operator">=</span> <span class="token string">'极客时间'</span> <span class="token comment">//赋值部分</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/ec/3c/ec882f2d9deec26ce168b409f274533c.png" alt="img"></p>
<p>上面是<strong>变量</strong>的声明和赋值，那接下来我们再来看看<strong>函数</strong>的声明和赋值，结合下面这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>第一个函数 foo 是一个完整的函数声明，也就是说没有涉及到赋值操作；第二个函数是先声明变量 bar，再把function(){console.log('bar')}赋值给 bar。为了直观理解，你可以参考下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/61/77/611c09ab995b9b608d9c0db193266777.png" alt="img"></p>
<p>好了，理解了声明和赋值操作，那接下来我们就可以聊聊什么是变量提升了。</p>
<p><strong>所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。</strong></p>
<p>下面我们来模拟下实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*
* 变量提升部分
*/</span>
<span class="token comment">// 把变量 myname提升到开头，</span>
<span class="token comment">// 同时给myname赋值为undefined</span>
<span class="token keyword">var</span> myname <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token comment">// 把函数showName提升到开头</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'showName被调用'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
* 可执行代码部分
*/</span>
<span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
<span class="token comment">// 去掉var声明部分，保留赋值语句</span>
myname <span class="token operator">=</span> <span class="token string">'极客时间'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>为了模拟变量提升的效果，我们对代码做了以下调整，如下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/ce/d5/cefe564dbff729e735a834fd9e3bd0d5.png" alt="img"></p>
<p>从图中可以看出，对原来的代码主要做了两处调整：</p>
<ul>
<li>
<p>第一处是把声明的部分都提升到了代码开头，如变量 myname 和函数 showName，并给变量设置默认值 undefined；</p>
</li>
<li>
<p>第二处是移除原本声明的变量和函数，如var myname = '极客时间'的语句，移除了 var 声明，整个移除 showName 的函数声明。</p>
</li>
</ul>
<p>通过这两步，就可以实现变量提升的效果。你也可以执行这段模拟变量提升的代码，其输出结果和第一段代码应该是完全一样的。</p>
<p>通过这段模拟的变量提升代码，相信你已经明白了可以在定义之前使用变量或者函数的原因——<strong>函数和变量在执行之前都提升到了代码开头。</strong></p>
<h2 id="javascript-代码的执行流程" tabindex="-1"><a class="header-anchor" href="#javascript-代码的执行流程" aria-hidden="true">#</a> JavaScript 代码的执行流程</h2>
<p>从概念的字面意义上来看，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但，这并不准确。<strong>实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中</strong>。对，你没听错，一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，<strong>编译</strong>完成之后，才会进入<strong>执行</strong>阶段。大致流程你可以参考下图：</p>
<p><img src="https://static001.geekbang.org/resource/image/64/1e/649c6e3b5509ffd40e13ce9c91b3d91e.png" alt="img"></p>
<h3 id="_1-编译阶段" tabindex="-1"><a class="header-anchor" href="#_1-编译阶段" aria-hidden="true">#</a> 1. 编译阶段</h3>
<p>那么编译阶段和变量提升存在什么关系呢？</p>
<p>为了搞清楚这个问题，我们还是回过头来看上面那段模拟变量提升的代码，为了方便介绍，可以把这段代码分成两部分。</p>
<p><strong>第一部分：变量提升部分的代码。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myname <span class="token operator">=</span> <span class="token keyword">undefined</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'函数showName被执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>第二部分：执行部分的代码。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
myname <span class="token operator">=</span> <span class="token string">'极客时间'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>下面我们就可以把 JavaScript 的执行流程细化，如下图所示：</p>
<p><img src="https://static001.geekbang.org/resource/image/06/13/0655d18ec347a95dfbf843969a921a13.png" alt="img"></p>
<p>从上图可以看出，输入一段代码，经过编译后，会生成两部分内容：<strong>执行上下文（Execution context）和可执行代码</strong>。</p>
<p><strong>执行上下文是 JavaScript 执行一段代码时的运行环境</strong>，比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。</p>
<p>关于执行上下文的细节，我会在下一篇文章《08 | 调用栈：为什么 JavaScript 代码会出现栈溢出？》做详细介绍，现在你只需要知道，在执行上下文中存在一个<strong>变量环境的对象</strong>（Viriable Environment），该对象中保存了变量提升的内容，比如上面代码中的变量 myname 和函数 showName，都保存在该对象中。</p>
<p>你可以简单地把变量环境对象看成是如下结构：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>VariableEnvironment
myname -> undefined,
showName ->function : {console.log(myname)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>了解完变量环境对象的结构后，接下来，我们再结合下面这段代码来分析下是如何生成变量环境对象的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
<span class="token keyword">var</span> myname <span class="token operator">=</span> <span class="token string">'极客时间'</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'函数showName被执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>我们可以一行一行来分析上述代码：</p>
<ul>
<li>
<p>第 1 行和第 2 行，由于这两行代码不是声明操作，所以 JavaScript 引擎不会做任何处理；</p>
</li>
<li>
<p>第 3 行，由于这行是经过 var 声明的，因此 JavaScript 引擎将在环境对象中创建一个名为 myname 的属性，并使用 undefined 对其初始化；</p>
</li>
<li>
<p>第 4 行，JavaScript 引擎发现了一个通过 function 定义的函数，所以它将函数定义存储到堆 (HEAP）中，并在环境对象中创建一个 showName 的属性，然后将该属性值指向堆中函数的位置（不了解堆也没关系，JavaScript 的执行堆和执行栈我会在后续文章中介绍）。</p>
</li>
</ul>
<p>这样就生成了变量环境对象。接下来 JavaScript 引擎会把声明以外的代码编译为字节码，至于字节码的细节，我也会在后面文章中做详细介绍，你可以类比如下的模拟代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myname<span class="token punctuation">)</span>
myname <span class="token operator">=</span> <span class="token string">'极客时间'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>好了，现在有了执行上下文和可执行代码了，那么接下来就到了执行阶段了。</p>
<h3 id="_2-执行阶段" tabindex="-1"><a class="header-anchor" href="#_2-执行阶段" aria-hidden="true">#</a> 2. 执行阶段</h3>
<p>JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行。下面我们就来一行一行分析下这个执行过程：</p>
<ul>
<li>
<p>当执行到 showName 函数时，JavaScript 引擎便开始在变量环境对象中查找该函数，由于变量环境对象中存在该函数的引用，所以 JavaScript 引擎便开始执行该函数，并输出“函数 showName 被执行”结果。</p>
</li>
<li>
<p>接下来打印“myname”信息，JavaScript 引擎继续在变量环境对象中查找该对象，由于变量环境存在 myname 变量，并且其值为 undefined，所以这时候就输出 undefined。</p>
</li>
<li>
<p>接下来执行第 3 行，把“极客时间”赋给 myname 变量，赋值后变量环境中的 myname 属性值改变为“极客时间”，变量环境如下所示：</p>
</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>VariableEnvironment:
myname -> "极客时间",
showName ->function : {console.log(myname)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>好了，以上就是一段代码的编译和执行流程。实际上，编译阶段和执行阶段都是非常复杂的，包括了词法分析、语法解析、代码优化、代码生成等，这些内容我会在《14 | 编译器和解释器：V8 是如何执行一段 JavaScript 代码的？》那节详细介绍，在本篇文章中你只需要知道 JavaScript 代码经过编译生成了什么内容就可以了。</p>
<h2 id="代码中出现相同的变量或者函数怎么办" tabindex="-1"><a class="header-anchor" href="#代码中出现相同的变量或者函数怎么办" aria-hidden="true">#</a> 代码中出现相同的变量或者函数怎么办？</h2>
<p>现在你已经知道了，在执行一段 JavaScript 代码之前，会编译代码，并将代码中的函数和变量保存到执行上下文的变量环境中，那么如果代码中出现了重名的函数或者变量，JavaScript 引擎会如何处理？</p>
<p>我们先看下面这样一段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'极客邦'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'极客时间'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在上面代码中，我们先定义了一个 showName 的函数，该函数打印出来“极客邦”；然后调用 showName，并定义了一个 showName 函数，这个 showName 函数打印出来的是“极客时间”；最后接着继续调用 showName。那么你能分析出来这两次调用打印出来的值是什么吗？</p>
<p>我们来分析下其完整执行流程：</p>
<ul>
<li>
<p>首先是<strong>编译阶段</strong>。遇到了第一个 showName 函数，会将该函数体存放到变量环境中。接下来是第二个 showName 函数，继续存放至变量环境中，但是变量环境中已经存在一个 showName 函数了，此时，<strong>第二个 showName 函数会将第一个 showName 函数覆盖掉</strong>。这样变量环境中就只存在第二个 showName 函数了。</p>
</li>
<li>
<p>接下来是<strong>执行阶段</strong>。先执行第一个 showName 函数，但由于是从变量环境中查找 showName 函数，而变量环境中只保存了第二个 showName 函数，所以最终调用的是第二个函数，打印的内容是“极客时间”。第二次执行 showName 函数也是走同样的流程，所以输出的结果也是“极客时间”。</p>
</li>
</ul>
<p>综上所述，<strong>一段代码如果定义了两个相同名字的函数，那么最终生效的是最后一个函数</strong>。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>好了，今天就到这里，下面我来简单总结下今天的主要内容：</p>
<ul>
<li>
<p>JavaScript 代码执行过程中，需要先做<strong>变量提升</strong>，而之所以需要实现变量提升，是因为 JavaScript 代码在执行之前需要先<strong>编译</strong>。</p>
</li>
<li>
<p>在<strong>编译阶段</strong>，变量和函数会被存放到<strong>变量环境</strong>中，变量的默认值会被设置为 undefined；在代码<strong>执行阶段</strong>，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。</p>
</li>
<li>
<p>如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定义的会覆盖掉之前定义的。</p>
</li>
</ul>
<p>以上就是今天所讲的主要内容，当然，学习这些内容并不是让你掌握一些 JavaScript 小技巧，其主要目的是让你清楚 JavaScript 的执行机制：<strong>先编译，再执行</strong>。</p>
<p>如果你了解了 JavaScript 执行流程，那么在编写代码时，你就能避开一些陷阱；在分析代码过程中，也能通过分析 JavaScript 的执行过程来定位问题。</p>
<h2 id="思考时间" tabindex="-1"><a class="header-anchor" href="#思考时间" aria-hidden="true">#</a> 思考时间</h2>
<p>最后，看下面这段代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> <span class="token function-variable function">showName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">showName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

你能按照 JavaScript 的执行流程，来分析最终输出结果吗？

欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。感谢阅读，如果你觉得这篇文章对你有帮助的话，也欢迎把它分享给更多的朋友。</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></template>
