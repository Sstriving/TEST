function init() {
    var studySearchForm = new StudySearchForm();
    studySearchForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "SexList": "SexList",
        "SexCodeFilters": "SexCodeFilters",
        "ApplicationDeptList": "ApplicationDeptList",
        "ApplicationDeptIDFilters": "ApplicationDeptIDFilters",
        "ModalityList": "ModalityList",
        "ModalityCodeFilters": "ModalityCodeFilters",
        "PatientSourceList": "PatientSourceList",
        "PatientSourceCodeFilters": "PatientSourceCodeFilters",
        "ExamStatusList": "ExamStatusList",
        "ExamStatusCodeFilters": "ExamStatusCodeFilters",

        "StudyParameter": "StudyParameter",
        "StudyList": "StudyList",
        "CurrStudy": "CurrStudy",
        "StudyMatchStatusList": "StudyMatchStatusList",
        "CurrStudyMatchStatus": "CurrStudyMatchStatus",
        "LoadImage": "LoadImage",
        "Search": "Search",
        "ResetFilters": "ResetFilters",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "LoadStudy":"LoadStudy",
        "FastRegister": "FastRegister",
        "UpdateStudyInfo":"UpdateStudyInfo",
        "UserList": "UserList",
        "ChangeStudyOperator":"ChangeStudyOperator"
    };
    for (var t in titles) {
        studySearchForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ResourceUseSearchModule, studySearchForm);
    studySearchForm.SetField("ModalityCodeFilters", [["DX"]],true);
    studySearchForm.SetField("CurrStudyMatchStatus", [[false]],true);
    SetStartAndEndDate();
}

function StudySearchForm() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
   
                // case "CurrExamRequestID":
                //       self.Response("SearchResultRows", [{"ExamRequestID":"11","PatientName":"张三","PatientSex":"男","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"}]);
                //       break;
                default: self.SetField(title, args);
                break;
            }
        };
    }(this);

    this.Request = function(self) {
        return function(title, args) {
            switch (title) {
                case "ExamRequestIDFilter":
                    self.Response(title, [""]);
                    break;
                case "SexList":
                    self.Response(title, [{
                        "SexCode": "M",
                        "SexName": "男",
                        "DisplayNO": "0"
                    }, {
                        "SexCode": "F",
                        "SexName": "女",
                        "DisplayNO": "1"
                    }, {
                        "SexCode": "U",
                        "SexName": "未知",
                        "DisplayNO": "2"
                    }]);
                    break;
                case "SexCodeFilters":
                    self.Response(title, ['M', 'F']);
                    break;
                case "PatientSourceList":
                    self.Response(title, [{
                        'PatientSourceCode': 'InHospital',
                        'PatientSourceName': '住院'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }]);
                    break;
                case "PatientSourceCodeFilters":
                    self.Response(title, ['InHospital']);
                    break;
                case "ExamStatusList":
                    self.Response(title, [{
                        "StatusCode": "Registered",
                        "StatusName": "已登记",
                        "DisplayNO": "1"
                    }, {
                        "StatusCode": "Reported",
                        "StatusName": "已报告",
                        "DisplayNO": "2"
                    }]);
                    break;
                case "CheckedStatusCodeList":
                    self.Response(title, ["Registered", "Reported"]);
                    break;

                case "ApplicationDeptList":
                    self.Response(title, [{
                        "DeptID": "M",
                        "DeptName": "外科"
                    }, {
                        "DeptID": "F",
                        "DeptName": "内科"
                    }, {
                        "DeptID": "U",
                        "DeptName": "放射科"
                    }]);
                    break;

                case "ModalityList":
                    self.Response(title, [{
                        "ModalityCode": "M",
                        "ModalityName": "CT"
                    }, {
                        "ModalityCode": "F",
                        "ModalityName": "MR"
                    }, {
                        "ModalityCode": "U",
                        "ModalityName": "放2射科"
                    }]);
                    break;
                case "StudyParameter":
                    self.Response("StudyList", [{
                        "AccessionNum": "",
                        "ExamRequestID": 654599,
                        "BodyPartExam": "Application Form",
                        "EquipmentAETitle": "WRK01",
                        "ModalityCode": "US",
                        "PatientAge": "11Y",
                        "PatientBirthDate": "1999-12-30 00:00:00",
                        "PatientID": "4",
                        "PatientName": "ceshi04",
                        "PatientSexName": "男",
                        "SOPInstanceUIDList": "1.2.840.00012608.1.20151130141542.1.3.1.1",
                        "StudyDesc": "Application Form",
                        "StudyInstanceUID": "1.2.840.00012608.1.20151130141542.1.1",
                        "StudyTime": "2015-11-30 14:15:43"
                    }, {
                        "AccessionNum": "",
                        "ExamRequestID": 123,
                        "BodyPartExam": "Application",
                        "EquipmentAETitle": "WRK02",
                        "ModalityCode": "US",
                        "PatientAge": "21Y",
                        "PatientBirthDate": "1986-12-30 00:00:00",
                        "PatientID": "5",
                        "PatientName": "ceshi05",
                        "PatientSexName": "男",
                        "SOPInstanceUIDList": "11.2.840.00012608.1.20141130141542.1.1.1.2",
                        "StudyDesc": "Application Form",
                        "StudyInstanceUID": "11.2.840.00012608.1.20141130141542.1.2",
                        "StudyTime": "2014-11-10 14:15:43"
                    }]);
                    // self.Response("CurrExamRequestID", ["11"]);
                    break;
                case "MatchStudyList000":
                    //self.Response(title,[{"ExamRequestID":"120","PatientName":"张三11","PatientSex":"女","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"},{"ExamRequestID":"121","PatientName":"张三","PatientSex":"男","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"}]);
                    self.Response(title, [{
                        "StudyInstanceUID": "1.2.840.00012608.1.20151130141542.1.3",
                        "ExamRequestList": [{
                            "ExamRequestID": 654599,
                            "PatientID": "537389",
                            "PatientName": "ye",
                            "PatientNameSpell": "ye",
                            "PatientSexCode": "O",
                            "PatientSexName": "其他",
                            "PatientAge": 0,
                            "PatientAgeUnitCode": "Y",
                            "PatientAgeUnitName": "岁",
                            "PatientBirthDate": null,
                            "MailingAddress": "",
                            "ZipCode": "",
                            "Telephone": "",
                            "DeviceID": 1,
                            "DeviceName": "未定义",
                            "ModalityCode": "O",
                            "ModalityName": "未定义",
                            "BodyPartIDs": "1",
                            "BodyPartNames": "未定义",
                            "ExamItemIDs": "1",
                            "ExamItemNames": "未定义",
                            "ExamMethodIDs": "1",
                            "ExamMethodNames": "未定义",
                            "StatusCode": "Exam",
                            "StatusName": "已检查",
                            "ExamRequestTime": "2015-09-12 13:27:20",
                            "ExamDateTime": null,
                            "AccessionNO": "c0584c815508433aaadbe46b3380a631",
                            "PatientCardID": 654744,
                            "ReportID": null,
                            "PatientSourceCode": "O",
                            "PatientSourceName": "未定义",
                            "DeptDoctorMappingID": 11,
                            "DeptID": 1,
                            "DeptName": "未定义",
                            "DoctorID": 1,
                            "DoctorName": "未定义",
                            "RegisterUserCode": "1",
                            "RegisterUserName": "1",
                            "RoomNO": "",
                            "BedNO": "",
                            "InHospitalNO": "",
                            "OutHospitalNO": "",
                            "DoctorAdvice": "",
                            "ReportTime": null,
                            "Finding": null,
                            "Impression": null,
                            "IsPositive": null,
                            "ReportUserCode": null,
                            "ReportUserName": "",
                            "ReviewUserCode": null,
                            "ReviewUserName": "",
                            "ReviewTime": null,
                            "PatientIDCard": "",
                            "BirthAreaCode": "O",
                            "BirthAreaName": "未定义",
                            "PatientRemark": "",
                            "ExamRequestRemark": null,
                            "PrintUserCode": "",
                            "PrintUserName": "",
                            "PrintTime": null,
                            "ICD10": null,
                            "Crisis": null,
                            "StudyOperatorName": null,
                            "UndefinedFields": "<?xml version=\"1.0\" encoding=\"gb2312\"?>\r\n<file>\r\n  <PatientHeight />\r\n  <Money />\r\n</file>"
                        }, {
                            "ExamRequestID": 654593,
                            "PatientID": "537384",
                            "PatientName": "ssssss",
                            "PatientNameSpell": "ssssss",
                            "PatientSexCode": "O",
                            "PatientSexName": "其他",
                            "PatientAge": 0,
                            "PatientAgeUnitCode": "Y",
                            "PatientAgeUnitName": "岁",
                            "PatientBirthDate": null,
                            "MailingAddress": "",
                            "ZipCode": "",
                            "Telephone": "",
                            "DeviceID": 1,
                            "DeviceName": "未定义",
                            "ModalityCode": "O",
                            "ModalityName": "未定义",
                            "BodyPartIDs": "1",
                            "BodyPartNames": "未定义",
                            "ExamItemIDs": "1",
                            "ExamItemNames": "未定义",
                            "ExamMethodIDs": "1",
                            "ExamMethodNames": "未定义",
                            "StatusCode": "Reported",
                            "StatusName": "已报告",
                            "ExamRequestTime": "2015-08-19 15:33:25",
                            "ExamDateTime": null,
                            "AccessionNO": "937ef82c2794461aba7c12be0d3a7393",
                            "PatientCardID": 654738,
                            "ReportID": 359201,
                            "PatientSourceCode": "O",
                            "PatientSourceName": "未定义",
                            "DeptDoctorMappingID": 11,
                            "DeptID": 1,
                            "DeptName": "未定义",
                            "DoctorID": 1,
                            "DoctorName": "未定义",
                            "RegisterUserCode": "1",
                            "RegisterUserName": "1",
                            "RoomNO": "",
                            "BedNO": "",
                            "InHospitalNO": "",
                            "OutHospitalNO": "",
                            "DoctorAdvice": "",
                            "ReportTime": "2015-08-19 18:14:03",
                            "Finding": "没问题",
                            "Impression": "没问题",
                            "IsPositive": false,
                            "ReportUserCode": "1",
                            "ReportUserName": "1",
                            "ReviewUserCode": null,
                            "ReviewUserName": "",
                            "ReviewTime": null,
                            "PatientIDCard": "",
                            "BirthAreaCode": "O",
                            "BirthAreaName": "未定义",
                            "PatientRemark": "",
                            "ExamRequestRemark": null,
                            "PrintUserCode": "",
                            "PrintUserName": "",
                            "PrintTime": null,
                            "ICD10": null,
                            "Crisis": true,
                            "StudyOperatorName": null,
                            "UndefinedFields": null
                        }]
                    }]);
                    break;
                case "Clear":
                    alert(title);
                    break;
            }
        }
    }(this);

    this.Report = function(self) {
        return function(title, value) {
            switch (title) {
                case "SexCodeFilters":
                    self.Response("SexCodeFilters", [value]);
                    break;
                case "PatientSourceCodeFilters":
                    self.Response("PatientSourceCodeFilters", [value]);
                    break;
                case "CheckedStatusCodeList":
                    self.Response("CheckedStatusCodeList", [value]);
                    break;
                case "CurrLoadExamRequest":
                    self.Response("CurrLoadExamRequest", [{
                        "ExamRequestID": "120",
                        "PatientName": "张三11",
                        "PatientSex": "女",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "121",
                        "PatientName": "张三",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }]);
                    break;
                case "CurrStudy":
                    self.Response("CurrStudy", [value]);
                    // self.Response(title,[{"ExamRequestID":"120","PatientName":"张三11","PatientSex":"女","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"},{"ExamRequestID":"121","PatientName":"张三","PatientSex":"男","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"}]);
                    break;
            }
        }
    }(this);
}
function createMenu(r) {
    var menuContainer = document.getElementById('div');
    var menu = menuContainer.__menu__;
    if (!menu) {
        menu = menuContainer.__menu__ = new Menu(menuContainer);
        menu.ItemClick = clickMenu;
        menu.DrawItem = drawItem;
        var items = menu.Items();
        if (items.Count() == 0) {
            items.Add("修改用户");
            items.Add("修改技师");
            
        }
        menuContainer.onclick = menuContainer.onmousewheel = function () {
        
            menu.Fold();
        }
    }
    menu.Unfold();
}
function drawItem(parentMenu, itemMenu, total, index, ele) {
    // ele.style.color = "red";
    ele.style.cursor = "pointer";

    // ele.innerText = itemMenu.GetData() + "_ABD";
}


function clickMenu(parentMenu, itemMenu) {
    parentMenu.Fold();
    var data = itemMenu.GetData();
    if (data == "修改用户") {
        param = {
            "command": "LoadStudy",
            "condFields": "CurrStudy"
        };
        usercommit(Event.Source(), param);
        document.getElementById("LoadStudyList").style.display = "";
        document.getElementById("StudyUserList").style.display = "none";
    
    }
    if (data == "修改技师") {
        document.getElementById("LoadStudyList").style.display = "none";
        document.getElementById("StudyUserList").style.display = "";
    }
   
}
function SetStartAndEndDate(){
    var start = document.getElementById("ExamRequestTimeRangeStart");
    var end = document.getElementById("ExamRequestTimeRangeEnd");
    var StartTime = new Date();
    var EndTime = new Date();
    EndTime = new Date(EndTime.getTime() + 1 * 24 * 60 * 60 * 1000);
    StartTime = StartTime.getFullYear() + "-" + (StartTime.getMonth() + 1) + "-" + StartTime.getDate();
    EndTime = EndTime.getFullYear() + "-" + (EndTime.getMonth() + 1) + "-" + EndTime.getDate();
    start.value=StartTime;
    end.value=EndTime;
}

function TwoLevelTableViewConv(params, style) {
    TwoLevelTableViewConv_tmp.apply(this, arguments);
    var drawRowCommandCell = this.DrawRowCommandCell;
    this.DrawRow = function (t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.onclick = function () {
            var table = t.TableElement();
            table.__currData = r;
            changeFieldValue(table);
        }
        e.oncontextmenu = function () {
            table.__currData = r;
            changeFieldValue(table);
            createMenu(r);
            return false;
        }
    }
    this.DrawRowCommandCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            var table = t.TableElement();
            switch (c.Command) {
                case "LoadImage":
                    if (e.children.length == 0) {
                        var img = e.ownerDocument.createElement("img");
                        img.src = "../../../img/阅片.png";
                        img.title = "浏览图像";
                        e.appendChild(img);
                    }
                    e.onclick = function () {
                        table.__currData = r;
                        changeFieldValue(table);
                        var param = {
                            "command": c.Command
                        };
                        usercommit(e, param);
                    }
                    break;
                case "FastRegister":
                    if (e.children.length == 0) {
                        var img = e.ownerDocument.createElement("img");
                        img.src = "../../../img/补登.png";
                        img.title = "快速补登";
                        e.appendChild(img);
                    }

                    e.onclick = function () {
                        table.__currData = r;
                        changeFieldValue(table);
                        if (!r) return;
                        if (confirm("是否为该图像创建报告?\r\n\r\n患者：" + r.PatientName + "(" + r.PatientSexCode + ")")) {
                            var param = {
                                "command": c.Command
                            };
                            usercommit(e, param);
                        }
                    }
                    break;
                default:
                    drawRowCommandCell(t, ri, ci, r, c, e);
                    break;
            }
            
        }
    } (this);

    this.DrawSubRowCommandCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            switch (c.Command) {
                case "UnmatchExamRequest":
                    if (e.children.length == 0) {
                        var img = e.ownerDocument.createElement("img");
                        img.src = "../../../img/差号.png";
                        img.title = "解除匹配";
                        img.onmouseover = function () {
                            img.src = "../../../img/红色差号.png";
                        }
                        img.onmouseout = function () {
                            img.src = "../../../img/差号.png";
                        }
                        e.appendChild(img);
                    }
                    table = t.Parent.TableElement();
                    e.onclick = function () {
                        table.__currData = t.__data;
                        changeFieldValue(table);
                        if (confirm("是否删除该图像的报告?\r\n\r\n患者：" + r.PatientName + "(" + r.PatientSexCode + ")")) {
                            var param = {};
                            param.formID = self.SubViewProperties().subViewFormID;
                            param.field = param.condFields = "f_CurrSubViewField" + Math.random();
                            param.command = c.Command;
                            param.conv = "StaticValueConv(" + r[self.SubViewProperties().subViewValueMember].toJSONString() + ")";
                            usercommit(e, param);
                        }
                    }
                    break;
            }
        }
    } (this);
}


function LoadStudyConv() {

    style = { 'label': 'unselectedLabel',
        'text': 'unselectedText',
        'selectedLabel': 'selectedLabel',
        'selectedText': 'selectedText',
        'unselectedLabel': 'unselectedLabel',
        'unselectedText': 'unselectedText',
        'selectedItem': 'selectedItem',
        'unselectedItem': 'unselectedItem',
        'dropItem': 'dropItem',
        'dropText': 'dropText',
        'menu': 'menu',
        'first': 'firstDropItem',
        'middle': 'middleDropItem',
        'single': 'singleDropItem',
        'last': 'lastDropItem'
    };
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (self) {
        return function (ele, val) {
            ele.innerHTML = "";
            if(!val)return;
            
            var StudyInstanceUID = document.createElement("div");
            StudyInstanceUID.setAttribute("id", "StudyInstanceUID");
            StudyInstanceUID.innerHTML = val.StudyInstanceUID;
            StudyInstanceUID.style.cssText = "display:none;";

            var PatientNumber = document.createElement("span");
            PatientNumber.setAttribute("class", "inputItemLabel");
            PatientNumber.style.cssText = " margin-left:10px;";
            PatientNumber.innerText = "患者编号:"
            var InputNumber = document.createElement("input");
            InputNumber.setAttribute("id", "PatientNumber");
            InputNumber.setAttribute("class", "inputItemText input-width");
            InputNumber.type = "text";
            InputNumber.value = val.PatientID;

            var PatientName = document.createElement("span");
            PatientName.setAttribute("class", "inputItemLabel");
            PatientName.style.cssText = " margin-left:10px;";
            PatientName.innerText = "患者姓名："
            var InputPatientName = document.createElement("input");
            InputPatientName.setAttribute("id", "PatientName");
            InputPatientName.setAttribute("class", "inputItemText input-width");
            InputPatientName.type = "text";
            InputPatientName.value = val.PatientName;

            var PatientSex = document.createElement("span");
            PatientSex.setAttribute("class", "inputItemLabel");
            PatientSex.style.cssText = " margin-left:10px;";
            PatientSex.innerText = "患者性别:";
            var PatientSexDrop = document.createElement("div");

            PatientSexDrop.style.cssText = "display:inline-block;margin-top:13px;";
            PatientSexDrop.setAttribute("id", "PatientSex");
            PatientSexDrop.setAttribute("field", "SexList");
            PatientSexDrop.setAttribute("itemField", "SexCodeFilte");
            PatientSexDrop.setAttribute("valueMember", "SexCode");
            PatientSexDrop.setAttribute("displayMember", "SexName");
            PatientSexDrop.setAttribute("itemFrontField", "true");
            PatientSexDrop.setAttribute("conv", "FilterableListConv(" + style.toJSONString() + "," + "null" + "," + "true)");

            var PatientBirthDate = document.createElement("span");
            PatientBirthDate.setAttribute("class", "inputItemLabel");
            PatientBirthDate.style.cssText = "margin-left:10px;";
            PatientBirthDate.innerText = "出生日期 :";
            var InputPatientBirthDate = document.createElement("input");
            InputPatientBirthDate.style.cssText = "margin-left:10px;";
            InputPatientBirthDate.setAttribute("class", "inputItemText input-width");
            InputPatientBirthDate.setAttribute("id", "PatientBirthDate");
            InputPatientBirthDate.type = "text";
            InputPatientBirthDate.value = val.PatientBirthDate
            InputPatientBirthDate.setAttribute("onclick", "WdatePicker({onpicked:function(){}, dateFmt:'yyyy-MM-dd HH:mm:ss', readOnly: true,qsEnabled:false,autoUpdateOnChanged:true});"); ;

            var PatientAge = document.createElement("span");
            PatientAge.setAttribute("class", "inputItemLabel");
            PatientAge.style.cssText = "margin-left:10px;";
            PatientAge.innerText = "年      龄:";
            var InputPatientAge = document.createElement("input");
            InputPatientAge.setAttribute("class", "inputItemText input-width");
            InputPatientAge.setAttribute("id", "PatientAge");
            InputPatientAge.type = "text";
            InputPatientAge.value = val.PatientAge;

            var btnUpdate = document.createElement("input");
            btnUpdate.type = "button";
            btnUpdate.value = "修改";
            btnUpdate.style.cssText = "margin-left:100px;margin-top:10px;";
            btnUpdate.setAttribute("command", "UpdateStudyInfo");
            btnUpdate.setAttribute("class", "button");
            btnUpdate.setAttribute("onclick", "commit(this)");
            btnUpdate.setAttribute("condFields", "StudyInfo");

            var btnClear = document.createElement("input");
            btnClear.type = "button";
            btnClear.value = "取消";
            btnClear.style.cssText = "margin-left:10px;margin-top:10px;";
            btnClear.setAttribute("class", "button flatButton");
            btnClear.setAttribute("onclick", "document.getElementById('LoadStudyList').style.display = 'none'");

            ele.appendChild(StudyInstanceUID);
            ele.appendChild(PatientNumber);
            ele.appendChild(InputNumber);
            ele.appendChild(PatientName);
            ele.appendChild(InputPatientName);
            ele.appendChild(PatientSex);
            ele.appendChild(PatientSexDrop);
            ele.appendChild(PatientBirthDate);
            ele.appendChild(InputPatientBirthDate);
            ele.appendChild(PatientAge);
            ele.appendChild(InputPatientAge);
            ele.appendChild(btnUpdate);
            ele.appendChild(btnClear);
            setTimeout(function () {
                var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseSearchModule);
                form.SetField("SexCodeFilte", [val.PatientSexCode]);
            }, 10);
        }
    } (this);
}


function StudyInfoConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function (ele) {
        document.getElementById("LoadStudyList").style.display = "none";
        var StudyInstanceUID = document.getElementById("StudyInstanceUID").innerHTML;
        var PatientID = document.getElementById("PatientNumber").value;
        var PatientName = document.getElementById("PatientName").value;
        var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseSearchModule);
        var SexCodeFilte = form.GetField('SexCodeFilte');
        var PatientBirthDate = document.getElementById("PatientBirthDate").value;
        var PatientAge = document.getElementById("PatientAge").value;
        return { "StudyInstanceUID": StudyInstanceUID, "PatientID": PatientID, "PatientName": PatientName, "PatientSex": SexCodeFilte, "PatientBirthDate": PatientBirthDate, "PatientAge": PatientAge}.toJSONString();
    }

}
function ChangeStudy() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function (ele) {
        document.getElementById("StudyUserList").style.display = "none";
        var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseSearchModule);
        var CurrStudy = form.GetField('CurrStudy');
        var UserCodeFilters = form.GetField('UserCodeFilters');
        form.Response("UserCodeFilters", [""]);
        return { "StudyInstanceUID": CurrStudy, "OperatorName": UserCodeFilters}.toJSONString();
    }
}