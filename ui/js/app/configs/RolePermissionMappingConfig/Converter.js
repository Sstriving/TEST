
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
                ele.style.textAlign = root.style.textAlign;
                ele.style.lineHeight = "20px";
                ele.style.textOverflow = "ellipsis";
                ele.style.whiteSpace = "nowrap";
                ele.style.overflow = "hidden";
                ele.style.width = root.style.width;
                ele.title = data ? data[root.getAttribute("displaymember")] : "";
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
                    ele.setAttribute("subfields", root.getAttribute("itemsubfields"));
                    ele.setAttribute("valueChanged", root.getAttribute("itemValueChanged"));
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

            val.add({ "PermissionCode": null, "PermissionName": "请选择" });
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

function ReadOnlyValueConv() {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return (Obj(args).InstanceOf(Array)) ? args[0] : args;
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            if (val && self.CompareValues(val, self.GetValue(ele)) == 0) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return false;
    }
    this.ApplyValue = function (ele, val) {
        ele.innerText = val && val != -1 ? val : "";
        ele.style.lineHeight = "20px";
        ele.style.textOverflow = "ellipsis";
        ele.style.whiteSpace = "nowrap";
        ele.style.overflow = "hidden";
        ele.title = val;
    }
}