function init() {
    this.SetColumnHeadInfo();
    var deviceConfigForm = new DeviceConfigForm();
    deviceConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "SelectedDeviceID": "SelectedDeviceID",
        "DeviceResult": "DeviceResult",
        "DeviceID": "DeviceID",
        "DeleteDevice": "DeleteDevice",
        "DeviceTypeCode": "DeviceTypeCode",
        "DeviceName": "DeviceName",
        "AETitle": "AETitle",
        "ModalityCode": "ModalityCode",
        "DeviceIP": "DeviceIP",
        "DevicePort": "DevicePort",
        "DeviceTypeList": "DeviceTypeList",
        "ModalityList": "ModalityList",
        "SavedDevice": "SavedDevice",
        "NewDevice": "NewDevice",
        "IsModalityVisible": "IsModalityVisible",
        "ActiveDevice": "ActiveDevice",
        "FrozenDeviceList": "FrozenDeviceList",
        "ActivedDeviceList": "ActivedDeviceList",
        "OpenCallConfigExe": "OpenCallConfigExe",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        deviceConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.DeviceConfigModule, deviceConfigForm);
    
   }

   function DeviceConfigForm() {
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
    data.push("DeviceID:装置ID");
    data.push("DeviceName:装置名称");
    data.push("DeviceTypeName:装置类型");
    data.push("AETitle:装置AETitle");
    data.push("ModalityName:装置影像类型");
    data.push("DeviceIP:装置IP:100");
    data.push("DevicePort:装置端口");
  //  data.push("DisplayNO:显示顺序:100");

    var ele = document.getElementById("DeviceResult");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "DeviceID");
}

function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigDeviceID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDeviceID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
    $Array(document.getElementById("TableConfigDeviceID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDeviceID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }
    });
    $Array(document.getElementById("TableConfigDeviceID").getElementsByTagName("div")).forEach(function (item, i) {
        if (frozenDivID == "frozenDeviceID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }
    });
}




