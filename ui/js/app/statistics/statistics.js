var init = function () {

    var statisticsForm = new StatisticsForm();
    statisticsForm.oo(new IdentifiedForm(document.body));
    var date = new Date();
    document.getElementById("FollowUpStartTime").value = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
    document.getElementById("FollowUpEndTime").value = new Date(date.getTime()).Format("yyyy-MM-dd");
    var titles = {
        BodyPartList: "BodyPartList",
        BodyPart_BodyPartList: "BodyPart_BodyPartList",
        SexList: "SexList",
        PatientSex_SexList: "PatientSex_SexList",
        BePositiveList: "BePositiveList",
        BePositive_BePositiveList: "BePositive_BePositiveList",
        ExamTypeList: "ExamTypeList",
        DepartmentList: "DepartmentList",
        Department_DepartmentList: "Department_DepartmentList",
        ModalityList: "ModalityList",
        Modality_ModalityList: "Modality_ModalityList",
        ReportUserList: "ReportUserList",
        ReportUser_ReportUserList: "ReportUser_ReportUserList",
        ReviewUserList: "ReviewUserList",
        CurrModalityCode: "CurrModalityCode",
        Statistics: "Statistics",
        Finding: "Finding",
        FindingUser: "FindingUser",
        PatientSourceList: "PatientSourceList",
        ExportStatisticReport: "ExportStatisticReport",
        FollowUpStatusList: "FollowUpStatusList",
        FollowUp_FollowUpStatusList: "FollowUp_FollowUpStatusList",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };

    for (var t in titles) {
        statisticsForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.StatisticsModule, statisticsForm);
    statisticsForm.SetField("BePositiveList", [{"BePositiveValue": 1, "BePositiveName": "阳性"},
        {"BePositiveValue": 0, "BePositiveName": "阴性"},
        {"BePositiveValue": null, "BePositiveName": "待定"}]);
    statisticsForm.SetField("FollowUpStatusList", [{"FollowUpStatusValue": "NoNeed", "FollowUpStatusName": "不随访"},
        {"FollowUpStatusValue": "Waiting", "FollowUpStatusName": "待随访"},
        {"FollowUpStatusValue": "Finished", "FollowUpStatusName": "已随访"}]);
}

var StatisticsForm = function () {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    }(this);
    this.Report = function (self) {
        return function (title, value) {
            switch (title) {

                case "Statistics":
                    self.Response("PatientSex", [[{"Key": "男", "Value": 5}, {"Key": "女", "Value": 7}, {
                        "Key": "未定义",
                        "Value": 10
                    }]]);
                    break;

            }
        }
    }(this);
    this.Request = function (self) {
        return function (title, args) {
            switch (title) {
                case "UserCode":
                    self.Response(title, ["UserCode"]);
                    break;
                case "SexList":
                    self.Response(title, [{"SexCode": "M", "SexName": "男"}, {
                        "SexCode": "F",
                        "SexName": "女"
                    }, {"SexCode": "U", "SexName": "未定义"}]);
                    break;

                case "Statistics":
                    self.Response("PatientSex", [[{"Key": "男", "Value": 5}, {"Key": "女", "Value": 7}, {
                        "Key": "未定义",
                        "Value": 10
                    }]]);
                    break;
                case "AgeUnitList":
                    self.Response(title, [{"AgeUnitCode": "Y", "AgeUnitName": "岁"}, {
                        "AgeUnitCode": "M",
                        "AgeUnitName": "月"
                    }, {"AgeUnitCode": "D", "AgeUnitName": "天"}]);
                    break;
                case "PatientSourceList":
                    self.Response(title, [{
                        "PatientSourceCode": "M",
                        "PatientSourceName": "门诊"
                    }, {"PatientSourceCode": "F", "PatientSourceName": "住院"}, {
                        "PatientSourceCode": "U",
                        "PatientSourceName": "体检"
                    }]);
                    break;
                case "DepartmentList":
                    self.Response(title, [{"DeptID": "M", "DeptName": "外科"}, {
                        "DeptID": "F",
                        "DeptName": "内科"
                    }, {"DeptID": "U", "DeptName": "放射科"}]);
                    break;
                case "ReportUserList":
                    self.Response(title, [{"UserCode": "M", "UserName": "额外"}, {
                        "UserCode": "F",
                        "UserName": "玩儿"
                    }, {"UserCode": "U", "UserName": "测试1"}]);
                    break;
                case "ReviewUserList":
                    self.Response(title, [{"UserCode": "M", "UserName": "额外"}, {
                        "UserCode": "F",
                        "UserName": "玩儿"
                    }, {"UserCode": "U", "UserName": "测试1"}]);
                    break;
                case "ApplicationModalityList":
                    self.Response(title, [{"ModalityCode": "M", "ModalityName": "CT"}, {
                        "ModalityCode": "F",
                        "ModalityName": "MR"
                    }, {"ModalityCode": "U", "ModalityName": "放2射科"}]);
                    break;
                case "ApplicationDeviceList":
                    self.Response(title, [{"DeviceID": "M", "DeviceName": "CT01"}, {
                        "DeviceID": "F",
                        "DeviceName": "MR01"
                    }, {"DeviceID": "U", "DeviceName": "放2射科1"}]);
                    break;
                case "BodyPartList":
                    self.Response(title, [{"BodyPartID": "M", "BodyPartName": "头部"}, {
                        "BodyPartID": "F",
                        "BodyPartName": "胸部"
                    }, {"BodyPartID": "U", "BodyPartName": "四肢"}, {
                        "BodyPartID": "U",
                        "BodyPartName": "肝"
                    }, {"BodyPartID": "U", "BodyPartName": "胆"}, {
                        "BodyPartID": "U",
                        "BodyPartName": "脾"
                    }, {"BodyPartID": "U", "BodyPartName": "脾"}]);
                    break;
                case "BodyPart":
                    self.Response(title, [{"key": "头部", "value": "12"}, {"key": "胸部", "value": "8"}, {
                        "key": "20",
                        "value": "16"
                    }]);
                    break;
                case "ExamTypeList":
                    self.Response(title, [{"ExamTypeID": "1", "ExamTypeName": "普通体检"}, {
                        "ExamTypeID": "2",
                        "ExamTypeName": "反射"
                    }, {"ExamTypeID": "3", "ExamTypeName": "未定义"}]);
                    break;
                case "SearchResultRows":
                    self.Response(title, [{
                        "ExamRequestID": "1",
                        "PatientName": "张三",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "2",
                        "PatientName": "张三",
                        "PatientSex": "女",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }, {
                        "ExamRequestID": "3",
                        "PatientName": "李四",
                        "PatientSex": "男",
                        "PatientAge": "20",
                        "ExamRequestTime": "2010-01-05",
                        "PatientBirthDate": "2010-08-07",
                        "ZipCode": "4517"
                    }]);
                    break;
                case "LoadReisger":
                    self.SetField("PatientID", ["4"]);
                    break;

                default:
                    break;
//                  
            }
        }
    }(this);
}


function statistics(ele, page, style) {
    selectPage(page);
    var params = {};
    switch (page) {
        case "BodyPart":
            params.Name = page;
            params.TimeField = 'Ris_ExamRequest.ExamRequestTime';
            params.StartTime = document.getElementById("BodyPartStartTime").value;
            params.EndTime = document.getElementById("BodyPartEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'Ris_ExamRequestItem inner join Ris_ExamRequest on  Ris_ExamRequestItem.ExamRequestID=Ris_ExamRequest.ExamRequestID inner join Dict_BodyPart on Ris_ExamRequestItem.BodyPartID=Dict_BodyPart.BodyPartID inner join Dict_MBEMapping on Dict_BodyPart.BodyPartID = Dict_MBEMapping.BodyPartID';
            params.Select = 'Dict_BodyPart.BodyPartName';
            params.Group = 'BodyPartName';
            params.Order = null;
            var spanBodyPart = document.getElementById("BodyPart");
            var filters = formCallCenter.DetectFormByElement(spanBodyPart).GetField('BodyPart_BodyPartList');
            if (filters && filters.length > 0) {
                params.Where = 'Dict_BodyPart.BodyPartID in (' + filters[0];
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',' + filters[i];
                }
                params.Where += ')';
            }
            else {
                params.Where = ' 1=1 ';
            }
            params.Where += " AND Dict_MBEMapping.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": 'StaticValueConv(\'' + params.toJSONString() + '\')'};
            useroperate(ele, commit, p0, p1);
            break;
        case "PatientSex":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("PatientSexStartTime").value;
            params.EndTime = document.getElementById("PatientSexEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.PatientSexName';
            params.Group = 'PatientSexName';
            params.Order = null;
            var spanPatientSex = document.getElementById("PatientSex");
            var filters = formCallCenter.DetectFormByElement(spanPatientSex).GetField('PatientSex_SexList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.PatientSexCode in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ')';
            }
            else {
                params.Where = " 1=1 ";
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "BePositive":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("BePositiveStartTime").value;
            params.EndTime = document.getElementById("BePositiveEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = "(V_QueryStatisticResults.ModalityCode+" + "'_'" + "+V_QueryStatisticResults.PositiveName) as PositiveName";
            params.Group = 'PositiveName,ModalityCode';
            params.Order = null;
            var spanBePositive = document.getElementById("BePositive");
            var filters = formCallCenter.DetectFormByElement(spanBePositive).GetField('BePositive_BePositiveList');
            if (filters && filters.length > 0) {
                if (filters[0]) {
                    params.Where = 'V_QueryStatisticResults.IsPositive = 1';
                }
                else if (filters[0] == false) {
                    params.Where = 'V_QueryStatisticResults.IsPositive = 0';
                }
                else {
                    params.Where = 'V_QueryStatisticResults.IsPositive is null';
                }
                for (var i = 1; i < filters.length; i++) {
                    if (filters[i]) {
                        params.Where += ' or V_QueryStatisticResults.IsPositive = 1';
                    }
                    else if (filters[i] == false) {
                        params.Where += ' or V_QueryStatisticResults.IsPositive = 0';
                    }
                    else {
                        params.Where += ' or V_QueryStatisticResults.IsPositive is null';
                    }
                }
            }
            else {
                params.Where = " 1=1 ";
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            alert(params.Where)
            useroperate(ele, commit, p0, p1);
            break;
        case "ExamType":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("ExamTypeStartTime").value;
            params.EndTime = document.getElementById("ExamTypeEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.ExamTypeName';
            params.Group = 'ExamTypeName';
            params.Order = null;
            var spanExamType = document.getElementById("ExamType");
            var filters = formCallCenter.DetectFormByElement(spanExamType).GetField('ExamType_ExamTypeList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.ExamTypeID in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ')';
            }
            else {
                params.Where = " 1=1 ";
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "Modality":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("ModalityStartTime").value;
            params.EndTime = document.getElementById("ModalityEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.ModalityCode';
            params.Group = 'ModalityCode';
            params.Order = null;
            var spanExamType = document.getElementById("Modality");
            var filters = formCallCenter.DetectFormByElement(spanExamType).GetField('Modality_ModalityList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.ModalityCode in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ')';
            }
            else {
                params.Where = " 1=1 ";
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "Department":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("DepartmentStartTime").value;
            params.EndTime = document.getElementById("DepartmentEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.DeptName';
            params.Group = 'DeptName';
            params.Order = null;
            var spanDepartment = document.getElementById("Department");
            var filters = formCallCenter.DetectFormByElement(spanDepartment).GetField('Department_DepartmentList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.DeptID in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ')';
            }
            else {
                params.Where = " 1=1 ";
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "ReportUser":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ReportTime';
            params.StartTime = document.getElementById("ReportUserStartTime").value;
            params.EndTime = document.getElementById("ReportUserEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.ReportUserName'; //如按天周月年统计，需增加ReportDayTime,ReportWeek，ReportMonth,ReportYear
            params.Group = 'ReportUserName'; //如按天周月年统计，需增加ReportDayTime,ReportWeek，ReportMonth,ReportYear
            params.Order = null;
            var spanReportUser = document.getElementById("ReportUser");
            var filters = formCallCenter.DetectFormByElement(spanReportUser).GetField('ReportUser_ReportUserList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.ReportUserCode in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ') and V_QueryStatisticResults.ReportTime is not null';
            }
            else {
                params.Where = 'V_QueryStatisticResults.ReportTime is not null';
            }

            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "ReviewUser":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ReviewTime';
            params.StartTime = document.getElementById("PatientSexStartTime").value;
            params.EndTime = document.getElementById("PatientSexEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.ReviewUserName'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Group = 'ReviewUserName'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Order = null;
            var spanReviewUser = document.getElementById("ReviewUser");
            var filters = formCallCenter.DetectFormByElement(spanReviewUser).GetField('ReviewUser_ReviewUserList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.ReviewUserCode in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ') and V_QueryStatisticResults.ReviewTime is not null';
            }
            else {
                params.Where = 'V_QueryStatisticResults.ReviewTime is not null';
            }
            params.Where += " AND V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "PatientAge":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("PatientAgeStartTime").value;
            params.EndTime = document.getElementById("PatientAgeEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'PatientAgeRange'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Group = 'PatientAgeRange'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Order = null;
            params.Where = " V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "FindingUser":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("FindingUserStartTime").value;
            params.EndTime = document.getElementById("FindingUserEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.ModalityName,V_QueryStatisticResults.PatientName,V_QueryStatisticResults.PatientID,V_QueryStatisticResults.PatientSexName,V_QueryStatisticResults.PatientAge,V_QueryStatisticResults.Impression'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Group = 'ModalityName,PatientName,PatientID,PatientSexName,PatientAge,Impression'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Order = null;
            var filters = document.getElementById("FindingUser").value;


            if (filters && filters.length > 0) {
                filters = '%' + filters + '%';
                params.Where = 'Impression like \'' + filters + '\'';
            } else {
                params.Where = '1=1';
            }
            params.Where += "and V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);

            break;
        case "PatientSource":
            params.Name = page;
            params.TimeField = 'V_QueryStatisticResults.ExamRequestTime';
            params.StartTime = document.getElementById("PatientSourceStartTime").value;
            params.EndTime = document.getElementById("PatientSourceEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryStatisticResults';
            params.Select = 'V_QueryStatisticResults.PatientSourceName'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Group = 'PatientSourceName'; //如按天周月年统计，需增加ReviewDayTime,ReviewWeek，ReviewMonth,ReviewYear
            params.Order = null;
            var PatientSource = document.getElementById("PatientSource");
            var filters = formCallCenter.DetectFormByElement(PatientSource).GetField('PatientSource_PatientSourceList');
            if (filters && filters.length > 0) {
                params.Where = 'V_QueryStatisticResults.PatientSourceName in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ') and 1=1';
            }
            else {
                params.Where = '1=1';
            }

            params.Where += "  and V_QueryStatisticResults.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
        case "FollowUp":
            params.Name = page;
            params.TimeField = 'V_QueryWithReportAssign.ExamRequestTime';
            params.StartTime = document.getElementById("FollowUpStartTime").value;
            params.EndTime = document.getElementById("FollowUpEndTime").value;
            if (params.EndTime != "") {
                var enddate = new Date(params.EndTime.replace(/-/g, "/"));
                params.EndTime = new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }
            params.TableName = 'V_QueryWithReportAssign';
            params.Select = "(V_QueryWithReportAssign.ModalityCode+" + "'_'" + "+(case V_QueryWithReportAssign.FollowUpStatus when 'NoNeed' then '不随访' when 'Waiting' then '待随访' when 'Finished' then '已随访' else '' end)) as FollowUpStatus";
            params.Group = "ModalityCode,FollowUpStatus";
            params.Order = "ModalityCode,FollowUpStatus";
            var spanExamType = document.getElementById("ModalityList");
            var FollowUpType = document.getElementById("FollowUpStatus");
            // 影像类型的选择
            var filters = formCallCenter.DetectFormByElement(spanExamType).GetField('ModalityModalityList');
            // 随访状态的选择
            var filtersFollow = formCallCenter.DetectFormByElement(FollowUpType).GetField('FollowUp_FollowUpStatusList');

            if (filters && filters.length > 0) {
                params.Where = 'V_QueryWithReportAssign.ModalityCode in (\'' + filters[0] + '\'';
                for (var i = 1; i < filters.length; i++) {
                    params.Where += ',\'' + filters[i] + '\'';
                }
                params.Where += ')';
            } else {
                params.Where = " 1=1 ";
            }

            if (filtersFollow && filtersFollow.length > 0) {
                params.Where += 'AND V_QueryWithReportAssign.FollowUpStatus in (\'' + filtersFollow[0] + '\'';
                for (var i = 1; i < filtersFollow.length; i++) {
                    params.Where += ',\'' + filtersFollow[i] + '\'';
                }
                params.Where += ')';
            } else {
                params.Where += 'AND V_QueryWithReportAssign.FollowUpStatus in (\'' + 'NoNeed' + '\'' + ',\'' + 'Waiting' + '\'' + ',\'' + 'Finished' + '\'' + ')';
            }
            params.Where += " AND V_QueryWithReportAssign.ModalityCode!=char(85)+char(83)";
            var field = "Statistics_" + page;
            var p0 = {"command": "Statistics", "condFields": field};
            var p1 = {'field': field, "conv": "StaticValueConv(" + params.toJSONString() + ",true)"};
            useroperate(ele, commit, p0, p1);
            break;
    }
}
function ObtainConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function (ele) {
        var tableExcel = document.getElementById(ele.title);
        var rows = tableExcel._rows;
        var columns = tableExcel._columns;
        var Key = new Array();
        var Title = new Array();
        if (columns != null) {
            if (rows[0].Key != columns[0].DisplayText) {
                //  Title[0] = new Array();
                Title[0] = columns[0].DisplayText;
                Title[1] = columns[1].DisplayText;
            }
            for (var i = 0; i < rows.length; i++) {
                Key[i] = new Array();
                Key[i][0] = rows[i].Key.toString();
                Key[i][1] = rows[i].Value.toString();
            }
            return {"ExportType": "xls", "Columns": Title, "Rows": Key}.toJSONString();
        }

    }
}

