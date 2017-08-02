function Menu(ele, style, verticalAnchor, data, parent) {
    var impl = ele ? ele.__menu__impl__ : null;
    if (!impl) {
        if ((ele && parent) || ((!ele) && (!parent))) throw new Error();
        if (!style) {
            style = {};
            style.single = "single";
            style.first = "first";
            style.middle = "middle";
            style.last = "last";
        }

        var parent = ele ? null : parent;
        var data = data;
        var container = null;
        var collection = new MenuItemCollection(this);
        this.Items = function () {
            return collection;
        }
        this.setElement = function (e) {
            if (arguments.callee.caller != parent.Unfold) throw new Error();
            ele = e;
        }
        this.GetData = function () {
            return data;
        }
        this.SetData = function (self) {
            return function (d) {
                data = d;
                self.Refresh();
            }
        } (this);
        this.Refresh = function (self) {
            return function () {
                if (ele) ele._x_set_x_ = null;
                if (parent.Unfolded()) {
                    var brothers = parent.Items();
                    draw(parent, self, brothers.Count(), brothers.IndexOf(self), ele);
                }
            }
        }(this);
        this.Parent = function () {
            return parent;
        }
        this.Release = function (self) {
            return function () {
                var brothers = parent.Items();
                if (arguments.callee.caller != brothers.RemoveAt && arguments.callee.caller != brothers.Clear) throw new Error();
                self.Fold(true);
                if (collection) {
                    for (var i = collection.Count(); i > 0; ) {
                        collection.ItemAt(--i).Items().Clear();
                    }
                    collection = null;
                }
                parent = null;
                if (container) {
                    if (container.parentNode) container.parentNode.removeChild(container);
                    container = null;
                }
                ele = null;
            }
        } (this);
        this.InnerElement = function (e) {
            var currEle = e;
            while (currEle) {
                if (currEle == ele || currEle == container) return true;
                currEle = currEle.parentNode;
            }
            for (var i = collection.Count(); i > 0; ) {
                if (collection.ItemAt(--i).InnerElement(e)) return true;
            }
            return false;
        }
        this.DrawItem;
        this.ItemClick;
        var draw = function (p, c, t, i, e) {
            var d = null;
            var tmp = p;
            while (tmp) {
                if (tmp.DrawItem) d = tmp.DrawItem;
                tmp = tmp.Parent();
            }
            d(p, c, t, i, e);

            if (!d || !d(p, c, t, i, e)) {
                e.innerText = e.textContent = e.title = c.GetData();
            }
            var cs = css(e);
            if (i == 0) {
                if (t < 2) {
                    cs.Remove(style.first);
                    cs.Remove(style.middle);
                    cs.Remove(style.last);
                    cs.Add(style.single);
                } else {
                    cs.Remove(style.single);
                    cs.Remove(style.middle);
                    cs.Remove(style.last);
                    cs.Add(style.first);
                }
            } else if (i == t - 1) {
                cs.Remove(style.single);
                cs.Remove(style.first);
                cs.Remove(style.middle);
                cs.Add(style.last);
            } else {
                cs.Remove(style.single);
                cs.Remove(style.first);
                cs.Remove(style.last);
                cs.Add(style.middle);
            }
        }
        var click = function (p, c) {
            var d = null;
            var tmp = p;
            while (tmp) {
                if (tmp.ItemClick) d = tmp.ItemClick;
                tmp = tmp.Parent();
            }
            if (d) d(p, c);
        }
        //..
        function MenuItemCollection(curr) {
            var unfolded = false;
            var items = [];
            this.Count = function () {
                return items.length;
            }
            var Fold = function (status) {
                for (i = 0; i < items.length; i++) {
                    items[i].Fold();
                }
                if (status) unfolded = false;
                if (container) container.style.display = "none";
            }
            curr.Fold = Fold;
            var Unfold = function (bounds) {
                var p = curr.Parent();
                if (p) p.Unfold();
                if (!unfolded) {
                    if (!container) {
                        container = ele.ownerDocument.createElement("div");
                        ele.ownerDocument.body.appendChild(container);
                        container.style.position = "absolute";
                        container.style.display = "none";
                        css(container).Add(style.menu);
                    }
                    var len = !items || !items.length ? 0 : items.length;
                    var children = container.children;
                    var cnt = children.length;
                    for (var i = cnt; i > len; ) {
                        container.removeChild(children[--i]);
                    }
                    for (var i = cnt; i < len; i++) {
                        var e = ele.ownerDocument.createElement("div");
                        e.onclick = function (c) {
                            return function () {
                                click(c.Parent(), c);
                            }
                        } (items[i]);
                        container.appendChild(e);
                    }
                    for (var i = 0; i < len; i++) {
                        var c = items[i];
                        var e = container.children[i];
                        c.setElement(e);
                        draw(curr, items[i], len, i, e);
                    }
                    unfolded = true;
                }
                container.style.display = "";
                if (!bounds) {
                    var evt = new Event();
                    var src = evt.Source();
                    bounds = src ? evt.Location(ele.ownerDocument.body, src) : {
                        "x": 0,
                        "y": 0
                    };
                }
                switch (typeof (bounds.width)) {
                    case 'number':
                        container.style.maxWidth = bounds.width + "px";
                        container.style.overflowX = "auto";
                        break;
                    case 'string':
                        container.style.maxWidth = parseInt(bounds.width, 10) + "px";
                        container.style.overflowX = "auto";
                        break;
                    default:
                        container.style.overflowX = "";
                        break;
                }
                switch (typeof (bounds.height)) {
                    case 'number':
                        container.style.maxHeight = bounds.height + "px";
                        container.style.overflowY = "auto";
                        break;
                    case 'string':
                        container.style.maxHeight = parseInt(bounds.height, 10) + "px";
                        container.style.overflowY = "auto";
                        break;
                    default:
                        container.style.overflowY = "";
                        break;
                }

                var rect = new ui(ele.ownerDocument.body).bounds();
                var size = new ui(container).bounds();
                if (typeof (verticalAnchor) == "undefined") {
                    if (rect.x + rect.width - bounds.x >= size.width) {
                        bounds.x = bounds.x;
                    } else if (bounds.x - rect.x >= size.width) {
                        bounds.x = bounds.x - size.width;
                    } else {
                        bounds.x = rect.x + rect.width - bounds.x >= bounds.x - rect.x ? rect.x + rect.width - size.width : rect.x;
                    }

                    if (rect.y + rect.height - bounds.y >= size.height) {
                        bounds.y = bounds.y;
                    } else if (bounds.y - rect.y >= size.height) {
                        bounds.y = bounds.y - size.height + 4;
                    } else {
                        bounds.y = rect.y + rect.height - bounds.y >= bounds.y - rect.y ? rect.y + rect.height - size.height : rect.y;
                    }
                } else {
                    var dock = new ui(ele).bounds();
                    if (verticalAnchor) {
                        if (rect.x + rect.width - dock.x >= size.width) {
                            bounds.x = dock.x;
                        } else if (dock.x + dock.width - rect.x >= size.width) {
                            bounds.x = dock.x + dock.width - size.width;
                        } else {
                            bounds.x = rect.x + rect.width - dock.x >= dock.x + dock.width - rect.x ? rect.x + rect.width - size.width : rect.x;
                        }

                        if (rect.y + rect.height - dock.y - dock.height >= size.height) {
                            bounds.y = dock.y + dock.height;
                        } else if (dock.y - rect.y >= size.height) {
                            bounds.y = dock.y - size.height + 4;
                        } else {
                            bounds.y = rect.y + rect.height - dock.y - dock.height >= dock.y - rect.y ? dock.y + dock.height : dock.y - size.height;
                        }
                    } else {
                        if (rect.x + rect.width - dock.x - dock.width >= size.width) {
                            bounds.x = dock.x + dock.width;
                        } else if (dock.x - rect.x >= size.width) {
                            bounds.x = dock.x - size.width;
                        } else {
                            bounds.x = rect.x + rect.width - dock.x - dock.width >= dock.x - rect.x ? dock.x + dock.width : dock.x - size.width;
                        }

                        if (rect.y + rect.height - dock.y >= size.height) {
                            bounds.y = dock.y;
                        } else if (dock.y + dock.height - rect.y >= size.height) {
                            bounds.y = dock.y + dock.height - size.height;
                        } else {
                            bounds.y = rect.y + rect.height - dock.y >= dock.y + dock.height - rect.y ? rect.y + rect.height - size.height : rect.y;
                        }
                    }
                }
                container.style.left = bounds.x + 2 + "px";
                container.style.top = bounds.y + "px";
                container.style.zIndex = ele.ownerDocument.all.length + 999999;
            }
            curr.Unfold = Unfold;
            var Unfolded = function () {
                var uf = unfolded && container && container.style.display != "none";
                if (uf) {
                    var p = curr.Parent();
                    if (p) uf = p.Unfolded();
                }
                return uf;
            }
            curr.Unfolded = Unfolded;
            this.Insert = function (self) {
                return function (index, data) {
                    if (index < 0 || index > items.length || typeof (index) != 'number')
                        throw new Error("Invalid index");
                    curr.Fold(true);
                    for (var i = items.length; i > index; i--) {
                        items[i] = items[i - 1];
                    }
                    items[index] = new Menu(null, style, false, data, curr);
                }
            } (this);
            this.Add = function (self) {
                return function (data) {
                    self.Insert(items.length, data);
                }
            } (this);
            this.Clear = function () {
                curr.Fold(true);
                for (var i = 0; i < items.length; i++) {
                    items[i].Release();
                }
                items.length = 0;
            }
            this.RemoveAt = function (self) {
                return function (index) {
                    if (index < 0 || index >= items.length || typeof (index) != 'number')
                        throw new Error("Invalid index");
                    curr.Fold(true);
                    items[index].Release();
                    for (var i = index + 1; i < items.length; i++) {
                        items[i - 1] = items[i];
                    }
                    items.length--;
                }
            } (this);
            this.Remove = function (self) {
                return function (data, filter) {
                    var index = self.IndexOf(data, filter);
                    if (index > -1) self.RemoveAt(index);
                }
            } (this);
            this.IndexOf = function (data, filter) {
                if (!filter) filter = function (a, b) {
                    return a == b;
                }
                if (data && data.constructor == Menu) {
                    for (var i = 0; i < items.length; i++) {
                        if (filter(items[i], data)) return i;
                    }
                }
                for (var i = 0; i < items.length; i++) {
                    if (filter(items[i].GetData(), data)) return i;
                }
                return -1;
            }
            this.ItemAt = function (index) {
                if (index < 0 || index >= items.length || typeof (index) != 'number')
                    throw new Error("Invalid index");
                return items[index];
            }
        }
        if (ele) ele.__menu__impl__ = this;
    }
    else {
        for (var i in impl) {
            this[i] = impl[i];
        }
    }
}