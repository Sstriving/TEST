function init() {
    this.SetColumnHeadInfo();
    var examItemConfigForm = new ExamItemConfigForm();
    examItemConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ExamItemRecords": "ExamItemRecords",
        "SelectedPKID": "SelectedPKID",

        "NewExamItem": "NewExamItem",
        "SaveExamItem": "SaveExamItem",
        "DeleteExamItem": "DeleteExamItem",

        "ExamItemID": "ExamItemID",
        "ExamItemName": "ExamItemName",
        "InputCode": "InputCode",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "ActiveExamItemList": "ActiveExamItemList",
        "ActiveExamItem": "ActiveExamItem",
        "FrozenExamItemList":"FrozenExamItemList",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        examItemConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ExamItemConfigModule, examItemConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function ExamItemConfigForm() {
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
  //  data.push("ExamItemID:检查项目编号");
    data.push("ExamItemName:检查项目名称");
    data.push("InputCode:输入码");
   // data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("ExamItemRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "ExamItemID");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigExamItemID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDoctorID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}