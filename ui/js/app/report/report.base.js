function init() {
    var reportForm = new ReportForm();
    reportForm.oo(new IdentifiedForm(document.body));

    var titles = {
        ExamRequestReportList: "ExamRequestReportList",
        CurrReportExamRequestID: "CurrReportExamRequestID",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        TopFrontGroupList: "TopFrontGroupList",
        TopFrontGroup: "TopFrontGroup",
        LoadReportCompare:"LoadReportCompare",
        LoadReportTrace:"LoadReportTrace",
        LoadReportFollowUp:"LoadReportFollowUp"
    };

    for (var t in titles) {
        reportForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportModule, reportForm);

    reportForm.SetField("TopFrontGroupList",
        [{ 'GroupCode': 'GroupReport', 'GroupName': '报告' },
         { 'GroupCode': 'GroupReportCompare', 'GroupName': '报告对比' },
         { 'GroupCode': 'GroupReportTrace', 'GroupName': '报告痕迹'},
         { 'GroupCode': 'GroupReportFollowUp', 'GroupName': '报告随访'}]);
    reportForm.SetField("TopFrontGroup", ["GroupReport"]);
}
var m_LastFrontGroup = null;
var ReportForm = function () {
    var AttachUIDListCache = [];
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                case "CurrModalityCode": 
                    self.SetField(title, args);
                    formCallCenter.RaiseEvent('UnfoldDiagTempFolder', [args[0]]);
                    break;
                case "ItemBodyPart":
                    self.SetField(title, args);
                    if (args[0].BodyPart) {
                        formCallCenter.RaiseEvent('UnfoldDiagTempFolder', [args[0].BodyPart.BodyPartName]);
                    }
                    break;
                case "CurrReportExamRequestID":
                    self.SetField(title, args);
                    LoadReportFrontGroup(m_LastFrontGroup);
                    break;
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);

    this.Report = function (self) {
        return function (title, value) {
            switch (title) {
                case "ExamRequestReportList":
                    self.Response(title, [{ "ExamRequestID": "1", "ReportDesc": "男" }, { "ExamRequestID": "2", "ReportDesc": "女" }, { "ExamRequestID": "3", "ReportDesc": "未定义"}]);
                    break;
                case "CurrReportExamRequestID":
                    self.Response(title, [value]);
                    break;
            }
        }
    } (this);
    this.Request = function (self) {
        return function (title, args) {
            switch (title) {
                case "ExamRequestReportList":
                    self.Response(title, [{ "ExamRequestID": "1", "ReportDesc": "男" }, { "ExamRequestID": "2", "ReportDesc": "女" }, { "ExamRequestID": "3", "ReportDesc": "未定义"}]);
                    break;
                case "CurrReportExamRequestID":
                    self.Response(title, args);
                    break;
                default:
                    break;
            }
        }
    } (this);
}

//可关闭页签Conv-ok
function ClosableTabPageListConv(style) {
    TabPageListConv.apply(this, [style]);
    this.DrawItem = function (self) {
        return function (parent, item, list, index) {
            Element(item).setText(list[index][parent.getAttribute("displayMember")]);

            var span = document.createElement("span");
            span.innerHTML = "&nbsp;&nbsp;×&nbsp;&nbsp;";
            span.title = "关闭该页";
            span.onmouseover = function () {
                span.style.cssText = "color:red;";
                span.innerHTML = "&nbsp;&nbsp;×&nbsp;&nbsp;";
            }
            span.onmouseout = function () {
                span.style.cssText = "";
                span.innerHTML = "&nbsp;&nbsp;×&nbsp;&nbsp;";
            }
            item.appendChild(span);

            span.onclick = function (ui) {
                return function () {
                    Event.stopPropagation();

                    var examRequestID = list[index][parent.getAttribute("valuemember")];
                    var reportExamRequestIDField = "ReportExamRequestID_" + examRequestID;

                    var param1 = { "command": "CloseReport", "condFields": reportExamRequestIDField + ",CloseReport_Request" };
                    var param2 = { "field": reportExamRequestIDField, "conv": "StaticValueConv(" + examRequestID + ")" };
                    useroperate(ui, commit, param1, param2);

                    var tmp = self.GetValue(ui.parentNode);
                    if (!tmp || tmp.length < 1) {
                        var p = {
                            "field": "arg_NavigateModule_SearchModule",
                            "command": "NotifyTitle",
                            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_SearchModule",
                            "conv": "StaticValueConv('SearchModule')"
                        }
                        usercommit(ui, p);
                    }
                }
            } (parent);
            return true;
        }
    } (this);
}

function ReportFrontGroupConv(groupName) {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (self) {
        return function (ele, val) {
            if(val == groupName){
                m_LastFrontGroup = groupName;
                LoadReportFrontGroup(groupName);
            }
            ele.style.display = val == groupName ? "" : "none";
        }
    } (this);
}

function LoadReportFrontGroup(groupName){
    var ele = document.getElementById('TopFrontGroup');
    switch(groupName){
        case "GroupReportCompare":
            usercommit(ele, { "command": "LoadReportCompare" });
            break;
        case "GroupReportTrace":
            usercommit(ele, { "command": "LoadReportTrace" });
            break;
        case "GroupReportFollowUp":
            usercommit(ele, { "command": "LoadReportFollowUp" });
            break;
    }
}