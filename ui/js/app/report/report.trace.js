var init = function () {
    var reportTraceForm = new ReportTraceForm();
    reportTraceForm.oo(new IdentifiedForm(document.body));

    var titles = {
        KeyGuid: "KeyGuid",
        ExamRequestID: "ExamRequestID",
        ReportTraceList: "ReportTraceList",
        FindingBase: "FindingBase",
        FindingTrace: "FindingTrace",
        ImpressionBase: "FindingBase",
        ImpressionTrace: "ImpressionTrace",

        PatientName: "PatientName",
        SexList: "SexList",
        CurrSexCode: "CurrSexCode",
        PatientAge: "PatientAge",
        AgeUnitList: "AgeUnitList",
        CurrAgeUnitCode: "CurrAgeUnitCode",
        ApplicationDeptList: "ApplicationDeptList",
        CurrApplicationDept: "CurrApplicationDept",
        ApplicationDoctorList: "ApplicationDoctorList",
        CurrApplicationDoctor: "CurrApplicationDoctor",
        ModalityList: "ModalityList",
        CurrModalityCode: "CurrModalityCode",
        Finding: "Finding",
        Impression: "Impression",
        BePositive: "BePositive",
        CriticalFlagList: "CriticalFlagList",
        CurrCriticalFlagCode: "CurrCriticalFlagCode",
        ICD10List: "ICD10List",
        CurrICD10Code: "CurrICD10Code",
        ReportUserList: "ReportUserList",
        CurrReportUserCode: "CurrReportUserCode",
        ReviewUserList: "ReviewUserList",
        CurrReviewUserCode: "CurrReviewUserCode",
        ReportTime: "ReportTime",
        ReviewTime: "ReviewTime",
        ItemUIDList: "ItemUIDList",

        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };

    for (var t in titles) {
        reportTraceForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportTraceModule, reportTraceForm);
}

var ReportTraceForm = function () {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                case "IsPositive":
                    var txt = "未知";
                    if (args == "true") txt = "阴性";
                    else if (args == "false") txt = "阴性";
                    self.SetField(title, [txt]);
                    break;
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);
}

//lml-ok
function SearchTableViewConv(params, style) {
    TableViewConv.apply(this, arguments);
    this.DrawRow = function (t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.onclick = function () {
            table.__currData = r;
            changeFieldValue(table);
        }
    }
}

function DifferenecConv() {
    Form_ListValueConv.apply(this);
    this.SetValue = function (ele, val) {
        if (val[0]) {
            var ref = val[0]["Ref"];
            var base = val[0]["Base"];

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = ref;
            ref = tempDiv.innerText;
            tempDiv.innerHTML = base;
            base = tempDiv.innerText;
            var r = new StringComparer(ref, base).GetComparedInfo;
            var txt = "";
            for (var i = 0; i < r.length; i++) {
                if (r[i].Type == "CompareResultTypes_Matched") {
                    txt = txt + r[i].Char;
                } else if (r[i].Type == "CompareResultTypes_Removed") {
                    txt = txt + "<span style='color: Red'><del>" + r[i].Char + "</del></span>";
                } else if (r[i].Type == "CompareResultTypes_Added") {
                    txt = txt + "<span style='color: Green'>" + r[i].Char + "</span>";
                }
            }
            ele.innerHTML = txt;
        }
        else {
            ele.innerHTML = "";
        }
    }
}