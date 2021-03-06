function init() {
    IsSimpleModeFieldInit();
    this.SetColumnHeadInfo();
    var _RISConfigForm = new RISConfigForm();
    _RISConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "OperateUserCode": "OperateUserCode",
        "UserList": "UserList",

        "OnDutyTimeBegin": "OnDutyTimeBegin",
        "OnDutyTimeEnd": "OnDutyTimeEnd",
        "OnDutyReviewUserCode": "OnDutyReviewUserCode",

        "SimpleModeValue": "SimpleModeValue",
        "ExamLockValidTimeSpan": "ExamLockValidTimeSpan",
        "FromPrintedToRejectedValidTimeSpan": "FromPrintedToRejectedValidTimeSpan",

        "PACSGatewayImplement": "PACSGatewayImplement",
        "PACSGatewayImplementList": "PACSGatewayImplementList",

        "HISGatewayImplement": "HISGatewayImplement",
        "HISGatewayImplementList": "HISGatewayImplementList",

        "PatientIDGeneratorImplement": "PatientIDGeneratorImplement",
        "PatientIDGeneratorImplementList": "PatientIDGeneratorImplementList",

        "AccessionNOGeneratorImplement": "AccessionNOGeneratorImplement",
        "AccessionNOGeneratorImplementList": "AccessionNOGeneratorImplementList",

        "DataPrinterImplement": "DataPrinterImplement",
        "DataPrinterImplementList": "DataPrinterImplementList",

        "SaveRISConfig": "SaveRISConfig",
        "SelectedPKID":"SelectedPKID",

        "AETitleByWorkStation": "AETitleByWorkStation",
        "AETitleListByWorkStation": "AETitleListByWorkStation",

        "PACSGatewayUrl": "PACSGatewayUrl",

        "SaveDcmConfig": "SaveDcmConfig",
        "SimpleModeKey": "SimpleModeKey",
        "SimpleModeRecords":"SimpleModeRecords",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        _RISConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.RISConfigModule, _RISConfigForm);

    document.oncontextmenu = function() { return false; }
}
// function test() {
//     console.log()
// }
// //修改
function RISConfigForm() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);
}
function SetColumnHeadInfo() {
    var data = new Array();
    data.push("KeyCode:已配置的CA接口实现列表：:240");
    data.push("Description:");

    var ele = document.getElementById("SimpleModeRecords");
    if(ele){
        ele.setAttribute("displaymember", data.join(","));
        ele.setAttribute("valuemember", "KeyCode");
    }
    alert(data);
}
function IsSimpleModeFieldInit() {
    var ele = document.getElementById("SimpleModeValue");
    var cs = undefined;
    if (ele._cs) {
        cs = ele._cs;
    } else {
        cs = new CustomSelect(ele);
    }

    cs.config({ itemCssText: "line-height:30px;cursor: pointer;", multSelect: false });

    cs.loadData([{ "code": true, "name": "简单模式" }, { "code": false, "name": "审核模式" }], "name");

    cs.onitemselect = function() { changeFieldValue(ele); }

    ele._cs = cs;
}

var CustomSelectConv = function() {
    this.SetValue = function(self) {
        return function(ele, args) {

            self.ApplyValue(ele, args);
            ele._dataValue = args;
            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele, ele.getAttribute("field"));
            }
            return true;
        };
    }(this);

    this.GetValue = function(ele) {
        return ele._dataValue;
    }

    this.GetUIValue = function(ele) {
        return ele._cs.getValue().select(function(item) { return item["code"]; })[0];
    }
    this.ApplyValue = function(ele, val) {

        var cs = undefined;
        if (ele._cs) {
            cs = ele._cs;
        } else {
            cs = new CustomSelect(ele);
        }

        ele._cs = cs;
        cs.setValue(function(item) { return item["code"].toString() == val; });
    }
}


var ConvListSelect = new function() {

    this.ListConverter = function() {
        this.CompareValues = function(val1, val2) {
            return val1 == val2 ? 0 : -1;
        }
        this.DecodeArguments = function(ele, args) {
            return args;
        }

        this.SetValue = function(self) {
            return function(ele, args) {
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
        }(this);
        this.GetValue = function(ele) {
            return ele._dataValue;
        }
        this.GetUIValue = function(ele) {
            return ele._listSelect ? ele._listSelect.getValue()[ele.getAttribute("valuemember")] : null;
        }
        this.ApplyValue = function(ele, val) {

            var listselect = null;
            var root = ele;

            if (root._listSelect) {
                listselect = root._listSelect;
            } else {
                listselect = new LISTSELECT.ListSelect(ele);
            }
            root._listSelect = listselect;

            listselect.ondraw = function(ele, data, index, count) {

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

                ele.onmouseleave = function() {
                    if (index > -1) {
                        this.style.backgroundColor = "white";
                        this.style.color = "black";
                    }
                }
                ele.onmouseenter = function() {
                    if (index > -1) {
                        this.style.backgroundColor = "#31A580";
                        this.style.color = "black";
                    }
                }

                if (index == 0) {
                    ele._listSelect = listselect;
                    if (root.mgr) root.mgr.Load(new function() {
                        this.BindAttributes = function() {
                            ele.setAttribute("field", root.getAttribute("itemField"));
                            ele.setAttribute("conv", root.getAttribute("itemconv"));
                        }

                        this.UnBindAttributes = function() {
                            ele.setAttribute("field", null);
                            ele.setAttribute("conv", null);
                        }

                    });
                    ele.setAttribute("field", root.getAttribute("itemField"));
                    ele.setAttribute("conv", root.getAttribute("itemconv"));
                    ele.setAttribute("valuemember", root.getAttribute("valuemember"));
                }

            }

            listselect.onitemselect = function(val) {
                if (root.change) root.change(root);
                else changeFieldValue(root);
            }

            listselect.bindData(val);

        }

    }

    this.ItemConverter = function() {
        this.DecodeArguments = function(ele, args) {
            return (Obj(args).InstanceOf(Array)) ? args[0] : args;
        }
        this.SetValue = function(self) {
            return function(ele, args) {
                var val = self.DecodeArguments(ele, args);
                self.ApplyValue(ele, val);
                return true;
            };
        }(this);

        this.GetValue = function(ele) {
            return ele._dataValue;
        }
        this.GetUIValue = function(ele) {
            return ele.value;
        }
        this.ApplyValue = function(ele, val) {
            ele._listSelect.setItemSelected(function(item) { return item[ele.getAttribute("valuemember")] == val });
        }
    }
}