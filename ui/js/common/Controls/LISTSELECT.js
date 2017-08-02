//Domain.js
//override.js
var LISTSELECT = new function () {

    this.ListSelect = function (root) {
        var root = root;
        var self = this;


        root.onclick = function () {
            if (root.disabled || root.getAttribute("disabled") ||  root.getAttribute("readOnly")) return false;
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

        this.getValue = function () {
            return root._d ? root._d : null;
        }

        this.onitemselect = function (val) { }

        this.ondraw = function (ele, data, index, count) { };

        function beginEdit() {
            if (root._e) {
                root._e.style.display = "";
                root._e.style.zIndex = 999999;
            }
            setElePosition();
            root._t = setInterval(setElePosition, 100);
            bindEvents();
        }
        function endEdit() {
            unbindEvents();
            clearInterval(root._t);
            if (root._e) root._e.style.display = "none";
        }
        function setElePosition() {
            if (!root._e) return;
            var wndSize = Wnd(root).WindowSize();
            var refSize = Wnd(root).ElementSize(root);
            var refPos = Wnd(root).Element2Document(root);
            var eleSize = Wnd(root).ElementSize(root._e);
            var x, y;
            if (refPos.x + eleSize.width <= wndSize.width) {
                x = refPos.x;
            }
            else {
                x = wndSize.width - eleSize.width;
            }
            if (refPos.y + refSize.height + eleSize.height <= wndSize.height) {
                y = refPos.y + refSize.height;
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
            root._e.style.left = (x - scroll.x + 2) + "px";
            root._e.style.top = (y - scroll.x + 2) + "px";
        }
        function loadData(dataSource) {

            var list = dataSource ? dataSource : [];
            root._l = list;

            var div = document.createElement("div");
            root._e = div;
            div.style.cssText = "border:solid 1px #31A580;position:absolute;display:none;";

            list.forEach(function (item, i) {
                var divItem = document.createElement("div");
                div.appendChild(divItem);
                divItem._canedit = true;
                divItem._d = item;
                self.ondraw(divItem, item, i, list.length);
            });

            root.parentNode.appendChild(div);
        }
        function unloadData() {
            var div = root._e;
            root._e = null;
            if (div && div.parentNode) div.parentNode.removeChild(div);
            root._l = null;
        }
        function bindEvents() {
            Wnd(root).RegisterEvent(Wnd(root).GetDocument(), "click", clickevt);
            root._evt = clickevt;
        }
        function unbindEvents() {
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