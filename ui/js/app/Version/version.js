var QueryForm = function () {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default: self.SetField(title, args);
                    break;
            }
        };
    } (this);
}
var init = function (pageName) {

    var queryForm = new QueryForm();
    queryForm.oo(new IdentifiedForm(document.body));
    var titles = {
       
        // "NotifyTitle":"NotifyTitle",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "AddExamRequest": "AddExamRequest",
        "LoadReport": "LoadReport",
        "LoadImage": "LoadImage",
        "Version": "Version",
        "FormBounds": "FormBounds"


    };
    for (var t in titles) {
        queryForm.SetTitle(t, titles[t]);
    }

    formCallCenter.RegisterForm(window.FormIDs.VersionModule, queryForm);
    var resize = function () {
        var divForm = document.getElementById("divForm");
        if (divForm) commit(divForm);
    }

    window.onresize = function () {
        setTimeout(resize, 100);
    }
    window.onresize();

 
    // document.oncontextmenu = function () { return false; }
}
