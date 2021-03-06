function init() {
    this.SetColumnHeadInfo();
    var nationConfigConfigForm = new NationConfigConfigForm();
    nationConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "NationRecords": "NationRecords",
        "SelectedPKCode": "SelectedPKCode",

        "NewNation": "NewNation",
        "SaveNation": "SaveNation",
        "DeleteNation": "DeleteNation",
        "ActivedNationList": "ActivedNationList",
        "FrozenNationList": "FrozenNationList",
        "ActiveNation": "ActiveNation",

        "NationalityName": "NationalityName",
        "NationalityCode": "NationalityCode",
        "InputCode": "InputCode",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        nationConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.NationConfigModule, nationConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function NationConfigConfigForm() {
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
    data.push("NationalityCode:民族代码");
    data.push("NationalityName:民族名称");
    data.push("InputCode:输入码");
    document.getElementById("NationRecords").setAttribute("displaymember", data.join(","));
    //$("#NationRecords").attr("displaymember", data.join(","));
    //$("#NationRecords").attr("valuemember", "NationalityCode");
    document.getElementById("NationRecords").setAttribute("valuemember", "NationalityCode");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    $("#" + frozenDivID).hide();
    $("#" + activeDivID).show();
    $Array(document.getElementById("TableConfigNation").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenNationID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}



