function init() {
    var userPasswordConfigForm = new UserPasswordConfigForm();
    userPasswordConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {       
        "SavePassword": "SavePassword",
        "oldPassword": "oldPassword",
        "AffirmPassword": "AffirmPassword",
        "NewPassword": "NewPassword",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        userPasswordConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.UserPasswordConfigModule, userPasswordConfigForm);
    

    document.oncontextmenu = function () { return false; }
}

function UserPasswordConfigForm() {
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



