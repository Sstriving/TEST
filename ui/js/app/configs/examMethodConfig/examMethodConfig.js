function init() {
    this.SetColumnHeadInfo();
    var examMethodConfigForm = new ExamMethodConfigForm();
    examMethodConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ExamMethodRecords": "ExamMethodRecords",
        "SelectedPKID": "SelectedPKID",

        "NewExamMethod": "NewExamMethod",
        "SaveExamMethod": "SaveExamMethod",
        "DeleteExamMethod": "DeleteExamMethod",

        "ExamMethodID": "ExamMethodID",
        "ExamMethodName": "ExamMethodName",
        "InputCode": "InputCode",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "FrozenExamMethodList": "FrozenExamMethodList",
        "ActiveExamMethodList": "ActiveExamMethodList",
        "ActiveExamMethod":"ActiveExamMethod",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        examMethodConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ExamMethodConfigModule, examMethodConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function ExamMethodConfigForm() {
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
	//data.push("ExamMethodID:检查方法编号");
    data.push("ExamMethodName:检查方法名称");
	data.push("InputCode:输入码");
   // data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("ExamMethodRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "ExamMethodID");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigDeptrID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDoctorID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}