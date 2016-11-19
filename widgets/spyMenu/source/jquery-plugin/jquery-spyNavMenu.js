/**
 *  目录滚动监听的Jquery插件
 *  Licensed under the MIT license
 *
 *  Author: zhenghe39@gmail.com
 *  Usage:
 *
 *      var navMenu = $(element).spyNavMenu({
 *          scrollNav:function(){},
 *          activeClass:'',
 *          fixOffsetClass:'',
 *          distinguishLineScale:''
 *      });
 *      navMenu.on('scrollNav',callBack(params...){})
 *
 *
 *      事件:
     *      scrollNav,
     *      CallBack(navItem{当前激活的目录项实体对象},$navMenu{目录元素});
     *      navItem = {
     *          $ele:当前激活的目录项元素,
     *          height:当前激活的目录项元素的高度,
     *          top:当前激活的目录项元素距离父元素顶端的距离
     *      }
     *      Note:由于在JQuery中,当父元素被隐藏,那么子元素的height()的值就会变为0,故保存$navItem高度height. top也是同理
 *
 *      自定义配置属性:
 *          activeClass:激活的目录项元素Class,默认值为'active'
 *          fixOffsetClass:目录元素当被滚动轴给滚动覆盖时,会被添加的固定位置的类,默认值为'nav-fix',需使用者提供这样的类
                                                                                         * eg:
                                                                                         * .nav-fix{
                                                                                         *      position: fixed,
                                                                                         *      top: $fixOffset
                                                                                         *  }
                                                                                         *  进行导航目录的固定
 *          distinguishLineScale: 判别目录区域是否到达,以进行激活导航目录项的基准线(百分比类型,以当前窗口作为衡量标准,
 *                 eg.1/2代表当前窗口的中间线作为基准线).默认值为0,即代表以窗口顶端的线作为基准线
 *
 *
 *      其他:
 *          使用插件后,会返回navMenu实体对象.
 *          或者也可以通过$(element).data('entity')获取该实体对象.
 *
 *
 */

+(function($){
    $.extend($.fn,{
        spyNavMenu:function(options){
            var navMenu = new $.NavMenu(options,this[0]);
            if(this.data('entity')){
                this.data('entity',navMenu);
            }
            return navMenu;
        }
    });

    //NavMenu Creator
    $.NavMenu = function(options,navMenuEle){
        //Note:用户自定义事件
        this.eventLoop =$.extend({}, options.events);
        delete options.events;

        this.settings = $.extend({}, $.NavMenu.defaults,options);
        this.navMenuEle = navMenuEle;
        this._init();
    }

    $.extend($.NavMenu,{
        defaults:{
            activeClass:'active',
            fixOffsetClass:'nav-fix',
            distinguishLineScale:0,//基准线的比例值,默认为0.5,即当前窗口的中间线
            events:{}
        },
        prototype:{
            _init:function(){
                var _self = this;
                var navMenuEle = _self.navMenuEle;

                _self.properties = {
                    navMenuTopOffset: $(navMenuEle).offset().top,
                    navItemSections: _self._getNavItemSections(navMenuEle)
                }

                $(window).on('scroll',_self._listener().scrollEvent)
                //初始化当前的NavItemEle,进行高亮
                _self._listener().scrollEvent();
            },
            /**
             * Event listeners
             * @returns {{scrollEvent: scrollEvent}}
             * @private
             */
            _listener:function(){
                var _self = this;
                return {
                    /**
                     * Window Scroll Event
                     * @param event
                     */
                    scrollEvent:function(event){

                        //Note: Nav fixed
                        var navMenuEle = _self.navMenuEle;
                        var fixOffsetClass = _self.settings.fixOffsetClass;
                        if($(window).scrollTop() >= _self.properties.navMenuTopOffset){
                            $(navMenuEle).addClass(fixOffsetClass);
                        }else{
                            $(navMenuEle).removeClass(fixOffsetClass);
                        }

                        //Note: distinguish line
                        //默认基准判别线为0*windowHeight,即Window顶端
                        var distinguishLineOffset =
                            _self.settings.distinguishLineScale*$(window).height()+$(window).scrollTop();

                        //Note: remove all activeClass before focus curNavItem
                        var activeClass = _self.settings.activeClass;
                        $(_self.navMenuEle).find('.'+activeClass)
                            .removeClass(activeClass);

                        var curNavItemSection = _self._getCurNavSection(_self.properties.navItemSections,distinguishLineOffset);
                        curNavItemSection && curNavItemSection.navItem.$ele.addClass(activeClass);

                        //执行用户自定义scroolNav事件
                        var eventLoop = _self.eventLoop;
                        eventLoop['scrollNav'] &&
                                    eventLoop['scrollNav'](curNavItemSection && curNavItemSection.navItem,$(_self.navMenuEle))

                    }
                }
            },
            /**
             * Get NavSection PositionInfo
             * @param navEle
             * @returns {Array}
             * @private
             */
            _getNavItemSections:function(navMenuEle){
                var navItemSections = [];

                $(navMenuEle).find('a').each(function(){
                    var _self = this;
                    var $navItem = $(_self).parent();
                    var sectionId = $(this).attr('href').split('#')[1];

                    navItemSections.push({
                        id:sectionId,
                        offsetTop:$('#'+sectionId).offset().top,
                        navItem:{
                            $ele:$navItem,
                            height:$navItem.height(),
                            top:$navItem.position().top
                        }
                    });
                });

                return navItemSections;
            },
            /**
             * Get Current navItemSection
             * @param navItemSections
             * @param distinguishLineOffset
             * @returns {*}
             * @private
             */
            _getCurNavSection:function(navItemSections,distinguishLineOffset){
                var curNavItemSection = null;

                var count = navItemSections && navItemSections.length;
                if(count){
                    if(1 === count){
                        if(distinguishLineOffset >= navItemSections[0].offsetTop){
                            curNavItemSection = navItemSections[0];
                        }
                    }else{
                        $.each(navItemSections,function(idx,navItemSection){
                            if(idx !== count-1){//非最后一个navSection
                                //当distinguishLineOffset 位于第n个navItemSection的后面 && n+1个navItemSection的前面时,
                                // 这第n个navItemSection所对应的navItem为当前目录导航项,需要进行高亮
                                var nextNavSectionInfo = navItemSections[idx+1];
                                if(navItemSection.offsetTop <= distinguishLineOffset
                                    && distinguishLineOffset < nextNavSectionInfo.offsetTop){
                                    curNavItemSection = navItemSection;
                                    return false;
                                }
                            }else{//最后一个navSection
                                if(navItemSection.offsetTop <= distinguishLineOffset){
                                    curNavItemSection = navItemSection;
                                    return false;
                                }
                            }
                        });
                    }
                }

                return curNavItemSection;
            },
            /**
             * 对外提供的事件绑定入口
             */
            on:function(eventType,callBack){
                this.eventLoop[eventType] = callBack;
            }
        }
    });

})(jQuery)