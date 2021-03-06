function init() {
    this.SetColumnHeadInfo();
    var bodyPartConfigForm = new BodyPartConfigForm();
    bodyPartConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "BodyPartRecords": "BodyPartRecords",
        "SelectedPKID": "SelectedPKID",

        "NewBodyPart": "NewBodyPart",
        "SaveBodyPart": "SaveBodyPart",
        "DeleteBodyPart": "DeleteBodyPart",

        "BodyPartID": "BodyPartID",
        "BodyPartName": "BodyPartName",
        "InputCode": "InputCode",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "ActiveBodyPartList": "ActiveBodyPartList",
        "ActiveBodyPart": "ActiveBodyPart",
        "FrozenBodyPartList":"FrozenBodyPartList",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        bodyPartConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.BodyPartConfigModule, bodyPartConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function BodyPartConfigForm() {
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
  //  data.push("BodyPartID:检查部位编号");
    data.push("BodyPartName:检查部位名称");
    data.push("InputCode:输入码");
   // data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("BodyPartRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "BodyPartID");
}

function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigBodyPartID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenDoctorID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}