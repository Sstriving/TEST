var init = function () {
    this.SetColumnHeadInfo();
    var situationForm = new SituationConfigForm();
    situationForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "CASignatureIdList": "CASignatureIdList",
        "CASignatureIdFilters": "CASignatureIdFilters",
        "CurrstartCAFilters": "CurrstartCAFilters",
        "CATypeList": "CATypeList",
        "CAIdFilters": "CAIdFilters",
        "strictCA": "strictCA",
        "Search": "Search",
        "strictCAListFilters": "strictCAListFilters",
        "strictCAList": "strictCAList",

        "CAImplement": "CAImplement",
        "CAImplementList": "CAImplementList",
        "SystemTypeCode": "SystemTypeCode",
        "SelectedPKID": "SelectedPKID",
        "CAImplementRecords": "CAImplementRecords",
        "SaveCAImplement": "SaveCAImplement"
    };
    for (var t in titles) {
        situationForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.SituationModule, situationForm);
}
var SituationConfigForm = function () {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default: self.SetField(title, args);
                    break;
            }
        };
    } (this);
}


var CheckBoxConv = function (name) {
    this.GetUIValue = function (root) {
        if (root.children[0].checked) {
            return true;
        } else {
            return false;
        }
    }
    this.ApplyValue = function (ele, val) {
        if (ele.children.length == 0) {
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("title", name);
            checkbox.setAttribute('onchange', 'changeFieldValue(this.parentNode);');
            ele.appendChild(checkbox);

            if (val) {
                checkbox.setAttribute("checked", "checked");
            }
        }
    }
    this.oo(new Form_SingleValueConv());
}

function SetColumnHeadInfo() {
    var data = new Array();
    data.push("KeyCode:已配置的CA接口实现列表：:240");
    data.push("Description:");

    var ele = document.getElementById("CAImplementRecords");
    if(ele){
        ele.setAttribute("displaymember", data.join(","));
        ele.setAttribute("valuemember", "KeyCode");
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
                ele._dataValue = val;

                if (ele.getAttribute("valueChanged")) {
                    var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                    if (vcEvt) vcEvt(ele);
                }
                return true;
            };
        } (this);
        this.GetValue = function (ele) {
            return ele._dataValue;
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
            return ele._dataValue;
        }
        this.GetUIValue = function (ele) {
            return ele.value;
        }
        this.ApplyValue = function (ele, val) {
            ele._listSelect.setItemSelected(function (item) { return item[ele.getAttribute("valuemember")] == val });
        }
    }
}