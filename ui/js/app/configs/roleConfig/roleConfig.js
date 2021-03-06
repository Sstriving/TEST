function init() {
    this.SetColumnHeadInfo();
    var roleConfigForm = new RoleConfigForm();
    roleConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "RoleRecords": "RoleRecords",
        "SelectedPKID": "SelectedPKID",

        "NewRole": "NewRole",
        "SaveRole": "SaveRole",
        "DeleteRole": "DeleteRole",
        "ActiveRole": "ActiveRole",
        "FrozenRoleList": "FrozenRoleList",
        "ActivedRoleList": "ActivedRoleList",

        "RoleName": "RoleName",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        roleConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.RoleConfigModule, roleConfigForm);
    
    document.oncontextmenu = function () { return false; }
   }

   function RoleConfigForm() {
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
  //  data.push("RoleID:角色ID");
    data.push("RoleName:角色名称");
  //  data.push("DisplayNO:显示顺序:100");

    var ele = document.getElementById("RoleRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "RoleID");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigRoleID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenRoleID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}