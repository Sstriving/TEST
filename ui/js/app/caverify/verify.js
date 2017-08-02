var CAVerifyForm = function() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);

    this.Request = function(self) {
        return function(title, args) {
            switch (title) {              
                   default:break;
            }
        }
    }(this);

    this.Report = function(self) {
        return function(title, value) {
            switch (title) {
                default:break;
            }
        }
    }(this);
}

var init = function () {
    var caVerifyForm = new CAVerifyForm();
    caVerifyForm.oo(new IdentifiedForm(document.body));
    var titles = {       
	    "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
		"SignInfoList":"SignInfoList",
		"CASerach":"CASerach",
		"SelectedSignInfo":"SelectedSignInfo",
		"SignOrignContent":"SignOrignContent",
		"SignValue":"SignValue",
		"HashValue":"HashValue",
		"Stamp":"Stamp",
		"ReportorSignImage":"ReportorSignImage",
		"ReviewSignImage":"ReviewSignImage",
		"SignVerify":"SignVerify",
		"StampVerify":"StampVerify",
		"SignVerifyResult":"SignVerifyResult",
		"StampVerifyResult":"StampVerifyResult",
		"Condition_ExamRequestID":"Condition_ExamRequestID",
		"Condition_HashValue":"Condition_HashValue",
		"ClearCondition":"ClearCondition"
    };
    for (var t in titles) {
        caVerifyForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.CAVerifyModule, caVerifyForm);
}

function doSearch(ele){
	var param = {};
	param.formID = window.FormIDs.CAVerifyModule;
	param.field = param.condFields = "f_CANO" + Math.random();
	param.command = ele.getAttribute("command");
	var examRequestID=null;
	var hashValue=null;
	var e = document.getElementById("examRequestInput");
	if(e) examRequestID = e.value;
	e = document.getElementById("hashInput");
	if(e) hashValue = e.value;
	param.conv = "StaticValueConv(["+examRequestID+",'"+hashValue+"'])";
	usercommit(ele, param);
}

function clearInput(){
	var ele = document.getElementById("examRequestInput");
	if(ele) ele.value = "";
	ele = document.getElementById("hashInput");
	if(ele) ele.value = "";
}