function init() {
    this.SetColumnHeadInfo();
    var devicePropertyConfigForm = new DevicePropertyConfigForm();
    devicePropertyConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "OperateUserCode": "OperateUserCode",

        "SelectedDeviceID": "SelectedDeviceID",
        "DevicePropertyResult": "DevicePropertyResult",
        "DeviceTypeList": "DeviceTypeList",
        "DeviceTypeCode": "DeviceTypeCode",
        "DeviceList": "DeviceList",

        "DeviceID": "DeviceID",
        "DeviceModel": "DeviceModel",
        "LanguageCode": "LanguageCode",
        "DeviceRoom": "DeviceRoom",
        "DeviceManufacturer": "DeviceManufacturer",

        "DeleteDeviceProperty": "DeleteDeviceProperty",
        "NewDeviceProperty": "NewDeviceProperty",
        "SaveDeviceProperty": "SaveDeviceProperty",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        devicePropertyConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.DevicePropertyConfigModule, devicePropertyConfigForm);
}

function DevicePropertyConfigForm() {
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
    data.push("DeviceModel:装置型号");
    data.push("LanguageCode:语言标识码");
    data.push("DeviceRoom:装置所处房间");
    data.push("DeviceManufacturer:装置厂商");

    var ele = document.getElementById("DevicePropertyResult");
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