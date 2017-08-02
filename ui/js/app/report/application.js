var m_DefaultImageWidth = "1000px"; //设置默认图像尺寸
var m_AttachURLs = null;
var m_CurrPageIndex = 0;

function load() {
    var arr = location.href.split("AttachURLs=");
    if (arr.length > 1) {
        m_AttachURLs = arr[1].split(",");
        if (m_AttachURLs && m_AttachURLs.length > 0) {
            var div = document.getElementById("Div_Application");
            var img = document.getElementById("Img_Application");
            img.style.width = m_DefaultImageWidth;
            PageJump(0);
        }
    }
}

function PageJump(index) {
    if (!m_AttachURLs) return;

    if (index < 0) index = 0;
    if (index > m_AttachURLs.length - 1) index = m_AttachURLs.length - 1;

    var img = document.getElementById("Img_Application");
    img.src = m_AttachURLs[index];
    m_CurrPageIndex = index;

    var txt = document.getElementById("txtCurrPage");
    txt.innerHTML = m_CurrPageIndex + 1 + "/" + m_AttachURLs.length;
}

function PreviousPage() {
    PageJump(m_CurrPageIndex - 1);
}

function NextPage() {
    PageJump(m_CurrPageIndex + 1);
}

function PrintApplication() {
    var img = document.getElementById("Img_Application");
    var newHTML = img.parentNode.innerHTML;
    var oldHTML = document.body.innerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + newHTML + "</body>";
    window.print();
    document.body.innerHTML = oldHTML;
    return false;
}

/***************************tools开始***********************************/
//给构造函数添加方法
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};
//绑定事件
Object.prototype.addEvent = function() {
    this.addEventListener.apply(this, arguments);
    return this;
};
/***************************tools结束***********************************/

/******************************构建ImageBox类开始*************************************/
if (ImageBox) console.warn('命名冲突:构造函数ImageBox');

var ImageBox = function(config) {
    this.config = config;
};
ImageBox.method('start', function() {
    var self = this;
    if (!(self.config.targetElement instanceof HTMLElement)) {
        console.warn('参数类型错误:targetElement必须为DOM对象');
        return;
    }
    self.config.targetElement.addEvent('load', function() {
        self.dataInit();
        self.eventInit();
    });
}).method('dataInit', function() {
    var conf = this.config; //配置项集合
    this.scaleDetail = conf.scaleDetail || 0.3; //缩放比
    if (conf.initWidth) {
        conf.targetElement.style.width = conf.initWidth + "px";
    }
    conf.targetElement.style.position = 'absolute';
    this.status = {
        initWidth: conf.targetElement.offsetWidth,
        initHeight: conf.targetElement.offsetHeight,
        deg: 0,
        scale: 1
    };
}).method('eventInit', function() {
    var self = this;
    var conf = self.config;
    var eventFunc = self.eventFunc();
    var targetElement = conf.targetElement;

    targetElement.addEvent('mousedown', function(e) {
        var ev = e || window.event;
        eventFunc.move(e, 'mouseup');
    });

    document.addEvent('mousewheel', function(e) {
        var e = e || window.event;
        e.preventDefault(); //防止有滚动条时缩小时跳动
        if (e.wheelDelta > 0) {
            eventFunc.scale('toBig');
        } else {
            eventFunc.scale('toSmall');
        }
    });
}).method('eventFunc', function() {
    var self = this;
    var conf = this.config;
    var targetElement = conf.targetElement;

    function transform(ele, conf) {
        ele.style.transform = 'rotate(' + (conf.deg || self.status.deg) + "deg)" + ' scale(' + (conf.scale || self.status.scale) + ')';
        if (Number(conf.x) && Number(conf.y)) {
            ele.style.transformOrigin = conf.x + ' ' + conf.y;
        }
        if (conf.left) ele.style.left = conf.left + 'px';
        if (conf.top) ele.style.top = conf.top + 'px';
    }

    return {
        //缩放：
        scale: function(style) {
            var height = targetElement.offsetHeight;
            var x = self.scaleDetail; //缩放比例
            switch (style) {
                case 'toBig':
                    if (self.status.scale >= 10) return;
                    self.status.scale = height * (self.status.scale + x) / self.status.initHeight;
                    transform(targetElement, {});
                    break;
                case 'toSmall':
                    if (self.status.scale - x <= 0) return;
                    self.status.scale = height * (self.status.scale - x) / self.status.initHeight;
                    transform(targetElement, {});
                    break;
                default:
                    console.warn("参数类型错误:ImageBox.eventFun.scale要求参数为字符串toBig或toSmall");
                    break;
            }
        },
        //旋转：
        rotate: function(deg) {
            self.status.deg += deg;
            transform(targetElement, {});
        },
        //还原:
        resetTransf: function() {
            transform(targetElement, { deg: "0", scale: 1, left: "0", top: "0" });
            self.status.scale = 1;
            self.status.deg = 0;
        },
        //移动:
        move: function(e, endMoveEvent) {
            var ev = e || window.event;
            var startX = ev.pageX;
            var startY = ev.pageY;
            var imgStartX = targetElement.offsetLeft;
            var imgStartY = targetElement.offsetTop;

            function mouseMoveFunc(ev) {
                var ev = ev || window.event;
                ev.preventDefault();
                var endX = ev.pageX;
                var endY = ev.pageY;
                var CX = endX - startX;
                var CY = endY - startY;
                targetElement.style.left = imgStartX + CX + "px";
                targetElement.style.top = imgStartY + CY + "px";
            }

            targetElement.addEvent('mousemove', mouseMoveFunc);
            targetElement.addEvent(endMoveEvent, function(e) {
                targetElement.removeEventListener('mousemove', mouseMoveFunc);
            })
        }
    }
});
/******************************构建ImageBox类结束*************************************/