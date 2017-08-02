/*

created by 王安茂 at 2015/4/20
mark: 单选多选

modified by 王安茂 at 2015/5/3
mark:

*/

var CustomSelect = function (ele) {
	var root = ele;
    var self = this;
    var config = {};

    this.getValue = function () {
        var eles = ele.children;
        var res = [];
        for (var i = 0; i < eles.length; i++) {
            if (eles[i].checked) res.push(eles[i].__bindedData);
        }

        return res;
    }

    this.config = function (cfg) { config = cfg; }

    this.onitemselect = function () { }

    this.loadData = function (val, displaymember) {

        if (!val) return false;
        if (val.length <= 0) return false;

        ele.innerHTML = "";

        for (var i = 0; i < val.length; i++) {

            var span = document.createElement("span");
            span.style.cssText = config && config.itemCssText ? config.itemCssText : "";
            ele.appendChild(span);

            span.innerText = "◇ " + val[i][displaymember] + "  ";
            span.__bindedData = val[i];
            span.onclick = function () {
				if (root.disabled || root.getAttribute("disabled") ||  root.getAttribute("readOnly")) return false;
				
                if (config && config.multSelect) {
                    //多选
                    if (this.checked) {
                        this.innerText = this.innerText.replace("◆", "◇");
                        this.checked = false;
                    } else {
                        this.innerText = this.innerText.replace("◇", "◆");
                        this.checked = true;
                    }
                }
                else {
                    var eles = ele.children;
                    for (var i = 0; i < eles.length; i++) {
                        eles[i].innerText = eles[i].innerText.replace("◆", "◇");
                        eles[i].checked = false;
                    }

                    if (!this.checked) {
                        this.innerText = this.innerText.replace("◇", "◆");
                        this.checked = true;
                    }
                }

                self.onitemselect();
            }

        }

    }

    this.setValue = function (match) {
        var eles = ele.children;
        for (var i = 0; i < eles.length; i++) {
            if (match(eles[i].__bindedData)) {
                eles[i].innerText = eles[i].innerText.replace("◇", "◆");
                eles[i].checked = true;
            }
            else {
                eles[i].innerText = eles[i].innerText.replace("◆", "◇");
                eles[i].checked = false;
            }
        }

    }
}

/*

created by 王安茂 at 2015/5/22
mark:

*/

var CustomSelectEx = function (ele) {

    var root = ele;
    var self = this;
    var config = {};

    this.getValue = function () { return $Array(root.children).where(function (item) { return item.checked; }).select(function (item) { return item.__bindedData; }); }
    this.config = function (cfg) { config = cfg ? cfg : config; }
    this.onitemselect = function () { }
    var draw = function (item) {
        var span = document.createElement("span");
        span.style.cssText = config && config.itemCssText ? config.itemCssText : "";
        root.appendChild(span);
        span.innerText = "◇ " + item + "  ";

        return span;
    }
    var onstatechanged = function (span) {

        if (config.multSelect) {
            //多选
            if (span.checked) {
                span.innerText = span.innerText.replace("◆", "◇");
                span.checked = false;
            } else {
                span.innerText = span.innerText.replace("◇", "◆");
                span.checked = true;
            }
        }
        else {
            $Array(root.children).forEach(function (item, i) {
                item.innerText = item.innerText.replace("◆", "◇");
                item.checked = false;
            });

            if (!span.checked) {
                item.innerText = span.innerText = span.innerText.replace("◇", "◆");
                span.checked = true;
            }
        }
    }

    var regKeyEvent = function () {
        if (config.multSelect) {
            $Array(root.children).forEach(function (item) {
                item.setAttribute("tabIndex", "1");
                item.onkeydown = function () {
                    switch (window.event.keyCode) {
                        case 32:
                            onstatechanged(item);
                            self.onitemselect();
                            break;
                        default:
                            break;
                    }
                }
            });

        }
        else {
            root.setAttribute("tabIndex", "1");
            root.onkeydown = function () {
                switch (window.event.keyCode) {
                    case 37:
                        var index = root.__bindedData.indexOf(self.getValue()[0]);
                        index = 0 >= index ? index : index - 1;
                        self.setValue(function (item) { return item == root.__bindedData[index]; });
                        self.onitemselect();
                        break;
                    case 39:
                        var index = root.__bindedData.indexOf(self.getValue()[0]);
                        index = root.__bindedData.length - 1 == index ? index : index + 1;
                        self.setValue(function (item) { return item == root.__bindedData[index]; });
                        self.onitemselect();
                        break;
                    default:
                        break;
                }
            }
        }

    }

    this.loadData = function (val, selector) {

        if (!val) return false;
        if (val.length <= 0) return false;
        root.innerHTML = "";
        root.__bindedData = val;

        val.forEach(function (item, i) {			
            var span = draw(selector(item));
            span.__bindedData = val[i];
            span.onclick = function () {
				if (root.disabled || root.getAttribute("disabled") ||  root.getAttribute("readOnly")) return false;
                onstatechanged(this);
                self.onitemselect();
            }
        });

        regKeyEvent();
    }

    this.setValue = function (match) {
        $Array(root.children).forEach(function (item, i) {
            if (match(item.__bindedData)) {
                item.innerText = item.innerText.replace("◇", "◆");
                item.checked = true;
            }
            else {
                item.innerText = item.innerText.replace("◆", "◇");
                item.checked = false;
            }
        });
    }
}