// 监听鼠标移入logo事件
$(document).on('mouseenter','.Jnmh-btnlogo',function(){
    $('#nmh-navicon').addClass('Jnmh-open');
    GtoggleNavlogo();
});
// 监听鼠标移除导航球移除事件（展开收缩悬浮球为什么不直接监听#nmh-navicon而多了一步监听logo是为了减少边缘触发）
$(document).on('mouseleave','#nmh-navicon',function(){
    $('#nmh-navicon').removeClass('Jnmh-open');
    GtoggleNavlogo();
});
var GtoggleNavlogo = function(){
    var li = $('#nmh-navicon').find('.Jnmh-subli');
    var lilen = li.length;
    var avgDeg =  180/(lilen-1);// 平均角度
    var initDeg = 0;// 起始方向角度
    if($('#nmh-navicon').hasClass('Jnmh-onleft')){
        // 如果悬浮球被拖拽到左边，则二级菜单则显示右侧
        li.css({transform: 'rotate(0deg)'});
        initDeg =  180;
    }else{
        // 默认悬浮球在右边，二级菜单显示在左侧
        li.css({transform: 'rotate(-360deg)'});
    }
    for(var i=0,j=lilen-1; i<lilen; i++,j--) {
        var d =  initDeg - (i*avgDeg);
        var z = initDeg?j:i;
        // console.log(d);
        $('#nmh-navicon').hasClass('Jnmh-open') ? GrotateNavlogo(li[z],d) : GrotateNavlogo(li[z],0);
    }
};
var GrotateNavlogo = function(dom,deg){
    $({a:0}).animate({a:deg}, {
        step: function(now,fx) {
            $(dom).css({ transform: 'rotate('+now+'deg)' });
            $(dom).children().css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// 鼠标拖动logo移动
$(document).on('mousedown','.Jnmh-btnlogo',function(e_down){
    var wrap = $('#nmh-navicon');
    wrap.removeClass('Jnmh-open');
    $('.Jnmh-m-submenu').hide();
    GtoggleNavlogo();

    var positionDiv = wrap.offset();
    var distenceX = e_down.pageX - positionDiv.left;
    var distenceY = e_down.pageY - positionDiv.top + $(document).scrollTop();
    $(document).mousemove(diy_move);
    function diy_move(e_move){
        var x = e_move.pageX - distenceX;
        var y = e_move.pageY - distenceY;

        if (x < 0) {
            x = 0;
        } else if (x > $(document).width() - wrap.outerWidth(true)) {
            x = $(document).width() - wrap.outerWidth(true);
        }

        if (y < 0) {
            y = 0;
        } else if (y > $(window).height() - wrap.outerHeight(true)) {
            y = $(window).height() - wrap.outerHeight(true);
        }

        $(wrap).css({
            'left': x + 'px',
            'top': y + 'px'
        });
    }
    $(document).mouseup(function() {
        var x = $(wrap).offset().left;
        var rm = '',ad = 'Jnmh-open';
        if(x > $(document).width()/2){
            x = $(document).width() - wrap.outerWidth(true) -10 ;
            rm = 'Jnmh-onleft';
        }else{
            x = 10;
            ad += ' Jnmh-onleft';
        }
        $(wrap).css({left: x + 'px'}).addClass(ad).removeClass(rm);
        $('.Jnmh-m-submenu').show();
        GtoggleNavlogo();
        $(document).unbind('mousemove',diy_move);
    });

});