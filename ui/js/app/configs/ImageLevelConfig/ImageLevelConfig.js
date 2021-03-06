function init() {
    SetColumnHeadInfo();
    var imageLevelConfigConfigForm = new ImageLevelConfigConfigForm();
    imageLevelConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "SelectedPKCode": "SelectedPKCode",
        "ImageLevelList": "ImageLevelList",
        "ImageLevelID": "ImageLevelID",
        "ImageLevelName": "ImageLevelName",
        "DisplayNO": "DisplayNO",
        "NewImageLevel": "NewImageLevel",
        "SaveImageLevel": "SaveImageLevel",
        "FrozenImageLevelList": "FrozenImageLevelList",
        "DeleteImageLevel": "DeleteImageLevel",
        "ActivedImageLevelList": "ActivedImageLevelList",
        "ActiveImageLevel": "ActiveImageLevel",
        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        imageLevelConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ImageLevelConfigModule, imageLevelConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function ImageLevelConfigConfigForm() {
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


function IsDisabledOnClick(frozenDivID, activeDivID) {
    $("#" + frozenDivID).hide();
    $("#" + activeDivID).show();
    $Array(document.getElementById("TableConfigImageLevel").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenImageLevelID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}


function SetColumnHeadInfo() {
    var data = new Array();
    data.push("ImageLevelName:等级名称");
    document.getElementById("ImageLevelList").setAttribute("displaymember", data.join(","));
    document.getElementById("ImageLevelList").setAttribute("valuemember", "ImageLevelID");
}
