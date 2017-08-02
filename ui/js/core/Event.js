function Event() {
    var evt = event || window.event;
    if (!evt) {
        try {
            var func = Event.caller;
            while (func != null) {
                evt = func.arguments[0];
                if (evt) {
                    if ((evt.constructor == Event || evt.constructor == MouseEvent) || (typeof (evt) == "object" && evt.preventDefault && evt.stopPropagation)) {
                        break;
                    } else {
                        evt = null;
                    }
                }
                func = func.caller;
            }
        } catch (err) {
        }
    }
    if (!evt) evt = {};
    if (evt) {
        evt.KeyCode = function () {
            return evt.which || evt.keyCode;
        }
        evt.Source = function () { return evt.target || evt.srcElement };
        evt.Destination = function () {
            var dest = evt.toElement || evt.relatedTarget;
            //            if (!dest) dest = evt.target || evt.srcElement;
            return dest;
        };
        if (!evt.stopPropagation) {
            evt.stopPropagation = function () {
                evt.cancelBubble = true;
            }
        }
        evt.Offset = function (ev) {
            return function () {
                return { 'x': ev.offsetX, 'y': ev.offsetY };
            }
        } (evt, evt.Source());
        evt.Location = function (ev, src) {//scroll...
            return function (r, s) {
                var eleLoc = absLocation(r ? r : root);
                var srcLoc = absLocation(s ? s : src);
                return { 'x': ev.offsetX + srcLoc.x - eleLoc.x, 'y': ev.offsetY + srcLoc.y - eleLoc.y };
            }
        } (evt, evt.Source());
        function absLocation(ele) {
            if (ele.offsetParent) {
                var l = absLocation(ele.offsetParent);
                return { 'x': ele.offsetLeft - ele.offsetParent.scrollLeft + l.x, 'y': ele.offsetTop - ele.offsetParent.scrollTop + l.y };
            }
            else {
                return { 'x': ele.offsetLeft, 'y': ele.offsetTop };
            }
        }
    }
    return evt;
}
Event.KeyCode = function () { return new Event().KeyCode(); }
Event.Source = function () { return new Event().Source(); }
Event.Destination = function () { return new Event().Destination(); }
Event.stopPropagation = function () { return new Event().stopPropagation(); }
Event.Register = function (ele, eventName, eventHandler) {
    if (!eventHandler) return;
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
Event.Unregister = function (ele, eventName, eventHandler) {
    if (!eventHandler) return;
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
Event.UnhookMouseOut = function (root) {
    if (!root || !root.ownerDocument) return null;
    var body = root.ownerDocument.body;
    Event.Unregister(body, "mouseout", root.__check__out__);
    Event.Unregister(body, "mousemove", root.__check__move__);
}
Event.HookMouseOut = function (root, handler, mouseOutCall) {
    if (!root || !root.ownerDocument) return null;
    var body = root.ownerDocument.body;
    if (!body || !handler) return null;
    if (!mouseOutCall) {
        mouseOutCall = function (refEle, currEle) {
            while (currEle) {
                if (currEle == refEle) return false;
                currEle = currEle.parentNode;
            }
            return true;
        }
    };
    Event.Unregister(body, "mouseout", root.__check__out__);
    Event.Unregister(body, "mousemove", root.__check__move__);
    //    if (root.HookMouseOut__handler__) root.HookMouseOut__handler__(true);
    root.HookMouseOut__handler__ = handler;
    root.__check__move__ = function () {
        if (!root.ownerDocument) {
            Event.Unregister(body, "mousemove", root.__check__move__);
        }
        else {
            var evt = Event();
            var src = evt.Source();
            handler(mouseOutCall(root, src));
        }
    }
    Event.Register(body, "mousemove", root.__check__move__);
    root.__check__out__ = function () {
        if (!root.ownerDocument) {
            Event.Unregister(body, "mouseout", root.__check__out__);
        }
        else {
            var evt = Event();
            var src = evt.Destination()
            handler(mouseOutCall(root, src));
        }
    }
    Event.Register(body, "mouseout", root.__check__out__);
    return root.HookMouseOut__handler__;
}
Event.ObserveOnce = function (ele, eventName, eventHandler) {
    var reg = function () {
        eventHandler.apply(null, arguments);
        Event.Unregister(ele, eventName, arguments.callee);
    }
    Event.Register(ele, eventName, reg);
}