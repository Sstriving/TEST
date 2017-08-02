var SimpleTVCharConverter = function () {
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
            span.innerText = data.value ? data.value : "全部";
            span.title = data.value;
        }

        tableviewex.onrowselect = function (rowindex) {
            ele.parentNode.children[1]._UIValue = tableviewex.getSelectedValue().toJSONString();

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
        return ele._tableviewex.getSelectedValue().toJSONString();
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
var SelectedCharConv = function (delButt) {
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
        var deleteBut = document.getElementById(delButt);
        if (!val) {
            deleteBut.setAttribute("disabled", "disabled");
        }
        else {
            deleteBut.removeAttribute('disabled');
        }

        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { if (val) { return item["CharContent"] == val["CharContent"] && item["OwnerUserCode"] == val["OwnerUserCode"]; } });
    }
}


var CustomSelectConv = function () {

    this.SetValue = function (self) {
        return function (ele, args) {

            self.ApplyValue(ele, args);
            ele.__bindedData = args;
            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele, ele.getAttribute("field"));
            }
            return true;
        };
    } (this);

    this.GetValue = function (ele) {
        return ele.__bindedData;
    }

    this.GetUIValue = function (ele) {
        return ele._cs.getValue().select(function (item) { return item["code"]; })[0];
    }
    this.ApplyValue = function (ele, val) {

        var cs = undefined;
        if (ele._cs) {
            cs = ele._cs;
        }
        else {
            cs = new CustomSelect(ele);
        }

        ele._cs = cs;
        cs.setValue(function (item) { return item["code"].toString() == val; });

    }
}

var ConvEditSelect = new function () {

    this.ListConverter = function () {
        this.CompareValues = function (val1, val2) {
            return val1 == val2 ? 0 : -1;
        }
        this.DecodeArguments = function (ele, args) {
            return (Obj(args[0]).InstanceOf(Array)) ? args[0] : args;
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
            return ele._editselect.getValue() ? ele._editselect.getValue()[ele.getAttribute("valuemember")] : null;
        }
        this.ApplyValue = function (ele, val) {
            var root = ele;

            var editselect = null;

            if (!ele._editselect) {
                editselect = new EDITSELECT.EditSelect(root);
                root._editselect = editselect;
            } else {
                editselect = root._editselect;
            }

            editselect.onitemselect = function () {
                if (root.change) root.change();
                else changeFieldValue(root);
            }

            editselect.ondraw = function (ele, data, index, count) {
                if (index == 0) ele.parentNode.style.border = "solid 1px #31A580";
                ele.style.cssText = root.style.cssText;
                if (index == -1) {
                    ele.innerText = data ? data[root.getAttribute("displaymember")] : " ";
                }
                else if (index == count) {
                    ele.style.border = "0";
                    ele.style.position = "absolute";
                    ele.innerText = data ? data[root.getAttribute("inputmember")] : "";
                }
                else {
                    ele.innerText = data ? data[root.getAttribute("displaymember")] : " ";
                    ele.style.cursor = "pointer";
                    ele.style.backgroundColor = "white";
                    ele.style.border = "0";
                    ele.style.borderBottom = index == count - 1 ? "solid 1px #FFFFFF" : "solid 1px #E0E0E0";

                    ele.onmouseleave = function () {
                        if (index > -1) {
                            this.style.backgroundColor = "white";
                            this.style.color = "black";
                        }
                    }
                    ele.onmouseenter = function () {
                        if (index > -1) {
                            this.style.backgroundColor = "#31A580";
                            this.style.color = "black";
                        }
                    }
                }

                if (index == 0) {
                    ele._editselect = editselect;
                    if (root.mgr) root.mgr.Load(new function () {
                        this.BindAttributes = function () {
                            ele.setAttribute("field", root.getAttribute("itemField"));
                            ele.setAttribute("conv", root.getAttribute("itemconv"));
                        }

                        this.UnBindAttributes = function () {
                            ele.setAttribute("field", null);
                            ele.setAttribute("conv", null);
                        }
                    });
                    ele.setAttribute("field", root.getAttribute("itemField"));
                    ele.setAttribute("conv", root.getAttribute("itemconv"));
                    ele.setAttribute("valuemember", root.getAttribute("valuemember"));
                }
            }

            editselect.setFilterSelector(function (item) { return item[root.getAttribute("inputmember")]; });
            editselect.bindData(val)

        }

    }

    this.ItemConverter = function () {

        this.DecodeArguments = function (ele, args) {
            return (Obj(args).InstanceOf(Array)) ? args[0] : args;
        }
        this.SetValue = function (self) {
            return function (ele, args) {
                var val = self.DecodeArguments(ele, args);
                self.ApplyValue(ele, val);
                return true;
            };
        } (this);

        this.GetValue = function (ele) {
            return ele.__bindedData;
        }
        this.GetUIValue = function (ele) {
            return ele.value;
        }
        this.ApplyValue = function (ele, val) {
            ele._editselect.setItemSelected(function (item) { return item[ele.getAttribute("valuemember")] == val });
        }
    }

}