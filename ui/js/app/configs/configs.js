function initConfigModule() {
    var configForm = new ConfigForm();
    configForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ConfigPageList": "ConfigPageList",
        "CurrConfigPage": "CurrConfigPage",
        "ClientBounds": "ClientBounds",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        configForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ConfigsModule, configForm);
}

function minWindow() {
    var param = {
        "command": "NotifyTitle",
        "field": "arg_MinWindow",
        "condFields": "arg_MinWindow,f_NotifyDataType,arg_MinWindow",
        "conv": "StaticValueConv(\"MinWindow\")"
    };
    usercommit(Event.Source(), param);
}

function ConfigForm() {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);

     this.Request = function (self) {
        return function (title, args) {
            switch (title) {
                case "ExamRequestIDFilter":
                    self.Response(title, [""]);
                    break;
                    case "ConfigPageList":
                    self.Response(title, [{"Name":"UserConfig","Description":"用户配置"},{"Name":"UserPasswordConfig","Description":"修改密码"}]);
                    break;
                case "CurrConfigPage":
                    self.Response(title, [{"Name":"UserConfig","Description":"用户配置"}]);
                    break;
                case "Clear":
                    alert(title);
                    break;
            }
        }
    } (this);

    this.Report = function (self) {
        return function (title, value) {
            switch (title) {
               case "ExamRequestTimeRange":
                    self.Response(title, [value]);
                    break;
                case "CurrConfigPage":
                    self.Response("CurrConfigPage", [{"Name":"UserConfig","Description":"用户配置"}]);
                    break;
                case "PatientSourceCodeFilters":
                    self.Response("PatientSourceCodeFilters", [value]);
                    break;
                case "CheckedStatusCodeList":
                    self.Response("CheckedStatusCodeList", [value]);
                    break;
                case "CheckedBodyPartIDList":
                    self.Response("CheckedBodyPartIDList", [value]);
                    break;
                case "ReportUserList":
                    self.Response("ReportUserList", [value]);
                    break;
                case "ReportUserCode":
                    self.Response("ReportUserCode", [value]);
                    break;
                case "ReviewUserList":
                    self.Response("ReviewUserList", [value]);
                    break;
                case "ReviewUserCode":
                    self.Response("ReviewUserCode", [value]);
                    break;
                case "CurrExamRequestID":
                    self.Response("CurrExamRequestID", [value]);
                    break;
            }
        }
    } (this);
}
