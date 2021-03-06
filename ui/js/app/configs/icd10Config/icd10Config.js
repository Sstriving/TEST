function init() {
    this.SetColumnHeadInfo();
    var icd10ConfigForm = new ICD10ConfigForm();
    icd10ConfigForm.oo(new IdentifiedForm(document.body)); 
    var titles = {
        "ICD10Records": "ICD10Records",
        "SelectedPKName": "SelectedPKName",

        "NewICD10": "NewICD10",
        "SaveICD10": "SaveICD10",
        "DeleteICD10": "DeleteICD10",

        "DiseaseName": "DiseaseName",
        "ICD10": "ICD10",
        "AssistantCode": "AssistantCode",
        "Note": "Note",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        icd10ConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ICD10ConfigModule, icd10ConfigForm);
    
    document.oncontextmenu = function () { return false; }
   }

   function ICD10ConfigForm() {
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
    data.push("DiseaseName:疾病名称");
    data.push("ICD10:ICD10编码");
    data.push("AssistantCode:拼音助记码");
    data.push("Note:备注:210");

    var ele = document.getElementById("ICD10Records");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "ICD10");
}
