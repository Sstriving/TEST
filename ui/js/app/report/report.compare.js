function init() {
    var reportcompareForm = new ReportCompareForm();
    reportcompareForm.oo(new IdentifiedForm(document.body));
    var titles = {
        BaseExamRequestID: "BaseExamRequestID",
        SelectedExamRequestID: "SelectedExamRequestID",
        CompareHistoryList: "CompareHistoryList",

        PatientNameFilter: "PatientNameFilter",
        SearchHistoryRecords: "SearchHistoryRecords",
        CurrentHistoryRecords: "CurrentHistoryRecords",

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
		Add2ImageCompare: "Add2ImageCompare",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        reportcompareForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportCompareModule, reportcompareForm);
}
function ReportCompareForm() {
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

//lml-ok
function SearchTableViewConv(params, style) {
    TableViewConv.apply(this, arguments);
    this.DrawRow = function (t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.onclick = function () {
            table.__currData = r;
            changeFieldValue(table);
        }
        e.oncontextmenu = function () {
            table.__currData = r;
            changeFieldValue(table);
            createMenu(r);
            return false;
        }
    }
}

function createMenu(r) {
    var menuContainer = document.getElementById('div');
    var menu = menuContainer.__menu__;
    if (!menu) {
        menu = menuContainer.__menu__ = new Menu(menuContainer);
        menu.ItemClick = clickMenu;
        menu.DrawItem = drawItem;
        var items = menu.Items();
        if (items.Count() == 0) {
            items.Add("加入图像对比");
        }
        menuContainer.onclick = menuContainer.onmousewheel = function () {
            menu.Fold();
        }
    }
    menu.Unfold();
}
function drawItem(parentMenu, itemMenu, total, index, ele) {
    // ele.style.color = "red";
    ele.style.cursor = "pointer";

    // ele.innerText = itemMenu.GetData() + "_ABD";
}
function clickMenu(parentMenu, itemMenu) {
    parentMenu.Fold();
    var data = itemMenu.GetData();
    if (data == "加入图像对比") {
        var param = {
            "command": "Add2ImageCompare",
            "condFields": "SelectedExamRequestID"
        };
        usercommit(Event.Source(), param);
    } 
}


function HistoryExamCountConv(){
    Form_ListValueConv.apply(this, arguments);
    this.ApplyValue = function (ele, val) {
        if(val && val.length){
            ele.innerHTML = (val.length == 0) ? 0 : val.length - 1;
        }
    }
}