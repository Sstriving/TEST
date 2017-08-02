var init = function () {
    var reportFollowUpForm = new ReportFollowUpForm();
    reportFollowUpForm.oo(new IdentifiedForm(document.body));

    var titles = {
        ExamRequestID: "ExamRequestID",
        ReportFollowUpList:"ReportFollowUpList",
        LoadReportFollowUp:"LoadReportFollowUp",
        SaveReportFollowUp:"SaveReportFollowUp",
        UserList:"UserList",
        SelectedUserCode:"SelectedUserCode",
        NotifyTitle: "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };

    for (var t in titles) {
        reportFollowUpForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.ReportFollowUpModule, reportFollowUpForm);

    LoadReportFollowUp(true);
}

var ReportFollowUpForm = function () {
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

function LoadReportFollowUp(isNew,followUpID){
    ShowOperateTip(isNew,followUpID);

    var param = {};
    param.field = param.condFields = "LoadReportFollowUp_" + Math.random();
    param.command = "LoadReportFollowUp";
    param.conv =  "ReportConvMgr.DefaultConstValueConverter('" + followUpID + "')";
    var ele = document.getElementById('ReportFollowUpID');
    usercommit(ele, param);
}

function LoadReportFollowUpConv(){
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (ele, val) {
        if(val.ReportFollowUpID === null) ShowOperateTip(true);
        document.getElementById('ReportFollowUpID').value = val.ReportFollowUpID;
        document.getElementById('FollowUpData').value = new Date(Date.parse(val.FollowUpData.replace(/-/g, "/"))).Format("yyyy-MM-dd");
        document.getElementById('FollowUpContent').value = val.FollowUpContent;
        var form = formCallCenter.GetFormByID(window.FormIDs.ReportFollowUpModule);
        form.SetField('SelectedUserCode', [val.FollowUpUserCode]);
    }
}

function SaveReportFollowUp(ele){
    var followUpID = document.getElementById('ReportFollowUpID').value;
    var followUpData = document.getElementById('FollowUpData').value;
    var followUpContent = document.getElementById('FollowUpContent').value;
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportFollowUpModule);
    var followUpUserCode = form.GetField('SelectedUserCode');

    if(!followUpContent || followUpContent.trim() == ""){
        alert('请填写“随访内容”后再试！');
        return;
    }

    var tmpJson= {'ReportFollowUpID':followUpID, 'FollowUpData':followUpData,
                  'FollowUpContent':followUpContent, 'FollowUpUserCode':followUpUserCode }.toJSONString();

    var param = {};
    param.field = param.condFields = "SaveReportFollowUp_" + Math.random();
    param.command = "SaveReportFollowUp";
    param.conv =  "ReportConvMgr.DefaultConstValueConverter('" + tmpJson + "')";
    usercommit(ele, param);
}

function SearchTableViewConv(params, style) {
    TableViewConv.apply(this, arguments);
    this.DrawRow = function (t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.ondblclick = function () {
            table.__currData = r;
            LoadReportFollowUp(false, r.ReportFollowUpID);
        }
    }
}

function ShowOperateTip(isNew,followUpID){
    var tip = document.getElementById('OperateTip');
    if(isNew){
        tip.innerText = "正在新建随访记录";
        tip.style.color = "black";
    }else{
        tip.innerText = "正在修改编号为“"+followUpID+"”的随访记录";
        tip.style.color = "red";
    }
}