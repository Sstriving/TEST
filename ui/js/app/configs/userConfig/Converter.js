
var SelectedPKUserDisabledConv = function (id, id1, id2, id3) {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args[0];
    }
    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            self.ApplyValue(ele, val);
            ele.__bindedData = val;

            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele);
            }
            return true;
        };
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele._UIValue;
    }
    this.ApplyValue = function (ele, val) {

        //设置元素Input的只读性
        var pkCode = document.getElementById(id);
        if (val) {
            pkCode.setAttribute("disabled", "disabled");
        }
        else {
            pkCode.removeAttribute('disabled');
        }

        var pkCode1 = document.getElementById(id1);
        if (!val) {
            pkCode1.setAttribute("disabled", "disabled");
        }
        else {
            pkCode1.removeAttribute('disabled');
        }

        var pkCode2 = document.getElementById(id2);
        if (!val) {
            pkCode2.setAttribute("disabled", "disabled");
        }
        else {
            pkCode2.removeAttribute('disabled');
        }

        var rowpass = document.getElementById(id3);
        if (val) {
            rowpass.style.display = "none";
        }
        else {
            rowpass.style.display = "block";
        }

        var tv = ele.parentNode.children[0]._tableviewex;
        if (tv) tv.setItemSelected(function (item, i) { return item[ele.getAttribute("valuemember")] == val; });
    }
}

