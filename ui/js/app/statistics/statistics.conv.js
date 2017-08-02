function ReadOnlyTileItemListConv(style) {
    this.ApplyValue = function (self) {
        return function (ele, value) {
            ele.innerHTML = "";
            if (!value) return;
            var brother = [];
            for (var i = 0; i < value.length; i++) {
                var span = document.createElement("span");
                span.style.margin = "4px";
                ele.appendChild(span);

                span.brother = brother;
                brother[brother.length] = span;

                span.onclick = function (e) {
                    return function () {
                        e.__selected = !e.__selected;
                        setStyle(e, e.children[0], e.children[1]);
                    };
                } (span);

                span.__bindedData = value[i];

                var lab = document.createElement("span");
                lab.innerText = '□  ';
                lab.textContent = '□  ';

                var text = document.createElement("span");
                text.innerText = span.__bindedData[ele.getAttribute("displayMember")];
                text.textContent = span.__bindedData[ele.getAttribute("displayMember")];
                span.appendChild(lab);
                span.appendChild(text);

                span.title = span.__bindedData[ele.getAttribute("displayMember")];
                self.InheritProperties(ele, span, value, i);

                setStyle(span, lab, text);
            }
        }
    } (this);
    function setStyle(span, label, text) {
        if (span.__selected) {
            label.innerText = '■  ';
            label.textContent = '■  ';
            css(span).Remove(style.unselectedItem);
            css(span).Add(style.selectedItem);
            css(label).Remove(style.unselectedLabel);
            css(label).Add(style.selectedLabel);
            css(text).Remove(style.unselectedText);
            css(text).Add(style.selectedText);
        }
        else {
            label.innerText = '□  ';
            label.textContent = '□  ';
            css(span).Remove(style.selectedItem);
            css(span).Add(style.unselectedItem);
            css(label).Remove(style.selectedLabel);
            css(label).Add(style.unselectedLabel);
            css(text).Remove(style.selectedText);
            css(text).Add(style.unselectedText);
        }
    }
    this.GetUIValue = function (ele) {
        var result = [];
        for (var i = 0; i < ele.children.length; i++) {
            var span = ele.children[i];
            if (span.__selected) result[result.length] = span.__bindedData[ele.getAttribute("valueMember")];
        }
        return result;
    }
    this.oo(new Form_ListValueConv());
}
function HistogramStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var data = [];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                data[i] = { 'DESC': val[i].Key, 'X': i + 1, 'Y': val[i].Value };
            }
        }
        Histogram(ele, data, "DESC", "X", "Y", style);
    }
    this.oo(new Form_SingleValueConv());
}
function BePositiveHistogramStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var data = [];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                switch (val[i].Key) {
                    case '阳性':
                        data[i] = { 'DESC': '阳性', 'X': i + 1, 'Y': val[i].Value };
                        break;
                    case '阴性':
                        data[i] = { 'DESC': '阴性', 'X': i + 1, 'Y': val[i].Value };
                        break;
                    default:
                        data[i] = { 'DESC': '待定', 'X': i + 1, 'Y': val[i].Value };
                        break;
                }
            }
        }
        Histogram(ele, data, "DESC", "X", "Y", style);
    }
    this.oo(new HistogramStatisticsConv());
}
function TableStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var columns = eval("(" + ele.getAttribute("columns") + ")");
        var rows = val;
        ele._columns = columns;
        ele._rows = rows;
        Table(ele, columns, rows, style);
    }
    this.oo(new Form_SingleValueConv());
}
function TableStatisticsFindingConv(style) {
    this.GetValue = this.GetUIValue = function (ele) {
        var rows = ele._rows;
        var columns = ele._columns;
        var Key = new Array();
        var Title = new Array();
        if (columns != null) {
            if (rows[0].ModalityName != columns[0].DisplayText) {
                    Title[0] = columns[0].DisplayText;
                    Title[1] = columns[1].DisplayText;
                    Title[2] = columns[2].DisplayText;
                    Title[3] = columns[3].DisplayText;
                    Title[4] = columns[4].DisplayText;
                    Title[5] = columns[5].DisplayText;
            }

            for (var i = 0; i < rows.length; i++) {
                Key[i] = new Array();
                Key[i][0] = rows[i].ModalityName;
                Key[i][1] = rows[i].PatientName;
                Key[i][2] = rows[i].PatientSexName;
                Key[i][3] = rows[i].PatientID;
                Key[i][4] = rows[i].PatientAge;
                Key[i][5] = rows[i].Impression;
            }


            return { "ExportType": "xls", "Columns": Title, "Rows": Key}.toJSONString();
        }
    }
    this.ApplyValue = function (ele, val) {
        var columns = eval("(" + ele.getAttribute("columns") + ")");
        var rows = [];
        var z = 0;
        for (var i = 0; i < val.length; i++) {
            for (var i1 = 0; i1 < val[i].Value.length; i1++) {
                for (var i2 = 0; i2 < val[i].Value[i1].Value.length; i2++) {
                    for (var i3 = 0; i3 < val[i].Value[i1].Value[i2].Value.length; i3++) {
                        for (var i4 = 0; i4 < val[i].Value[i1].Value[i2].Value[i3].Value.length; i4++) {
                            for (var i5 = 0; i5 < val[i].Value[i1].Value[i2].Value[i3].Value[i4].Value.length; i5++) {
                                rows.push({ 'ModalityName': val[i].Key, 'PatientName': val[i].Value[i1].Key, 'PatientID': val[i].Value[i1].Value[i2].Key, 'PatientSexName': val[i].Value[i1].Value[i2].Value[i3].Key, 'PatientAge': val[i].Value[i1].Value[i2].Value[i3].Value[i4].Key, 'Impression': val[i].Value[i1].Value[i2].Value[i3].Value[i4].Value[i5].Key });
                                z++;
                            }
                        }
                    }
                }
            }
        }

        ele._columns = columns;
        ele._rows = rows;
        Table(ele, columns, rows, style);
    }
    this.oo(new Form_SingleValueConv());
}
function BePositiveTableStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var rows = [];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                switch (val[i].Key) {
                    case '阳性':
                        rows[i] = { 'Key': '阳性', 'Value': val[i].Value };
                        break;
                    case '阴性':
                        rows[i] = { 'Key': '阴性', 'Value': val[i].Value };
                        break;
                    default:
                        rows[i] = { 'Key': '待定', 'Value': val[i].Value };
                        break;
                }
            }
        }
        var columns = eval("(" + ele.getAttribute("columns") + ")");
        Table(ele, columns, rows, style);
    }
    this.oo(new TableStatisticsConv());
}
function SectorStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var data = [];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                data[i] = { 'DESC': val[i].Key, 'Value': val[i].Value };
            }
        }
        Sector(ele, data, "DESC", "Value", style);
    }
    this.oo(new Form_SingleValueConv());
}
function BePositiveSectorStatisticsConv(style) {
    this.ApplyValue = function (ele, val) {
        var data = [];
        if (val) {
            for (var i = 0; i < val.length; i++) {
                switch (val[i].Key) {
                    case '阳性':
                        data[i] = { 'DESC': '阳性', 'Value': val[i].Value };
                        break;
                    case '阴性':
                        data[i] = { 'DESC': '阴性', 'Value': val[i].Value };
                        break;
                    default:
                        data[i] = { 'DESC': '待定', 'Value': val[i].Value };
                        break;
                }
            }
        }
        Sector(ele, data, "DESC", "Value", style);
    }
    this.oo(new SectorStatisticsConv());
}
function selectPage(page) {
    var header = document.getElementById("header");
    for (var i = 0; i < header.children.length; i++) {
        if (header.children[i].getAttribute("name") == page) {
            header.children[i].className = "selectedTabPage";
        }
        else {
            header.children[i].className = "unselectedTabPage";
        }
    }

    var canvas = document.getElementById("canvas");
    for (var i = 0; i < canvas.children.length; i++) {
        if (canvas.children[i].getAttribute("name") == page) {
            canvas.children[i].style.display = "";
        }
        else {
            canvas.children[i].style.display = "none";
        }
    }
}