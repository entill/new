/*rem适配*/
function rem(designWidth, maxWidth) {
	var doc = document,
	win = window,
	docEl = doc.documentElement,
	remStyle = document.createElement("style"),
	tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width>maxWidth && (width=maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
}
rem(375, 1024);




//使用MutationObserver对象封装一个监听 DOM 生成的函数。
(function(win){
  'use strict';

  var listeners = [];
  var doc = win.document;
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
  var observer;

  function ready(selector, fn){
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if(!observer){
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该节点是否已经在DOM中
    check();
  }

  function check(){
  // 检查是否匹配已储存的节点
    for(var i = 0; i < listeners.length; i++){
      var listener = listeners[i];
      // 检查指定节点是否有匹配
      var elements = doc.querySelectorAll(listener.selector);
      for(var j = 0; j < elements.length; j++){
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if(!element.ready){
          element.ready = true;
          // 对该节点调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready;

})(this);

// 使用方法
ready('.foo', function(element){
  // ...
});



// 深拷贝
//  深拷贝就是能够实现真正意义上的数组和对象的拷贝。递归调用"浅拷贝"。（深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象）

// 深拷贝函数：

// 复制代码
// 写法一：
        function deepClone(initalObj, finalObj) {
            var obj = finalObj || {};
            for (var i in initalObj) {
                var prop = initalObj[i];
          
                // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
                if(prop === obj) {
                    continue;
                }
          
                if (typeof prop === 'object') {
                    obj[i] = (prop.constructor === Array) ? [] : {};
                    arguments.callee(prop, obj[i]);
                } else {
                    obj[i] = prop;
                }
            }
            return obj;
        }


// 写法二：
        function deepClone(initalObj, finalObj) {
            var obj = finalObj || {};
            for (var i in initalObj) {
                var prop = initalObj[i];
          
                // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
                if(prop === obj) {
                    continue;
                }
          
                if (typeof prop === 'object') {
                    obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
                } else {
                    obj[i] = prop;
                }
            }
            return obj;
        }
 

// 深拷贝的应用实例
// 复制代码
        // jquery 有提供一个$.extend可以用来做 Deep Copy。
        var $ = require('jquery');
        var obj1 = {
            a: 1,
            b: { f: { g: 1 } },
            c: [1, 2, 3]
        };
        var obj2 = $.extend(true, {}, obj1);
        console.log(obj1.b.f === obj2.b.f);
        // false
        
        // 函数库lodash，有提供_.cloneDeep用来做 Deep Copy。
        var _ = require('lodash');
        var obj1 = {
            a: 1,
            b: { f: { g: 1 } },
            c: [1, 2, 3]
        };
        var obj2 = _.cloneDeep(obj1);
        console.log(obj1.b.f === obj2.b.f);
				// false
		
				


				
//-----------------------------------------------------------定时器
				setDomTime([getcode,firstCode])
    function setDomTime(arr){
        var arr = Array.isArray(arr) ? arr : []
        arr.map(function(v){
           v.onclick = function(){
               setTime(v)
           }
        })
    }
    //倒计时
    function setTime(dom){
        if (dom.innerHTML == '获取验证码') {
            var t = 60;
            var timp = setInterval(function(){
                if (t > 1) {
                    t--;
                    dom.innerHTML = t+'s后获取验证码'
                }else{
                    dom.innerHTML = '获取验证码';
                    t = 5;
                    clearInterval(timp)
                }
            },1000);
        }
    }
