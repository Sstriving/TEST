function init() {
    SetColumnHeadInfo();

    var deptDoctorMappingConfigForm = new DeptDoctorMappingConfigForm();
    deptDoctorMappingConfigForm.oo(new IdentifiedForm(document.body));

    var titles = {
        "DeptList": "DeptList",
        "SelectedDeptID": "SelectedDeptID",
        "DoctorListOfDept": "DoctorListOfDept",
        "SelectedDoctorID": "SelectedDoctorID",
        "SearchDoctorList": "SearchDoctorList",
        "SearchDoctorID": "SearchDoctorID",
        "DoctorID": "DoctorID",
        "DoctorName": "DoctorName",
        "InputCode": "InputCode",
        "Remark": "Remark",
        "DisplayNO": "DisplayNO",

        "RemoveDoctor": "RemoveDoctor",
        "Clear": "Clear",
        "OK": "OK",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        deptDoctorMappingConfigForm.SetTitle(t, titles[t]);
    }

    formCallCenter.RegisterForm(window.FormIDs.DeptDoctorMappingConfigModule, deptDoctorMappingConfigForm);
    
}
function DeptDoctorMappingConfigForm() {
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
    var data = [];
    //Name,Description,Width(可空)
    data.push("DoctorID:医师编号");
    data.push("DoctorName:医师名称");
    data.push("InputCode:输入码");
    data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("DoctorListOfDept");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "DoctorID");
}