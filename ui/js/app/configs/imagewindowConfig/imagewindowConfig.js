function init() {
    this.SetColumnHeadInfo();
    var imageWindowConfigForm = new ImageWindowConfigForm();
    imageWindowConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ImageWindowRecords": "ImageWindowRecords",
        "SelectedPKID": "SelectedPKID",

        "NewImageWindow": "NewImageWindow",
        "SaveImageWindow": "SaveImageWindow",
        "DeleteImageWindow": "DeleteImageWindow",

        "ID": "ID",
        "WindowName": "WindowName",
        "WindowCenter": "WindowCenter",
        "WindowWidth": "WindowWidth",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        imageWindowConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ImageWindowConfigModule, imageWindowConfigForm);
    
    document.oncontextmenu = function () { return false; }
}
function ImageWindowConfigForm() {
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
    //  data.push("ID:''");
    data.push("WindowName:名称");
    data.push("WindowWidth:窗宽");
    data.push("WindowCenter:窗位");
   

    var ele = document.getElementById("ImageWindowRecordsid");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "ID");
}

