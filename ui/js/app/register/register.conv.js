//lml-ok
function SearchTableViewConv(params, style) {
    TableViewConv.apply(this, arguments);
    var formatRowCell = this.FormatRowCell;
    this.FormatRowCell = function(t, ri, ci, r, c) {
        switch (c.Name) {
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
                break;
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
            default:
                return formatRowCell(t, ri, ci, r, c);
        }
    }
    this.DrawRow = function(t, ri, ci, r, c, e) {
        var table = t.TableElement();
        table.__selData = undefined;
        e.onclick = function() {
            var valueMember = table.getAttribute("valueMember");
            var field = table.getAttribute("condfields");
            var form = formCallCenter.GetFormByID(window.FormIDs.RegisterModule);
            form.SetField(field, [r[valueMember]]);
            table.__bindedData = r[valueMember];
            table.__selData = r[valueMember];
        }
        e.ondblclick = function() {
            commit(table);
        }
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
            input.setAttribute('class', 'inputItemText inputAge');
            input.setAttribute('valuechanged', 'valuechanged');
            input.setAttribute('onchange', 'changeFieldValue(this.parentNode)');
            input.setAttribute('typeindex', '18');
            input.setAttribute('style', 'float: left;');
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

function ExamRequestAttachUIDList_SysConv(layout) {
    var params = {
        'RemoveField': 'RemoveExamRequestAttach_Sys',
        'RemoveCommand': 'RemoveExamRequestAttach_Sys',
        'UrlField': 'ExamRequestAttachUrl_Sys'
    };
    this.ApplyValue = function(ele, val) {
        ele.style.position = "relative";
        ele.style.overflowY = "auto";
        ele.__imageList = [];
        for (var i = 0; i < val.length; i++) {
            var uid = val[i];
            var flag = false;
            for (var j = 0; j < ele.children.length; j++) {
                if (ele.children[j].__bindedData == uid) {
                    flag = true;
                    break;
                }
            }
            if (flag) continue;
            var uidField = "RemoveExamRequestAttach_Sys_" + uid;
            var rmvConv = "ExamRequestAttachUIDList_SysConv.RemoveExamRequestAttach_SysConv('" + uid + "')";
            var urlConv = "ExamRequestAttachUIDList_SysConv.ExamRequestAttachUrl_SysConv('" + uid + "')";
            var cnt = ele.children.length;
            var div = ele.ownerDocument.createElement("div");
            div.__bindedData = uid;
            var rows = layout && layout.rows ? layout.rows : 5;
            var cols = layout && layout.cols ? layout.cols : 4;
            div.style.width = 100 / cols + "%";
            div.style.height = 100 / rows + "%";
            div.style.position = "absolute";
            div.style.left = (100 / cols) * parseInt(cnt % cols, 10) + "%";
            div.style.top = (100 / rows) * parseInt(cnt / cols, 10) + "%";

            div.setAttribute("field", params.RemoveField);
            div.setAttribute("command", params.RemoveCommand);
            div.setAttribute("condFields", uidField);
            div.setAttribute("conv", rmvConv);

            var rmv = ele.ownerDocument.createElement("span");
            rmv.style.position = "absolute";
            rmv.style.cursor = "pointer";
            rmv.style.backgroundColor = "black";
            rmv.style.color = "white";
            rmv.style.fontSize = "14px";
            rmv.innerHTML = "X";
            rmv.title = "删除该图";
            rmv.onclick = function(d, i) {
                return function() {
                    var tmp = ele.__img__container;
                    if (tmp && tmp.parentNode) {
                        ele.__img__container = null;
                        tmp.parentNode.removeChild(tmp);
                    }
                    if (confirm("是否删除此图片")) {
                        commit(d);
                    }
                }
            }(div, img);
            rmv.setAttribute("field", uidField);
            rmv.setAttribute("command", "-");
            rmv.setAttribute("conv", "StaticValueConv('" + uid + "')");

            var img = ele.ownerDocument.createElement("img");
            img.setAttribute("field", params.UrlField);
            img.setAttribute("command", "-");
            img.setAttribute("conv", urlConv);
            img.onload = function(i) {
                return function() {
                    new ui(i).FitView()
                }
            }(img);
            img.onclick = function(d, i, r) {
                var show = function() {
                    if (!i.parentNode) return;
                    var doc = Wnd(ele).GetDocument();
                    var tmp = ele.__img__container;
                    if (!tmp) {
                        tmp = doc.createElement("div");
                        tmp.style.position = "absolute";
                        tmp.style.left = doc.documentElement.scrollLeft + "px";
                        tmp.style.top = doc.documentElement.scrollTop + "px";
                        tmp.style.zIndex = 99999999;
                        ele.__img__container = tmp;
                        doc.body.appendChild(tmp);

                        var container = doc.createElement("div");
                        container.style.position = "absolute";
                        container.style.left = "0px";
                        container.style.right = "0px";
                        container.style.top = "0px";
                        container.style.bottom = "24px";
                        tmp.appendChild(container);

                        var im = doc.createElement("img");
                        im.onload = function(i) {
                            return function() {
                                new ui(i).FitView()
                            }
                        }(im);
                        container.appendChild(im);

                        tmp.appendChild(container);

                        function goto(btnFirst, btnPrevious, btnNext, btnLast, index) {
                            if (index < 0) index = 0;
                            if (index >= ele.children.length) index = ele.children.length - 1;
                            if (index > -1) {
                                tmp.children[0].children[0].src = ele.children[index].children[0].src;
                                tmp.children[0].children[0].curr = ele.children[index].children[0];
                            } else {
                                tmp.children[0].children[0].src = null;
                                tmp.children[0].children[0].curr = null;
                            }
                            btnFirst.disabled = index == 0 || ele.children.length < 1 ? "disabled" : "";
                            btnPrevious.disabled = index < 1 ? "disabled" : "";
                            btnNext.disabled = index > ele.children.length - 2 ? "disabled" : "";
                            btnLast.disabled = index == ele.children.length - 1 || ele.children.length < 1 ? "disabled" : "";
                        }
                        var bar = doc.createElement("div");
                        bar.style.textAlign = "center";
                        var btnFirst = doc.createElement("input");
                        btnFirst.type = "button";
                        btnFirst.className = "button";
                        btnFirst.value = "最前";
                        bar.appendChild(btnFirst);
                        var btnPrevious = doc.createElement("input");
                        btnPrevious.type = "button";
                        btnPrevious.className = "button";
                        btnPrevious.value = "上一副";
                        bar.appendChild(btnPrevious);
                        var btnNext = doc.createElement("input");
                        btnNext.type = "button";
                        btnNext.className = "button";
                        btnNext.value = "下一副";
                        bar.appendChild(btnNext);
                        var btnLast = doc.createElement("input");
                        btnLast.type = "button";
                        btnLast.className = "button";
                        btnLast.value = "最后";
                        bar.appendChild(btnLast);
                        btnFirst.onclick = function() {
                            goto(btnFirst, btnPrevious, btnNext, btnLast, 0);
                        }
                        btnPrevious.onclick = function() {
                            for (var j = 0; j < ele.children.length; j++) {
                                if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
                                    goto(btnFirst, btnPrevious, btnNext, btnLast, j - 1);
                                    break;
                                }
                            }
                        }
                        btnNext.onclick = function() {
                            for (var j = 0; j < ele.children.length; j++) {
                                if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
                                    goto(btnFirst, btnPrevious, btnNext, btnLast, j + 1);
                                    break;
                                }
                            }
                        }
                        btnLast.onclick = function() {
                            goto(btnFirst, btnPrevious, btnNext, btnLast, ele.children.length - 1);
                        }
                        var btnClose = doc.createElement("input");
                        btnClose.type = "button";
                        btnClose.className = "button";
                        btnClose.value = "关闭";
                        bar.appendChild(btnClose);
                        btnClose.onclick = function() {
                            ele.__img__container = null;
                            if (tmp.parentNode) tmp.parentNode.removeChild(tmp);
                        }
                        tmp.__goto = function(index) {
                            goto(btnFirst, btnPrevious, btnNext, btnLast, index);
                        }
                        bar.style.position = "absolute";
                        bar.style.left = "50%";
                        bar.style.marginLeft = "-240px";
                        bar.style.bottom = "0px";
                        tmp.appendChild(bar);
                    }
                    tmp.style.left = "6px";
                    tmp.style.top = "6px";
                    tmp.style.backgroundColor = "#bbb";
                    tmp.style.width = (doc.documentElement.scrollWidth - 12) + "px";
                    tmp.style.height = (doc.documentElement.scrollHeight - 12) + "px";
                    tmp.children[0].children[0].src = i.src;
                    tmp.children[0].children[0].curr = i;
                    for (var j = 0; j < ele.children.length; j++) {
                        if (ele.children[j].children[0] == i) {
                            tmp.__goto(j);
                            break;
                        }
                    }
                }
                return show;
            }(div, img, rmv);

            div.appendChild(img);
            div.appendChild(rmv);
            ele.appendChild(div);
        }
    }
    this.oo(new Form_ListValueConv());
    ExamRequestAttachUIDList_SysConv.RemoveExamRequestAttach_SysConv = function(uid) {
        this.CompareValues = function(val1, val2) {
            return -1;
        }
        this.ApplyValue = function(ele, val) {
            if (uid == val) {
                if (ele.parentNode) {
                    var children = ele.parentNode.children;
                    for (var i = 0; i < children.length; i++) {
                        if (children[i] == ele) {
                            for (var j = children.length - 1; j > i; j--) {
                                children[j].style.left = children[j - 1].style.left;
                                children[j].style.top = children[j - 1].style.top;
                            }
                            break;
                        }
                    }
                    ele.parentNode.removeChild(ele);
                }
            }
        }
        this.oo(new Form_SingleValueConv(uid));
    }
    ExamRequestAttachUIDList_SysConv.ExamRequestAttachUrl_SysConv = function(uid) {
        this.ApplyValue = function(ele, val) {
            if (uid == val.ExamRequestAttachUID_Sys) ele.src = val.AttachUrl_Sys;
        }
        this.oo(new Form_SingleValueConv());
    }
}

function HISExamRequestTableViewConv() {
    SearchTableViewConv.apply(this, arguments);
    var applyValue = this.ApplyValue;
    this.ApplyValue = function(root, val) {
        applyValue(root, val);
        root.parentNode.style.display = val && val.length > 0 ? "" : "none";
    }
    this.DrawRow = function(t, ri, ci, r, c, e) {
        var table = t.TableElement();
        table.__selData = undefined;
        e.onclick = function() {
            var valueMember = table.getAttribute("valueMember");
            var field = table.getAttribute("condfields");
            var form = formCallCenter.GetFormByID(window.FormIDs.RegisterModule);
            form.SetField(field, [r[valueMember]]);
            table.__bindedData = r[valueMember];
            table.__selData = r[valueMember];
        }
        e.ondblclick = function() {
            var param = {};
            var valueMember = table.getAttribute("valueMember");
            var json = "{'ExamRequestID':'" + r[valueMember] + "','SysTypeCode':'" + r.SysTypeCode + "'}";
            param.field = "f_ApplyHISExamRequest";
            param.condFields = "f_ApplyHISExamRequest";
            param.conv = "StaticValueConv(\"" + json + "\")";
            param.command = table.getAttribute("command");
            usercommit(table, param);
        }
    }
}

function HistoryExamRequestListConv(filterFields) {
    Form_SingleValueConv.apply(this, arguments);
    this.GetUIValue = function(ele) {
        return ele.value;
    }
    this.ApplyValue = function(ele, val) {
        Element(ele).setText(val);
        ele.onchange = function() {
            changeFieldValue(ele);
            var form = formCallCenter.DetectFormByElement(ele);
            var value = {};
            for (var i = 0; i < filterFields.length; i++) {
                value[filterFields[i]] = form.GetField(filterFields[i]);
            }
            var param = {};
            param.field = "f_HistoryExamRequestList";
            param.condFields = "f_HistoryExamRequestList";
            param.conv = "StaticValueConv('" + value.toJSONString() + "')";
            param.command = "HistoryExamRequestList";
            usercommit(ele, param);
        }
    }
}

function HISExamRequestListRequest(ele) {
    var param = {};
    param.field = "f_HISExamRequestList";
    param.condFields = "f_HISExamRequestList";
    param.conv = "StaticValueConv('" + ele.value + "')";
    param.command = "HISExamRequestList";
    usercommit(ele, param);
}

//used in US only
function FloatSearchTableViewConv(params, style) {
    SearchTableViewConv.apply(this, arguments);
    var applyValue = this.ApplyValue;
    this.ApplyValue = function(root, val) {
        applyValue(root, val);
        root.parentNode.style.display = val && val.length > 0 ? "" : "none";
    }
}

//used in US only
function RegisterConv() {
    this.ApplyValue = function(ele, val) {
        var param = {
            "command": "NotifyTitle",
            "field": "arg_LoadReport_ExamRequest",
            "conv": "StaticValueConv(" + val[0].ExamRequestID + ")",
            "condFields": "cmd_LoadReport,f_NotifyDataType,arg_LoadReport_ExamRequest"
        };
        usercommit(ele, param);
        param = {
            "command": "NotifyTitle",
            "field": "arg_NavigateModule_ReportModule",
            "conv": "StaticValueConv(\"ReportModule\")",
            "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_ReportModule"
        };
        usercommit(ele, param);

        ;
    }
    this.oo(new Form_SingleValueConv());
}

//used in US only
function RegisterModeForUSConv() {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        ele.style.position = "absolute";
        ele.style.marginTop = "-10px";
        switch (val) {
            case "Update":
                ele.innerHTML = "<div style='font-size:18pt'>正在<span  style='color:red'>修改登记信息</span>，取消操作请点击<span style='font-weight:bold;color:red;cursor:pointer' command='ResetForm' onclick='commit(this);ClearOther();'>【新建患者】</span></div>";
                break;
            case "Return":
                ele.innerHTML = "<div style='font-size:18pt'>正在<span  style='color:red'>复诊登记</span>，取消操作请点击<span style='font-weight:bold;color:red;cursor:pointer' command='ResetForm' onclick='commit(this);ClearOther();'>【新建患者】</span></div>";
                break;
            case "Integrate":
                ele.innerHTML = "<div style='font-size:18pt'>正在<span  style='color:red'>HIS集成登记</span>，取消操作请点击<span style='font-weight:bold;color:red;cursor:pointer' command='ResetForm' onclick='commit(this);ClearOther();'>【新建患者】</span></div>";
                break;
            case "New":
            default:
                ele.innerText = "";
                ele.style.color = "";
                break;
        }
    }
}

function RegisterModeConv() {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        switch (val) {
            case "Update":
                ele.innerHTML = "<span><span style='color:red'>修改</span>信息，<span style='font-weight:bold;color:blue;cursor:pointer' command='ResetForm' onclick='commit(this);'>【取消修改】</span></span>";
                break;
            case "Return":
                ele.innerHTML = "<span><span style='color:red'>复诊</span>登记，<span style='font-weight:bold;color:blue;cursor:pointer' command='ResetForm' onclick='commit(this);'>【取消复诊】</span></span>";
                break;
            case "Integrate":
                ele.innerHTML = "<span><span style='color:red'>HIS</span>提取，<span style='font-weight:bold;color:blue;cursor:pointer' command='ResetForm' onclick='commit(this);'>【取消提取】</span></span>";
                break;
            case "New":
            default:
                ele.innerText = "";
                ele.style.color = "";
                break;
        }
    }
}

function addExamRequestByModality(ele) {
    var val = formCallCenter.DetectFormByElement(ele).GetField('NewExamRequestModalityCode')
    if (val) {
        var p = {};
        p.command = "AddExamRequest";
        p.field = p.condFields = "NewExamRequestParam";
        p.conv = "StaticValueConv('{\"Type\":\"ModalityCode\",\"Value\":\"" + val + "\"}')";
        try {
            ExamRequestListConv.AddingExamRequest = 1;

            usercommit(ele, p);
        } catch (err) {
            throw err;
        } finally {
            ExamRequestListConv.AddingExamRequest = 0;
        }
    } else {
        alert("请先选择影像类型再添加检查");
    }
    formCallCenter.DetectFormByElement(ele).SetField("NewExamRequestModalityCode", [""]);
}

//used in US only
function ExamRequestListForUSConv(mode, style, maxSize) {
    //mode:项目形式，0:检查部位-检查项目-检查方法,!0:检查部位
    Form_SingleValueConv.apply(this, arguments);
    if (!style) style = {
        'label': 'unselectedLabel',
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
    if (!maxSize) maxSize = { 'height': 240 };
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!ele.__modalityListEle) {
                var form = formCallCenter.DetectFormByElement(ele);
                form.requestData("ModalityList");

                var examRequestList = ele.ownerDocument.createElement("div");
                //examRequestList.style.cssText = examRequestList.style.cssText + "border:1px solid blue; width:450px;";
                examRequestList.setAttribute("field", "RemoveExamRequest");
                examRequestList.setAttribute("command", "RemoveExamRequest");
                examRequestList.setAttribute("conv", "ExamRequestListForUSConv.RemoveExamRequestConv");
                ele.appendChild(examRequestList);
                var modalityCodeList = ele.ownerDocument.createElement("div");
                modalityCodeList.setAttribute("field", "ExamRequestModalityCode");
                modalityCodeList.setAttribute("conv", "ExamRequestListForUSConv.ExamRequestModalityCodeConv");
                examRequestList.appendChild(modalityCodeList);
                ele.__modalityListEle = modalityCodeList;
            }
        }
    }(this);

    function UpdateModalityForUS(group, index) {
        var modality = group[index];
        var container = modality.Container;
        if (modality.ExamRequestList.length < 1) {
            container.parentNode.removeChild(container);
            for (var k = index; k < group.length - 1; k++) {
                group[k] = group[k + 1];
            }
            group.length--;
        } else {
            var examRequestList;
            if (!container.__modalityEle) {
                container.__modalityEle = container.ownerDocument.createElement("div");
                container.appendChild(container.__modalityEle);
                examRequestList = container.ownerDocument.createElement("div");
                container.appendChild(examRequestList);
            } else {
                examRequestList = container.children[1];
            }
            //container.__modalityEle.innerHTML = modality.ModalityCode + "检查(" + modality.ExamRequestList.length + ")";
            //css(container.__modalityEle).Add("headinspect");
            //"多退"
            for (var i = examRequestList.children.length - 1; i > -1; i--) {
                var uid = examRequestList.children[i].__examRequest.UID;
                var find = false;
                for (var j = 0; j < modality.ExamRequestList.length; j++) {
                    if (uid == modality.ExamRequestList[j].UID) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequestList.removeChild(examRequestList.children[i]);
            }
            //"少补"
            for (var i = modality.ExamRequestList.length - 1; i > -1; i--) {
                var uid = modality.ExamRequestList[i].UID;
                var index = -1;
                for (index = 0; index < examRequestList.children.length; index++) {
                    if (uid == examRequestList.children[index].__examRequest.UID) break;
                }
                if (index == examRequestList.children.length) {
                    var examRequestEle = container.ownerDocument.createElement("div");

                    examRequestEle.style.cssText = examRequestEle.style.cssText + "height:200px;margin-left:4px;margin-right:4px;margin-bottom:8px;border-radius: 4px;background-color: rgb(242, 242, 242);border-style: solid;border-width: 1px;border-color: rgb(179, 179, 179);box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.2);";
                    var examRequestHeaderEle = examRequestEle.ownerDocument.createElement("table");
                    examRequestHeaderEle.style.width = "100%";
                    examRequestHeaderEle.style.cssText = "width:100%;margin-top:8px;";
                    examRequestEle.appendChild(examRequestHeaderEle);
                    var examRequestHeaderBody = examRequestEle.ownerDocument.createElement("tbody");
                    examRequestHeaderEle.appendChild(examRequestHeaderBody);
                    var examRequestHeaderRow = examRequestEle.ownerDocument.createElement("tr");
                    examRequestHeaderBody.appendChild(examRequestHeaderRow);
                    var examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    examRequestHeaderRow.appendChild(examRequestHeaderCell);

                    var examRequestDesc = examRequestEle.ownerDocument.createElement("span");
                    examRequestHeaderCell.appendChild(examRequestDesc);

                    var examRequestEquipEle = examRequestEle.ownerDocument.createElement("span");
                    //examRequestEquipEle.style.float = 'left';
                    //examRequestEquipEle.style.marginTop = '4px';
                    examRequestEquipEle.innerText = "设   备";
                    css(examRequestEquipEle).Add("infolistspan");
                    examRequestHeaderCell.appendChild(examRequestEquipEle);
                    createDataListConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestEquipmentList', 'ExamRequestEquipmentID', 'EquipmentList', 'EquipmentName', 'EquipmentID', null, true);

                    var examRequestCostTypeEle = examRequestEle.ownerDocument.createElement("span");

                    examRequestCostTypeEle.innerText = "收费类型";
                    css(examRequestCostTypeEle).Add("infolistspan");
                    examRequestHeaderCell.appendChild(examRequestCostTypeEle);
                    createDataListConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestCostTypeList', 'ExamRequestCostType', 'CostTypeList', 'CostTypeName', 'CostTypeID', 'CostType', true);

                    //var examRequestCostValueEle = createDataConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestCostValue', 'CostValue');
                    //css(examRequestCostValueEle).Add(style.dropText);
                    //examRequestCostValueEle.style.cssText = "float:left;width:48px; height:16px;margin-top:0px;margin-left:3px;background-color: rgb(179, 179, 179);";

                    //examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    //examRequestHeaderRow.appendChild(examRequestHeaderCell);
                    //examRequestHeaderCell.setAttribute("rowspan", '2');
                    //var div=examRequestHeaderCell.ownerDocument.createElement("div");
                    //examRequestHeaderCell.appendChild(div);
                    //css(div).Add("deletepng");
                    //div.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    //div.title = "删除检查";
                    //div.onclick = function (uid) {
                    //    return function () {
                    //        if (confirm("是否删除该检查")) {
                    //            var param = {};
                    //            param.command = 'RemoveExamRequest';
                    //            param.field = 'RemoveExamRequest_' + uid;
                    //            param.condFields = param.field;
                    //            param.conv = "StaticValueConv('" + uid + "')";
                    //            usercommit(this, param);
                    //        }
                    //    }
                    //} (uid);

                    //examRequestHeaderRow = examRequestEle.ownerDocument.createElement("tr");
                    //examRequestHeaderBody.appendChild(examRequestHeaderRow);
                    //examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    //examRequestHeaderRow.appendChild(examRequestHeaderCell);

                    //var scheduleTimeEle = examRequestHeaderEle.ownerDocument.createElement("div");
                    //scheduleTimeEle.setAttribute("field", "ExamRequestScheduleTime");
                    //scheduleTimeEle.setAttribute("conv", "ExamRequestListConv.ExamRequestScheduleTimeConv('" + uid + "')");
                    //scheduleTimeEle.style.cursor = "pointer";
                    //scheduleTimeEle.style.display = "inline-block";
                    //var scheduleTimeCheck = examRequestHeaderEle.ownerDocument.createElement("input");
                    //scheduleTimeCheck.type = "checkbox";
                    //scheduleTimeCheck.style.cssText = "margin-left:22px;";
                    //scheduleTimeEle.appendChild(scheduleTimeCheck);
                    //var scheduleTimeLabel = examRequestHeaderEle.ownerDocument.createElement("span");
                    //scheduleTimeLabel.innerText = "预约";
                    //css(scheduleTimeLabel).Add("appointment");
                    //scheduleTimeEle.appendChild(scheduleTimeLabel);
                    //var scheduleTimeText = examRequestHeaderEle.ownerDocument.createElement("input");
                    //css(scheduleTimeText).Add("appointmentinput");
                    //scheduleTimeEle.appendChild(scheduleTimeText);
                    //scheduleTimeCheck.onchange = function (scheduleTimeEle) {
                    //    return function () {
                    //        scheduleTimeText.style.display = this.checked ? "" : "none";
                    //        if (!this.checked) changeFieldValue(scheduleTimeEle);
                    //    }
                    //} (scheduleTimeEle);
                    //scheduleTimeLabel.onclick = function () {
                    //    scheduleTimeCheck.checked = !scheduleTimeCheck.checked;
                    //    scheduleTimeCheck.onchange();
                    //}
                    //scheduleTimeText.onchange = function () {
                    //    changeFieldValue(scheduleTimeEle);
                    //}
                    //examRequestHeaderCell.appendChild(scheduleTimeEle);

                    //
                    //var printTicketEle = examRequestHeaderEle.ownerDocument.createElement("span");
                    //css(printTicketEle).Add("moneyinput");
                    ////printTicketEle.style.cssText = "cursor:pointer;display:inline-block;margin-left:12px;";
                    //
                    //var printTicketCheck = examRequestHeaderEle.ownerDocument.createElement("input");
                    //printTicketCheck.type = "checkbox";
                    //printTicketCheck.setAttribute("field", "ExamRequestPrintTicket");
                    //printTicketCheck.setAttribute("conv", "ExamRequestListConv.ExamRequestPrintTicketConv('" + uid + "')");
                    //printTicketCheck.style.cssText = "mag";
                    //printTicketCheck.onchange = function () {
                    //    changeFieldValue(this);
                    //}
                    //printTicketEle.appendChild(printTicketCheck);
                    //var printTicketLabel = examRequestHeaderEle.ownerDocument.createElement("span");
                    //printTicketLabel.innerText = "输出登记信息";
                    //css(printTicketLabel).Add("registration");
                    //printTicketLabel.style.cssText = "margin-left:-22px;display: inline-block;height: 28px;line-height: 26px;font-size: 14px;color: rgb(77, 77, 77);width: 130px;text-align: center;";
                    //printTicketLabel.onclick = function () {
                    //    printTicketCheck.checked = !printTicketCheck.checked;
                    //    printTicketCheck.onchange();
                    //}
                    //printTicketEle.appendChild(printTicketLabel);
                    //examRequestHeaderCell.appendChild(printTicketEle);

                    var examRequestItemListContainer = examRequestEle.ownerDocument.createElement("div");
                    examRequestItemListContainer.style.float = "left";
                    examRequestItemListContainer.style.border = "1px solid black";


                    var examRequestItemLabelEle = examRequestEle.ownerDocument.createElement("span");
                    examRequestItemLabelEle.style.cssText = "margin-left:-20px;";
                    examRequestItemLabelEle.innerText = "部   位";
                    css(examRequestItemLabelEle).Add("infolistspan");
                    var spanred = examRequestEle.ownerDocument.createElement("span");
                    spanred.style.cssText = "color: Red;";
                    spanred.innerText = "*";
                    examRequestItemLabelEle.appendChild(spanred);
                    examRequestItemListContainer.appendChild(examRequestItemLabelEle);

                    //var addExamRequestItemEle = examRequestEle.ownerDocument.createElement("span");
                    //css(addExamRequestItemEle).Add("delexam11");
                    //addExamRequestItemEle.style.cursor = "pointer";
                    //addExamRequestItemEle.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    //css(addExamRequestItemEle).Add("subitem");
                    ////ddExamRequestItemEle.style.cssText = "background: url(../../../img/加号.png); cursor:pointer; background-repeat: no-repeat; background-position: center; height: 18px; width: 38px; margin-top: 2px;margin-left: 10px;";
                    //
                    //addExamRequestItemEle.setAttribute("command", "AddExamRequestItem");
                    //addExamRequestItemEle.onclick = function (uid) {
                    //    return function () {
                    //        var param = {};
                    //        param.command = 'AddExamRequestItem';
                    //        param.field = 'AddExamRequestItem_' + uid;
                    //        param.condFields = param.field;
                    //        param.conv = "StaticValueConv('" + uid + "')";
                    //        usercommit(this, param);
                    //  }
                    //} (uid);
                    //examRequestItemListContainer.appendChild(addExamRequestItemEle);
                    //var divclear = examRequestEle.ownerDocument.createElement("div");
                    //divclear.style.cssText = "clear:both;";
                    //examRequestItemListContainer.appendChild(divclear);

                    var examRequestItemList = examRequestEle.ownerDocument.createElement("div");
                    //examRequestItemListContainer.style.cssText = "border:1px solid blue;";
                    examRequestItemListContainer.appendChild(examRequestItemList);
                    examRequestEle.appendChild(examRequestItemListContainer);

                    examRequestItemListContainer.setAttribute("field", "RemoveExamRequestItem");
                    examRequestItemList.setAttribute("field", "ExamRequestItemUIDList");
                    examRequestItemListContainer.style.cssText = "margin-left:22px;";
                    if (mode) {
                        examRequestItemListContainer.setAttribute("conv", "ExamRequestListForUSConv.BodyPartItemListConv.RemoveItemConv");
                        examRequestItemList.setAttribute("conv", "ExamRequestListForUSConv.BodyPartItemListConv('" + uid + "','ExamRequestUID'," + style.toJSONString() + "," + maxSize.toJSONString() + ")");
                        setTimeout(function(examRequestEle) {
                            return function() {
                                var registerForm = formCallCenter.GetFormByID(window.FormIDs.RegisterModule);
                                var items = examRequestEle.__examRequest.Items;
                                if (!items || items.length < 1) {
                                    var param = { "command": "AddExamRequestItem" };
                                    param.condFields = param.field = "AddExamRequestItem_" + uid;
                                    param.conv = "StaticValueConv('" + uid + "')";
                                    usercommit(registerForm.GetForm(), param);

                                    items = examRequestEle.__examRequest.Items;
                                    if (items && items.length == 1) {
                                        param = { "command": "RemoveExamRequestItem" };
                                        param.condFields = param.field = "RemoveExamRequestItem_" + items[0].UID;
                                        param.conv = "StaticValueConv('" + items[0].UID + "')";
                                        usercommit(registerForm.GetForm(), param);
                                    }
                                }
                            }
                        }(examRequestItemList.parentNode.parentNode), 1000);
                    } else {
                        examRequestItemListContainer.setAttribute("conv", "ExamRequestListForUSConv.RemoveItemConv");
                        examRequestItemList.setAttribute("conv", "ExamRequestListForUSConv.ItemListConv('" + uid + "')");
                    }

                    var examRequestAttachListContainer = examRequestEle.ownerDocument.createElement("div");
                    //examRequestAttachListContainer.style.float = "left";
                    examRequestAttachListContainer.setAttribute("field", "RemoveExamRequestAttach");
                    examRequestAttachListContainer.setAttribute("conv", "ExamRequestListForUSConv.RemoveExamRequestAttachConv('" + uid + "')");

                    //var divclear = examRequestEle.ownerDocument.createElement("div");
                    //divclear.style.cssText = "width:100px;";
                    //examRequestAttachListContainer.appendChild(divclear);
                    var examRequestAttachLabelEle = examRequestEle.ownerDocument.createElement("span");

                    examRequestAttachLabelEle.innerText = "申请单";
                    //css(examRequestAttachLabelEle).Add("infolistspan");

                    examRequestAttachListContainer.appendChild(examRequestAttachLabelEle);

                    var addExamRequestAttachEle = examRequestEle.ownerDocument.createElement("input");
                    addExamRequestAttachEle.type = "button";
                    addExamRequestAttachEle.value = "导入";
                    css(addExamRequestAttachEle).Add("button");
                    addExamRequestAttachEle.setAttribute("command", "AddExamRequestAttach");
                    addExamRequestAttachEle.onclick = function(uid) {
                        return function() {
                            var data = {};
                            data.ExamRequestUID = uid;
                            data.AttachMethod = 'Capture';
                            var param = {};
                            param.command = 'AddExamRequestAttach';
                            param.field = 'AddExamRequestAttach_' + uid;
                            param.condFields = param.field;
                            param.conv = "StaticValueConv('" + data.toJSONString() + "')";
                            usercommit(this, param);

                        }
                    }(uid);
                    examRequestAttachListContainer.appendChild(addExamRequestAttachEle);

                    var examRequestAttachListEle = examRequestEle.ownerDocument.createElement("div");
                    examRequestAttachListEle.setAttribute("field", "ExamRequestAttachUIDList");
                    examRequestAttachListEle.setAttribute("conv", "ExamRequestListForUSConv.ExamRequestAttachUIDListConv('" + uid + "')");
                    examRequestAttachListContainer.appendChild(examRequestAttachListEle);
                    examRequestEle.appendChild(examRequestAttachListContainer);

                    examRequestList.appendChild(examRequestEle);



                    modality.ExamRequestList[i].Container = examRequestEle;
                    examRequestEle.__modalityList = group;
                    examRequestEle.__examRequest = modality.ExamRequestList[i];
                }
            }
        }
    }

    function UpdateExamRequestItemForUS(examRequest) {
        var container = examRequest.Container;
        var group = container.__modalityList;
        var modalityIndex = -1;
        var examRequestIndex = -1;
        for (var i = 0; i < group.length; i++) {
            examRequestIndex = -1;
            for (var j = 0; j < group[i].ExamRequestList.length; j++) {
                if (group[i].ExamRequestList[j].UID == examRequest.UID) {
                    examRequestIndex = j;
                    break;
                }
            }
            if (examRequestIndex > -1) {
                modalityIndex = i;
                break;
            }
        }
        if (modalityIndex < 0) return;
        if (examRequest.Items.length < 1) {
            container.parentNode.removeChild(container);
            var modality = group[modalityIndex];
            for (var i = examRequestIndex; i < modality.ExamRequestList.length - 1; i++) {
                modality.ExamRequestList[i] = modality.ExamRequestList[i + 1];
            }
            modality.ExamRequestList.length--;
            UpdateModalityForUS(group, modalityIndex);
        } else {
            var examRequestDesc = container.children[0].children[0].children[0].children[0].children[0];
            var examRequestEquipList = container.children[0].children[1];
            var examRequestItemList = container.children[1].children[2];
            var index = -1;
            for (var i = 0; i < container.parentNode.children.length; i++) {
                if (container.parentNode.children[i] == container) {
                    index = i;
                    break;
                }
            }
            examRequestDesc.style.display = "none";
            examRequestDesc.innerHTML = "检查" + (index + 1) + ":";

            //"多退"
            for (var i = examRequestItemList.children.length - 1; i > -1; i--) {
                var uid = examRequestItemList.children[i].__examRequestItem.UID;
                var find = false;
                for (var j = 0; j < examRequest.Items.length; j++) {
                    if (uid == examRequest.Items[j].UID) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequestItemList.removeChild(examRequestItemList.children[i]);
            }
            //"少补"
            for (var i = examRequest.Items.length - 1; i > -1; i--) {
                var uid = examRequest.Items[i].UID;
                var index = -1;
                for (index = 0; index < examRequestItemList.children.length; index++) {
                    if (uid == examRequestItemList.children[index].__examRequestItem.UID) break;
                }
                if (index == examRequestItemList.children.length) {
                    var examRequestItemEle = container.ownerDocument.createElement("div");

                    examRequestItemEle.__examRequestItem = examRequest.Items[i];
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemBodyPartList', 'ExamRequestItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemExamItemList', 'ExamRequestItemExamItem', 'ExamItemList', 'ExamItemName', 'ExamItemID', 'ExamItem');
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemExamMethodList', 'ExamRequestItemExamMethod', 'ExamMethodList', 'ExamMethodName', 'ExamMethodID', 'ExamMethod');
                    var removeExamRequestItem = container.ownerDocument.createElement("div");
                    removeExamRequestItem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    css(removeExamRequestItem).Add("subitemsubtract");
                    removeExamRequestItem.setAttribute("command", "RemoveExamRequestItem");
                    removeExamRequestItem.onclick = function(uid) {
                        return function() {
                            try {
                                if (confirm("是否删除该项目？")) {
                                    var param = {};
                                    param.command = "RemoveExamRequestItem";
                                    param.field = "RemoveExamRequestItem_" + uid;
                                    param.condFields = param.field;
                                    param.conv = "StaticValueConv('" + uid + "')";
                                    usercommit(this, param);
                                }
                            } catch (err) {
                                throw err;
                            } finally {
                                this.parentNode.style.backgroundColor = "";
                            }
                        }
                    }(uid);
                    examRequestItemEle.appendChild(removeExamRequestItem);
                    var divclear = examRequestItemEle.ownerDocument.createElement("div");
                    divclear.style.cssText = "clear:both;";
                    examRequestItemEle.appendChild(divclear);
                    examRequestItemList.appendChild(examRequestItemEle);

                }
            }
        }
    }

    function UpdateExamRequestAttachListForUS(examRequest, attachListEle) {
        var examRequestUID = examRequest.UID;
        var attachList = examRequest.AttachList;
        //"多退"
        for (var i = attachListEle.children.length - 1; i > -1; i--) {
            var uid = attachListEle.children[i].__examRequestAttach.UID;
            var find = false;
            for (var j = 0; j < attachList.length; j++) {
                if (uid == attachList[j].UID) {
                    find = true;
                    break;
                }
            }
            if (!find) attachListEle.removeChild(attachListEle.children[i]);
        }
        //"少补"
        for (var i = attachList.length - 1; i > -1; i--) {
            var uid = attachList[i].UID;
            var index = -1;
            for (index = 0; index < attachListEle.children.length; index++) {
                if (uid == attachListEle.children[index].__examRequestAttach.UID) break;
            }
            if (index == attachListEle.children.length) {
                var examRequestAttachEle = attachListEle.ownerDocument.createElement("div");
                examRequestAttachEle.style.display = "inline-block";
                attachList[i].Container = examRequestAttachEle;
                var attachEle = attachListEle.ownerDocument.createElement("img");
                attachEle.src = attachList[i].Url;
                attachEle.alt = "申请单";
                attachEle.style.maxWidth = "96px";
                attachEle.style.maxHeight = "96px";
                attachEle.setAttribute("field", "ExamRequestAttachUrl");
                attachEle.setAttribute("conv", "ExamRequestListForUSConv.ExamRequestAttachUrlConv('" + uid + "')");
                examRequestAttachEle.appendChild(attachEle);
                var removeEle = attachListEle.ownerDocument.createElement("span");
                removeEle.style.cursor = "pointer";
                removeEle.style.backgroundColor = "black";
                removeEle.style.color = "white";
                removeEle.innerText = "X";
                removeEle.title = "删除申请单";
                examRequestAttachEle.appendChild(removeEle);
                removeEle.onclick = function(uid) {
                    return function() {
                        try {
                            var Count = this.parentNode.parentElement.childElementCount;
                            if (confirm("是否删除该申请单？")) {
                                var d = {};
                                d.ExamRequestUID = examRequestUID;
                                d.ExamRequestAttachUID = uid;
                                var param = {};
                                param.command = "RemoveExamRequestAttach";
                                param.field = "RemoveExamRequestAttach_" + examRequestUID + "_" + uid;
                                param.condFields = param.field;
                                param.conv = "StaticValueConv('" + d.toJSONString() + "')";
                                usercommit(this, param);

                            }
                        } catch (err) {
                            throw err;
                        } finally {
                            this.parentNode.style.backgroundColor = "";
                        }
                    }
                }(uid);
                attachListEle.appendChild(examRequestAttachEle);
                examRequestAttachEle.__examRequestAttach = attachList[i];
            }
        }
    }

    function createDataConv(container, uid, uidMember, dataField, dataMember) {
        var dataEle = container.ownerDocument.createElement("input");
        dataEle.type = "text";
        container.appendChild(dataEle);
        dataEle.setAttribute("field", dataField);
        dataEle.setAttribute("conv", "ExamRequestListForUSConv.UIDDataConv('" + uid + "','" + uidMember + "','" + dataMember + "')");
        dataEle.onchange = function() {
            changeFieldValue(this);
        }
        return dataEle;
    }

    ExamRequestListForUSConv.ExamRequestModalityCodeConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var group = ele.parentNode.__modalityList;
                if (!group) group = ele.parentNode.__modalityList = [];
                RemoveExamRequest(group, val.ExamRequestUID, function(modality) {
                    return modality.ModalityCode == val.ModalityCode;
                });
                var index = -1;
                for (index = 0; index < group.length; index++) {
                    if (group[index].ModalityCode == val.ModalityCode) break;
                }
                if (index == group.length) {
                    var container = ele.ownerDocument.createElement("div");
                    // css(container).Add("inspect");
                    //container.style.cssText = "margin-top:5px;border-radius: 4px;background-color: rgb(242, 242, 242);border-style: solid;border-width: 1px;border-color: rgb(179, 179, 179);box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.2);";


                    ele.appendChild(container);
                    group[index] = { "ModalityCode": val.ModalityCode, "ExamRequestList": [{ "UID": val.ExamRequestUID, "Items": [], "AttachList": [] }], "Container": container };
                    UpdateModalityForUS(group, index);
                } else {
                    var find = false;
                    for (var i = 0; i < group[index].ExamRequestList.length; i++) {
                        if (group[index].ExamRequestList[i].UID == val.ExamRequestUID) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        group[index].ExamRequestList[group[index].ExamRequestList.length] = { "UID": val.ExamRequestUID, "Items": [], "AttachList": [] };
                        UpdateModalityForUS(group, index);
                    }
                }
            }
        }(this);
    }
    ExamRequestListForUSConv.UIDDataConv = function(uid, uidMember, dataMember) {
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        var baseApplyValue = this.ApplyValue;
        this.ApplyValue = function(ele, val) {
            val = val[dataMember];
            baseApplyValue(ele, val);
        }
        var baseGetUIValue = this.GetUIValue;
        this.GetUIValue = function(ele) {
            var val = {};
            val[uidMember] = uid;
            var data = baseGetUIValue(ele);
            val[dataMember] = data;
            return val.toJSONString();
        }
    }
    ExamRequestListForUSConv.ExamRequestScheduleTimeConv = function(examRequestUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ScheduleTime']);
        this.ApplyValue = function(ele, val) {
            val = val.ScheduleTime;
            ele.children[0].checked = val && val != "";
            ele.children[2].style.display = val && val != "" ? "" : "none";
            ele.children[2].value = val;
        }
        this.GetUIValue = function(ele) {
            var val = {};
            val['ExamRequestUID'] = examRequestUID;
            val.ScheduleTime = ele.children[0].checked ? ele.children[2].value : null;
            return val.toJSONString();
        }
    }
    ExamRequestListForUSConv.ExamRequestPrintTicketConv = function(examRequestUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'PrintTicket']);
        this.ApplyValue = function(ele, val) {
            val = val.PrintTicket;
            ele.checked = val;
        }
        this.GetUIValue = function(ele) {
            var val = {};
            val['ExamRequestUID'] = examRequestUID;
            val.PrintTicket = ele.checked;
            return val.toJSONString();
        }
    }
    ExamRequestListForUSConv.ExamRequestAttachUIDListConv = function(examRequestUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'AttachUIDList']);
        this.ApplyValue = function(ele, val) {
            val = val.AttachUIDList;
            if (!val) return;
            var examRequest = ele.parentNode.parentNode.__examRequest;
            var attachList = examRequest.AttachList;
            for (var i = 0; i < val.length; i++) {
                var find = false;
                for (var j = 0; j < attachList.length; j++) {
                    if (attachList[j].UID == val[i]) {
                        find = true;
                        break;
                    }
                }
                if (!find) attachList[attachList.length] = { "UID": val[i] };
            }
            UpdateExamRequestAttachListForUS(examRequest, ele);
        }
    }

    function createDataListConv(container, uid, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
        var dataListEle = container.ownerDocument.createElement("span");
        dataListEle.setAttribute("field", listField);
        dataListEle.setAttribute("itemField", currField);
        dataListEle.setAttribute("valueMember", valueMember);
        dataListEle.setAttribute("displayMember", displayMember);
        if (objectMember) {
            dataListEle.setAttribute("conv", "ExamRequestListForUSConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
        } else {
            dataListEle.setAttribute("conv", "ExamRequestListForUSConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
        }
        container.appendChild(dataListEle);
        return dataListEle;
    }
    ExamRequestListForUSConv.RemoveExamRequestAttachConv = function(examRequestUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ExamRequestAttachUID']);
        this.ApplyValue = function(ele, val) {
            var examRequest = ele.parentNode.__examRequest;
            var attachList = examRequest.AttachList;
            var find = false;
            for (var i = attachList.length - 1; i > -1; i--) {
                if (attachList[i].UID == val.ExamRequestAttachUID) {
                    find = true;
                    for (var j = i; j < attachList.length - 1; j++) {
                        attachList[j] = attachList[j + 1];
                    }
                    attachList.length--;
                }
            }
            if (find) UpdateExamRequestAttachListForUS(examRequest, ele.children[2]);
        }
    }
    ExamRequestListForUSConv.ExamRequestAttachUrlConv = function(examRequestAttachUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestAttachUID, 'ExamRequestAttachUID', 'AttachUrl']);
        this.ApplyValue = function(ele, val) {
            ele.parentNode.__examRequestAttach.Url = val.AttachUrl;
            ele.src = val.AttachUrl;
        }
    }
    ExamRequestListForUSConv.ItemListConv = function(examRequestUID) {
        ExamRequestListForUSConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ItemUIDList']);
        this.ApplyValue = function(ele, val) {
            var examRequest = ele.parentNode.parentNode.__examRequest;
            var val = val.ItemUIDList;
            for (var i = val.length - 1; i > -1; i--) {
                var find = false;
                for (var j = 0; j < examRequest.Items.length; j++) {
                    if (examRequest.Items[j].UID == val[i]) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequest.Items[examRequest.Items.length] = { "UID": val[i], "Container": ele };
            }
            UpdateExamRequestItemForUS(examRequest);
        }
    }

    function RemoveExamRequest(group, rmvUID, modalityFilter) {
        for (var i = group.length - 1; i > -1; i--) {
            if (modalityFilter && modalityFilter(group[i])) continue;
            var find = false;
            for (var j = group[i].ExamRequestList.length - 1; j > -1; j--) {
                if (group[i].ExamRequestList[j].UID == rmvUID) {
                    find = true;
                    for (var k = j; k < group[i].ExamRequestList.length - 1; k++) {
                        group[i].ExamRequestList[k] = group[i].ExamRequestList[k + 1];
                    }
                    group[i].ExamRequestList.length--;
                }
            }
            if (find) UpdateModalityForUS(group, i);
        }
    }
    ExamRequestListForUSConv.RemoveExamRequestConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                RemoveExamRequest(ele.__modalityList, val, null);
            }
        }(this);
    }
    ExamRequestListForUSConv.RemoveItemConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequest = ele.parentNode.__examRequest;
                var examRequestItem = null;
                for (var i = examRequest.Items.length - 1; i > -1; i--) {
                    if (examRequest.Items[i].UID == val) {
                        examRequestItem = examRequest.Items[i];
                        for (var j = i; j < examRequest.Items.length - 1; j++) {
                            examRequest.Items[j] = examRequest.Items[j + 1];
                        }
                        examRequest.Items.length--;
                        break;
                    }
                }
                if (examRequestItem) UpdateExamRequestItemForUS(examRequest);
            }
        }(this);
    }

    ExamRequestListForUSConv.DropDownInputConv = function(uid, uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
        //filter:下拉列表过滤器，为非function表示不过滤
        //currNotObject:选项数据是否非value-display对象
        //readOnly:是否不可手工录入
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        var inheritProperties_base = this.InheritProperties;
        this.InheritProperties = function(srcElement, desElement) {
            var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";

            Form.SetAttribute(desElement, "conv", "ExamRequestListForUSConv.DropDownInputConv.DropDownInputItemConv('" + uid + "','" + uidMember + "','" + listMember + "','" + objectMember + "'," + itemStyle + "," + currNotObject + "," + readOnly + ")", true);
            Form.InheritAttributes(srcElement, desElement);
        }
        this.DecodeArguments = function(ele, args) {
            //统一数据格式为value-display对象
            if (!args || !args[0] || !args[0][listMember]) return args;
            var valueMember = ele.getAttribute("valueMember");
            var displayMember = ele.getAttribute("displayMember");
            var inputMember = ele.getAttribute("inputMember");

            if (!valueMember) valueMember = "__valueMember";
            if (!displayMember) displayMember = "__displayMember";
            if (!inputMember) inputMember = "__inputMember";

            var list = [];
            for (var i = 0; i < args[0][listMember].length; i++) {
                var item = args[0][listMember][i];
                list[i] = {};
                list[i][valueMember] = item && typeof item[valueMember] != 'undefined' ? item[valueMember] : item;
                list[i][displayMember] = item && typeof item[displayMember] != 'undefined' ? item[displayMember] : item;
                list[i][inputMember] = item && typeof item[inputMember] != 'undefined' ? item[inputMember] : item;
            }
            args[0][listMember] = list;
            return args[0];
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                val = val[listMember];
                var valueMember = ele.getAttribute("valueMember");
                var displayMember = ele.getAttribute("displayMember");
                var inputMember = ele.getAttribute("inputMember");

                if (!valueMember) valueMember = "__valueMember";
                if (!displayMember) displayMember = "__displayMember";
                if (!inputMember) inputMember = "__inputMember";

                if (!filter && typeof(filter) != 'function') {
                    filter = function(data, tester) {
                        if (data == tester) return true;
                        if (typeof data[inputMember] == "string" && data[inputMember].indexOf(tester) > -1) return true;
                        if (typeof data[displayMember] == "string" && data[displayMember].indexOf(tester) > -1) return true;
                        return false;
                    }
                }
                var list = ele.__list;
                if (!list) list = ele.__list = [];
                var menu = ele.__menu;
                if (!menu) {
                    var doc = Wnd(ele).GetDocument();
                    var div = doc.createElement("div");
                    var unhook = function() {
                        setTimeout(function() {
                            Event.UnhookMouseOut(div);
                            if (ele.__menu) ele.__menu.Fold();
                        }, 1);
                    }
                    var mouseOutCall = function(relEle, currEle) {
                        return !menu.InnerElement(currEle);
                    };
                    var hook = function() {
                        Event.HookMouseOut(div, function(leave) {
                            if (leave) unhook();
                        }, mouseOutCall);
                    }
                    css(div).Add(style.dropItem);
                    ele.appendChild(div);

                    var divInput = doc.createElement("div");
                    div.appendChild(divInput);
                    var text = doc.createElement("INPUT");
                    text.type = "text";
                    css(text).Add("dropText");
                    divInput.appendChild(text);
                    var theSameText = function(t1, t2) {
                        return t1 == t2 || ((t1 == "未定义" || !t1 || t1 == "") && (t2 == "未定义" || !t2 || t2 == ""));
                    }
                    text.onchange = function() {
                        var items = menu.Items();
                        var d = null;
                        if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                            d = text.__currData;
                        } else {
                            for (var i = 0; i < items.Count(); i++) {
                                var item = items.ItemAt(i).GetData();
                                if (theSameText(item[displayMember], Element(text).getText())) {
                                    d = item;
                                    break;
                                }
                            }
                            if (!d && !readOnly) {
                                d = {};
                                if (currNotObject) {
                                    d[valueMember] = d[displayMember] = Element(text).getText();
                                } else {
                                    d[valueMember] = null;
                                    d[displayMember] = Element(text).getText();
                                }
                            }
                        }
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    text.onkeyup = function() {
                        var items = menu.Items();
                        if (Event().KeyCode() == 13) {
                            unhook();
                            var d = null;
                            if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                                d = text.__currData;
                            } else {
                                for (var i = 0; i < items.Count(); i++) {
                                    var item = items.ItemAt(i).GetData();
                                    if (theSameText(item[displayMember], Element(text).getText())) {
                                        d = item;
                                        break;
                                    }
                                }
                                if (!d) {
                                    if (typeof filter == 'function') {
                                        for (var i = 0; i < items.Count(); i++) {
                                            var item = items.ItemAt(i).GetData();
                                            if (filter(item, Element(text).getText())) {
                                                d = item;
                                                break;
                                            }
                                        }
                                    }
                                    if (!d && !readOnly) {
                                        d = {};
                                        if (currNotObject) {
                                            d[valueMember] = d[displayMember] = Element(text).getText();
                                        } else {
                                            d[valueMember] = null;
                                            d[displayMember] = Element(text).getText();
                                        }
                                    }
                                }
                            }
                            text.__currData = d;
                            Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                            changeFieldValue(text);
                        } else {
                            if (typeof filter == 'function') {
                                items.Clear();
                                for (var i = 0; i < list.length; i++) {
                                    if (filter(list[i], Element(text).getText()))
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
                    text.onfocus = function() {
                        var items = menu.Items();
                        if (typeof filter == 'function') {
                            items.Clear();
                            for (var i = 0; i < list.length; i++) {
                                if (filter(list[i], Element(text).getText()))
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
                    var divDrop = document.createElement("div");
                    css(divDrop).Add("dropImage");
                    divInput.appendChild(divDrop);

                    self.InheritProperties(ele, text);

                    menu = ele.__menu = text.__menu = new Menu(div, style, true);
                    menu.Fold();
                    menu.DrawItem = function(parent, curr, total, index, e) {
                        var data = curr.GetData();
                        e.title = Element(e).setText(data[displayMember]);
                        e.__currData = data;
                        e.onclick = function() {
                            unhook();
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
                            if (typeof filter == 'function') {
                                var items = menu.Items();
                                items.Clear();
                                for (var i = 0; i < list.length; i++) {
                                    if (filter(list[i], Element(text).getText()))
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
                        } else {
                            unhook();
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
                    if (d1[displayMember] != d2[displayMember] || d1[valueMember] != d2[valueMember] || d1[inputMember] != d2[inputMember]) {
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
        ExamRequestListForUSConv.DropDownInputConv.DropDownInputItemConv = function(uid, uidMember, listMember, objectMember, style, currNotObject, readOnly) {
            Form_SingleValueConv.apply(this, arguments);
            this.DetermineApply = function(ele, val) {
                return val[uidMember] == uid;
            }
            this.ApplyValue = function(ele, val) {
                var valueMember = ele.getAttribute("valueMember");
                var displayMember = ele.getAttribute("displayMember");

                if (!valueMember) valueMember = "__valueMember";
                if (!displayMember) displayMember = "__displayMember";
                var items = ele.__menu.Items();
                var d = null;
                if (currNotObject || !val) {
                    val = val[valueMember];
                    for (var i = 0; i < items.Count(); i++) {
                        var item = items.ItemAt(i).GetData();
                        if (item[valueMember] == val) {
                            d = item;
                            break;
                        }
                    }
                    if (!d && !readOnly) {
                        d = {};
                        d[valueMember] = d[displayMember] = val;
                    }
                } else {
                    val = val[objectMember];
                    if (val) {
                        for (var i = 0; i < items.Count(); i++) {
                            var item = items.ItemAt(i).GetData();
                            if (item[valueMember] == val[valueMember]) {
                                d = item;
                                break;
                            }
                        }
                    }
                    if (!d) d = val;
                }
                ele.__currData = d;
                Element(ele).setText(ele.__currData ? ele.__currData[displayMember] : null);
            }
            this.GetUIValue = function(self) {
                return function(ele) {
                    var valueMember = ele.getAttribute("valueMember");
                    var displayMember = ele.getAttribute("displayMember");

                    if (!valueMember) valueMember = "__valueMember";
                    if (!displayMember) displayMember = "__displayMember";
                    var d = {};
                    d[uidMember] = uid;
                    if (currNotObject) {
                        d[valueMember] = ele.__currData ? ele.__currData[valueMember] : null;
                    } else {
                        var value = null;
                        if (!ele.__currData) {
                            if (!readOnly) {
                                value = {};
                                value[valueMember] = null;
                                value[displayMember] = Element(ele).getText();
                            } else {
                                value = null;
                            }
                        } else {
                            value = {};
                            value[valueMember] = ele.__currData[valueMember];
                            value[displayMember] = ele.__currData[displayMember];
                        }
                        d[objectMember] = value;
                    }
                    return d.toJSONString();
                }
            }(this);
        }
    }
    ExamRequestListForUSConv.BodyPartItemListConv = function(uid, uidMember, style, maxSize) {
        Form_SingleValueConv.apply(this);

        function createDataListConv(container, uid, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
            var dataListEle = container.ownerDocument.createElement("span");
            dataListEle.setAttribute("field", listField);
            dataListEle.setAttribute("itemField", currField);
            dataListEle.setAttribute("valueMember", valueMember);
            dataListEle.setAttribute("displayMember", displayMember);
            if (objectMember) {
                dataListEle.setAttribute("conv", "ExamRequestListForUSConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
            } else {
                dataListEle.setAttribute("conv", "ExamRequestListForUSConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
            }
            container.appendChild(dataListEle);
            return dataListEle;
        }
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequest = ele.parentNode.parentNode.__examRequest;
                var val = val.ItemUIDList;
                if (val) {
                    for (var i = 0; i < val.length; i++) {
                        var find = false;
                        for (var j = 0; j < examRequest.Items.length; j++) {
                            if (val[i] == examRequest.Items[j].UID) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) examRequest.Items[examRequest.Items.length] = { "UID": val[i], "Container": ele };
                    }
                }
                if (!ele.__bodyPartItems) ele.__bodyPartItems = createDataListConv(ele, uid, 'ExamRequestItemUID', 'ExamRequestItemBodyPartList', 'ExamRequestItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
            }
        }(this);
    }

    ExamRequestListForUSConv.BodyPartItemListConv.RemoveItemConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequestItems = ele.parentNode.__examRequest.Items;
                var examRequestItem = null;
                for (var i = examRequestItems.length - 1; i > -1; i--) {
                    if (examRequestItems[i].UID == val) {
                        examRequestItem = examRequestItems[i];
                        for (var j = i; j < examRequestItems.length - 1; j++) {
                            examRequestItems[j] = examRequestItems[j + 1];
                        }
                        examRequestItems.length--;
                        break;
                    }
                }
                if (examRequestItem) {
                    var result = [];
                    var menu = examRequestItem.Container.__bodyPartItems.__menu;
                    var items = menu.Items();
                    var cnt = items.Count();
                    var change = false;
                    for (var j = 0; j < cnt; j++) {
                        var item = items.ItemAt(j);
                        var data = item.GetData();
                        for (var k = item.__list.length - 1; k > -1; k--) {
                            if (item.__list[k] == val) {
                                for (var l = k; l < item.__list.length - 1; l++) {
                                    item.__list[l] = item.__list[l + 1];
                                }
                                item.__list.length--;
                                item.__changed = true;
                            }
                        }
                        item.__selected = item.__list.length > 0;
                        if (item.__changed) {
                            change = true;
                            item.Refresh();
                        }
                        if (item.__selected) result[result.length] = { "data": data, "count": item.__list.length };
                    }
                    if (change && !menu.Unfolded()) menu.Fold(true);
                    ele = examRequestItem.Container.__bodyPartItems.children[0].children[0];
                    if (result.length < 1) {
                        ele.innerHTML = "";
                        ele.title = "-未选择-";
                    } else {
                        var arr = new Array();
                        for (var i = 0; i < result.length; i++) {
                            var t = result[i].data[ele.getAttribute("displayMember")];
                            arr[i] = (result[i].count > 1) ? t + "(" + result[i].count + ")" : t;
                        }
                        ele.title = Element(ele).setText(arr.join("+"));
                    }
                }
            }
        }(this);
    }

    ExamRequestListForUSConv.BodyPartItemListConv.DropDownInputConv = function(ownerUID, uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
        //filter:下拉列表过滤器，为非function表示不过滤
        //currNotObject:选项数据是否非value-display对象
        //readOnly:是否不可手工录入
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            var examRequestItems = ele.parentNode.parentNode.parentNode.__examRequest.Items;
            for (var i = 0; i < examRequestItems.length; i++) {
                if (examRequestItems[i].UID == val[uidMember]) return true;
            }
            return false;
        }
        this.InheritProperties = function(srcElement, desElement) {
            Form.SetAttribute(desElement, "conv", "ExamRequestListForUSConv.BodyPartItemListConv.DropDownInputConv.DropItemConv(" + "'" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + null + "," + false + ")", true);
            Form.InheritAttributes(srcElement, desElement);
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                val = val[listMember];
                var displayMember = ele.getAttribute("displayMember");
                var valueMember = ele.getAttribute("valueMember");
                var menu = ele.__menu;
                if (!menu) {
                    var root = document.createElement("div");
                    var unhook = function() {
                        Event.UnhookMouseOut(root);
                        if (ele.__menu) ele.__menu.Fold();
                    }
                    var mouseOutCall = function(relEle, currEle) {
                        return !menu.InnerElement(currEle);
                    };
                    var hook = function() {
                        Event.HookMouseOut(root, function(leave) {
                            if (leave) unhook();
                        }, mouseOutCall);
                    }
                    css(root).Add(style.dropItem);
                    var spMenu = document.createElement("div");
                    css(spMenu).Add("dropText");
                    root.appendChild(spMenu);
                    var spDrop = document.createElement("div");
                    css(spDrop).Add("dropImage");
                    root.appendChild(spDrop);
                    ele.appendChild(root);

                    self.InheritProperties(ele, spMenu);

                    menu = ele.__menu = spMenu.__menu = new Menu(root, style, true);
                    menu.DrawItem = function(parent, curr, total, index, ee) {
                        var span;
                        var lab;
                        var text;
                        var data = curr.GetData();
                        if (ee.children.length < 1) {
                            span = document.createElement("div");
                            span.style.width = "100%";

                            lab = document.createElement("span");
                            //                      Element(lab).setText('□ ');
                            css(lab).Add(style.label);
                            text = document.createElement("span");
                            css(text).Add(style.text);
                            span.appendChild(lab);
                            span.appendChild(text);

                            span.title = Element(text).setText(data[displayMember]);
                            ee.appendChild(span);
                        } else {
                            span = ee.children[0];
                            lab = span.children[0];
                            text = span.children[1];

                            span.title = Element(text).setText(data[displayMember]);
                        }
                        span.onclick = function(e) {
                            return function() {
                                curr.__changed = true;
                                var border = ee.style.border;
                                try {
                                    ee.style.border = "1px solid red";
                                    if (!curr.__selected) {
                                        menu.__addingData = data;
                                        var param = {};
                                        param.command = 'AddExamRequestItem';
                                        param.field = 'AddExamRequestItem_' + ownerUID;
                                        param.condFields = param.field;
                                        param.conv = "StaticValueConv('" + ownerUID + "')";
                                        usercommit(this, param);
                                    } else {
                                        if (curr.__list.length < 1) {
                                            alert("没有选择要删除的部位");
                                        } else {
                                            //                                        if (confirm("是否删除该项目？")) {//..
                                            var param = {};
                                            param.command = "RemoveExamRequestItem";
                                            param.field = "RemoveExamRequestItem_" + curr.__list[curr.__list.length - 1];
                                            param.condFields = param.field;
                                            param.conv = "StaticValueConv('" + curr.__list[curr.__list.length - 1] + "')";
                                            usercommit(this, param);
                                            //                                        }
                                        }
                                    }
                                } catch (err) {
                                    throw err;
                                } finally {
                                    ee.style.border = border;
                                }
                            };
                        }(span);


                        var item = curr;
                        var e = span;
                        if (item.__selected) {
                            css(e).Remove(style.unselectedItem);
                            css(e).Add(style.selectedItem);
                            //                        Element(lab).setText("■");
                            css(lab).Remove(style.unselectedLabel);
                            css(lab).Add(style.selectedLabel);
                            css(text).Remove(style.unselectedText);
                            css(text).Add(style.selectedText);
                        } else {
                            css(e).Remove(style.selectedItem);
                            css(e).Add(style.unselectedItem);
                            //                        Element(lab).setText("□ ");
                            css(lab).Remove(style.selectedLabel);
                            css(lab).Add(style.unselectedLabel);
                            css(text).Remove(style.selectedText);
                            css(text).Add(style.unselectedText);
                        }
                        curr.__changed = false;
                        return true;
                    };
                    ele.onclick = function() {
                        var source = Event().Source();
                        if (source != ele && source != root && source != spMenu && source != spDrop) return;
                        if (!menu.Unfolded()) {
                            var bounds = { 'x': -1, 'y': root.offsetHeight - 1 };
                            if (maxSize) {
                                bounds.width = maxSize.width;
                                bounds.height = maxSize.height;
                            }
                            menu.Unfold(bounds, { 'offsetY': root.offsetHeight });
                            hook();
                        } else {
                            unhook();
                        }
                    }
                }
                var len = !val || !val.length ? 0 : val.length;
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
        }(this);
        ExamRequestListForUSConv.BodyPartItemListConv.DropDownInputConv.DropItemConv = function(uidMember, listMember, objectMember, style) {
            Form_SingleValueConv.apply(this);
            this.DetermineApply = function(ele, val) {
                var examRequestItems = ele.parentNode.parentNode.parentNode.parentNode.parentNode.__examRequest.Items;
                for (var i = 0; i < examRequestItems.length; i++) {
                    if (examRequestItems[i].UID == val[uidMember]) return true;
                }
                return false;
            }
            this.ApplyValue = function(ele, val) {
                var uid = val[uidMember];
                val = val[objectMember];
                var menu = ele.__menu;
                var result = [];
                var valueMember = ele.getAttribute("valueMember");
                var len = !val || !val.length ? 0 : val.length;
                var items = menu.Items();
                var cnt = items.Count();
                var change = false;
                for (var i = 0; i < cnt; i++) {
                    var item = items.ItemAt(i);
                    if (!item.__list) item.__list = [];
                    var data = item.GetData();
                    if (data[valueMember] == val[valueMember]) {
                        var find = false;
                        for (var j = 0; j < item.__list.length; j++) {
                            if (item.__list[j] == uid) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            item.__list[item.__list.length] = uid;
                            item.__changed = true;
                        }
                    } else {
                        for (var j = item.__list.length - 1; j > -1; j--) {
                            if (item.__list[j] == uid) {
                                for (var k = j; k < item.__list.length - 1; k++) {
                                    item.__list[k] = item.__list[k + 1];
                                }
                                item.__list.length--;
                                item.__changed = true;
                                break;
                            }
                        }
                    }
                    item.__selected = item.__list.length > 0;
                    if (item.__changed) {
                        change = true;
                        item.Refresh();
                    }
                    if (item.__selected) result[result.length] = { "data": data, "count": item.__list.length };
                }
                if (change && !menu.Unfolded()) menu.Fold(true);

                if (result.length < 1) {
                    Element(ele).setText("");
                    ele.title = "-未选择-";
                } else {
                    var arr = new Array();
                    for (var i = 0; i < result.length; i++) {
                        var t = result[i].data[ele.getAttribute("displayMember")];
                        arr[i] = (result[i].count > 1) ? t + "(" + result[i].count + ")" : t;
                    }
                    ele.title = Element(ele).setText(arr.join("+"));
                }
                if (menu.__addingData) {
                    var d = {};
                    d[uidMember] = uid;
                    d[objectMember] = menu.__addingData;
                    menu.__addingData = null;
                    var param = {};
                    param.field = "ExamRequestItemBodyPart";
                    param.conv = "StaticValueConv('" + d.toJSONString() + "')";
                    window.useroperate(ele, changeFieldValue, param);
                }
            }
            this.GetUIValue = function(self) {
                return function(ele) {
                    var menu = ele.__menu;
                    var val = [];
                    var valueMember = ele.getAttribute("valueMember");

                    var items = menu.Items();
                    var cnt = items.Count();
                    for (var i = 0; i < cnt; i++) {
                        var item = items.ItemAt(i);
                        if (item.__selected) val[val.length] = item.GetData()[valueMember];
                    }
                    return val;
                }
            }(this);
        }
    }
}



ExamRequestListConv.AddingExamRequest = 0;

function ExamRequestListConv(mode, style, maxSize) {
    //mode:项目形式，0:检查部位-检查项目-检查方法,!0:检查部位
    Form_SingleValueConv.apply(this, arguments);
    if (!style) style = {
        'label': 'unselectedLabel',
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
        'first': 'first',
        'middle': 'middle',
        'single': 'single',
        'last': 'last'
    };
    if (!maxSize) maxSize = { 'height': 240 };
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!ele.__modalityListEle) {
                var form = formCallCenter.DetectFormByElement(ele);
                form.requestData("ModalityList");

                var examRequestList = ele.ownerDocument.createElement("div");
                //examRequestList.style.cssText = examRequestList.style.cssText + "border:1px solid blue; width:450px;";
                examRequestList.setAttribute("field", "RemoveExamRequest");
                examRequestList.setAttribute("command", "RemoveExamRequest");
                examRequestList.setAttribute("conv", "ExamRequestListConv.RemoveExamRequestConv");
                ele.appendChild(examRequestList);
                var modalityCodeList = ele.ownerDocument.createElement("div");
                modalityCodeList.setAttribute("field", "ExamRequestModalityCode");
                modalityCodeList.setAttribute("conv", "ExamRequestListConv.ExamRequestModalityCodeConv");
                examRequestList.appendChild(modalityCodeList);
                ele.__modalityListEle = modalityCodeList;
            }
        }
    }(this);

    function UpdateModality(group, index) {
        var modality = group[index];
        var container = modality.Container;
        if (modality.ExamRequestList.length < 1) {
            container.parentNode.removeChild(container);
            for (var k = index; k < group.length - 1; k++) {
                group[k] = group[k + 1];
            }
            group.length--;
        } else {
            var examRequestList;
            if (!container.__modalityEle) {
                container.__modalityEle = container.ownerDocument.createElement("div");
                container.appendChild(container.__modalityEle);
                examRequestList = container.ownerDocument.createElement("div");
                container.appendChild(examRequestList);
            } else {
                examRequestList = container.children[1];
            }
            container.__modalityEle.innerHTML = modality.ModalityCode + "检查(" + modality.ExamRequestList.length + ")";
            css(container.__modalityEle).Add("headinspect");
            //"多退"
            for (var i = examRequestList.children.length - 1; i > -1; i--) {
                var uid = examRequestList.children[i].__examRequest.UID;
                var find = false;
                for (var j = 0; j < modality.ExamRequestList.length; j++) {
                    if (uid == modality.ExamRequestList[j].UID) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequestList.removeChild(examRequestList.children[i]);
            }
            //"少补"
            for (var i = modality.ExamRequestList.length - 1; i > -1; i--) {
                var uid = modality.ExamRequestList[i].UID;
                var index = -1;
                for (index = 0; index < examRequestList.children.length; index++) {
                    if (uid == examRequestList.children[index].__examRequest.UID) break;
                }
                if (index == examRequestList.children.length) {
                    var examRequestEle = container.ownerDocument.createElement("div");

                    examRequestEle.style.cssText = examRequestEle.style.cssText + "height:auto;overflow:hidden;margin-left:4px;margin-right:4px;margin-bottom:8px;margin-top:8px;border-radius: 4px;background-color: rgb(242, 242, 242);border-style: solid;border-width: 1px;border-color: rgb(179, 179, 179);box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.2);";
                    var examRequestHeaderEle = examRequestEle.ownerDocument.createElement("table");
                    examRequestHeaderEle.style.width = "100%";
                    examRequestHeaderEle.style.cssText = "width:100%;margin-top:8px;";
                    examRequestEle.appendChild(examRequestHeaderEle);
                    var examRequestHeaderBody = examRequestEle.ownerDocument.createElement("tbody");
                    examRequestHeaderEle.appendChild(examRequestHeaderBody);
                    var examRequestHeaderRow = examRequestEle.ownerDocument.createElement("tr");
                    examRequestHeaderBody.appendChild(examRequestHeaderRow);
                    var examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    examRequestHeaderRow.appendChild(examRequestHeaderCell);

                    var examRequestDesc = examRequestEle.ownerDocument.createElement("span");
                    examRequestHeaderCell.appendChild(examRequestDesc);

                    var examRequestEquipEle = examRequestEle.ownerDocument.createElement("span");
                    //examRequestEquipEle.style.float = 'left';
                    //examRequestEquipEle.style.marginTop = '4px';
                    examRequestEquipEle.innerText = "设   备";
                    css(examRequestEquipEle).Add("infolistspan");
                    examRequestHeaderCell.appendChild(examRequestEquipEle);
                    createDataListConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestEquipmentList', 'ExamRequestEquipmentID', 'EquipmentList', 'EquipmentName', 'EquipmentID', null, true);

                    var examRequestCostTypeEle = examRequestEle.ownerDocument.createElement("span");

                    examRequestCostTypeEle.innerText = "费   用:";
                    css(examRequestCostTypeEle).Add("infolistspan");
                    examRequestHeaderCell.appendChild(examRequestCostTypeEle);
                    createDataListConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestCostTypeList', 'ExamRequestCostType', 'CostTypeList', 'CostTypeName', 'CostTypeID', 'CostType', true);

                    var examRequestCostValueEle = createDataConv(examRequestHeaderCell, uid, 'ExamRequestUID', 'ExamRequestCostValue', 'CostValue');
                    css(examRequestCostValueEle).Add(style.dropText);
                    examRequestCostValueEle.style.cssText = "float:left;width:48px; height:22px;margin-top:1px;margin-left:3px; ";

                    examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    examRequestHeaderRow.appendChild(examRequestHeaderCell);
                    examRequestHeaderCell.setAttribute("rowspan", '2');
                    var div = examRequestHeaderCell.ownerDocument.createElement("div");
                    examRequestHeaderCell.appendChild(div);
                    css(div).Add("deletepng");
                    div.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    div.title = "删除检查";
                    div.onclick = function(uid) {
                        return function() {
                            if (confirm("是否删除该检查")) {
                                var param = {};
                                param.command = 'RemoveExamRequest';
                                param.field = 'RemoveExamRequest_' + uid;
                                param.condFields = param.field;
                                param.conv = "StaticValueConv('" + uid + "')";
                                usercommit(this, param);
                            }
                        }
                    }(uid);

                    examRequestHeaderRow = examRequestEle.ownerDocument.createElement("tr");
                    examRequestHeaderBody.appendChild(examRequestHeaderRow);
                    examRequestHeaderCell = examRequestEle.ownerDocument.createElement("td");
                    examRequestHeaderRow.appendChild(examRequestHeaderCell);

                    var scheduleTimeEle = examRequestHeaderEle.ownerDocument.createElement("div");
                    scheduleTimeEle.setAttribute("field", "ExamRequestScheduleTime");
                    scheduleTimeEle.setAttribute("conv", "ExamRequestListConv.ExamRequestScheduleTimeConv('" + uid + "')");
                    scheduleTimeEle.style.cursor = "pointer";
                    scheduleTimeEle.style.display = "inline-block";
                    var scheduleTimeCheck = examRequestHeaderEle.ownerDocument.createElement("input");
                    scheduleTimeCheck.type = "checkbox";
                    scheduleTimeCheck.style.cssText = "margin-left:22px;";
                    scheduleTimeEle.appendChild(scheduleTimeCheck);
                    var scheduleTimeLabel = examRequestHeaderEle.ownerDocument.createElement("span");
                    scheduleTimeLabel.innerText = "预约";
                    css(scheduleTimeLabel).Add("appointment");
                    scheduleTimeEle.appendChild(scheduleTimeLabel);
                    var scheduleTimeText = examRequestHeaderEle.ownerDocument.createElement("input");
                    scheduleTimeText.setAttribute("onclick", "WdatePicker({onpicked:function(){}, dateFmt:'yyyy-MM-dd HH:mm:ss', readOnly: true,qsEnabled:false,autoUpdateOnChanged:true});");
                    css(scheduleTimeText).Add("appointmentinput");
                    scheduleTimeEle.appendChild(scheduleTimeText);
                    scheduleTimeCheck.onchange = function(scheduleTimeEle) {
                        return function() {
                            scheduleTimeText.style.display = this.checked ? "" : "none";
                            if (!this.checked) changeFieldValue(scheduleTimeEle);
                        }
                    }(scheduleTimeEle);
                    scheduleTimeLabel.onclick = function() {
                        scheduleTimeCheck.checked = !scheduleTimeCheck.checked;
                        scheduleTimeCheck.onchange();
                    }
                    scheduleTimeText.onchange = function() {
                        changeFieldValue(scheduleTimeEle);
                    }
                    examRequestHeaderCell.appendChild(scheduleTimeEle);


                    var printTicketEle = examRequestHeaderEle.ownerDocument.createElement("span");
                    css(printTicketEle).Add("moneyinput");
                    //printTicketEle.style.cssText = "cursor:pointer;display:inline-block;margin-left:12px;";

                    var printTicketCheck = examRequestHeaderEle.ownerDocument.createElement("input");
                    printTicketCheck.type = "checkbox";
                    printTicketCheck.setAttribute("field", "ExamRequestPrintTicket");
                    printTicketCheck.setAttribute("conv", "ExamRequestListConv.ExamRequestPrintTicketConv('" + uid + "')");
                    printTicketCheck.style.cssText = "mag";
                    printTicketCheck.onchange = function() {
                        changeFieldValue(this);
                    }
                    printTicketCheck.SetCheckFlag = function(flag) {
                        printTicketCheck.checked = flag;
                        printTicketCheck.onchange();
                    }
                    printTicketEle.appendChild(printTicketCheck);
                    var printTicketLabel = examRequestHeaderEle.ownerDocument.createElement("span");
                    printTicketLabel.innerText = "输出登记信息";
                    css(printTicketLabel).Add("registration");
                    //printTicketLabel.style.cssText = "margin-left:-22px;display: inline-block;height: 28px;line-height: 26px;font-size: 14px;color: rgb(77, 77, 77);width: 130px;text-align: center;";
                    printTicketLabel.onclick = function() {
                        printTicketCheck.checked = !printTicketCheck.checked;
                        printTicketCheck.onchange();
                    }
                    printTicketEle.appendChild(printTicketLabel);
                    examRequestHeaderCell.appendChild(printTicketEle);

                    var examRequestItemListContainer = examRequestEle.ownerDocument.createElement("div");
                    examRequestItemListContainer.style.float = "left";
                    //examRequestItemListContainer.style.border = "1px solid black";


                    var examRequestItemLabelEle = examRequestEle.ownerDocument.createElement("span");
                    examRequestItemLabelEle.style.cssText = "margin-left:-20px;";
                    examRequestItemLabelEle.innerText = "子项目";
                    css(examRequestItemLabelEle).Add("infolistspan");
                    examRequestItemListContainer.appendChild(examRequestItemLabelEle);

                    var addExamRequestItemEle = examRequestEle.ownerDocument.createElement("span");
                    //css(addExamRequestItemEle).Add("delexam11");
                    //addExamRequestItemEle.style.cursor = "pointer";
                    addExamRequestItemEle.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    css(addExamRequestItemEle).Add("subitem");
                    //ddExamRequestItemEle.style.cssText = "background: url(../../../img/加号.png); cursor:pointer; background-repeat: no-repeat; background-position: center; height: 18px; width: 38px; margin-top: 2px;margin-left: 10px;";

                    addExamRequestItemEle.setAttribute("command", "AddExamRequestItem");
                    addExamRequestItemEle.onclick = function(uid) {
                        return function() {
                            var param = {};
                            param.command = 'AddExamRequestItem';
                            param.field = 'AddExamRequestItem_' + uid;
                            param.condFields = param.field;
                            param.conv = "StaticValueConv('" + uid + "')";
                            usercommit(this, param);
                        }
                    }(uid);
                    examRequestItemListContainer.appendChild(addExamRequestItemEle);
                    var divclear = examRequestEle.ownerDocument.createElement("div");
                    divclear.style.cssText = "clear:both;";
                    examRequestItemListContainer.appendChild(divclear);

                    var examRequestItemList = examRequestEle.ownerDocument.createElement("div");
                    //examRequestItemListContainer.style.cssText = "border:1px solid blue;";
                    examRequestItemListContainer.appendChild(examRequestItemList);
                    examRequestEle.appendChild(examRequestItemListContainer);

                    examRequestItemListContainer.setAttribute("field", "RemoveExamRequestItem");
                    examRequestItemList.setAttribute("field", "ExamRequestItemUIDList");
                    examRequestItemListContainer.style.cssText = "margin-left:22px;";
                    if (mode) {
                        examRequestItemListContainer.setAttribute("conv", "ExamRequestListConv.BodyPartItemListConv.RemoveItemConv");
                        examRequestItemList.setAttribute("conv", "ExamRequestListConv.BodyPartItemListConv('" + uid + "','ExamRequestUID'," + style.toJSONString() + "," + maxSize.toJSONString() + ")");
                    } else {
                        examRequestItemListContainer.setAttribute("conv", "ExamRequestListConv.RemoveItemConv");
                        examRequestItemList.setAttribute("conv", "ExamRequestListConv.ItemListConv('" + uid + "')");
                    }

                    var examRequestAttachListContainer = examRequestEle.ownerDocument.createElement("div");
                    examRequestAttachListContainer.style.float = "left";
                    examRequestAttachListContainer.setAttribute("field", "RemoveExamRequestAttach");
                    examRequestAttachListContainer.setAttribute("conv", "ExamRequestListConv.RemoveExamRequestAttachConv('" + uid + "')");

                    var examRequestAttachLabelEle = examRequestEle.ownerDocument.createElement("span");

                    examRequestAttachLabelEle.innerText = "申请单:";
                    css(examRequestAttachLabelEle).Add("infolistspan");
                    examRequestAttachListContainer.appendChild(examRequestAttachLabelEle);

                    var addExamRequestAttachEle = examRequestEle.ownerDocument.createElement("span");
                    addExamRequestAttachEle.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    css(addExamRequestAttachEle).Add("application");
                    addExamRequestAttachEle.setAttribute("command", "AddExamRequestAttach");
                    addExamRequestAttachEle.onclick = function(uid) {
                        return function() {
                            var data = {};
                            data.ExamRequestUID = uid;
                            data.AttachMethod = 'Capture';
                            var param = {};
                            param.command = 'AddExamRequestAttach';
                            param.field = 'AddExamRequestAttach_' + uid;
                            param.condFields = param.field;
                            param.conv = "StaticValueConv('" + data.toJSONString() + "')";
                            usercommit(this, param);
                        }
                    }(uid);
                    examRequestAttachListContainer.appendChild(addExamRequestAttachEle);

                    var examRequestAttachListEle = examRequestEle.ownerDocument.createElement("div");
                    examRequestAttachListEle.setAttribute("field", "ExamRequestAttachUIDList");
                    examRequestAttachListEle.setAttribute("conv", "ExamRequestListConv.ExamRequestAttachUIDListConv('" + uid + "')");
                    examRequestAttachListContainer.appendChild(examRequestAttachListEle);
                    examRequestEle.appendChild(examRequestAttachListContainer);

                    examRequestList.appendChild(examRequestEle);

                    modality.ExamRequestList[i].Container = examRequestEle;
                    examRequestEle.__modalityList = group;
                    examRequestEle.__examRequest = modality.ExamRequestList[i];

                    //printTicketCheck.SetCheckFlag(true);  //设置自动勾选"输出登记信息"
                    if (ExamRequestListConv.AddingExamRequest) addExamRequestItemEle.click(uid);
                    // var form = formCallCenter.GetFormByID("RegisterModule");
                    //设置默认设备
                    // var currmodality = form.GetField('NewExamRequestModalityCode');
                    // switch (currmodality) {
                    //     case "CT":
                    //         setTimeout(function () {
                    //             form.SetField("ExamRequestEquipmentID", [{ "ExamRequestUID": uid, "EquipmentID": 41}], true);
                    //         }, 50);
                    //         break;
                    //     case "DR":
                    //         setTimeout(function () {
                    //             form.SetField("ExamRequestEquipmentID", [{ "ExamRequestUID": uid, "EquipmentID": 41}], true);
                    //             aa++;
                    //         }, 50);
                    //         break;
                    //     case "MR":
                    //         setTimeout(function () {
                    //             form.SetField("ExamRequestEquipmentID", [{ "ExamRequestUID": uid, "EquipmentID": 41}], true);
                    //         }, 50);
                    //         break;
                    // }
                }
            }
        }
    }

    function UpdateExamRequestItem(examRequest) {
        var container = examRequest.Container;
        var group = container.__modalityList;
        var modalityIndex = -1;
        var examRequestIndex = -1;
        for (var i = 0; i < group.length; i++) {
            examRequestIndex = -1;
            for (var j = 0; j < group[i].ExamRequestList.length; j++) {
                if (group[i].ExamRequestList[j].UID == examRequest.UID) {
                    examRequestIndex = j;
                    break;
                }
            }
            if (examRequestIndex > -1) {
                modalityIndex = i;
                break;
            }
        }
        if (modalityIndex < 0) return;
        if (examRequest.Items.length < 1) {
            container.parentNode.removeChild(container);
            var modality = group[modalityIndex];
            for (var i = examRequestIndex; i < modality.ExamRequestList.length - 1; i++) {
                modality.ExamRequestList[i] = modality.ExamRequestList[i + 1];
            }
            modality.ExamRequestList.length--;
            UpdateModality(group, modalityIndex);
        } else {
            var examRequestDesc = container.children[0].children[0].children[0].children[0].children[0];
            var examRequestEquipList = container.children[0].children[1];
            var examRequestItemList = container.children[1].children[2];
            var index = -1;
            for (var i = 0; i < container.parentNode.children.length; i++) {
                if (container.parentNode.children[i] == container) {
                    index = i;
                    break;
                }
            }
            examRequestDesc.style.display = "none";
            examRequestDesc.innerHTML = "检查" + (index + 1) + ":";

            //"多退"
            for (var i = examRequestItemList.children.length - 1; i > -1; i--) {
                var uid = examRequestItemList.children[i].__examRequestItem.UID;
                var find = false;
                for (var j = 0; j < examRequest.Items.length; j++) {
                    if (uid == examRequest.Items[j].UID) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequestItemList.removeChild(examRequestItemList.children[i]);
            }
            //"少补"
            for (var i = examRequest.Items.length - 1; i > -1; i--) {
                var uid = examRequest.Items[i].UID;
                var index = -1;
                for (index = 0; index < examRequestItemList.children.length; index++) {
                    if (uid == examRequestItemList.children[index].__examRequestItem.UID) break;
                }
                if (index == examRequestItemList.children.length) {
                    var examRequestItemEle = container.ownerDocument.createElement("div");

                    examRequestItemEle.__examRequestItem = examRequest.Items[i];
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemBodyPartList', 'ExamRequestItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemExamItemList', 'ExamRequestItemExamItem', 'ExamItemList', 'ExamItemName', 'ExamItemID', 'ExamItem');
                    examRequestItemEle.style.cssText = "margin-top:1px;";
                    createDataListConv(examRequestItemEle, uid, 'ExamRequestItemUID', 'ExamRequestItemExamMethodList', 'ExamRequestItemExamMethod', 'ExamMethodList', 'ExamMethodName', 'ExamMethodID', 'ExamMethod');
                    var removeExamRequestItem = container.ownerDocument.createElement("div");
                    removeExamRequestItem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    css(removeExamRequestItem).Add("subitemsubtract");
                    removeExamRequestItem.setAttribute("command", "RemoveExamRequestItem");
                    removeExamRequestItem.onclick = function(uid) {
                        return function() {
                            try {
                                if (confirm("是否删除该项目？")) {
                                    var param = {};
                                    param.command = "RemoveExamRequestItem";
                                    param.field = "RemoveExamRequestItem_" + uid;
                                    param.condFields = param.field;
                                    param.conv = "StaticValueConv('" + uid + "')";
                                    usercommit(this, param);
                                }
                            } catch (err) {
                                throw err;
                            } finally {
                                this.parentNode.style.backgroundColor = "";
                            }
                        }
                    }(uid);
                    examRequestItemEle.appendChild(removeExamRequestItem);
                    var divclear = examRequestItemEle.ownerDocument.createElement("div");
                    divclear.style.cssText = "clear:both;";
                    examRequestItemEle.appendChild(divclear);
                    examRequestItemList.appendChild(examRequestItemEle);

                }
            }
        }
    }

    function UpdateExamRequestAttachList(examRequest, attachListEle) {
        var examRequestUID = examRequest.UID;
        var attachList = examRequest.AttachList;
        //"多退"
        for (var i = attachListEle.children.length - 1; i > -1; i--) {
            var uid = attachListEle.children[i].__examRequestAttach.UID;
            var find = false;
            for (var j = 0; j < attachList.length; j++) {
                if (uid == attachList[j].UID) {
                    find = true;
                    break;
                }
            }
            if (!find) attachListEle.removeChild(attachListEle.children[i]);
        }
        //"少补"
        for (var i = attachList.length - 1; i > -1; i--) {
            var uid = attachList[i].UID;
            var index = -1;
            for (index = 0; index < attachListEle.children.length; index++) {
                if (uid == attachListEle.children[index].__examRequestAttach.UID) break;
            }
            if (index == attachListEle.children.length) {
                var examRequestAttachEle = attachListEle.ownerDocument.createElement("div");
                examRequestAttachEle.style.display = "inline-block";
                attachList[i].Container = examRequestAttachEle;
                var attachEle = attachListEle.ownerDocument.createElement("img");
                attachEle.src = attachList[i].Url;
                attachEle.alt = "申请单";
                attachEle.style.maxWidth = "96px";
                attachEle.style.maxHeight = "96px";
                attachEle.setAttribute("field", "ExamRequestAttachUrl");
                attachEle.setAttribute("conv", "ExamRequestListConv.ExamRequestAttachUrlConv('" + uid + "')");
                examRequestAttachEle.appendChild(attachEle);
                var removeEle = attachListEle.ownerDocument.createElement("span");
                removeEle.style.cursor = "pointer";
                removeEle.style.backgroundColor = "black";
                removeEle.style.color = "white";
                removeEle.innerText = "X";
                removeEle.title = "删除申请单";
                examRequestAttachEle.appendChild(removeEle);
                removeEle.onclick = function(uid) {
                    return function() {
                        try {
                            var Count = this.parentNode.parentElement.childElementCount;
                            if (confirm("是否删除该申请单？")) {
                                var d = {};
                                d.ExamRequestUID = examRequestUID;
                                d.ExamRequestAttachUID = uid;
                                var param = {};
                                param.command = "RemoveExamRequestAttach";
                                param.field = "RemoveExamRequestAttach_" + examRequestUID + "_" + uid;
                                param.condFields = param.field;
                                param.conv = "StaticValueConv('" + d.toJSONString() + "')";
                                usercommit(this, param);
                                //if (Count == 1) {
                                //    alert(this.offsetHeight);
                                //    //var height = parseInt(attachListEle.offsetHeight) - 80;
                                //    //attachListEle.style.cssText = "border:1px solid blue;min-height:" + height + "px;margin-left:4px;margin-right:4px;margin-bottom:4px;";
                                //}
                            }
                        } catch (err) {
                            throw err;
                        } finally {
                            this.parentNode.style.backgroundColor = "";
                        }
                    }
                }(uid);
                attachListEle.appendChild(examRequestAttachEle);
                examRequestAttachEle.__examRequestAttach = attachList[i];
            }
        }
    }

    function createDataConv(container, uid, uidMember, dataField, dataMember) {
        var dataEle = container.ownerDocument.createElement("input");
        dataEle.type = "text";
        container.appendChild(dataEle);
        dataEle.setAttribute("field", dataField);
        dataEle.setAttribute("conv", "ExamRequestListConv.UIDDataConv('" + uid + "','" + uidMember + "','" + dataMember + "')");
        dataEle.onchange = function() {
            changeFieldValue(this);
        }
        return dataEle;
    }

    ExamRequestListConv.ExamRequestModalityCodeConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var group = ele.parentNode.__modalityList;
                if (!group) group = ele.parentNode.__modalityList = [];
                RemoveExamRequest(group, val.ExamRequestUID, function(modality) {
                    return modality.ModalityCode == val.ModalityCode;
                });
                var index = -1;
                for (index = 0; index < group.length; index++) {
                    if (group[index].ModalityCode == val.ModalityCode) break;
                }
                if (index == group.length) {
                    var container = ele.ownerDocument.createElement("div");
                    css(container).Add("inspect");
                    //container.style.cssText = "margin-top:5px;border-radius: 4px;background-color: rgb(242, 242, 242);border-style: solid;border-width: 1px;border-color: rgb(179, 179, 179);box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.2);";


                    ele.appendChild(container);
                    group[index] = { "ModalityCode": val.ModalityCode, "ExamRequestList": [{ "UID": val.ExamRequestUID, "Items": [], "AttachList": [] }], "Container": container };
                    UpdateModality(group, index);
                } else {
                    var find = false;
                    for (var i = 0; i < group[index].ExamRequestList.length; i++) {
                        if (group[index].ExamRequestList[i].UID == val.ExamRequestUID) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        group[index].ExamRequestList[group[index].ExamRequestList.length] = { "UID": val.ExamRequestUID, "Items": [], "AttachList": [] };
                        UpdateModality(group, index);
                    }
                }
            }
        }(this);
    }
    ExamRequestListConv.UIDDataConv = function(uid, uidMember, dataMember) {
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        var baseApplyValue = this.ApplyValue;
        this.ApplyValue = function(ele, val) {
            val = val[dataMember];
            baseApplyValue(ele, val);
        }
        var baseGetUIValue = this.GetUIValue;
        this.GetUIValue = function(ele) {
            var val = {};
            val[uidMember] = uid;
            var data = baseGetUIValue(ele);
            val[dataMember] = data;
            return val.toJSONString();
        }
    }
    ExamRequestListConv.ExamRequestScheduleTimeConv = function(examRequestUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ScheduleTime']);
        this.ApplyValue = function(ele, val) {
            val = val.ScheduleTime;
            ele.children[0].checked = val && val != "";
            ele.children[2].style.display = val && val != "" ? "" : "none";
            ele.children[2].value = val;
        }
        this.GetUIValue = function(ele) {
            var val = {};
            val['ExamRequestUID'] = examRequestUID;
            val.ScheduleTime = ele.children[0].checked ? ele.children[2].value : null;
            return val.toJSONString();
        }
    }
    ExamRequestListConv.ExamRequestPrintTicketConv = function(examRequestUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'PrintTicket']);
        this.ApplyValue = function(ele, val) {
            val = val.PrintTicket;
            ele.checked = val;
        }
        this.GetUIValue = function(ele) {
            var val = {};
            val['ExamRequestUID'] = examRequestUID;
            val.PrintTicket = ele.checked;
            return val.toJSONString();
        }
    }
    ExamRequestListConv.ExamRequestAttachUIDListConv = function(examRequestUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'AttachUIDList']);
        this.ApplyValue = function(ele, val) {
            val = val.AttachUIDList;
            if (!val) return;
            var examRequest = ele.parentNode.parentNode.__examRequest;
            var attachList = examRequest.AttachList;
            for (var i = 0; i < val.length; i++) {
                var find = false;
                for (var j = 0; j < attachList.length; j++) {
                    if (attachList[j].UID == val[i]) {
                        find = true;
                        break;
                    }
                }
                if (!find) attachList[attachList.length] = { "UID": val[i] };
            }
            UpdateExamRequestAttachList(examRequest, ele);
        }
    }

    function createDataListConv(container, uid, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
        var dataListEle = container.ownerDocument.createElement("span");
        dataListEle.setAttribute("field", listField);
        dataListEle.setAttribute("itemField", currField);
        dataListEle.setAttribute("valueMember", valueMember);
        dataListEle.setAttribute("displayMember", displayMember);
        dataListEle.setAttribute("inputmember", "InputCode");
        if (objectMember) {
            dataListEle.setAttribute("conv", "ExamRequestListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
        } else {
            dataListEle.setAttribute("conv", "ExamRequestListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
        }
        container.appendChild(dataListEle);
        return dataListEle;
    }
    ExamRequestListConv.RemoveExamRequestAttachConv = function(examRequestUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ExamRequestAttachUID']);
        this.ApplyValue = function(ele, val) {
            var examRequest = ele.parentNode.__examRequest;
            var attachList = examRequest.AttachList;
            var find = false;
            for (var i = attachList.length - 1; i > -1; i--) {
                if (attachList[i].UID == val.ExamRequestAttachUID) {
                    find = true;
                    for (var j = i; j < attachList.length - 1; j++) {
                        attachList[j] = attachList[j + 1];
                    }
                    attachList.length--;
                }
            }
            if (find) UpdateExamRequestAttachList(examRequest, ele.children[2]);
        }
    }
    ExamRequestListConv.ExamRequestAttachUrlConv = function(examRequestAttachUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestAttachUID, 'ExamRequestAttachUID', 'AttachUrl']);
        this.ApplyValue = function(ele, val) {
            ele.parentNode.__examRequestAttach.Url = val.AttachUrl;
            ele.src = val.AttachUrl;
        }
    }
    ExamRequestListConv.ItemListConv = function(examRequestUID) {
        ExamRequestListConv.UIDDataConv.apply(this, [examRequestUID, 'ExamRequestUID', 'ItemUIDList']);
        this.ApplyValue = function(ele, val) {
            var examRequest = ele.parentNode.parentNode.__examRequest;
            var val = val.ItemUIDList;
            for (var i = val.length - 1; i > -1; i--) {
                var find = false;
                for (var j = 0; j < examRequest.Items.length; j++) {
                    if (examRequest.Items[j].UID == val[i]) {
                        find = true;
                        break;
                    }
                }
                if (!find) examRequest.Items[examRequest.Items.length] = { "UID": val[i], "Container": ele };
            }
            UpdateExamRequestItem(examRequest);
        }
    }

    function RemoveExamRequest(group, rmvUID, modalityFilter) {
        for (var i = group.length - 1; i > -1; i--) {
            if (modalityFilter && modalityFilter(group[i])) continue;
            var find = false;
            for (var j = group[i].ExamRequestList.length - 1; j > -1; j--) {
                if (group[i].ExamRequestList[j].UID == rmvUID) {
                    find = true;
                    for (var k = j; k < group[i].ExamRequestList.length - 1; k++) {
                        group[i].ExamRequestList[k] = group[i].ExamRequestList[k + 1];
                    }
                    group[i].ExamRequestList.length--;
                }
            }
            if (find) UpdateModality(group, i);
        }
    }
    ExamRequestListConv.RemoveExamRequestConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                RemoveExamRequest(ele.__modalityList, val, null);
            }
        }(this);
    }
    ExamRequestListConv.RemoveItemConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequest = ele.parentNode.__examRequest;
                var examRequestItem = null;
                for (var i = examRequest.Items.length - 1; i > -1; i--) {
                    if (examRequest.Items[i].UID == val) {
                        examRequestItem = examRequest.Items[i];
                        for (var j = i; j < examRequest.Items.length - 1; j++) {
                            examRequest.Items[j] = examRequest.Items[j + 1];
                        }
                        examRequest.Items.length--;
                        break;
                    }
                }
                if (examRequestItem) UpdateExamRequestItem(examRequest);
            }
        }(this);
    }

    ExamRequestListConv.DropDownInputConv = function(uid, uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
        //filter:下拉列表过滤器，为非function表示不过滤
        //currNotObject:选项数据是否非value-display对象
        //readOnly:是否不可手工录入
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        var inheritProperties_base = this.InheritProperties;
        this.InheritProperties = function(srcElement, desElement) {
            var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";

            Form.SetAttribute(desElement, "conv", "ExamRequestListConv.DropDownInputConv.DropDownInputItemConv('" + uid + "','" + uidMember + "','" + listMember + "','" + objectMember + "'," + itemStyle + "," + currNotObject + "," + readOnly + ")", true);
            Form.InheritAttributes(srcElement, desElement);
        }
        this.DecodeArguments = function(ele, args) {
            //统一数据格式为value-display对象
            if (!args || !args[0] || !args[0][listMember]) return args;
            var valueMember = ele.getAttribute("valueMember");
            var displayMember = ele.getAttribute("displayMember");
            var inputMember = ele.getAttribute("inputMember");

            if (!valueMember) valueMember = "__valueMember";
            if (!displayMember) displayMember = "__displayMember";
            if (!inputMember) inputMember = "__inputMember";

            var list = [];
            for (var i = 0; i < args[0][listMember].length; i++) {
                var item = args[0][listMember][i];
                list[i] = {};
                list[i][valueMember] = item && typeof item[valueMember] != 'undefined' ? item[valueMember] : item;
                list[i][displayMember] = item && typeof item[displayMember] != 'undefined' ? item[displayMember] : item;
                list[i][inputMember] = item && typeof item[inputMember] != 'undefined' ? item[inputMember] : item;
            }
            args[0][listMember] = list;
            return args[0];
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                val = val[listMember];
                var valueMember = ele.getAttribute("valueMember");
                var displayMember = ele.getAttribute("displayMember");
                var inputMember = ele.getAttribute("inputMember");

                if (!valueMember) valueMember = "__valueMember";
                if (!displayMember) displayMember = "__displayMember";
                if (!inputMember) inputMember = "__inputMember";

                if (!filter && typeof(filter) != 'function') {
                    filter = function(data, tester) {
                        var lower = tester ? tester.toLowerCase() : tester;
			if (data == tester) return true;
                        if (typeof data == "string" && data.toLowerCase().indexOf(lower) > -1) return true;
                        if (inputMember && typeof data[inputMember] == "string" && data[inputMember].toLowerCase().indexOf(lower) > -1) return true;
                        if (displayMember && typeof data[displayMember] == "string" && data[displayMember].toLowerCase().indexOf(lower) > -1) return true;
                        return false;
                    }
                }
                var list = ele.__list;
                if (!list) list = ele.__list = [];
                var menu = ele.__menu;
                if (!menu) {
                    var doc = Wnd(ele).GetDocument();
                    var div = doc.createElement("div");
                    var unhook = function() {
                        setTimeout(function() {
                            Event.UnhookMouseOut(div);
                            if (ele.__menu) ele.__menu.Fold();
                        }, 1);
                    }
                    var mouseOutCall = function(relEle, currEle) {
                        return !menu.InnerElement(currEle);
                    };
                    var hook = function() {
                        Event.HookMouseOut(div, function(leave) {
                            if (leave) unhook();
                        }, mouseOutCall);
                    }
                    css(div).Add(style.dropItem);
                    ele.appendChild(div);

                    var divInput = doc.createElement("div");
                    div.appendChild(divInput);
                    var text = doc.createElement("INPUT");
                    text.type = "text";
                    css(text).Add("dropText_mid");
                    divInput.appendChild(text);
                    var theSameText = function(t1, t2) {
                        return t1 == t2 || ((t1 == "未定义" || !t1 || t1 == "") && (t2 == "未定义" || !t2 || t2 == ""));
                    }
                    text.onchange = function() {
                        var items = menu.Items();
                        var d = null;
                        if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                            d = text.__currData;
                        } else {
                            for (var i = 0; i < items.Count(); i++) {
                                var item = items.ItemAt(i).GetData();
                                if (theSameText(item[displayMember], Element(text).getText())) {
                                    d = item;
                                    break;
                                }
                            }
                            if (!d && !readOnly) {
                                d = {};
                                if (currNotObject) {
                                    d[valueMember] = d[displayMember] = Element(text).getText();
                                } else {
                                    d[valueMember] = null;
                                    d[displayMember] = Element(text).getText();
                                }
                            }
                        }
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    text.onkeyup = function() {
                        var items = menu.Items();
                        if (Event().KeyCode() == 13) {
                            unhook();
                            var d = null;
                            if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                                d = text.__currData;
                            } else {
                                for (var i = 0; i < items.Count(); i++) {
                                    var item = items.ItemAt(i).GetData();
                                    if (theSameText(item[displayMember], Element(text).getText())) {
                                        d = item;
                                        break;
                                    }
                                }
                                if (!d) {
                                    if (typeof filter == 'function') {
                                        for (var i = 0; i < items.Count(); i++) {
                                            var item = items.ItemAt(i).GetData();
                                            if (filter(item, Element(text).getText())) {
                                                d = item;
                                                break;
                                            }
                                        }
                                    }
                                    if (!d && !readOnly) {
                                        d = {};
                                        if (currNotObject) {
                                            d[valueMember] = d[displayMember] = Element(text).getText();
                                        } else {
                                            d[valueMember] = null;
                                            d[displayMember] = Element(text).getText();
                                        }
                                    }
                                }
                            }
                            text.__currData = d;
                            Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                            changeFieldValue(text);
                        } else {
                            if (typeof filter == 'function') {
                                items.Clear();
                                for (var i = 0; i < list.length; i++) {
                                    if (filter(list[i], Element(text).getText()))
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
                    text.onfocus = function() {
                        var items = menu.Items();
                        if (typeof filter == 'function') {
                            items.Clear();
                            for (var i = 0; i < list.length; i++) {
                                if (filter(list[i], Element(text).getText()))
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
                    var divDrop = document.createElement("div");
                    css(divDrop).Add("dropImage");
                    divInput.appendChild(divDrop);

                    self.InheritProperties(ele, text);

                    menu = ele.__menu = text.__menu = new Menu(div, style, true);
                    menu.Fold();
                    menu.DrawItem = function(parent, curr, total, index, e) {
                        var data = curr.GetData();
                        e.title = Element(e).setText(data[displayMember]);
                        e.__currData = data;
                        e.onclick = function() {
                            unhook();
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
                            if (typeof filter == 'function') {
                                var items = menu.Items();
                                items.Clear();
                                for (var i = 0; i < list.length; i++) {
                                    if (filter(list[i], Element(text).getText()))
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
                        } else {
                            unhook();
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
                    if (d1[displayMember] != d2[displayMember] || d1[valueMember] != d2[valueMember] || d1[inputMember] != d2[inputMember]) {
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
        ExamRequestListConv.DropDownInputConv.DropDownInputItemConv = function(uid, uidMember, listMember, objectMember, style, currNotObject, readOnly) {
            Form_SingleValueConv.apply(this, arguments);
            this.DetermineApply = function(ele, val) {
                return val[uidMember] == uid;
            }
            this.ApplyValue = function(ele, val) {
                var valueMember = ele.getAttribute("valueMember");
                var displayMember = ele.getAttribute("displayMember");

                if (!valueMember) valueMember = "__valueMember";
                if (!displayMember) displayMember = "__displayMember";
                var items = ele.__menu.Items();
                var d = null;
                if (currNotObject || !val) {
                    val = val[valueMember];
                    for (var i = 0; i < items.Count(); i++) {
                        var item = items.ItemAt(i).GetData();
                        if (item[valueMember] == val) {
                            d = item;
                            break;
                        }
                    }
                    if (!d && !readOnly) {
                        d = {};
                        d[valueMember] = d[displayMember] = val;
                    }
                } else {
                    val = val[objectMember];
                    if (val) {
                        for (var i = 0; i < items.Count(); i++) {
                            var item = items.ItemAt(i).GetData();
                            if (item[valueMember] == val[valueMember]) {
                                d = item;
                                break;
                            }
                        }
                    }
                    if (!d) d = val;
                }
                ele.__currData = d;
                Element(ele).setText(ele.__currData ? ele.__currData[displayMember] : null);
            }
            this.GetUIValue = function(self) {
                return function(ele) {
                    var valueMember = ele.getAttribute("valueMember");
                    var displayMember = ele.getAttribute("displayMember");

                    if (!valueMember) valueMember = "__valueMember";
                    if (!displayMember) displayMember = "__displayMember";
                    var d = {};
                    d[uidMember] = uid;
                    if (currNotObject) {
                        d[valueMember] = ele.__currData ? ele.__currData[valueMember] : null;
                    } else {
                        var value = null;
                        if (!ele.__currData) {
                            if (!readOnly) {
                                value = {};
                                value[valueMember] = null;
                                value[displayMember] = Element(ele).getText();
                            } else {
                                value = null;
                            }
                        } else {
                            value = {};
                            value[valueMember] = ele.__currData[valueMember];
                            value[displayMember] = ele.__currData[displayMember];
                        }
                        d[objectMember] = value;
                    }
                    return d.toJSONString();
                }
            }(this);
        }
    }
    ExamRequestListConv.BodyPartItemListConv = function(uid, uidMember, style, maxSize) {
        Form_SingleValueConv.apply(this);

        function createDataListConv(container, uid, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
            var dataListEle = container.ownerDocument.createElement("span");
            dataListEle.setAttribute("field", listField);
            dataListEle.setAttribute("itemField", currField);
            dataListEle.setAttribute("valueMember", valueMember);
            dataListEle.setAttribute("displayMember", displayMember);
            if (objectMember) {
                dataListEle.setAttribute("conv", "ExamRequestListConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
            } else {
                dataListEle.setAttribute("conv", "ExamRequestListConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
            }
            container.appendChild(dataListEle);
            return dataListEle;
        }
        this.DetermineApply = function(ele, val) {
            return val[uidMember] == uid;
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequest = ele.parentNode.parentNode.__examRequest;
                var val = val.ItemUIDList;
                if (val) {
                    for (var i = 0; i < val.length; i++) {
                        var find = false;
                        for (var j = 0; j < examRequest.Items.length; j++) {
                            if (val[i] == examRequest.Items[j].UID) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) examRequest.Items[examRequest.Items.length] = { "UID": val[i], "Container": ele };
                    }
                }
                if (!ele.__bodyPartItems) ele.__bodyPartItems = createDataListConv(ele, uid, 'ExamRequestItemUID', 'ExamRequestItemBodyPartList', 'ExamRequestItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
            }
        }(this);
    }

    ExamRequestListConv.BodyPartItemListConv.RemoveItemConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.ApplyValue = function(self) {
            return function(ele, val) {
                var examRequestItems = ele.parentNode.__examRequest.Items;
                var examRequestItem = null;
                for (var i = examRequestItems.length - 1; i > -1; i--) {
                    if (examRequestItems[i].UID == val) {
                        examRequestItem = examRequestItems[i];
                        for (var j = i; j < examRequestItems.length - 1; j++) {
                            examRequestItems[j] = examRequestItems[j + 1];
                        }
                        examRequestItems.length--;
                        break;
                    }
                }
                if (examRequestItem) {
                    var result = [];
                    var menu = examRequestItem.Container.__bodyPartItems.__menu;
                    var items = menu.Items();
                    var cnt = items.Count();
                    var change = false;
                    for (var j = 0; j < cnt; j++) {
                        var item = items.ItemAt(j);
                        var data = item.GetData();
                        for (var k = item.__list.length - 1; k > -1; k--) {
                            if (item.__list[k] == val) {
                                for (var l = k; l < item.__list.length - 1; l++) {
                                    item.__list[l] = item.__list[l + 1];
                                }
                                item.__list.length--;
                                item.__changed = true;
                            }
                        }
                        item.__selected = item.__list.length > 0;
                        if (item.__changed) {
                            change = true;
                            item.Refresh();
                        }
                        if (item.__selected) result[result.length] = { "data": data, "count": item.__list.length };
                    }
                    if (change && !menu.Unfolded()) menu.Fold(true);
                    ele = examRequestItem.Container.__bodyPartItems.children[0].children[0];
                    if (result.length < 1) {
                        ele.innerHTML = "";
                        ele.title = "-未选择-";
                    } else {
                        var displayMember = ele.getAttribute("displayMember");
                        var s = result[0].data[displayMember] + "(" + result[0].count + ")";
                        for (var i = 1; i < result.length; i++) {
                            s += "+" + result[i].data[displayMember] + "(" + result[i].count + ")";
                        }
                        ele.title = Element(ele).setText(s);
                    }
                }
            }
        }(this);
    }

    ExamRequestListConv.BodyPartItemListConv.DropDownInputConv = function(ownerUID, uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
        //filter:下拉列表过滤器，为非function表示不过滤
        //currNotObject:选项数据是否非value-display对象
        //readOnly:是否不可手工录入
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            var examRequestItems = ele.parentNode.parentNode.parentNode.__examRequest.Items;
            for (var i = 0; i < examRequestItems.length; i++) {
                if (examRequestItems[i].UID == val[uidMember]) return true;
            }
            return false;
        }
        this.InheritProperties = function(srcElement, desElement) {
            Form.SetAttribute(desElement, "conv", "ExamRequestListConv.BodyPartItemListConv.DropDownInputConv.DropItemConv(" + "'" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + null + "," + false + ")", true);
            Form.InheritAttributes(srcElement, desElement);
        }
        this.ApplyValue = function(self) {
            return function(ele, val) {
                val = val[listMember];
                var displayMember = ele.getAttribute("displayMember");
                var valueMember = ele.getAttribute("valueMember");
                var menu = ele.__menu;
                if (!menu) {
                    var root = document.createElement("div");
                    var unhook = function() {
                        Event.UnhookMouseOut(root);
                        if (ele.__menu) ele.__menu.Fold();
                    }
                    var mouseOutCall = function(relEle, currEle) {
                        return !menu.InnerElement(currEle);
                    };
                    var hook = function() {
                        Event.HookMouseOut(root, function(leave) {
                            if (leave) unhook();
                        }, mouseOutCall);
                    }
                    css(root).Add(style.dropItem);
                    var spMenu = document.createElement("div");
                    css(spMenu).Add(style.dropText);
                    root.appendChild(spMenu);
                    var spDrop = document.createElement("div");
                    css(spDrop).Add(style.dropImage);
                    root.appendChild(spDrop);
                    ele.appendChild(root);

                    self.InheritProperties(ele, spMenu);

                    menu = ele.__menu = spMenu.__menu = new Menu(root, style, true);
                    menu.DrawItem = function(parent, curr, total, index, ee) {
                        var span;
                        var lab;
                        var text;
                        var data = curr.GetData();
                        if (ee.children.length < 1) {
                            span = document.createElement("div");
                            span.style.width = "100%";

                            lab = document.createElement("span");
                            //                      Element(lab).setText('□ ');
                            css(lab).Add(style.label);
                            text = document.createElement("span");
                            css(text).Add(style.text);
                            span.appendChild(lab);
                            span.appendChild(text);

                            span.title = Element(text).setText(data[displayMember]);
                            ee.appendChild(span);
                        } else {
                            span = ee.children[0];
                            lab = span.children[0];
                            text = span.children[1];

                            span.title = Element(text).setText(data[displayMember]);
                        }
                        span.onclick = function(e) {
                            return function() {
                                curr.__changed = true;
                                var border = ee.style.border;
                                try {
                                    ee.style.border = "1px solid red";
                                    if (!curr.__selected) {
                                        menu.__addingData = data;
                                        var param = {};
                                        param.command = 'AddExamRequestItem';
                                        param.field = 'AddExamRequestItem_' + ownerUID;
                                        param.condFields = param.field;
                                        param.conv = "StaticValueConv('" + ownerUID + "')";
                                        usercommit(this, param);
                                    } else {
                                        if (curr.__list.length < 1) {
                                            alert("没有选择要删除的部位");
                                        } else {
                                            //                                        if (confirm("是否删除该项目？")) {//..
                                            var param = {};
                                            param.command = "RemoveExamRequestItem";
                                            param.field = "RemoveExamRequestItem_" + curr.__list[curr.__list.length - 1];
                                            param.condFields = param.field;
                                            param.conv = "StaticValueConv('" + curr.__list[curr.__list.length - 1] + "')";
                                            usercommit(this, param);
                                            //                                        }
                                        }
                                    }
                                } catch (err) {
                                    throw err;
                                } finally {
                                    ee.style.border = border;
                                }
                            };
                        }(span);


                        var item = curr;
                        var e = span;
                        if (item.__selected) {
                            css(e).Remove(style.unselectedItem);
                            css(e).Add(style.selectedItem);
                            //Element(lab).setText("■");
                            css(lab).Remove(style.unselectedLabel);
                            css(lab).Add(style.selectedLabel);
                            css(text).Remove(style.unselectedText);
                            css(text).Add(style.selectedText);
                        } else {
                            css(e).Remove(style.selectedItem);
                            css(e).Add(style.unselectedItem);
                            //Element(lab).setText("□ ");
                            css(lab).Remove(style.selectedLabel);
                            css(lab).Add(style.unselectedLabel);
                            css(text).Remove(style.selectedText);
                            css(text).Add(style.unselectedText);
                        }
                        curr.__changed = false;
                        return true;
                    };
                    ele.onclick = function() {
                        var source = Event().Source();
                        if (source != ele && source != root && source != spMenu && source != spDrop) return;
                        if (!menu.Unfolded()) {
                            var bounds = { 'x': -1, 'y': root.offsetHeight - 1 };
                            if (maxSize) {
                                bounds.width = maxSize.width;
                                bounds.height = maxSize.height;
                            }
                            menu.Unfold(bounds, { 'offsetY': root.offsetHeight });
                            hook();
                        } else {
                            unhook();
                        }
                    }
                }
                var len = !val || !val.length ? 0 : val.length;
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
        }(this);
        ExamRequestListConv.BodyPartItemListConv.DropDownInputConv.DropItemConv = function(uidMember, listMember, objectMember, style) {
            Form_SingleValueConv.apply(this);
            this.DetermineApply = function(ele, val) {
                var examRequestItems = ele.parentNode.parentNode.parentNode.parentNode.parentNode.__examRequest.Items;
                for (var i = 0; i < examRequestItems.length; i++) {
                    if (examRequestItems[i].UID == val[uidMember]) return true;
                }
                return false;
            }
            this.ApplyValue = function(ele, val) {
                var uid = val[uidMember];
                val = val[objectMember];
                var menu = ele.__menu;
                var result = [];
                var valueMember = ele.getAttribute("valueMember");
                var len = !val || !val.length ? 0 : val.length;
                var items = menu.Items();
                var cnt = items.Count();
                var change = false;
                for (var i = 0; i < cnt; i++) {
                    var item = items.ItemAt(i);
                    if (!item.__list) item.__list = [];
                    var data = item.GetData();
                    if (data[valueMember] == val[valueMember]) {
                        var find = false;
                        for (var j = 0; j < item.__list.length; j++) {
                            if (item.__list[j] == uid) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            item.__list[item.__list.length] = uid;
                            item.__changed = true;
                        }
                    } else {
                        for (var j = item.__list.length - 1; j > -1; j--) {
                            if (item.__list[j] == uid) {
                                for (var k = j; k < item.__list.length - 1; k++) {
                                    item.__list[k] = item.__list[k + 1];
                                }
                                item.__list.length--;
                                item.__changed = true;
                                break;
                            }
                        }
                    }
                    item.__selected = item.__list.length > 0;
                    if (item.__changed) {
                        change = true;
                        item.Refresh();
                    }
                    if (item.__selected) result[result.length] = { "data": data, "count": item.__list.length };
                }
                if (change && !menu.Unfolded()) menu.Fold(true);

                if (result.length < 1) {
                    Element(ele).setText("");
                    ele.title = "-未选择-";
                } else {
                    var displayMember = ele.getAttribute("displayMember");
                    var s = result[0].data[displayMember] + "(" + result[0].count + ")";
                    for (var i = 1; i < result.length; i++) {
                        s += "+" + result[i].data[displayMember] + "(" + result[i].count + ")";
                    }
                    ele.title = Element(ele).setText(s);
                }
                if (menu.__addingData) {
                    var d = {};
                    d[uidMember] = uid;
                    d[objectMember] = menu.__addingData;
                    menu.__addingData = null;
                    var param = {};
                    param.field = "ExamRequestItemBodyPart";
                    param.conv = "StaticValueConv('" + d.toJSONString() + "')";
                    window.useroperate(ele, changeFieldValue, param);
                }
            }
            this.GetUIValue = function(self) {
                return function(ele) {
                    var menu = ele.__menu;
                    var val = [];
                    var valueMember = ele.getAttribute("valueMember");

                    var items = menu.Items();
                    var cnt = items.Count();
                    for (var i = 0; i < cnt; i++) {
                        var item = items.ItemAt(i);
                        if (item.__selected) val[val.length] = item.GetData()[valueMember];
                    }
                    return val;
                }
            }(this);
        }
    }
}