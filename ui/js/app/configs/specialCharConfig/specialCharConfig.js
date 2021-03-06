function init() {
    this.SetColumnHeadInfo();
    BoolPublicFieldInit();
    var specialCharConfigform = new SpecialCharConfigForm();
    specialCharConfigform.oo(new IdentifiedForm(document.body));
    var titles = {
        "SpecialCharRecords": "SpecialCharRecords",
        "SelectedChar": "SelectedChar",

        "NewSpecialChar": "NewSpecialChar",
        "SaveSpecialChar": "SaveSpecialChar",
        "DeleteSpecialChar": "DeleteSpecialChar",

        "BoolPublic": "BoolPublic",

        "CharContent": "CharContent",
        "OwnerUserCode": "OwnerUserCode",

        "UserName": "UserName",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        specialCharConfigform.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.SpecialCharConfigModule, specialCharConfigform);
    

    document.oncontextmenu = function () { return false; }
}

function SpecialCharConfigForm() {
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
    data.push("CharContent:字符");
    data.push("OwnerUserCode:用户");
    //data.push("DisplayNO:显示顺序:100");

    var ele = document.getElementById("SpecialCharRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "CharContent");
}


function BoolPublicFieldInit() {

    var ele = document.getElementById("BoolPublic");
    var cs = undefined;
    if (ele._cs) {
        cs = ele._cs;
    }
    else {
        cs = new CustomSelect(ele);
    }

    cs.config({ itemCssText: "line-height:30px;cursor: pointer;", multSelect: false });

    cs.loadData([{ "code": true, "name": "公有" }, { "code": false, "name": "私有"}], "name");

    cs.onitemselect = function () { changeFieldValue(ele); }

    ele._cs = cs;

}
