//toJSONString待处理
//静态值Conv-ok
function StaticValueConv(val, toJSON) {
    Form_SingleValueConv.apply(this);
    this.GetValue = this.GetUIValue = function (ele) {
        if (toJSON) {
            return val ? val.toJSONString() : val;
        }
        else {
            return val;
        }
    }
}
//缓存值Conv-ok，只做数据缓存，不做显示
function CacheValueConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function () {
    }
    this.GetUIValue = this.GetValue;
}
//页签Conv-ok
function TabPageListConv(style) {//checked lml
    Form_ListValueConv.apply(this);

    if (!style) style = { 'item': 'item', 'selected': 'selected', 'unselected': 'unselected' };
    var currStyle = "{'selected':'" + style.selected + "','unselected':'" + style.unselected + "'}";
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "TabPageListConv.TabPageConv(" + currStyle + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.ApplyValue = function (self) {
        return function (ele, val) {
            var p = null;
            if (ele.children.length != 1) {
                ele.innerHTML = "";
                p = ele.ownerDocument.createElement("div");
                ele.appendChild(p);
            }
            else {
                p = ele.children[0];
            }
            var cnt = p.children.length;
            var len = val ? val.length : 0;
            for (var i = len; i < cnt; i++) {
                p.removeChild(p.children[len]);
            }
            for (var i = cnt; i < len; i++) {
                var e = document.createElement('div');
                e.onclick = function (ui) {
                    return function () {
                        p.__currData = ui.__currData;
                        changeFieldValue(p);
                    }
                } (e);
                p.appendChild(e);
            }
            self.InheritProperties(ele, p);

            var displayMember = p.getAttribute("displayMember");
            var j=len;
            for (var i = 0; i < len; i++) {
                var e = p.children[i];
                e.__currData = val[j-1];
                if (!self.DrawItem || !self.DrawItem(p, e, val, j-1)) Element(e).setText(val[j-1][displayMember]);

                css(e).Remove(style.selected);
                css(e).Remove(style.unselected);
                css(e).Add(style.item);
                j--;
            }
            // for (var i = 0; i < len; i++) {
            //     var e = p.children[i];
            //     e.__currData = val[i];
            //     if (!self.DrawItem || !self.DrawItem(p, e, val, i)) Element(e).setText(val[i][displayMember]);

            //     css(e).Remove(style.selected);
            //     css(e).Remove(style.unselected);
            //     css(e).Add(style.item);
            // }
        };
    } (this);

    this.DrawItem;

    TabPageListConv.TabPageConv = function (style) {
        Form_ListValueConv.ListItemValueConv.apply(this);
        this.CompareValues = function (val1, val2) {
            return -1;
        }
        this.ApplyValue = function (self) {
            return function (ele, val) {
                var curr = null;
                var valueMember = ele.getAttribute("valueMember");
                for (var i = 0; i < ele.children.length; i++) {
                    var e = ele.children[i];
                    var v = e.__currData ? e.__currData[valueMember] : null;
                    if (v == val) {
                        curr = e.__currData;
                        css(e).Remove(style.unselected);
                        css(e).Add(style.selected);
                    }
                    else {
                        css(e).Remove(style.selected);
                        css(e).Add(style.unselected);
                    }
                }
                ele.__currData = curr;
            }
        } (this);
        this.GetUIValue = function (ele) {
            var valueMember = ele.getAttribute("valueMember");
            return ele.__currData ? ele.__currData[valueMember] : null;
        }
    }
}
//下拉式多选列表Conv-ok
function CheckableListConv(style, maxSize, frontOnly) {
    Form_ListValueConv.apply(this);
    if (!style) style = { 'label': 'label',
        'text': 'text',
        'selectedLabel': 'selectedLabel',
        'selectedText': 'selectedText',
        'unselectedLabel': 'unselectedLabel',
        'unselectedText': 'unselectedText',
        'selectedItem': 'selectedItem',
        'unselectedItem': 'unselectedItem',
        'dropItem': 'dropItem',
        'menu': 'menu',
        'single': 'single',
        'first': 'first',
        'middle': 'middle',
        'last': 'last'
    };
    var itemStyle = "{'selectedLabel':'" + style.selectedLabel +
    "','selectedText': '" + style.selectedText +
    "','unselectedLabel': '" + style.unselectedLabel +
    "','unselectedText': '" + style.unselectedText +
    "','selectedItem': '" + style.selectedItem +
    "','unselectedItem': '" + style.unselectedItem +
    "'}";
    itemStyle.selectedLabel = style.selectedLabel;
    itemStyle.selectedText = style.selectedText;
    itemStyle.unselectedLabel = style.unselectedLabel;
    itemStyle.unselectedText = style.unselectedText;

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "CheckableListConv.DropItemConv(" + itemStyle + "," + (frontOnly ? 'true' : 'false') + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.ApplyValue = function (self) {
        return function (ele, val) {
            var displayMember = ele.getAttribute("displayMember");
            var valueMember = ele.getAttribute("valueMember");
            var menu = ele.__menu;
            if (!menu) {
                var root = document.createElement("div");
                var unhook = function () {
                    Event.UnhookMouseOut(root);
                }
                var mouseOutCall = function (relEle, currEle) {
                    return !menu.InnerElement(currEle);
                };
                var hook = function () {
                    Event.HookMouseOut(root, function (leave) {
                        if (leave) {
                            unhook();
                            menu.Fold();
                        }
                    }, mouseOutCall);
                }
                css(root).Add(style.dropItem);
                var spMenu = document.createElement("span");
                css(spMenu).Add("dropTexts");
                root.appendChild(spMenu);
                var spDrop = document.createElement("div");
                css(spDrop).Add("dropImage");
                root.appendChild(spDrop);
                ele.appendChild(root);

                self.InheritProperties(ele, spMenu);

                menu = ele.__menu = spMenu.__menu = new Menu(root, style, true);
                menu.DrawItem = function (parent, curr, total, index, ee) {
                    var span;
                    var lab;
                    var text;
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

                        var data = curr.GetData();
                        span.title = Element(text).setText(data[displayMember]);

                        ee.appendChild(span);
                    }
                    else {
                        span = ee.children[0];
                        lab = span.children[0];
                        text = span.children[1];

                        var data = curr.GetData();
                        span.title = Element(text).setText(data[displayMember]);
                    }
                    span.onclick = function (e) {
                        return function () {
                            curr.__changed = true;
                            curr.__selected = !curr.__selected;
                            if (!frontOnly) {
                                changeFieldValue(spMenu);
                            }
                            else {
                                var conv = new Form(spMenu).GetConverter(spMenu);
                                if (conv) conv.SetValue(spMenu, [conv.GetUIValue(spMenu)]);
                            }
                        };
                    } (span);


                    var item = curr;
                    var e = span;
                    if (item.__selected) {
                        css(e).Remove(style.unselectedItem);
                        css(e).Add(style.selectedItem);
                        //                  Element(lab).setText("■");
                        css(lab).Remove(style.unselectedLabel);
                        css(lab).Add(style.selectedLabel);
                        css(text).Remove(style.unselectedText);
                        css(text).Add(style.selectedText);
                    }
                    else {
                        css(e).Remove(style.selectedItem);
                        css(e).Add(style.unselectedItem);
                        //                    Element(lab).setText("□ ");
                        css(lab).Remove(style.selectedLabel);
                        css(lab).Add(style.unselectedLabel);
                        css(text).Remove(style.selectedText);
                        css(text).Add(style.unselectedText);
                    }
                    curr.__changed = false;
                    return true;
                };
                ele.onclick = function () {
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
                    }
                    else {
                        unhook();
                        menu.Fold();
                    }
                }
            }
            menu.Fold();
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
            for (var i = cnt; i > notEquals; ) {
                items.RemoveAt(--i);
            }
            for (var i = notEquals; i < len; i++) {
                items.Add(val[i]);
            }
        }
    } (this);
    CheckableListConv.DropItemConv = function (style, frontOnly) {
        Form_ListValueConv.ListItemValueConv.apply(this);
        this.ApplyValue = function (ele, val) {
            var menu = ele.__menu;
            var result = [];
            var valueMember = ele.getAttribute("valueMember");
            var len = !val || !val.length ? 0 : val.length;
            var items = menu.Items();
            var cnt = items.Count();
            var change = false;
            for (var i = 0; i < cnt; i++) {
                var item = items.ItemAt(i);
                var f = item.__selected ? true : false;
                var data = item.GetData();
                var curr = data[valueMember];
                var flag = false;
                for (var j = 0; j < len; j++) {
                    if (curr == val[j]) {
                        result[result.length] = data;
                        flag = true;
                        break;
                    }
                }
                if (f != flag) item.__changed = true;
                item.__selected = flag;
                if (item.__changed) {
                    change = true;
                    item.Refresh();
                }
            }
            if (change && !menu.Unfolded()) menu.Fold(true);

            if (result.length < 1) {
                ele.innerHTML = "";
                ele.title = "-未选择-";
            }
            else {
                var displayMember = ele.getAttribute("displayMember");
                var s = result[0][displayMember];
                for (var i = 1; i < result.length; i++) {
                    s += "+" + result[i][displayMember];
                }
                ele.title = Element(ele).setText(s);
            }
        }
        this.GetUIValue = function (self) {
            return function (ele) {
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
        } (this);
    }
}
//只读列表Conv-ok
function ReadOnlyListConv(obj, multi) {
    Form_ListValueConv.apply(this);
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "ReadOnlyListConv.ReadOnlyListItemConv(" + (obj ? "true" : "false") + "," + (multi ? "true" : "false") + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.ApplyValue = function (self) {
        return function (ele, val) {
            var span = null;
            if (ele.children.length != 1) {
                span = document.createElement("SPAN");
                self.InheritProperties(ele, span);
                ele.appendChild(span);
            }
            else {
                span = ele.children[0];
            }
            span.innerHTML = "";
        }
    } (this);
    ReadOnlyListConv.ReadOnlyListItemConv = function (obj, multi) {
        if (multi) {
            Form_ListValueConv.apply(this)
        } else {
            Form_SingleValueConv.apply(this);
        }
        this.CompareValues = function (val1, val2) {
            return -1;
        }
        this.ApplyValue = function (ele, val) {
            if (multi) {
                var v = val && val[0] ? val[0] : [];
                ele.innerHTML = "";
                var valueMember = ele.getAttribute("valueMember");
                ele.__currData = [];
                for (var i = 0; i < v.length; i++) {
                    val = v[i];
                    if (obj) {
                        ele.__currData[ele.__currData.length] = val;
                    } else {
                        ele.__currData[ele.__currData.length] = val ? val[valueMember] : val;
                    }
                }
                var listData = ele.parentNode.__bindedData;
                if (listData) {
                    ele.__currData = [];
                    var l = [];
                    for (var i = 0; i < v.length; i++) {
                        val = v[i];
                        if (!val) continue;
                        var displayMember = ele.getAttribute("displayMember");
                        for (var j = 0; j < listData.length; j++) {
                            var curr = listData[j];
                            if (obj) {
                                if (curr[valueMember] == val[valueMember]) {
                                    l[l.length] = curr[displayMember] ? curr[displayMember] : val[displayMember];
                                    ele.__currData[ele.__currData.length] = curr;
                                    break;
                                }
                            } else {
                                if (curr[valueMember] == val) {
                                    l[l.length] = curr[displayMember] ? curr[displayMember] : val;
                                    ele.__currData[ele.__currData.length] = curr[valueMember];
                                    break;
                                }
                            }
                        }
                    }
                    if (l.length > 0) {
                        ele.innerHTML = l[0];
                        for (var i = 1; i < l.length; i++) {
                            ele.innerHTML += "," + l[i];
                        }
                    }
                }
            }
            else {
                ele.innerHTML = "";
                var valueMember = ele.getAttribute("valueMember");
                if (obj) {
                    ele.__currData = val;
                } else {
                    ele.__currData = val ? val[valueMember] : val;
                }
                if (!val) return;
                var listData = ele.parentNode.__bindedData;
                if (listData) {
                    var displayMember = ele.getAttribute("displayMember");
                    for (var i = 0; i < listData.length; i++) {
                        var curr = listData[i];
                        if (obj) {
                            if (curr[valueMember] == val[valueMember]) {
                                ele.innerHTML = curr[displayMember] ? curr[displayMember] : val[displayMember];
                                ele.__currData = curr;
                                break;
                            }
                        } else {
                            if (curr[valueMember] == val) {
                                ele.innerHTML = curr[displayMember] ? curr[displayMember] : val;
                                ele.__currData = curr[valueMember];
                                break;
                            }
                        }
                    }
                }
		if (ele.innerHTML == "") {
                    var displayMember = ele.getAttribute("displayMember");
                    if (displayMember && val[displayMember]) ele.innerHTML = val[displayMember];
                }
            }
        }
        this.GetUIValue = function (self) {
            return function (ele) {
                return ele.__currData;
            }
        } (this);
    }
}
function html2Text(html) {
    if (!html) return html;
    var text = html;
    var find = true;
    while (find) {
        switch (text.substr(0, 1)) {
            case ' ':
            case '\n':
            case '\t':
            case '\r':
                text = text.substring(1);
                break;
            default:
                find = false;
                break;
        }
    }
    var ele = document.createElement("SPAN");
    ele.innerHTML = text;
    var needTran=text.indexOf("&nbsp;")>=0;
    if(!needTran)needTran=ele.childNodes.length > 0 && ele.childNodes[0].nodeType == 1;
    if (needTran) {
        return getInnerText(ele);
    }
    else {
        return html;
    }
}
function getInnerText(ele, handlers,preEle) {
    if (ele.style && getStyle(ele, "display") == "none") return "";
    if (!handlers) {
        handlers = {}
        handlers["A"] = handlers["SPAN"] = handlers["P"] = handlers["DIV"] = function (ele) {
            var text = "";
            if (ele.childNodes.length < 1) {
                text = Element(ele).getText();
            }
            else {
                for (var i = 0; i < ele.childNodes.length; i++) {
                    text += getInnerText(ele.childNodes[i], handlers,ele.childNodes[i-1]);
                }
            }
            if (getStyle(ele, "display") == "block" || getStyle(ele, "display") == "table") {
                if(preEle && (getStyle(preEle, "display") == "block" || getStyle(preEle, "display") == "table")){
                    return text + "\r\n";
                }
                else{
                    return "\r\n" + text + "\r\n";
                }
            }
            else {
                return text;
            }
        };
        handlers["BR"] = function (ele) {
            return "\r\n";
        };
        handlers["TEXTAREA"] = handlers["INPUT"] = function (ele) {
            var text = ele.value;
            if (getStyle(ele, "display") == "block" || getStyle(ele, "display") == "table") {
                if(preEle && (getStyle(preEle, "display") == "block" || getStyle(preEle, "display") == "table")){
                    return text + "\r\n";
                }
                else{
                    return "\r\n" + text + "\r\n";
                }
            }
            else {
                return text;
            }
        };
        handlers["SELECT"] = function (ele) {
            var text = "";
            for (var i = 0; i < ele.options.length; i++) {
                if (ele.options[i].selected) {
                    text = ele.options[i].value;
                    break;
                }
                else {
                    text += i == 0 ? ele.options[i].value : "|" + ele.options[i].value;
                }
            }
            if (getStyle(ele, "display") == "block" || getStyle(ele, "display") == "table") {
                if(preEle && (getStyle(preEle, "display") == "block" || getStyle(preEle, "display") == "table")){
                    return text + "\r\n";
                }
                else{
                    return "\r\n" + text + "\r\n";
                }
            }
            else {
                return text;
            }
        };
        handlers["IMG"] = function (ele) {
            return ele.src;
        };
        handlers["TABLE"] = function (ele) {
            var text = "";
            var tbody = ele.children[0];
            if (tbody && tbody.children) {
                for (var i = 0; i < tbody.children.length; i++) {
                    for (var j = 0; j < tbody.children[i].children.length; j++) {
                        if (j == 0) {
                            text += getInnerText(tbody.children[i].children[j], handlers);
                        }
                        else {
                            text += "\t" + getInnerText(tbody.children[i].children[j], handlers);
                        }
                    }
                    if (i != tbody.children.length - 1) text += '\r\n';
                }
            }
            if (getStyle(ele, "display") == "block" || getStyle(ele, "display") == "table") {
                if(preEle && (getStyle(preEle, "display") == "block" || getStyle(preEle, "display") == "table")){
                    return text + "\r\n";
                }
                else{
                    return "\r\n" + text + "\r\n";
                }
            }
            else {
                return text;
            }
        };
        handlers["TD"] = function (ele) {
            var text = "";
            if (ele.childNodes.length < 1) {
                text = Element(ele).getText();
            }
            else {
                for (var i = 0; i < ele.childNodes.length; i++) {
                    text += getInnerText(ele.childNodes[i], handlers,ele.childNodes[i-1]);
                }
            }
            if (ele.getAttribute("colspan")) {
                var cs = parseInt(ele.getAttribute("colspan"), 10);
                for (var i = 1; i < cs; i++) {
                    text += "\t";
                }
            }
            return text;
        };
        return getInnerText(ele, handlers);
    }
    else {
        return handlers[ele.nodeName] ? handlers[ele.nodeName](ele) : Element(ele).getText();
    }
    function getStyle(ele, name) {
        if (ele.currentStyle) {
            return ele.currentStyle[name];
        }
        else {
            return getComputedStyle(ele, false)[name];
        }
    }
} 
//富文本Conv-ok
function RichTextValueConv(url, style) {
    Form_SingleValueConv.apply(this);
    this.CompareValues = function (val1, val2) {
        return -1;
    }
    this.GetUIValue = function (ele) {
        return Element(ele).getText();
    }
    this.DecodeArguments = function (ele, args) {
        registerInsertFunc(ele);
        return html2Text(args[0]);
    }
    this.ApplyValue = function (ele, args) {
        ele.__cacheValue = Element(ele).setText(args);
        ele.__changing = false;
    }
    function registerInsertFunc(ele) {
        RichTextValueConv.__insertElement = ele;
        var insertSpecialchar = function (formID, char, mode) {
            if (RichTextValueConv.__insertElement) RichTextValueConv.__insertElement.insertText(formID, char, mode);
        };
        formCallCenter.UnregisterEvent("insertSpecialchar");
        formCallCenter.RegisterEvent("insertSpecialchar", insertSpecialchar);

        var insertExamParams = function (formID, char, mode) {
            if (RichTextValueConv.__insertElement) RichTextValueConv.__insertElement.insertText(formID, char, mode);
        };
        formCallCenter.UnregisterEvent("insertExamParams");
        formCallCenter.RegisterEvent("insertExamParams", insertExamParams);

        var insertDiagTermName = "insertDiagTerm_" + ele.getAttribute("field");
        RichTextValueConv["__" + insertDiagTermName + "Element"] = ele;
        var insertDiagTermFuncDef = "var " + insertDiagTermName + "=function(formID,term,mode){if (RichTextValueConv.__" + insertDiagTermName + "Element) RichTextValueConv.__" + insertDiagTermName + "Element.insertText(formID,term,mode);}";
        eval(insertDiagTermFuncDef);

        var insertDiagTermFunc = eval(insertDiagTermName);
        formCallCenter.UnregisterEvent(insertDiagTermName);
        formCallCenter.RegisterEvent(insertDiagTermName, insertDiagTermFunc);
        ele.insertText = function (formID, text, mode) {
            try {
                switch (mode) {
                    case "Append":
                        Element(ele).setText(Element(ele).getText() + html2Text(text));
                        ele.__changing = false;
                        changeFieldValue(ele);
                        break;
                    case "Insert":
                        Element(ele).setText(Element(ele).getText() + html2Text(text));
                        ele.__changing = false;
                        changeFieldValue(ele);
                        break;
                    case "Replace":
                        ele.__changing = false;
                        var form = formCallCenter.GetFormByID(formID);
                        if (form) form.SetField(ele.getAttribute("field"), [html2Text(text)], true);
                        break;
                }
            }
            catch (err) { }
        }
    }   
} 
function RichTextValueConv_bak(url, style) {
    Form_SingleValueConv.apply(this);
    this.CompareValues = function (val1, val2) {
        return -1;
    }
    this.GetUIValue = function (ele) {
        return ele.getText();
    }
    this.ApplyValue = function (ele, val) {
        var doc = ele.ownerDocument;
        if (!ele.__conv__init) {
            ele.__conv__init = true;
            var iframe = doc.createElement("iframe");
            iframe.checkChange = function () { };
            var divTool = document.createElement("div");
            divTool.style.textAlign = "right";
            ele.appendChild(divTool);
            var btnB = doc.createElement("input");
            btnB.type = "button";
            btnB.title = "加粗";
            btnB.value = "B";
            btnB.style.border = "0px";
            btnB.style.fontWeight = "bold";
            btnB.onclick = function () {
                iframe.contentWindow.document.execCommand('Bold');
                iframe.checkChange(true);
            };
            divTool.appendChild(btnB);
            var btnI = doc.createElement("input");

            btnI.type = "button";
            btnI.title = "斜体";
            btnI.value = "I";
            btnI.style.border = "0px";
            btnI.style.fontStyle = "italic";
            btnI.onclick = function () {
                iframe.contentWindow.document.execCommand('Italic');
                iframe.checkChange(true);
            };
            divTool.appendChild(btnI);

            var btnU = doc.createElement("input");
            btnU.type = "button";
            btnU.title = "下划线";
            btnU.value = "U";
            btnU.style.border = "0px";
            btnU.style.textDecoration = "underline";
            btnU.onclick = function () {
                iframe.contentWindow.document.execCommand('Underline');
                iframe.checkChange(true);
            };
            divTool.appendChild(btnU);

            var btnD = doc.createElement("input");
            btnD.type = "button";
            btnD.title = "删除线";
            btnD.value = "abc";
            btnD.style.border = "0px";
            btnD.style.textDecoration = "line-through";
            btnD.onclick = function () {
                iframe.contentWindow.document.execCommand('StrikeThrough');
                iframe.checkChange(true);
            };
            divTool.appendChild(btnD);

            function loadMenu(menuList, action, style) {
                var root = doc.createElement("span");
                divTool.appendChild(root);
                css(root).Add(style.curr);

                var def = doc.createElement("input");
                def.type = "button";
                Element(def).setText(menuList[0].Text);
                def.style.border = "0px";
                css(def).Add(menuList[0].Class);
                root.appendChild(def);

                var menu = doc.createElement("ul");
                css(menu).Add(style.menu);
                menu.style.display = "none";
                var unhook = function () {
                    Event.UnhookMouseOut(root);
                }
                var hook = function () {
                    Event.HookMouseOut(root, function (leave) {
                        if (leave) {
                            unhook();
                            menu.style.display = "none";
                        }
                    })
                }
                root.appendChild(menu);

                for (var i = 0; i < menuList.length; i++) {
                    var item = doc.createElement("li");
                    menu.appendChild(item);
                    item.innerHTML = menuList[i].Text;
                    css(item).Add(menuList[i].Class);
                }
                root.onmouseover = function () {
                    menu.style.display = "";
                    hook();
                }
                for (var i = 0; i < menu.children.length; i++) {
                    var li = menu.children[i];
                    var btn = doc.createElement("input");
                    btn.type = "button";
                    btn.value = menu.children[i].innerHTML;
                    btn.style.border = "0px";
                    btn.style.width = "100%";
                    css(btn).Add(li.className);
                    li.innerHTML = "";
                    li.appendChild(btn);
                    btn.onclick = function (b, li, data) {
                        return function () {
                            action(data);
                            Element(def).setText(li.children[0].value);
                            def.className = li.className;
                            menu.style.display = "none";
                            def.onclick = b.onclick;
                        }
                    } (btn, menu.children[i], menuList[i]);
                    if (i == 0) def.onclick = btn.onclick;
                }
            }
            var list = [
            { 'Text': '黑',
                'Class': 'Black'
            },
            { 'Text': '红',
                'Class': 'Red'
            },
            { 'Text': '蓝',
                'Class': 'Blue'
            }];
            var func = function (d) {
                iframe.contentWindow.document.execCommand('ForeColor', '', d.Class);
                iframe.checkChange(true);
            };
            var style = { 'curr': 'currColor',
                'menu': 'Menu'
            };
            loadMenu(list, func, style);

            list = [
            { 'Text': '七号',
                'Class': 'Font',
                'Size': 1.94
            },
            { 'Text': '六号',
                'Class': 'Font',
                'Size': 2.812
            },
            { 'Text': '五号',
                'Class': 'Font',
                'Size': 3.690
            },
            { 'Text': '四号',
                'Class': 'Font',
                'Size': 4.920
            },
            { 'Text': '三号',
                'Class': 'Font',
                'Size': 5.623
            }];
            func = function (d) {
                iframe.contentWindow.document.execCommand('fontsize', '', d.Size);
                iframe.checkChange(true);
            }
            style = { 'curr': 'currFont',
                'menu': 'Menu'
            };
            loadMenu(list, func, style);

            var divBody = doc.createElement("div");
            ele.style.position = "relative";
            ele.appendChild(divBody);
            divBody.style.position = "absolute";
            divBody.style.left = "0px";
            divBody.style.right = "4px";
            divBody.style.top = "20px";
            divBody.style.bottom = "2px";

            divBody.appendChild(iframe);
            iframe.className = "inputItemText";
            iframe.frameborder = "no";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.value = "12pt";
            iframe.src = url;
            iframe.onload = iframe.onreadystatechange = function (ifr, e) {
                var wnd = ifr.contentWindow;
                var TempFunction = function () {
                    if (this.readyState && this.readyState != 'complete') return;

                    function insertDataFunc() {
                        var insertSpecialchar = function (formID, char, mode) {
                            if (selection) selection.insertText(formID, char, mode);
                        };
                        formCallCenter.UnregisterEvent("insertSpecialchar");
                        formCallCenter.RegisterEvent("insertSpecialchar", insertSpecialchar);

                        var insertExamParams = function (formID, char, mode) {
                            if (selection) selection.insertText(formID, char, mode);
                        };
                        formCallCenter.UnregisterEvent("insertExamParams");
                        formCallCenter.RegisterEvent("insertExamParams", insertExamParams);

                        var insertDiagTermName = "insertDiagTerm_" + ele.getAttribute("field");
                        var insertDiagTermFuncDef = "var " + insertDiagTermName + "=function(formID,term,mode){if (selection) selection.insertText(formID,term,mode);}";
                        eval(insertDiagTermFuncDef);

                        var insertDiagTermFunc = eval(insertDiagTermName);
                        formCallCenter.UnregisterEvent(insertDiagTermName);
                        formCallCenter.RegisterEvent(insertDiagTermName, insertDiagTermFunc);
                    }
                    var InitCacheSelection = new function () {
                        insertDataFunc();
                        cacheSelection();
                    };
                    wnd.document.body.onclick = function () {
                        insertDataFunc();
                        checkChange(false);
                    };
                    wnd.document.body.onkeyup = function () {
                        if (Event().KeyCode() == CaptureKeyCode) {
                            checkChange(true);
                        }
                        else {
                            checkChange(false);
                        }
                        cacheSelection();
                    };
                    wnd.document.body.onblur = function () {
                        checkChange(true);
                    };
                    wnd.document.body.onmouseup = function () {
                        cacheSelection();
                    };
                    var selection;
                    function cacheSelection() {
                        //ie11
                        selection = new function (range, node, offset) {
                            this.insertText = function (formID, text, mode) {
                                try {
                                    switch (mode) {
                                        case "Append":
                                            var e = wnd.document.createElement("span");
                                            e.innerHTML = text;
                                            wnd.document.body.appendChild(e);
                                            if (range) range.setStartAfter(e);
                                            checkChange(true);
                                            break;
                                        case "Insert":
                                            try {
                                                if (range) {
                                                    var e = wnd.document.createElement("span");
                                                    e.innerHTML = text;
                                                    range.insertNode(e);
                                                    range.setStartAfter(e);
                                                }
                                                else {
                                                    node.insertData(offset, text);
                                                }
                                            } catch (error) {
                                                var e = wnd.document.createElement("span");
                                                e.innerHTML = text;
                                                wnd.document.body.appendChild(e);
                                                if (range) range.setStartAfter(e);
                                            }
                                            checkChange(true);
                                            break;
                                        case "Replace":
                                            var form = formCallCenter.GetFormByID(formID);
                                            if (form) {
                                                form.SetField(ele.getAttribute("field"), [text], true);
                                                if (range) range.setStartAfter(wnd.document.body.lastChild);
                                            }
                                            break;
                                    }
                                }
                                catch (err) { } //{ alert(err.Description) }
                            }
                        } (wnd.document.getSelection().rangeCount > 0 ? wnd.document.getSelection().getRangeAt(0) : null, wnd.document.getSelection().anchorNode, wnd.document.getSelection().anchorOffset);
                        //...实现insertText
                    }
                    function checkChange(force) {
                        var oldValue = ifr.__currHTML__;
                        if (wnd.document.body.innerText.length < 2) ele.setText(getInnerHTML(wnd.document));
                        var newValue = getInnerHTML(wnd.document);
                        var reg = /^(<[bB][rR]>)+|(<[bB][rR]>)+$|^(\n)+|(\n)+$/g;
                        if (oldValue) {
                            try {
                                while (true) {
                                    var v = oldValue.replace(reg, "");
                                    if (v == oldValue) break;
                                    oldValue = v;
                                }
                            }
                            catch (err) {
                            }
                        }
                        if (newValue) {
                            try {
                                while (true) {
                                    var v = newValue.replace(reg, "");
                                    if (v == newValue) break;
                                    newValue = v;
                                    changed = true;
                                }
                            }
                            catch (err) {
                            }
                        }
                        if (oldValue == newValue) return; //防止鼠标点击时因为<br>等造成的伪修改
                        changeFieldValue(e);
                    }
                    iframe.checkChange = checkChange;
                    var eventHandler = function () {
                        checkChange(true);
                        Wnd(e).UnregisterEvent(wnd, 'beforeunload', arguments.callee);
                    };
                    Wnd(e).RegisterEvent(wnd, 'beforeunload', eventHandler);

                    if (iframe.__currHTML__) e.setText(iframe.__currHTML__);
                };
                TempFunction.InitCacheSelection;
                return TempFunction;
            } (iframe, ele);

            ele.setText = function (text) {
                text = getHTML(text);
                if (iframe.contentWindow.document.body) {
                    if (iframe.contentWindow.document.body.innerHTML != text)//不作此判断，会造成无法录入换行(设置造成)
                    {
                        iframe.contentWindow.document.body.innerHTML = text;
                        iframe.contentWindow.document.body.innerHTML = text = getInnerHTML(iframe.contentWindow.document);
                    }
                }
                iframe.__currHTML__ = text;
            };
            ele.getText = function () {
                var html = "";
                if (iframe.contentWindow.document.body) {
                    html = getInnerHTML(iframe.contentWindow.document);
                }
                else {
                    html = iframe.__currHTML__;
                }
                return html;
            }
            function getHTML(html) {
                return html;
            }
        }
        ele.setText(val);
    }
    function getInnerHTML(doc) {
        removeBlank(doc.body);
        return doc.body.innerHTML;
    }
    function removeBlank(ele) {
        for (var i = ele.children.length - 1; i > -1; i--) {
            var e = ele.children[i];
            if (e.tagName == "FONT") {
                var txt = Element(e).getText();
                if (txt) {
                    var reg = /^(\n)+|(\n)+$/g;
                    try {
                        while (true) {
                            var v = txt.replace(reg, "");
                            if (v == txt) break;
                            txt = v;
                        }
                    }
                    catch (err) {
                    }
                }
                if (txt == "" || !txt) {
                    ele.removeChild(e);
                }
            }
            else {
                removeBlank(e);
            }
        }
    }
}
//只读富文本Conv-ok
function ReadOnlyRichTextValueConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (ele, val) {
        Element(ele).setText(html2Text(val));
        removeUL(ele);
    }
    function removeUL(ele) {
        ele.setAttribute('class', 'removeUL');
        ele.onclick = null;
        ele.onmouseover = null;
        ele.onmouseout = null;
        for (var i = ele.children.length - 1; i > -1; i--) {

            if (ele.children[i].tagName == "SELECT") {
                var text = "";
                for (var j = ele.children[i].length - 1; j > -1; j--) {
                    if (ele.children[i].children[j].selected) {
                        text = ele.children[i].children[j].value;
                    }
                }

                ele.children[i].parentNode.innerHTML = html2Text(text);
                //ele.removeChild(ele.children[i]);
            }
            else {
                removeUL(ele.children[i]);
            }
        }
    }
    this.GetUIValue = this.GetValue;
}
//只读富文本Conv-ok
function ReadOnlyRichTextValueConv_bak() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (ele, val) {
        ele.innerHTML = val;
        removeUL(ele);
    }
    function removeUL(ele) {
        ele.setAttribute('class', 'removeUL');
        ele.onclick = null;
        ele.onmouseover = null;
        ele.onmouseout = null;
        for (var i = ele.children.length - 1; i > -1; i--) {

            if (ele.children[i].tagName == "SELECT") {
                var text = "";
                for (var j = ele.children[i].length - 1; j > -1; j--) {
                    if (ele.children[i].children[j].selected) {
                        text = ele.children[i].children[j].value;
                    }
                }

                ele.children[i].parentNode.innerHTML = text;
                //ele.removeChild(ele.children[i]);
            }
            else {
                removeUL(ele.children[i]);
            }
        }
    }
    this.GetUIValue = this.GetValue;
}
//平铺式多选列表Conv-ok
function TileCheckListConv(style, frontOnly) {
    Form_ListValueConv.apply(this);
    if (!style) style = { 'unselectedItem': 'unselectedItem', 'selectedItem': 'selectedItem', 'unselectedLabel': 'unselectedLabels', 'selectedLabel': 'selectedLabels', 'unselectedText': 'unselectedText', 'selectedText': 'selectedText' };
    var itemStyle = "{ 'unselectedItem': '" + style.unselectedItem + "', 'selectedItem': '" + style.selectedItem + "', 'unselectedLabel': '" + style.unselectedLabel + "', 'selectedLabel': '" + style.selectedLabel + "', 'unselectedText': '" + style.unselectedText + "', 'selectedText': '" + style.selectedText + "' }";

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "TileCheckListConv.TileCheckListItemConv(" + itemStyle + "," + (frontOnly ? 'true' : 'false') + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.ApplyValue = function (self) {
        return function (ele, val) {
            var p = null;
            if (ele.children.length != 1) {
                ele.innerHTML = "";
                p = document.createElement("div");
                ele.appendChild(p);
            }
            else {
                p = ele.children[0];
            }
            var cnt = p.children.length;
            var len = val ? val.length : 0;
            for (var i = len; i < cnt; i++) {
                p.removeChild(p.children[len]);
            }
            for (var i = cnt; i < len; i++) {
                var e = document.createElement('span');
                e.onclick = function (ui) {
                    return function () {
                        ui.__selected = !ui.__selected;
                        if (!frontOnly) {
                            changeFieldValue(p);
                        }
                        else {
                            var conv = new Form(p).GetConverter(p);
                            if (conv) conv.SetValue(p, [conv.GetUIValue(p)]);
                        }
                    };
                } (e);
                var lab = document.createElement("span");
                var text = document.createElement("span");
                e.appendChild(lab);
                e.appendChild(text);
                p.appendChild(e);
            }
            self.InheritProperties(ele, p);

            var displayMember = ele.getAttribute("displayMember");
            for (var i = 0; i < len; i++) {
                var span = p.children[i];
                span.__currData = val[i];
                var lab = span.children[0];
                var text = span.children[1];
                span.title = Element(text).setText(val[i][displayMember]);
                setStyle(style, span, lab, text, span.__selected);
            }
        }
    } (this);
    function setStyle(style, span, label, text, selected) {
        if (selected) {
            //           Element(label).setText('■ ');
            css(span).Remove(style.unselectedItem);
            css(span).Add(style.selectedItem);
            css(label).Remove(style.unselectedLabel);
            css(label).Add(style.selectedLabel);
            css(text).Remove(style.unselectedText);
            css(text).Add(style.selectedText);
        }
        else {
            //          Element(label).setText('□ ');
            css(span).Remove(style.selectedItem);
            css(span).Add(style.unselectedItem);
            css(label).Remove(style.selectedLabel);
            css(label).Add(style.unselectedLabel);
            css(text).Remove(style.selectedText);
            css(text).Add(style.unselectedText);
        }
    }
    TileCheckListConv.TileCheckListItemConv = function (style, frontOnly) {
        Form_SingleValueConv.apply(this);
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            var len = !val || !val.length ? 0 : val.length;
            for (var i = 0; i < ele.children.length; i++) {
                var e = ele.children[i];
                var curr = e.__currData[valueMember];
                var flag = false;
                for (var j = 0; j < len; j++) {
                    if (curr == val[j]) {
                        flag = true;
                        break;
                    }
                }
                e.__selected = flag;
                var label = e.children[0];
                var text = e.children[1];
                setStyle(style, e, label, text, e.__selected);
            }
        }
        this.GetUIValue = function (self) {
            return function (ele) {
                var val = [];
                var valueMember = ele.getAttribute("valueMember");
                for (var i = 0; i < ele.children.length; i++) {
                    var e = ele.children[i];
                    if (e.__selected) val[val.length] = e.__currData[valueMember];
                }
                return val;
            }
        } (this);
    }
}
//平铺式单选列表Conv-ok
function TileListConv(style, frontOnly) {
    Form_ListValueConv.apply(this);
    if (!style) style = { 'unselectedItem': 'unselectedItem', 'selectedItem': 'selectedItem', 'unselectedLabel': 'unselectedLabel', 'selectedLabel': 'selectedLabel', 'unselectedText': 'unselectedText', 'selectedText': 'selectedText' };
    var itemStyle = "{ 'unselectedItem': '" + style.unselectedItem + "', 'selectedItem': '" + style.selectedItem + "', 'unselectedLabel': '" + style.unselectedLabel + "', 'selectedLabel': '" + style.selectedLabel + "', 'unselectedText': '" + style.unselectedText + "', 'selectedText': '" + style.selectedText + "' }";

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "TileListConv.TileListItemConv(" + itemStyle + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.ApplyValue = function (self) {
        return function (ele, val) {
            var p = null;
            if (ele.children.length != 1) {
                ele.innerHTML = "";
                p = document.createElement("div");
                ele.appendChild(p);
            }
            else {
                p = ele.children[0];
            }
            var cnt = p.children.length;
            var len = val ? val.length : 0;
            for (var i = len; i < cnt; i++) {
                p.removeChild(p.children[len]);
            }
            for (var i = cnt; i < len; i++) {
                var e = document.createElement('span');
                e.onclick = function (ui) {
                    return function () {
                        p.__currData = ui.__currData;
                        if (!frontOnly) {
                            changeFieldValue(p);
                        }
                        else {
                            var conv = new Form(p).GetConverter(p);
                            if (conv) conv.SetValue(p, [conv.GetUIValue(p)]);
                        }
                    };
                } (e);
                var lab = document.createElement("span");
                var text = document.createElement("span");
                e.appendChild(lab);
                e.appendChild(text);
                p.appendChild(e);
            }

            self.InheritProperties(ele, p);

            var displayMember = ele.getAttribute("displayMember");
            for (var i = 0; i < len; i++) {
                var span = p.children[i];
                span.__currData = val[i];
                var lab = span.children[0];
                var text = span.children[1];
                span.title = Element(text).setText(val[i][displayMember]);
                setStyle(style, span, lab, text, false);
            }
        }
    } (this);
    function setStyle(style, span, label, text, selected) {
        if (selected) {
            //          Element(label).setText('◆ ');
            css(span).Remove(style.unselectedItem);
            css(span).Add(style.selectedItem);
            css(label).Remove(style.unselectedLabel);
            css(label).Add(style.selectedLabel);
            css(text).Remove(style.unselectedText);
            css(text).Add(style.selectedText);
        }
        else {
            //          Element(label).setText('◇ ');
            css(span).Remove(style.selectedItem);
            css(span).Add(style.unselectedItem);
            css(label).Remove(style.selectedLabel);
            css(label).Add(style.unselectedLabel);
            css(text).Remove(style.selectedText);
            css(text).Add(style.unselectedText);
        }
    }
    TileListConv.TileListItemConv = function (style) {
        Form_SingleValueConv.apply(this);
        this.CompareValues = function (val1, val2) {
            return -1;
        }
        this.ApplyValue = function (ele, val) {
            var curr = null;
            var valueMember = ele.getAttribute("valueMember");
            for (var i = 0; i < ele.children.length; i++) {
                var e = ele.children[i];
                var v = e.__currData ? e.__currData[valueMember] : null;
                if (v == val) curr = e.__currData;

                var label = e.children[0];
                var text = e.children[1];
                setStyle(style, e, label, text, v == val);
            }
            ele.__currData = curr;
        }
        this.GetUIValue = function (self) {
            return function (ele) {
                var valueMember = ele.getAttribute("valueMember");
                return ele.__currData ? ele.__currData[valueMember] : null;
            }
        } (this);
    }
}

function UIElementBoundsConv(e, bound, offset) {
    Form_SingleValueConv.apply(this);
    this.GetValue = function (ele) {
        switch (bound) {
            case 'x':
                var l = offset;
                while (e) {
                    l += e.offsetLeft - e.scrollLeft;
                    e = e.offsetParent;
                }
                return l;
            case 'y':
                var t = offset;
                while (e) {
                    t += e.offsetTop - e.scrollTop;
                    e = e.offsetParent;
                }
                return t;
            case 'width':
                return e.offsetWidth + offset;
            case 'height':
                return e.offsetHeight + offset;
        }
    }
}


////键值对集合Conv
function KeyDataSetConv() {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var form = new Form(ele);
            var parameters = eval(ele.getAttribute('parameters'));
            for (var i = 0; i < parameters.length; i++) {
                var e = document.getElementById(parameters[i].id);
                var conv = form.GetConverter(e);
                if (val && val[parameters[i].name]) {
                    conv.SetValue(e, [val[parameters[i].name]]);
                }
                else {
                    conv.SetValue(e, [""]);
                }
            }
        }
    } (this);
    this.GetUIValue = function (self) {
        return function (ele) {
            var form = new Form(e);
            var parameters = eval(ele.getAttribute('parameters'));
            var result = {};
            for (var i = 0; i < parameters.length; i++) {
                var e = document.getElementById(parameters[i].id);
                var conv = form.GetConverter(e);
                result[parameters[i].name] = conv.GetUIValue(e);
            }
            return result.toJSONString();
        }
    } (this);
}
//下拉式单选列表Conv-ok
function DropDownInputConv(style, maxSize, filter, currNotObject, readOnly) {
    //filter:下拉列表过滤器，为非function表示不过滤
    //currNotObject:选项数据是否非value-display对象
    //readOnly:是否不可手工录入
    Form_ListValueConv.apply(this);
    if (!style) style = { 'menu': 'menu', 'dropItem': 'dropItem', 'single': 'single', 'first': 'first', 'middle': 'middle', 'last': 'last' };
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";
        Form.SetAttribute(desElement, "conv", "DropDownInputConv.DropDownInputItemConv(" + itemStyle + "," + currNotObject + "," + readOnly + ")", true);
        inheritProperties_base(srcElement, desElement);
    }
    this.DecodeArguments = function (ele, args) {
        //统一数据格式为value-display对象
        if (!args) return args;
        var valueMember = ele.getAttribute("valueMember");
        var displayMember = ele.getAttribute("displayMember");
        var inputMember = ele.getAttribute("inputMember");

        if (!valueMember) valueMember = "__valueMember";
        if (!displayMember) displayMember = "__displayMember";
        if (!inputMember) inputMember = "__inputMember";

        var list = [];
        for (var i = 0; i < args.length; i++) {
            var item = args[i];
            list[i] = {};
            list[i][valueMember] = item && typeof item[valueMember] != 'undefined' ? item[valueMember] : item;
            list[i][displayMember] = item && typeof item[displayMember] != 'undefined' ? item[displayMember] : item;
            list[i][inputMember] = item && typeof item[inputMember] != 'undefined' ? item[inputMember] : item;
        }
        return list;
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            var displayMember = ele.getAttribute("displayMember");
            var inputMember = ele.getAttribute("inputMember");

            if (!valueMember) valueMember = "__valueMember";
            if (!displayMember) displayMember = "__displayMember";
            if (!inputMember) inputMember = "__inputMember";

            if (!filter) {
                filter = function (data, tester) {
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
                var unhook = function () {
                    Event.UnhookMouseOut(div);
                    if (ele.__menu) ele.__menu.Fold();
                }
                var mouseOutCall = function (relEle, currEle) {
                    return !menu.InnerElement(currEle);
                };
                var hook = function () {
                    Event.HookMouseOut(div, function (leave) {
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
                var theSameText = function (t1, t2) {
                    return t1 == t2 || ((t1 == "未定义" || !t1 || t1 == "") && (t2 == "未定义" || !t2 || t2 == ""));
                }
                text.onchange = function () {
                    var items = menu.Items();
                    var d = null;
                    if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                        d = text.__currData;
                    }
                    else {
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
                            }
                            else {
                                d[valueMember] = null;
                                d[displayMember] = Element(text).getText();
                            }
                        }
                    }
                    text.__currData = d;
                    Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                    changeFieldValue(text);
                }
                text.onkeyup = function () {
                    var items = menu.Items();
                    if (Event().KeyCode() == 13) {
                        unhook();
                        var d = null;
                        if (text.__currData && theSameText(text.__currData[displayMember], Element(text).getText())) {
                            d = text.__currData;
                        }
                        else {
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
                                    }
                                    else {
                                        d[valueMember] = null;
                                        d[displayMember] = Element(text).getText();
                                    }
                                }
                            }
                        }
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    else {
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
                text.onfocus = function () {
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
                menu.DrawItem = function (parent, curr, total, index, e) {
                    var data = curr.GetData();
                    e.title = Element(e).setText(data[displayMember]);
                    e.__currData = data;
                    e.onclick = function () {
                        unhook();
                        text.__currData = data;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    return true;
                };
                ele.onclick = function () {
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
                    }
                    else {
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
            for (var i = cnt; i > notEquals; ) {
                items.RemoveAt(--i);
            }
            for (var i = notEquals; i < len; i++) {
                items.Add(val[i]);
            }
        }
    } (this)
    DropDownInputConv.DropDownInputItemConv = function (style, currNotObject, readOnly) {
        Form_SingleValueConv.apply(this);
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            var displayMember = ele.getAttribute("displayMember");

            if (!valueMember) valueMember = "__valueMember";
            if (!displayMember) displayMember = "__displayMember";

            var items = ele.__menu.Items();
            var d = null;
            if (currNotObject || !val) {
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
            }
            else {
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
        this.GetUIValue = function (self) {
            return function (ele) {
                var valueMember = ele.getAttribute("valueMember");
                var displayMember = ele.getAttribute("displayMember");

                if (!valueMember) valueMember = "__valueMember";
                if (!displayMember) displayMember = "__displayMember";
                if (currNotObject) {
                    return ele.__currData ? ele.__currData[valueMember] : null;
                }
                else {
                    var value = null;
                    if (!ele.__currData) {
                        if (!readOnly) {
                            value = {};
                            value[valueMember] = null;
                            value[displayMember] = Element(ele).getText();
                        }
                    }
                    else {
                        value = {};
                        value[valueMember] = ele.__currData[valueMember];
                        value[displayMember] = ele.__currData[displayMember];
                    }
                    return value ? value.toJSONString() : null;
                }
            }
        } (this);
    }
}


//下拉式可过滤单选列表Conv
function FilterableListConv(style, maxSize, filter, valueNotObject) {
    Form_ListValueConv.apply(this);
    //valueNotObject:集合元素是对象类型（定义了valueMember、displayMember等）还是值类型
    if (!style) style = { 'menu': 'menu', 'dropItem': 'dropItem', 'single': 'single', 'first': 'first', 'middle': 'middle', 'last': 'last' };
    var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "FilterableListConv.FilterableListItemConv(" + itemStyle + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.DecodeArguments = function (ele, args) {
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
            }
            else {
                list[i][valueMember] = item[valueMember];
            }
            if (!item || typeof item[displayMember] == 'undefined') {
                list[i][displayMember] = item;
            }
            else {
                list[i][displayMember] = item[displayMember];
            }
            if (!item || typeof item[inputMember] == 'undefined') {
                list[i][inputMember] = item;
            }
            else {
                list[i][inputMember] = item[inputMember];
            }
        }
        return list;
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var inputMember = ele.getAttribute("inputMember");
            if (!inputMember) inputMember = "__inputMember";
            var defFilter = function (data, tester) {
                if (data == tester) return true;
                var lower = tester ? tester.toLowerCase() : tester;
                if (typeof data == "string" && data.toLowerCase().indexOf(lower) > -1) return true;
                if (inputMember && typeof data[inputMember] == "string" && data[inputMember].toLowerCase().indexOf(lower) > -1) return true;
                if (displayMember && typeof data[displayMember] == "string" && data[displayMember].toLowerCase().indexOf(lower) > -1) return true;
                return false;
            }
            if (!filter) filter = defFilter;
            var list = ele.__list;
            if (!list) list = ele.__list = [];
            var menu = ele.__menu;
            if (!menu) {
                var doc = Wnd(ele).GetDocument();
                var div = doc.createElement("div");
                var unhook = function () {
                    Event.UnhookMouseOut(div);
                }
                var mouseOutCall = function (relEle, currEle) {
                    return !menu.InnerElement(currEle);
                };
                var hook = function () {
                    Event.HookMouseOut(div, function (leave) {
                        if (leave) {
                            unhook();
                            menu.Fold();
                        }
                    }, mouseOutCall);
                }
                css(div).Add(style.dropItem);
                ele.appendChild(div);

                var divInput = doc.createElement("div");
                div.appendChild(divInput);
                var text = doc.createElement("INPUT");
                css(text).Add("dropText");
                divInput.appendChild(text);
                text.type = "text";
                text.onchange = function () {
                    var d = null;
                    if (!text.__currData || text.__currData[displayMember] != text.value || (text.__currData[displayMember] == "未定义" && text.value == "")) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][displayMember] == text.value) {
                                d = list[i];
                                break;
                            }
                        }
                    }
                    else {
                        d = text.__currData;
                    }
                    if (text.__currData != d) {
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    else {
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                    }
                }
                text.onkeyup = function () {
                    if (Event().KeyCode() == 13) {
                        unhook();
                        menu.Fold();
                        var index = 0;
                        if (typeof filter != 'function') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i][displayMember] == text.value) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                        text.__currData = list[index];
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    else {
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
                        menu.Unfold(bounds, { 'offsetY': divInput.offsetHeight });
                        hook();
                    }
                }
                var divDrop = document.createElement("div");
                css(divDrop).Add("dropImage");
                divInput.appendChild(divDrop);

                self.InheritProperties(ele, text);

                menu = ele.__menu = text.__menu = new Menu(div, style, true);
                menu.__text = text;
                menu.Fold();
                menu.DrawItem = function (parent, curr, total, index, e) {
                    var data = curr.GetData();
                    e.title = Element(e).setText(data[displayMember]);
                    e.onclick = function () {
                        unhook();
                        menu.Fold();
                        text.__currData = data;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    return true;
                };
                ele.onclick = function () {
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
                    }
                    else {
                        unhook();
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
            for (var i = cnt; i > notEquals; ) {
                items.RemoveAt(--i);
            }
            for (var i = notEquals; i < len; i++) {
                items.Add(val[i]);
            }
            menu.__text.value = "";
        }
    } (this)
    FilterableListConv.FilterableListItemConv = function (style) {
        Form_ListValueConv.ListItemValueConv.apply(this);
        this.CompareValues = function (val1, val2) {
            return -1;
        }
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var menu = ele.__menu;
            var items = menu.Items();
            Element(ele).setText(val);
            var curr = null;
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
        this.GetUIValue = function (ele) {
            var valueMember = ele.getAttribute("valueMember");
            return ele.__currData ? ele.__currData[valueMember] : null;
        }
    }
}
//下拉式可手工输入单选列表Conv
function WritableListConv(style, maxSize, filter, valueNotObject) {
    Form_ListValueConv.apply(this);
    //valueNotObject:集合元素是对象类型（定义了valueMember、displayMember等）还是值类型
    if (!style) style = { 'menu': 'menu', 'dropItem': 'dropItem', 'single': 'single', 'first': 'first', 'middle': 'middle', 'last': 'last' };
    var itemStyle = "{ 'single': '" + style.single + "', 'first': '" + style.first + "', 'middle': '" + style.middle + "', 'last': '" + style.last + "' }";

    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "WritableListConv.WritableListItemConv(" + itemStyle + ")", true);
        inheritProperties_base(srcElement, desElement);
    }

    this.DecodeArguments = function (ele, args) {
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
            }
            else {
                list[i][valueMember] = item[valueMember];
            }
            if (!item || typeof item[displayMember] == 'undefined') {
                list[i][displayMember] = item;
            }
            else {
                list[i][displayMember] = item[displayMember];
            }
            if (!item || typeof item[inputMember] == 'undefined') {
                list[i][inputMember] = item;
            }
            else {
                list[i][inputMember] = item[inputMember];
            }
        }
        return list;
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var inputMember = ele.getAttribute("inputMember");
            if (!inputMember) inputMember = "__inputMember";
            if (!filter) filter = function (data, tester) {
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
                var unhook = function () {
                    Event.UnhookMouseOut(div);
                }
                var mouseOutCall = function (relEle, currEle) {
                    return !menu.InnerElement(currEle);
                };
                var hook = function () {
                    Event.HookMouseOut(div, function (leave) {
                        if (leave) {
                            unhook();
                            menu.Fold();
                        }
                    }, mouseOutCall);
                }
                css(div).Add(style.dropItem);
                ele.appendChild(div);

                var divInput = doc.createElement("div");
                div.appendChild(divInput);
                var text = doc.createElement("INPUT");
                css(text).Add("dropText");
                divInput.appendChild(text);
                text.type = "text";
                text.onchange = function () {
                    var d = null;
                    if (!text.__currData || text.__currData[displayMember] != text.value || (text.__currData[displayMember] == "未定义" && text.value == "")) {
                        d = {};
                        d[valueMember] = null;
                        d[displayMember] = text.value;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][displayMember] == text.value) {
                                d = list[i];
                                break;
                            }
                        }
                    }
                    else {
                        d = text.__currData;
                    }
                    if (text.__currData != d) {
                        text.__currData = d;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    else {
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                    }
                }
                text.onkeyup = function () {
                    if (Event().KeyCode() == 13) {
                        unhook();
                        menu.Fold();
                        var index = -1;
                        if (typeof filter != 'function') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i][displayMember] == text.value) {
                                    index = i;
                                    break;
                                }
                            }
                        }
                        else {
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
                        }
                        else {
                            var d = {};
                            d[valueMember] = null;
                            d[displayMember] = text.value;
                            text.__currData = d;
                        }
                        changeFieldValue(text);
                    }
                    else {
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
                menu.DrawItem = function (parent, curr, total, index, e) {
                    var data = curr.GetData();
                    e.title = Element(e).setText(data[displayMember]);
                    e.__currData = data;
                    e.onclick = function () {
                        unhook();
                        menu.Fold();
                        text.__currData = data;
                        Element(text).setText(text.__currData ? text.__currData[displayMember] : null);
                        changeFieldValue(text);
                    }
                    return true;
                };
                ele.onclick = function () {
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
                    }
                    else {
                        unhook();
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
            for (var i = cnt; i > notEquals; ) {
                items.RemoveAt(--i);
            }
            for (var i = notEquals; i < len; i++) {
                items.Add(val[i]);
            }
        }
    } (this)
    WritableListConv.WritableListItemConv = function (style) {
        Form_SingleValueConv.apply(this);
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            if (!valueMember) valueMember = "__valueMember";
            var displayMember = ele.getAttribute("displayMember");
            if (!displayMember) displayMember = "__displayMember";
            var menu = ele.__menu;
            var items = menu.Items();
            var curr = val;
            Element(ele).setText(valueNotObject ? val : (val ? val[displayMember] : ""));
            if (valueNotObject) {
                for (var i = 0; i < items.Count(); i++) {
                    var d = items.ItemAt(i).GetData();
                    if (d[valueMember] == ele.value) {
                        curr = d;
                        Element(ele).setText(d[displayMember]);
                        break;
                    }
                }
            }
            ele.__currData = curr;
        }
        this.GetUIValue = function (self) {
            return function (ele) {
                var valueMember = ele.getAttribute("valueMember");
                if (!valueMember) valueMember = "__valueMember";
                var displayMember = ele.getAttribute("displayMember");
                if (!displayMember) displayMember = "__displayMember";
                if (valueNotObject) {
                    return ele.__currData ? ele.__currData[displayMember] : null;
                }
                else {
                    var value = ele.__currData;
                    if (!value) {
                        value = {};
                        value[valueMember] = null;
                        value[displayMember] = ele.value;
                    }
                    return value.toJSONString();
                }
            }
        } (this);
    }
}

//页签conv--仍需修改，暂不支持图标
function FrontGroupListConv(style) {
    Form_ListValueConv.apply(this);

    if (!style) style = { 'itemBorder': 'groupItemBorder',
        'itemBounds_L': 'groupItemBounds',
        'itemBounds_M': 'groupItemBounds',
        'itemBounds_R': 'groupItemBounds',
        'selected': 'selected', 'unselected': 'unselected'
    };
    var currStyle = "{'selected':'" + style.selected + "','unselected':'" + style.unselected + "'}";
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "FrontGroupListConv.FrontGroupListItemConv(" + currStyle + ")");
        inheritProperties_base(srcElement, desElement);
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var valueMember = ele.getAttribute('valueMember');
            var displayMember = ele.getAttribute('displayMember');
            var itemField = ele.getAttribute('itemField');
            var container = null;
            if (ele.children.length == 1) {
                container = ele.children[0];
            }
            else {
                ele.innerHTML = "";
                container = ele.ownerDocument.createElement("div");
                ele.appendChild(container);
            }
            var cnt = container.children.length;
            var len = val && val.length ? val.length : 0;
            for (var i = cnt; i > len; ) {
                container.removeChild(container.children[--i]);
            }
            for (var i = cnt; i < len; i++) {
                var span = ele.ownerDocument.createElement("span");
                if (i == 0) {
                    css(span).Add(style.itemBounds_L);
                }
                else if (i == len - 1) {
                    css(span).Add(style.itemBounds_R);
                }
                else {

                }
                css(span).Add(style.itemBorder);

                span.style.display = "block";
                span.style.cssFloat = "left";
                span.style.textAlign = "center";
                span.style.cursor = "pointer";
                container.appendChild(span);
            }
            self.InheritProperties(ele, container);
            for (var i = 0; i < len; i++) {
                var span = container.children[i];
                span.innerText = val[i][displayMember];
                span.onclick = function (e) {
                    return function () {
                        container.__currData = e.__currData;
                        var form = formCallCenter.DetectFormByElement(ele);
                        form.SetField(container.getAttribute("field"), [e.__currData[valueMember]]);
                    }
                } (span);
                span.__currData = val[i];
            }
        }
    } (this);
    FrontGroupListConv.FrontGroupListItemConv = function (style) {
        Form_SingleValueConv.apply(this);
        this.ApplyValue = function (self) {
            return function (ele, val) {
                var valueMember = ele.getAttribute('valueMember');
                var displayMember = ele.getAttribute('displayMember');
                for (var i = 0; i < ele.children.length; i++) {
                    var span = ele.children[i];
                    if (span.__currData[valueMember] == val) {
                        css(span).Remove(style.unselected);
                        css(span).Add(style.selected);
                    }
                    else {
                        css(span).Remove(style.selected);
                        css(span).Add(style.unselected);
                    }
                }
            }
        } (this);
        this.GetUIValue = function (ele) {
            var valueMember = ele.getAttribute('valueMember');
            return ele.__currData[valueMember];
        }
    }
}
function FrontGroupConv(groupName) {
    Form_SingleValueConv.apply(this);
    this.ApplyValue = function (self) {
        return function (ele, val) {
            ele.style.display = val == groupName ? "" : "none";
        }
    } (this);
}
