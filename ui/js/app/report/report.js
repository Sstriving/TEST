function init(isSetDefaultValue) {
    var reportForm = new ReportForm();
    reportForm.oo(new IdentifiedForm(document.body));

    var titles = {
        GatewayReport: "GatewayReport",
        GatewayFinding: "GatewayFinding",
        GatewayImpression: "GatewayImpression",
        PatientName: "PatientName", //患者姓名 
        PatientNameSpell: "PatientNameSpell", //姓名拼写 
        PatientID: "PatientID", //患者编号 
        SexList: "SexList", //性别列表 
        CurrSexCode: "CurrSexCode", //当前性别代码 
        PatientAge: "PatientAge", //患者年龄值 
        AgeUnitList: "AgeUnitList", //年龄单位列表 
        CurrAgeUnitCode: "CurrAgeUnitCode", //当前年龄单位代码 
        PatientBirthDate: "PatientBirthDate", //患者生日 
        ExamRequestTime: "ExamRequestTime", //检查申请时间 
        ExamDateTime: "ExamDateTime",
        OutPatientNO: "OutPatientNO", //门诊号 
        InHospitalNO: "InHospitalNO", //住院号 
        AreaList: "AreaList", //地域列表 
        CurrArea: "CurrArea", //当前地域 
        OccupationList: "OccupationList", //职业列表 
        WardList: "WardList", //病区列表 
        CurrWard: "CurrWard", //当前病区 
        RoomNO: "RoomNO", //房间号 
        BedNO: "BedNO", //病床号 
        LoginUserCode: "LoginUserCode", //登录用户 
        RegisterUserList: "RegisterUserList", //登记用户列表 
        CurrRegisterUserCode: "CurrRegisterUserCode", //当前登记用户代码 
        ExamUserList: "ExamUserList", //检查用户列表 
        CurrExamUserCode: "CurrExamUserCode", //当前检查用户代码 
        ApplicationDeptList: "ApplicationDeptList", //申请科室列表 
        CurrApplicationDept: "CurrApplicationDept", //当前申请科室 
        ApplicationDoctorList: "ApplicationDoctorList", //申请医生列表 
        CurrApplicationDoctor: "CurrApplicationDoctor", //当前申请医生 
        ExamTypeList: "ExamTypeList", //检查类型列表 
        CurrExamType: "CurrExamType", //当前检查类型 
        MedicalHistoryList: "MedicalHistoryList", //病史列表 
        CurrMedicalHistory: "CurrMedicalHistory", //当前病史 
        ComplainList: "ComplainList", //主诉列表 
        CurrComplain: "CurrComplain", //当前主诉 
        NationalityList: "NationalityList", //民族列表 
        MaritalStatusList: "MaritalStatusList", //婚姻状况列表 
        PatientHeight: "PatientHeight", //患者身高 注：单位cm
        PatientWeight: "PatientWeight", //患者体重 注：单位kg
        MailingAddress: "MailingAddress", //通信地址 
        ZipCode: "ZipCode", //邮编 
        Telephone: "Telephone", //联系电话 
        PatientIDCard: "PatientIDCard", //身份证号 
        PatientSourceList: "PatientSourceList", //患者来源列表 
        CurrPatientSourceCode: "CurrPatientSourceCode", //当前患者来源代码 
        ExamRequestID: "ExamRequestID", //检查编号 
        ReportID: "ReportID", //报告编号 
        ModalityList: "ModalityList", //影像类型列表 
        CurrModalityCode: "CurrModalityCode", //当前影像类型代码 
        EquipmentList: "EquipmentList", //设备列表 
        CurrEquipmentID: "CurrEquipmentID", //当前设备编号 
        CostTypeList: "CostTypeList", //费用类型列表 
        CurrCostType: "CurrCostType", //当前费用类型 
        CostValue: "CostValue", //费用 
        AddAttach: "AddAttach", //添加附件 
        AttachList: "AttachList", //附件UID列表 
        AttachUrl: "AttachUrl", //附件Url 
        AttachWindow: "AttachWindow", //附件调窗
        AttachClip: "AttachClip", //附件剪裁 
        AttachReset: "AttachReset", //附件重置 
        RemoveGroupAttach: "RemoveGroupAttach", //删除附件
        AddItem: "AddItem", //添加项目 
        ItemUIDList: "ItemUIDList", //项目UID列表 
        ItemBodyPartList: "ItemBodyPartList", //项目的部位列表 
        ItemBodyPart: "ItemBodyPart", //项目的部位 
        ItemExamItemList: "ItemExamItemList", //项目的检查项目列表 
        ItemExamItem: "ItemExamItem", //项目的检查项目 
        ItemExamMethodList: "ItemExamMethodList", //目的检查方法列表 
        ItemExamMethod: "ItemExamMethod", //项目的检查方法 
        RemoveItem: "RemoveItem", //删除项目 
        Ext_CurrOccupation: "Ext_CurrOccupation", //当前职业 
        Ext_CurrNationality: "Ext_CurrNationality", //当前民族 
        Ext_CurrMaritalStatusCode: "Ext_CurrMaritalStatusCode", //当前婚姻状况代码 
        Ext_MedicalRecordNO: "Ext_MedicalRecordNO", //病历号 
        Ext_TechnicianNO: "Ext_TechnicianNO", //医技号 
        Ext_ChildrenCount: "Ext_ChildrenCount", //子女数 
        Ext_BodySurfaceArea: "Ext_BodySurfaceArea", //体表面积 
        Ext_LaborInsuranceNO: "Ext_LaborInsuranceNO", //劳保号 
        Ext_DomicileLocation: "Ext_DomicileLocation", //户籍地址 
        Ext_WorkUnit: "Ext_WorkUnit", //单位 
        Ext_BirthCertificateNO: "Ext_BirthCertificateNO", //生育证号 
        ReportUserList: "ReportUserList", //报告用户列表 
        CurrReportUserCode: "CurrReportUserCode", //当前报告用户代码 
        ReportTime: "ReportTime", //报告时间 
        ReviewUserList: "ReviewUserList", //审核用户列表 
        CurrReviewUserCode: "CurrReviewUserCode", //当前审核用户代码 
        ReviewTime: "ReviewTime", //审核时间 
        ExamStatusList: "ExamStatusList", //检查状态列表 
        CurrExamStatusCode: "CurrExamStatusCode", //当前检查状态代码 
        Finding: "Finding", //影像所见 
        Impression: "Impression", //诊断提示 
        BePositive: "BePositive", //阴阳性标志列表 
        CriticalFlagList: "CriticalFlagList", //危急标志列表 
        CurrCriticalFlagCode: "CurrCriticalFlagCode", //当前危急标志代码 
        ICD10List: "ICD10List", //ICD10列表 
        CurrICD10Code: "CurrICD10Code", //当前ICD10代码 
        DoctorAdvice: "DoctorAdvice", //医生建议 
        ReadOnlyMode: "ReadOnlyMode", //只读模式 
        ImageLevelList: "ImageLevelList", //图像等级列表 
        CurrImageLevel: "CurrImageLevel", //当前图像等级 
        ImageLevelRemark: "ImageLevelRemark", //图像等级备注
        ExamRequestReportList: "ExamRequestReportList", //检查报告列表 
        CurrReportExamRequestID: "CurrReportExamRequestID", //当前检查报告编号 
        CloseReport: "CloseReport",
        SaveReport: "SaveReport", //保存报告 
        ReviewReport: "ReviewReport", //审核报告 
        RejectReport: "RejectReport", //驳回报告 
        PrintReport: "PrintReport", //打印报告 
        CaptureImage: "CaptureImage", //采集图像 
        OpenVideoDevice: "OpenVideoDevice", //打开视频设备
        RealTimeImageUrl: "RealTimeImageUrl", //实时图像Url
        CloseVideoDevice: "CloseVideoDevice", //关闭视频设备
        AttachGroupNameList: "AttachGroupNameList", //附件组名称列表
        ReportTempList: "ReportTempList",
        CurrReportTempUID: "CurrReportTempUID",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca",
        VideoDeviceStatusCode: "VideoDeviceStatusCode",
        CurrAttachGroupName: "CurrAttachGroupName",
        HistoryExamRequest: "HistoryExamRequest",
        ShiftReportImage: "ShiftReportImage",
        ExamParamList: "ExamParamList",
        DefaultClip: "DefaultClip",
        CASignatureUrl_Report: "CASignatureUrl_Report",
        CASignatureUrl_Review: "CASignatureUrl_Review",
        Ext_InsuranceCardNO: "Ext_InsuranceCardNO",
        Ext_PACSInstanceCount: "Ext_PACSInstanceCount",
        Additional: "Additional",
        Cover: "Cover",
        ReportLevelList: "ReportLevelList",
        CurrReportLevelCode: "CurrReportLevelCode",
        ReportLevelRemark: "ReportLevelRemark",
        SetReportLevel: "SetReportLevel",
        PreviewTempList: "PreviewTempList",
        ReportCopyAndSeparate: "ReportCopyAndSeparate",
        "23579a1f-acc7-4673-9166-e4eca3fb1315": "23579a1f-acc7-4673-9166-e4eca3fb1315",
        AppDirectory: "23579a1f-acc7-4673-9166-e4eca3fb1315",
        SetFollowUpStatus: "SetFollowUpStatus"
    };

    for (var t in titles) {
        reportForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportModule, reportForm);

    if (!isSetDefaultValue) {
        reportForm.SetField("RightFrontGroupList", [{ 'GroupCode': 'GroupDiagTemp', 'GroupName': '诊断词条' },
            { 'GroupCode': 'GroupSpecialchar', 'GroupName': '特殊字符' }
        ]);
        reportForm.SetField("RightFrontGroup", ["GroupDiagTemp"]);
    }
    reportForm.SetField("PreviewTempList", [{
        "ReportTempUID": "92a6f518-6b5e-410b-8166-b3c122510894",
        "ReportTempUrl": "ui/js/app/yulan/exprot.html",
        "ReportTempName": "exprot"
    }, {
        "ReportTempUID": "92a6f518-6b5e-410b-8166-b3c122510894",
        "ReportTempUrl": "ui/js/app/yulan/exprot.html",
        "ReportTempName": "exprot111"
    }]);
}

function loadAllFields() {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    if (form) form.initAllFields();
}
var ReportForm = function() {
    this.Response = function(self) {
        return function(title, args) {
            switch (title) {
                case "CurrModalityCode":
                    self.SetField(title, args);
                    setTimeout(function() {
                        formCallCenter.RaiseEvent('UnfoldDiagTempFolder', [args[0]]);
                    }, 1000);
                    break;
                case "ItemBodyPart":
                    self.SetField(title, args);
                    if (args[0].BodyPart) {
                        setTimeout(function() {
                            formCallCenter.RaiseEvent('UnfoldDiagTempFolder', [args[0].BodyPart.BodyPartName]);
                        }, 1200);
                    }
                    break;
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    }(this);
    this.Request = function(self) {
        return function(title, args) {
            switch (title) {
                case "ReportTempList":
                    self.Response(title, [{
                        "ReportTempUID": "92a6f518-6b5e-410b-8166-b3c122510894",
                        "ReportTempUrl": "templetes/O/PrintReport/打印（无图）.html",
                        "ReportTempName": "打印（无图）"
                    }, {
                        "ReportTempUID": "02c07c40-ee8c-4af2-ba7b-78a5e423094a",
                        "ReportTempUrl": "templetes/O/PrintReport/打印（有图）.html",
                        "ReportTempName": "打印（有图）"
                    }]);
                    break;
                case "UserCode":
                    self.Response(title, ["UserCode"]);
                    break;
                case "PatientName":
                    self.Response(title, ["张三"]);
                    break;
                case "PatientAge":
                    self.Response(title, ["25"]);
                    break;
                case "ReportTime":
                    self.Response(title, ["2015-12-12 12:12:12"]);
                    break;
                case "ReviewTime":
                    self.Response(title, ["2015-12-13 10:32:32"]);
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
                case "ModalityList":
                    self.Response(title, [{ "ModalityCode": "M", "ModalityName": "CT" }, { "ModalityCode": "F", "ModalityName": "MR" }, { "ModalityCode": "U", "ModalityName": "放2射科" }]);
                    break;
                case "ExamStatusList":
                    self.Response(title, [{ "StatusCode": "M", "StatusName": "CT" }, { "StatusCode": "F", "StatusName": "MR" }, { "StatusCode": "U", "StatusName": "放2射科" }]);
                    break;
                case "CriticalFlagList":
                    self.Response(title, [{ "CriticalFlagCode": "M", "CriticalFlagName": "CT" }, { "CriticalFlagCode": "F", "CriticalFlagName": "MR" }, { "CriticalFlagCode": "U", "CriticalFlagName": "放2射科" }]);
                    break;
                case "ICD10List":
                    self.Response(title, [{ "ICD10Code": "M", "ICD10Name": "CT" }, { "ICD10Code": "F", "ICD10Name": "MR" }, { "ICD10Code": "U", "ICD10Name": "放2射科" }]);
                    break;
                case "ReportUserList":
                    self.Response(title, [{ "UserCode": "M", "UserName": "CT" }, { "UserCode": "F", "UserName": "MR" }, { "UserCode": "U", "UserName": "放2射科" }]);
                    break;
                case "ReviewUserList":
                    self.Response(title, [{ "UserCode": "M", "UserName": "CT" }, { "UserCode": "F", "UserName": "MR" }, { "UserCode": "U", "UserName": "放2射科" }]);
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

function ShowDivPreview() { ShowOrHideDivPreview(true); }

function HideDivPreview() { ShowOrHideDivPreview(false); }

function ShowOrHideDivPreview(show) {
    var ele = document.getElementById('divpreview');
    var arrow = document.getElementById('arrow');
    if (show) {
        ele.style.display = '';
        arrow.style.display = '';
    } else {
        ele.style.display = 'none';
        arrow.style.display = 'none';
    }
}



function ExamItemListConv() {
    Form_ListValueConv.apply(this);

    function UIDFieldName(uid) {
        return "uid_" + uid;
    }
    this.ApplyValue = function(ele, val) {
        var rmvEle = ele.__rmvEle__;
        if (!rmvEle) {
            rmvEle = ele.__rmvEle__ = ele.ownerDocument.createElement("div");
            rmvEle.setAttribute("field", "RemoveItem");
            rmvEle.setAttribute("command", "-");
            rmvEle.setAttribute("conv", "ExamItemListConv.RemoveItemConv");
            ele.appendChild(rmvEle);
        }
        ele = rmvEle;
        for (var i = 0; i < val.length; i++) {
            var uid = val[i];
            var uidField = UIDFieldName(uid);
            if (ele[uidField]) continue;

            var root = document.createElement("div");
            root.style.cssText = "height:30px;"
            if (ele.children.length == 0) {
                ele.appendChild(root);
            } else {
                ele.insertBefore(root, ele.children[0]);
            }

            var root_div0 = document.createElement("div");
            root_div0.style.cssText = "width: 620px; height: 28px; margin-top: 2px; margin-left: 10px; float: left;";
            root.appendChild(root_div0);
            addItem(root_div0, uid);

            var btn = document.createElement("div")
            var imgFileName = "加号.png";
            if (ele.children.length == 1) {
                imgFileName = "加号.png";
                btn.setAttribute("command", "AddItem");
            } else {
                imgFileName = "减号.png";
                btn.setAttribute("command", "RemoveItem");
                btn.setAttribute("field", "Item_" + uid);
                btn.setAttribute("conv", "StaticValueConv('" + uid + "')");
                btn.setAttribute("condFields", "Item_" + uid);
            }
            btn.style.cssText = "background: url(../../../img/" + imgFileName + "); cursor:pointer; background-repeat: no-repeat; background-position: center; height: 28px; width: 30px; margin-top: 2px; float:left;";
            root.appendChild(btn);
            btn.onclick = function(self) { return function() { commit(self); } }(btn);
            ele[uidField] = root;
        }
    }
    var addItem = function(root, itemUID) {
        addBodyPartDiv(root, itemUID);
        addExamItemDiv(root, itemUID);
        addExamMethodDiv(root, itemUID);
    }
    var addBodyPartDiv = function(root, itemUID) {
        var bodyPartDiv = document.createElement('div');
        bodyPartDiv.setAttribute('class', '');
        bodyPartDiv.setAttribute('field', 'ItemBodyPartList');
        bodyPartDiv.setAttribute('command', '-');
        bodyPartDiv.setAttribute('valuemember', 'BodyPartID');
        bodyPartDiv.setAttribute('displaymember', 'BodyPartName');
        bodyPartDiv.setAttribute('itemfield', 'ItemBodyPart');
        bodyPartDiv.setAttribute('itemvaluemember', 'BodyPartID');
        bodyPartDiv.setAttribute('itemdisplaymember', 'BodyPartName');
        bodyPartDiv.setAttribute('conv', 'ExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(bodyPartDiv);
    }
    var addExamItemDiv = function(root, itemUID) {
        var examItemDiv = document.createElement('div');
        examItemDiv.setAttribute('class', '');
        examItemDiv.setAttribute('field', 'ItemExamItemList');
        bodyPartDiv.setAttribute('command', '-');
        examItemDiv.setAttribute('valuemember', 'ExamItemID');
        examItemDiv.setAttribute('displaymember', 'ExamItemName');
        examItemDiv.setAttribute('itemfield', 'ItemExamItem');
        examItemDiv.setAttribute('itemvaluemember', 'ExamItemID');
        examItemDiv.setAttribute('itemdisplaymember', 'ExamItemName');
        examItemDiv.setAttribute('conv', 'ExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(examItemDiv);
    }
    var addExamMethodDiv = function(root, itemUID) {
        var examMethodDiv = document.createElement('div');
        examMethodDiv.setAttribute('class', '');
        examMethodDiv.setAttribute('field', 'ItemExamMethodList');
        bodyPartDiv.setAttribute('command', '-');
        examMethodDiv.setAttribute('valuemember', 'ExamMethodID');
        examMethodDiv.setAttribute('displaymember', 'ExamMethodName');
        examMethodDiv.setAttribute('itemfield', 'ItemExamMethod');
        examMethodDiv.setAttribute('itemvaluemember', 'ExamMethodID');
        examMethodDiv.setAttribute('itemdisplaymember', 'ExamMethodName');
        examMethodDiv.setAttribute('conv', 'ExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(examMethodDiv);
    }
}
ExamItemListConv.RemoveItemConv = function() {
    function UIDFieldName(uid) {
        return "uid_" + uid;
    }
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return true;
        }
    }(this);
    this.ApplyValue = function(ele, val) {
        var uidField = UIDFieldName(val);
        var root = ele[uidField];
        ele[uidField] = null;
        if (root) root.parentNode.removeChild(root);
    }
    this.oo(new Form_SingleValueConv());
}
ExamItemListConv.WritableListConv = function(itemUID, style, maxSize, filter, valueNotObject) {
    Form_ListValueConv.apply(this);
    //filter = true;
    //valueNotObject:集合元素是对象类型（定义了valueMember、displayMember等）还是值类型
    if (!style) style = { 'menu': 'menu', 'dropItem': 'dropItem', 'single': 'singleDropItem', 'first': 'firstDropItem', 'middle': 'middleDropItem', 'last': 'lastDropItem' };
    var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";
    if (!maxSize) maxSize = { 'height': 200 };
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function(srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "WritableListConv.WritableListItemConv(" + itemStyle + "," + itemUID.toJSONString() + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.DetermineApply = function(self) {
        return function(ele, val) {
            var value = val;
            if (val[0]) {
                if (val[0].BodyPartList) value = val[0].BodyPartList;
                else if (val[0].ExamItemList) value = val[0].ExamItemList;
                else if (val[0].ExamMethodList) value = val[0].ExamMethodList;
                else value = val[0];
            }
            return self.CompareValues(value, self.GetValue(ele)) != 0;
        }
    }(this);

    this.DecodeArguments = function(ele, args) {
        if (!args || !valueNotObject) return args;
        var valueMember = ele.getAttribute("valueMember");
        if (!valueMember) valueMember = "__valueMember";
        var displayMember = ele.getAttribute("displayMember");
        if (!displayMember) displayMember = "__displayMember";
        var inputMember = ele.getAttribute("inputMember");
        if (!inputMember) inputMember = "__inputMember";
        var list = [];
        for (var i = 0; i < args.length; i++) {
            var item = args[i];
            list[i] = {};
            if (!item || typeof item[valueMember] == 'undefined') {
                list[i][valueMember] = item;
            } else {
                list[i][valueMember] = item[valueMember];
            }
            if (!item || typeof item[displayMember] == 'undefined') {
                list[i][displayMember] = item;
            } else {
                list[i][displayMember] = item[displayMember];
            }
            if (!item || typeof item[inputMember] == 'undefined') {
                list[i][inputMember] = item;
            } else {
                list[i][inputMember] = item[inputMember];
            }
        }
        return list;
    }
    this.ApplyValue = function(self) {
        return function(ele, value) {
            var val = value;
            if (value[0]) {
                if (value[0].BodyPartList) val = value[0].BodyPartList;
                else if (value[0].ExamItemList) val = value[0].ExamItemList;
                else if (value[0].ExamMethodList) val = value[0].ExamMethodList;
                else val = value[0];
            }
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var inputMember = ele.getAttribute("inputMember");
            if (!inputMember) inputMember = "__inputMember";
            if (!filter) filter = function(data, tester) {
                if (data == tester) return true;
                var lower = tester ? tester.toLowerCase() : tester;
                if (typeof data == "string" && data.toLowerCase().indexOf(lower) > -1) return true;
                if (inputMember && typeof data[inputMember] == "string" && data[inputMember].toLowerCase().indexOf(lower) > -1) return true;
                if (displayMember && typeof data[displayMember] == "string" && data[displayMember].toLowerCase().indexOf(lower) > -1) return true;
                return false;
            }
            var list = ele.__list;
            if (!list) list = ele.__list = [];
            var menu = ele.__menu;
            if (!menu) {
                var doc = Wnd(ele).GetDocument();
                var div = doc.createElement("div");
                css(div).Add(style.dropItem);
                ele.appendChild(div);

                var divInput = doc.createElement("div");
                div.appendChild(divInput);
                var text = doc.createElement("INPUT");
                css(text).Add("dropText");
                divInput.appendChild(text);
                text.type = "text";
                text.onchange = function() {
                    var d = null;
                    if (!text.__currData || text.__currData[displayMember] != text.value) {
                        d = {};
                        d[valueMember] = null;
                        d[displayMember] = text.value;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][displayMember] == text.value) {
                                d = list[i];
                                break;
                            }
                        }
                    } else {
                        d = text.__currData;
                    }
                    if (text.__currData != d) {
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    } else {
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                    }
                }
                text.onkeyup = function() {
                    if (Event().KeyCode() == 13) {
                        menu.Fold();
                        var index = -1;
                        if (typeof filter != 'function') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i][displayMember] == text.value) {
                                    index = i;
                                    break;
                                }
                            }
                        } else {
                            for (var i = 0; i < list.length; i++) {
                                if (filter(list[i], text.value)) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                        if (index > -1) {
                            text.__currData = list[index];
                            Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        } else {
                            var d = {};
                            d[valueMember] = null;
                            d[displayMember] = text.value;
                            text.__currData = d;
                        }
                        changeFieldValue(text);
                    } else {
                        if (typeof filter == 'function') {
                            var items = menu.Items();
                            items.Clear();
                            for (var i = 0; i < list.length; i++) {
                                if (filter(list[i], text.value))
                                    items.Add(list[i]);
                            }
                        } else {
                            filter = function(str, ref) {
                                if (!ref) {
                                    switch (typeof(ref)) {
                                        case "undefined":
                                        case "object":
                                            ref = "";
                                            break;
                                        default:
                                            ref = ref + "";
                                            break;
                                    }
                                } else {
                                    ref = ref + "";
                                }
                                return str == "" || !str || ref.toUpperCase().indexOf(str.toUpperCase()) > -1;
                            }
                            var items = menu.Items();
                            items.Clear();
                            for (var i = 0; i < list.length; i++) {
                                if (filter(list[i][displayMember], text.value) || filter(list[i][valueMember], text.value))
                                    items.Add(list[i]);
                            }
                        }
                        var bounds = { 'x': -1, 'y': div.offsetHeight - 1 };
                        if (maxSize) {
                            bounds.width = maxSize.width;
                            bounds.height = maxSize.height;
                        }
                        menu.Unfold(bounds, { 'offsetY': divInput.offsetHeight });
                        hook();
                    }
                }
                var divDrop = document.createElement("div");
                css(divDrop).Add("dropImage");
                divInput.appendChild(divDrop);

                self.InheritProperties(ele, text);

                menu = ele.__menu = text.__menu = new Menu(div, style, true);
                menu.Fold();

                var mouseOutCall = function(relEle, currEle) {
                    return !menu.InnerElement(currEle);
                };
                var hook = function() {
                    Event.HookMouseOut(div, function(leave) {
                        if (leave) menu.Fold();
                    }, mouseOutCall);
                }
                var unhook = function() {
                    Event.UnhookMouseOut(div);
                }
                var fold = menu.Fold;
                menu.Fold = function() {
                    unhook();
                    fold();
                }
                menu.DrawItem = function(parent, curr, total, index, e) {
                    var data = curr.GetData();
                    e.title = Element(e).setText(data[displayMember]);
                    e.__currData = data;
                    e.onclick = function() {
                        menu.Fold();
                        text.__currData = data;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    return true;
                };
                ele.onclick = function() {
                    var source = Event().Source();
                    if (source != ele && source != div && source != divInput && source != divDrop) return;
                    if (!menu.Unfolded()) {
                        var bounds = { 'x': -1, 'y': div.offsetHeight - 1 };
                        if (maxSize) {
                            bounds.width = maxSize.width;
                            bounds.height = maxSize.height;
                        }
                        if (!menu.Unfolded()) {
                            if (typeof filter == 'function') {
                                var items = menu.Items();
                                items.Clear();
                                for (var i = 0; i < list.length; i++) {
                                    if (filter(list[i], text.value))
                                        items.Add(list[i]);
                                }
                            }
                            var bounds = { 'x': -1, 'y': div.offsetHeight - 1 };
                            if (maxSize) {
                                bounds.width = maxSize.width;
                                bounds.height = maxSize.height;
                            }
                        }
                        menu.Unfold(bounds, { 'offsetY': divInput.offsetHeight });
                        hook();
                    } else {
                        menu.Fold();
                    }
                }
            }
            var len = !val || !val.length ? 0 : val.length;
            list.length = 0;
            for (var i = 0; i < len; i++) {
                list[list.length] = val[i];
            }
            var items = menu.Items();
            var cnt = items.Count();
            var min = len < cnt ? len : cnt;
            var notEquals = min;
            for (var i = 0; i < min; i++) {
                var d1 = items.ItemAt(i).GetData();
                var d2 = val[i];
                if (d1[displayMember] != d2[displayMember] || d1[valueMember] != d2[valueMember]) {
                    notEquals = i;
                    break;
                }
            }
            for (var i = cnt; i > notEquals;) {
                items.RemoveAt(--i);
            }
            for (var i = notEquals; i < len; i++) {
                items.Add(val[i]);
            }
        }
    }(this)
    WritableListConv.WritableListItemConv = function(style, itemUID) {
        Form_SingleValueConv.apply(this);
        this.DetermineApply = function(self) {
            return function(ele, val) {
                return val.ItemUID == itemUID;
            }
        }(this);
        this.ApplyValue = function(ele, value) {
            var val = value;
            if (value.BodyPart) {
                val = value.BodyPart;
                ele.parentNode.parentNode.parentNode.parentNode.__ExamItemBodyPartObject = val;
            } else if (value.ExamItem) val = value.ExamItem;
            else if (value.ExamMethod) val = value.ExamMethod;

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
        this.GetUIValue = function(self) {
            return function(ele) {
                var valueMember = ele.getAttribute("valueMember");
                if (!valueMember) valueMember = "__valueMember";
                var displayMember = ele.getAttribute("displayMember");
                if (!displayMember) displayMember = "__displayMember";
                if (valueNotObject) {
                    return ele.__currData ? ele.__currData[displayMember] : null;
                } else {
                    var mcode = ele.__currData ? ele.__currData[valueMember] : null;
                    var mname = ele.__currData ? ele.__currData[displayMember] : null;
                    var res = {};
                    switch (valueMember) {
                        case "BodyPartID":
                            res = { 'ItemUID': itemUID, 'BodyPart': { 'BodyPartID': mcode, 'BodyPartName': mname } };
                            break;
                        case "ExamItemID":
                            res = { 'ItemUID': itemUID, 'ExamItem': { 'ExamItemID': mcode, 'ExamItemName': mname } };
                            break;
                        case "ExamMethodID":
                            res = { 'ItemUID': itemUID, 'ExamMethod': { 'ExamMethodID': mcode, 'ExamMethodName': mname } };
                            break;
                    }
                    return res.toJSONString();
                }
            }
        }(this);
    }
}

function CloseReportConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        var reportExamRequestIDField = "ReportExamRequestID_" + val.ExamRequestID;
        var param1 = { "command": "CloseReport", "condFields": reportExamRequestIDField + ",CloseReport_" + val.ExamRequestID };
        var param2 = { "field": reportExamRequestIDField, "conv": "StaticValueConv(" + val.ExamRequestID + ")" };
        var param3 = { "field": "CloseReport_" + val.ExamRequestID, "conv": "StaticValueConv(" + (confirm(val.Action) ? "'Save'" : "'Close'") + ")" };
        useroperate(ele, commit, param1, param2, param3);
    }
}

function PatientAgeConv() {
    this.GetUIValue = function(root) {
        var PatientAge = root.children[0].value == null ? "" : root.children[0].value;
        if (PatientAge == "") {
            PatientAge = 0;
        }
        return PatientAge;
    }
    this.ApplyValue = function(ele, val) {
        if (ele.children.length == 0) {
            var input = document.createElement('input');
            input.setAttribute('class', 'inputItemText input-width');
            input.setAttribute('valuechanged', 'valuechanged');
            input.setAttribute('onchange', 'changeFieldValue(this.parentNode)');
            input.setAttribute('style', 'float: left; width: 166px;');
            ele.appendChild(input);
            if (val) {
                if (val.toString() != '0') {
                    input.innerText = val == null ? "" : val;
                }
            }
        } else {
            if (val != null) {
                if (val.toString() != '0')
                    ele.children[0].value = val;
                else
                    ele.children[0].value = "";
            }
        }
    }
    this.oo(new Form_SingleValueConv());
}

//设置“报告保存”按钮的可见性：在“已报告”状态下，若登录用户与报告医生不一致则隐藏“报告保存”按钮
function SetSaveReportButtonVisibilityConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, currExamStatusCode) {
        var btnSaveReport = document.getElementById("btnSaveReport");
        if (btnSaveReport) {
            btnSaveReport.style.visibility = "visible";
            var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
            if (currExamStatusCode == "Reported") {
                if (form.GetField("LoginUserCode") != form.GetField("CurrReportUserCode")) {
                    btnSaveReport.style.visibility = "hidden";
                }
            }
        }
    }
}

function ExamStatusReadOnlyListConv(obj, multi) {
    ReadOnlyListConv.apply(this, arguments);
    this.DecodeArguments = function(ele, args) {
        var list = [];
        for (var i = 0; i < args.length; i++) {
            switch (args[i].StatusName) {
                case "已报告":
                    args[i].StatusName = "<font style='color:#7FFF00'>" + args[i].StatusName + "</font>";
                    list[list.length] = args[i];
                    break;
                case "已审核":
                    args[i].StatusName = "<font style='color:#48D1CC'>" + args[i].StatusName + "</font>";
                    list[list.length] = args[i];
                    break;
                case "已打印":
                    args[i].StatusName = "<font style='color:#DC143C'>" + args[i].StatusName + "</font>";
                    list[list.length] = args[i];
                    break;
                case "已驳回":
                    args[i].StatusName = "<font style='color:#FFC0CB'>" + args[i].StatusName + "</font>";
                    list[list.length] = args[i];
                    break;
                case "已登记":
                    args[i].StatusName = "<font style='color:#FFD700'>" + args[i].StatusName + "</font>";
                    list[list.length] = args[i];
                    break;
                default:
                    args[i].StatusName = args[i].StatusName;
                    list[list.length] = args[i];
                    break;
            }
        }
        return list;
    }
}

function BolPositiveConv(readOnly) {
    Form_SingleValueConv.apply(this);
    //...
    var base_DetermineApply = this.DetermineApply;
    this.DetermineApply = function(self) {
        return function(ele, val) {
            if (typeof(val) == 'object') {
                if (isSetDefaultBolPositive) {
                    self.__userDefaultValueSet = { 'Value': true }
                }
            };
            return true;
        }
    }(this);
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (ele.children.length == 0) {
                var YangSpan = document.createElement("span");
                YangSpan.setAttribute("title", "阳性");
                YangSpan.setAttribute("class", "unselectedItem");
                var YangLable = document.createElement("span");
                YangLable.setAttribute("class", "unselectedLabel");
                var YangText = document.createElement("span");
                YangText.setAttribute("class", "unselectedText");
                YangText.innerHTML = "阳性";

                var YinSpan = document.createElement("span");
                YinSpan.setAttribute("title", "阴性");
                YinSpan.setAttribute("class", "unselectedItem");
                var YinLable = document.createElement("span");
                YinLable.setAttribute("class", "unselectedLabel");
                var YinText = document.createElement("span");
                YinText.setAttribute("class", "unselectedText");
                YinText.innerHTML = "阴性";

                YangSpan.onclick = function() {
                    YangSpan.setAttribute("class", "selectedItem");
                    YangLable.setAttribute("class", "selectedLabel");
                    YangText.setAttribute("class", "selectedText");
                    YinSpan.setAttribute("class", "unselectedItem");
                    YinLable.setAttribute("class", "unselectedLabel");
                    YinText.setAttribute("class", "unselectedText");
                    ele.__currData = "true";
                    changeFieldValue(ele);
                }
                YinSpan.onclick = function() {
                    YinSpan.setAttribute("class", "selectedItem")
                    YinLable.setAttribute("class", "selectedLabel")
                    YinText.setAttribute("class", "selectedText")
                    YangSpan.setAttribute("class", "unselectedItem");
                    YangLable.setAttribute("class", "unselectedLabel");
                    YangText.setAttribute("class", "unselectedText");
                    ele.__currData = "false";
                    changeFieldValue(ele);
                }

                YangSpan.appendChild(YangLable);
                YangSpan.appendChild(YangText);
                ele.appendChild(YangSpan);

                YinSpan.appendChild(YinLable);
                YinSpan.appendChild(YinText);
                ele.appendChild(YinSpan);
            }
            if (val == true) {
                ele.children[0].setAttribute("class", "selectedItem");
                ele.children[0].children[0].setAttribute("class", "selectedLabel");
                ele.children[0].children[1].setAttribute("class", "selectedText");
                ele.children[1].setAttribute("class", "unselectedItem");
                ele.children[1].children[0].setAttribute("class", "unselectedLabel");
                ele.children[1].children[1].setAttribute("class", "unselectedText");
            } else if (val == false) {
                ele.children[1].setAttribute("class", "selectedItem")
                ele.children[1].children[0].setAttribute("class", "selectedLabel")
                ele.children[1].children[1].setAttribute("class", "selectedText")
                ele.children[0].setAttribute("class", "unselectedItem");
                ele.children[0].children[0].setAttribute("class", "unselectedLabel");
                ele.children[0].children[1].setAttribute("class", "unselectedText");
            } else {
                ele.children[1].setAttribute("class", "unselectedItem")
                ele.children[1].children[0].setAttribute("class", "unselectedLabel")
                ele.children[1].children[1].setAttribute("class", "unselectedText")
                ele.children[0].setAttribute("class", "unselectedItem");
                ele.children[0].children[0].setAttribute("class", "unselectedLabel");
                ele.children[0].children[1].setAttribute("class", "unselectedText");
            }
            //...
            if (self.__userDefaultValueSet) {
                if (isSetDefaultBolPositive) {
                    var form = formCallCenter.DetectFormByElement(ele);
                    var value = self.__userDefaultValueSet.Value;
                    self.__userDefaultValueSet = null;
                    form.SetField(ele.getAttribute("field"), [value], true);
                }
            }
        }
    }(this);
    this.GetUIValue = function(ele) {
        return ele.__currData;
    }
}

function PrintExamMethod() {
    Form_ListValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (ele.children.length == 0) {
            var bodyPartDiv = document.createElement('div');
            bodyPartDiv.setAttribute('field', 'ItemExamMethod');
            bodyPartDiv.setAttribute('valuemember', 'ExamMethodID');
            bodyPartDiv.setAttribute('displaymember', 'ExamMethodName');
            bodyPartDiv.setAttribute('command', '-');
            bodyPartDiv.setAttribute('conv', 'ExamMethodNameConv()');
            ele.appendChild(bodyPartDiv);




        }
    }
}

function ExamMethodNameConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        var count = 1;
        var add = true;
        if (ele.__ItemUID) {
            ele.__ItemUID += "," + val.ItemUID;
        } else {
            ele.__ItemUID = val.ItemUID + "";
        }
        var UID = ele.__ItemUID.split(",");
        if (UID.length > 1) {
            for (var i = 0; i < UID.length; i++) {
                if (UID[i] == val.ItemUID) {
                    if (count >= 2) {
                        add = false;
                    }
                    count++;
                }
            }
        }
        if (add) {
            if (ele.__bodyExamMethodName && val.ExamMethod.ExamMethodName != '未定义') {
                ele.__bodyExamMethodName += "," + val.ExamMethod.ExamMethodName;
            } else {
                ele.__bodyExamMethodName = val.ExamMethod.ExamMethodName == '未定义' ? '' : val.ExamMethod.ExamMethodName;
            }
            ele.innerText = ele.__bodyExamMethodName;
            if (ele.__bodyExamMethodName.length > 40) {
                ele.parentNode.parentNode.setAttribute("class", "printbodyInfo");
            }
        }
    }
    this.GetUIValue = function(ele) {
        return ele.__bodyExamMethodName;
    }
}

function PrintBodyPart() {
    Form_ListValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (ele.children.length == 0) {
            var bodyPartDiv = document.createElement('div');
            bodyPartDiv.setAttribute('field', 'ItemBodyPart');
            bodyPartDiv.setAttribute('valuemember', 'BodyPartID');
            bodyPartDiv.setAttribute('displaymember', 'BodyPartName');
            bodyPartDiv.setAttribute('command', '-');
            bodyPartDiv.setAttribute('conv', 'BodyPartNameConv()');
            ele.appendChild(bodyPartDiv);
        }
    }
}

function BodyPartNameConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        var count = 1;
        var add = true;
        if (ele.__ItemUID) {
            ele.__ItemUID += "," + val.ItemUID
        } else {
            ele.__ItemUID = val.ItemUID + "";
        }
        var UID = ele.__ItemUID.split(",");
        if (UID.length > 1) {
            for (var i = 0; i < UID.length; i++) {
                if (UID[i] == val.ItemUID) {
                    if (count >= 2) {
                        add = false;
                    }
                    count++;
                }
            }
        }
        if (add) {
            if (ele.__bodyPartName) {
                ele.__bodyPartName += "," + val.BodyPart.BodyPartName;
            } else {
                ele.__bodyPartName = val.BodyPart.BodyPartName;
            }
            ele.innerText = ele.__bodyPartName;
            if (ele.__bodyPartName.length > 40) {
                ele.parentNode.parentNode.setAttribute("class", "printbodyInfo");
            }
        }
    }
    this.GetUIValue = function(ele) {
        return ele.__bodyPartName;
    }
}

function GatewayConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (val != null) {
            if (val.trim() != "") {
                ele.innerHTML = val;
                document.getElementById("FloatDiv").style.display = "block";
            } else {
                ele.innerHTML = "";
            }
        }
    }
    this.GetUIValue = function(ele) {}
}

function HiddenDiv() {
    document.getElementById("FloatDiv").style.display = "none";
}

function ShowDiv() {
    var param = {
        "command": "GatewayReport",
        "condFields": "CurrReportExamRequestID"
    };
    usercommit(Event.Source(), param);
    document.getElementById("FloatDiv").style.display = "block";
}

function ShowNoticeConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (!val) return;
        //if (val.indexOf("报告保存成功") > 0) return;
        //if (val.indexOf("报告审核成功") > 0) return;
        //if (val.indexOf("CA签名成功") > 0) return;
        alert(val);
    }
}

function ReportLevelShow() {
    var reportLevel = document.getElementById("ReportLevel");
    if (reportLevel.style.display == "block") {
        reportLevel.style.display = "none";
        document.getElementById("Remark").value = "";
        var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
        form.SetField('CurrReportLevelFilters', [""]);
    } else {
        reportLevel.style.display = "block"
    }
}

function ReportLevelHide() {
    document.getElementById("ReportLevel").style.display = "none";
    document.getElementById("Remark").value = "";
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    form.SetField('CurrReportLevelFilters', [""]);
}

function SetReportLevelConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function(ele) {
        var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
        var reportLevelCode = form.GetField('CurrReportLevelFilters');
        var remark = document.getElementById("Remark").value;
        return { "ReportLevelCode": reportLevelCode, "ReportLevelRemark": remark }.toJSONString();
    }
}

function CheckBolPositiveAndSaveReport(e) {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    var p = form.GetField("BePositive");
    if (p == null) {
        alert("请选择阴阳性！");
        return;
    }
    commit(e);
}

function YunYingPDFConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        ele.href = val;
    }
}

function setYunYingPDFLink(ele) {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    var examRequestId = form.GetField("ExamRequestID");
    //修改url的IP和端口，GatewayID的值，
    var url = 'http://192.168.21.243/DGWWebService/PDFReport/GetPDFReport.aspx?GatewayID=029_3&ExamRequestID=' + examRequestId;
    form.SetField(ele.getAttribute("field"), [url]);
}

/************开始：申请单相关内容**************/
function OpenApplication() {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    var eleOfArgs = document.getElementById("ArgsOfApplication");
    var attachURLs = eleOfArgs.getAttribute("AttachURLs");
    if (attachURLs) {
        /****窗口布局：全屏****/
        var h = screen.height;
        var w = screen.width;
        /****窗口布局：右下角****/
        // var h = 670;
        // var w = 820;
        var left = screen.width - w;
        var top = screen.height - h;
        var opt = "dialogHeight:" + h + "px; dialogWidth:" + w + "px; dialogLeft:" + left + "px; dialogTop:" + top + "px;" +
            "status:no; scroll:no; resizable:no;";
        window.showModelessDialog("application.html?AttachURLs=" + attachURLs, window, opt);
    } else {
        alert("该检查没有申请单");
    }
}

function ApplicationConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (!val.GroupName) {
            if (val.AttachList.count() > 0) {
                var attachURLs = new Array();
                for (var i = 0; i < val.AttachList.length; i++) {
                    attachURLs.push(val.AttachList[i].AttachUrl);
                }
                ele.setAttribute("AttachURLs", attachURLs.join(","));
            } else {
                ele.setAttribute("AttachURLs", null);
            }
        }
    }
}
/************结束：申请单相关内容**************/

ExamRequestRISPrintConvMgr = function(groupName, layout, readOnly) {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        if (val["GroupName"] != groupName) return;
        var form = new Form(document.body);
        var appFolder = form.GetField("AppDirectory");
        if (!ele.__apply) {
            var e = document.createElement("div");
            e.setAttribute("field", "RemoveGroupAttach");
            e.setAttribute("command", "-");
            e.setAttribute("conv", "ExamRequestConvMgr.RemoveExamRequestAttach_SysConv");
            ele.appendChild(e);
            ele.__apply = true;
        }
        ele = ele.children[0];
        val = val["AttachList"];
        //导出PDF用来去除无效图片

        while (ele.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            ele.removeChild(ele.firstChild);
        }

        for (var i = 0; i < val.length; i++) {
            var attach = val[i];
            var div = null;
            var cnt = ele.children.length;
            var uid = attach.AttachUID;
            for (var j = 0; j < cnt; j++) {
                if (ele.children[j].__bindedData.AttachUID == uid) {
                    div = ele.children[j];
                    break;
                }
            }
            var img = null;
            if (!div) {
                if (!attach.Report) continue;
                var shiftReportImageField = "ShiftReportImage_" + uid;
                div = ele.ownerDocument.createElement("div");
                div.__bindedData = attach;
                div.style.position = "absolute";
                div.style.overflow = "hidden";
                div.style.display = "inline-block";
                div.style.textAlign = "center";

                img = ele.ownerDocument.createElement("img");
                img.style.verticalAlign = "middle";
                img.setAttribute("field", shiftReportImageField);
                img.setAttribute("command", "ShiftReportImage");
                img.setAttribute("condFields", shiftReportImageField);
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + {
                    "GroupName": groupName,
                    "AttachUID": uid
                }.toJSONString() + "')");

                if (!readOnly) {
                    var rmv = ele.ownerDocument.createElement("div");
                    rmv.style.top = "0px";
                    rmv.style.position = "absolute";
                    rmv.style.cursor = "pointer";
                    rmv.style.backgroundColor = "black";
                    rmv.style.color = "white";
                    rmv.style.fontSize = "15px";
                    rmv.style.width = "20px";
                    rmv.innerHTML = "X";
                    rmv.title = "移除报告图像";
                    rmv.onclick = function(i) {
                        return function() {
                            if (confirm("是否移除此报告图片")) commit(i);
                        }
                    }(img);
                }

                div.appendChild(img);
                if (!readOnly) {
                    div.appendChild(rmv);
                } else {
                    var lineHolder = ele.ownerDocument.createElement("span");
                    lineHolder.style.height = "100%";
                    lineHolder.style.verticalAlign = "middle";
                    lineHolder.style.display = "inline-block";
                    div.appendChild(lineHolder);
                }

                ele.appendChild(div);
                img.onload = function(i) {
                    return function() {
                        new ui(i).FitView();
                    }
                }(img);
                var urlParams = ParseUrl(attach.AttachUrl);
                var src0 = "file:///" + appFolder + "\\ImageCache\\Capture\\" + form.GetField("CurrReportExamRequestID") + "\\ReportImage\\" + urlParams.Parameters.uid + ".jpg?" + Math.random()
                img.__src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
                img.onerror = function() {
                    if (this.src != this.__src) this.src = this.__src;
                }
                img.onload = function() {
                    delete this.__src;
                }
                img.src = src0
            } else {
                if (!attach.Report) {
                    ele.removeChild(div);
                } else {
                    img = div.children[0];
                    var urlParams = ParseUrl(attach.AttachUrl);
                    var src0 = "file:///" + appFolder + "\\ImageCache\\Capture\\" + form.GetField("CurrReportExamRequestID") + "\\ReportImage\\" + urlParams.Parameters.uid + ".jpg?" + Math.random()
                    img.__src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
                    img.onerror = function() {
                        if (this.src != this.__src) this.src = this.__src;
                    }
                    img.onload = function() {
                        delete this.__src;
                    }
                    img.src = src0
                }
            }
        }
        var cnt = ele.children.length;
        var rows = layout && layout.rows ? layout.rows : 3;
        var cols = layout && layout.cols ? layout.cols : 8;
        rows = parseInt((cnt + cols - 1) / cols, 10);
        cols = rows == 1 ? cnt : cols;
        ele.style.height = (240 * rows) + "px";
        var index = 0;
        for (var r = 0; r < rows - 1; r++) {
            for (var c = 0; c < cols; c++) {
                div = ele.children[index++];
                div.style.width = 100 / cols + "%";
                div.style.height = 100 / rows + "%";
                div.style.left = (100 / cols) * parseInt(index % cols, 10) + "%";
                div.style.top = (100 / rows) * r + "%";
                new ui(div.children[0]).FitView();
            }
        }
        var offset = (cols - cnt + index) * 100 / 2 / cols;
        for (; index < cnt; index++) {
            div = ele.children[index];
            div.style.width = 100 / cols + "%";
            div.style.height = 100 / rows + "%";
            div.style.left = (100 / cols) * parseInt(index % cols, 10) + offset + "%";
            div.style.top = (100 / rows) * (rows - 1) + "%";
            new ui(div.children[0]).FitView();
        }
    }
}

//日期精确到天
function DateVisibleOnlyConv() {
    Form_SingleValueConv.apply(this);
    this.CompareValues = function(val1, val2) {
        return 1;
    }
    this.ApplyValue = function(ele, val) {
        var dt = parseDateTime(val);
        ele.__dt = dt;
        ele.value = dt[0];
    }
    this.GetUIValue = function(ele) {
        var dt = parseDateTime(ele.value);
        if (ele.__dt) {
            return dt[0] + " " + ele.__dt[1];
        } else {
            return dt[0];
        }
    }

    function parseDateTime(dt) {
        if (!dt) return ["", ""];
        return dt.split(" ");
    }
}

function ChangFindingAndImpression() {
    var changFinding = document.getElementById("changFinding");
    changeFieldValue(changFinding);
    var changImpression = document.getElementById("changImpression");
    changeFieldValue(changImpression);
}

//已驳回操作成功后默认删除报告分配信息，若不需要则注释下面的usercommit即可
function AfterRejectReport() {
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!val) return;
            switch (val.ErrorCode) {
                case "0000":
                    {
                        var param = {
                            "command": "NotifyTitle",
                            "field": "cmd_ReportAssignModule",
                            "condFields": "cmd_ReportAssignModule,f_NotifyDataType,CurrReportExamRequestID",
                            "conv": "StaticValueConv(\"DeleteReportAssign\")"
                        };
                        usercommit(ele, param);
                    }
                    break;
            }
        }
    }(this);
    this.oo(new Form_SingleValueConv());
}

/************开始：设置随访状态相关内容**************/
function SetFollowUpStatus(ele, status) {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    form.requestData("LoadReportFollowUp", null);

    var tmpField = "FollowUpStatus_" + status;
    var param1 = {
        "command": "NotifyTitle",
        "field": "cmd_ReportModule",
        "condFields": "cmd_ReportModule,f_NotifyDataType," + tmpField,
        "conv": "StaticValueConv(\"SetFollowUpStatus\")"
    };
    var param2 = { "field": tmpField, "conv": "StaticValueConv('" + status + "')" };
    useroperate(ele, commit, param1, param2);
}

function ShowOrHideFollowUpStatus(visible) {
    var div = document.getElementById("Div_SetFollowUpStatus");
    var arrow = document.getElementById("Arrow_FollowUpStatus");
    if (visible === false) {
        div.style.display = "none";
        arrow.style.display = "none";
    } else {
        div.style.display = "";
        arrow.style.display = "";
    }
}
/************结束：设置随访状态相关内容**************/