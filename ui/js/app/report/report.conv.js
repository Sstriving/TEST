var Printitem;
var ReportConvMgr = new function() {
    this.oo(BaseConvMgr);
    this.oo(ExamRequestConvMgr);
}();

//used in US only
ReportConvMgr.VideoUrlConv = function() {
    this.DecodeArguments = function(ele, args) {
        return args[0];
    }
    this.GetUIValue = function(ele) {
        return eval(ele.value);
    }
    this.ApplyValue = function(ele, val) {
        val = val.replace(/\\/g, "/");
        ele.style.backgroundImage = "url(" + val + ")";
    }
    this.oo(new ReportConvMgr.DefaultValueConverter());
}

//used in US only
function VideoUrlConv() {
    this.DecodeArguments = function(ele, args) {
        return args[0];
    }
    this.GetUIValue = function(ele) {
        return eval(ele.value);
    }
    this.ApplyValue = function(ele, val) {
        if (!ele.onload) {
            ele.onload = function() {
                ele.style.width = "";
                ele.style.height = "";
                ui(ele).FitView();
            }
        }
        val = val.replace(/\\/g, "/");
        ele.src = val;
    }
    this.oo(new ReportConvMgr.DefaultValueConverter());
}

//used in US only
ReportConvMgr.GroupListConv_v2 = function(layout) {
    var ly = layout ? "{'rows':" + layout.rows + ",'cols':" + layout.cols + "}" : "null";
    this.GetUIValue = function(ele) {
        return eval(ele.value);
    }

    var ApplyEvents = function(ele) {
        var titles = $Array(ele.children[0].children);
        var infos = $Array(ele.children[1].children);

        titles.forEach(function(item, i) {

            item.onclick = function() {

                titles.forEach(function(e) {
                    e.style.fontWeight = "normal";
                });
                item.style.fontWeight = "bold";

                infos.forEach(function(e) {
                    e.style.display = "none";
                })
                infos[i].style.display = "block";
                var imgs = infos[i].children[0].children.length < 1 ? [] : infos[i].children[0].children[0].children;
                for (var j = 0; j < imgs.length; j++) {
                    ui(imgs[j].children[0]).FitView();
                }
            }

            item.ondblclick = function() {
                var ee = document.createElement("input");
                ee.style.margin = "6px auto";
                ee.style.width = "90%";
                ee.style.textAlign = "center";
                ee.style.fontSize = "10pt";
                item.parentNode.replaceChild(ee, item);
                ee.value = item.innerText;
                ee.focus();
                var click = function() {
                    var form = formCallCenter.DetectFormByElement(ee);
                    if (form) {
                        item.innerText = ee.value;
                        ee.parentNode.replaceChild(item, ee);
                        form.SetField("AttachGroupNameList", [{ "groupName": item.getAttribute("groupName"), "groupDesc": ee.value }]);
                    }
                    window.removeEventListener("click", click);
                };
                window.addEventListener("click", click, false);
                ee.onclick = function() { window.event.cancelBubble = true; }
                ee.onkeydown = function() { if (window.event.keyCode == 13) click(); }
            }

        })
        if (!ele.__clicked__) {
            ele.__clicked__ = true;
            titles[0].click();
        }
    }

    this.ApplyValue = function(ele, val) {
        var titles = ele.children[0];
        var infos = ele.children[1];

        var groups = $Array(titles.children).select(function(item) {
            var name = item.getAttribute("groupName");
            return name ? name : null;
        });
        for (var i = 0; i < val.length; i++) {
            if (typeof(val[i].groupName) == "undefined") {
                val[i] = { "groupDesc": val[i], "groupName": val[i] };
            } else {
                val[i] = { "groupDesc": val[i].groupDesc ? val[i].groupDesc : val[i].groupName, "groupName": val[i].groupName };
            }
        }
        val = val.where(function(item) { return groups.indexOf(item.groupName) == -1; })
        val.forEach(function(item) {
            var span = document.createElement("span");
            span.style.cssText = "display:block; cursor: pointer; width: 90%; margin: 0 auto;";
            span.innerText = item.groupDesc;
            span.setAttribute("groupName", item.groupName);
            titles.appendChild(span);

            var info = document.createElement("div");
            info.setAttribute("name", "attach-info");
            info.style.cssText = "position: absolute; left: 60px; top: 0; bottom: 0; right: 0; display: none;";
            infos.appendChild(info);

            var div1 = document.createElement("div");
            div1.style.cssText = "position: absolute; left: 0px; top: 0; bottom: 40px; right: 2px; border: solid 1px #666;background-color: #bbb;overflow-y:auto;overflow-x:hidden;";
            div1.setAttribute("field", "AttachList");
            div1.setAttribute("conv", "ReportConvMgr.ExamRequestAttachList_SysConv('" + item.groupName + "'," + ly + ")");
            info.appendChild(div1);

            var btns = document.createElement("div");
            btns.setAttribute("name", "attach-button");
            btns.style.cssText = "position: absolute; height: 40px; left: 0; bottom: 0; right: 0; display: block; line-height: 40px;";
            info.appendChild(btns);

            var btn1 = document.createElement("input");
            btn1.setAttribute("type", "button");
            btn1.value = "导入";
            css(btn1).Add("button");
            btn1.setAttribute("field", "AddAttach_Local_" + item.groupName);
            btn1.setAttribute("command", "AddAttach");
            btn1.setAttribute("condFields", "AddAttach_Local_" + item.groupName);
            btn1.setAttribute("conv", "ReportConvMgr.DefaultConstValueConverter('" + { 'GroupName': item.groupName, 'ImageMethod': 'Local' }.toJSONString() + "')");
            btn1.onclick = function() { commit(this) };
            btns.appendChild(btn1);

            var span01 = document.createElement("span");
            span01.innerHTML = "&nbsp;";
            btns.appendChild(span01);

            var btn2 = document.createElement("input");
            btn2.setAttribute("type", "button");
            btn2.value = "扫描";
            css(btn2).Add("button");
            btn2.setAttribute("field", "AddAttach_Capture_" + item.groupName);
            btn2.setAttribute("command", "AddAttach");
            btn2.setAttribute("condFields", "AddAttach_Capture_" + item.groupName);
            btn2.setAttribute("conv", "ReportConvMgr.DefaultConstValueConverter('" + { 'GroupName': item.groupName, 'ImageMethod': 'Capture' }.toJSONString() + "')");
            btn2.onclick = function() { commit(this) };
            btns.appendChild(btn2);

            var span02 = document.createElement("span");
            span02.innerHTML = "&nbsp;";
            btns.appendChild(span02);

            var btn3 = document.createElement("input");
            btn3.setAttribute("type", "button");
            btn3.value = "使用";
            css(btn3).Add("button");
            btn3.setAttribute("field", "AddAttach_Group_" + item.groupName);
            btn3.setAttribute("command", "AddAttach");
            btn3.setAttribute("condFields", "AddAttach_Group_" + item.groupName);
            btn3.setAttribute("conv", "ReportConvMgr.DefaultConstValueConverter('" + { 'GroupName': item.groupName, 'ImageMethod': 'Group' }.toJSONString() + "')");
            btn3.onclick = function() {
                if (confirm("是否使用该组图像")) {
                    commit(this);
                    titles.children[0].click();

                    span.innerText = item.groupDesc;
                    var form = formCallCenter.DetectFormByElement(this);
                    if (form) form.SetField("AttachGroupNameList", [{ "groupName": item.groupName, "groupDesc": item.groupName }]);
                }
            }
            btns.appendChild(btn3);

        });

        ApplyEvents(ele);
    }

    this.oo(new ReportConvMgr.DefaultListConverter());
}

ReportConvMgr.PrintTempListConv = function(printElementID) {
    Form_ListValueConv.apply(this, arguments);
    this.DecodeArguments = function(ele, args) {
        var list = [];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                if (args[i]["ReportTempUrl"].indexOf("PrintReport") > -1) list[list.length] = args[i];
            }
        }
        return list;
    }
    this.ApplyValue = function(ele, val) {
        ele.innerHTML = "";
        val.forEach(function(item) {
            var span = ele.ownerDocument.createElement("span");
            span.innerText = item["ReportTempName"];
            span.onclick = function() {
                var printElement = ele.ownerDocument.getElementById(printElementID);
                if (printElement) printElement.__currData = item;
                Printitem = item;
                setTimeout(function() {
                    commit(printElement);
                }, 500);

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

function PrintReport(ele) {
    setTimeout(function() {
        var printElement = ele.ownerDocument.getElementById("divPrintElement");
        Printitem = printElement.__currData;

        commit(printElement);
        //        var param = {
        //            "command": "NotifyTitle",
        //            "field": "cmd_CentralizedPrintModule",
        //            "condFields": "cmd_CentralizedPrintModule,f_NotifyDataType,CondPrintReport",
        //            "conv": "StaticValueConv(\"CentralizedPrint\")"
        //        };
        //        usercommit(ele, param);
    }, 100);
}

function CondPrintReportConv() {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function(ele) {
        var url = window.document.location.href;
        var file = "ui/js/app/report/" + Printitem.ReportTempUrl;
        var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
        var ExamRequestID = form.GetField('CurrReportExamRequestID');
        return { "Type": "Print", "ReportTempUrl": file, "ExamRequestID": ExamRequestID, "IsBackGroundPrint": false }.toJSONString();
    }
}

//used in US only
ReportConvMgr.ReportTempListConv = function() {
    Form_ListValueConv.apply(this, arguments);
    this.DecodeArguments = function(ele, args) {
        var list = [];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                if (args[i]["ReportTempUrl"].indexOf("EditReport") > -1) list[list.length] = args[i];
            }
        }
        return list;
    }
    this.ApplyValue = function(ele, val) {
        var itemEle = ele.__itemEle;
        if (!itemEle) {
            itemEle = ele.__itemEle = document.createElement("div");
            itemEle.style.display = "none";
            itemEle.setAttribute("field", ele.getAttribute("itemfield"));
            itemEle.setAttribute("conv", "ReportConvMgr.ReportTempItemConv");
            itemEle.__listIframe = ele;
            ele.ownerDocument.body.appendChild(itemEle);
        }
    }
}
ReportConvMgr.ReportTempItemConv = function() {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        var listIframe = ele.__listIframe;
        if (!listIframe) return;
        var tempList = listIframe.__bindedData;
        if (tempList) {
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].ReportTempUID == val) {
                    listIframe.src = tempList[i].ReportTempUrl;
                    break;
                }
            }
        }
    }
}

//used in US only
ReportConvMgr.VideoDeviceStatusCodeConv = function() {
    this.ApplyValue = function(ele, val) {

        switch (val) {
            case "Stopped":
                VideoController.stop(ele);
                break;
            case "Running":
                if (!VideoController.isRunning()) VideoController.start(ele);
                break;
            case "Kinescoping":
                //录像
                break;
            default:
                break;
        }
    }
    this.oo(new ReportConvMgr.DefaultValueConverter());
}

//used in US only
ReportConvMgr.AttachGroupNameListMenuConv = function() {
    this.ApplyValue = function(ele, val) {
        var list = [{ "groupDesc": "停止", "groupName": null }];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                if (typeof(val[i].groupName) == "undefined") {
                    list[i + 1] = { "groupDesc": val[i], "groupName": val[i] };
                } else {
                    list[i + 1] = { "groupDesc": val[i].groupDesc ? val[i].groupDesc : val[i].groupName, "groupName": val[i].groupName };
                }
            }
        }
        var addList = [];
        for (var i = 0; i < list.length; i++) {
            var find = false;
            for (var j = 0; j < ele.children.length; j++) {
                if (list[i].groupName == ele.children[j].__bindData) {
                    ele.children[j].innerText = list[i].groupDesc;
                    find = true;
                    break;
                }
            }
            if (!find) addList[addList.length] = list[i];
        }
        for (var i = 0; i < addList.length; i++) {
            var item = addList[i];
            var span = document.createElement("span");
            span.innerText = item.groupDesc;
            span.setAttribute("field", "CurrAttachGroupName");
            span.setAttribute("command", "-");
            span.setAttribute("conv", "ReportConvMgr.CurrAttachGroupNameConv");
            span.style.width = "100%;"
            span.style.cursor = "pointer";
            span.style.display = "block";
            span.__bindData = item.groupName;
            span.onclick = function(e) { return function() { changeFieldValue(e); } }(span);
            ele.appendChild(span);
        }
    }

    this.oo(new ReportConvMgr.DefaultListConverter());
}
ReportConvMgr.CurrAttachGroupNameConv = function() {
    this.GetUIValue = function(ele) {
        return ele.__bindData;
    }
    this.ApplyValue = function(ele, val) {
        ele.style.color = ele.__bindData == val ? "red" : "";
    }
    this.oo(new ReportConvMgr.DefaultValueConverter());
}

function PrintReportConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (val.StatusCode == 0) {
            var param = {
                "command": "NotifyTitle",
                "field": "cmd_CentralizedPrintModule",
                "condFields": "cmd_CentralizedPrintModule,f_NotifyDataType,CondPrintReport",
                "conv": "StaticValueConv(\"CentralizedPrint\")"
            };
            usercommit(ele, param);
            // new Printer(ele).BeginPrint(1);//BeginPrint(1) 打印使用url重写 刷新本报告页面，效率低；BeginPrint() 使用iframe 窗口弹出，效率高
        }
    }
}

//used in US only
ReportConvMgr.CZListConverter = function() {
    this.ApplyValue = function(ele, val) {
        var form = formCallCenter.DetectFormByElement(ele);
        var tBody = ele.children[0].children[1];
        var rmvList = [];
        for (var i = 0; i < tBody.children.length; i++) {
            var tr = tBody.children[i];
            var filed = tr.children[1].children[0].getAttribute("field");
            var find = false;
            for (var j = 0; j < val.length; j++) {
                var f = "Ext_ExamParam_" + val[j]["ExamParamID"];
                if (filed == f) {
                    val[j].exists = true;
                    find = true;
                    break;
                }
            }
            if (!find) rmvList[rmvList.length] = tr;
        }
        for (var i = rmvList.length - 1; i > -1; i--) {
            var tr = rmvList[i];
            if (tr.parentNode != null) tr.parentNode.removeChild(tr);
        }
        var doc = Wnd(ele).GetDocument();
        for (var i = 0; i < val.length; i++) {
            if (val[i].exists) continue;
            var tr = doc.createElement("tr");

            var td0 = doc.createElement("td");
            td0.style.cssText = "width: 100px;text-align: center;";
            td0.innerText = val[i]["ExamParamName"];
            tr.appendChild(td0);

            var td1 = doc.createElement("td");
            td1.style.cssText = "text-align: center;";
            tr.appendChild(td1);
            var ipt = doc.createElement("input");
            ipt.style.cssText = "width:100%;height: 100%;border: 0; text-align: center;";
            var itemtitle = "Ext_ExamParam_" + val[i]["ExamParamID"];
            ipt.setAttribute("field", itemtitle);
            form.SetTitle(itemtitle, itemtitle);
            ipt.value = val[i]["ExamParamValue"];
            ipt.onchange = function() { changeFieldValue(this); }
            td1.appendChild(ipt);

            var td2 = document.createElement("td");
            td2.style.cssText = "width: 60px;text-align: center;";
            td2.innerText = val[i]["ExamParamUnit"];
            tr.appendChild(td2);

            tBody.appendChild(tr);
        }
    }
    this.GetUIValue = function(ele) {
        var form = formCallCenter.DetectFormByElement(ele);
        var tBody = ele.children[0].children[1];
        var rmvList = [];
        for (var i = 0; i < tBody.children.length; i++) {
            var tr = tBody.children[i];

            var item = {};
            var td0 = tr.children[0];
            item.ExamParamName = td0.innerText;

            var td1 = tr.children[1];
            var ipt = td1.children[0];
            item.ExamParamValue = ipt.value;

            var td2 = tr.children[2];
            item.ExamParamUnit = td2.innerText;
            rmvList[i] = item;
        }
        return rmvList;
    }
    this.GetValue = this.GetUIValue;
    this.oo(new ReportConvMgr.DefaultListConverter());
}


function ReadOnlyNoBlankTextValueConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        ele.innerHTML = val;
        ele.style.color = "#4D4D4D";
        ele.style.backgroundColor = "white";
        ele.style.paddingLeft = "25px";
        ele.style.paddingRight = "25px";
        ele.style.marginTop = "15px";
        ele.style.lineHeight = "16px";
        ele.style.fontFamily = "微软雅黑";
        ele.style.fontSize = "14px";
        ele.onclick = null;
        ele.onmouseover = null;
        ele.onmouseout = null;
    }
    this.GetUIValue = this.GetValue;
}

var ReadOnlyExamItemDiv;
var lastExamRequestID = -1;
var currExamRequestID = -1;

function SetExamRequestIDConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        if (lastExamRequestID != currExamRequestID) {
            lastExamRequestID = currExamRequestID;
            if (ReadOnlyExamItemDiv) ReadOnlyExamItemDiv.innerHTML = "";
        }
        currExamRequestID = val;
    }
}

function ReadOnlyExamItemListConv() {
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
            rmvEle.setAttribute("conv", "ReadOnlyExamItemListConv.ReadOnlyRemoveItemConv");
            ele.appendChild(rmvEle);
        }
        ele = rmvEle;
        for (var i = 0; i < val.length; i++) {
            var uid = val[i];
            var uidField = UIDFieldName(uid);
            if (ele[uidField]) continue;
            var root = document.createElement("div");
            ele.appendChild(root);

            var root_div0 = document.createElement("div");
            root_div0.style.cssText = "width: 90%; float: left;";
            root.appendChild(root_div0);
            addItem(root_div0, uid);
            ele[uidField] = root;
        }
        ReadOnlyExamItemDiv = ele;
    }
    var addItem = function(root, itemUID) {
        addBodyPartDiv(root, itemUID);
        var space = document.createElement('span')
        space.style.cssText = "float:left;"
        space.innerText = "|";
        root.appendChild(space);
        addExamItemDiv(root, itemUID);
        var space1 = document.createElement('span')
        space1.style.cssText = "float:left;"
        space1.innerText = "|";
        root.appendChild(space1);
        addExamMethodDiv(root, itemUID);
    }
    var addBodyPartDiv = function(root, itemUID) {
        var bodyPartDiv = document.createElement('div');
        bodyPartDiv.style.cssText = "float: left;";
        bodyPartDiv.setAttribute('field', 'ItemBodyPartList');
        bodyPartDiv.setAttribute('valuemember', 'BodyPartID');
        bodyPartDiv.setAttribute('displaymember', 'BodyPartName');
        bodyPartDiv.setAttribute('itemfield', 'ItemBodyPart');
        bodyPartDiv.setAttribute('itemvaluemember', 'BodyPartID');
        bodyPartDiv.setAttribute('itemdisplaymember', 'BodyPartName');
        bodyPartDiv.setAttribute('conv', 'ReadOnlyExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(bodyPartDiv);
    }

    var addExamItemDiv = function(root, itemUID) {
        var examItemDiv = document.createElement('div');
        examItemDiv.style.cssText = "float: left;";
        examItemDiv.setAttribute('field', 'ItemExamItemList');
        examItemDiv.setAttribute('valuemember', 'ExamItemID');
        examItemDiv.setAttribute('displaymember', 'ExamItemName');
        examItemDiv.setAttribute('itemfield', 'ItemExamItem');
        examItemDiv.setAttribute('itemvaluemember', 'ExamItemID');
        examItemDiv.setAttribute('itemdisplaymember', 'ExamItemName');
        examItemDiv.setAttribute('conv', 'ReadOnlyExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(examItemDiv);
    }
    var addExamMethodDiv = function(root, itemUID) {
        var examMethodDiv = document.createElement('div');
        examMethodDiv.style.cssText = "float: left;";
        examMethodDiv.setAttribute('field', 'ItemExamMethodList');
        examMethodDiv.setAttribute('valuemember', 'ExamMethodID');
        examMethodDiv.setAttribute('displaymember', 'ExamMethodName');
        examMethodDiv.setAttribute('itemfield', 'ItemExamMethod');
        examMethodDiv.setAttribute('itemvaluemember', 'ExamMethodID');
        examMethodDiv.setAttribute('itemdisplaymember', 'ExamMethodName');
        examMethodDiv.setAttribute('conv', 'ReadOnlyExamItemListConv.WritableListConv("' + itemUID + '")');
        root.appendChild(examMethodDiv);
    }
}
ReadOnlyExamItemListConv.ReadOnlyRemoveItemConv = function() {
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
ReadOnlyExamItemListConv.WritableListConv = function(itemUID) {
    Form_ListValueConv.apply(this);

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function(srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "ReadOnlyExamItemListConv.WritableListItemConv(" + itemUID.toJSONString() + ")");
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
    this.ApplyValue = function(self) {
        return function(ele, value) {
            var span = null;
            if (ele.children.length != 1) {
                span = document.createElement("SPAN");
                self.InheritProperties(ele, span);
                ele.appendChild(span);
            } else {
                span = ele.children[0];
            }
        }
    }(this);
    ReadOnlyExamItemListConv.WritableListItemConv = function(itemUID) {
        Form_SingleValueConv.apply(this);
        this.DetermineApply = function(self) {
            return function(ele, val) {
                return val.ItemUID == itemUID;
            }
        }(this);
        this.ApplyValue = function(ele, value) {
            var val = value;
            if (value.BodyPart) val = value.BodyPart;
            else if (value.ExamItem) val = value.ExamItem;
            else if (value.ExamMethod) val = value.ExamMethod;

            ele.innerHTML = "";
            ele.__currData = val;
            if (!val) return;

            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            if (val[valueMember] == null) {
                ele.innerHTML = val[displayMember];
                ele.__currData = val;
                return;
            }

            var listData = ele.parentNode.__bindedData;
            if (listData) {
                if (listData[0].BodyPartList) listData = listData[0].BodyPartList;
                else if (listData[0].ExamItemList) listData = listData[0].ExamItemList;
                else if (listData[0].ExamMethodList) listData = listData[0].ExamMethodList;

                for (var i = 0; i < listData.length; i++) {
                    var curr = listData[i];
                    if (curr[valueMember] == val[valueMember]) {
                        ele.innerHTML = curr[displayMember] ? curr[displayMember] : val[displayMember];
                        ele.__currData = curr;
                        break;
                    } else {
                        ele.innerHTML = val[displayMember];
                    }
                }
            }
        }
        this.GetUIValue = function(self) {
            return function(ele) {
                return ele.__currData;
            }
        }(this);
    }
}

function ApplyPatientAgeConv() {
    this.ApplyValue = function(ele, val) {
        if (val) {
            if (val.toString() != '0') {
                ele.innerText = val == null ? "" : val;
            } else {
                ele.innerText = "";
            }
        } else
            ele.innerText = "";
    }
    this.oo(new Form_SingleValueConv());
}

function ExamRequestItemListConv(mode, style, maxSize) {
    //mode:项目形式，0:检查部位-检查项目-检查方法,!0:检查部位
    var args = [style, maxSize];
    if (!style) args[0] = style = {
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
    if (!maxSize) args[1] = maxSize = { 'height': 240 };
    ExamRequestItemListConv.ItemListConv = function(style, maxSize) {
        Form_ListValueConv.apply(this);
        this.ApplyValue = function(ele, val) {
            var rmvEle = ele.__rmvEle__;
            if (!rmvEle) {
                var label = ele.ownerDocument.createElement("span");
                label.innerHTML = "检查项目";
                label.style.cssText = "float:left;";
                label.setAttribute("class", "inputItemLabel");
                ele.appendChild(label);
                var addItemEle = ele.ownerDocument.createElement("span");
                addItemEle.title = "添加项目";
                addItemEle.style.cssText = "background: url(../../../img/加号.png); cursor:pointer; background-repeat: no-repeat; background-position: 0px 0px; height:18px; width:18px; display:inline-block;float:left; margin-top:6px;";

                addItemEle.setAttribute("command", "AddItem");
                addItemEle.onclick = function() {
                    commit(this);
                }
                ele.appendChild(addItemEle);

                var div = ele.ownerDocument.createElement("div");
                div.style.cssText = "clear:both;";
                ele.appendChild(div);

                rmvEle = ele.__rmvEle__ = ele.ownerDocument.createElement("div");
                rmvEle.__examRequestItems = [];
                rmvEle.setAttribute("field", "RemoveItem");
                rmvEle.setAttribute("command", "-");
                rmvEle.setAttribute("conv", "ExamRequestItemListConv.ItemListConv.RemoveItemConv");
                ele.appendChild(rmvEle);

            }
            ele = rmvEle;
            var items = ele.__examRequestItems;
            for (var i = 0; i < val.length; i++) {
                var uid = val[i];
                var find = false;
                for (var j = 0; j < items.length; j++) {
                    if (items[j].UID == uid) {
                        find = true;
                        break;
                    }
                }
                if (find) continue;
                items[items.length] = { "UID": uid, "Container": ele };
            }
            UpdateExamRequestItemList(ele);
        }

        function UpdateExamRequestItemList(ele) {
            var items = ele.__examRequestItems;
            //多退
            for (var i = ele.children.length - 1; i > -1; i--) {
                var uid = ele.children[i].__Item.UID;
                var find = false;
                for (var j = 0; j < items.length; j++) {
                    if (uid == items[j].UID) {
                        find = true;
                        break;
                    }
                }
                if (!find) ele.removeChild(ele.children[i]);
            }
            //少补
            for (var i = items.length - 1; i > -1; i--) {
                var uid = items[i].UID;
                if (!uid) continue;
                var index = -1;
                for (index = 0; index < ele.children.length; index++) {
                    if (uid == ele.children[index].__Item.UID) break;
                }
                var addOrRemoveEle;
                if (index == ele.children.length) {

                    var root = document.createElement("div");
                    root.__Item = items[i];
                    items[i].Container = root;
                    root.style.cssText = "margin-left:10px;";
                    addOrRemoveEle = ele.ownerDocument.createElement("img");
                    // addOrRemoveEle.type = "button";
                    root.appendChild(addOrRemoveEle);
                    createDataListConv(root, uid, 'ItemUID', 'ItemBodyPartList', 'ItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
                    createDataListConv(root, uid, 'ItemUID', 'ItemExamItemList', 'ItemExamItem', 'ExamItemList', 'ExamItemName', 'ExamItemID', 'ExamItem');
                    createDataListConv(root, uid, 'ItemUID', 'ItemExamMethodList', 'ItemExamMethod', 'ExamMethodList', 'ExamMethodName', 'ExamMethodID', 'ExamMethod');
                    ele.appendChild(root);
                } else {
                    addOrRemoveEle = ele.children[index].children[0];
                }
                // addOrRemoveEle.value = "-";
                addOrRemoveEle.style.cssText = "background: url(../../../img/减号.png); cursor:pointer; background-repeat: no-repeat; background-position: center; height: 18px; width: 30px; margin-top: 2px;";
                addOrRemoveEle.onclick = function(uid) {
                    return function() {
                        var param = {};
                        param.command = "RemoveItem";
                        param.field = param.condFields = "RemoveItem_" + uid;
                        param.conv = "StaticValueConv('" + uid + "')";
                        usercommit(this, param);
                    }
                }(uid);
            }
        }

        function createDataListConv(container, uid, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
            var dataListEle = container.ownerDocument.createElement("span");
            dataListEle.setAttribute("field", listField);
            dataListEle.setAttribute("itemField", currField);
            dataListEle.setAttribute("command", "-");
            dataListEle.setAttribute("valueMember", valueMember);
            dataListEle.setAttribute("displayMember", displayMember);
            if (objectMember) {
                dataListEle.setAttribute("conv", "ExamRequestItemListConv.ItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
            } else {
                dataListEle.setAttribute("conv", "ExamRequestItemListConv.ItemListConv.DropDownInputConv(" + "'" + uid + "', '" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
            }
            container.appendChild(dataListEle);
            return dataListEle;
        }
        ExamRequestItemListConv.ItemListConv.RemoveItemConv = function() {
            this.DetermineApply = function(self) {
                return function(ele, val) {
                    return true;
                }
            }(this);
            this.ApplyValue = function(ele, val) {
                var items = ele.__examRequestItems;
                var find = false;
                for (var i = items.length - 1; i > -1; i--) {
                    if (items[i].UID == val) {
                        var e = items[i].Container;
                        if (e.parentNode) e.parentNode.removeChild(e);
                        for (var j = i; j < items.length - 1; j++) {
                            items[j] = items[j + 1];
                        }
                        items.length--;
                        find = true;
                    }
                }
                if (find) UpdateExamRequestItemList(ele);
            }
            this.oo(new Form_SingleValueConv());
        }
        ExamRequestItemListConv.ItemListConv.DropDownInputConv = function(uid, uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
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

                Form.SetAttribute(desElement, "conv", "ExamRequestItemListConv.ItemListConv.DropDownInputConv.DropDownInputItemConv('" + uid + "','" + uidMember + "','" + listMember + "','" + objectMember + "'," + itemStyle + "," + currNotObject + "," + readOnly + ")", true);
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
            ExamRequestItemListConv.ItemListConv.DropDownInputConv.DropDownInputItemConv = function(uid, uidMember, listMember, objectMember, style, currNotObject, readOnly) {
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
    }

    ExamRequestItemListConv.BodyPartItemListConv = function(style, maxSize) {
        Form_ListValueConv.apply(this);
        this.ApplyValue = function(ele, val) {
            var rmvEle = ele.__rmvEle__;
            if (!rmvEle) {
                rmvEle = ele.__rmvEle__ = ele.ownerDocument.createElement("div");
                rmvEle.__examRequestItems = [];
                rmvEle.setAttribute("field", "RemoveItem");
                rmvEle.setAttribute("command", "-");
                rmvEle.setAttribute("conv", "  ExamRequestItemListConv.BodyPartItemListConv.RemoveItemConv");
                ele.appendChild(rmvEle);

            }
            ele = rmvEle;
            var items = ele.__examRequestItems;
            for (var i = 0; i < val.length; i++) {
                var uid = val[i];
                var find = false;
                for (var j = 0; j < items.length; j++) {
                    if (items[j].UID == uid) {
                        find = true;
                        break;
                    }
                }
                if (find) continue;
                items[items.length] = { "UID": uid, "Container": ele };
            }
            UpdateExamRequestItemList(ele);
        }

        function createDataListConv(container, uidMember, listField, currField, listMember, displayMember, valueMember, objectMember, filter, currNotObject) {
            var dataListEle = container.ownerDocument.createElement("span");
            dataListEle.setAttribute("field", listField);
            dataListEle.setAttribute("itemField", currField);
            dataListEle.setAttribute("command", '-');
            dataListEle.setAttribute("valueMember", valueMember);
            dataListEle.setAttribute("displayMember", displayMember);
            if (objectMember) {
                dataListEle.setAttribute("conv", "ExamRequestItemListConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", false, false)");
            } else {
                dataListEle.setAttribute("conv", "ExamRequestItemListConv.BodyPartItemListConv.DropDownInputConv(" + "'" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + style.toJSONString() + ", " + maxSize.toJSONString() + ", " + filter + ", true, true)");
            }
            container.appendChild(dataListEle);
            return dataListEle;
        }
        ExamRequestItemListConv.BodyPartItemListConv.RemoveItemConv = function() {
            Form_SingleValueConv.apply(this, arguments);
            this.ApplyValue = function(self) {
                return function(ele, val) {
                    var examRequestItems = ele.__examRequestItems;
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

        ExamRequestItemListConv.BodyPartItemListConv.DropDownInputConv = function(uidMember, listMember, objectMember, style, maxSize, filter, currNotObject, readOnly) {
            //filter:下拉列表过滤器，为非function表示不过滤
            //currNotObject:选项数据是否非value-display对象
            //readOnly:是否不可手工录入
            Form_SingleValueConv.apply(this, arguments);
            this.DetermineApply = function(ele, val) {
                var examRequestItems = ele.parentNode.__examRequestItems;
                for (var i = 0; i < examRequestItems.length; i++) {
                    if (examRequestItems[i].UID == val[uidMember]) return true;
                }
                return false;
            }
            this.InheritProperties = function(srcElement, desElement) {
                Form.SetAttribute(desElement, "conv", "ExamRequestItemListConv.BodyPartItemListConv.DropDownInputConv.DropItemConv(" + "'" + uidMember + "', '" + listMember + "', '" + objectMember + "', " + null + "," + false + ")", true);
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
                        css(spMenu).Add("dropTexts");
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
                                            param.command = 'AddItem';
                                            usercommit(this, param);
                                        } else {
                                            if (curr.__list.length < 1) {
                                                alert("没有选择要删除的部位");
                                            } else {
                                                //                                        if (confirm("是否删除该项目？")) {//..
                                                var param = {};
                                                param.command = "RemoveItem";
                                                param.field = "RemoveItem_" + curr.__list[curr.__list.length - 1];
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
                                css(lab).Remove(style.unselectedLabel);
                                css(lab).Add(style.selectedLabel);
                                css(text).Remove(style.unselectedText);
                                css(text).Add(style.selectedText);
                            } else {
                                css(e).Remove(style.selectedItem);
                                css(e).Add(style.unselectedItem);
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
            ExamRequestItemListConv.BodyPartItemListConv.DropDownInputConv.DropItemConv = function(uidMember, listMember, objectMember, style) {
                Form_SingleValueConv.apply(this);
                this.DetermineApply = function(ele, val) {
                    if (!val[uidMember]) return false;
                    var examRequestItems = ele.parentNode.parentNode.parentNode.__examRequestItems;
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
                        param.field = "ItemBodyPart";
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

        function UpdateExamRequestItemList(ele) {
            if (!ele.__bodyPartItems) ele.__bodyPartItems = createDataListConv(ele, 'ItemUID', 'ItemBodyPartList', 'ItemBodyPart', 'BodyPartList', 'BodyPartName', 'BodyPartID', 'BodyPart');
        }
    }
    if (mode) {
        ExamRequestItemListConv.BodyPartItemListConv.apply(this, args);
    } else {
        ExamRequestItemListConv.ItemListConv.apply(this, args);
    }
}

function ReadOnlyModeConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, value) {
        if (value) {
            ele.innerText = "当前报告为只读模式";
            ele.style.display = "";
            ele.style.color = "red";
            closeCurrExamRequest(ele);
        } else {
            ele.style.display = "none";
        }
    }
}

function closeCurrExamRequest(ele) {
    var form = formCallCenter.GetFormByID(window.FormIDs.ReportModule);
    var currReportExamRequestID = form.GetField("CurrReportExamRequestID");
    var param1 = {
        "field": "arg_NavigateModule_SearchModule",
        "command": "NotifyTitle",
        "condFields": "cmd_NavigateModule,f_NotifyDataType,arg_NavigateModule_SearchModule",
        "conv": "StaticValueConv('SearchModule')"
    }
    if (currReportExamRequestID) {
        var reportExamRequestIDField = "ReportExamRequestID_" + currReportExamRequestID;
        var param2 = { "command": "CloseReport", "condFields": reportExamRequestIDField + ",CloseReport_Close" };
        var param3 = { "field": reportExamRequestIDField, "conv": "StaticValueConv(" + currReportExamRequestID + ")" };
        setTimeout(function() {
            useroperate(ele, commit, param2, param3);
            usercommit(ele, param1);
        }, 100);
    } else {
        usercommit(ele, param1);
    }
}

function ReadonlyDoctorNameConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function(ele, val) {
        ele.innerHTML = "";
        if (val) {
            ele.innerHTML = val['DoctorName'];
        }
    }
}

function NotifyConv() {
    Form_SingleValueConv.apply(this);
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return true;
        }
    }(this);
    this.ApplyValue = function(ele, val) {
        switch (val) {
            case 'KinescopeStart':
                {
                    var param = {};
                    param.command = "AddAttach";
                    param.field = param.condFields = "AddAttachStartKinescope";
                    param.conv = "StaticValueConv(\"{'GroupName':'68579a1f-acc7-46aa-9166-e4eca3fb13ca','ImageMethod':'StartKinescope'}\")";
                    usercommit(ele, param);
                    break;
                }
            case 'KinescopeStop':
                {
                    var param = {};
                    param.command = "AddAttach";
                    param.field = param.condFields = "AddAttachStopKinescope";
                    param.conv = "StaticValueConv(\"{'GroupName':'68579a1f-acc7-46aa-9166-e4eca3fb13ca','ImageMethod':'StopKinescope'}\")";
                    usercommit(ele, param);
                    break;
                }
            default:
                break;
        }
    }
}

function trimBlank(text) {
    var find = true;
    if (!text) text = "";
    while (find) {
        text = text.replace(' ', '');
        text = text.replace('\n', '');
        text = text.replace('\t', '');
        text = text.replace('\r', '');
        find = text.indexOf(' ') > -1 || text.indexOf('\n') > -1 || text.indexOf('\t') > -1 || text.indexOf('\r') > -1;
    }
    find = true;
    while (find) {
        text = text.replace(' ', '');
        text = text.replace('\n', '');
        text = text.replace('\t', '');
        text = text.replace('\r', '');
        find = text.indexOf(' ') > -1 || text.indexOf('\n') > -1 || text.indexOf('\t') > -1 || text.indexOf('\r') > -1;
    }
    return text;
}

function changeFindingOrImpression(ele) {
    ele.__changing = true;
}

function reportFindingOrImpression(ele) {
    var action = function() {
        var cache = trimBlank(ele.__cacheValue);
        var val = trimBlank(ele.textContent);
        if (cache != val || ele.__changing) {
            ele.__changing = false;
            changeFieldValue(ele)
        }
    }
    setTimeout(action, 1);
}