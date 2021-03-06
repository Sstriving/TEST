function init() {
    var loginForm = new LoginForm();
    loginForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "Version": "Version",
        "UserCodeList": "UserCodeList",
        "UserCodeFilters":"UserCodeFilters",
        "Password": "Password",
        "Login": "Login", "cmd_ExitApplication": "cmd_ExitApplication",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        loginForm.SetTitle(t,titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.LoginModule, loginForm);
//  formCallCenter.init();
}

function LoginForm() {
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
                  case "UserCode":
                      self.Response(title, ["UserCode"]);
                      break;
                  case "UserCodeList":
                  		self.Response(title,[{"UserCode":1,"UserName":"男"},{"UserCode":2,"UserName":"女"},{"UserCode":3,"UserName":"未定义"}]);
                  	break;
                  	
                  	default:
                  	break;
//                	
              }
        }
    } (this);

}

function LoginUserCodeConv() {

    WritableListConv.apply(this, arguments);
    var valueNotObject= arguments[3];
    var style = arguments[0];
    if (!style) style = { 'menu': 'menu', 'dropItem': 'dropItem', 'single': 'single', 'first': 'first', 'middle': 'middle', 'last': 'last' };
    var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "WritableListConv.WritableListItemConv1(" + itemStyle + ")", true);
        inheritProperties_base(srcElement, desElement);
    }
    WritableListConv.WritableListItemConv1 = function (style) {
        Form_SingleValueConv.apply(this);
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var menu = ele.__menu;
            var items = menu.Items();
            var curr = null;
            Element(ele).setText(valueNotObject ? val : (val ? val[displayMember] : ""));
            for (var i = 0; i < items.Count(); i++) {
                var d = items.ItemAt(i).GetData();
                if (d[valueMember] == ele.value) {
                    curr = d;
                    Element(ele).setText(d[displayMember]);
                    break;
                }
            }
            ele.__currData = curr;
        }
        this.GetUIValue = function (self) {
            return function (ele) {
                var valueMember = ele.getAttribute("valueMember");
                if (!valueMember) valueMember = "__valueMember";
                var displayMember = ele.getAttribute("displayMember");
                if (!displayMember) displayMember = "__displayMember";
                if (valueNotObject) {
                    return ele.__currData ? ele.__currData[displayMember].replace(/(^\s*)|(\s*$)/g, "") : null;
                }
                else {
                    var value = ele.__currData;
                    if (!value) {
                        value = {};
                        value[valueMember] = null;
                        value[displayMember] = ele.value;
                    }
                    return value.replace(/(^\s*)|(\s*$)/g, "").toJSONString();
                }
            }
        } (this);
    }

}