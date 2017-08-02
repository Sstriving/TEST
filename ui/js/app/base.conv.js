
var BaseConvMgr = {};

BaseConvMgr.DefaultListConverter = function () {
    this.CompareValues = function (val1, val2) {
        return val1 == val2 ? 0 : -1;
    }
    this.DecodeArguments = function (ele, args) {
        return args;
    }
    this.SetValue = function (self) {
        return function (ele, args) {
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
    } (this);
    this.GetValue = function (ele) {
        return ele.__bindedData;
    }
    this.GetUIValue = function (ele) {
        return ele.value;
    }
    this.ApplyValue = function (self) {
        return function (ele, val) {

        };
    } (this);

    this.InheritProperties = function (srcElement, desElement, list, index) {
        Form.SetAttribute(desElement,"privatefield", srcElement.getAttribute("itemprivatefield"),false);
        Form.SetAttribute(desElement,"field", srcElement.getAttribute("itemField"),false);
        Form.SetAttribute(desElement,"subFields", srcElement.getAttribute("itemSubFields"),false);
        Form.SetAttribute(desElement,"condFields", srcElement.getAttribute("itemCondFields"),false);
        Form.SetAttribute(desElement,"conv", srcElement.getAttribute("itemConv"),false);
        Form.SetAttribute(desElement,"command", srcElement.getAttribute("itemCommand"),false);
        Form.SetAttribute(desElement,"formID", srcElement.getAttribute("itemFormID"),false);
        Form.SetAttribute(desElement,"itemField", srcElement.getAttribute("itemItemField"),false);
        Form.SetAttribute(desElement,"displayMember", srcElement.getAttribute("itemDisplayMember"),true);
        Form.SetAttribute(desElement,"valueMember", srcElement.getAttribute("itemValueMember"),true);
        if (index + 1 == list.length) Form.SetAttribute(desElement,"valueChanged", srcElement.getAttribute("itemValueChanged"),false);
    }
    this.oo(new Form_ListValueConv())
}

BaseConvMgr.DefaultValueConverter = function () {
    this.oo(new Form_SingleValueConv())
}
BaseConvMgr.DefaultConstValueConverter = function (val) {

    this.SetValue = function (self) {
        return function (ele, args) {
            var val = self.DecodeArguments(ele, args);
            if (val && self.CompareValues(val, self.GetValue(ele)) == 0) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;
            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele, ele.getAttribute("field"));
            }
            return true;
        };
    } (this);

    this.GetValue = function (ele) {
        return val;
    }
    this.GetUIValue = function (ele) {
        return val;
    }
    this.ApplyValue = function (ele, val) {

    }

    this.oo(new BaseConvMgr.DefaultValueConverter());
}

//可编辑选择框
BaseConvMgr.EditSelectConv = function () {

    var self = this;

    this.GetUIValue = function (ele) {

        if (!ele.__bindedData) {
            var item = {};
            item[ele.getAttribute("valuemember")] = null;
            item[ele.getAttribute("displaymember")] = ele.value;
            return item.toJSONString();
        }

        var item = ele.__bindedData.first(function (item) {
            return item[ele.getAttribute("displaymember")] == ele.value;
        });

        if (!item) {
            var item = {};
            item[ele.getAttribute("valuemember")] = null;
            item[ele.getAttribute("displaymember")] = ele.value;
            return item.toJSONString();
        }

        return item.toJSONString();
    }

    this.SetValue = function (self) {
        return function (ele, args) {

            var val = self.DecodeArguments(ele, args);
            if (val && self.CompareValues(val, self.GetValue(ele)) == 0) return false;
            self.ApplyValue(ele, val);
            ele.__bindedData = val;
            if (ele.getAttribute("valueChanged")) {
                var vcEvt = eval("(" + ele.getAttribute("valueChanged") + ")");
                if (vcEvt) vcEvt(ele, ele.getAttribute("field"));
            }
            return true;
        };

    } (this);
    this.ApplyValue = function (ele, val) {
        var list = ele.getAttribute("list")
        if (list) {
            ele.parentNode.removeChild(document.getElementById(list));
        }
        if (ele.getAttribute("field") == "ApplicationDoctorList") alert();
        var rd = Math.floor(Math.random() * 999999);

        var datalist = document.createElement("datalist");
        val.forEach(function (item, i) {
            var option = document.createElement("option");
            option.setAttribute("label", item[ele.getAttribute("displaymember")]);
            option.setAttribute("value", item[ele.getAttribute("displaymember")]);
            self.InheritProperties(ele, option, val, i);
            option.owner = ele;
            datalist.appendChild(option);
        });
        ele.value = "";
        datalist.setAttribute("id", "list-" + rd);
        ele.setAttribute("list", "list-" + rd);
        ele.parentNode.appendChild(datalist);
    }

    this.oo(new BaseConvMgr.DefaultListConverter());
}
BaseConvMgr.EditSelectItemConv = function () {

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.ApplyValue = function (ele, val) {

        if (val) {
            ele.owner.value = val[ele.getAttribute("displaymember")];
        }
        else {
            ele.owner.value = "";
        }
    }

    this.oo(new BaseConvMgr.DefaultValueConverter());
}

//可编辑选择框
BaseConvMgr.SimpleEditSelectConv = function () {

    var self = this;

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.ApplyValue = function (ele, val) {
        var list = ele.getAttribute("list")
        if (list) {
            ele.parentNode.removeChild(document.getElementById(list));
        }

        var rd = Math.floor(Math.random() * 999999);

        var datalist = document.createElement("datalist");
        val.forEach(function (item, i) {
            var option = document.createElement("option");
            option.setAttribute("label", item);
            option.setAttribute("value", item);
            self.InheritProperties(ele, option, val, i);
            option.owner = ele;
            datalist.appendChild(option);
        });
        datalist.setAttribute("id", "list-" + rd);
        ele.setAttribute("list", "list-" + rd);
        ele.parentNode.appendChild(datalist);
    }

    this.oo(new BaseConvMgr.DefaultListConverter());
}
BaseConvMgr.SimpleEditSelectItemConv = function () {

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.ApplyValue = function (ele, val) {
        ele.owner.value = val;
    }

    this.oo(new BaseConvMgr.DefaultValueConverter());
}

//选择框
BaseConvMgr.SelectConv = function (divstyles) {

    var self = this;

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.ApplyValue = function (ele, val) {
        if (!ele.owner) {

            var div = document.createElement("div");
            div.style.cssText = "border:solid 1px #666;display:block;overflow:hidden;padding-right:1px;";
            if (divstyles) divstyles.forEach(function (item) { div.style[item.name] = item.value; });
            div.style.width = ele.offsetWidth + "px";
            ele.style.width = (ele.offsetWidth + 20) + "px";
            ele.parentNode.replaceChild(div, ele);
            div.appendChild(ele);
            ele.owner = div;
        }

        ele.innerHTML = "";

        val.forEach(function (item, i) {
            var option = document.createElement("option");
            option.setAttribute("label", item[ele.getAttribute("displaymember")]);
            option.setAttribute("value", item[ele.getAttribute("valuemember")]);
            self.InheritProperties(ele, option, val, i);
            ele.appendChild(option);
        });

    }

    this.oo(new BaseConvMgr.DefaultListConverter());
}
BaseConvMgr.SelectItemConv = function () {

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.ApplyValue = function (ele, val) {
        ele.parentNode.value = val;
    }

    this.oo(new BaseConvMgr.DefaultValueConverter());
}


BaseConvMgr.SelectedPKValueConv = function () {
    this.CompareValues = function (val1, val2) {
        return 1;
    }

    this.GetUIValue = function (ele) {
        return ele.__bindedData;
    }
    this.ApplyValue = function (ele, val) {
        var tableviewex = ele.parentNode._tableviewex;
        if (tableviewex) tableviewex.setItemSelected(function (item, i) { return item[ele.parentNode.getAttribute("valuemember")] == val; })
    }
    this.oo(new BaseConvMgr.DefaultValueConverter());
}

BaseConvMgr.SearchConv = function (condfield) {

    var self = this;

    this.DecodeArguments = function (ele, args) {
        return args[0];
    }

    this.GetUIValue = function (ele) {
        return ele.value;
    }

    this.GetValue = function (ele) {
        return ele.value;
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

    this.ApplyValue = function (ele, val) {

        ele.onchange = function () {
            changeFieldValue(ele);
        }

        ele.onkeyup = function () {
            //            setTimeout(function () {
            //                document.getElementById("test").innerText = ele.value;            
            //            });
            //            alert(ele.value);
            //            document.getElementById("test").innerText = ele.value;
            ele.setAttribute("command", "ICD10List");
            ele.setAttribute("condfields", "CurrICD10Code");
            commit(ele);
        }

        ele.value = val;
    }

    this.oo(new BaseConvMgr.DefaultListConverter());

}
BaseConvMgr.SearchListConv = function () {

    var self = this;

    this.DecodeArguments = function (ele, args) {
        return args;
    }
    this.GetUIValue = function (ele) {
        return ele.value;
    }
    this.ApplyValue = function (ele, val) {

        //        document.getElementById("test").innerText = val.toJSONString();
        ele.innerHTML = "";
        val.forEach(function (item, i) {
            var option = document.createElement("option");
            option.setAttribute("label", item[ele.getAttribute("displaymember")]);
            option.setAttribute("value", item[ele.getAttribute("displaymember")]);
            ele.appendChild(option);
        });

    }

    this.oo(new BaseConvMgr.DefaultValueConverter());

}
//lml
function TableViewConv(params, style) {
    Form_ListValueConv.apply(this);
    this.FormatRowCell = function (t, ri, ci, r, c) {
        return r[c.Name] ? (r[c.Name] + "").replace(/^\s+|\s+$/g, "") : "";
    }
    this.StyleRowCell = function (t, ri, ci, r, c) {
        var table = t.TableElement();
        var rmvList = [];
        var addList = [];
        if (table.__currData == r) {
            rmvList[rmvList.length] = style.unselected;
            addList[addList.length] = style.selected;
        } else {
            rmvList[rmvList.length] = style.selected;
            addList[addList.length] = style.unselected;
        }
        return { "rmvList": rmvList, "addList": addList };
    }
    this.DrawRowCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            var result = self.StyleRowCell(t, ri, ci, r, c, e);
            var cs = css(e);
            for (var i = 0; i < result.rmvList.length; i++) {
                cs.Remove(result.rmvList[i]);
            }
            for (var i = 0; i < result.addList.length; i++) {
                cs.Add(result.addList[i]);
            }
            e.title = e.innerText = self.FormatRowCell(t, ri, ci, r, c);
            return true;
        }
    } (this);
    this.DrawRow = function (t, ri, ci, r, c, e) {
    }
    this.DrawHeaderCell = function (t, ri, ci, r, c, e) {
    }
    this.DrawHeader = function (t, ri, ci, r, c, e) {
    }
    this.DrawCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            if (ri > -1) {
                if (ci > -1) {
                    return self.DrawRowCell(t, ri, ci, r, c, e);
                }
                else {
                    return self.DrawRow(t, ri, ci, r, c, e);
                }
            }
            else {
                if (ci > -1) {
                    return self.DrawHeaderCell(t, ri, ci, r, c, e);
                }
                else {
                    return self.DrawHeader(t, ri, ci, r, c, e);
                }
            }
        }
    } (this);
    this.ApplyValue = function (self) {
        return function (root, val) {
            var tv = new TableView(root, params, style);
            tv.Columns.Clear();
            tv.Rows.Clear();

            var table = tv.TableElement();
            tv.DrawCell = self.DrawCell;

            var columns = null;
            try {
                columns = eval("(" + root.getAttribute("Columns") + ")");
            } catch (err) {
                columns = [];
            }
            for (var i = 0; i < columns.length; i++) {
                tv.Columns.Add(columns[i]);
            }
            self.InheritProperties(root, table);
            table.__tv = tv;
            var token = Math.random() + "_" + Math.random();
            root.__token = token;
            clearTimeout(root.__timeout);
            root.__timeout = loadChannel(tv, root, val, 0, token);

            function loadChannel(tv, root, data, pos, token) {
                if (root.__token != token) return 0;
                var batch = 10;
                var last = pos + batch;
                if (last > data.length) last = data.length;
                for (var i = pos; i < last; i++) {
                    tv.Rows.Add(data[i]);
                }
                if (last < data.length) {
                    return setTimeout(function () {
                        loadChannel(tv, root, data, last, token);
                    }, 300);
                }
                return 0;
            }
        }
    } (this);
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "TableViewConv.CurrTableRowConv", true);
        Form.InheritAttributes(srcElement, desElement);
    }
    TableViewConv.CurrTableRowConv = function () {
        Form_SingleValueConv.apply(this);
        this.GetUIValue = function (root) {
            var valueMember = root.getAttribute("valueMember");
            return root.__currData ? root.__currData[valueMember] : null;
        }
        this.ApplyValue = function (self) {
            return function (root, val) {
                var valueMember = root.getAttribute("valueMember");
                var oldValue = self.GetValue(root);
                var tv = root.__tv;
                root.__currData = null;
                tv.Rows.Update(function (v, i, r) {
                    return r[valueMember] == oldValue;
                })
                tv.Rows.Update(function (v, i, r) {
                    if (r[valueMember] != val) return false;
                    root.__currData = r;
                    return true;
                })
            }
        } (this);
    }
}


function TwoLevelTableViewConv_tmp(params, style) {
    Form_ListValueConv.apply(this);
    var subViewProperties = {};
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function (srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "TwoLevelTableViewConv_tmp.CurrTableRowConv", true);
        inheritProperties_base(srcElement, desElement);
    }
    this.FormatRowCell = function (t, ri, ci, r, c) {
        return r[c.Name] ? (r[c.Name] + "").replace(/^\s+|\s+$/g, "") : "";
    }
    this.SubViewProperties = function () {
        return subViewProperties;
    }
    this.StyleRowCell = function (t, ri, ci, r, c) {
        var table = t.TableElement();
        var rmvList = [];
        var addList = [];
        if (table.__currData == r) {
            rmvList[rmvList.length] = style.unselected;
            addList[addList.length] = style.selected;
        } else {
            rmvList[rmvList.length] = style.selected;
            addList[addList.length] = style.unselected;
        }
        return { "rmvList": rmvList, "addList": addList };
    }
    this.DrawRowCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            var result = self.StyleRowCell(t, ri, ci, r, c, e);
            var cs = css(e);
            for (var i = 0; i < result.rmvList.length; i++) {
                cs.Remove(result.rmvList[i]);
            }
            for (var i = 0; i < result.addList.length; i++) {
                cs.Add(result.addList[i]);
            }
            e.title = e.innerText = self.FormatRowCell(t, ri, ci, r, c);
            return true;
        }
    } (this);
    this.DrawRow = function (t, ri, ci, r, c, e) {
        e.onclick = function () {
            var table = t.TableElement();
            table.__currData = r;
            changeFieldValue(table);
        }
    }
    this.DrawHeaderCell = function (t, ri, ci, r, c, e) {
    }
    this.DrawHeader = function (t, ri, ci, r, c, e) {
    }
    this.DrawRowCommandCell = function (t, ri, ci, r, c, e) {
    }

    this.FormatSubRowCell = function (t, ri, ci, r, c) {
        return r[c.Name] ? (r[c.Name] + "").replace(/^\s+|\s+$/g, "") : "";
    }
    this.StyleSubRowCell = function (t, ri, ci, r, c) {
        var table = t.TableElement();
        var rmvList = [];
        var addList = [];
        if (table.__currData == r) {
            rmvList[rmvList.length] = style.unselected;
            addList[addList.length] = style.selected;
        } else {
            rmvList[rmvList.length] = style.selected;
            addList[addList.length] = style.unselected;
        }
        return { "rmvList": rmvList, "addList": addList };
    }
    this.DrawSubRowCell = function (self) {
        return function (t, ri, ci, r, c, e) {
            var result = self.StyleRowCell(t, ri, ci, r, c, e);
            var cs = css(e);
            for (var i = 0; i < result.rmvList.length; i++) {
                cs.Remove(result.rmvList[i]);
            }
            for (var i = 0; i < result.addList.length; i++) {
                cs.Add(result.addList[i]);
            }
            e.title = e.innerText = self.FormatRowCell(t, ri, ci, r, c);
            return true;
        }
    } (this);
    this.DrawSubRow = function (t, ri, ci, r, c, e) {
        e.onclick = function () {
            var table = t.Parent.TableElement();
            table.__currData = t.__data;
            changeFieldValue(table);
        }
    }
    this.DrawSubHeaderCell = function (t, ri, ci, r, c, e) {
        e.onclick = function () {
            var table = t.Parent.TableElement();
            table.__currData = t.__data;
            changeFieldValue(table);
        }
    }
    this.DrawSubHeader = function (t, ri, ci, r, c, e) {
    }
    this.DrawSubRowCommandCell = function (t, ri, ci, r, c, e) {
    }
    this.ApplyValue = function (self) {
        return function (root, val) {
            var valueMember = root.getAttribute("itemValueMember");
            subViewProperties.subViewFormID = root.getAttribute("subViewFormID");
            subViewProperties.subViewMember = root.getAttribute("subViewMember");
            subViewProperties.subViewField = root.getAttribute("subViewField");
            subViewProperties.subViewCommand = root.getAttribute("subViewCommand");
            subViewProperties.subViewValueMember = root.getAttribute("subViewValueMember");
            var tv = root.__tv;
            if (!tv) tv = root.__tv = new TableView(root, params, style);
            tv.Columns.Clear();
            tv.Rows.Clear();
            var table = tv.TableElement();
            table.__tv = tv;
            self.InheritProperties(root, table);
            tv.DrawCell = function (t, ri, ci, r, c, e) {
                if (t == tv) {
                    if (ri > -1) {
                        if (ci > -1) {
                            if (c.Command) {
                                switch (c.Command) {
                                    case "ShiftSubView":
                                        if (e.children.length == 0) {
                                            var img = e.ownerDocument.createElement("img");
                                            img.src = "../../../img/加号.png";
                                            img.title = "展开";
                                            e.appendChild(img);
                                        }
                                        var table = t.TableElement();
                                        e.onclick = function () {
                                            table.__currData = r;
                                            changeFieldValue(table);
                                            var sv = t.SubView(ri, true);
                                            if (sv) {
                                                if (sv.getUnfolded()) {
                                                    sv.Fold();
                                                    e.children[0].src = "../../../img/加号.png";
                                                    e.children[0].title = "展开";
                                                } else {
                                                    sv.Unfold();
                                                    e.children[0].src = "../../../img/减号.png";
                                                    e.children[0].title = "合并";
                                                }
                                            } else {
                                                sv = t.SubView(ri);
                                                var cols = sv.getColumns();
                                                var columns = null;
                                                try {
                                                    columns = eval("(" + root.getAttribute("subColumns") + ")");
                                                } catch (err) {
                                                    columns = [];
                                                }
                                                for (var i = 0; i < columns.length; i++) {
                                                    cols.Add(columns[i]);
                                                }
                                                e.__sv = sv;

                                                e.setAttribute("conv", "TwoLevelTableViewConv_tmp.SubTableViewConv(" + r[valueMember].toJSONString() + ")");
                                                e.setAttribute("valueMember", valueMember);
                                                e.setAttribute("subViewMember", subViewProperties.subViewMember);
                                                e.setAttribute("field", subViewProperties.subViewField);
                                                e.setAttribute("command", subViewProperties.subViewCommand);
                                                e.setAttribute("subViewValueMember", subViewProperties.subViewValueMember);
                                                e.setAttribute("formID", subViewProperties.subViewFormID);
                                                commit(e);

                                                if (sv.getUnfolded()) {
                                                    e.children[0].src = "../../../img/减号.png";
                                                    e.children[0].title = "合并";
                                                }
                                            }
                                            sv.__data = r;
                                        }
                                        break;
                                    default:
                                        self.DrawRowCommandCell(t, ri, ci, r, c, e);
                                        break;
                                }
                                return true;
                            }
                            else {
                                return self.DrawRowCell(t, ri, ci, r, c, e);
                            }
                        }
                        else {
                            return self.DrawRow(t, ri, ci, r, c, e);
                        }
                    }
                    else {
                        if (ci > -1) {
                            return self.DrawHeaderCell(t, ri, ci, r, c, e);
                        }
                        else {
                            return self.DrawHeader(t, ri, ci, r, c, e);
                        }
                    }
                } else {
                    if (ri > -1) {
                        if (ci > -1) {
                            if (c.Command) {
                                self.DrawSubRowCommandCell(t, ri, ci, r, c, e);
                                return true;
                            }
                            else {
                                return self.DrawSubRowCell(t, ri, ci, r, c, e);
                            }
                        }
                        else {
                            return self.DrawSubRow(t, ri, ci, r, c, e);
                        }
                    }
                    else {
                        if (ci > -1) {
                            return self.DrawSubHeaderCell(t, ri, ci, r, c, e);
                        }
                        else {
                            return self.DrawSubHeader(t, ri, ci, r, c, e);
                        }
                    }

                }
            };

            var columns = null;
            try {
                columns = eval("(" + root.getAttribute("Columns") + ")");
            } catch (err) {
                columns = [];
            }
            for (var i = 0; i < columns.length; i++) {
                tv.Columns.Add(columns[i]);
            }
            var token = Math.random() + "_" + Math.random();
            root.__token = token;
            clearTimeout(root.__timeout);
            root.__timeout = loadChannel(tv, root, val, 0, token);
            function loadChannel(tv, root, data, pos, token) {
                if (root.__token != token) return 0;
                var batch = 10;
                var last = pos + batch;
                if (last > data.length) last = data.length;
                for (var i = pos; i < last; i++) {
                    tv.Rows.Add(data[i]);
                }
                if (last < data.length) {
                    return setTimeout(function () {
                        loadChannel(tv, root, data, last, token);
                    }, 300);
                }
                return 0;
            }
        }
    } (this);
    TwoLevelTableViewConv_tmp.CurrTableRowConv = function () {
        Form_SingleValueConv.apply(this);
        this.GetUIValue = function (ele) {
            var valueMember = ele.getAttribute("valueMember");
            return ele.__currData ? ele.__currData[valueMember] : null;
        }
        this.ApplyValue = function (self) {
            return function (ele, val) {
                var oldValue = self.GetValue(ele);
                var tv = ele.__tv;
                ele.__currData = null;
                var index = -1;
                var valueMember = ele.getAttribute("valueMember");
                tv.Rows.Update(function (v, i, r) {
                    return r[valueMember] == oldValue;
                })
                tv.Rows.Update(function (v, i, r) {
                    if (r[valueMember] != val) return false;
                    ele.__currData = r;
                    index = i;
                    return true;
                })
            }
        } (this);
    }

    TwoLevelTableViewConv_tmp.SubTableViewConv = function (currData) {
        Form_SingleValueConv.apply(this);
        this.GetUIValue = function (ele) {
            return currData;
        }
        this.DetermineApply = function (self) {
            return function (ele, val) {
                var valueMember = ele.getAttribute("valueMember");
                return val != null && val[valueMember] == currData;
            }
        } (this);
        this.ApplyValue = function (self) {
            return function (ele, val) {
                var sv = ele.__sv;
                if (sv) {
                    var rows = sv.getRows();
                    rows.Clear();
                    var subViewMember = ele.getAttribute("subViewMember");
                    if (val[subViewMember]) {
                        for (var i = 0; i < val[subViewMember].length; i++) {
                            rows.Add(val[subViewMember][i]);
                        }
                    }
                    sv.Unfold();
                }
            }
        } (this);
    }
}


function LikeSearchConv(args) {
    this.ApplyValue = function (ele, val) {
        if (val) {
            var string = val.replace(/%/g,"");
            ele.value = string;
        }else {
            ele.value="";
        }
    }
    this.GetUIValue = function (ele) {
        var string=ele.value;
        if (args=='Left') {
            return '%' + string;
        }else if (args =='Right') {
            return string +'%';
        }else if (args == 'All') {
            return '%'+string+'%';
        }else{
            return ele.value;
        }
    }
    this.oo(new Form_SingleValueConv());
}