/*

created by 王安茂 at 2015/5/2
mark: 右键菜单

*/

//ui.js
//json.js
//override.js

var MC = new function () {

    this.MenuContext = function (ele) {
        var root = ele;
        var self = this;

        root.oncontextmenu = function () {
            endEdit();
            beginEdit();
        }

        this.bindData = function (dataSource) {
            endEdit();
            unloadData();
            loadData(dataSource);
        }

        this.setItemSelected = function (match) {

            var list = root._l ? root._l : [];
            list.forEach(function (item, i) {
                if (match(item)) {
                    root._d = item;
                    self.ondraw(root, item, -1, list.length);
                }
            });
        }

        this.onitemselect = function (val) { }
        this.onitemselecting = function (val) { return true; }

        this.ondraw = function (ele, data, index, count) { };

        var beginEdit = function () {
            if (root._e) {
                root._e.style.display = "";
                root._e.style.zIndex = 999999;
            }
            setElePosition();
            root._t = setInterval(setElePosition, 100);
            bindEvents();
        }
        var endEdit = function () {
            unbindEvents();
            clearInterval(root._t);
            if (root._e) root._e.style.display = "none";
        }
        var setElePosition = function () {
            if (!root._e) return;

            var refPos = { x: 0, y: 0 };

            if (Wnd(root).GetEventObject()) {
                refPos = Wnd(root).MouseCoords();
                refPos.x -= 15;
                refPos.y -= 10;
                root._pp = refPos;
                root._rr = Wnd(root).Element2Document(root);
            }
            else {
                refPos = { x: root._pp.x - root._rr.x + Wnd(root).Element2Document(root).x, y: root._pp.y - root._rr.y + Wnd(root).Element2Document(root).y };
            }

            var wndSize = Wnd(root).WindowSize();
            var refSize = { "width": 0, "height": 0 };

            var eleSize = Wnd(root).ElementSize(root._e);
            var x, y;
            if (refPos.x + eleSize.width <= wndSize.width) {
                x = refPos.x;
            }
            else {
                x = wndSize.width - eleSize.width;
            }
            if (refPos.y + refSize.height + eleSize.height <= wndSize.height) {
                y = refPos.y + refSize.height + refSize.height;
            }
            else {
                if (eleSize.height <= refPos.y) {
                    y = refPos.y - eleSize.height + refSize.height;
                }
                else {
                    if (refSize.height + refPos.y + eleSize.height - wndSize.height <= eleSize.height - refPos.y) {
                        y = wndSize.height - eleSize.height;
                    }
                    else {
                        y = 0;
                    }
                }
            }
            var scroll = Wnd(root).DocumentScroll();
            root._e.style.left = (x + 15 - scroll.x) + "px";
            root._e.style.top = (y + 9 - scroll.y) + "px";
        }

        var loadData = function (dataSource) {

            var list = dataSource ? dataSource : [];
            root._l = list;

            var div = document.createElement("div");
            root._e = div;
            div.style.cssText = "border:solid 1px #FFFFFF;background-color:#31A580;padding:1px;position:absolute;display:none;";

            list.forEach(function (item, i) {
                var divItem = document.createElement("div");
                div.appendChild(divItem);
                divItem._canedit = true;
                divItem._d = item;
                self.ondraw(divItem, item, i, list.length);
            });
            root.parentNode.appendChild(div);
        }

        var unloadData = function () {
            var div = root._e;
            root._e = null;
            if (div && div.parentNode) div.parentNode.removeChild(div);
            root._l = null;
        }
        var bindEvents = function () {
            Wnd(root).RegisterEvent(Wnd(root).GetDocument(), "click", clickevt);
            root._evt = clickevt;
        }
        var unbindEvents = function () {
            var evt = root._evt;
            root._evt = null;
            if (evt) Wnd(root).UnregisterEvent(Wnd(root).GetDocument(), "click", evt);
        }
        var clickevt = function () {
            var ele = Wnd(root).GetEventObject().srcElement;
            if (ele == root) return;

            if (ele._canedit) {
                if (!self.onitemselecting(ele._d, ele)) return;
                self.setItemSelected(function (item) { return item.equals(ele._d); });
                self.onitemselect(ele._d);
            }

            endEdit();
        }

    }

    this.SubMenuContext = function (ele) {
        var root = ele;
        var self = this;

        root.onmouseover = function () {
            endEdit();
            beginEdit();
        }
        root.onmouseout = function () {
            endEdit();
        }

        this.bindData = function (dataSource) {
            endEdit();
            unloadData();
            loadData(dataSource);
        }

        this.setItemSelected = function (match) {

            var list = root._l ? root._l : [];
            list.forEach(function (item, i) {
                if (match(item)) {
                    root._d = item;
                }
            });
        }

        this.onitemselect = function (val) { }

        this.ondraw = function (ele, data, index, count) { };

        var beginEdit = function () {
            if (root._e) {
                root._e.style.display = "";
                root._e.style.zIndex = 999999;
            }
            setElePosition();
            root._t = setInterval(setElePosition, 100);
            bindEvents();
        }
        var endEdit = function () {
            unbindEvents();
            clearInterval(root._t);
            if (root._e) root._e.style.display = "none";
        }
        var setElePosition = function () {
            if (!root._e) return;

            var refPos = Wnd(root).Element2DocumentWithoutScroll(root);

            root._e.style.left = 120 + "px";
            root._e.style.top = 48 + "px";
        }

        var loadData = function (dataSource) {

            var list = dataSource ? dataSource : [];
            root._l = list;

            var div = document.createElement("div");
            root._e = div;
            div.style.cssText = "border:solid 1px #FFFFFF;background-color:#31A580;padding:1px;position:absolute;display:none;";

            list.forEach(function (item, i) {
                var divItem = document.createElement("div");
                div.appendChild(divItem);
                divItem._canedit = true;
                divItem._d = item;
                self.ondraw(divItem, item, i, list.length);
            });
            root.appendChild(div);
        }

        var unloadData = function () {
            var div = root._e;
            root._e = null;
            if (div && div.parentNode) div.parentNode.removeChild(div);
            root._l = null;
        }
        var bindEvents = function () {
            Wnd(root).RegisterEvent(Wnd(root).GetDocument(), "click", clickevt);
            root._evt = clickevt;
        }
        var unbindEvents = function () {
            var evt = root._evt;
            root._evt = null;
            if (evt) Wnd(root).UnregisterEvent(Wnd(root).GetDocument(), "click", evt);
        }
        var clickevt = function () {
            var ele = Wnd(root).GetEventObject().srcElement;
            if (ele == root) return;
            endEdit();
            if (ele._canedit) {
                self.setItemSelected(function (item) { return item.equals(ele._d); });
                self.onitemselect(ele._d);
            }
        }

    }
}