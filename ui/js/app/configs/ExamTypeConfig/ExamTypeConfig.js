function init() {
    SetColumnHeadInfo();
    var examTypeConfigConfigForm = new ExamTypeConfigConfigForm();
    examTypeConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ExamTypeRecords": "ExamTypeRecords",
        "SelectedPKCode": "SelectedPKCode",
        "ExamTypeID":"ExamTypeID",
        "ExamTypeName":"ExamTypeName",
        "FrozenExamTypeList": "FrozenExamTypeList",
        "DeleteExamType": "DeleteExamType",
        "ActivedExamTypeList": "ActivedExamTypeList",
        "ActiveExamType": "ActiveExamType",
        "NewExamType": "NewExamType",
        "SaveExamType": "SaveExamType",
        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        examTypeConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ExamTypeModule, examTypeConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function ExamTypeConfigConfigForm() {
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

function IsDisabledOnClick(frozenDivID, activeDivID) {
    $("#" + frozenDivID).hide();
    $("#" + activeDivID).show();
    $Array(document.getElementById("TableConfigExamType").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenExamTypeID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}

function SetColumnHeadInfo() {
    var data = new Array();
    data.push("ExamTypeName:检查类型");
    document.getElementById("ExamTypeRecords").setAttribute("displaymember", data.join(","));
    document.getElementById("ExamTypeRecords").setAttribute("valuemember", "ExamTypeID");
}


