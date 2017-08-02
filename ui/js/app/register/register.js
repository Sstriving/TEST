function init() {
    var registerForm = new RegisterForm();
    registerForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "RetrieveID": "RetrieveID", //检索号
        "HISExamRequestList": "HISExamRequestList", //HIS检查申请列表
        "ApplyHISExamRequest": "ApplyHISExamRequest", //应用HIS检查
        "HISExamItemMappingConfig": "HISExamItemMappingConfig", //Mapping配置
        "PatientName": "PatientName", //患者姓名
        "PatientNameSpell": "PatientNameSpell", //姓名拼写
        "PatientID": "PatientID", //患者编号
        "SexList": "SexList", //性别列表
        "CurrSexCode": "CurrSexCode", //当前性别代码
        "PatientAge": "PatientAge", //患者年龄值
        "AgeUnitList": "AgeUnitList", //年龄单位列表
        "CurrAgeUnitCode": "CurrAgeUnitCode", //当前年龄单位代码
        "PatientBirthDate": "PatientBirthDate", //患者生日
        "ExamRequestTime": "ExamRequestTime", //检查申请时间
        "OutPatientNO": "OutPatientNO", //门诊号
        "InHospitalNO": "InHospitalNO", //住院号
        "AreaList": "AreaList", //地域列表
        "CurrArea": "CurrArea", //当前地域
        "OccupationList": "OccupationList", //职业列表
        "Ext_CurrOccupation": "Ext_CurrOccupation", //当前职业
        "WardList": "WardList", //病区列表
        "CurrWard": "CurrWard", //当前病区
        "RoomNO": "RoomNO", //房间号
        "BedNO": "BedNO", //病床号
        "LoginUserCode": "LoginUserCode", //登录用户
        "RegisterUserList": "RegisterUserList", //登记用户列表
        "CurrRegisterUserCode": "CurrRegisterUserCode", //当前登记用户代码
        "ExamUserList": "ExamUserList", //检查用户列表
        "CurrExamUserCode": "CurrExamUserCode", //当前检查用户代码
        "CriticalFlagList": "CriticalFlagList", //危急标志列表
        "CurrCriticalFlagCode": "CurrCriticalFlagCode", //当前危急标志代码
        "ApplicationDeptList": "ApplicationDeptList", //申请科室列表
        "CurrApplicationDept": "CurrApplicationDept", //当前申请科室
        "ApplicationDoctorList": "ApplicationDoctorList", //申请医生列表
        "CurrApplicationDoctor": "CurrApplicationDoctor", //当前申请医生
        "ExamTypeList": "ExamTypeList", //检查类型列表
        "CurrExamType": "CurrExamType", //当前检查类型
        "MedicalHistoryList": "MedicalHistoryList", //病史列表
        "CurrMedicalHistory": "CurrMedicalHistory", //当前病史
        "ComplainList": "ComplainList", //主诉列表
        "CurrComplain": "CurrComplain", //当前主诉
        "NationalityList": "NationalityList", //民族列表
        "Ext_CurrNationality": "Ext_CurrNationality", //当前民族
        "MaritalStatusList": "MaritalStatusList", //婚姻状况列表
        "Ext_CurrMaritalStatusCode": "Ext_CurrMaritalStatusCode", //当前婚姻状况代码
        "PatientHeight": "PatientHeight", //患者身高
        "PatientWeight": "PatientWeight", //患者体重
        "MailingAddress": "MailingAddress", //通信地址
        "ZipCode": "ZipCode", //邮编
        "Telephone": "Telephone", //联系电话
        "PatientIDCard": "PatientIDCard", //身份证号
        "PatientSourceList": "PatientSourceList", //患者来源列表
        "CurrPatientSourceCode": "CurrPatientSourceCode", //当前患者来源代码
        "ExamItemCodeList": "ExamItemCodeList", //项目代码列表
        "ModalityList": "ModalityList", //影像类型列表
        "CurrModalityCode": "CurrModalityCode",
        "AddExamRequest": "AddExamRequest", //添加检查
        "ExamRequestUIDList": "ExamRequestUIDList", //检查UID列表
        "ExamRequestID": "ExamRequestID", //检查编号
        "ExamRequestModalityList": "ExamRequestModalityList", //检查的影像类型列表
        "ExamRequestModalityCode": "ExamRequestModalityCode", //检查的影像类型代码
        "ExamRequestEquipmentList": "ExamRequestEquipmentList", //检查的设备列表
        "ExamRequestEquipmentID": "ExamRequestEquipmentID", //检查的设备编号
        "ExamRequestScheduleTime": "ExamRequestScheduleTime", //检查的预约时间
        "ExamRequestPrintTicket": "ExamRequestPrintTicket", //检查的打印小票标记
        "ExamRequestCostTypeList": "ExamRequestCostTypeList", //检查费用类型列表
        "ExamRequestCostType": "ExamRequestCostType", //检查费用类型
        "ExamRequestCostValue": "ExamRequestCostValue", //检查费用
        "RemoveExamRequest": "RemoveExamRequest", //删除检查
        "AddExamRequestAttach": "AddExamRequestAttach", //添加检查附件
        "ExamRequestAttachUIDList": "ExamRequestAttachUIDList", //检查的附件UID列表
        "ExamRequestAttachUrl": "ExamRequestAttachUrl", //检查项目的附件Url
        "RemoveExamRequestAttach": "RemoveExamRequestAttach", //删除检查附件
        "AddExamRequestItem": "AddExamRequestItem", //添加检查项目
        "ExamRequestItemUIDList": "ExamRequestItemUIDList", //检查的项目UID列表
        "ExamRequestItemBodyPartList": "ExamRequestItemBodyPartList", //检查项目的部位列表
        "ExamRequestItemBodyPart": "ExamRequestItemBodyPart", //检查项目的部位编号
        "ExamRequestItemExamItemList": "ExamRequestItemExamItemList", //检查项目的项目列表
        "ExamRequestItemExamItem": "ExamRequestItemExamItem", //检查项目的项目编号
        "ExamRequestItemExamMethodList": "ExamRequestItemExamMethodList", //检查项目的检查方法列表
        "ExamRequestItemExamMethod": "ExamRequestItemExamMethod", //检查项目的检查方法编号
        "RemoveExamRequestItem": "RemoveExamRequestItem", //删除检查项目
        "HistoryExamRequestList": "HistoryExamRequestList", //历史检查列表
        "ApplyExamRequestID": "ApplyExamRequestID", //当前历史检查编号
        "Register": "Register", //登记检查
        "Ext_InsuranceCardNO": "Ext_InsuranceCardNO",
        "Ext_MedicalRecordNO": "Ext_MedicalRecordNO", //病历号
        "Ext_TechnicianNO": "Ext_TechnicianNO", //医技号
        "Ext_ChildrenCount": "Ext_ChildrenCount", //子女数
        "Ext_BodySurfaceArea": "Ext_BodySurfaceArea", //体表面积
        "Ext_LaborInsuranceNO": "Ext_LaborInsuranceNO", //劳保号
        "Ext_DomicileLocation": "Ext_DomicileLocation", //户籍地址
        "Ext_WorkUnit": "Ext_WorkUnit", //单位
        "Ext_ReservedData": "Ext_ReservedData",
        "BirthCertificateNO": "BirthCertificateNO", //生育证号
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        "LoadReport": "LoadReport",
        "FormBounds": "FormBounds",
        "CurrExamRequestID": "CurrExamRequestID",
        "RightFrontGroupList": "RightFrontGroupList",
        "RightFrontGroup": "RightFrontGroup",
        "ExamRequestGroup": "ExamRequestGroup",
        "ExamRequestGroupList": "ExamRequestGroupList",
        "ICReadCard": "ICReadCard",
        "ResetForm": "ResetForm",
        "RegisterMode": "RegisterMode",
        "CHANGETOSCHEDULE": "CHANGETOSCHEDULE",

        "ExamRequestData": "ExamRequestData"
    };
    for (var t in titles) {
        registerForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.RegisterModule, registerForm);
    registerForm.SetField("RightFrontGroupList", [{ 'GroupCode': 'GroupRegister', 'GroupName': '登记' },
        { 'GroupCode': 'GroupSearch', 'GroupName': '查询' }
    ]);
    registerForm.SetField("RightFrontGroup", ["GroupRegister"]);

    registerForm.SetField("ExamRequestGroupList", [{ 'GroupCode': 'HisPatientList', 'GroupName': 'HIS信息' },
        { 'GroupCode': 'HistoryExamRequestList', 'GroupName': '历史记录' }
    ]);
    registerForm.SetField("ExamRequestGroup", ["HistoryExamRequestList"]);
    //registerForm.SetField("PatientName", [""],true);
}

function CleareRetirveId(eleID) {
    document.getElementById(eleID).value = "";
}

function RegisterForm() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                case "PatientAge":
                case "CurrAgeUnitCode":
                    self.SetField(title, args);
                    setTimeout(syncBirthDate, 100);
                    break;
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    }(this);
    var syncBirthDate = function(self) {
        return function() {
            var birthDate = self.GetField("PatientBirthDate");
            var age = self.GetField("PatientAge");
            if (birthDate && birthDate != "" && age && age != "") return;
            if (!age || age == "") {
                self.Response("PatientBirthDate", [null], true);
            } else {
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                switch (self.GetField("CurrAgeUnitCode")) {
                    case "M":
                        m -= age;
                        break;
                    case "W":
                        d -= age * 7;
                        break;
                    case "D":
                        d -= age;
                        break;
                    case "H":
                        m -= 0;
                        break;
                    case "Y":
                    default:
                        y -= age;
                        break;
                }
                date = new Date(y, m - 1, d);
                y = date.getFullYear();
                m = date.getMonth() + 1;
                d = date.getDate();
                self.SetField("PatientBirthDate", [y + "-" + m + "-" + d], true);
            }
        }
    }(this);
    this.Request = function(self) {
        return function(title, args) {
            switch (title) {
                case "UserCode":
                    self.Response(title, ["UserCode"]);
                    break;
                case "SexList":
                    self.Response(title, [{ "SexCode": "M", "SexName": "男" }, { "SexCode": "F", "SexName": "女" }, { "SexCode": "U", "SexName": "未定义" }]);
                    break;
                case "AgeUnitList":
                    self.Response(title, [{ "AgeUnitCode": "Y", "AgeUnitName": "岁" }, { "AgeUnitCode": "M", "AgeUnitName": "月" }, { "AgeUnitCode": "D", "AgeUnitName": "天" }]);
                    break;
                case "PatientSourceList":
                    self.Response(title, [{ "PatientSourceCode": "M", "PatientSourceName": "门诊" }, { "PatientSourceCode": "F", "PatientSourceName": "住院" }, { "PatientSourceCode": "U", "PatientSourceName": "体检" }]);
                    break;
                case "ApplicationDeptList":
                    self.Response(title, [{ "DeptID": "M", "DeptName": "外科" }, { "DeptID": "F", "DeptName": "内科" }, { "DeptID": "U", "DeptName": "放射科" }]);
                    break;
                case "ApplicationDoctorList":
                    self.Response(title, [{ "DoctorID": "M", "DoctorName": "额外任务二" }, { "DoctorID": "F", "DoctorName": "玩儿" }, { "DoctorID": "U", "DoctorName": "放射科" }]);
                    break;
                case "ComplainList":
                    self.Response(title, [{ "ComplainName": "额外任务二" }, { "ComplainName": "玩儿" }, { "ComplainName": "放射科" }]);
                    break;
                case "ApplicationModalityList":
                    self.Response(title, [{ "ModalityCode": "M", "ModalityName": "CT" }, { "ModalityCode": "F", "ModalityName": "MR" }, { "ModalityCode": "U", "ModalityName": "放2射科" }]);
                    break;
                case "ApplicationDeviceList":
                    self.Response(title, [{ "DeviceID": "M", "DeviceName": "CT01" }, { "DeviceID": "F", "DeviceName": "MR01" }, { "DeviceID": "U", "DeviceName": "放2射科1" }]);
                    break;
                case "BodyPartList":
                    self.Response(title, [{ "BodyPartID": "M", "BodyPartName": "CT01" }, { "BodyPartID": "F", "BodyPartName": "MR01" }, { "BodyPartID": "U", "BodyPartName": "放2射科1" }]);
                    break;
                case "ExamRequestReportList":
                    self.Response(title, [{ "ExamRequestID": "1", "ReportDesc": "男" }, { "ExamRequestID": "2", "ReportDesc": "女" }, { "ExamRequestID": "3", "ReportDesc": "未定义" }]);
                    break;
                case "SearchResultRows":
                    self.Response(title, [{ "ExamRequestID": "1", "PatientName": "张三", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "2", "PatientName": "张三", "PatientSex": "女", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }, { "ExamRequestID": "3", "PatientName": "李四", "PatientSex": "男", "PatientAge": "20", "ExamRequestTime": "2010-01-05", "PatientBirthDate": "2010-08-07", "ZipCode": "4517" }]);
                    break;
                case "LoadReisger":
                    self.SetField("PatientID", ["4"]);
                    break;
                case "AttachUIDList":
                    self.SetField(title, ["C:\Users\Public\Pictures\Sample Pictures\菊花.jpg"]);
                default:
                    break;
            }
        }
    }(this);
}

function MessageWindow(duration){
    this.ApplyValue = function(ele, val) {
        var div=ele.__div;
        if(!div){
                div=ele.__div = document.createElement('div');
                div.setAttribute('class', 'messageWindow');
                document.body.appendChild(div);
                var divHeader=document.createElement('div');
                divHeader.innerHTML="申请信息如下：<hr/><p/>";
                divHeader.style.fontSize="32pt"
                div.appendChild(divHeader);
                var btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('class', 'messageWindow-btn');
                btn.value="确定";
                div.onclick = function(){
                    var e=Event.Source();
                    if(e&&e.tagName=='INPUT'){
                        this.style.display="none"
                    }
                };
                div.appendChild(btn);
                div.__content='';
                div.__header=divHeader.outerHTML;
                div.__footer=btn.outerHTML;
        }
        if (div.style.display=='') {
            div.__content+="<table style='width:100%'><tr><td align='right' style='width:50%'>患者姓名:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.PatientName+"</td></tr><tr><td align='right' style='width:50%'>患者编号:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.PatientID+"</td></tr><tr><td align='right' style='width:50%'>AccessionNO:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.AccessionNO+"</td></tr><tr><td align='right' style='width:50%'>影像类型:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.ModalityName+"</td></tr><tr><td align='right' style='width:50%'>设备名称:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.DeviceName+"</td></tr></table><p/>";
        }
        else{
            div.__content="<table style='width:100%'><tr><td align='right' style='width:50%'>患者姓名:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.PatientName+"</td></tr><tr><td align='right' style='width:50%'>患者编号:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.PatientID+"</td></tr><tr><td align='right' style='width:50%'>AccessionNO:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.AccessionNO+"</td></tr><tr><td align='right' style='width:50%'>影像类型:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.ModalityName+"</td></tr><tr><td align='right' style='width:50%'>设备名称:</td><td align='left' style='width:50%'>&nbsp;&nbsp;&nbsp;&nbsp;"+val.DeviceName+"</td></tr></table><p/>";
            div.style.display="";
        }
        div.innerHTML=div.__header+div.__content+div.__footer;
    }
    this.oo(new Form_SingleValueConv());
}