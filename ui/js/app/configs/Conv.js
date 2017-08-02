function ConfigPageListConv(style) {
    if (!style) style = { 'single': 'single', 'first': 'first', 'middle': 'middle', 'last': 'last', 'selected': 'selected', 'unselected': 'unselected',
        "menu": "menu"
    };
    var currStyle = "{'selected':'" + style.selected + "','unselected':'" + style.unselected + "'}";
    this.ApplyValue = function (self) {
        return function (ele, val) {
            var displayMember = ele.getAttribute("displayMember");
            var valueMember = ele.getAttribute("valueMember");
            function initMenu() {
                var menu = ele.__menu;
                if (!menu) {
                    menu = ele.__menu = new Menu(ele, style);
                    menu.DrawItem = function (parent, curr, total, index, e) {
                        e.parentNode.parentNode.style.position = '';
                        e.parentNode.parentNode.style.backgroundColor = "#F0F0F0";
                        e.innerHTML = "";
                        var data = curr.GetData();
                        var span = document.createElement("span"); 
                        span.innerText = data[displayMember];
                        span.textContent = data[displayMember];
                        e.appendChild(span);

                        var currPaletteField = document.createElement("span");
                        currPaletteField.style.display = "none";
                        var fieldName = "ListValueByMenuConv_" + ele.getAttribute('field') + '_' + data[valueMember];
                        currPaletteField.setAttribute("field", fieldName);
                        currPaletteField.setAttribute("conv", "Form_StaticValueConv('" + data[valueMember] + "')");
                        e.appendChild(currPaletteField);

                        e.title = data[displayMember];
                        self.InheritProperties(ele, e, val.length, index);
                        e.setAttribute('conv', "ConfigPageListConv.ConfigPageConv(" + currStyle + ")");

                        e.bindedData = data;
                        e.onclick = function (ui) {
                            return function () {
                                changeFieldValue(ui);
                            }
                        } (e);
                        return true;
                    }
                }
            }
            initMenu();
            var menu = ele.__menu;
            menu.Items().Clear();
            for (var i = 0; i < val.length; i++) {
                menu.Items().Add(val[i]);
            }
            menu.Unfold({ 'x': 0, 'y': 0 });
        };
    } (this);
    this.oo(new Form_ListValueConverter());
    ConfigPageListConv.ConfigPageConv = function (style) {
        this.CompareValues = function (val1, val2) {
            return val1 == val2 ? 0 : -1;
        }
        this.GetUIValue = function (ele) {
            var valueMember = ele.getAttribute("valueMember");
            return ele.bindedData ? ele.bindedData[valueMember] : null;
        }
        this.DecodeArguments = function (ele, args) {
            return args[0];
        }
        this.ApplyValue = function (ele, val) {
            var valueMember = ele.getAttribute("valueMember");
            var v = ele.bindedData ? ele.bindedData[valueMember] : null;
            if (v == val) {
                css(ele).Remove(style.unselected);
                css(ele).Add(style.selected);
            }
            else {
                css(ele).Remove(style.selected);
                css(ele).Add(style.unselected);
            }
        }
        this.oo(new Form_SingleValueConverter());
    }
}