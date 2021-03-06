function init() {
    SetColumnHeadInfo();

    var rolePermissionMappingConfigForm = new RolePermissionMappingConfigForm();
    rolePermissionMappingConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "RolePermissionMappingRecords": "RolePermissionMappingRecords",
        "RoleRecords": "RoleRecords",
        "PermissionRecords": "PermissionRecords",
        "RoleID": "RoleID",
        "SelectedRoleID": "SelectedRoleID",
        "SelectedPermissionCode": "SelectedPermissionCode",
        "SelectedPermissionRow": "SelectedPermissionRow",
        "PermissionCode": "PermissionCode",
        "PermissionName": "PermissionName",
        "Remark": "Remark",
        "DisplayNO": "DisplayNO",
        "RemovePermission": "RemovePermission",
        "Save": "Save",
        "Clear": "Clear",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        rolePermissionMappingConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.RolePermissionMappingConfigModule, rolePermissionMappingConfigForm);
    
}
function RolePermissionMappingConfigForm() {
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
    data.push("PermissionCode:权限唯一标识码");
    data.push("PermissionName:权限名称");
    data.push("Remark:备注:100");
    data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("RolePermissionMappingRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "PermissionCode");
}