var CaptureKeyCode = 113;
var EnterKeyCode = 13;
var captureImageWidth=1280;
var captureImageHeight=720;
var printMarginTop=19.05;
var printMarginBottom=19.05;
var reportImageHeaderHeight=24;
//是否裁剪图像
var isCutImg=false;
//是否调整灰度
var isModifyGray=false;
//是否设置默认阴阳性
var isSetDefaultBolPositive=false;
var TypeIndexMap=new Map();
var preindex=0;
// 回车键： VK_RETURN (13)
// TAB键： VK_TAB (9)
function app() {
    this.start = function () {
        //键盘操作
        var func = function (wnd) {
            return function () {
                var p1 = { "command": "NotifyTitle", "condFields": "cmd_ActiveApplication" };
                var p2 = { 'field': "cmd_ActiveApplication", "command": "-", "conv": "StaticValueConv('ActiveApplication')" };
                useroperate(wnd.document.body, commit, p1, p2);
                if (Event().KeyCode() == CaptureKeyCode) {
                    p1 = { "command": "NotifyTitle", "condFields": "f_CaptureImage" };
                    p2 = { 'field': "f_CaptureImage", "command": "-", "conv": "StaticValueConv('CaptureImage')" };
                    useroperate(wnd.document.body, commit, p1, p2);
                }
                else if(Event().KeyCode() == EnterKeyCode){
                    TypeIndexMap.Clear();
                    var  arr = new Array();
                    var cur =parseInt(event.srcElement.getAttribute("typeindex"));
                   
                    TraversalObject(wnd.document.body.children);
                    if(!cur){
                       cur=preindex;
                    }

                    GetNextNode(cur);
                }
            }
        } (window);
        if (window.document.body) {
            Event.Register(window.document.body, "keyup", func);
        }
        else {
            Event.ObserveOnce(window, "load", function (wnd, f) {
                return function () {
                    Event.Register(wnd.document.body, "keyup", f);
                }
            } (window, func));
        }

        //鼠标点击操作
        func = function (wnd) {
            return function () {
                var p1 = { "command": "NotifyTitle", "condFields": "cmd_ActiveApplication" };
                var p2 = { 'field': "cmd_ActiveApplication", "command": "-", "conv": "StaticValueConv('ActiveApplication')" };
                useroperate(wnd.document.body, commit, p1, p2);
            }
        } (window);
        if (window.document.body) {
            Event.Register(window.document.body, "click", func);
        }
        else {
            Event.ObserveOnce(window, "load", function (wnd, f) {
                return function () {
                    Event.Register(wnd.document.body, "click", f);
                }
            } (window, func));
        }
        //禁止拖拽html
        // window.document.ondragstart = function () {
        //     //            return true
        //     return ElementTEXTAREA(Event.Source());

        // };
        // function ElementTEXTAREA(ele) {
        //     while (ele) {
        //         switch (ele.tagName) {
        //             case "TEXTAREA":
        //                 return true;
        //             default:
        //                 return false;
        //         }
        //     }
        //     return false;
        // }
		window.document.onselectstart = function () {
            return ElementEditable(Event.Source());
        }
        function ElementEditable(ele) {
            while (ele) {
                switch (ele.tagName) {
                    case "INPUT":
                    case "TEXTAREA":
                        return true;
                    default:
                        var editable = ele.getAttribute ? ele.getAttribute("contenteditable") : null;
                        if (typeof (editable) == 'string') {
                            if (editable == "true") return true;
                        }
                        if (editable) return true;
                }
                ele = ele.parentNode;
            }
            return false;
        }
    }
}
new app().start();

function TraversalObject(nodeList) {
    if (nodeList.length > 0) {
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].children.length > 0) {
                var id = parseInt(nodeList[i].getAttribute("typeindex"));
                if (id && TypeIndexMap.IndexOfKey(id) == -1) {
                    TypeIndexMap.Add(id, nodeList[i]);
                } else {
                    TraversalObject(nodeList[i].children); //递归遍历
                }
            } else {
                var id = parseInt(nodeList[i].getAttribute("typeindex"));
                if (id && TypeIndexMap.IndexOfKey(id) == -1) {
                    TypeIndexMap.Add(id, nodeList[i]);
                }
            }
        }
    } else {
        var id = nodeList.getAttribute == undefined ? null:parseInt(nodeList.getAttribute("typeindex"));
        if (id && TypeIndexMap.IndexOfKey(id) == -1) {
            TypeIndexMap.Add(id, nodeList);
        }
    }
}

function GetNextNode(index) {
    var arr = new Array();
    for (var i = 0; i <= TypeIndexMap.Count() - 1; i++) {
        arr.push(TypeIndexMap.KeyAt(i));
    };

    ArraySort(arr);
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == index) {
            if (i == 0) continue;
            var ele = TypeIndexMap.ValueForKey(arr[i - 1]);
            if (ele.children.length == 0) {
                ele.focus();
                preindex = arr[i - 1];
            } else {
                var aa = ele.getElementsByTagName("input");
                aa[0].focus();
                preindex = arr[i - 1]
            }
        }
    };
}

//从大到小排序
function ArraySort(arr) {
    //外层循环，共要进行arr.length次求最大值操作
    for (var i = 0; i < arr.length; i++) {
        //内层循环，找到第i大的元素，并将其和第i个元素交换
        for (var j = i; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                //交换两个元素的位置
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function CheckableModalityListConv() {
    CheckableListConv.apply(this, arguments);
    this.DecodeArguments = function (ele, args) {
        var list = [];
        for (var i = 0; i < args.length; i++) {
            switch (args[i].ModalityCode) {
                case "CT":
                case "DR":
                case "MR":
                 case "MG":
                case "RF":
                    list[list.length] = args[i];
                    break;
            }
        }
        return list;
    }
}

function minWindow() {
    var param = {
        "command": "NotifyTitle",
        "field": "arg_MinWindow",
        "condFields": "arg_MinWindow,f_NotifyDataType,arg_MinWindow",
        "conv": "StaticValueConv(\"MinWindow\")"
    };
    usercommit(Event.Source(), param);
}

function FilterableModalityListConv() {
    FilterableListConv.apply(this, arguments);
    this.DecodeArguments = function (ele, args) {
        var list = [];
        for (var i = 0; i < args.length; i++) {
            switch (args[i].ModalityCode) {
                case "CT":
                case "DR":
                case "MR":
                 case "MG":
                case "RF":
                    list[list.length] = args[i];
                    break;
            }
        }
        return list;
    }
}
function BePositiveConv(readOnly) {
    Form_SingleValueConv.apply(this);
    this.DecodeArguments = function (ele, args) {
        return args[0] + "";
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            ele.__currData = val
            switch (val) {
                case "true":
                    ele.innerText = "阳性";
                    ele.style.color = "red";
                    break;
                case "false":
                    ele.innerText = "阴性";
                    ele.style.color = "";
                    break;
                default:
                    ele.innerText = "待定";
                    ele.style.color = "";
                    break;
            }

            if (!readOnly && !ele.onclick) {
                ele.title = "点击切换";
                ele.style.cursor = "pointer";
                ele.onclick = function () {
                    if (!confirm("您是否确定要修改该病例的阴阳性？")) return;
                    var v = self.GetUIValue(ele);
                    switch (v) {
                        case "true":
                            ele.__currData = "false";
                            break;
                        case "false":
                            ele.__currData = "true";
                            break;
                        default:
                            ele.__currData = "false";
                            break;
                    }
                    changeFieldValue(ele);
                } 
            }
        }
    } (this);
    this.GetUIValue = function (ele) {
        return ele.__currData;
    }
}