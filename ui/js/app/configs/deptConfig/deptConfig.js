function init() {
    this.SetColumnHeadInfo();
    var deptConfigForm = new DeptConfigForm();
    deptConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "DeptRecords": "DeptRecords",
        "SelectedPKID": "SelectedPKID",

        "NewDept": "NewDept",
        "SaveDept": "SaveDept",
        "DeleteDept": "DeleteDept",

        "DeptID": "DeptID",
        "DeptName": "DeptName",
        "InputCode": "InputCode",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "FrozenDeptList": "FrozenDeptList",
        "ActiveDeptList": "ActiveDeptList",
        "ActiveDept": "ActiveDept",


        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        deptConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.DeptConfigModule, deptConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function DeptConfigForm() {
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
  //  data.push("DeptID:申请科室编号");
    data.push("DeptName:申请科室名称");
    data.push("InputCode:输入码");
  //  data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("DeptRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "DeptID");
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