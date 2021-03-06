function init() {
    SetColumnHeadInfo();
    var userPermissionMappingConfigForm = new UserPermissionMappingConfigForm();
    userPermissionMappingConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "UserRecords": "UserRecords",
        "PermissionRecords": "PermissionRecords",
        "UserPermissionMappingRecords": "UserPermissionMappingRecords",
        "PermissionCode": "PermissionCode",
        "OperateUserCode": "OperateUserCode",
        "SelectedUserCode": "SelectedUserCode",
        "Save": "Save",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        userPermissionMappingConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.UserPermissionMappingConfigModule, userPermissionMappingConfigForm);
    //获取个人用户权限
    showUserPermission();
    showRowStyle();
}

function UserPermissionMappingConfigForm() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);
}

//显示用户所拥有的权限
function showUserPermission() {
    var userPermissionCodeList = "";
    var form = formCallCenter.GetFormByID(window.FormIDs.UserPermissionMappingConfigModule);
    var list = form.GetField("UserPermissionMappingRecords");

    for (var i = 1; i < list.length; i++) {
        userPermissionCodeList += list[i].PermissionCode + ",";
    }
    setTimeout(function() {
        var permissionCheck = document.getElementsByName("permissionCheck");
        for (var i = 0; i < AllPermissionCode.length; i++) {
            var Row = permissionCheck[i].parentNode.parentNode.parentNode;
            if (userPermissionCodeList.indexOf(AllPermissionCode[i]) != -1) {
                permissionCheck[i].checked = true;
                Row.style.backgroundColor = "#58c4a0";
            } else {
                permissionCheck[i].checked = false;
                Row.style.backgroundColor = "#E0E0E0";
            }
        }
    }, 10);
}
//全选
function SelectAll() {
    var permissionCheck = document.getElementsByName("permissionCheck");
    for (var i = 0; i < permissionCheck.length; i++) {
        if (permissionCheck[i].getAttribute("type") == "checkbox") {
            var selected = permissionCheck[i].checked;
            var Row = permissionCheck[i].parentNode.parentNode.parentNode;
            if (selected === false) {
                permissionCheck[i].checked = true;
                Row.style.backgroundColor = "#58c4a0";
            }
        }
    }
}
//反选
function SelectConverse() {
    var permissionCheck = document.getElementsByName("permissionCheck");
    for (var i = 0; i < permissionCheck.length; i++) {
        if (permissionCheck[i].getAttribute("type") == "checkbox") {
            var selected = permissionCheck[i].checked;
            var Row = permissionCheck[i].parentNode.parentNode.parentNode;
            permissionCheck[i].checked = !selected;
            Row.style.backgroundColor = permissionCheck[i].checked ? "#58c4a0" : "#E0E0E0";
        }
    }
}

//选中每行时页面显示样式
function showRowStyle() {
    setTimeout(function() {
        var checkBox = document.getElementsByName("permissionCheck");
        for (var i = 0; i < checkBox.length; i++) {
            (function(i) {
                checkBox[i].parentNode.parentNode.parentNode.onclick = function(event) {
                    if (window.event.srcElement.type != "checkbox") {
                        checkBox[i].checked = !checkBox[i].checked;
                    }
                    this.style.backgroundColor = checkBox[i].checked ? "#58c4a0" : "#E0E0E0";
                };
            })(i);
        }
    }, 10)
}

function SetColumnHeadInfo() {
    var data = [];
    //Name,Description,Width(可空)
    data.push("PermissionCode:是否拥有该项权限");
    data.push("PermissionName:权限名称");
    data.push("Remark:备注:100");
    data.push("DisplayNO:显示顺序");
    data.push("PermissionCode:权限唯一标识码");

    var ele = document.getElementById("UserPermissionMappingRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "PermissionCode");
}
//保存权限更改
function Save(ele) {
    var data = new Array();
    var checkBox = document.getElementsByName("permissionCheck");
    for (var i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked == true) {
            data.push(checkBox[i].parentElement.getAttribute("TITLE"));
        }
    }
    var param = {};
    param.command = "Save";
    param.field = param.condFields = "Save_" + Math.random();
    param.conv = "StaticValueConv('" + data.toJSONString() + "')";
    usercommit(ele, param);
    showUserPermission();
}
//用户更改
function SelectUser() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        setTimeout(function() {
            showUserPermission();
        }, 10)
    }
}

function ShowMessageConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        var message = document.getElementById("message");
        message.innerHTML = val.Message;
        message.style.display = "block";
        setTimeout(function() {
            message.style.display = "none";
        }, 2000);
    }
}