var publicReportDiagTempType = true;
function init() {
    initIsPublicList();
    initIsPublicField();

    var reportDiagTempConfigForm = new ReportDiagTempConfigForm();
    reportDiagTempConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "IsPublicField": "IsPublicField",
        "OperateUserCode": "OperateUserCode",
        "ArgsReportDiagTempID": "ArgsReportDiagTempID",
        "ArgsOwnerUserCode": "ArgsOwnerUserCode",
        "DiagTemplateList": "DiagTemplateList",
        "SelectedPKID": "SelectedPKID",
        "DiagTempTypeList": "DiagTempTypeList",
        "NewReportDiagTemp": "NewReportDiagTemp",
        "SaveReportDiagTemp": "SaveReportDiagTemp",
        "DeleteReportDiagTemp": "DeleteReportDiagTemp",

        "ReportDiagTempID": "ReportDiagTempID",
        "ReportDiagTempName": "ReportDiagTempName",
        "RefReportDiagTempID": "RefReportDiagTempID",
        "Finding": "Finding",
        "Impression": "Impression",
        "ContentFormat": "ContentFormat",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "ReportDiagTempType": "ReportDiagTempType",
        "CurrDiagTempFolderID": "CurrDiagTempFolderID",
        "CurrDiagTempTypeCode": "CurrDiagTempTypeCode",
        "SpecialCharTypeList": "SpecialCharTypeList",
        "SpecialCharList": "SpecialCharList",
        "CurrSpecialCharTypeCode": "CurrSpecialCharTypeCode",
        "NullValue": "NullValue",
        "MoveFirstReportDiagTemp": "MoveFirstReportDiagTemp",
        "MovePreviousReportDiagTemp": "MovePreviousReportDiagTemp",
        "MoveNextReportDiagTemp": "MoveNextReportDiagTemp",
        "MoveLastReportDiagTemp": "MoveLastReportDiagTemp"
    };
    for (var t in titles) {
        reportDiagTempConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportDiagTempConfigModule, reportDiagTempConfigForm);

    //document.oncontextmenu = function () { return false; }
    // reportDiagTempConfigForm.requestData("DiagTemplateList", ["true", null]); //默认选中“公有”词条

    reportDiagTempConfigForm.SetField("AppendDiagTempFlag", [true]);
    reportDiagTempConfigForm.SetField("DiagTempTypeList", [{ "DiagTempTypeCode": true, "DiagTempTypeName": "公有" }, { "DiagTempTypeCode": false, "DiagTempTypeName": "私有"}]);
    reportDiagTempConfigForm.SetField("CurrDiagTempTypeCode", [true]);
    // diagtempForm.SetField("DiagTemplateList", [{"ParentDiagTempID":2698,"ReportDiagTempID":2699,"ReportDiagTempName":"DR","UserCode":null,"Finding":"","Impression":"","IsLeaf":false,"DisplayNO":null,"Data":null}]);
    reportDiagTempConfigForm.requestData("DiagTemplateList", [publicReportDiagTempType, null]);

    reportDiagTempConfigForm.SetField("SpecialCharTypeList", [{ "SpecialCharTypeCode": true, "SpecialCharTypeName": "公有" }, { "SpecialCharTypeCode": false, "SpecialCharTypeName": "私有"}]);
    reportDiagTempConfigForm.SetField("CurrSpecialCharTypeCode", [true]);

}
function GetReportDiagTempType(srcEle) {//lml
    if (!srcEle.innerHTML || srcEle.innerHTML == "") {
        for (var i = 0; i < srcEle.parentNode.children.length - 1; i++) {
            if (srcEle.parentNode.children[i] == srcEle) return srcEle.parentNode.children[i + 1].innerHTML;
        }
        return null;
    }
    else {
        return srcEle.innerHTML;
    }
}
function LoadDiagTemp() {//lml
    var src = Event.Source();
    if (!src) return;
    publicReportDiagTempType = GetReportDiagTempType(src) != '私有';
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportDiagTempConfigModule);
    form.requestData("DiagTemplateList", [publicReportDiagTempType, null]);
}

function ReportDiagTempConfigForm() {
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
function FocusReportDiagTempName() {
    document.getElementById("ReportDiagTempName").focus();
}

function initIsPublicList() {
    var ele = document.getElementById("IsPublicList");
    if (!ele) return;
    var cs = undefined;
    if (ele._cs) {
        cs = ele._cs;
    }
    else {
        cs = new CustomSelect(ele);
    }

    cs.config({ itemCssText: "line-height:30px;cursor: pointer;", multSelect: false });

    cs.loadData([{ "code": true, "name": "公有" }, { "code": false, "name": "私有"}], "name");

    ele._cs = cs;

    cs.onitemselect = function () {
        requestData(ele.parentNode.children[1], [cs.getValue()[0]["code"].toString(), null]);
    }

    cs.setValue(function (item) { return item["code"] == true; });

}
function initIsPublicField() {
    var ele = document.getElementById("IsPublicField");
    var cs = undefined;
    if (ele._cs) {
        cs = ele._cs;
    }
    else {
        cs = new CustomSelect(ele);
    }

    cs.config({ itemCssText: "line-height:30px;cursor: pointer;", multSelect: false });

    cs.loadData([{ "code": true, "name": "公有" }, { "code": false, "name": "私有"}], "name");

    cs.onitemselect = function () { changeFieldValue(ele); }

    ele._cs = cs;

}


var SelectedPKIDConv = function () {
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
        return ele.value;
    }
    this.ApplyValue = function (ele, val) {
        var e = document.getElementById("btnDelete");
        if (!val || val == -1) {
            e.setAttribute("disabled", "disabled");
        }
        else {
            e.removeAttribute("disabled");
            //未完功能：刷新时在界面上选中指定数据
            //var e1 = document.getElementById("diagtemplatelist");
            //e1._treeView
        }
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

function TreeViewConv(params, style, sourcePathMap) {
    if (!params) params = {};
    if (!params.columnNameMember) params.columnNameMember = 'Name';
    if (!params.columnDescriptionMember) params.columnDescriptionMember = 'Description';
    if (!params.columnWidthMember) params.columnWidthMember = 'Width';
    if (!params.columnDisplayIndexMember) params.columnDisplayIndexMember = 'DisplayIndex';
    arguments[0] = params;
    Form_SingleValueConv.apply(this, arguments);
    this.DetermineApply = function (self) {
        return function (ele, val) {
            return self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    } (this);
    this.ApplyValue = function (ele, val) {
        var parentMember = params.parentMember = ele.getAttribute("parentMember");
        var valueMember = params.valueMember = ele.getAttribute("valueMember");
        var displayMember = params.displayMember = ele.getAttribute("displayMember");
        var typeMember = params.typeMember = ele.getAttribute("typeMember");
        var childrenMember = params.childrenMember = ele.getAttribute("childrenMember");
        var tv = ele.__tv;
        if (!tv) {
            tv = ele.__tv = new TreeView(ele, params, style, sourcePathMap);

            tv.NodeClick = function (t, r) {
                var filter = function (view, index, row) {
                    return row == r;
                }
                if (!r[params.typeMember]) {
                    var v = t.SubView(t.Nodes.IndexOf(filter));
                    if (v) {
                        var form = formCallCenter.DetectFormByElement(ele);
                        form.SetField("CurrDiagTempFolderID", [r.ReportDiagTempID]);
                        form.SetField("Finding", [r.Finding]);
                        form.SetField("Impression", [r.Impression]);
                        form.SetField("ReportDiagTempName", [r.ReportDiagTempName]);

                        commit(ele);

                        var selectedItem = document.getElementById("SelectedReportDiagTempID");
                        selectedItem.value = r.ReportDiagTempID;
                        changeFieldValue(selectedItem);
                        if (v.Unfolded) {//lml
                            v.Fold();
                        }
                        else {
                            v.Unfold();

                        }
                        if (r.Finding.trim() != "" && r.Impression.trim() != "") {
                            document.getElementById("Finding").style.visibility = "visible";
                            document.getElementById("Impression").style.visibility = "visible";
                            document.getElementById("CreateGroup").style.visibility = "hidden";
                            document.getElementById("CreateModel").style.visibility = "hidden";
                        } else {
                            document.getElementById("Finding").style.visibility = "hidden";
                            document.getElementById("Impression").style.visibility = "hidden";
                            document.getElementById("CreateGroup").style.visibility = "visible";
                            document.getElementById("CreateModel").style.visibility = "visible";
                        }
                    }
                }
                else {

                    var form = formCallCenter.DetectFormByElement(ele);
                    form.SetField("Finding", [r.Finding]);
                    form.SetField("Impression", [r.Impression]);
                    form.SetField("ReportDiagTempName", [r.ReportDiagTempName]);
                    var selectedItem = document.getElementById("SelectedReportDiagTempID");
                    selectedItem.value = r.ReportDiagTempID;
                    changeFieldValue(selectedItem);
                    document.getElementById("Finding").style.visibility = "visible";
                    document.getElementById("Impression").style.visibility = "visible";
                    document.getElementById("CreateGroup").style.visibility = "visible";
                    document.getElementById("CreateModel").style.visibility = "visible";

                }
                var tmp = tv.__selection;
                tv.__selection = r;

                var filter = function (view, index, row) { return row == tmp; };
                var node = tv.FindNode(filter);
                if (node && node.owner && node.index > -1) node.owner.Rows.Update(filter);

                filter = function (view, index, row) { return row == r; };
                t.Rows.Update(filter);
            }
            //            tv.NodeDblClick = function (t, r) {
            //                if (r[params.typeMember]) sendDiagTemp('AppendDiagTempFlag');
            //            }
            tv.DrawCell = function (t, ri, ci, r, c, e) {
                if (r && !c) {

                    if (tv.__selection == r) {
                        css(e.children[0]).Add("selectedTreeRow");

                    }
                    else {
                        css(e.children[0]).Remove("selectedTreeRow");
                    }

                }
            }
        }
        if (!val) {
            tv.Nodes.Clear();
        }
        else {//lml
            var filter = function (v, i, r) {
                var b = val && r[params.valueMember] == val[params.valueMember];
                if (b) {
                    r[params.typeMember] = val[params.typeMember];
                    return true;
                }
                else {
                    return false;
                }
            }
            tv.FindNode(filter);
            tv.InsertNode(val);
        }
    }
}
TreeViewConv.SelectTreeNodeConv = function () {//lml
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function (ele, val) {
        var listEle = null;
        for (var i = 0; i < ele.parentNode.children.length; i++) {
            if (ele.parentNode.children[i] == ele) {
                listEle = ele.parentNode.children[i + 1];
                break;
            }
        }
        var tv = listEle.__tv;
        if (!tv) return;
        var tmp = tv.__selection;
        tv.__selection = null;

        var filter = function (view, index, row) {
            if (row["ReportDiagTempID"] == val) {
                tv.__selection = row;
                return true;
            }
            else {
                return false;
            }
        };
        var node = tv.FindNode(filter);
        var filter = function (view, index, row) { return row == tmp; };
        var n = tv.FindNode(filter);
        if (n && n.owner && n.index > -1) n.owner.Rows.Update(filter);

        filter = function (view, index, row) { return row == tv.__selection; };
        node.owner.Unfold();
        node.owner.Rows.Update(filter);
    }
}

function DiagTempMenu() {
}
DiagTempMenu.Toggle = function (ele, show) {
    if (show) {
        $(ele).find(".List").show();
    }
    else {
        $(ele).find(".List").hide();
    }
}
DiagTempMenu.Select = function (ele) {
    ele.parentNode.previousSibling.innerHTML = ele.innerHTML;
    ele.parentNode.style.display = "none";
}
function ShowDiv() {
    document.getElementById("Finding").style.visibility = "visible";
    document.getElementById("Impression").style.visibility = "visible";
}

function HiddenDiv() {
    document.getElementById("Finding").style.visibility = "hidden";
    document.getElementById("Impression").style.visibility = "hidden";

}