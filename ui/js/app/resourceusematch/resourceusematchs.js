function init() {
    var studyMatchForm = new StudyMatchForm();
    studyMatchForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "MatchStudy": "MatchStudy",
        "UnmatchStudy": "UnmatchStudy",
        "UnmatchExamRequest": "UnmatchExamRequest",
        "MatchExamRequestList": "MatchExamRequestList",
        "MatchStudyList": "MatchStudyList",
        "EquipmentList": "EquipmentList",
        "EnterEquipment": "EnterEquipment",
        "ExitEquipment": "ExitEquipment",
        "UsingEquipmentIDs":"UsingEquipmentIDs",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        studyMatchForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ResourceUseMatchModule, studyMatchForm);

   
}

function StudyMatchForm() {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);

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
                        "StudyInstanceUID": "1.2.840.00012608.1.20151130141542.1.3",
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
                        "SOPInstanceUIDList": "1.2.840.00012608.1.20141130141542.1.1.1.1",
                        "StudyDesc": "Application Form",
                        "StudyInstanceUID": "1.2.840.00012608.1.20141130141542.1.1",
                        "StudyTime": "2014-11-30 14:15:43"
                    }]);
                    // self.Response("CurrExamRequestID", ["11"]);
                    break;
                case "MatchExamRequestList":
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
                case "CurrExamRequestID":
                    self.Response("CurrExamRequestID", [value]);
                    // self.Response(title,[{"ExamRequestID":"120","PatientName":"张三11","PatientSex":"女","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"},{"ExamRequestID":"121","PatientName":"张三","PatientSex":"男","PatientAge":"20","ExamRequestTime":"2010-01-05","PatientBirthDate":"2010-08-07","ZipCode":"4517"}]);
                    break;
            }
        }
    }(this);
}

function EnterEquipmentFirst(ele) {
    var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseMatchModule);
    var equipID = form.GetField('EquipmentIDFilters');

    var tmpField = "EquipmentIDFilters_" + equipID;
    var param1 = { "command": "EnterEquipment", "condFields": tmpField + ",EnterEquipment_Request" };
    var param2 = { "field": tmpField, "conv": "StaticValueConv(" + equipID + ")" };
    useroperate(ele, commit, param1, param2);
}
function EnterEquipmentConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (ele, val) {
        var force = confirm(val.Action);
        if (force) {
            var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseMatchModule);
            var equipID = form.GetField('EquipmentIDFilters');

            var tmpField = "EquipmentIDFilters_" + equipID;
            var param1 = { "command": "EnterEquipment", "condFields": tmpField + ",EnterEquipment_Use" };
            var param2 = { "field": tmpField, "conv": "StaticValueConv(" + equipID + ")" };
            useroperate(ele, commit, param1, param2);
        }
    }
}
function UsingEquipmentConv() {
    Form_ListValueConv.apply(this);
    this.ApplyValue = function (ele, val) {
        if (val.length > 0) {
            for (var i = 0; i < val.length; i++) {
                var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseMatchModule);
                form.Response("EquipmentIDFilters", [val[i]]);
                document.getElementById("Exit").style.display = "";
                document.getElementById("Enter").style.display = "none";
                document.getElementById("Equipment").style.display = "none";
           
            }
        } else {
            var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseMatchModule);
            form.Response("EquipmentIDFilters", [""]);
            document.getElementById("Exit").style.display = "none";
            document.getElementById("Enter").style.display = "";
            document.getElementById("Equipment").style.display = "";
        }
    }
}

function ExitEquipmentFirstConv() { 
      Form_SingleValueConv.apply(this);
      this.GetValue = this.GetUIValue = function (ele) {
          var form = formCallCenter.GetFormByID(window.FormIDs.ResourceUseMatchModule);
          var equipID = form.GetField('EquipmentIDFilters');
          return equipID.toJSONString();
      }
}