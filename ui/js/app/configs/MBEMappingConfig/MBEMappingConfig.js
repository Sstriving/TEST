function init() {
    this.SetColumnHeadInfo();
    var mbemappingConfigForm = new MBEMappingConfigForm();
    mbemappingConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "MBEMappingRecords": "MBEMappingRecords",
        "SelectedPKCode": "SelectedPKCode",

        "NewMBEMapping": "NewMBEMapping",
        "SaveMBEMapping": "SaveMBEMapping",
        "DeleteMBEMapping": "DeleteMBEMapping",

        "ModalityRecords": "ModalityRecords",
        "BodyPartRecords": "BodyPartRecords",
        "ExamItemRecords": "ExamItemRecords",
        "ExamMethodRecords": "ExamMethodRecords",

        "ModalityCode": "ModalityCode",
        "BodyPartID": "BodyPartID",
        "ExamItemID": "ExamItemID",
        "ExamMethodID": "ExamMethodID",
        "MBEMappingRefCode": "MBEMappingRefCode",
        "MBEMappingDisplayCode": "MBEMappingDisplayCode",
        "Description": "Description",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        mbemappingConfigForm.SetTitle(t, titles[t]);
    }

    formCallCenter.RegisterForm(window.FormIDs.MBEMappingConfigModule, mbemappingConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function MBEMappingConfigForm() {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);
}
function SetColumnHeadInfo() {
    var data = new Array();
    //Name,Description,Width(可空)
   // data.push("MBEMappingRefCode:项目代码");
    data.push("MBEMappingDisplayCode:项目代码");
    data.push("Description:描述:100");
    data.push("ModalityName:影像类型");
    data.push("BodyPartName:检查部位");
    data.push("ExamItemName:检查项目");
    data.push("ExamMethodName:检查方法");

    var ele = document.getElementById("MBEMappingRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "MBEMappingRefCode");
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