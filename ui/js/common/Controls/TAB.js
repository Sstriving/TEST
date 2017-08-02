/*

created by 王安茂 at 2015/5/1
mark: 标签控件

*/

//json.js
//override.js

var TAB = new function () {

    this.TabSelect = function (div) {

        var root = div;
        var config = {};
        var self = this;

        var selectedItem = null;

        this.config = function (cfg) { config = cfg ? cfg : config; }

        this.load = function (data) {

            if (!data || !(Obj(data).InstanceOf(Array))) { throw new Error("TabSelect加载数据失败，数据格式不正确。"); return; }
            root.innerHTML = "";
            root.__bindedData = data;
            data.forEach(function (item, i) { createItem(item, data); });
        }

        var createItem = function (val, obj) {

            var div = document.createElement("div");
            root.appendChild(div);
            div.style.cssText = config.itemDivCss ? config.itemDivCss : "width:180px;height:100%;float:left;border-right:solid 1px #999999;";

            var div1 = document.createElement("div");
            div.appendChild(div1);
            div1.style.cssText = config.displayDivCss ? config.displayDivCss : "width:140px;height:100%;display:block;float:left;";

            div1._dataObject = obj;
            div1.__bindedData = val;
            self.ondraw(div1, val, obj.indexOf(val));
            div1.onclick = function () {
                self.onitemclick(this, this.__bindedData, this._dataObject.indexOf(this.__bindedData));
                if (!this.__bindedData.equals(selectedItem)) {
                    self.onitemselect(this.__bindedData)
                }
            };

            var span = document.createElement("span");
            span.style.cssText = config.closeCssText ? config.closeCssText : "line-height: 60px; width: 39px; height: 100%; float: left; text-align:center; cursor: pointer; border-left: dotted 1px #FFFFFF;";
            div.appendChild(span);

            span.innerText = "×";
            span._dataObject = obj;
            span.__bindedData = val;

            span.onclick = function () { self.oncloseclick(this.__bindedData, this._dataObject.indexOf(this.__bindedData)); };

        }

        this.closeItem = function (index) {

            if (!root.__bindedData) { throw new Error("关闭Item失败，TabSelect尚未加载数据。"); return; }

            //移除数据
            root.__bindedData.removeAt(index);
            root.removeChild(root.children[index]);
        }

        this.setItemSelected = function (match) {

            if (!root.__bindedData) { throw new Error("改变Item选中状态失败，TabSelect尚未加载数据。"); return; }

            root.__bindedData.forEach(function (item, i) {
                if (match(item)) {
                    root.children[i].style.cssText = config.itemSelectedDivCss;
                    selectedItem = item;
                }
                else {
                    root.children[i].style.cssText = config.itemDivCss;
                }
            });
        }

        this.getUIValue = function () { return root.__bindedData; }

        //回调
        this.ondraw = function (ele, val, index) { }
        this.oncloseclick = function (val, index) { }
        this.onitemclick = function (ele, val, index) { }
        this.onitemselect = function (selecteditem) { }
    }
}