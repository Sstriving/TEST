function init() {
    var headerForm = new HeaderForm();
    headerForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "ModuleList": "ModuleList",
        "ModuleName": "ModuleName"
    };
    for (var t in titles) {
        headerForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.HeaderModule, headerForm);

}
function HeaderForm() {
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
function ModuleListConv() {
    this.ApplyValue = function (self) {
        return function (ele, val) {
            ele.innerHTML = "";
            if (!val || val.length < 1) return;
            var table = document.createElement("TABLE");
            table.style.width = "100%";
            var tbody = document.createElement("TBODY");
            var tr = document.createElement("TR");
            var width = parseInt(100 / val.length, 10) + "%";
            for (var i = 0; i < val.length; i++) {
                var td = document.createElement("TD");
                td.style.height = "64px";
                td.style.textAlign = "center";
                td.style.color = "#e4e4e4";
                td.style.fontWeight = "bold";
                self.InheritProperties(ele, td, val, i);
                td.value = val[i].Name;
                td.innerHTML = val[i].Description;
                td.onclick = function () {
                    var param = { "command": "NotifyTitle",
                        "field": "arg_NavigateModule_ReportModule",
                        "conv": "StaticValueConv(\"ReportModule\")",
                        "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule"
                    };
                    usercommit(param);

                    changeFieldValue(this);
                };
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            table.appendChild(tbody);
            ele.appendChild(table);
        } 
    } (this);
    this.oo(new Form_ListValueConv());
}
function ModuleNameConv() {
    this.ApplyValue = function (self) {
        return function (ele, val) {
            if (val == ele.value) {
                ele.style.backgroundColor = "#0080ce";
                ele.style.cursor = "default";
                ele.style.color = "white";
            }
            else {
                ele.style.backgroundColor = "#e4e4e4";
                ele.style.cursor = "pointer";
                ele.style.color = "black";
            }
        }
    } (this);
    this.oo(new Form_SingleValueConv());
}