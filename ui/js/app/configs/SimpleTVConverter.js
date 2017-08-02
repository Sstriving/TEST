var SimpleTVConverter = function () {
    var TableApply = function (ele, val) {
        var tableviewex = null;
        var dvs = null;

        if (!ele._tableviewex) {
            tableviewex = new TABLE.TableViewEx(ele);
            ele._tableviewex = tableviewex;
        } else {
            tableviewex = ele._tableviewex;
        }

        if (!ele._dvs) {
            dvs = new TABLE.DataSource();
            ele._dvs = dvs;
        }
        else {
            dvs = ele._dvs;
        }

        tableviewex.ontablecelldraw = function (ele, data, index) {
            var span = document.createElement("span");
            ele.appendChild(span);
            span.style.lineHeight = "45px";
            ele.style.overflow = "hidden";
            span.style.whiteSpace = "nowrap";
            ele.style.textOverflow = "ellipsis";
            span.style.cursor = "pointer";
            span.innerText = data.value ? data.value : "";
            span.title = data.value ? data.value : "";
        }

        tableviewex.onrowselect = function (rowindex) {
            ele.parentNode.children[1]._UIValue = ele._tableviewex.getSelectedValue()[ele.getAttribute("valuemember")];
            changeFieldValue(ele.parentNode.children[1]);
        }

        //        var baseHeight = document.documentElement.clientHeight;
        //        var orignHeight = document.documentElement.clientHeight - 105;
        //        window.onresize = function () {
        //            if (document.documentElement.clientHeight - baseHeight + orignHeight > 0)
        //                tableviewex.changeHeight(document.documentElement.clientHeight - baseHeight + orignHeight);
        //            else
        //                tableviewex.changeHeight(1);
        //        }
        //        tableviewex.changeHeight(orignHeight)

        if (dvs.columns.length == 0) {
            var titles = ele.getAttribute("displaymember").split(",");
            for (var i = 0; i < titles.length; i++) {
                var args = titles[i].split(":");
                var width = "150";
                if (args.length == 3) width = args[2];
                dvs.columns.add({ "Name": args[0], "Description": args[1], "DisplayNO": i, "Width": width, "Visiable": true });
            }
        }

        if (val) dvs.rows = val;

        tableviewex.dataBind(dvs);
    }
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args;
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            if (val && self.CompareValues(val, self.GetValue(ele)) == 0) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._tableviewex.getSelectedValue()[ele.getAttribute("valuemember")];
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            switch (ele.tagName) {
                case "DIV":
                    TableApply(ele, val);
                    break;
            }
        };
    } (this);

    this.InheritProperties = function (srcElement, desElement, list, index) {
        desElement.setAttribute("field", srcElement.getAttribute("itemField"));
        desElement.setAttribute("subFields", srcElement.getAttribute("itemSubFields"));
        desElement.setAttribute("condFields", srcElement.getAttribute("itemCondFields"));
        desElement.setAttribute("conv", srcElement.getAttribute("itemConv"));
        desElement.setAttribute("command", srcElement.getAttribute("itemCommand"));
        desElement.setAttribute("formID", srcElement.getAttribute("itemFormID"));
        desElement.setAttribute("itemField", srcElement.getAttribute("itemItemField"));
        if (index + 1 == list.length) desElement.setAttribute("valueChanged", srcElement.getAttribute("itemValueChanged"));
    }
}

var SelectedPKCodeConv = function () {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {
        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}


var SelectedPKandDisabledConv = function (pkid) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {

        //设置元素Input的只读性
        var pkCode = document.getElementById(pkid);
        if (val) {
            pkCode.setAttribute("disabled", "disabled");
        }
        else {
            pkCode.removeAttribute('disabled');
        }
       
        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}


var SelectedPK2eleDisabledConv = function (pkid,delbuttid) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {

        //设置元素Input的只读性
        var pkCode = document.getElementById(pkid);
        if (val) {
            pkCode.setAttribute("disabled", "disabled");
        }
        else {
            pkCode.removeAttribute('disabled');
        }
        var deleteButton = document.getElementById(delbuttid);
        if (!val) {
            deleteButton.setAttribute("disabled", "disabled");
        }
        else {
            deleteButton.removeAttribute('disabled');
        }
        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}


var SelectedPK2buttDisabledConv = function (buttid1, buttid2) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {
            
        var pkCode1 = document.getElementById(buttid1);
        if (!val) {
            pkCode1.setAttribute("disabled", "disabled");
        }
        else {
            pkCode1.removeAttribute('disabled');
        }

        var pkCode2 = document.getElementById(buttid2);
        if (!val) {
            pkCode2.setAttribute("disabled", "disabled");
        }
        else {
            pkCode2.removeAttribute('disabled');
        }

        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}

var SelectedPKeleDisabledConv = function (pkid, buttid1, buttid2) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {

        //设置元素Input的只读性
        var pkCode = document.getElementById(pkid);
        if (val) {
            pkCode.setAttribute("disabled", "disabled");
        }
        else {
            pkCode.removeAttribute('disabled');
        }

        var pkCode1 = document.getElementById(buttid1);
        if (!val) {
            pkCode1.setAttribute("disabled", "disabled");
        }
        else {
            pkCode1.removeAttribute('disabled');
        }

        var pkCode2 = document.getElementById(buttid2);
        if (!val) {
            pkCode2.setAttribute("disabled", "disabled");
        }
        else {
            pkCode2.removeAttribute('disabled');
        }

        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}


var SelectedButtonDisabledConv = function (buttid) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {

        //设置删除按钮只读性
        var deleteBut = document.getElementById(buttid);
        if (!val) {
            deleteBut.setAttribute("disabled", "disabled");
        }
        else {
            deleteBut.removeAttribute('disabled');
        }

        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}