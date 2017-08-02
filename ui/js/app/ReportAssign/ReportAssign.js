var ReportAssignForm = function() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);
}

var init = function() {
    var reportAssignForm = new ReportAssignForm();
    reportAssignForm.oo(new IdentifiedForm(document.body));
    var titles = {
        LoginUserCode: "LoginUserCode",
        ExamRequestIDFilter: "ExamRequestIDFilter",
        ExamRequestTimeRange: "ExamRequestTimeRange",
        ExamDateTimeRange: "ExamDateTimeRange",
        PatientNameFilter: "PatientNameFilter",
        PatientNameSpellFilter: "PatientNameSpellFilter",
        PatientIDFilter: "PatientIDFilter",
        SexList: "SexList",
        SexCodeFilters: "SexCodeFilters",
        PatientAgeRange: "PatientAgeRange",
        AgeUnitList: "AgeUnitList",
        AgeUnitCodeFilter: "AgeUnitCodeFilter",
        PatientBirthDateRange: "PatientBirthDateRange",
        OutPatientNOFilter: "OutPatientNOFilter",
        InHospitalNOFilter: "InHospitalNOFilter",
        AreaList: "AreaList",
        AreaCodeFilters: "AreaCodeFilters",
        WardList: "WardList",
        WardIDFilters: "WardIDFilters",
        RoomNOFilter: "RoomNOFilter",
        BedNOFilter: "BedNOFilter",
        RegisterUserList: "RegisterUserList",
        RegisterUserCodeFilters: "RegisterUserCodeFilters",
        ExamUserList: "ExamUserList",
        ExamUserCodeFilters: "ExamUserCodeFilters",
        ExamStatusList: "ExamStatusList",
        ExamStatusCodeFilters: "ExamStatusCodeFilters",
        ApplicationDeptList: "ApplicationDeptList",
        ApplicationDeptIDFilters: "ApplicationDeptIDFilters",
        ApplicationDoctorList: "ApplicationDoctorList",
        ApplicationDoctorIDFilters: "ApplicationDoctorIDFilters",
        ExamTypeList: "ExamTypeList",
        ExamTypeIDFilters: "ExamTypeIDFilters",
        MedicalHistoryList: "MedicalHistoryList",
        MedicalHistoryFilter: "MedicalHistoryFilter",
        ComplainList: "ComplainList",
        ComplainFilter: "ComplainFilter",
        MailingAddressFilter: "MailingAddressFilter",
        ZipCodeFilter: "ZipCodeFilter",
        TelephoneFilter: "TelephoneFilter",
        PatientIDCardFilter: "PatientIDCardFilter",
        PatientSourceList: "PatientSourceList",
        PatientSourceCodeFilters: "PatientSourceCodeFilters",
        ModalityList: "ModalityList",
        ModalityCodeFilters: "ModalityCodeFilters",
        EquipmentList: "EquipmentList",
        EquipmentIDFilters: "EquipmentIDFilters",
        BodyPartList: "BodyPartList",
        BodyPartIDFilters: "BodyPartIDFilters",
        ExamItemList: "ExamItemList",
        ExamItemIDFilters: "ExamItemIDFilters",
        ExamMethodList: "ExamMethodList",
        ExamMethodIDFilters: "ExamMethodIDFilters",
        EquipmentModelList: "EquipmentModelList",
        EquipmentModelFilters: "EquipmentModelFilters",
        UserList: "UserList",
        CurrAssignUserCode: "CurrAssignUserCode",
        IsAssignedFilter: "IsAssignedFilter",
        AssignerFilters: "AssignerFilters",
        AssignUserCodeFilters: "AssignUserCodeFilters",
        AssignDateTimeRange: "AssignDateTimeRange",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        Search: "Search",
        ReportAssign: "ReportAssign",
        SearchResultColumns: "SearchResultColumns",
        CurrExamRequestID: "CurrExamRequestID",
        SearchResultRows: "SearchResultRows",
        SearchResultPageInfo: "SearchResultPageInfo",
        ResetFilters: "ResetFilters",
        ResultRowsCount: "ResultRowsCount"
    };
    for (var t in titles) {
        reportAssignForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportAssignModule, reportAssignForm);

    window.autoQuery = function(e) {
        var func = function() {
            Event.Unregister(e, "mousemove", e.__delayExe);
            e.__delayExe = null;
            if (new ui(e).visible()) {
                var param = {
                    "command": "Search"
                };

                QueryRest('Today', null);
            } else {
                e.__delayExe = arguments.callee;
                Event.Register(e, "mousemove", e.__delayExe);
            }
        }
        func();
    }
    window.autoQuery(document.body);
    window.onkeydown = function() {
        if (Event().KeyCode() == EnterKeyCode) {
            document.getElementById("btnSearch").focus();
            usercommit(Event.Source(), { "command": "Search" });
        }
    }
    ResetExamStatus();
}

function ResetExamStatus() {
    var form = formCallCenter.GetFormByID("ReportAssignModule");
    form.SetField("ExamStatusCodeFilters", [
        ["Registered", "Exam", "Rejected"]
    ], true);
}

function QueryRest(obj, status) {
    var s = document.getElementById("btnSearch");
    var form = formCallCenter.GetFormByID("ReportAssignModule");

    SetQueryDate(obj, form);
    SetQueryStatus(status, form);

    usercommit(s, { "command": "Search" });
}

function SetQueryDate(obj, form) {
    if (obj) {
        var StartTime = new Date();
        var EndTime = new Date();
        if (obj == "Today")
            EndTime = new Date(EndTime.getTime() + 1 * 24 * 60 * 60 * 1000);
        if (obj == "Yesterday") {
            StartTime = new Date(StartTime.getTime() - 1 * 24 * 60 * 60 * 1000);
            EndTime = EndTime;
        }
        if (obj == "Week") {
            StartTime = new Date(StartTime.getTime() - 6 * 24 * 60 * 60 * 1000);
            EndTime = new Date(EndTime.getTime() + 1 * 24 * 60 * 60 * 1000);
        }

        StartTime = DataTimeFormat(StartTime);
        EndTime = DataTimeFormat(EndTime);

        form.SetField("ExamRequestTimeRange", [{
            'Start': StartTime,
            'End': EndTime
        }], "true");
    }
}

function SetQueryStatus(status, form) {
    if (status) {
        form.SetField("ExamStatusCodeFilters", [
            [status]
        ], true);
    }
}

function SearchResultPageInfoConv() {
    Form_SingleValueConv.apply(this);
    this.DecodeArguments = function(ele, args) {
        return args[0];
    }
    this.GetUIValue = function(ele) {
        if (ele.__pInfo) {
            return ele.__pInfo.toJSONString();
        } else {
            return ele.innerHTML;
        }
    }
    this.ApplyValue = function(ele, val) {
        ele.innerHTML = "";
        ele.__pInfo = {
            "PageIndex": val.PageIndex,
            "PageSize": val.PageSize,
            "TotalCount": val.TotalCount
        };
        if (ele.__pInfo) {
            //“首页”按钮
            var input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '首页');
            input.onclick = function(e) { return function() { PageJump(e, "first"); } }(ele);
            ele.appendChild(input);
            //“上一页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '上一页');
            input.onclick = function(e) { return function() { PageJump(e, "pre"); } }(ele);
            ele.appendChild(input);
            //“当前页/总页数”显示
            var span = document.createElement('span');
            span.setAttribute('class', 'xxx');
            span.setAttribute('style', 'float: left;');
            var totalPage = Math.ceil(ele.__pInfo.TotalCount / ele.__pInfo.PageSize);
            if (totalPage == 0) totalPage = 1;
            span.innerHTML = ele.__pInfo.PageIndex + "/" + totalPage;
            ele.appendChild(span);
            //“下一页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '下一页');
            input.onclick = function(e) { return function() { PageJump(e, "next"); } }(ele);
            ele.appendChild(input);
            //“尾页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '尾页');
            input.onclick = function(e) { return function() { PageJump(e, "last"); } }(ele);
            ele.appendChild(input);
            //“跳转页码”输入框
            input = document.createElement('input');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('id', 'PageJumpInput');
            input.style.width = "50px";
            input.value = "";
            ele.appendChild(input);
            //“跳转”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '跳转');
            input.onclick = function(e) {
                return function() {
                    var index = document.getElementById("PageJumpInput");
                    PageJump(e, "jump", index.value);
                }
            }(ele);
            ele.appendChild(input);
            //显示“页大小”信息
            span = document.createElement('span');
            span.setAttribute('class', 'xxx');
            span.setAttribute('style', 'float: left;');
            span.innerHTML = "每页：" + ele.__pInfo.PageSize + "条";
            ele.appendChild(span);
        }
    }
}

function PageJump(ele, code, index) {
    if (ele && ele.__pInfo) {
        var totalPage = Math.ceil(ele.__pInfo.TotalCount / ele.__pInfo.PageSize);
        switch (code) {
            case "first":
                index = 1;
                break;
            case "pre":
                index = ele.__pInfo.PageIndex - 1;
                if (index < 1) index = 1;
                break;
            case "next":
                index = ele.__pInfo.PageIndex + 1;
                if (index > totalPage) index = totalPage;
                break;
            case "last":
                index = totalPage;
                break;
            case "jump":
                if (isNaN(index)) index = 1;
                if (index < 1) index = 1;
                if (index > totalPage) index = totalPage;
                break;
        }
        var form = formCallCenter.GetFormByID("ReportAssignModule");
        form.SetField("SearchResultPageInfo", [{ "PageIndex": index, "PageSize": ele.__pInfo.PageSize }], true);
        usercommit(ele, { "command": "Search" });
    }
}

function selectPage(page) {
    if (page === null) ResetExamStatus();

    ResetSelectedItems();
    var selecttitle = document.getElementById("selecttitle");
    for (var i = 0; i < selecttitle.children.length; i++) {
        if (selecttitle.children[i].getAttribute("value") == page && selecttitle.children[i].getAttribute("type") == 'button') {
            selecttitle.children[i].className = "query-model-button-click";
        } else if (selecttitle.children[i].getAttribute("type") == 'button') {
            selecttitle.children[i].className = "query-model-button";
        }
    }
}

function SearchTableViewConv(params, style) {
    TableViewConv.apply(this, arguments);
    var formatRowCell = this.FormatRowCell;
    this.FormatRowCell = function(t, ri, ci, r, c) {
        switch (c.Name) {
            case "chkReport":
                return "选中";
            case "PatientSexName":
            case "PatientSex":
                switch (r[c.Name]) {
                    case "M":
                    case "m":
                    case "男":
                        return "男";
                    case "F":
                    case "f":
                    case "女":
                        return "女";
                    default:
                        return "未知";
                }
            case "PatientAge":
                switch (r["PatientAgeUnitCode"]) {
                    case "Y":
                    case "y":
                    case "岁":
                        return r[c.Name] + "岁";
                    case "M":
                    case "m":
                    case "月":
                        return r[c.Name] + "月";
                    case "W":
                    case "w":
                    case "周":
                        return r[c.Name] + "周";
                    case "D":
                    case "d":
                    case "天":
                    case "日":
                        return r[c.Name] + "日";
                    case "H":
                    case "h":
                    case "时":
                        return r[c.Name] + "时";
                    default:
                        return r[c.Name];
                }
            case "Finding":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "Impression":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "IsPositive":
                if (r[c.Name] != null) {
                    return r[c.Name] == true ? "阳性" : "阴性";
                } else {
                    return "待定";
                }
            case "Crisis":
                if (r[c.Name] != null) {
                    return r[c.Name] == true ? "危急" : "普通";
                } else {
                    return "普通";
                }
            case "PACSInstanceCount":
                if (r["UndefinedFields"] != null) {
                    var str = "<PACSInstanceCount>";
                    var start = r["UndefinedFields"].indexOf('<PACSInstanceCount>');
                    var end = r["UndefinedFields"].indexOf('</PACSInstanceCount>');
                    return start > -1 && start <= end ? r["UndefinedFields"].substring(start + str.length, end) : "-";
                } else {
                    return "-";
                }
            default:
                return formatRowCell(t, ri, ci, r, c);
        }
    }
    var styleRowCell = this.StyleRowCell;
    this.StyleRowCell = function(self) {
        return function(t, ri, ci, r, c, e) {
            var result = styleRowCell(t, ri, ci, r, c, e);
            result.rmvList[result.rmvList.length] = style.Examine;
            result.rmvList[result.rmvList.length] = style.Report;
            result.rmvList[result.rmvList.length] = style.Register;
            result.rmvList[result.rmvList.length] = style.Reject;
            switch (r["StatusName"]) {
                case "已审核":
                    result.addList[result.addList.length] = style.Examine;
                    break;
                case "已报告":
                    result.addList[result.addList.length] = style.Report;
                    break;
                case "已登记":
                    result.addList[result.addList.length] = style.Register;
                    break;
                case "已驳回":
                    result.addList[result.addList.length] = style.Reject;
                    break;
                case "已检查":
                    result.addList[result.addList.length] = style.Checked;
                    break;
                case "已打印":
                    result.addList[result.addList.length] = style.print;
                    break;
            }
            return result;
        }
    }(this);
    this.DrawHeaderCell = function(self) {
        return function(t, ri, ci, r, c, e) {
            var table = t.TableElement();
            switch (c.Name) {
                case "ExamRequestID":
                case "PatientID":
                case "ExamDateTime":
                case "ExamRequestTime":
                    e.onclick = function() {
                        table.__currSortType = table.__currSortType == "Asc" ? "Desc" : "Asc";
                        var sort = {
                            'SortField': c.Name,
                            'SortDirection': table.__currSortType
                        };

                        var columnld = "sort_ClomunID_" + ci;
                        var param = {
                            "command": "Search",
                            "field": columnld,
                            "condFields": columnld
                        };
                        param.conv = "StaticValueConv('" + sort.toJSONString() + "')";
                        usercommit(e, param);
                    }
                    break;
            }
        }
    }(this);
    this.DrawRow = function(t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.onclick = function() {
            table.__currData = r;
            changeFieldValue(table);
        }
    }
    var drawRowCell = this.DrawRowCell;
    this.DrawRowCell = function(t, ri, ci, r, c, e) {
        switch (c.Name) {
            case "chkReport":
                drawRowCell(t, ri, ci, r, c, e);
                e.innerHTML = "";
                var chk = e.ownerDocument.createElement("input");
                chk.setAttribute("type", "checkbox");
                chk.setAttribute("ExamRequestID", r.ExamRequestID);
                chk.setAttribute("IsAssigned", r.AssignerCode);
                chk.onchange = function(ele, item) {
                    return function() {
                        var erID = item.ExamRequestID;
                        if (ele.checked) {
                            AddSelectedList(erID);
                        } else {
                            RemoveSelectedList(erID);
                        }
                    }
                }(chk, r);
                chk.checked = m_SelectedFlag[r.ExamRequestID];
                e.appendChild(chk);
                return true;
            default:
                return drawRowCell(t, ri, ci, r, c, e);
        }
    }
}

var m_SelectedFlag = {};

var m_SelectedItems = new Array();

function ResetSelectedItems() {
    m_SelectedItems = new Array();
}

function AddSelectedList(item) {
    if (!m_SelectedItems) ResetSelectedItems();
    var flag = false;
    for (var i = 0; i < m_SelectedItems.length; i++) {
        if (m_SelectedItems[i] == item) {
            flag = true;
            break;
        }
    }
    if (!flag) {
        m_SelectedItems.push(item);
        m_SelectedFlag[item] = true;
    }
}

function RemoveSelectedList(item) {
    if (!m_SelectedItems) ResetSelectedItems();
    for (var i = 0; i < m_SelectedItems.length; i++) {
        if (m_SelectedItems[i] == item) {
            m_SelectedItems.splice(i, 1);
            delete m_SelectedFlag[item];
            return;
        }
    }
}

function SelectAll() {
    var items = document.getElementById("div").getElementsByTagName("input");
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute("type") == "checkbox") {
            var selected = items[i].checked;
            if (selected === false) {
                items[i].checked = true;
                var erID = items[i].getAttribute("ExamRequestID");
                AddSelectedList(erID);
            }
        }
    }
}

function UnselectAll() {
    var items = document.getElementById("div").getElementsByTagName("input");
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute("type") == "checkbox") {
            var selected = items[i].checked;
            if (selected) {
                items[i].checked = false;
                var erID = items[i].getAttribute("ExamRequestID");
                RemoveSelectedList(erID);
            }
        }
    }
}

function SelectConverse() {
    var items = document.getElementById("div").getElementsByTagName("input");
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute("type") == "checkbox") {
            var selected = items[i].checked;
            items[i].checked = !selected;
            var erID = items[i].getAttribute("ExamRequestID");
            if (selected)
                RemoveSelectedList(erID);
            else
                AddSelectedList(erID);
        }
    }
}

function FastQuery(ele, funcType) {
    var form = formCallCenter.GetFormByID("ReportAssignModule");
    switch (funcType) {
        case "未分配的检查":
            {
                form.SetField("ExamStatusCodeFilters", [
                    ["Registered", "Exam", "Rejected"]
                ], true);
                form.SetField("AssignerFilters", [null], true);
                form.SetField("AssignUserCodeFilters", [null], true);
                form.SetField("AssignDateTimeRange", [null], true);
                form.SetField("IsAssignedFilter", [false], true);
            }
            break;
        case "可重新分配的检查":
            {
                form.SetField("ExamStatusCodeFilters", [
                    ["Registered", "Exam", "Rejected"]
                ], true);
                form.SetField("IsAssignedFilter", [true], true);
            }
            break;
    }
    usercommit(ele, { "command": "Search" });
}

function ReportAssign(ele) {
    var form = formCallCenter.GetFormByID("ReportAssignModule");
    var currAssignUserCode = form.GetField("CurrAssignUserCode");
    if (!currAssignUserCode) {
        alert("请选择“待分配医生”");
        return;
    }
    if (!m_SelectedItems || m_SelectedItems.length == 0) {
        alert("请选择待分配的检查");
        return;
    }

    var assignUserName = "";
    var userList = form.GetField("UserList");
    for (var i = 0; i < userList.length; i++) {
        var item = userList[i];
        if (item.UserCode == currAssignUserCode) {
            assignUserName = item.UserName;
            break;
        }
    }

    var assignedItems = new Array();
    var items = document.getElementById("div").getElementsByTagName("input");
    for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute("type") == "checkbox") {
            if (items[i].checked) {
                var erID = items[i].getAttribute("ExamRequestID");
                var isAssigned = items[i].getAttribute("IsAssigned");
                if (isAssigned) {
                    assignedItems.push(erID);
                }
            }
        }
    }

    var confirmMsg = "是否确定将【" + m_SelectedItems.join(', ') + "】" + m_SelectedItems.length + "个检查分配给【" + assignUserName + "】医生？";
    if (assignedItems.length > 0) confirmMsg += "\r\n备注：其中【" + assignedItems.join(', ') + "】" + assignedItems.length + "个检查属于重新分配！";
    if (confirm(confirmMsg)) {
        var param = {};
        param.command = "ReportAssign";
        param.field = param.condFields = "cmd_ReportAssign";
        param.conv = "StaticValueConv([" + m_SelectedItems.join(',') + "])";
        usercommit(ele, param);
    }
}

function AfterReportAssignConv() {
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!val) return;
            switch (val.ErrorCode) {
                case "0000":
                    {
                        UnselectAll();
                        usercommit(ele, { "command": "Search" });
                    }
                    break;
            }
        }
    }(this);
    this.oo(new Form_SingleValueConv());
}