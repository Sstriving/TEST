function init() {
    SetColumnHeadInfo();    
    var schematicConfigConfigForm = new SchematicConfigConfigForm();
    schematicConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ReportLevelList": "ReportLevelList",
        "SelectedPKCode": "SelectedPKCode",
        "FrozenSchematicList": "FrozenSchematicList",
        "DeleteReportLevel": "DeleteReportLevel",
        "ActivedReportLevelList": "ActivedReportLevelList",
        "ActiveReportLevel": "ActiveReportLevel",
        "ReportLevelID": "ReportLevelID",
        "ReportLevelName": "ReportLevelName",
        "ReportLevelCode": "ReportLevelCode",
        "NewReportLevel": "NewReportLevel",
        "SaveReportLevel": "SaveReportLevel",
        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "ReportLevelCode": "ReportLevelCode",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        schematicConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportLevelConfigModule, schematicConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function SchematicConfigConfigForm() {
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
    data.push("ReportLevelCode:级别编号");
    data.push("ReportLevelName:级别名称");
    data.push("DisplayNO:序列");
    document.getElementById("ReportLevelList").setAttribute("displaymember", data.join(","));
    document.getElementById("ReportLevelList").setAttribute("valuemember", "ReportLevelCode");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    $("#" + frozenDivID).hide();
    $("#" + activeDivID).show();
    $Array(document.getElementById("TableReportLevel").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenSchematicID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}



function clearBody() {
    var span = document.getElementById("spot");
    span.innerHTML = "";

}
