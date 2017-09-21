/*
    author：沧龙
    mail：1248374924@qq.com
    按照滚动高度加载对应的数据填充到显示模板中
    通过固定显示模板的数量使得前端页面渲染压力得到释放

    此demo中当设置数据量超过894784时超过的数据无法显示，猜测可能是div滚动条高度达到上限了
*/

(function ($) {
    $.fn.extend({
        jstScroll: function (options) {
            var dataBox = "", dataTem = "", scrollBox = "";
            var opts = $.extend({}, defaluts, options);
            for (var i = 0; i < opts.datas.length && i < opts.showCount; i++) {
                dataTem += "<div class='item' style='height:" + opts.itemSize + "px;'>" + $.fn.jstScroll.format(opts.datas[i]) + "</div>";
            }
            dataBox = "<div class='jst-dataBox'>" + dataTem + "</div>"
            scrollBox = "<div class='jst-scrollBox'><div></div></div>";
            $(this).append(dataBox + scrollBox).css({
                'position':'relative',
                'width':opts.width
            });
            $(this).children().height(opts.showCount * opts.itemSize);
            $(this).children(".jst-dataBox").css({
                'height': opts.showCount * opts.itemSize,
                'width': '100%'
            });
            $(this).children(".jst-scrollBox").css({
                'height': opts.showCount * opts.itemSize,
                'width': '100%',
                'position': 'absolute',
                'top': 0,
                'overflow-y': 'auto'
            });
            $(this).children(".jst-scrollBox").children().css({
                'height': opts.datas.length * opts.itemSize
            });
            $(this).children(".jst-scrollBox").scroll(function () {
                onScroll(opts);
            });
        }
    });

    function onScroll(opts) {
        var top = $(".jst-scrollBox").scrollTop();
        var pos = parseInt(top / opts.itemSize);
        var rows = $(".jst-dataBox>.item");
        for (var i = 0; i < opts.showCount; i++) {
            var row = rows[i];
            var item = opts.datas[i + pos];
            row.innerHTML = $.fn.jstScroll.format(item);
        }
    }

    $.fn.jstScroll.format = function (data) {
        return data["name"];
    }

    var defaluts = {
        datas: [],       //所有数据
        itemSize: 0,     //每个数据高度
        showCount: 0,    //一页显示数据
        width: "100%"    //容器宽度
    }

})(window.jQuery);