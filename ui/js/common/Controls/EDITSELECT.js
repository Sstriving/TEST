//Wnd.js

var EDITSELECT = new function () {

    this.EditSelect = function (root) {
        var root = root;
        var self = this;

        var filterselector = function (item) { return item.toJSONString(); }
        var filtermatch = function (item) { return (filterselector(item.value) + "").indexOf(item.input) == 0; };

        root.onclick = function () {
			if (root.disabled || root.getAttribute("disabled") ||  root.getAttribute("readOnly")) return false;
            endEdit();
            beginEdit();
        }

        this.bindData = function (self) {
            return function (dataSource) {
                endEdit();
                unloadData();
                loadData(dataSource);
            }
        } (this);

        this.getValue = function () {
            return root._d ? root._d : null;
        }
        this.setItemSelected = function (match) {

            var list = root._l ? root._l : [];
            list.forEach(function (item, i) {
                if (match(item)) {
                    root._d = item;
                    root._txt._d = item;
                    self.ondraw(root, item, -1, list.length);
                }
            });
        }

        this.onitemselect = function (val) { }

        this.ondraw = function (ele, data, index, count) { };

        this.setFilterSelector = function (selector) { filterselector = selector; }
        this.setFilterMatch = function (match) { filtermatch = match; }

        var beginEdit = function () {
            if (root._e) {
                root._e.style.display = "";
                root._e.style.zIndex = 999999;
            }
            var txt = root._txt;
            if (txt) {
                var list = root._l ? root._l : [];
                txt.style.display = "";
                txt.style.zIndex = 999999;
                self.ondraw(txt, txt._d, list.length, list.length);
                var r = txt.createTextRange();
                r.moveStart("character", txt.value.length);
                r.select();
            }
            setElePosition();
            root._t = setInterval(setElePosition, 100);
            bindEvents();
            filterList(function (item) { return true; });
        }

        function endEdit() {
            unbindEvents();
            clearInterval(root._t);
            if (root._e) root._e.style.display = "none";
            if (root._txt) root._txt.style.display = "none";
        }

        function setElePosition() {
            if (!root._e || !root._txt) return;
            var wndSize = Wnd(root).WindowSize();
            var refSize = Wnd(root).ElementSize(root);
            var refPos = Wnd(root).Element2DocumentWithoutScroll(root);
            var eleSize = Wnd(root).ElementSize(root._e);
            root._txt.style.left = (refPos.x) + "px";
            root._txt.style.top = (refPos.y) + "px";
            root._txt.style.width = (refSize.width - 2) + "px";
            root._txt.style.height = (refSize.height - 3) + "px";
            var x, y, w, h;
            var v;
            if (refPos.x + eleSize.width <= wndSize.width) {
                x = refPos.x;
                w = eleSize.width;
            }
            else {
                if (eleSize.width <= wndSize.width) {
                    x = wndSize.width - eleSize.width;
                    w = eleSize.width;
                }
                else {
                    x = 0;
                    w = wndSize.width;
                }
            }
            if (refPos.y + refSize.height + eleSize.height <= wndSize.height) {
                y = refPos.y + refSize.height;
                h = eleSize.height;
                v = 0;
            }
            else {
                if (eleSize.height <= refPos.y) {
                    y = refPos.y - eleSize.height;
                    h = eleSize.height;
                    v = 1;
                }
                else {
                    var down = wndSize.height - refPos.y - refSize.height;
                    var up = refPos.y;
                    if (down >= up) {
                        h = down;
                        y = refPos.y + refSize.height;
                        v = 0;
                    }
                    else {
                        h = refPos.y;
                        y = 0;
                        v = 1;
                    }
                }
            }
            x += 12;
            y += v ? 10 : 20;
            root._e.style.left = (x - 12) + "px";
            root._e.style.top = (y - 19) + "px";
            root._e.style.width = w + "px";
            root._e.style.height = h + "px";
            root._e.style.overflow = "auto";
        }
        function loadData(dataSource) {

            var list = dataSource ? dataSource : [];

            root._l = list;
            var txt = document.createElement("input");
            txt.onkeyup = filterList;
            txt._canedit = true;
            root._txt = txt;
            txt.type = "text";
            txt.style.position = "absolute";
            txt.style.display = "none";
            txt.style.width = root.style.width;

            var div = document.createElement("div");
            root._e = div;

            div.style.position = "absolute";
            div.style.display = "none";
            div.style.width = root.style.width;

            list.forEach(function (item, i) {
                var divItem = document.createElement("div");
                div.appendChild(divItem);
                divItem._canedit = true;
                divItem._d = item;
                self.ondraw(divItem, item, i, list.length);
            });

            root.parentNode.appendChild(div);
            root.parentNode.appendChild(txt);

        }
        var filterList = function (match) {
            var input = root._txt.value;
            var div = root._e;
            var list = root._l ? root._l : [];
            if ((Wnd(root).GetEventObject().which || Wnd(root).GetEventObject().keyCode) == 13) {

                endEdit();

                var ele = $Array(div.children).first(function (item) { return item.style.display == ""; });
                if (ele) {
                var index = list.indexOf(ele._d);
                    self.setItemSelected(function (item) { return item.equals(ele._d); });
                    self.onitemselect(ele._d);
                }

                //代码已被优化
                //                list.forEach(function (item, i) {
                //                    if (div.children[i].style.display == "") {
                //                        self.setItemSelected(function (item) { return item.equals(div.children[i]._d); });
                //                        var list = root._l ? root._l : [];
                //                        var val = list.last(function (item) { return item.equals(div.children[i]._d); });
                //                        self.onitemselect(div.children[i]._d);
                //                    }
                //                });

            }
            else {

                list.forEach(function (item, i) {
                    var filter = match ? match({ "value": item, "input": input }) : filtermatch({ "value": item, "input": input });
                    div.children[i].style.display = filter ? "" : "none";
                });

                root._e.style.width = root.style.width;
                root._e.style.height = "";
                setElePosition();
            }
        }

        function unloadData() {
            var txt = root._txt;
            root._txt = null;
            if (txt && txt.parentNode) txt.parentNode.removeChild(txt);
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
            if (ele._EditableListInput) return;
            if (ele == root) return;
            endEdit();
            if (ele._canedit) {
                self.setItemSelected(function (item) { return item.equals(ele._d); });
                self.onitemselect(ele._d);
            }
        }

    }
}