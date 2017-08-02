window.root = function (ele) {
    var p = window;
    if (ele) {
        return ele.ownerDocument.parentWindow;
    }
    else {
        return window.top;
    }
    return p;
}
window.ui = function (ele) {
    var ctor = function (e) {
        this.wnd = function () {
            return window.root(e);
        }
        this.parent = function () {
            if (e.parentNode) return e.parentNode;
            var wnd = e.parentWindow;
            if (!wnd) return null;
            if (!wnd.parent) return null;
            var doc = wnd.parent.document;
            if (!doc) return null;
            var frames = doc.getElementsByTagName("iframe");
            for (var i = 0; i < frames.length; i++) {
                if (e.parentWindow == frames[i].contentWindow) return frames[i];
            }
            return null;
        }
        this.client = function () {
            var client = position2Other(e, e.parentNode);
            if (e.tagName == "BODY") {
                client.width = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientWidth : e.ownerDocument.body.clientWidth, 10);
                client.height = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientHeight : e.ownerDocument.body.clientHeight, 10);
            }
            else {
                client.width = e.offsetWidth;
                client.height = e.offsetHeight;
            }
            return client;
        }
        this.offset = function () {
            var p = {};
            p.x = e.offsetLeft;
            p.y = e.offsetTop;
            if (e.tagName == "BODY") {
                p.width = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientWidth : e.ownerDocument.body.clientWidth, 10);
                p.height = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientHeight : e.ownerDocument.body.clientHeight, 10);
            }
            else {
                p.width = e.offsetWidth;
                p.height = e.offsetHeight;
            }
            return p;
        }
        this.bounds = function () {
            var client = position2Other(e);
            if (e.tagName == "BODY") {
                client.width = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientWidth : e.ownerDocument.body.clientWidth, 10);
                client.height = parseInt(e.ownerDocument.compatMode == "CSS1Compat" ? e.ownerDocument.documentElement.clientHeight : e.ownerDocument.body.clientHeight, 10);
            }
            else {
                client.width = e.offsetWidth;
                client.height = e.offsetHeight;
            }
            return client;
        }
        function position2Other(ele, ref) {
            var x1 = 0;
            var y1 = 0;
            if (ele) {
                x1 = ele.offsetLeft;
                y1 = ele.offsetTop;
                while (ele.offsetParent) {
                    x1 -= ele.scrollLeft;
                    y1 -= ele.scrollTop;
                    ele = ele.offsetParent;
                    x1 += ele.offsetLeft;
                    y1 += ele.offsetTop;
                }
            }
            var x2 = 0;
            var y2 = 0;
            if (ref) {
                x2 = ref.offsetLeft;
                y2 = ref.offsetTop;
                while (ref.offsetParent) {
                    x2 -= ref.scrollLeft;
                    y2 -= ref.scrollTop;
                    ref = ref.offsetParent;
                    x2 += ref.offsetLeft;
                    y2 += ref.offsetTop;
                }
            }
            return { "x": x1 - x2, "y": y1 - y2 };
        }
        this.contains = function (self) {
            return function (cursor) {
                var client = self.bounds();
                return ((client.x <= cursor.x) == (client.x + client.width >= cursor.x)) &&
                       ((client.y <= cursor.y) == (client.y + client.height >= cursor.y));
            }
        } (this);
        this.visible = function (self) {
            return function () {
                if (e.style && e.style.display == "none") return false;
                var p = self.parent();
                if (!p) return true;
                return ui(p).visible();
            }
        } (this);
        this.FitView = function (self) {
            return function (bounds) {
                var func = function () {
                    var body = e.ownerDocument ? e.ownerDocument.body : document.body;
                    Event.Unregister(body, "mousemove", e.__delayExe);
                    e.__delayExe = null;
                    if (new ui(e).visible()) {
                        if (!e.ownerDocument) return;
                        if (!bounds) bounds = { 'x': 1, 'y': 1, 'width': 0, 'height': 0 };
                        if (typeof bounds.x != 'number') bounds.x = 1;
                        if (typeof bounds.y != 'number') bounds.y = 1;
                        if (typeof bounds.width != 'number') bounds.width = 0;
                        if (typeof bounds.height != 'number') bounds.height = 0;
                        var parent = self.parent();
                        var pui = new ui(parent);
                        var maxSize = pui.offset();
                        maxSize.width -= 2 * bounds.x;
                        maxSize.height -= 2 * bounds.y;

                        if (maxSize.width < bounds.width) maxSize.width = bounds.width;
                        if (maxSize.height < bounds.height) maxSize.height = bounds.height;
                        //e.style.position = "absolute";
                        e.style.width = "";
                        e.style.height = "";
                        e.style.maxWidth = maxSize.width + "px";
                        e.style.maxHeight = maxSize.height + "px";
                    }
                    else {
                        e.__delayExe = arguments.callee;
                        Event.Register(body, "mousemove", e.__delayExe);
                    }
                }
                func();
            }
        } (this);
    }
    return new ctor(ele);
}
window.Obj = function (o) {
    function ObjImpl(oi) {
        var oi = oi;
        this.InstanceOf = function (cls) {
            if (typeof (oi) == "undefined") return typeof (cls) == "undefined";
            if (oi == null) return cls == null;
            return oi.constructor + "" == cls + "";
        }
    }
    return new ObjImpl(o);
}
window.Obj.Compare = function (obj1, obj2) {
    var x = 0;
    var y = 0;
    var map = { 'undefined': 1, 'object': 2, 'number': 3, 'boolean': 4, 'string': 5 };
    if (!obj1) {
        x = map[typeof (obj1)];
        if (!x) x = 0;
    }
    if (!obj2) {
        y = map[typeof (obj2)];
        if (!y) y = 0;
    }
    if (x || y) {
        var array =
                [
                    [0, 1, 1, 1, 1, 1],
                    [-1, 0, -1, -1, -1, -1],
                    [-1, 1, 0, -1, -1, -1],
                    [-1, 1, 1, 0, -1, -1],
                    [-1, 1, 1, 1, 0, -1],
                    [-1, 1, 1, 1, 1, 0]
                ];
        return array[x][y];
    }
    else {
        if (typeof (obj1) == typeof (obj2)) {
            if (obj1 == obj2) return 0;

            if (obj1 && obj1.CompareTo) {
                var c = obj1.CompareTo(obj2);
                if (typeof (c) == 'number') return c;
            }
            if (obj2 && obj2.CompareTo) {
                var c = obj2.CompareTo(obj1);
                if (typeof (c) == 'number') return -c;
            }

            x = obj1 + "";
            y = obj2 + "";
            if (x == y) return 0;
            return x > y ? 1 : -1;
        }
        else {
            return typeof (x) > typeof (y) ? 1 : -1;
        }
    }
}
window.Wnd = function (uiElement) {
    function WindowImpl(wnd) {
        var wnd = wnd;
        var doc = wnd.document;
        var self = this;
        this.ElementSize = function (ele) {
            if (ele.tagName == "BODY") {
                if (ele.ownerDocument.compatMode == "CSS1Compat") {
                    var w = self.value2Int(ele.style.width || ele.ownerDocument.documentElement.clientWidth || ele.width);
                    var h = self.value2Int(ele.style.height || ele.ownerDocument.documentElement.clientHeight || ele.height);
                    return { "width": w, "height": h };
                }
                else {
                    var w = self.value2Int(ele.style.width || ele.ownerDocument.body.clientWidth || ele.width);
                    var h = self.value2Int(ele.style.height || ele.ownerDocument.body.clientHeight || ele.height);
                    return { "width": w, "height": h };
                }
            }
            else {
                var w = self.value2Int(ele.style.width || ele.offsetWidth || ele.width);
                var h = self.value2Int(ele.style.height || ele.offsetHeight || ele.height);
                return { "width": w, "height": h };
            }
        }
        this.Mouse2ElementWithoutScroll = function (ele) {
            var location1 = self.Mouse2Document();
            var location2 = self.Element2Document(ele);
            location1.x -= location2.x;
            location1.y -= location2.y;
            return location1;
        }
        this.Mouse2Element = function (ele) {
            var location1 = self.Mouse2ElementWithoutScroll(ele);
            var location2 = self.ElementScroll(ele);
            location1.x += location2.x;
            location1.y += location2.y;
            return location1;
        }
        this.Mouse2DocumentWithoutScroll = function () {
            var evt = self.GetEventObject();
            var scroll = self.DocumentScroll();
            var x = evt.pageX ? self.value2Int(evt.pageX) - scroll.x : self.value2Int(evt.clientX);
            var y = evt.pageY ? self.value2Int(evt.pageY) - scroll.y : self.value2Int(evt.clientY);
            return { "x": x, "y": y };
        }
        this.Mouse2Document = function () {
            var location1 = self.Mouse2DocumentWithoutScroll();
            var location2 = self.DocumentScroll();
            location1.x += location2.x;
            location1.y += location2.y;
            return location1;
        }
        this.ElementScroll = function (ele) {
            var x = self.value2Int(ele.scrollLeft);
            var y = self.value2Int(ele.scrollTop);
            return { "x": x, "y": y };
        }
        this.Element2Parent = function (ele) {
            var x = self.value2Int(ele.offsetLeft);
            var y = self.value2Int(ele.offsetTop);
            return { "x": x, "y": y };
        }
        this.Element2ParentWithoutScroll = function (ele) {
            var location1 = self.Element2Parent(ele);
            if (ele.offsetParent) {
                var location2 = self.ElementScroll(ele.offsetParent);
                location1.x -= location2.x;
                location1.y -= location2.y;
            }
            return location1;
        }
        this.DocumentScroll = function () {
            var x = self.value2Int(doc.body.scrollLeft || doc.documentElement.scrollLeft || wnd.pageXOffset);
            var y = self.value2Int(doc.body.scrollTop || doc.documentElement.scrollTop || wnd.pageYOffset);
            return { "x": x, "y": y };
        }
        this.Element2DocumentWithoutScroll = function (ele) {
            var x = 0;
            var y = 0;
            while (ele.offsetParent) {
                var pos = self.Element2ParentWithoutScroll(ele);
                x += pos.x;
                y += pos.y;
                ele = ele.offsetParent;
            }
            return { "x": x, "y": y };
        }
        this.Element2Document = function (ele) {
            var location1 = self.Element2DocumentWithoutScroll(ele);
            var location2 = self.DocumentScroll();
            location1.x += location2.x;
            location1.y += location2.y;
            return location1;
        }
        this.value2Int = function (v) {
            v = wnd.parseInt(v, 10);
            if (v + "" == "NaN") v = 0;
            return v;
        }
        this.InnerElement = function (root, ele) {
            while (ele) {
                if (ele == root) return true;
                ele = ele.parentNode;
            }
            return false;
        }
        this.WindowSize = function () {
            var w;
            var h;
            var w3c = doc.compatMode == "CSS1Compat";
            if (w3c) {
                w = self.value2Int(doc.documentElement.clientWidth, 0);
                h = self.value2Int(doc.documentElement.clientHeight, 0);
            }
            else {
                w = self.value2Int(doc.body.clientWidth, 0);
                h = self.value2Int(doc.body.clientHeight, 0);
            }
            return { "width": w, "height": h };
        }
        this.RegisterEvent = function (ele, eventName, eventHandler) {
            if (ele.attachEvent) {
                if (eventName.indexOf("on") == 0) {
                    ele.attachEvent(eventName, eventHandler);
                }
                else {
                    ele.attachEvent("on" + eventName, eventHandler);
                }
            }
            else {
                if (eventName.indexOf("on") == 0) {
                    ele.addEventListener(eventName.slice(2), eventHandler, true);
                }
                else {
                    ele.addEventListener(eventName, eventHandler, true);
                }
            }
        }
        this.UnregisterEvent = function (ele, eventName, eventHandler) {
            if (ele.detachEvent) {
                if (eventName.indexOf("on") == 0) {
                    ele.detachEvent(eventName, eventHandler);
                }
                else {
                    ele.detachEvent("on" + eventName, eventHandler);
                }
            }
            else {
                if (eventName.indexOf("on") == 0) {
                    ele.removeEventListener(eventName.slice(2), eventHandler, true);
                }
                else {
                    ele.removeEventListener(eventName, eventHandler, true);
                }
            }
        }
        this.GetEventObject = function () {
            try {
                var evt = null;
                try {
                    evt = wnd.event || event;
                    if (evt) return evt;
                }
                catch (error)
                { }
                var func = self.GetEventObject.caller;
                while (func != null) {
                    evt = func.arguments[0];
                    if (evt) {
                        if ((evt.constructor == Event || evt.constructor == MouseEvent)
                || (typeof (evt) == "object" && evt.preventDefault && evt.stopPropagation))
                            return evt;
                    }
                    func = func.caller;
                }
                return evt;
            }
            catch (err) {
                return null;
            }
        }
        this.GetEventSource = function () {
            try {
                var e = self.GetEventObject();
                return e.target || e.srcElement;
            }
            catch (err) {
                return null;
            }
        }
        this.StopEventRouting = function (ele) {
            var evt = self.GetEventObject();
            if (evt) evt.cancelBubble = true;
            if (!ele) ele = self.GetEventSource();
            if (ele) {
                if (ele.stopPropagation) ele.stopPropagation();
                if (ele.preventDefault) ele.preventDefault();
            }
        }
        this.GetKeyCode = function () {
            var e = self.GetEventObject();
            if (e) {
                return e.which || e.keyCode;
            }
            else {
                return 0;
            }
        }
        this.GetAltKeyStatus = function () {
            var e = self.GetEventObject();
            if (e) {
                return e.altKey;
            }
            else {
                return false;
            }
        }
        this.GetCtrlKeyStatus = function () {
            var e = self.GetEventObject();
            if (e) {
                return e.ctrlKey;
            }
            else {
                return false;
            }
        }
        this.GetShiftKeyStatus = function () {
            var e = self.GetEventObject();
            if (e) {
                return e.shiftKey;
            }
            else {
                return false;
            }
        }
        this.MessageBox = function (msg, title, button) {
            if (msg.length > 1) {
                var skip = 1;
                for (var i = skip; i < msg.length; i++) {
                    if (msg[i - skip] != msg[i]) {
                        msg[i - skip] = msg[i];
                    }
                    else {
                        skip++;
                    }
                }
                msg.length -= skip;
            }
            var m = "";
            for (var i = 0; i < msg.length; i++) {
                m += msg[i] + '\r\n';
            }
            var pos = m.indexOf("报告已经在");
            if (pos > -1) {
                setTimeout(function () {
                    wnd.alert(m.substring(pos));
                }, 1000);
            }
            else 
            {
                wnd.alert(m);
            }
        }

        this.MouseCoords = function () {

            ev = wnd.event;

            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX + doc.body.scrollLeft - doc.body.clientLeft,
                y: ev.clientY + doc.body.scrollTop - doc.body.clientTop
            };
        }
        this.GetDocument = function (ele) {
            return wnd.document;
        }
        this.GetVariable = function (varName) {
            return eval("wnd." + varName);
        }
    }
    var wnd = window;
    while (uiElement) {
        if (!uiElement.parentNode) {
            if (uiElement.parentWindow) {
                wnd = uiElement.parentWindow;
                break;
            }
        }
        uiElement = uiElement.parentNode;
    }
    return new WindowImpl(wnd);
}