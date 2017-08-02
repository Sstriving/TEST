var publicReportDiagTempType = true;
var init = function() {

    var diagtempForm = new DiagTempForm();
    diagtempForm.oo(new IdentifiedForm(document.body));

    var titles = {
        AppendDiagTempFlag: "AppendDiagTempFlag",
        SaveDiagTempFromReport: "SaveDiagTempFromReport",
        DeleteDiagTempFromReport: "DeleteDiagTempFromReport",

        Finding: "Finding",
        Impression: "Impression",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        ReportDiagTempType: "ReportDiagTempType",
        CurrDiagTempFolderID: "CurrDiagTempFolderID",
        DiagTempTypeList: "DiagTempTypeList",
        DiagTemplateList: "DiagTemplateList",
        CurrDiagTempTypeCode: "CurrDiagTempTypeCode",
        SpecialCharTypeList: "SpecialCharTypeList",
        SpecialCharList: "SpecialCharList",
        CurrSpecialCharTypeCode: "CurrSpecialCharTypeCode",
        NullValue: "NullValue"
    };

    for (var t in titles) {
        diagtempForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.DiagTempForm, diagtempForm);
    diagtempForm.SetField("AppendDiagTempFlag", [true]);
    diagtempForm.SetField("DiagTempTypeList", [{ "DiagTempTypeCode": true, "DiagTempTypeName": "公有" }, { "DiagTempTypeCode": false, "DiagTempTypeName": "私有" }]);
    diagtempForm.SetField("CurrDiagTempTypeCode", [true]);
    // diagtempForm.SetField("DiagTemplateList", [{"ParentDiagTempID":2698,"ReportDiagTempID":2699,"ReportDiagTempName":"DR","UserCode":null,"Finding":"","Impression":"","IsLeaf":false,"DisplayNO":null,"Data":null}]);
    diagtempForm.requestData("DiagTemplateList", [publicReportDiagTempType, null]);

    diagtempForm.SetField("SpecialCharTypeList", [{ "SpecialCharTypeCode": true, "SpecialCharTypeName": "公有" }, { "SpecialCharTypeCode": false, "SpecialCharTypeName": "私有" }]);
    diagtempForm.SetField("CurrSpecialCharTypeCode", [true]);
    formCallCenter.UnregisterEvent("LoadDiagTemp");
    formCallCenter.RegisterEvent("LoadDiagTemp", LoadDiagTemp);
}

function GetReportDiagTempType(srcEle) { //lml
    if (!srcEle.innerHTML || srcEle.innerHTML == "") {
        for (var i = 0; i < srcEle.parentNode.children.length - 1; i++) {
            if (srcEle.parentNode.children[i] == srcEle) return srcEle.parentNode.children[i + 1].innerHTML;
        }
        return null;
    } else {
        return srcEle.innerHTML;
    }
}

function LoadDiagTemp(tempID) { //lml
    var src = Event.Source();
    if (src) publicReportDiagTempType = GetReportDiagTempType(src) != '私有';
    m_SelectedNode = null;
    var form = formCallCenter.GetFormByID(window.FormIDs.DiagTempForm);
    form.requestData("DiagTemplateList", [publicReportDiagTempType, null]);
    if (!tempID) return;
    var strs = new Array(); //定义一数组
    strs = tempID.split(","); //字符分割
    for (i = 0; i < strs.length; i++) {
        form.requestData("DiagTemplateList", [publicReportDiagTempType, parseInt(strs[i])]);
    }
}

var DiagTempForm = function() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);
}

function sendDiagTemp(appendDiagTempFlag) {
    var form = formCallCenter.GetFormByID(window.FormIDs.DiagTempForm);
    var append = form.GetField(appendDiagTempFlag);
    if (append) {
        formCallCenter.RaiseEvent('insertDiagTerm_Finding', window.FormIDs.ReportModule, form.GetField("Finding"), "Append");
        formCallCenter.RaiseEvent('insertDiagTerm_Impression', window.FormIDs.ReportModule, form.GetField("Impression"), "Append");
    } else {
        formCallCenter.RaiseEvent('insertDiagTerm_Finding', window.FormIDs.ReportModule, form.GetField("Finding"), "Replace");
        formCallCenter.RaiseEvent('insertDiagTerm_Impression', window.FormIDs.ReportModule, form.GetField("Impression"), "Replace");
    }
}

function shiftAppendDiagTempFlag(field) {
    var form = formCallCenter.GetFormByID(window.FormIDs.DiagTempForm);
    var append = form.GetField(field);
    form.SetField(field, [!append]);
}

function DiagTempHtmlConv() {
    this.SetValue = function(ele, val) {
        ele.innerHTML = val;
    }
    this.GetValue = function(ele) {
        return ele.innerHTML;
    }
    this.GetUIValue = function(ele) {
        return ele.innerHTML;
    }
    this.oo(new Form_SingleValueConv());
}

function BoolValueByCheckBoxConv() {
    this.ApplyValue = function(self) {
        return function(ele, val) {
            ele.checked = val ? "checked" : "";
            ele.onchange = function() {
                self.SetValue(ele, [self.GetUIValue(ele)]);
            }
        }
    }(this);
    this.GetUIValue = function(ele) {
        return ele.checked == "checked" || ele.checked;
    }
    this.oo(new Form_SingleValueConv());
}

function SpecialCharListItemConv() {
    TileListConv.TileListItemConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        formCallCenter.RaiseEvent("insertSpecialchar", window.FormIDs.ReportModule, val, "Insert");
    }
}

var m_SelectedNode = null;

function TreeViewConv(params, style, sourcePathMap) {
    if (!params) params = {};
    if (!params.columnNameMember) params.columnNameMember = 'Name';
    if (!params.columnDescriptionMember) params.columnDescriptionMember = 'Description';
    if (!params.columnWidthMember) params.columnWidthMember = 'Width';
    if (!params.columnDisplayIndexMember) params.columnDisplayIndexMember = 'DisplayIndex';
    arguments[0] = params;
    Form_SingleValueConv.apply(this, arguments);
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    }(this);
    this.DecodeArguments = function(ele, args) {
        var data = [];
        var j = 0;
        for (var i = 0; i < args[0].Data.length; i++) {
            if (args[0].Data[i].ReportDiagTempName != "US") {
                data[j] = args[0].Data[i];
                j++;
            }
        }
        args[0].Data = data;
        return args[0];
    }
    this.ApplyValue = function(ele, val) {

        var parentMember = params.parentMember = ele.getAttribute("parentMember");
        var valueMember = params.valueMember = ele.getAttribute("valueMember");
        var displayMember = params.displayMember = ele.getAttribute("displayMember");
        var typeMember = params.typeMember = ele.getAttribute("typeMember");
        var childrenMember = params.childrenMember = ele.getAttribute("childrenMember");
        var tv = ele.__tv;
        if (!tv) {
            tv = ele.__tv = new TreeView(ele, params, style, sourcePathMap);

            formCallCenter.UnregisterEvent("UnfoldDiagTempFolder");
            formCallCenter.RegisterEvent("UnfoldDiagTempFolder", function(val) {
                if (tv.Rows.Count > 0) {
                    var view = tv.SubView(0);
                    if (!view.Unfolded) tv.onNodeClick(tv.Rows.Item(0));
                    if (val) {
                        for (var i = 0; i < val.length; i++) {
                            var filter = function(view, index, row) {
                                return val[i] == row[displayMember];
                            }
                            var node = tv.FindNode(filter);
                            if (node && node.owner && node.index > -1) {
                                var list = [];
                                var m = node.owner;
                                for (var i = 0; i < m.Rows.Count; i++) {
                                    if (i != node.index) {
                                        var view = m.SubView(i, true);
                                        if (view) view.Fold();
                                    }
                                }
                                while (m) {
                                    list[list.length] = m;
                                    m = m.Parent;
                                }
                                for (var j = list.length; j > 0;) {
                                    list[--j].Unfold();
                                }
                                node.owner.onNodeClick(node.owner.Rows.Item(node.index));
                            }
                        }
                    }
                }
            });

            tv.NodeClick = function(t, r) {
                m_SelectedNode = r;
                var filter = function(view, index, row) {
                    return row == r;
                }
                if (!r[params.typeMember]) {
                    var v = t.SubView(t.Nodes.IndexOf(filter));
                    if (v) {
                        if (v.Unfolded) {
                            v.Fold();
                        } else {
                            var form = formCallCenter.DetectFormByElement(ele);
                            form.SetField("CurrDiagTempFolderID", [r.ReportDiagTempID]);
                            commit(ele);
                            v.Unfold();
                        }
                    }
                } else {
                    var form = formCallCenter.DetectFormByElement(ele);
                    form.SetField("Finding", [FormatHTML(r.Finding ? r.Finding : "")]);
                    form.SetField("Impression", [FormatHTML(r.Impression ? r.Impression : "")]);
                }
                var tmp = tv.__selection;
                tv.__selection = r;

                var filter = function(view, index, row) { return row == tmp; };
                var node = tv.FindNode(filter);
                if (node && node.owner && node.index > -1) node.owner.Rows.Update(filter);

                filter = function(view, index, row) { return row == r; };
                t.Rows.Update(filter);
            }
            tv.NodeDblClick = function(t, r) {
                if (r[params.typeMember]) sendDiagTemp('AppendDiagTempFlag');
            }
            tv.DrawCell = function(t, ri, ci, r, c, e) {
                if (r && !c) {
                    if (tv.__selection == r) {
                        css(e.children[0]).Add("selectedTreeRow");
                    } else {
                        css(e.children[0]).Remove("selectedTreeRow");
                    }
                }
                e.oncontextmenu = function() {
                    tv.NodeClick(t, r);
                    var form = formCallCenter.DetectFormByElement(ele);
                    if (form.GetField("CurrDiagTempTypeCode")) {
                        return false;
                    } else {
                        if (c && m_SelectedNode) {
                            createMenu();
                            return false;
                        }
                    }
                }
            }
        }
        if (!val) {
            tv.Nodes.Clear();
        } else {
            tv.InsertNode(val);
        }
    }
}

function createMenu() {
    var menuContainer = document.getElementById("Div_DiagTemp");
    var menu = menuContainer.__menu__;
    if (!menu) {
        menu = menuContainer.__menu__ = new Menu(menuContainer);
        menu.ItemClick = clickMenu;
        menu.DrawItem = drawItem;
        var items = menu.Items();
        if (items.Count() == 0) {
            items.Add("创建词条");
            items.Add("修改词条");
            items.Add("删除词条");
        }
        menuContainer.onclick = menuContainer.onmousewheel = function() {
            menu.Fold();
        }
    }
    menu.Unfold();
}

function drawItem(parentMenu, itemMenu, total, index, ele) {
    ele.style.cursor = "pointer";
}


function clickMenu(parentMenu, itemMenu) {
    parentMenu.Fold();
    var data = itemMenu.GetData();
    switch (data) {
        case "创建词条":
            ShowOrHide_Div_AddFrom(true, false);
            break;
        case "修改词条":
            ShowOrHide_Div_AddFrom(true, true);
            break;
        case "删除词条":
            DeleteDiagTempFromReport(Event.Source());
            break;
    }
}

function FormatHTML(str) {
    if (!str) return "";
    return str;
    str = str.replace(/\r\n/g, '<p/>');
    str = str.replace(/\r/g, '<p/>');
    str = str.replace(/\n/g, '<p/>');
    var html = "";
    var regExp = /\[.+?\]/g;
    var splits = str.split(regExp);
    var matches = str.match(regExp);
    html = splits[0];
    for (var i = 1; i < splits.length; i++) {
        html += FormatMenuHTML(matches[i - 1]) + FormatMenuHTML(splits[i]);
    }
    return html;
}

function FormatMenuHTML(str) {
    var split = false;
    for (var i = str.length - 1; i > -1; i--) {
        switch (str[i]) {
            case "|":
                split = true;
                break;
            case "[":
                if (split) {
                    str += "]";
                    split = false;
                } else {
                    i = 0;
                }
                break;
            case "]":
                i = 0;
                break;
        }
    }
    var newStr = str.replace("[", "").replace("]", "");
    var items = newStr.split("|");
    if (items.length == 1) {
        return items[0];
    } else {
        // var html = "<span class='editableMenu' contenteditable='false' onmouseover='DiagTempMenu.Toggle(this,true)' onmouseout='DiagTempMenu.Toggle(this,false)'>";
        // html += "<span class='Drop' contenteditable='true'>" + items[0] + "</span>";
        // html += "<ul class='List'>";
        // for (var i = 0; i < items.length; i++) {
        //     html += "<li onclick='DiagTempMenu.Select(this)' class='Item'>" + items[i] + "</li>"
        // }
        // html += "</ul>";
        // html += "</span>";
        // return html;
        var html = "<span contenteditable='true' style='border:solid 1px #fff'><span contenteditable='false'><select onchange=\"var html ='';var options=this.options;for(var i=0;i<options.length;i++){html+=(i==this.selectedIndex?'<option selected>':'<option>')+options[i].innerHTML+'</option>'};this.innerHTML=html;\">";
        for (var i = 0; i < items.length; i++) {
            html += "<option>";
            html += items[i];
            html += "</option>";
        }
        html += "</select></span></span>";
        return html;
    }
}

/*******************开始：以报告内容创建词条模板*******************/
var m_IsUpdateMode = false;

function ShowOrHide_Div_AddFrom(visible, isUpdateMode) {
    m_IsUpdateMode = isUpdateMode;
    var layer = document.getElementById("Div_AddFrom");
    if (visible === null) visible = layer.style.display == "none";

    if (!visible) {
        layer.style.display = "none";
        return;
    }

    if (!m_SelectedNode) {
        alert("请先选择一个父级词条节点！");
        return;
    }
    layer.style.display = "";

    var parentNode = document.getElementById("AddFrom_ParentNodeName");
    parentNode.innerText = parentNode.title = m_SelectedNode.ReportDiagTempName;
    document.getElementById("AddFrom_ParentNodeID").innerText = m_SelectedNode.ReportDiagTempID;

    SetAddDiagTempMode("Content");
    if (isUpdateMode) {
        if (!m_SelectedNode.IsLeaf) SetAddDiagTempMode("Group")
        document.getElementById("AddFrom_TempName").value = m_SelectedNode.ReportDiagTempName;
        document.getElementById("AddFrom_Finding").innerText = m_SelectedNode.Finding;
        document.getElementById("AddFrom_Impression").innerText = m_SelectedNode.Impression;
    }
}

function SetAddDiagTempMode(mode) {
    switch (mode) {
        case "Group":
            document.getElementById("div_Finding").style.display = "none";
            document.getElementById("AddFrom_Finding").innerText = "";
            document.getElementById("div_Impression").style.display = "none";
            document.getElementById("AddFrom_Impression").innerText = "";
            break;
        case "Content":
            var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
            document.getElementById("div_Finding").style.display = "";
            document.getElementById("AddFrom_Finding").innerText = form.GetField("Finding");
            document.getElementById("div_Impression").style.display = "";
            document.getElementById("AddFrom_Impression").innerText = form.GetField("Impression");
            break;
    }
}

function SaveDiagTempFromReport(ele) {
    if (!m_SelectedNode) {
        alert("请先选择一个父级词条节点！");
        return;
    }
    var tempName = document.getElementById("AddFrom_TempName").value;
    if (!tempName) {
        alert("请输入词条名称！");
        return;
    }

    var data = {};
    if (m_IsUpdateMode) {
        data.ParentDiagTempID = m_SelectedNode.ParentDiagTempID;
        data.ReportDiagTempID = m_SelectedNode.ReportDiagTempID;
    } else {
        data.ParentDiagTempID = document.getElementById("AddFrom_ParentNodeID").innerText;
    }
    data.ReportDiagTempName = tempName;
    data.IsPublic = false;
    data.Finding = document.getElementById("AddFrom_Finding").innerText;
    data.Impression = document.getElementById("AddFrom_Impression").innerText;

    var param = {};
    param.command = "SaveDiagTempFromReport";
    param.field = param.condFields = "SaveDiagTempFromReport_" + Math.random();
    param.conv = "StaticValueConv('" + data.toJSONString() + "')";
    usercommit(ele, param);

    document.getElementById("AddFrom_TempName").value = "";
    ShowOrHide_Div_AddFrom(false);
}

function DeleteDiagTempFromReport(ele) {
    if (!m_SelectedNode) {
        alert("请先选择一个待删除词条！");
        return;
    }

    if (confirm("是否要删除选中的词条模板？")) {
        var param = {};
        param.command = "DeleteDiagTempFromReport";
        param.field = param.condFields = "DeleteDiagTempFromReport_" + Math.random();
        param.conv = "StaticValueConv('" + m_SelectedNode.ReportDiagTempID + "')";
        usercommit(ele, param);
    }
}

function ReloadDiagTemplateListConv() {
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!val) return;
            switch (val.ErrorCode) {
                case "0000":
                    var form = formCallCenter.GetFormByID(window.FormIDs.DiagTempForm);
                    if (m_SelectedNode) {
                        form.requestData("DiagTemplateList", [false, m_SelectedNode.ParentDiagTempID]);
                    } else {
                        form.requestData("DiagTemplateList", [false, null]);
                    }
                    break;
                default:
                    alert(val.Message);
                    break;
            }
        }
    }(this);
    this.oo(new Form_SingleValueConv());
}
/*******************结束：以报告内容创建词条模板*******************/