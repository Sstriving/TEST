function init() {
    var userConfigForm = new UserConfigForm();
    this.SetColumnHeadInfo();
    userConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "UserRecords": "UserRecords",    //用户列表集合
        "SelectedPKCode": "SelectedPKCode",
        "SaveUser": "SaveUser",
        "SavePassword": "SavePassword",
        "DeleteUser": "DeleteUser",
        "NewUser": "NewUser",

        "UserCode": "UserCode",
        "UserName": "UserName",
        "Password": "Password",
        "CreateTime": "CreateTime",
        "Remark": "Remark",

        "NewPassword": "NewPassword",
        "FrozenUserList": "FrozenUserList",
        "ActiveUserList": "ActiveUserList",
        "ActiveUser": "ActiveUser",

        "CAId": "CAId",
        "ReadCA": "ReadCA",
        "BindingCA": "BindingCA",
        "RelieveCA": "RelieveCA",
        "LocalImage": "LocalImage",
        "CAAutograph": "CAAutograph",
        "AddExamRequestAttach": "AddExamRequestAttach",
        "ExamRequestAttachUIDList": "ExamRequestAttachUIDList",   //系统检查的附件UID列表
        "ExamRequestAttachUrl": "ExamRequestAttachUrl",       //系统检查项目的附件Url   
        "RemoveExamRequestAttach": "RemoveExamRequestAttach",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        userConfigForm.SetTitle(t, titles[t]);
    }

    formCallCenter.RegisterForm(window.FormIDs.UserConfigModule, userConfigForm);
    
}

function UserConfigForm() {
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

function BeforeClick(id) {
    var table = document.getElementById(id);
    ElementCollectionToArray(table.parentNode.getElementsByTagName("TABLE")).forEach(function (x) { x.style.display = "none"; });

    document.getElementById(id).style.display = '';
}
function SetColumnHeadInfo() {
    var data = new Array();
    //Name,Description,Width(可空)
    data.push("UserCode:用户账号");
    data.push("UserName:用户名");
    data.push("CreateTime:注册时间:180");
    data.push("Remark:备注:256");
    // data.push("DisplayNO:显示顺序");

    var ele = document.getElementById("UserRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "UserCode");
}

function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigUserID").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenUserID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
    if (frozenDivID == "frozenUserID") document.getElementById("TableUpdatePasswordID").style.display = "none";
    else document.getElementById("TableUpdatePasswordID").style.display = "block";
}

function ExamRequestAttachUIDList_SysConv(layout) {
    var params = { 'RemoveField': 'RemoveExamRequestAttach',
        'RemoveCommand': 'RemoveExamRequestAttach',
        'UrlField': 'ExamRequestAttachUrl'
    };
    this.ApplyValue = function (ele, val) {
        ele.innerHTML = "";
        if (val[0]!=null) {

       
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
            var uidField = "RemoveExamRequestAttach" + uid;
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


            // var rmv = ele.ownerDocument.createElement("span");
            // rmv.style.position = "absolute";
            // rmv.style.cursor = "pointer";
            // rmv.style.backgroundColor = "black";
            // rmv.style.color = "white";
            // rmv.style.fontSize = "14px";
            // rmv.innerHTML = "X";
            // rmv.title = "删除该图";
            // rmv.onclick = function (d, i) {
            //     return function () {
            //         var tmp = ele.__img__container;
            //         if (tmp && tmp.parentNode) {
            //             ele.__img__container = null;
            //             tmp.parentNode.removeChild(tmp);
            //         }
            //         if (confirm("是否删除此图片")) {
            //             commit(d);
            //         }
            //     }
            // } (div, img);
            // rmv.setAttribute("field", uidField);
            // rmv.setAttribute("command", "-");
            // rmv.setAttribute("conv", "StaticValueConv('" + uid + "')");

            var img = ele.ownerDocument.createElement("img");
            img.setAttribute("field", params.UrlField);
            img.setAttribute("command", "-");
            img.setAttribute("conv", urlConv);
            img.onload = function (i) {
                return function () {
                    new ui(i).FitView()
                }
            } (img);
            // img.onclick = function (d, i, r) {
            //     var show = function () {
            //         if (!i.parentNode) return;
            //         var doc = Wnd(ele).GetDocument();
            //         var tmp = ele.__img__container;
            //         if (!tmp) {
            //             tmp = doc.createElement("div");
            //             tmp.style.position = "absolute";
            //             tmp.style.left = doc.documentElement.scrollLeft + "px";
            //             tmp.style.top = doc.documentElement.scrollTop + "px";
            //             tmp.style.zIndex = 99999999;
            //             ele.__img__container = tmp;
            //             doc.body.appendChild(tmp);

            //             var container = doc.createElement("div");
            //             container.style.position = "absolute";
            //             container.style.left = "0px";
            //             container.style.right = "0px";
            //             container.style.top = "0px";
            //             container.style.bottom = "24px";
            //             tmp.appendChild(container);

            //             var im = doc.createElement("img");
            //             im.onload = function (i) {
            //                 return function () {
            //                     new ui(i).FitView()
            //                 }
            //             } (im);
            //             container.appendChild(im);

            //             tmp.appendChild(container);

            //             function goto(btnFirst, btnPrevious, btnNext, btnLast, index) {
            //                 if (index < 0) index = 0;
            //                 if (index >= ele.children.length) index = ele.children.length - 1;
            //                 if (index > -1) {
            //                     tmp.children[0].children[0].src = ele.children[index].children[0].src;
            //                     tmp.children[0].children[0].curr = ele.children[index].children[0];
            //                 }
            //                 else {
            //                     tmp.children[0].children[0].src = null;
            //                     tmp.children[0].children[0].curr = null;
            //                 }
            //                 btnFirst.disabled = index == 0 || ele.children.length < 1 ? "disabled" : "";
            //                 btnPrevious.disabled = index < 1 ? "disabled" : "";
            //                 btnNext.disabled = index > ele.children.length - 2 ? "disabled" : "";
            //                 btnLast.disabled = index == ele.children.length - 1 || ele.children.length < 1 ? "disabled" : "";
            //             }
            //             var bar = doc.createElement("div");
            //             bar.style.textAlign = "center";
            //             var btnFirst = doc.createElement("input");
            //             btnFirst.type = "button";
            //             btnFirst.className = "button";
            //             btnFirst.value = "最前";
            //             bar.appendChild(btnFirst);
            //             var btnPrevious = doc.createElement("input");
            //             btnPrevious.type = "button";
            //             btnPrevious.className = "button";
            //             btnPrevious.value = "上一副";
            //             bar.appendChild(btnPrevious);
            //             var btnNext = doc.createElement("input");
            //             btnNext.type = "button";
            //             btnNext.className = "button";
            //             btnNext.value = "下一副";
            //             bar.appendChild(btnNext);
            //             var btnLast = doc.createElement("input");
            //             btnLast.type = "button";
            //             btnLast.className = "button";
            //             btnLast.value = "最后";
            //             bar.appendChild(btnLast);
            //             btnFirst.onclick = function () {
            //                 goto(btnFirst, btnPrevious, btnNext, btnLast, 0);
            //             }
            //             btnPrevious.onclick = function () {
            //                 for (var j = 0; j < ele.children.length; j++) {
            //                     if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
            //                         goto(btnFirst, btnPrevious, btnNext, btnLast, j - 1);
            //                         break;
            //                     }
            //                 }
            //             }
            //             btnNext.onclick = function () {
            //                 for (var j = 0; j < ele.children.length; j++) {
            //                     if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
            //                         goto(btnFirst, btnPrevious, btnNext, btnLast, j + 1);
            //                         break;
            //                     }
            //                 }
            //             }
            //             btnLast.onclick = function () {
            //                 goto(btnFirst, btnPrevious, btnNext, btnLast, ele.children.length - 1);
            //             }
            //             var btnClose = doc.createElement("input");
            //             btnClose.type = "button";
            //             btnClose.className = "button";
            //             btnClose.value = "关闭";
            //             bar.appendChild(btnClose);
            //             btnClose.onclick = function () {
            //                 ele.__img__container = null;
            //                 if (tmp.parentNode) tmp.parentNode.removeChild(tmp);
            //             }
            //             tmp.__goto = function (index) {
            //                 goto(btnFirst, btnPrevious, btnNext, btnLast, index);
            //             }
            //             bar.style.position = "absolute";
            //             bar.style.left = "50%";
            //             bar.style.marginLeft = "-240px";
            //             bar.style.bottom = "0px";
            //             tmp.appendChild(bar);
            //         }
            //         tmp.style.left = "6px";
            //         tmp.style.top = "6px";
            //         tmp.style.backgroundColor = "#bbb";
            //         tmp.style.width = (doc.documentElement.scrollWidth - 12) + "px";
            //         tmp.style.height = (doc.documentElement.scrollHeight - 12) + "px";
            //         tmp.children[0].children[0].src = i.src;
            //         tmp.children[0].children[0].curr = i;
            //         for (var j = 0; j < ele.children.length; j++) {
            //             if (ele.children[j].children[0] == i) {
            //                 tmp.__goto(j);
            //                 break;
            //             }
            //         }
            //     }
            //     return show;
            // } (div, img, rmv);

            div.appendChild(img);
            // div.appendChild(rmv);
            ele.appendChild(div);
        }
     }
    }
    this.oo(new Form_ListValueConv());
    ExamRequestAttachUIDList_SysConv.RemoveExamRequestAttach_SysConv = function (uid) {
        this.CompareValues = function (val1, val2) {
            return -1;
        }
        this.ApplyValue = function (ele, val) {
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
    ExamRequestAttachUIDList_SysConv.ExamRequestAttachUrl_SysConv = function (uid) {
        this.ApplyValue = function (ele, val) {
            if (uid == val.ExamRequestAttachUID_Sys) ele.src = val.AttachUrl_Sys;
        }
        this.oo(new Form_SingleValueConv());
    }
}

