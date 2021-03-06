function init() {
    SetColumnHeadInfo();

    var userRoleMappingConfigModule = new UserRoleMappingConfigModule();
    userRoleMappingConfigModule.oo(new IdentifiedForm(document.body));
    var titles = {
        "RoleList": "RoleList",
        "SelectedRoleID": "SelectedRoleID",
        "UserListOfRole": "UserListOfRole",
        "SelectedUserID": "SelectedUserID",
        "SearchUserList": "SearchUserList",
        "SearchUserID": "SearchUserID",
        "UserCode": "UserCode",
        "UserName": "UserName",
        "CreateTime": "CreateTime",
        "Remark": "Remark",
        "DisplayNO": "DisplayNO",
        "RemoveUser": "RemoveUser",
        "OK": "OK",
        "Clear": "Clear",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        userRoleMappingConfigModule.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.UserRoleMappingConfigModule, userRoleMappingConfigModule);
    
}
function UserRoleMappingConfigModule() {
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
    data.push("UserCode:用户编号");
    data.push("UserName:用户名称");
    data.push("CreateTime:创建时间");
    data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("UserListOfRole");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "UserCode");
}