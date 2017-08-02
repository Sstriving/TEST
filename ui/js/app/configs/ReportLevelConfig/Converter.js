var ConvListSelectNullable = new function () {

    this.ListConverter = function () {

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
            return ele._d && ele._d[ele.getAttribute("valuemember")] ? ele._d[ele.getAttribute("valuemember")] : null;
        }
        this.ApplyValue = function (ele, val) {
            var root = ele;
            var valuemember = ele.getAttribute("valuemember");
            var displaymember = ele.getAttribute("displaymember");
            var item = {};
            //alert(val.toJSONString())
            item[valuemember] = null;
            item[displaymember] = "请选择";
            item["DisplayNO"] = null;
            val.splice(0, 0, item);

            var listselect = null;

            if (ele._listselect) {
                listselect = ele._listselect;
            } else {
                listselect = new LISTSELECT.ListSelect(ele);
                ele._listselect = listselect;
            }

            listselect.ondraw = function (ele, data, index, total) {
                if (index == -1 && ele.mgr) ele.mgr.BindAttributes();

                ele.style.cssText = root.style.cssText;

                if (index > -1) {
                    ele.style.backgroundColor = "white";
                    ele.style.border = "0";
                    ele.style.borderBottom = "solid 1px #E0E0E0";
                }

                ele.style.float = "";
                ele.style.cursor = "pointer";
                ele.style.textAlign = root.style.textAlign;
                ele.style.lineHeight = "20px";
                ele.style.textOverflow = "ellipsis";
                ele.style.whiteSpace = "nowrap";
                ele.style.overflow = "hidden";
                ele.style.width = root.style.width;
                ele.title = data ? data[displaymember] : "";
                ele.innerText = data ? data[displaymember] : "";

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

                if (index == 0) {
                    ele._listselect = listselect;
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

            listselect.onitemselect = function (val) {
                if (root.change) root.change(root);
                else changeFieldValue(root);
            }

            listselect.bindData(val);
        };
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
            ele._listselect.setItemSelected(function (item) { return item[ele.getAttribute("valuemember")] == val; });
        }
    }
}


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
            span.title = data.value;
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


var ConvListSelect = new function () {

    this.ListConverter = function () {
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
            return ele._listSelect ? ele._listSelect.getValue()[ele.getAttribute("valuemember")] : null;
        }
        this.ApplyValue = function (ele, val) {

            var listselect = null;
            var root = ele;

            if (root._listSelect) {
                listselect = root._listSelect;
            } else {
                listselect = new LISTSELECT.ListSelect(ele);
            }
            root._listSelect = listselect;

            listselect.ondraw = function (ele, data, index, count) {

                if (index == -1 && ele.mgr) ele.mgr.BindAttributes();

                if (index != -1) {
                    ele.style.backgroundColor = "white";
                    ele.style.border = "0";
                    ele.style.borderBottom = "solid 1px #E0E0E0";
                }

                ele.style.float = "";
                ele.style.cursor = "pointer";
                ele.style.textAlign = "left";
                ele.style.lineHeight = "20px";
                ele.style.width = root.style.width;
                ele.innerText = data ? data[root.getAttribute("displaymember")] : "";

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

                if (index == 0) {
                    ele._listSelect = listselect;
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

            listselect.onitemselect = function (val) {
                if (root.change) root.change(root);
                else changeFieldValue(root);
            }

            listselect.bindData(val);

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
            ele._listSelect.setItemSelected(function (item) { return item[ele.getAttribute("valuemember")] == val });
        }
    }
}

var ConvEditSelectNullable = new function () {

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

            val.add({ "ExamTypeID": null, "ExamTypeName": "请选择" });
           // val.add({ "UserCode": null, "UserName": "请选择", "CreateTime": null });
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
                    ele.style.float = "";
                    ele.style.cursor = "pointer";
                    ele.style.textAlign = root.style.textAlign;
                    ele.style.lineHeight = "20px";
                    ele.style.textOverflow = "ellipsis";
                    ele.style.whiteSpace = "nowrap";
                    ele.style.overflow = "hidden";
                    ele.style.width = root.style.width;
                    ele.title = data ? data[root.getAttribute("displaymember")] : "";
                    ele.innerText = data ? data[root.getAttribute("displaymember")] : "";
                }
                else if (index == count) {
                    ele.style.border = "0";
                    ele.style.position = "absolute";
                    ele.innerText = data ? data[root.getAttribute("inputmember")] : "";
                }
                else {

                    ele.style.float = "";
                    ele.style.cursor = "pointer";
                    ele.style.textAlign = root.style.textAlign;
                    ele.style.lineHeight = "20px";
                    ele.style.textOverflow = "ellipsis";
                    ele.style.whiteSpace = "nowrap";
                    ele.style.overflow = "hidden";
                    ele.style.width = root.style.width;
                    ele.title = data ? data[root.getAttribute("displaymember")] : "";
                    ele.innerText = data ? data[root.getAttribute("displaymember")] : "";

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


var SelectedPKeleDisabledConv = function (id1, id2) {
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
        var pkCode = document.getElementById(id1);
        if (!val) {
            pkCode.setAttribute("disabled", "disabled");
        }
        else {
            pkCode.removeAttribute('disabled');
        }
        var pkCode2 = document.getElementById(id2);
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