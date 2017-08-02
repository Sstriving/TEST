var arrExamRequestID = new Array();
var Printitem;

function SearchTableViewConv(params, style, resulttype) {
    TableViewConv.apply(this, arguments);
    var formatRowCell = this.FormatRowCell;
    this.FormatRowCell = function(t, ri, ci, r, c) {
        switch (c.Name) {
            case "chkReport":
                return "选中";
            case "WriteReport":
                return "写报告";
            case "ViewImage":
                return "阅片";
            case "PatientSexName":
            case "PatientSex":
                switch (r[c.Name]) {
                    case "M":
                    case "m":
                    case "男":
                        return "男";
                    case "F":
                    case "f":
                    case "女":
                        return "女";
                    default:
                        return "未知";
                }
            case "PatientAge":
                switch (r["PatientAgeUnitCode"]) {
                    case "Y":
                    case "y":
                    case "岁":
                        return r[c.Name] + "岁";
                    case "M":
                    case "m":
                    case "月":
                        return r[c.Name] + "月";
                    case "W":
                    case "w":
                    case "周":
                        return r[c.Name] + "周";
                    case "D":
                    case "d":
                    case "天":
                    case "日":
                        return r[c.Name] + "日";
                    case "H":
                    case "h":
                    case "时":
                        return r[c.Name] + "时";
                    default:
                        return r[c.Name];
                }
            case "Finding":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "Impression":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "IsPositive":
                if (r[c.Name] != null) {
                    return r[c.Name] == true ? "阳性" : "阴性";
                } else {
                    return "待定";
                }
            case "Crisis":
                if (r[c.Name] != null) {
                    return r[c.Name] == true ? "危急" : "普通";
                } else {
                    return "普通";
                }
            case "PACSInstanceCount":
                if (r["UndefinedFields"] != null) {
                    var str = "<PACSInstanceCount>";
                    var start = r["UndefinedFields"].indexOf('<PACSInstanceCount>');
                    var end = r["UndefinedFields"].indexOf('</PACSInstanceCount>');
                    return start > -1 && start <= end ? r["UndefinedFields"].substring(start + str.length, end) : "-";
                } else {
                    return "-";
                }
            case "FilmPrintedFlag":
                var filmPrintedFlag = false;
                if (r["UndefinedFields"] != null) {
                    var str = "<FilmPrintedFlag>";
                    var start = r["UndefinedFields"].indexOf('<FilmPrintedFlag>');
                    var end = r["UndefinedFields"].indexOf('</FilmPrintedFlag>');
                    if (start > -1 && start <= end) {
                        var tmpFlag = r["UndefinedFields"].substring(start + str.length, end);
                        filmPrintedFlag = (tmpFlag && tmpFlag.toLowerCase() == "true");
                    }
                }
                return filmPrintedFlag ? "已打" : "未打";
            case "FollowUpStatus":
                switch (r["FollowUpStatus"]) {
                    case null:
                        return "";
                    case "NoNeed":
                        return "不随访";
                    case "Waiting":
                        return "待随访";
                    case "Finished":
                        return "已随访";
                    default:
                        return r[c.Name];
                }
            default:
                return formatRowCell(t, ri, ci, r, c);
        }
    }
    var styleRowCell = this.StyleRowCell;
    this.StyleRowCell = function(self) {
        return function(t, ri, ci, r, c, e) {
            var result = styleRowCell(t, ri, ci, r, c, e);
            result.rmvList[result.rmvList.length] = style.Examine;
            result.rmvList[result.rmvList.length] = style.Report;
            result.rmvList[result.rmvList.length] = style.Register;
            result.rmvList[result.rmvList.length] = style.Reject;
            switch (r["StatusName"]) {
                case "已审核":
                    result.addList[result.addList.length] = style.Examine;
                    break;
                case "已报告":
                    result.addList[result.addList.length] = style.Report;
                    break;
                case "已登记":
                    result.addList[result.addList.length] = style.Register;
                    break;
                case "已驳回":
                    result.addList[result.addList.length] = style.Reject;
                    break;
                case "已检查":
                    result.addList[result.addList.length] = style.Checked;
                    break;
                case "已打印":
                    result.addList[result.addList.length] = style.print;
                    break;
            }
            return result;
        }
    }(this);
    this.DrawHeaderCell = function(self) {
        return function(t, ri, ci, r, c, e) {
            var table = t.TableElement();
            switch (c.Name) {
                case "ExamRequestID":
                case "PatientID":
                case "ExamDateTime":
                case "ExamRequestTime":
                case "ReportTime":
                case "ReviewTime":
                case "PrintTime":
                    e.onclick = function() {
                        table.__currSortType = table.__currSortType == "Asc" ? "Desc" : "Asc";
                        var sort = {
                            'SortField': c.Name,
                            'SortDirection': table.__currSortType
                        };

                        var columnld = "sort_ClomunID_" + ci;
                        var param = {
                            "command": "Search",
                            "field": columnld,
                            "condFields": columnld
                        };
                        param.conv = "StaticValueConv('" + sort.toJSONString() + "')";
                        usercommit(e, param);
                    }
                    break;
            }
        }
    }(this);
    this.DrawRow = function(t, ri, ci, r, c, e) {
        var table = t.TableElement();
        e.onclick = function() {
            table.__currData = r;
            changeFieldValue(table);
        }
        e.ondblclick = function() {
            return;
            var table = t.TableElement();
            table.__currData = r;
            changeFieldValue(table);
            if (resulttype != 'register') {
                var param = {
                    "command": "NotifyTitle",
                    "field": "arg_NavigateModule_ReportModule",
                    "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule",
                    "conv": "StaticValueConv(\"ReportModule\")"
                };
                usercommit(e, param);
                param = { "command": "LoadReport", "condFields": "CurrExamRequestID" };
                usercommit(e, param);
            }

        }
        e.oncontextmenu = function() {
            table.__currData = r;
            changeFieldValue(table);
            if (resulttype) createMenu(r, resulttype);
            return false;
        }
    }
    var drawRowCell = this.DrawRowCell;
    this.DrawRowCell = function(t, ri, ci, r, c, e) {
        switch (c.Name) {
            case "chkReport":
                drawRowCell(t, ri, ci, r, c, e);
                e.innerHTML = "";
                e.chk = e.ownerDocument.createElement("input");
                e.chk.setAttribute("type", "checkbox");
                e.chk.onchange = function(chk, r) {
                    return function() {
                        if (chk.checked) {
                            ReadyForExportPDF(r);
                        } else {
                            CancelExportPDF(r);
                        }
                    }
                }(e.chk, r);
                e.chk.checked = r.ExportPDF ? true : false;
                e.appendChild(e.chk);
                return true;
            case "WriteReport":
                drawRowCell(t, ri, ci, r, c, e);
                e.innerHTML = "<img src='../../../img/write.png' style='width:32px;height:32px' alt='写报告'/>";
                e.onclick = function() {
                    var table = t.TableElement();
                    table.__currData = r;
                    changeFieldValue(table);
                    if (resulttype != 'register') {
                        var param = {
                            "command": "NotifyTitle",
                            "field": "arg_NavigateModule_ReportModule",
                            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule",
                            "conv": "StaticValueConv(\"ReportModule\")"
                        };
                        usercommit(e, param);
                        param = { "command": "LoadReport", "condFields": "CurrExamRequestID" };
                        usercommit(e, param);
                    }
                }
                return true;
            case "ViewImage":
                drawRowCell(t, ri, ci, r, c, e);
                e.innerHTML = "<img src='../../../img/image.png' style='width:32px;height:32px' alt='阅片'/>"
                e.onclick = function() {
                    var table = t.TableElement();
                    table.__currData = r;
                    changeFieldValue(table);
                    if (resulttype != 'register') {
                        var param = {
                            "command": "NotifyTitle",
                            "field": "arg_NavigateModule_ReportModule",
                            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule",
                            "conv": "StaticValueConv(\"ReportModule\")"
                        };
                        usercommit(e, param);
                        param = {
                            "command": "NotifyTitle",
                            "field": "arg_NavigateModule_ImageModule",
                            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ImageModule",
                            "conv": "StaticValueConv(\"ImageViewModule\")"
                        };
                        usercommit(e, param);
                        param = {
                            "command": "LoadImage",
                            "condFields": "CurrExamRequestID"
                        };
                        usercommit(e, param);
                    }
                }
                return true;
            default:
                return drawRowCell(t, ri, ci, r, c, e);
        }
    }
}

function createMenu(r, resulttype) {
    var menuContainer = document.getElementById('div');
    var menu = menuContainer.__menu__;
    if (!menu) {
        menu = menuContainer.__menu__ = new Menu(menuContainer);
        menu.ItemClick = clickMenu;
        menu.DrawItem = drawItem;
        var items = menu.Items();
        if (items.Count() == 0) {
            if (resulttype == "register") {
                items.Add("转登记");
                items.Add("修改");
                items.Add("删除");
                items.Add("补打小票");
                items.Add("补扫申请单");
            } else {
                items.Add("图像发送");
                items.Add("报告导出");
                //  items.Add("读写报告");
                // items.Add("阅片");
                items.Add("图像匹配");
                items.Add("导出图像");
                items.Add("图像回传");
                items.Add("加入图像对比");
                items.Add("检查解锁");
                items.Add("解除图像匹配");
                items.Add("上传");
                items.Add("状态");
                items.Add("CA验证");
                // items.Add("报告");
            }
        }
        menuContainer.onclick = menuContainer.onmousewheel = function() {
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
    if (data == "图像发送") {
        var param = {
            "command": "NotifyTitle",
            "field": "cmd_SendImages",
            "condFields": "cmd_SendImages,f_NotifyDataType,CurrExamRequestID",
            "conv": "StaticValueConv(\"ImageSendRequest\")"
        };
        usercommit(Event.Source(), param);

    } else if (data == "报告导出") {
        param = {
            "command": "ExportReport",
            "condFields": "CondExportReport"
        };
        usercommit(Event.Source(), param);
    } else if (data == "读写报告") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_ReportModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule",
            "conv": "StaticValueConv(\"ReportModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "LoadReport",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "阅片") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_ImageModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ImageModule",
            "conv": "StaticValueConv(\"ImageViewModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "LoadImage",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "转登记") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_RegisterModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_RegisterModule",
            "conv": "StaticValueConv(\"RegisterModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "CHANGETOSCHEDULE",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);

    } else if (data == "图像匹配") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_StudyMatchModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_StudyMatchModule",
            "conv": "StaticValueConv(\"StudyMatchModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "LoadReport",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "修改") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_RegisterModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_RegisterModule",
            "conv": "StaticValueConv(\"RegisterModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "UpdateExamRequest",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
        var form = formCallCenter.GetFormByID("RegisterModule");
        form.SetField("RightFrontGroup", ["GroupRegister"]);
    } else if (data == "删除") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_RegisterModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_RegisterModule",
            "conv": "StaticValueConv(\"RegisterModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "DeleteExamRequest",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "导出图像") {
        var param = {
            "command": "NotifyTitle",
            "field": "cmd_ExportImages",
            "condFields": "cmd_ExportImages,f_NotifyDataType,CurrExamRequestID",
            "conv": "StaticValueConv(\"ExportExamRequest\")"
        };
        usercommit(Event.Source(), param);

    } else if (data == "图像回传") {
        var param = {
            "command": "NotifyTitle",
            "field": "cmd_SendImages",
            "condFields": "cmd_SendImages,f_NotifyDataType,CurrExamRequestID",
            "conv": "StaticValueConv(\"SendExamRequest\")"
        };
        usercommit(Event.Source(), param);
    } else if (data == "加入图像对比") {
        var param = {
            "command": "Add2ImageCompare",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "上传") {
        var param = {
            "command": "GatewayUpload",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "状态") {
        var param = {
            "command": "GatewayState",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "报告") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_ReportModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule",
            "conv": "StaticValueConv(\"ReportModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "GatewayReport",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "CA验证") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_Navigate_CAVerifyModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_Navigate_CAVerifyModule",
            "conv": "StaticValueConv(\"CAVerifyModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "CASearchByExamRequestID",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "解除图像匹配") {
        var param = {
            "command": "UnmatchStudy",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "检查解锁") {
        var param = {
            "command": "UnlockExamRequest",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "补打小票") {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_RegisterModule",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_RegisterModule",
            "conv": "StaticValueConv(\"RegisterModule\")"
        };
        usercommit(Event.Source(), param);
        param = {
            "command": "PrintTicketExamRequest",
            "condFields": "CurrExamRequestID"
        };
        usercommit(Event.Source(), param);
    } else if (data == "补扫申请单") {
        var form = formCallCenter.GetFormByID("SearchModule");
        var CurrExamRequestID = form.GetField("CurrExamRequestID");
        var param1 = {
            "command": "NotifyTitle",
            "field": "cmd_AddAttach",
            "condFields": "cmd_AddAttach,f_NotifyDataType,cmd_GroupName",
            "conv": "StaticValueConv(\"AddAttach\")"
        };
        var param2 = {
            "field": "cmd_GroupName",
            "conv": "StaticValueConv(\"{'GroupName':null,'ExamRequestID':" + CurrExamRequestID + "}\")"
        };
        useroperate(Event.Source(), commit, param1, param2);
    }
}

function loadBGSVCManager() {
    var param = {
        "command": "NotifyTitle",
        "field": "arg_LoadBGSVCManager",
        "condFields": "arg_LoadBGSVCManager,f_NotifyDataType,arg_LoadBGSVCManager",
        "conv": "StaticValueConv(\"LoadBGSVCManager\")"
    };
    usercommit(Event.Source(), param);
}

function hideMenu() {
    var menu = new Menu(document.getElementById('div'));
    menu.Fold();
}

function TwoLevelTableViewConv(params, style) {
    TwoLevelTableViewConv_tmp.apply(this, arguments);
    this.DrawSubRowCommandCell = function(self) {
        return function(t, ri, ci, r, c, e) {
            switch (c.Command) {
                case "UnmatchStudy":
                    if (e.children.length == 0) {
                        var img = e.ownerDocument.createElement("img");
                        img.src = "../../../img/差号.png";
                        img.title = "解除匹配";
                        img.onmouseover = function() {
                            img.src = "../../../img/红色差号.png";
                        }
                        img.onmouseout = function() {
                            img.src = "../../../img/差号.png";
                        }
                        e.appendChild(img);
                    }
                    table = t.Parent.TableElement();
                    e.onclick = function() {
                        table.__currData = t.__data;
                        changeFieldValue(table);
                        if (confirm("是否删除该检查的图像?\r\n\r\n患者：" + r.PatientName + "(" + r.PatientSexCode + ")")) {
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
    }(this);
    var formatRowCell = this.FormatRowCell;
    this.FormatRowCell = function(t, ri, ci, r, c) {
        switch (c.Name) {
            case "Finding":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "Impression":
                var div = document.getElementById("showdiv");
                div.innerHTML = r[c.Name];
                var ul = div.getElementsByTagName("ul");
                for (var i = 0; i <= ul.length - 1; i++) {
                    ul[i].innerHTML = "";
                    ul[i].innerText = "";
                };
                return div.innerText ? div.innerText.replace(/(^\s*)|(\s*$)/g, "").replace(/<br>/g, '').replace(/\ +/g, "").replace(/[\r\n]/g, "").substring(0, 20) : "";
            case "PACSInstanceCount":
                if (r["UndefinedFields"] != null) {
                    var str = "<PACSInstanceCount>";
                    var start = r["UndefinedFields"].indexOf('<PACSInstanceCount>');
                    var end = r["UndefinedFields"].indexOf('</PACSInstanceCount>');
                    return start > -1 && start <= end ? r["UndefinedFields"].substring(start + str.length, end) : "-";
                } else {
                    return "-";
                }
            default:
                return formatRowCell(t, ri, ci, r, c);
        }
    }
}

function TimeRangeConv(divstyles) {
    Form_SingleValueConv.apply(this);
    this.DecodeArguments = function(ele, args) {
        return args[0];
    }

    this.GetUIValue = function(ele) {
        if (ele.value != "all") {
            var arr = ele.value.split("|");
            return { "Start": arr[0], "End": arr[1] }.toJSONString();
        } else {
            return { "Start": null, "End": null }.toJSONString();
        }
    }
    this.ApplyValue = function(ele, val) {
        ele.innerHTML = "";

        var range = [
            { "Name": "全部", "Start": null, "End": null },
            {
                "Name": "今天",
                "Start": function() {
                    var date = new Date();
                    date.setDate(date.getDate());
                    return DataTimeFormat(date);
                }(),
                "End": function() {
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    return DataTimeFormat(date);
                }()
            },
            {
                "Name": "昨天",
                "Start": function() {
                    var date = new Date();
                    date.setDate(date.getDate() - 1);
                    return DataTimeFormat(date);
                }(),
                "End": function() {
                    var date = new Date();
                    date.setDate(date.getDate());
                    return DataTimeFormat(date);
                }()
            },
            {
                "Name": "一周内",
                "Start": function() {
                    var date = new Date();
                    date.setDate(date.getDate() - 6);
                    return DataTimeFormat(date);
                }(),
                "End": function() {
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    return DataTimeFormat(date);
                }()
            }
        ];

        if (!ele.owner) {
            var div = document.createElement("div");
            div.style.cssText = "border:solid 1px #666;display:inline-block;overflow:hidden;padding-right:1px;";
            if (divstyles) divstyles.forEach(function(item) { div.style[item.Name] = item.value; });
            div.style.width = ele.offsetWidth + "px";
            ele.style.width = (ele.offsetWidth + 20) + "px";
            ele.parentNode.replaceChild(div, ele);
            div.appendChild(ele);
            ele.owner = div;
        }

        if (!range) return;

        range.forEach(function(item) {
            var option = document.createElement("option");
            option.text = item.Name;
            option.value = item.Start && item.End ? item.Start + "|" + item.End : "all";
            ele.appendChild(option);
        });
        if (!val) {
            ele.selectedIndex = 1;
            if (ele.onchange) ele.onchange();
        } else {
            $Array(ele.options).forEach(function(option) {
                option.selected = option.value == val.Start + "|" + val.End || option.value == "all";
            });
        }
    }
}

function ListExportReportConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function(ele) {
        var str = "";
        for (var i = 0; i < arrExamRequestID.length; i++) {
            if (i < 1) {
                str = arrExamRequestID[i];
            } else {
                str = str + "/" + arrExamRequestID[i];
            }

        }
        return { "ExportType": "pdf", "ExamRequestID": str }.toJSONString();
    }
}

function ReadyForExportPDF(data) {
    data.ExportPDF = true;
    var index = -1;
    for (var i = 0; i < arrExamRequestID.length; i++) {
        if (arrExamRequestID[i] == data.ExamRequestID) {
            index = i;
            break;
        }
    }
    if (index > -1) return;
    arrExamRequestID[arrExamRequestID.length] = data.ExamRequestID;
}

function CancelExportPDF(data) {
    data.ExportPDF = false;
    var index = -1;
    for (var i = 0; i < arrExamRequestID.length; i++) {
        if (arrExamRequestID[i] == data.ExamRequestID) {
            index = i;
            break;
        }
    }
    if (index < 0) return;
    for (var i = index + 1; i < arrExamRequestID.length; i++) {
        arrExamRequestID[i - 1] = arrExamRequestID[i];
    }
    arrExamRequestID.length--;
}

function clearArray() {
    arrExamRequestID = new Array();
}

PrintTempListConv = function(printElementID) {
    Form_ListValueConv.apply(this, arguments);


    this.ApplyValue = function(ele, val) {
        ele.innerHTML = "";

        val.forEach(function(item) {
            var span = ele.ownerDocument.createElement("span");
            span.style.width = "100%;"
            span.style.cursor = "pointer";
            span.style.display = "block";
            span.innerText = item["ReportTempName"];
            span.onclick = function() {
                var printElement = ele.ownerDocument.getElementById(printElementID);
                if (printElement) printElement.__currData = item;
                Printitem = item;
                var param = {
                    "command": "NotifyTitle",
                    "field": "cmd_CentralizedPrintModule",
                    "condFields": "cmd_CentralizedPrintModule,f_NotifyDataType,CondPrintReport",
                    "conv": "StaticValueConv(\"CentralizedPrint\")"
                };
                usercommit(Event.Source(), param);

                //                param = {
                //                    "command": "CentralizedPrint",
                //                    "condFields": "CondPrintReport"
                //                };
                //                usercommit(Event.Source(), param);
                $Array(this.parentNode.children).forEach(function(ite) { ite.style.color = ''; });
                this.style.color = "red";
            };
            ele.appendChild(span);
        });
        if (ele.children.length > 0) {
            var printElement = ele.ownerDocument.getElementById(printElementID);
            if (printElement) printElement.__currData = val[0];
            $Array(ele.children).forEach(function(ite) { ite.style.color = ''; });
            ele.children[0].style.color = "red";
        }
    }
}

function CentralizedPrint(ele) {
    var printElement = ele.ownerDocument.getElementById("divPrintElement");
    Printitem = printElement.__currData;
    var param = {
        "command": "NotifyTitle",
        "field": "cmd_CentralizedPrintModule",
        "condFields": "cmd_CentralizedPrintModule,f_NotifyDataType,CondPrintReport",
        "conv": "StaticValueConv(\"CentralizedPrint\")"
    };
    usercommit(ele, param);
}

function ListPrintReportConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function(ele) {
        var str = "";
        for (var i = 0; i < arrExamRequestID.length; i++) {
            if (i < 1) {
                str = arrExamRequestID[i];
            } else {
                str = str + "/" + arrExamRequestID[i];
            }

        }

        return { "Type": "Print", "ReportTempUrl": Printitem.ReportTempUrl, "ExamRequestID": str, "IsBackGroundPrint": true }.toJSONString();
    }
}