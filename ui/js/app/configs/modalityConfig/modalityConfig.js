function init() {
    this.SetColumnHeadInfo();
    var modalityConfigForm = new ModalityConfigForm();
    modalityConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "OperateUserCode": "OperateUserCode",
        "ModalityRecords": "ModalityRecords",
        "SelectedPKCode": "SelectedPKCode",
                
        "NewModality": "NewModality",
        "SaveModality": "SaveModality",
        "FrozenModality": "FrozenModality",
        "ActiveModality": "ActiveModality",
        
        "FrozenModalityList": "FrozenModalityList",
        "ActiveModalityList": "ActiveModalityList",

        "ModalityCode": "ModalityCode",
        "ModalityName": "ModalityName",
        "GroupCode": "GroupCode",
        "GroupCodeList": "GroupCodeList",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        modalityConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ModalityConfigModule, modalityConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function ModalityConfigForm() {
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
    data.push("ModalityCode:影像类型代码");
    data.push("ModalityName:影像类型名称");
    data.push("GroupCode:影像类型分组");

    var ele = document.getElementById("ModalityRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "ModalityCode");
}

function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigModalityid").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenModalityID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}

