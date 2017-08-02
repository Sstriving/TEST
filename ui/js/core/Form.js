if (!window.setTimeout.__impl) {
    var func = function (to) {
        return function (code, timeout) {
            if (typeof (code) != 'function') code = eval("(function () {" + code + "; })");
            var func = function () {
                window.clearTimeout(arguments.callee.id);
                delete arguments.callee.id;
                code();
            }
            return func.id = to(func, timeout);
        }
    } (window.setTimeout);
    window.setTimeout = func;
    window.setTimeout.__impl = func;
}
//__bindedData:前端元素绑定后台数据
//__currData:前端元素关联数据
function manageFieldElement(ele) {
    if (ele.__manage__) return;
    ele.__field__ = ele.getAttribute("field");
    ele.__formID__ = ele.getAttribute("formID");

    ele.__set_base__ = ele.setAttribute;
    ele.setAttribute = function (name, value) {
        switch (name) {
            case "field":
                ele.__field__ = value;
                break;
            case "formID":
                ele.__formID__ = value;
                break;
            default:
                ele.__set_base__(name, value);
                break;
        }
    }

    ele.__get_base__ = ele.getAttribute;
    ele.getAttribute = function (name) {
        switch (name) {
            case "field":
                var f = ele.__field__;
                if (!f) ele.__field__ = "";
                return f;
            case "formID":
                var f = ele.__formID__;
                if (!f) ele.__formID__ = "";
                return f;
            default:
                return ele.__get_base__(name);
        }
    }

    ele.__rmv_base__ = ele.removeAttribute;
    ele.removeAttribute = function (name) {
        switch (name) {
            case "field":
                ele.__field__ = "";
                break;
            case "formID":
                ele.__formID__ = "";
                break;
            default:
                ele.__rmv_base__(name);
                break;
        }
    }

    ele.__manage__ = true;
}
function Form_SingleValueConv() {
    function compareObject(obj1, obj2) {
        var x = 0;
        var y = 0;
        var map = { 'undefined': 1, 'object': 2, 'number': 3, 'boolean': 4, 'string': 5 };
        if (!obj1) {
            x = map[typeof (obj1)];
            if (!x) x = 0;
        }
        if (!obj2) {
            y = map[typeof (obj2)];
            if (!y) y = 0;
        }
        if (x || y) {
            var array =
                [
                    [0, 1, 1, 1, 1, 1],
                    [-1, 0, -1, -1, -1, -1],
                    [-1, 1, 0, -1, -1, -1],
                    [-1, 1, 1, 0, -1, -1],
                    [-1, 1, 1, 1, 0, -1],
                    [-1, 1, 1, 1, 1, 0]
                ];
            return array[x][y];
        }
        else {
            if (typeof (obj1) == typeof (obj2)) {
                if (obj1 == obj2) return 0;
                x = obj1 + "";
                y = obj2 + "";
                return x > y ? 1 : -1;
            }
            else {
                return typeof (x) > typeof (y) ? 1 : -1;
            }
        }
    }
    this.CompareValues = function (val1, val2) {
        return compareObject(val1, val2);
    }
    this.DetermineApply = function (self) {
        return function (ele, val) {
            return self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    } (this);
    this.DecodeArguments = function (ele, args) {
        if (!args.length) throw new Error("Array arguments needed for Set");
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            if (!self.DetermineApply(ele, val)) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;
            var vc = ele.getAttribute("valueChanged");
            if (vc) {
                var vcEvt = eval(vc);
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        switch (ele.tagName) {
            case "SELECT":
                return ele.selectedIndex < 0 ? undefined : ele.options[ele.selectedIndex].value;
            default:
                return Element(ele).getText();
        }
    }
    this.ApplyValue = function (ele, val) {
        switch (ele.tagName) {
            case "OPTION":
                var select = ele.parentElement;
                var selectedIndex = -1;
                var options = select.options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == val) {
                        selectedIndex = i;
                        break;
                    }
                }
                select.selectedIndex = selectedIndex;
                break;
            default:
                Element(ele).setText(val);
                break;
        }
    }
}
function Form_ListValueConv() {
    Form_SingleValueConv.apply(this);
    this.DecodeArguments = function (ele, args) {
        return args;
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {
            switch (ele.tagName) {
                case "SELECT":
                    var options = ele.options;
                    options.length = 0;
                    if (val && val.length > 0) {
                        var displayMember = ele.getAttribute("displayMember");
                        var valueMember = ele.getAttribute("valueMember");
                        for (var i = 0; i < val.length; i++) {
                            var option = new Option(val[i][displayMember], val[i][valueMember]);
                            option.__currData = val[i];
                            options.add(option);
                            if (i == 0) self.InheritProperties(ele, option);
                        }
                    }
                    ele.selectedIndex = -1;
                    break;
            }
        };
    } (this);
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "Form_ListValueConv.ListItemValueConv", true);
        Form.InheritAttributes(srcElement, desElement);
    }
    Form_ListValueConv.ListItemValueConv = function () {
        Form_SingleValueConv.apply(this);
        this.GetUIValue = function (ele) {
            var select = ele.parentElement;
            if (select.selectedIndex < 0) return undefined;
            var valueMember = select.getAttribute("valueMember");
            return select.options[select.selectedIndex].__currData[valueMember];
        }
    }
}
function Form(form) {
    var form = form;
    var labels = new Map();
    this.FormElement = function (self) {
        return function (ele) {
            var form = self.GetForm();
            return __formField(form, form.getAttribute("formID"), ele);
        }
    } (this);
    var __formField = function (self) {
        return function (form, form_ID, ele) {
            if (!ele) return false;
            if (form == ele) return true;
            if (ele.getAttribute) {
                var fFormID = ele.getAttribute("formID");
                if (fFormID) return form_ID == fFormID;
            }
            ele = window.ui(ele).parent();
            return __formField(form, form_ID, ele);
        }
    } (this);
    var fieldFilter = function (self) {
        return function (ele) {
            return ele.getAttribute("field") && self.FormElement(ele);
        }
    } (this);
    var findElements = function (self) {
        return function (filter, result, owner) {
            if (arguments.length == 1) {
                result = [];
                findElements(filter, result);
                return result;
            }
            else {
                var wnd = owner ? owner.contentWindow : window.root();
                var elements = wnd.document.all;
                for (var i = 0; i < elements.length; i++) {
                    var ele = elements[i];
                    manageFieldElement(ele);
                    if (filter(ele)) result[result.length] = ele;
                }
                var iframes = wnd.document.getElementsByTagName("IFRAME");
                for (var i = 0; i < iframes.length; i++) {
                    findElements(filter, result, iframes[i]);
                }
            }
        }
    } (this);
    this.GetForm = function () {
        return form;
    }
    this.SetField = function (self) {
        return function (field, args, report) {
            if (!field) throw new Error("Null field");
            var e = null;
            var call = function (ele) {
                ele.__Form__init__ = true;
                self.GetConverter(ele).SetValue(ele, args);
                e = ele;
            }
            var filter = function (ele) {
                return ele.getAttribute("field") == field && self.FormElement(ele);
            };
            self.CallFields(call, filter);
            if (report && e) changeFieldValue(e);
        };
    } (this);
    this.GetField = function (self) {
        return function (field) {
            if (!field) throw new Error("Null field");
            var call = function (ele, out) {
                out.__return = true;
                return self.GetConverter(ele).GetValue(ele);
            }
            var filter = function (ele) {
                return ele.getAttribute("field") == field && self.FormElement(ele);
            };
            return self.CallFields(call, filter);
        };
    } (this);
    this.GetConverter = function (ele) {
        var convName = ele.getAttribute("conv");
        if (ele.__conv && ele.__convStr == convName) return ele.__conv;
        ele.__convStr = convName;
        var dgt = null;
        var convParams = "()";
        if (convName) {
            try {//以下'('与'.'的处理不严谨
                var index = convName.indexOf("(");
                if (index > -1) {
                    convParams = convName.substr(index, convName.length - index);
                    convName = convName.substr(0, index);
                }
                try {
                    dgt = eval("window.root(ele)." + convName);
                }
                catch (err) { }
                if (!dgt) {
                    try {
                        dgt = eval("window.root()." + convName);
                    }
                    catch (err) { }
                }
                if (!dgt) {
                    try {
                        dgt = eval(convName);
                    }
                    catch (err) { }
                }
            }
            catch (err) { }
        }
        if (!dgt) dgt = defConv;
        ele.__conv = eval("new dgt" + convParams);
        var conv = {};
        for (var m in ele.__conv) {
            conv[m] = ele.__conv[m];
        }
        var getValue = conv.GetValue;
        var getUIValue = conv.GetUIValue;
        conv.GetValue = function (ele) {
            var frontField = ele.getAttribute("frontField");
            if (frontField) {
                try {
                    if (eval(frontField)) return getUIValue(ele);
                }
                catch (err) { }
            }
            return getValue(ele);
        }
        ele.__conv = conv;
        return ele.__conv;
    }
    this.SetTitle = function (name, value) {
        var index = labels.IndexOfKey(name);
        if (index >= 0) labels.RemoveAt(index);
        if (typeof (value) == "string") labels.Add(name, value);
    }
    this.GetTitle = function (name) {
        return labels.ValueForKey(name);
    }
    this.AllTitleNames = function () {
        var list = [];
        for (var i = 0; i < labels.Count(); i++) {
            list[i] = labels.KeyAt(i);
        }
        return list;
    }
    function defConv() {
        this.SetValue = function (ele, args) {
            var conv = GetConvImpl(ele);
            return conv.SetValue(ele, args);
        }
        this.GetValue = function (ele) {
            var conv = GetConvImpl(ele);
            return conv.GetValue(ele);
        }
        this.GetUIValue = function (ele) {
            var conv = GetConvImpl(ele);
            return conv.GetUIValue(ele);
        }
        function GetConvImpl(ele) {
            if (!ele._defConv) {
                switch (ele.tagName) {
                    case "SELECT":
                        ele._defConv = new Form_ListValueConv();
                    default:
                        ele._defConv = new Form_SingleValueConv();
                }
            }
            return ele._defConv;
        }
    }
    this.CallFields = function (call, filter) {
        if (!filter) filter = fieldFilter;
        var eles = findElements(filter);
        var rt = undefined;
        var out = {};
        for (var i = 0; i < eles.length; i++) {
            rt = call(eles[i], out);
            if (out.__return) return rt;
        }
    }
}
Form.SetAttribute = function (ele, attrName, attrValue, keepIfExists) {
    var oldVal = ele.getAttribute(attrName);
    var newVal;
    if (keepIfExists) {
        if (oldVal) {
            newVal = oldVal;
        }
        else {
            switch (typeof (oldVal)) {
                case 'object': //null
                case 'undefined': //undefined
                case 'string': //''
                    if (attrValue) {
                        newVal = attrValue;
                    }
                    else {
                        switch (typeof (attrValue)) {
                            case 'object': //null
                            case 'undefined': //undefined
                            case 'string': //''
                                newVal = null;
                                break;
                            case 'number': //0
                            case 'boolean': //false
                            default:
                                newVal = attrValue;
                                break;
                        }
                    }
                    break;
                case 'number': //0
                case 'boolean': //false
                default:
                    newVal = oldVal;
                    break;
            }
        }
    }
    else {
        if (attrValue) {
            newVal = attrValue;
        }
        else {
            switch (typeof (attrValue)) {
                case 'object': //null
                case 'undefined': //undefined
                case 'string': //''
                    if (oldVal) {
                        newVal = oldVal;
                    }
                    else {
                        switch (typeof (oldVal)) {
                            case 'object': //null
                            case 'undefined': //undefined
                            case 'string': //''
                                newVal = null;
                                break;
                            case 'number': //0
                            case 'boolean': //false
                            default:
                                newVal = oldVal;
                                break;
                        }
                    }
                    break;
                case 'number': //0
                case 'boolean': //false
                default:
                    newVal = attrValue;
                    break;
            }
        }
    }
    if (!newVal && typeof (newVal) == 'object') {
        ele.removeAttribute(attrName);
    }
    else {
        ele.setAttribute(attrName, newVal);
    }
}
IdentifiedForm.DEBUG = 0; //调试开关
function IdentifiedForm(form) {
    Form.apply(this, arguments);
    var formID = null;
    this.FormElement = function (self) {
        return function (ele) {
            var form = self.GetForm();
            return __formField(form, form.getAttribute("formID"), ele);
        }
    } (this);
    var __formField = function (self) {
        return function (form, form_ID, ele) {
            if (!ele) return false;
            if (form == ele) return true;
            if (ele.getAttribute) {
                var fFormID = ele.getAttribute("formID");
                if (fFormID) return formID == fFormID || form_ID == fFormID;
            }
            ele = window.ui(ele).parent();
            return __formField(form, form_ID, ele);
        }
    } (this);
    var CallCS_DEBUG = function (self) {
        return function (args) {
            var title = args[0];
            var operation = args[2];
            switch (operation) {
                case window.FormOperations.Report:
                    self.Report.apply(null, [title, args[3]]);
                    break;
                case window.FormOperations.Request:
                default:
                    var ags = [];
                    for (var i = 3; i < args.length; i++) {
                        ags[ags.length] = args[i];
                    }
                    self.Request.apply(null, [title, ags]);
                    break;
            }
        }
    } (this);
    this.Request = function (self) {
        return function (title, args) {
            //            switch (title) {
            //                case "UserCode":
            //                    self.Response(title, ["UserCode"]);
            //                    break;
            //            }
        }
    } (this);
    this.Report = function (self) {
        return function (title, value) {
            //            switch (title) {
            //                case "UserCode":
            //                    self.Response("Password", [""]);
            //                    break;
            //            }
        }
    } (this);
    this.CallJS = function (self) {
        return function () {
            var title = arguments[0];
            var operation = arguments[1];
            var list = [];
            for (var i = 2; i < arguments.length; i++) {
                list[i - 2] = eval('(' + arguments[i] + ')');
            }
            switch (operation) {
                case window.FormOperations.Error:
                    Wnd().MessageBox(list);
                    break;
                default:
                    self.Response(title, list);
                    break;
            }
        }
    } (this);
    this.Response = function (self) {
        return function (title, args) {
            self.SetField(title, args, false);
        };
    } (this);
    this.SetFormID = function (self) {
        return function (id) {
            if (formID) throw new Error("Form ID has been set");
            if (!id) throw new Error("Null ID");
            formID = id;
            var form = self.GetForm();
            Form.SetAttribute(form, "formID", formID, false);
        }
    } (this);
    this.GetFormID = function () {
        return formID;
    }
    this.requestData = function (self) {
        return function (fieldName, args) {
            try {
                var title = self.GetTitle(fieldName);
                if (!title) throw new Error("Field '" + fieldName + "' not defined");
                var ags = [title, formID, window.FormOperations.Request];
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        ags[3 + i] = args[i];
                    }
                }
                (IdentifiedForm.DEBUG ? CallCS_DEBUG : window.CallCS)(ags);
            }
            catch (err) {
                alert(err.description + "(requestData)" + fieldName);
            }
        }
    } (this);
    this.changeFieldValue = function (self) {
        return function (ele) {			//元素数据改变
            try {
                var frontField = false;
                var fieldName = ele.getAttribute("itemField");
                if (fieldName) {
                    frontField = ele.getAttribute("itemFrontField");
                }
                else {
                    fieldName = ele.getAttribute("field");
                    frontField = ele.getAttribute("frontField");
                }
                if (frontField) {
                    try {
                        if (eval(frontField)) return;
                    }
                    catch (err) { }
                }
                var val = self.GetConverter(ele).GetUIValue(ele);
                if (!fieldName) throw new Error("Field not defined");
                var title = self.GetTitle(fieldName);
                if (!title) throw new Error("Field '" + fieldName + "' not defined");
                (IdentifiedForm.DEBUG ? CallCS_DEBUG : window.CallCS)([title, formID, window.FormOperations.Report, val]);
            }
            catch (err) {
                alert(err.description + "(changeFieldValue)");
            }
        };
    } (this);
    this.valueChanged = function (self) {
        return function (ele) {				//元素值改变  
            var subFields = ele.getAttribute("subFields");
            if (subFields && subFields.length > 0) {
                if (ele.getAttribute("subFrontFields")) subFields = null;
            }
            else {
                subFields = null;
            }
            var itemField = ele.getAttribute("itemField");
            if (itemField && itemField.length > 0) {
                if (!ele.getAttribute("itemFrontField")) subFields = subFields ? subFields + "," + itemField : itemField;
            }
            if (subFields && subFields.length > 0) {
                var args = [];
                var condFields = ele.getAttribute("condFields");
                if (condFields && condFields.length > 0) {
                    var fields = condFields.split(',');
                    for (var i = 0; i < fields.length; i++) {
                        args[i] = self.GetField(fields[i]);
                    }
                }
                var fields = subFields.split(',');
                for (var i = 0; i < fields.length; i++) {
                    self.requestData(fields[i], args);
                }
            }
        };
    } (this);
    this.commit = function (self) {
        return function (ele) {
            try {
                var args = null;
                var condFields = ele.getAttribute("condFields");
                if (condFields) {
                    var fields = condFields.split(',');
                    if (fields.length > 0) {
                        args = [];
                        for (var i = 0; i < fields.length; i++) {
                            args[i] = self.GetField(fields[i]);
                        }
                    }
                }
                self.requestData(ele.getAttribute("command"), args);
            }
            catch (err) {
                alert(err.description + "(commit)");
            }
        };
    } (this);
    var initField = function (self) {
        return function (ele) {
            ele.__Form__init__ = true;
            self.requestData(ele.getAttribute("field"));
        };
    } (this);
    var initFieldFilter = function (self, list) {
        return function (ele) {
            var field = ele.getAttribute("field");
            if (!field) return false;
            if (list[field]) return false;//避免重复请求同一字段。如果考虑给field增加子分类的概念，需结合子分类实现此功能
            if (ele.__Form__init__) return false;
            if (ele.getAttribute("command") /* || ele.getAttribute("condFields")*/) return false;
            var frontField = ele.getAttribute("frontField");
            if (frontField) {
                try {
                    if (eval(frontField)) return false;
                }
                catch (err) { }
            }
            if (!self.FormElement(ele)) return false;
            list[field] = true;
            return true;
        }
    };

    this.initAllFields = function (self) {
        return function () {
            self.CallFields(initField, initFieldFilter(self, {}));
        };
    } (this);
}
var formCallCenter = function () {
    var wnd = window.root();
    var impl = wnd._varFormCallCenter;
    if (!impl) {
        impl = wnd._varFormCallCenter = new function () {
            var forms = new Map();
            var events = new Map();
            this.RegisterEvent = function (eventName, eventHandler) {
                if (!eventHandler) return;
                var index = events.IndexOfKey(eventName);
                var list = null;
                if (index > -1) {
                    list = events.ValueForKey(eventName);
                }
                else {
                    list = [];
                    events.Add(eventName, list);
                }
                list[list.length] = eventHandler;
            }
            this.UnregisterEvent = function (eventName, eventHandler) {
                var index = events.IndexOfKey(eventName);
                if (index < 0) return;
                var list = events.ValueForKey(eventName);
                if (!eventHandler) {
                    list.length = 0;
                }
                else {
                    for (var i = list.length - 1; i > -1; i--) {
                        if (list[i] == eventHandler) {
                            for (var j = i; j < list.length - 1; j++) {
                                list[j] = list[j + 1];
                            }
                            list.length--;
                            break;
                        }
                    }
                }
                if (list.length < 1) events.RemoveAt(index);
            }
            this.RaiseEvent = function () {
                var eventName = arguments[0];
                var index = events.IndexOfKey(eventName);
                if (index < 0) return;
                var list = events.ValueForKey(eventName);
                var args = [];
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[args.length] = arguments[i];
                    }
                }
                var result = [];
                for (var i = 0; i < list.length; i++) {
                    result[result.length] = list[i].apply(null, args);
                }
                return result;
            }
            function innerIframe(parentWnd, childWnd) {
                if (!parentWnd) return false;
                var c = childWnd;
                while (c) {
                    if (c == c.parent) break;
                    c = c.parent;
                    if (c == parentWnd) return true;
                }
                return false;
            }
            this.RegisterForm = function (formID, form) {
                var ele = form.GetForm();
                formID = mapFormID(ele, formID);
                form.SetFormID(formID);

                var index = forms.IndexOfKey(formID);
                var exist = false;
                if (index > -1) {
                    var oldForm = forms.ValueForKey(formID);
                    //这里应该考虑title集合问题
                    var oldEle = oldForm.GetForm();
                    if (!innerIframe(ele.ownerDocument.parentWindow, oldEle.ownerDocument.parentWindow)) {
                        var list = form.AllTitleNames();
                        for (var i = 0; i < list.length; i++) {
                            var k = list[i];
                            oldForm.SetTitle(k, form.GetTitle(k));
                        }
                        form = oldForm;
                        exist = true;
                    }
                    else {
                        var list = oldForm.AllTitleNames();
                        for (var i = 0; i < list.length; i++) {
                            var k = list[i];
                            form.SetTitle(k, oldForm.GetTitle(k));
                        }
                        oldForm.__unload__();
                    }
                }
                if (!exist) {
                    forms.Add(formID, form);
                    var eventHandler = function (fs, fID, e) {
                        return function () {
                            var index = fs.IndexOfKey(fID);
                            if (index > -1) fs.RemoveAt(index);
                            Wnd(e).UnregisterEvent(root(e), 'unload', arguments.callee);
                        }
                    } (forms, formID, ele);
                    form.__unload__ = eventHandler;
                    Wnd(ele).RegisterEvent(root(ele), 'unload', eventHandler);
                }
                form.initAllFields();
            }
            function mapFormID(form, formID) {
                var p = form;
                while (p) {
                    if (p.tagName == "IFRAME") {
                        var formMap = p.getAttribute("formMap");
                        if (formMap) formMap = eval("(" + formMap + ")");
                        if (formMap) {
                            var fID = formMap[formID];
                            if (fID) {
                                formID = mapFormID(p.parentNode, fID);
                                break;
                            }
                        }
                    }
                    p = window.ui(p).parent();
                }
                return formID;
            }
            this.GetFormByID = function (formID) {
                return forms.ValueForKey(formID);
            }
            this.CallJS = function () {
                var formID = arguments[1];
                var form = forms.ValueForKey(formID);
                if (!form) return;
                var array = [];
                if (arguments.length > 1) {
                    array[0] = arguments[0];
                    for (var i = 2; i < arguments.length; i++) {
                        array[array.length] = arguments[i];
                    }
                }
                form.CallJS.apply(null, array);
            }
            this.DetectFormByElement = function (ele) {
                for (var i = 0; i < forms.Count(); i++) {
                    var formID = forms.KeyAt(i);
                    var form = forms.ValueForKey(formID);
                    if (form.FormElement(ele)) return form;
                }
                return null;
            }
            this.FormOperations = { "Request": "Request", "Report": "Report", "Unkown": "Unkown", "Error": "Error" };
            this.CallCS = function () {
                var array = arguments[0];
                if (array && array.length > 0) {
                    var title = array[0];
                    var args = [];
                    for (var i = 1; i < array.length; i++) {
                        args[i - 1] = array[i];
                    }
                    return window.root().external.CallCS(title, JSArray2ComArray(args));
                }
                else {
                    return window.root().external.CallCS();
                }
            }
            function JSArray2ComArray(array) {
                var dictionary = new ActiveXObject("Scripting.Dictionary");
                for (var i = 0; i < array.length; i++) {
                    if (array[i] && Obj(array[i]).InstanceOf(Array)) {
                        dictionary.add(i, JSArray2ComArray(array[i]));
                    }
                    else {
                        dictionary.add(i, array[i]);
                    }
                }
                return dictionary.Items();
            }
            this.changeFieldValue = function (self) {
                return function (ele) {
                    if (!ele) return;
                    var form = self.DetectFormByElement(ele);
                    if (!form) throw new Error("Form for element not found:field=" + ele.getAttribute("field"));
                    return form.changeFieldValue(ele);
                }
            } (this);
            this.valueChanged = function (self) {
                return function (ele) {
                    if (!ele) return;
                    var form = self.DetectFormByElement(ele);
                    if (!form) throw new Error("Form for element not found:field=" + ele.getAttribute("field"));
                    return form.valueChanged(ele);
                }
            } (this);
            this.commit = function (self) {
                return function (ele) {
                    if (!ele) return;
                    var form = self.DetectFormByElement(ele);
                    if (!form) throw new Error("Form for element not found:field=" + ele.getAttribute("field"));
                    return form.commit(ele);
                }
            } (this);
            this.requestData = function (self) {
                return function (ele, args) {
                    if (!ele) return;
                    var form = self.DetectFormByElement(ele);
                    if (!form) throw new Error("Form for element not found:field=" + ele.getAttribute("field"));
                    return form.requestData(ele.getAttribute("field"), args);
                }
            } (this);
        } ();
    }
    window.FormOperations = impl.FormOperations;
    window.CallCS = impl.CallCS;
    window.CallJS = impl.CallJS;
    window.changeFieldValue = impl.changeFieldValue;
    window.valueChanged = impl.valueChanged;
    window.commit = impl.commit;
    window.requestData = impl.requestData;
    window.usercommit = function (refEle, param) {
        window.useroperate(refEle, commit, param);
    }
    window.useroperate = function (refEle, action, param) {
        var form = impl.DetectFormByElement(refEle);
        var call = function () { wrapCall(form, action, param); };
        for (var i = 3; i < arguments.length; i++) {
            call = function (c, p) {
                return function () {
                    wrapCall(form, c, p);
                }
            } (call, arguments[i]);
        }
        call();
    }
    function wrapCall(form, call, param) {
        var doc = form.GetForm().ownerDocument;
        var e = doc.createElement("div");
        try {
            e.style.display = "none";
            doc.body.appendChild(e);
            Form.CopyFormAttributes(param, e);
            if (form.GetFormID) Form.SetAttribute(e, "formID", form.GetFormID(), true);
            call(e);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (e.parentNode) e.parentNode.removeChild(e);
        }
    }
    return impl;
} ();

Form.InheritAttributes = function (parent, child) {
    function ca(p, c, pn, cn, k) {
        Form.SetAttribute(c, cn, p.getAttribute(pn), k);
    }
    ca(parent, child, "itemFrontField", "frontField", false);
    ca(parent, child, "itemField", "field", false);
    ca(parent, child, "itemSubFields", "subFields", false);
    ca(parent, child, "itemSubFrontFields", "subFrontFields", false);
    ca(parent, child, "itemCondFields", "condFields", false);
    ca(parent, child, "itemCommand", "command", false);
    ca(parent, child, "itemFormID", "formID", false);
    ca(parent, child, "itemItemField", "itemField", false);
    ca(parent, child, "itemDisplayMember", "displayMember", false);
    ca(parent, child, "itemValueMember", "valueMember", false);
    ca(parent, child, "itemFormMap", "formMap", false);
    ca(parent, child, "itemValueChanged", "valueChanged", false);
    ca(parent, child, "itemConv", "conv", false);

    ca(parent, child, "formID", "formID", true);
    ca(parent, child, "displayMember", "displayMember", true);
    ca(parent, child, "valueMember", "valueMember", true);
    //    ca(parent, child, "formMap", "formMap", true);
}
Form.CopyFormAttributes = function (source, destination) {
    function ca(s, d, n) {
        var val = s.getAttribute ? s.getAttribute(n) : s[n];
        if (d.setAttribute) {
            Form.SetAttribute(d, n, val, false);
        }
        else {
            d[name] = val;
        }
    }
    var fields = [
    "command", "condFields", "field", "frontField", "conv", "subFields", "subFrontFields", "itemField", "itemFrontField", "formID", "displayMember", "valueMember", "formMap", "valueChanged",
    "itemCommand", "itemCondFields", "itemField", "itemConv", "itemSubFields", "itemField", "itemFormID", "itemDisplayMember", "itemValueMember", "itemFormMap", "itemValueChanged"
    ];
    for (var i = 0; i < fields.length; i++) {
        ca(source, destination, fields[i]);
    }
}