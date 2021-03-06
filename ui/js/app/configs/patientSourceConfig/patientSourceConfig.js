function init() {
    this.SetColumnHeadInfo();
    var patientSourceConfigForm = new PatientSourceConfigForm();
    patientSourceConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "PatientSourceRecords": "PatientSourceRecords",
        "SelectedPKCode": "SelectedPKCode",

        "NewPatientSource": "NewPatientSource",
        "SavePatientSource": "SavePatientSource",
        "DeletePatientSource": "DeletePatientSource",
        "ActivePatientSource": "ActivePatientSource",
        "FrozenPatientSourceList": "FrozenPatientSourceList",
        "ActivedPatientSourceList": "ActivedPatientSourceList",

        "PatientSourceCode": "PatientSourceCode",
        "PatientSourceName": "PatientSourceName",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        patientSourceConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.PatientSourceConfigModule, patientSourceConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function PatientSourceConfigForm() {
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
    data.push("PatientSourceCode:患者来源代码");
    data.push("PatientSourceName:患者来源名称");
    // data.push("DisplayNO:显示顺序:100");

    var ele = document.getElementById("PatientSourceRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "PatientSourceCode");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigPatientSource").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenPatientSourceID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}



