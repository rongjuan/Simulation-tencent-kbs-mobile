~function (pro) {

    function queryURLParameter() {
        var obj = {},
            reg = /([^?=&#]+)=([^?=&#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj["hash"] = reg.exec(this)[1];
        }
        return obj;
    }


    function formatTime(template) {
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        var _this = this,
            ary = _this.match(/\d+/g);//->[2016,05,19]
        template = template.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            typeof val === "undefined" ? val = 0 : null;
            val = val.length < 2 ? "0" + val : val;
            return val;
        });
        return template;
    }
    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);

//->REM 设置根值字体大小
~function () {
    var desW = 320,
        winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}();

//->MENU 单击
$(function () {
    var $nav = $(".nav"),
        $menu = $(".menu");
    $menu.singleTap(function () {
        $nav.toggleClass("target");
    });
});

//->MATCH
var matchRender = (function () {
    var $match = $(".match");

    function bindHTML(data) {
        var result = ejs.render($("#matchTemplate").html(), {matchInfo: data});
        $match.html(result);
        bindEvent();

        window.setTimeout(function () {
            var $progress = $match.find(".progress"),
                supL = parseFloat(data["leftSupport"]),
                supR = parseFloat(data["rightSupport"]);
            $progress.css("width", (supL / (supL + supR)) * 100 + "%");
        }, 300);
    }

    function bindEvent() {
        var $bot = $match.children(".bot"),
            $btnL = $bot.children(".left"),
            $btnR = $bot.children(".right"),
            $progress = $match.find(".progress");
        var support = localStorage.getItem("support");
        if (support) {
            support = JSON.parse(support);
            support.dir === 1 ? $btnL.addClass("bg") : $btnR.addClass("bg");
            return;
        }
        $btnL.singleTap(fn);
        $btnR.singleTap(fn);
        function fn() {
            if ($bot.attr("isTap") === "true") return;
            //点击哪个就让哪个里边内容加1
            var num = parseFloat($(this).html());
            $(this).addClass("bg").html(num + 1);

            //计算比例
            var supLN = parseFloat($btnL.html()),
                supRN = parseFloat($btnR.html());
            $progress.css("width", (supLN / (supLN + supRN) * 100) + "%");
            $bot.attr("isTap", true);
            var type = $(this).hasClass("left") ? 1 : 2;
            var obj = {
                isTap: true,
                dir: type
            };
            //本地存储
            localStorage.setItem("support", JSON.stringify(obj));
        }
    }

    return {
        init: function () {
            //获取数据
            $.ajax({
                url: "http://matchweb.sports.qq.com/html/matchDetail?mid=100002:2365",
                type: "get",
                dataType: "jsonp",
                success: function (data) {
                    if (data && data[0] == 0) {
                        data = data[1];
                        var matchInfo = data["matchInfo"];
                        matchInfo["rightSupport"] = data["rightSupport"];
                        matchInfo["leftSupport"] = data["leftSupport"];
                        bindHTML(matchInfo);
                    }
                }
            });
        }
    }
})();
matchRender.init();

//->iscroll


window.setTimeout(function(){
    //new iScroll(".video-container", {
    //    hScroll: true, 是否允许水平滚动
    //    scrollbars: true,
    //    mouseWheel: true,
    //    shrinkScrollbars: 'scale',
    //    bounce:true,
    //
    //});
    var demoScroll = document.getElementById("demoScroll");
    //var oUl = demoScroll.getElementsByTagName("ul")[0];
    //var oLis = demoScroll.getElementsByTagName('li');
    //oUl.style.width = (oLis.length)*(oLis[0].offsetWidth)+"px";
    //new iScroll(demoScroll, {
    //    hScroll: true,
    //    onBeforeScrollStart: function (e) {
    //        if ( this.absDistX > (this.absDistY + 5 ) ) {
    //            // user is scrolling the x axis, so prevent the browsers' native scrolling
    //            e.preventDefault();
    //        }
    //    },
    //    onTouchEnd: function () {
    //        var self = this;
    //        if (self.touchEndTimeId) {
    //            clearTimeout(self.touchEndTimeId);
    //        }
    //        self.touchEndTimeId = setTimeout(function () {
    //            self.absDistX = 0;
    //            self.absDistX = 0;
    //        }, 600);
    //    }
    //})
    var myScroll = new IScroll(demoScroll,{
        mouseWheel: true,
        eventPassthrough:true,
        scrollX: true,
        scrollY: false,
        preventDefault: false,
        bounceEasing: "back"
    });
    console.log(myScroll.options);
},300);








