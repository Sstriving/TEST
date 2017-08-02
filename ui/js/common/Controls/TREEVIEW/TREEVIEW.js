var TreeView = function (ele) {

    var root = ele;
    var self = this;
    root._deep = [];

    this.getMatchNode = function (match) {

        var ele = root.getElementsByTagName("li").toArray().first(function (item) { return match(item.__bindedData); });
        return ele ? ele : root;
    }

    this.applyData = function (parentNode, dataList) {

        var ul = document.createElement("ul");
        ul.style.cssText = "list-style:none;margin:0;padding:0;";
        parentNode.appendChild(ul);

        dataList.forEach(function (item, i) {

            var li = document.createElement("li");
            li.style.cssText = "list-style:none;margin:0;padding:0;";
            li._deep = parentNode._deep.slice(0);
            li._deep.add(i == dataList.length - 1);
            li._isLeaf = item["isLeaf"];
            ul.appendChild(li);
            applyLine(li);
            var span = document.createElement("span");
            li.appendChild(span);
            li.__bindedData = item;
            self.onnodedraw(span, item);
            span.onclick = function (li) { return function () { self.onnodeclick(li); } } (li);
        });

    }

    this.onnodedraw = function (span, data) {
        span.innerText = data;
    }

    this.onnodeclick = function (li) {
        var ul = li.getElementsByTagName("ul")[0];
        var div = li.children.toArray().first(function (item) { return item.changeBackgroundImage != undefined; });
        if (div) div.changeBackgroundImage(ul.style.display == "none" ? div.backgroundImage == "lastopen" ?  "lastclose" : "middleclose" : div.backgroundImage == "lastclose" ? "lastopen" : "middleopen");
        if (ul) ul.style.display = ul.style.display == "none" ? "" : "none";
    }

    var applyLine = function (ele) {

        ele._deep.forEach(function (isLast, i) {

            var div1 = document.createElement('span');
            ele.appendChild(div1);

            if (i == ele._deep.length - 1) {

                if (isLast) {

                    if (ele._isLeaf) {
                        div1.style.cssText = "width:18px;height:20px;border:0; background:url(common/Controls/TREEVIEW/last.png) center no-repeat;display:inline-block; position:relative;margin:0;padding:0;";

                    } else {

                        div1.style.cssText = "width:18px;height:20px;border:0; background:url(common/Controls/TREEVIEW/lastclose.png) center no-repeat;display:inline-block; position:relative;margin:0;padding:0;";
                        div1.changeBackgroundImage = function (image) { this.style.background = "url(common/Controls/TREEVIEW/" + image + ".png) center no-repeat"; this.backgroundImage = image; }
                        div1.backgroundImage = "lastclose";
                    }

                } else {

                    if (ele._isLeaf) {
                        div1.style.cssText = "width:18px;height:20px;border:0;background:url(common/Controls/TREEVIEW/middle.png) center no-repeat;display:inline-block;line-height:18px;margin:0;padding:0;";

                    } else {
                        div1.style.cssText = "width:18px;height:20px;border:0;background:url(common/Controls/TREEVIEW/middleclose.png) center no-repeat;display:inline-block;line-height:18px;margin:0;padding:0;";
                        div1.changeBackgroundImage = function (image) { this.style.background = "url(common/Controls/TREEVIEW/" + image + ".png) center no-repeat"; this.backgroundImage = image; }
                        div1.backgroundImage = "middleclose";
                    }

                }

            } else {
                if (isLast) {
                    div1.style.cssText = "width:18px;height:20px;border:0;background:url(common/Controls/TREEVIEW/blank.png) center no-repeat;display:inline-block;line-height:18px;margin:0;padding:0;";

                } else {

                    div1.style.cssText = "width:18px;height:20px;border:0;background:url(common/Controls/TREEVIEW/line.png) center no-repeat;display:inline-block;line-height:18px;margin:0;padding:0;";

                }
            }

        });
    }
}