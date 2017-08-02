var spanNum = 1;
var AllPermissionCode = [];
var userPermissionMappingConv = function() {
    var TableApply = function(ele, val) {
        var tableviewex = null;
        var dvs = null;

        if (!ele._tableviewex) {
            tableviewex = new TABLE.TableViewEx(ele);
            ele._tableviewex = tableviewex;
        } else {
            tableviewex = ele._tableviewex;
        }

        if (!ele._dvs) {
            dvs = new TABLE.DataSource();
            ele._dvs = dvs;
        } else {
            dvs = ele._dvs;
        }
        tableviewex.ontablecelldraw = function(ele, data, index) {
            var span = document.createElement("span");
            if (spanNum != 5 && spanNum % 5 == 0) {
                AllPermissionCode.push(data.value);
            }
            if (spanNum != 1 && spanNum % 5 == 1) {
                span.innerHTML = "<input type='checkbox' name='permissionCheck'/>";
            } else {
                span.innerText = data.value ? data.value : "";
            }
            spanNum++;
            ele.appendChild(span);

            span.style.lineHeight = "45px";
            ele.style.overflow = "hidden";
            span.style.whiteSpace = "nowrap";
            ele.style.textOverflow = "ellipsis";
            span.style.cursor = "pointer";
            span.title = data.value ? data.value : "";
        };
        if (dvs.columns.length == 0) {
            var titles = ele.getAttribute("displaymember").split(",");
            for (var i = 0; i < titles.length; i++) {
                var args = titles[i].split(":");
                var width = "150";
                if (args.length == 3) width = args[2];
                dvs.columns.add({
                    "Name": args[0],
                    "Description": args[1],
                    "DisplayNO": i,
                    "Width": width,
                    "Visiable": true
                });
            }
        }

        if (val) dvs.rows = val;

        tableviewex.dataBind(dvs);
    }
    this.CompareValues = function(val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function(ele, args) {
        return args;
    }
    this.SetValue = function(self) {
        return function(ele, args) {
            var val = self.DecodeArguments(ele, args);
            if (val && self.CompareValues(val, self.GetValue(ele)) == 0) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    }(this);
    this.GetValue = function(ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function(ele) {
        return ele._tableviewex.getSelectedValue()[ele.getAttribute("valuemember")];
    }
    this.ApplyValue = function(self) {
        return function(ele, val) {
            switch (ele.tagName) {
                case "DIV":
                    TableApply(ele, val);
                    break;
            }
        };
    }(this);

    this.InheritProperties = function(srcElement, desElement, list, index) {
        desElement.setAttribute("field", srcElement.getAttribute("itemField"));
        desElement.setAttribute("subFields", srcElement.getAttribute("itemSubFields"));
        desElement.setAttribute("condFields", srcElement.getAttribute("itemCondFields"));
        desElement.setAttribute("conv", srcElement.getAttribute("itemConv"));
        desElement.setAttribute("command", srcElement.getAttribute("itemCommand"));
        desElement.setAttribute("formID", srcElement.getAttribute("itemFormID"));
        desElement.setAttribute("itemField", srcElement.getAttribute("itemItemField"));
        if (index + 1 == list.length) desElement.setAttribute("valueChanged", srcElement.getAttribute("itemValueChanged"));
    }
}