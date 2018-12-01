// ==UserScript==
// @name         change background for tamper monkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

/*
 * 改变背景颜色
 * 
 * 失效的网络？？
 * http://www.cnblogs.com/stg609/archive/2008/07/06/1237000.html 添加 .post 没效果
 *
 * 进行广告过滤？？
 * http://acooly.iteye.com/blog/1706943
 */


// console.info("jQuery 加载成功！！");
// 查看该插件是否执行
// alert("jQuery 加载成功！！");



// 从上往下多少层，0表示只有 body
var FIND_DEPTH = 3;
// 改变多少个元素的背景颜色
var CHANGE_SIZE = 1;
// 自定义颜色
var COLOR_FOR_CHANGE = "#CCE8CF"; // 豆沙绿
var COLOR_FOR_CHANGE = "#000000"; // 黑色
var COLOR_FOR_CHANGE = "#FFFAED"; // 羊皮纸
var COLOR_FOR_CHANGE = "#E4DDC3"; // 深灰羊皮纸

// 自定义元素
var CHANGEABLE_ELEMENTS = [];
// CHANGEABLE_ELEMENTS.push(".dd2");


function initChangeableElements(){
    // html
    CHANGEABLE_ELEMENTS.push("body");
    CHANGEABLE_ELEMENTS.push("main article");

    // id
    CHANGEABLE_ELEMENTS.push("#ibm-content-body");
    CHANGEABLE_ELEMENTS.push("#readercontainer");
    CHANGEABLE_ELEMENTS.push("#topics");
    CHANGEABLE_ELEMENTS.push("#jenkins");
    CHANGEABLE_ELEMENTS.push("#I_main");
    CHANGEABLE_ELEMENTS.push("#I_mid");
    CHANGEABLE_ELEMENTS.push("#article");
    CHANGEABLE_ELEMENTS.push("#PageContent");
    CHANGEABLE_ELEMENTS.push("#content");
    CHANGEABLE_ELEMENTS.push("#main");
    CHANGEABLE_ELEMENTS.push("#main-content");
    CHANGEABLE_ELEMENTS.push("#mainContent");
    CHANGEABLE_ELEMENTS.push("#content-wrapper");
    CHANGEABLE_ELEMENTS.push("#left_content_pages");
    CHANGEABLE_ELEMENTS.push("#ibm-pcon");
    CHANGEABLE_ELEMENTS.push("#body-content");
    CHANGEABLE_ELEMENTS.push("#wrapper");
    CHANGEABLE_ELEMENTS.push("#docs");
    CHANGEABLE_ELEMENTS.push("#main-container");
    CHANGEABLE_ELEMENTS.push("#main-container");
    CHANGEABLE_ELEMENTS.push("#pro-mian");

    // class
    CHANGEABLE_ELEMENTS.push(".wgt-answers");
    CHANGEABLE_ELEMENTS.push(".Layout");
    CHANGEABLE_ELEMENTS.push(".u-backgroundColorWhite");
    CHANGEABLE_ELEMENTS.push(".Blog_right1_1");
    CHANGEABLE_ELEMENTS.push(".Blog_right1_1 Blog_right1_11");
    CHANGEABLE_ELEMENTS.push(".post");
    CHANGEABLE_ELEMENTS.push(".body2");
    CHANGEABLE_ELEMENTS.push(".f01v0w1");
    CHANGEABLE_ELEMENTS.push(".SpaceList");
    CHANGEABLE_ELEMENTS.push(".section");
    CHANGEABLE_ELEMENTS.push(".main");
    CHANGEABLE_ELEMENTS.push(".book-body");
    CHANGEABLE_ELEMENTS.push(".box");
    CHANGEABLE_ELEMENTS.push(".card");
    CHANGEABLE_ELEMENTS.push(".post-full-content");
    // CHANGEABLE_ELEMENTS.push(".container");
    CHANGEABLE_ELEMENTS.push(".mod-shadow");
    CHANGEABLE_ELEMENTS.push(".rich_media_area_primary");
    CHANGEABLE_ELEMENTS.push(".blog_main");
    CHANGEABLE_ELEMENTS.push(".content-wrap");
    CHANGEABLE_ELEMENTS.push(".content-body");
    CHANGEABLE_ELEMENTS.push(".contentWrapper");
    CHANGEABLE_ELEMENTS.push(".L-mainbox1");
    CHANGEABLE_ELEMENTS.push(".article_detail_bg");
    CHANGEABLE_ELEMENTS.push(".wiki-main-content");
    CHANGEABLE_ELEMENTS.push(".main-content");
    CHANGEABLE_ELEMENTS.push(".container-article");
    CHANGEABLE_ELEMENTS.push(".panel");
    CHANGEABLE_ELEMENTS.push(".content-unit");
    CHANGEABLE_ELEMENTS.push(".divmain");
    CHANGEABLE_ELEMENTS.push(".jd-descr");
    CHANGEABLE_ELEMENTS.push(".postBody");
    CHANGEABLE_ELEMENTS.push(".details");
    CHANGEABLE_ELEMENTS.push(".book-body");
    CHANGEABLE_ELEMENTS.push(".content");
    CHANGEABLE_ELEMENTS.push(".site-wrapper");
    CHANGEABLE_ELEMENTS.push(".block1");
    CHANGEABLE_ELEMENTS.push(".Card");
    CHANGEABLE_ELEMENTS.push(".post_content");
    CHANGEABLE_ELEMENTS.push(".article-container");
    CHANGEABLE_ELEMENTS.push(".bookPage");
    CHANGEABLE_ELEMENTS.push(".book-body");
    CHANGEABLE_ELEMENTS.push(".article-content");
    CHANGEABLE_ELEMENTS.push(".article-inner");
    CHANGEABLE_ELEMENTS.push(".mainlib");
    CHANGEABLE_ELEMENTS.push(".main-container");


    // 复杂选择器, 不过是选中元素时加上一些过来条件而已
    CHANGEABLE_ELEMENTS.push(".BlogContent p");
    CHANGEABLE_ELEMENTS.push("#main .content");
    CHANGEABLE_ELEMENTS.push("div.forFlow");
    CHANGEABLE_ELEMENTS.push("div.sect1");
    CHANGEABLE_ELEMENTS.push("div.book");
    CHANGEABLE_ELEMENTS.push(".l_post_bright .d_post_content_main");
    CHANGEABLE_ELEMENTS.push("#main .details");
    CHANGEABLE_ELEMENTS.push(".javaee#container");
    CHANGEABLE_ELEMENTS.push(".blockList");
    CHANGEABLE_ELEMENTS.push("#jenkins .jenkins-config");
    CHANGEABLE_ELEMENTS.push(".left-side .content-wrapper");
    CHANGEABLE_ELEMENTS.push(".blog.blog-article");
    CHANGEABLE_ELEMENTS.push(".markdown-body.entry-content");
    CHANGEABLE_ELEMENTS.push(".container_box.cell_layout.side_l");
    CHANGEABLE_ELEMENTS.push(".alipay-doc-container");
    CHANGEABLE_ELEMENTS.push(".blog-view .blog-concise");
    CHANGEABLE_ELEMENTS.push(".tio-course-ide .tio-course-ide_content-statement");
    // CHANGEABLE_ELEMENTS.push("ul.blockList ul.blockList ul.blockListLast li.blockList ");
}


// 相当于 main 函数
(function(){
    'use strict';

    /*
        * 自动修改元素背景
        * 回调函数响应 true 表示成功执行颜色改变
        * 将复杂的代码分离就容易处理了
        */
    findByDepth(document.body,FIND_DEPTH,function(ele){
        // 查看当前要处理的元素
        // console.info(ele);
        var bgFlag = hasBgColor(ele);
        if(bgFlag){ // 找到，跳出元素
            // console.info(ele);
            changeBgColor(ele,COLOR_FOR_CHANGE);
            return true;
        }else{
            return false;
        }
    });
    

    /*
        * 自定义修改元素背景 
        */
    initChangeableElements();
    if(CHANGEABLE_ELEMENTS && CHANGEABLE_ELEMENTS.length){
        for(var i=0; i<CHANGEABLE_ELEMENTS.length; i++){
            // $(CHANGEABLE_ELEMENTS[i])
            if($(CHANGEABLE_ELEMENTS[i]).size()){
                // console.info($(CHANGEABLE_ELEMENTS[i]));

                // fix-0715 取值只取第一个，设值设置所有
                // 所以这里都应该进行遍历
                $(CHANGEABLE_ELEMENTS[i]).each(function(){
                    changeBgColor(this,COLOR_FOR_CHANGE);
                });
            }
        }
    }

    /*
        * 广告过滤 
        * ^_^ (一般我不告诉别人的哦)
        */
        $("#adContent").hide();
        $("#google_ads_frame2").hide();
})();




/**
 * 主要执行遍历
 * ele 根对象，非 jQuery 对象
 * depth 找多少层，0表示本身
 * callback 找到元素后的回调函数
 * findByDepth($("body")[0],2)
 */
function findByDepth(ele,depth,callback){
    depth = depth ? depth : 0;
    
    for(var i=0; i<=depth; i++){ // 递归多少级 
        var $searched = $(ele);
        for(var j=0; j<i; j++){ // 递归一次往深一层
            $searched = $searched.children("*");					
        }
        // console.info($searched);				
        
        var changedSize = 0;

        // 核心代码
        // 查找元素及改变元素背景颜色
        $searched.each(function(){
            if(callback && callback(this)){
                changedSize++;

                if(changedSize >= CHANGE_SIZE){
                    return false; // 停止元素遍历
                }
            }
        });

        if(changedSize >= CHANGE_SIZE){
            break; // 停止递归遍历
        }
    }
}


/**
 * 判断元素是否有背景颜色
 * 支持 body.bgcolor="green"
 */
function hasBgColor(ele){
    return ($(ele).css("background-color") || '') === "transparent" ? false : true;
}

/**
 * 判断元素是否适合的阅读尺寸
 * isReadingSize($(".dd")[0],0.5,0.5)
 * 下次通过尺寸判断？？
 */
function isReadingSize(ele,w,h){
    // 文档宽高
    var docW = $(document).width(); 
    var docH = $(document).height();

    // 元素宽高
    var eleW = $(ele).width();
    var eleH = $(ele).height();

    // console.info(ele);
    // console.info(docW,docH,eleW,eleH);

    return docW*w < eleW && docH*h < eleH;
}

/**
 * 改变元素背景颜色
 * changeBgColor($(".dd2")[0],"#CCE8CF");
 */
function changeBgColor(ele,color){

    
    var readingFlag = isReadingSize(ele,0.3,0.5);
    
    // 自动的元素都是有背景的
    // 自定义的元素有背景或符合大小都修改
    if(hasBgColor(ele) || readingFlag){ 
        var oldStyle = $(ele).attr("style");
        // var newStyle = "background-color:"+ color +" !important;" + (oldStyle || "");
        var newStyle = "background:"+ color +" !important;" + (oldStyle || "");
        $(ele).attr("style",newStyle);	
    }
}
