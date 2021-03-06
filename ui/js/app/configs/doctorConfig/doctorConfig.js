function init() {
    this.SetColumnHeadInfo();
    var doctorConfigForm = new DoctorConfigForm();
    doctorConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "DoctorRecords": "DoctorRecords",
        "SelectedPKID": "SelectedPKID",

        "NewDoctor": "NewDoctor",
        "SaveDoctor": "SaveDoctor",
        "DeleteDoctor": "DeleteDoctor",
        "ActiveDoctor": "ActiveDoctor",
        "FrozenDoctorList": "FrozenDoctorList",
        "ActiveDoctorList": "ActiveDoctorList",

        "DoctorName": "DoctorName",
        "InputCode": "InputCode",
        "Remark": "Remark",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        doctorConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.DoctorConfigModule, doctorConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function DoctorConfigForm() {
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
   // data.push("DoctorID:申请医师编号");
    data.push("DoctorName:申请医师名称");
    data.push("InputCode:输入码");
   // data.push("DisplayNO:显示顺序");
    data.push("Remark:备注:200");
    data.push("CreateTime:创建时间:180");

    var ele = document.getElementById("DoctorRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "DoctorID");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigDoctorID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDoctorID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}
