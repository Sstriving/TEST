function init() {
    SetColumnHeadInfo();
    var schematicImageConfigConfigForm = new SchematicImageConfigConfigForm();
    schematicImageConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "SchematicImageRecords": "SchematicImageRecords",
        "SelectedPKCode": "SelectedPKCode",
        "ExamTypeList": "ExamTypeList",
        "ExamTypeID": "ExamTypeID",
        "SchematicImageUrl": "SchematicImageUrl",
        "NewSchematicImage": "NewSchematicImage",
        "SaveSchematicImage": "SaveSchematicImage",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        schematicImageConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.SchematicImageModule, schematicImageConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function SchematicImageConfigConfigForm() {
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
    data.push("SchematicImageUrl:文件路径");
    document.getElementById("SchematicImageRecords").setAttribute("displaymember", data.join(","));
    document.getElementById("SchematicImageRecords").setAttribute("valuemember", "ExamTypeID");
}

function ImageConv() {
    this.GetUIValue = function (root) { }
    this.ApplyValue = function (ele, val) {

        var span = document.getElementById("spot");
        if (ele.children.length == 0) {
            if (val != null) {
                ele.setAttribute('src', val);
            }

        }
    }
    this.oo(new Form_SingleValueConv());
}
