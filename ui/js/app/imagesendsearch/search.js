var QueryForm = function () {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default: self.SetField(title, args);
                    break;
            }
        };
    } (this);

    this.SetSelfDebug = function () {
        return 1;
    }

    this.Request = function (self) {
        return function (title, args) {
            switch (title) {
                case "ExamRequestIDFilter":
                    self.Response(title, [""]);
                    break;
                case "ExamRequestTimeRange":
                    self.Response(title, [{
                        "Start": "2015-04-02",
                        "End": "2015-07-08"
                    }]);
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
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊1'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊2'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊3'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊4'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊5'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊6'
                    }, {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊7'
                    },
                    {
                        'PatientSourceCode': 'OutPatient',
                        'PatientSourceName': '门诊'
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
                case "BodyPartList":
                    self.Response(title, [{
                        "BodyPartID": "1",
                        "BodyPartName": "头部",
                        "DisplayNO": "1"
                    }, {
                        "BodyPartID": "2",
                        "BodyPartName": "胸部",
                        "DisplayNO": "2"
                    }]);
                    break;
                case "CheckedBodyPartIDList":
                    self.Response(title, ["1", "2"]);
                    break;
                case "ReportUserList":
                    self.Response(title, [{
                        "UserCode": "1",
                        "UserName": "张三",
                        "DisplayNO": "1"
                    }, {
                        "UserCode": "2",
                        "UserName": "李四",
                        "DisplayNO": "2"
                    }]);
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
                case "ReportUserCode":
                    self.Response(title, ["1", "2"]);
                    break;
                case "ReviewUserList":
                    self.Response(title, [{
                        "UserCode": "1",
                        "UserName": "张三",
                        "DisplayNO": "1"
                    }, {
                        "UserCode": "2",
                        "UserName": "李四",
                        "DisplayNO": "2"
                    }]);
                    break;
                case "ReviewUserCode":
                    self.Response(title, ["1", "2"]);
                    break;
                case "Search":
                    self.Response("SearchResultRows", [{
                        "ExamRequestID": 11,
                        "PatientID": "7",
                        "PatientName": "测试04",
                        "PatientNameSpell": "ce shi 04",
                        "PatientSexCode": "O",
                        "PatientSexName": "其他",
                        "PatientAge": 0,
                        "PatientAgeUnitCode": "Y",
                        "PatientAgeUnitName": "岁",
                        "PatientBirthDate": null,
                        "MailingAddress": null,
                        "ZipCode": null,
                        "Telephone": null,
                        "DeviceID": 4,
                        "DeviceName": "US_未定义",
                        "ModalityCode": "US",
                        "ModalityName": "超声",
                        "BodyPartIDs": "4",
                        "BodyPartNames": "胆",
                        "ExamItemIDs": "1",
                        "ExamItemNames": "未定义",
                        "ExamMethodIDs": "1",
                        "ExamMethodNames": "未定义",
                        "StatusCode": "Reported",
                        "StatusName": "已报告",
                        "ExamRequestTime": "2015-11-12 15:57:43",
                        "ExamDateTime": null,
                        "AccessionNO": "f16b76c13a284034b77da8c1127a0d9e",
                        "PatientCardID": 15,
                        "ReportID": 4,
                        "PatientSourceCode": "O",
                        "PatientSourceName": "未定义",
                        "DeptDoctorMappingID": 1,
                        "DeptID": 1,
                        "DeptName": "未定义",
                        "DoctorID": 1,
                        "DoctorName": "未定义",
                        "RegisterUserCode": "1",
                        "RegisterUserName": "用户1",
                        "RoomNO": null,
                        "BedNO": "1",
                        "InHospitalNO": null,
                        "OutHospitalNO": null,
                        "DoctorAdvice": null,
                        "ReportTime": "2015-11-13 13:30:14",
                        "Finding": "<div>sdfsdfsdfsadfsdfsadf</div><span>sdfsdfsdfsdfsdf </br>sdfsdfsfsdfsdf</span>",
                        "Impression": "dsfasdfasdfsdafsadfsdfasdfasdfasdfasdfadsfasdfasfasd",
                        "IsPositive": null,
                        "ReportUserCode": "1",
                        "ReportUserName": "用户1",
                        "RecordDoctorCode": null,
                        "RecordDoctorName": "",
                        "ReviewUserCode": null,
                        "ReviewUserName": "",
                        "ReviewTime": null,
                        "PatientIDCard": null,
                        "BirthAreaCode": null,
                        "BirthAreaName": "",
                        "PatientRemark": null,
                        "ExamRequestRemark": null,
                        "PrintUserCode": "",
                        "PrintUserName": "",
                        "PrintTime": null,
                        "ICD10": null,
                        "Crisis": false,
                        "StudyOperatorName": null,
                        "PatientHeight": null,
                        "PatientWeight": null,
                        "WardID": null,
                        "WardName": null,
                        "ExamTypeID": null,
                        "ExamTypeName": null,
                        "CostTypeID": null,
                        "CostTypeName": null,
                        "MedicalHistory": null,
                        "Complain": null,
                        "CostValue": null,
                        "OccupationID": null,
                        "OccupationName": "",
                        "NationalityCode": null,
                        "NationalityName": "",
                        "MaritalStatusCode": null,
                        "MaritalStatusName": "",
                        "MedicalRecordNO": null,
                        "TechnicianNO": null,
                        "ChildrenCount": null,
                        "BodySurfaceArea": null,
                        "LaborInsuranceNO": null,
                        "DomicileLocation": null,
                        "WorkUnit": null,
                        "BirthCertificateNO": null,
                        "ScheduleTime": null,
                        "EquipmentModel": "",
                        "ImageLevelID": null,
                        "ImageLevelName": null
                    }, {
                        "ExamRequestID": 151,
                        "PatientID": "7",
                        "PatientName": "测试04",
                        "PatientNameSpell": "ce shi 04",
                        "PatientSexCode": "O",
                        "PatientSexName": "其他",
                        "PatientAge": 0,
                        "PatientAgeUnitCode": "Y",
                        "PatientAgeUnitName": "岁",
                        "PatientBirthDate": null,
                        "MailingAddress": null,
                        "ZipCode": null,
                        "Telephone": null,
                        "DeviceID": 4,
                        "DeviceName": "US_未定义",
                        "ModalityCode": "US",
                        "ModalityName": "超声",
                        "BodyPartIDs": "4",
                        "BodyPartNames": "胆",
                        "ExamItemIDs": "1",
                        "ExamItemNames": "未定义",
                        "ExamMethodIDs": "1",
                        "ExamMethodNames": "未定义",
                        "StatusCode": "Reported",
                        "StatusName": "已报告",
                        "ExamRequestTime": "2015-11-12 15:57:43",
                        "ExamDateTime": null,
                        "AccessionNO": "f16b76c13a284034b77da8c1127a0d9e",
                        "PatientCardID": 15,
                        "ReportID": 4,
                        "PatientSourceCode": "O",
                        "PatientSourceName": "未定义",
                        "DeptDoctorMappingID": 1,
                        "DeptID": 1,
                        "DeptName": "未定义",
                        "DoctorID": 1,
                        "DoctorName": "未定义",
                        "RegisterUserCode": "1",
                        "RegisterUserName": "用户1",
                        "RoomNO": null,
                        "BedNO": "1",
                        "InHospitalNO": null,
                        "OutHospitalNO": null,
                        "DoctorAdvice": null,
                        "ReportTime": "2015-11-13 13:30:14",
                        "Finding": "<br><br>",
                        "Impression": "",
                        "IsPositive": null,
                        "ReportUserCode": "1",
                        "ReportUserName": "用户1",
                        "RecordDoctorCode": null,
                        "RecordDoctorName": "",
                        "ReviewUserCode": null,
                        "ReviewUserName": "",
                        "ReviewTime": null,
                        "PatientIDCard": null,
                        "BirthAreaCode": null,
                        "BirthAreaName": "",
                        "PatientRemark": null,
                        "ExamRequestRemark": null,
                        "PrintUserCode": "",
                        "PrintUserName": "",
                        "PrintTime": null,
                        "ICD10": null,
                        "Crisis": false,
                        "StudyOperatorName": null,
                        "PatientHeight": null,
                        "PatientWeight": null,
                        "WardID": null,
                        "WardName": null,
                        "ExamTypeID": null,
                        "ExamTypeName": null,
                        "CostTypeID": null,
                        "CostTypeName": null,
                        "MedicalHistory": null,
                        "Complain": null,
                        "CostValue": null,
                        "OccupationID": null,
                        "OccupationName": "",
                        "NationalityCode": null,
                        "NationalityName": "",
                        "MaritalStatusCode": null,
                        "MaritalStatusName": "",
                        "MedicalRecordNO": null,
                        "TechnicianNO": null,
                        "ChildrenCount": null,
                        "BodySurfaceArea": null,
                        "LaborInsuranceNO": null,
                        "DomicileLocation": null,
                        "WorkUnit": null,
                        "BirthCertificateNO": null,
                        "ScheduleTime": null,
                        "EquipmentModel": "",
                        "ImageLevelID": null,
                        "ImageLevelName": null
                    }, {
                        "ExamRequestID": 118,
                        "PatientID": "8",
                        "PatientName": "测试04",
                        "PatientNameSpell": "ce shi 04",
                        "PatientSexCode": "O",
                        "PatientSexName": "其他",
                        "PatientAge": 0,
                        "PatientAgeUnitCode": "Y",
                        "PatientAgeUnitName": "岁",
                        "PatientBirthDate": null,
                        "MailingAddress": null,
                        "ZipCode": null,
                        "Telephone": null,
                        "DeviceID": 4,
                        "DeviceName": "US_未定义",
                        "ModalityCode": "US",
                        "ModalityName": "超声",
                        "BodyPartIDs": "4",
                        "BodyPartNames": "胆",
                        "ExamItemIDs": "1",
                        "ExamItemNames": "未定义",
                        "ExamMethodIDs": "1",
                        "ExamMethodNames": "未定义",
                        "StatusCode": "Reported",
                        "StatusName": "已报告",
                        "ExamRequestTime": "2015-11-12 15:57:43",
                        "ExamDateTime": null,
                        "AccessionNO": "f16b76c13a284034b77da8c1127a0d9e",
                        "PatientCardID": 15,
                        "ReportID": 4,
                        "PatientSourceCode": "O",
                        "PatientSourceName": "未定义",
                        "DeptDoctorMappingID": 1,
                        "DeptID": 1,
                        "DeptName": "未定义",
                        "DoctorID": 1,
                        "DoctorName": "未定义",
                        "RegisterUserCode": "1",
                        "RegisterUserName": "用户1",
                        "RoomNO": null,
                        "BedNO": "1",
                        "InHospitalNO": null,
                        "OutHospitalNO": null,
                        "DoctorAdvice": null,
                        "ReportTime": "2015-11-13 13:30:14",
                        "Finding": "<br><br>",
                        "Impression": "",
                        "IsPositive": null,
                        "ReportUserCode": "1",
                        "ReportUserName": "用户1",
                        "RecordDoctorCode": null,
                        "RecordDoctorName": "",
                        "ReviewUserCode": null,
                        "ReviewUserName": "",
                        "ReviewTime": null,
                        "PatientIDCard": null,
                        "BirthAreaCode": null,
                        "BirthAreaName": "",
                        "PatientRemark": null,
                        "ExamRequestRemark": null,
                        "PrintUserCode": "",
                        "PrintUserName": "",
                        "PrintTime": null,
                        "ICD10": null,
                        "Crisis": false,
                        "StudyOperatorName": null,
                        "PatientHeight": null,
                        "PatientWeight": null,
                        "WardID": null,
                        "WardName": null,
                        "ExamTypeID": null,
                        "ExamTypeName": null,
                        "CostTypeID": null,
                        "CostTypeName": null,
                        "MedicalHistory": null,
                        "Complain": null,
                        "CostValue": null,
                        "OccupationID": null,
                        "OccupationName": "",
                        "NationalityCode": null,
                        "NationalityName": "",
                        "MaritalStatusCode": null,
                        "MaritalStatusName": "",
                        "MedicalRecordNO": null,
                        "TechnicianNO": null,
                        "ChildrenCount": null,
                        "BodySurfaceArea": null,
                        "LaborInsuranceNO": null,
                        "DomicileLocation": null,
                        "WorkUnit": null,
                        "BirthCertificateNO": null,
                        "ScheduleTime": null,
                        "EquipmentModel": "",
                        "ImageLevelID": null,
                        "ImageLevelName": null
                    }, {
                        "ExamRequestID": 12,
                        "PatientID": "8",
                        "PatientName": "测试05",
                        "PatientNameSpell": "ce shi 05",
                        "PatientSexCode": "O",
                        "PatientSexName": "其他",
                        "PatientAge": 0,
                        "PatientAgeUnitCode": "Y",
                        "PatientAgeUnitName": "岁",
                        "PatientBirthDate": null,
                        "MailingAddress": null,
                        "ZipCode": null,
                        "Telephone": null,
                        "DeviceID": 4,
                        "DeviceName": "US_未定义",
                        "ModalityCode": "US",
                        "ModalityName": "超声",
                        "BodyPartIDs": "4",
                        "BodyPartNames": "胆",
                        "ExamItemIDs": "1",
                        "ExamItemNames": "未定义",
                        "ExamMethodIDs": "1",
                        "ExamMethodNames": "未定义",
                        "StatusCode": "Reported",
                        "StatusName": "已报告",
                        "ExamRequestTime": "2015-11-12 15:57:43",
                        "ExamDateTime": null,
                        "AccessionNO": "f16b76c13a284034b77da8c1127a0d9e",
                        "PatientCardID": 15,
                        "ReportID": 4,
                        "PatientSourceCode": "O",
                        "PatientSourceName": "未定义",
                        "DeptDoctorMappingID": 1,
                        "DeptID": 1,
                        "DeptName": "未定义",
                        "DoctorID": 1,
                        "DoctorName": "未定义",
                        "RegisterUserCode": "1",
                        "RegisterUserName": "用户1",
                        "RoomNO": null,
                        "BedNO": "1",
                        "InHospitalNO": null,
                        "OutHospitalNO": null,
                        "DoctorAdvice": null,
                        "ReportTime": "2015-11-13 13:30:14",
                        "Finding": "<br><br>",
                        "Impression": "",
                        "IsPositive": true,
                        "ReportUserCode": "1",
                        "ReportUserName": "用户1",
                        "RecordDoctorCode": null,
                        "RecordDoctorName": "",
                        "ReviewUserCode": null,
                        "ReviewUserName": "",
                        "ReviewTime": null,
                        "PatientIDCard": null,
                        "BirthAreaCode": null,
                        "BirthAreaName": "",
                        "PatientRemark": null,
                        "ExamRequestRemark": null,
                        "PrintUserCode": "",
                        "PrintUserName": "",
                        "PrintTime": null,
                        "ICD10": null,
                        "Crisis": false,
                        "StudyOperatorName": null,
                        "PatientHeight": null,
                        "PatientWeight": null,
                        "WardID": null,
                        "WardName": null,
                        "ExamTypeID": null,
                        "ExamTypeName": null,
                        "CostTypeID": null,
                        "CostTypeName": null,
                        "MedicalHistory": null,
                        "Complain": null,
                        "CostValue": null,
                        "OccupationID": null,
                        "OccupationName": "",
                        "NationalityCode": null,
                        "NationalityName": "",
                        "MaritalStatusCode": null,
                        "MaritalStatusName": "",
                        "MedicalRecordNO": null,
                        "TechnicianNO": null,
                        "ChildrenCount": null,
                        "BodySurfaceArea": null,
                        "LaborInsuranceNO": null,
                        "DomicileLocation": null,
                        "WorkUnit": null,
                        "BirthCertificateNO": null,
                        "ScheduleTime": null,
                        "EquipmentModel": "",
                        "ImageLevelID": null,
                        "ImageLevelName": null
                    }]);
                    self.Response("CurrExamRequestID", ["11"]);
                    break;
                case "Clear":
                    alert(title);
                case "ResultRowsCount":
                    self.Response(title, ["10"]);
                    break;
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
                case "SexCodeFilters":
                    self.Response("SexCodeFilters", [value]);
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

var init = function (pageName) {

    var queryForm = new QueryForm();
    queryForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "ExamRequestTimeRangeStart": "ExamRequestTimeRangeStart",
        "ExamRequestTimeRangeEnd": "ExamRequestTimeRangeEnd",
        "PatientNameFilter": "PatientNameFilter",
        "PatientNameSpellFilter": "PatientNameSpellFilter",
        "PatientIDFilter": "PatientIDFilter",
        "SexList": "SexList",
        "SexCodeFilters": "SexCodeFilters",
        "PatientAgeRange": "PatientAgeRange",
        "AgeUnitList": "AgeUnitList",
        "AgeUnitCodeFilter": "AgeUnitCodeFilter",
        "PatientBirthDateRange": "PatientBirthDateRange",
        "ExamRequestTimeRange": "ExamRequestTimeRange",
        "OutPatientNOFilter": "OutPatientNOFilter",
        "InHospitalNOFilter": "InHospitalNOFilter",
        "AreaList": "AreaList",
        "AreaCodeFilters": "AreaCodeFilters",
        "OccupationList": "OccupationList",
        "WardList": "WardList",
        "WardIDFilters": "WardIDFilters",
        "RoomNOFilter": "RoomNOFilter",
        "BedNOFilter": "BedNOFilter",
        "LoginUserCode": "LoginUserCode",
        "RegisterUserList": "RegisterUserList",
        "RegisterUserCodeFilters": "RegisterUserCodeFilters",
        "ExamUserList": "ExamUserList",
        "ExamUserCodeFilters": "ExamUserCodeFilters",
        "CriticalFlagList": "CriticalFlagList",
        "CriticalFlagCodeFilters": "CriticalFlagCodeFilters",
        "ReportUserList": "ReportUserList",
        "ReportUserCodeFilters": "ReportUserCodeFilters",
        "ReportTimeRange": "ReportTimeRange",
        "ReviewUserList": "ReviewUserList",
        "ReviewUserCodeFilters": "ReviewUserCodeFilters",
        "ReviewTimeRange": "ReviewTimeRange",
        "ExamStatusList": "ExamStatusList",
        "ExamStatusCodeFilters": "ExamStatusCodeFilters",
        "ApplicationDeptList": "ApplicationDeptList",
        "ApplicationDeptIDFilters": "ApplicationDeptIDFilters",
        "ApplicationDoctorList": "ApplicationDoctorList",
        "ApplicationDoctorIDFilters": "ApplicationDoctorIDFilters",
        "ExamTypeList": "ExamTypeList",
        "ExamTypeIDFilters": "ExamTypeIDFilters",
        "MedicalHistoryList": "MedicalHistoryList",
        "MedicalHistoryFilter": "MedicalHistoryFilter",
        "ComplainList": "ComplainList",
        "ComplainFilter": "ComplainFilter",
        "NationalityList": "NationalityList",
        "MaritalStatusList": "MaritalStatusList",
        "PatientHeightRange": "PatientHeightRange",
        "PatientWeightRange": "PatientWeightRange",
        "MailingAddressFilter": "MailingAddressFilter",
        "ZipCodeFilter": "ZipCodeFilter",
        "TelephoneFilter": "TelephoneFilter",
        "PatientIDCardFilter": "PatientIDCardFilter",
        "PatientSourceList": "PatientSourceList",
        "PatientSourceCodeFilters": "PatientSourceCodeFilters",
        "ModalityList": "ModalityList",
        "ModalityCodeFilters": "ModalityCodeFilters",
        "ExamRequestIDFilter": "ExamRequestIDFilter",
        "EquipmentList": "EquipmentList",
        "EquipmentIDFilters": "EquipmentIDFilters",
        "ScheduleTimeRange": "ScheduleTimeRange",
        "CostTypeList": "CostTypeList",
        "CostTypeIDFilters": "CostTypeIDFilters",
        "CostValueRange": "CostValueRange",
        "BodyPartList": "BodyPartList",
        "BodyPartIDFilters": "BodyPartIDFilters",
        "ExamItemList": "ExamItemList",
        "ExamItemIDFilters": "ExamItemIDFilters",
        "ExamMethodList": "ExamMethodList",
        "ExamMethodIDFilters": "ExamMethodIDFilters",
        "EquipmentModelList": "EquipmentModelList",
        "EquipmentModelFilters": "EquipmentModelFilters",
        "FindingFilter": "FindingFilter",
        "ImpressionFilter": "ImpressionFilter",
        "BePositiveFilters": "BePositiveFilters",
        "ImageLevelList": "ImageLevelList",
        "ImageLevelIDFilters": "ImageLevelIDFilters",
        "DoctorAdviceFilter": "DoctorAdviceFilter",
        "ICD10List": "ICD10List",
        "ICD10CodeFilter": "ICD10CodeFilter",
        "Search": "Search",
        "SearchResultColumns": "SearchResultColumns",
        "CurrExamRequestID": "CurrExamRequestID",
        "SearchResultRows": "SearchResultRows",
        "SearchResultPageInfo": "SearchResultPageInfo",
        "OccupationIDFilters": "OccupationIDFilters",
        "NationalityCodeFilters": "NationalityCodeFilters",
        "MaritalStatusCodeFilters": "MaritalStatusCodeFilters",
        "MedicalRecordNOFilter": "MedicalRecordNOFilter",
        "TechnicianNOFilter": "TechnicianNOFilter",
        "ChildrenCountRange": "ChildrenCountRange",
        "BodySurfaceAreaRange": "BodySurfaceAreaRange",
        "LaborInsuranceNOFilter": "LaborInsuranceNOFilter",
        "DomicileLocationFilter": "DomicileLocationFilter",
        "WorkUnitFilter": "WorkUnitFilter",
        "BirthCertificateNOFilter": "BirthCertificateNOFilter",
        "ResetFilters": "ResetFilters",
        // "NotifyTitle":"NotifyTitle",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "AddExamRequest": "AddExamRequest", //??
        "UpdateExamRequest": "UpdateExamRequest",
        "DeleteExamRequest": "DeleteExamRequest",
        "LoadReport": "LoadReport",
        "LoadImage": "LoadImage",
        "ResultRowsCount": "ResultRowsCount",
        "AddBackgroundService": "AddBackgroundService",
        "LoadBGSVCManager": "LoadBGSVCManager",
        "GatewayUpload": "GatewayUpload",
        "GatewayReport": "GatewayReport",
        "GatewayState": "GatewayState",
        "Add2ImageCompare": "Add2ImageCompare",
        "CASearchByExamRequestID": "CASearchByExamRequestID",
        "CHANGETOSCHEDULE": "CHANGETOSCHEDULE",
        "ImageSend": "ImageSend",
        "WaitForSendStatus": "WaitForSendStatus",
        "ApplyDateTime": "ApplyDateTime",
        "OperatorCode": "OperatorCode",
        "CurrId":"CurrId",
        "ImageSendMethod": "ImageSendMethod",
        "ImageSendMethodFilters": "ImageSendMethodFilters"


        //        "ExamRequestID": "ExamRequestIDFilter",
        //        "PatientName": "PatientNameFilter",
        //        "SexList": "SexList",
        //        "SexCodeFilters": "SexCodeFilters",
        //        "PatientSourceList": "PatientSourceList",
        //        "PatientSourceCodeFilters": "PatientSourceCodeFilters",
        //        "ExamStatusList": "ExamStatusList",
        //        "CheckedStatusCodeList": "CheckedStatusCodeList",
        //        "BodyPartList": "BodyPartList",
        //        "CheckedBodyPartIDList": "CheckedBodyPartIDList",
        //        "ReportUserList": "ReportUserList",
        //        "ReportUserCode": "ReportUserCode",
        //        "ReviewUserList": "ReviewUserList",
        //        "ReviewUserCode": "ReviewUserCode",
        //        "CurrExamRequestID": "CurrExamRequestID",
        //        "SearchResultRows":"SearchResultRows",
        //        "Query": "Search",
        //        "Clear": "Clear"
    };
    for (var t in titles) {
        queryForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ImageSendSearchModule, queryForm);
    queryForm.SetField("ModalityCodeFilters", [["DR"]], true);
    if (pageName == "Registered")
        queryForm.SetField("ExamStatusCodeFilters", [["Registered"]], true);
    else
        queryForm.SetField("ExamStatusCodeFilters", [["Exam"]], true);
    window.autoQuery = function (e) {
        var func = function () {
            Event.Unregister(e, "mousemove", e.__delayExe);
            e.__delayExe = null;
            if (new ui(e).visible()) {
                var param = {
                    "command": "Search"
                };
                // usercommit(queryForm.GetForm(), param);

                QueryRest('Today', null);
            }
            else {
                e.__delayExe = arguments.callee;
                Event.Register(e, "mousemove", e.__delayExe);
            }
        }
        func();
    }
    window.autoQuery(document.body);

    // document.oncontextmenu = function () { return false; }
}

function QueryRest(obj, status) {
    var s = document.getElementById("search");
    var form = formCallCenter.GetFormByID("ImageSendSearchModule");

    SetQueryDate(obj, form);

    SetQueryStatus(status, form);

    var param = {
        "command": "Search"
    };
    commit(s);
}

function SetQueryDate(obj, form) {
    if (obj) {
        var StartTime = new Date();
        var EndTime = new Date();
        if (obj == "Today")
            EndTime = new Date(EndTime.getTime() + 1 * 24 * 60 * 60 * 1000);
        if (obj == "Yesterday") {
            StartTime = new Date(StartTime.getTime() - 1 * 24 * 60 * 60 * 1000);
            EndTime = EndTime;
        }
        if (obj == "Week") {
            StartTime = new Date(StartTime.getTime() - 6 * 24 * 60 * 60 * 1000);
            EndTime = new Date(EndTime.getTime() + 1 * 24 * 60 * 60 * 1000);
        }

        StartTime = DataTimeFormat(StartTime);
        EndTime = DataTimeFormat(EndTime);

        form.SetField("ExamRequestTimeRange", [{
            'Start': StartTime,
            'End': EndTime
        }], "true");
    }
}

function SetQueryStatus(status, form) {
    if (status) {
        switch (status) {
            case "Registered":
                form.SetField("ExamStatusCodeFilters", [["Registered"]], true);
                break;
            case "Exam":
                form.SetField("ExamStatusCodeFilters", [["Exam"]], true);
                break;
            case "Printed":
                form.SetField("ExamStatusCodeFilters", [["Printed"]], true);
                break;
            case "Reported":
                form.SetField("ExamStatusCodeFilters", [["Reported"]], true);
                break;
        }
    }
}

function SearchResultPageInfoConv() {
    Form_SingleValueConv.apply(this);
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.GetUIValue = function (ele) {
        if (ele.__pInfo) {
            return ele.__pInfo.toJSONString();
        } else {
            return ele.innerHTML;
        }
    }
    this.ApplyValue = function (ele, val) {
        ele.innerHTML = "";
        ele.__pInfo = {
            "PageIndex": val.PageIndex,
            "PageSize": val.PageSize,
            "TotalCount": val.TotalCount
        };
        if (ele.__pInfo) {
            //“首页”按钮
            var input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '首页');
            input.onclick = function (e) { return function () { PageJump(e, "first"); } } (ele);
            ele.appendChild(input);
            //“上一页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '上一页');
            input.onclick = function (e) { return function () { PageJump(e, "pre"); } } (ele);
            ele.appendChild(input);
            //“当前页/总页数”显示
            var span = document.createElement('span');
            span.setAttribute('class', 'xxx');
            span.setAttribute('style', 'float: left;');
            var totalPage = Math.ceil(ele.__pInfo.TotalCount / ele.__pInfo.PageSize);
            if(totalPage == 0) totalPage = 1;
            span.innerHTML = ele.__pInfo.PageIndex + "/" + totalPage;
            ele.appendChild(span);
            //“下一页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '下一页');
            input.onclick = function (e) { return function () { PageJump(e, "next"); } } (ele);
            ele.appendChild(input);
            //“尾页”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '尾页');
            input.onclick = function (e) { return function () { PageJump(e, "last"); } } (ele);
            ele.appendChild(input);
            //“跳转页码”输入框
            input = document.createElement('input');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('id', 'PageJumpInput');
            input.style.width = "50px";
            input.value = "";
            ele.appendChild(input);
            //“跳转”按钮
            input = document.createElement('input');
            input.setAttribute('class', 'button');
            input.setAttribute('style', 'float: left;');
            input.setAttribute('type', 'button');
            input.setAttribute('value', '跳转');
            input.onclick = function (e) {
                return function () {
                    var index = document.getElementById("PageJumpInput");
                    PageJump(e, "jump", index.value);
                }
            } (ele);
            ele.appendChild(input);
            //显示“页大小”信息
            span = document.createElement('span');
            span.setAttribute('class', 'xxx');
            span.setAttribute('style', 'float: left;');
            span.innerHTML = "每页：" + ele.__pInfo.PageSize + "条";
            ele.appendChild(span);
        }
    }
}
function PageJump(ele, code, index) {
    if (ele && ele.__pInfo) {
        var totalPage = Math.ceil(ele.__pInfo.TotalCount / ele.__pInfo.PageSize);
        switch (code) {
            case "first":
                index = 1;
                break;
            case "pre":
                index = ele.__pInfo.PageIndex - 1;
                if (index < 1) index = 1;
                break;
            case "next":
                index = ele.__pInfo.PageIndex + 1;
                if (index > totalPage) index = totalPage;
                break;
            case "last":
                index = totalPage;
                break;
            case "jump":
                if (isNaN(index)) index = 1;
                if (index < 1) index = 1;
                if (index > totalPage) index = totalPage;
                break;
        }
        var form = formCallCenter.GetFormByID("ImageSendSearchModule");
        form.SetField("SearchResultPageInfo", [{ "PageIndex": index, "PageSize": ele.__pInfo.PageSize}], true);
        usercommit(ele, { "command": "Search" });
    }
}

function BolPositiveConv(readOnly) {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (self) {
        return function (ele, val) {
            if (ele.children.length == 0) {
                var YangSpan = document.createElement("span");
                YangSpan.setAttribute("title", "阳性");
                YangSpan.setAttribute("class", "unselectedItem");
                var YangLable = document.createElement("span");
                YangLable.setAttribute("class", "unselectedLabels");
                var YangText = document.createElement("span");
                YangText.setAttribute("class", "unselectedText");
                YangText.innerHTML = "阳性";

                var YinSpan = document.createElement("span");
                YinSpan.setAttribute("title", "阴性");
                YinSpan.setAttribute("class", "unselectedItem");
                var YinLable = document.createElement("span");
                YinLable.setAttribute("class", "unselectedLabels");
                var YinText = document.createElement("span");
                YinText.setAttribute("class", "unselectedText");
                YinText.innerHTML = "阴性";
                YangSpan.onclick = function () {
                    if (ele.__currData == "true") {
                        YangSpan.setAttribute("class", "unselectedItem");
                        YangLable.setAttribute("class", "unselectedLabels");
                        YangText.setAttribute("class", "unselectedText");
                        ele.__currData = "null";
                        changeFieldValue(ele);
                    } else {
                        YangSpan.setAttribute("class", "selectedItem");
                        YangLable.setAttribute("class", "selectedLabels");
                        YangText.setAttribute("class", "selectedText");
                        ele.__currData = "true";
                        changeFieldValue(ele);
                    }



                }
                YinSpan.onclick = function () {
                    if (ele.__currDatas == "false") {
                        YinSpan.setAttribute("class", "unselectedItem");
                        YinLable.setAttribute("class", "unselectedLabels");
                        YinText.setAttribute("class", "unselectedText");
                        ele.__currDatas = "null";
                        changeFieldValue(ele);
                    } else {
                        YinSpan.setAttribute("class", "selectedItem")
                        YinLable.setAttribute("class", "selectedLabels")
                        YinText.setAttribute("class", "selectedText")
                        ele.__currDatas = "false";
                        changeFieldValue(ele);
                    }

                }

                YangSpan.appendChild(YangLable);
                YangSpan.appendChild(YangText);
                ele.appendChild(YangSpan);

                YinSpan.appendChild(YinLable);
                YinSpan.appendChild(YinText);
                ele.appendChild(YinSpan);
            }
            if (val == null) {
                ele.children[1].setAttribute("class", "unselectedItem")
                ele.children[1].children[0].setAttribute("class", "unselectedLabels")
                ele.children[1].children[1].setAttribute("class", "unselectedText")
                ele.children[0].setAttribute("class", "unselectedItem");
                ele.children[0].children[0].setAttribute("class", "unselectedLabels");
                ele.children[0].children[1].setAttribute("class", "unselectedText");
                ele.__currData = "null";
                ele.__currDatas = "null";
            }
        }

    } (this);
    this.GetUIValue = function (ele) {
        var val = [];
        if (ele.__currData == "null" && ele.__currDatas == "null") {
            return null;
        }
        else {
            val[0] = ele.__currData;
            val[1] = ele.__currDatas;
            return val;
        }
    }
}