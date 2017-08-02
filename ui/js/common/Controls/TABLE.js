/*

created by 王安茂 at 2015/5/1
mark: 表格控件

*/

//ui.js
//json.js
//override.js

var TABLE = new function () {

    //数据源类型
    this.DataSource = function () {

        var self = this;

        this.columns = [];
        this.columns.add = function (item) {
            if (self.rows.length != 0) { throw new Error("add column error, rows is not empty!"); return; }
            Array.prototype.add.call(this, item);
        }

        this.rows = [];
    }

    var TableView = function (div) {

        var root = div;
        var self = this;

        //数据源
        this.dataSource = null;

        //初始化
        root.innerHTML = "";
        var divhead = document.createElement("div");
        root.appendChild(divhead);
        var tablehead = document.createElement("table");
        divhead.appendChild(tablehead);
        var tbodyhead = document.createElement("tbody");
        tablehead.appendChild(tbodyhead);
        this.tableHead = tablehead;

        var divbody = document.createElement("div");
        root.appendChild(divbody);
        var tablebody = document.createElement("table");
        divbody.appendChild(tablebody);
        var tbodybody = document.createElement("tbody");
        tablebody.appendChild(tbodybody);
        this.tableBody = tablebody;

        //滚动
        divbody.onscroll = function () { divhead.scrollLeft = divbody.scrollLeft; };

        root.style.position = "relative";
        divhead.style.cssText = "width: 100%;overflow-x: hidden;border:0;border-bottom:solid 1px #CCCCCC;margin:0;padding:0;";
        tablehead.style.cssText = "white-space: nowrap; table-layout: fixed; border-collapse:collapse; overflow:hidden;";

        divbody.style.cssText = "width: 100%; overflow-x: auto; overflow-y:auto;margin:0;padding:0;display:block;position:absolute;top:36px;bottom:0px";
        tablebody.style.cssText = "white-space: nowrap; table-layout: fixed;overflow:scroll; border-collapse:collapse;";

        //暴露的委托
        this.ontablecontextmenu = function (sender, e) { };
        this.ontablemousedown = function (sender, e) { };
        this.ontablemousemove = function (sender, e) { };
        this.ontablemouseup = function (sender, e) { };
        this.ontablecelldraw = function (ele, data, index) { ele.innerHTML = data.value; };

        this.applyEvent = function (ele, e) {
            e = e || window.event;
            e.rowIndex = ele.tagName == "TH" ? ele.parentNode.rowIndex - 1 : ele.parentNode.rowIndex;
            e.columnIndex = ele.cellIndex;
            e.dataSource = self.dataSource;
            return e;
        };

        //设置元素若干属性
        var apply = function (ele, index, val, ordercolumns) {

            var data = { "value": val, "column": ordercolumns[index.columnIndex] };
            self.ontablecelldraw(ele, data, index);

            ele.oncontextmenu = function (e) { e = self.applyEvent(this, e); self.ontablecontextmenu(this, e); };
            ele.onmousedown = function (e) { e = self.applyEvent(this, e); self.ontablemousedown(this, e); };
            ele.onmousemove = function (e) { e = self.applyEvent(this, e); self.ontablemousemove(this, e); };
            ele.onmouseup = function (e) { e = self.applyEvent(this, e); self.ontablemouseup(this, e); };


            ele.style.textAlign = "center";
            ele.style.width = ordercolumns[index.columnIndex].Width + "px";
            ele.style.display = ordercolumns[index.columnIndex].Visiable ? "" : "none";

        }

        //显示标题
        var initColumns = function () {

            var thead = tbodyhead;
            while (thead.hasChildNodes()) thead.deleteRow(0);

            var tr = document.createElement("tr");
            thead.appendChild(tr);

            var ordercolumns = self.dataSource.columns.orderBy(function (item) { return item.DisplayNO; });
            ordercolumns.forEach(function (item, index) {
                var th = document.createElement("th");
                tr.appendChild(th);
                apply(th, { rowIndex: -1, columnIndex: index }, item.Description, ordercolumns);
            });

            //为了使水平滚动条正常
            var th = document.createElement("th");
            th.style.width = "1000px";
            tr.appendChild(th);
        }

        //显示数据
        var loadData = function () {

            var tbody = tbodybody;
            while (tbody.hasChildNodes()) tbody.deleteRow(0);

            //双层循环遍历
            var ordercolumns = self.dataSource.columns.orderBy(function (item) { return item.DisplayNO; });
            var rows = self.dataSource.rows;

            rows.forEach(function (ritem, rindex) {

                var tr = document.createElement("tr");
                tr.setAttribute("class", "tr1");
                tbody.appendChild(tr);

                ordercolumns.forEach(function (citem, cindex) {

                    var td = document.createElement("td");
                    tr.appendChild(td);

                    apply(td, { rowIndex: rindex, columnIndex: cindex }, ritem[citem.Name], ordercolumns);
                });
            });
        }

        //数据绑定
        this.dataBind = function () {

            initColumns();
            loadData();
        }

    }
    this.TableView = TableView;

    this.TableViewEx = function (ele) {

        var divRoot = $Array(ele.children).first(function (item) { return item.getAttribute("name") == "table" })
        if (divRoot) table.innerHTML = "";
        else {
            divRoot = document.createElement("div");
            divRoot.setAttribute("name", "table");
            divRoot.style.height = "100%";
            ele.appendChild(divRoot);
        }

        var root = divRoot;
        var tv = new TableView(root);
        var dvs = null;
        var self = this;

        //选中行相关
        var selectedRowIndex = null;
        var selectedValue = null;

        var changeSelectItem = function (oldIndex, newIndex) {
            selectedValue = dvs.rows[newIndex];
            selectedRowIndex = newIndex;

            var trs = root.children[1].children[0].children[0].children;
            if (oldIndex != null && oldIndex != undefined && oldIndex >= 0) {
                ElementCollectionToArray(trs[oldIndex].children).forEach(function (item, i) {
                    item.style.backgroundColor = "";
                    item.style.color = "#000000";
                });
            }
            if (newIndex >= 0) $Array(trs[newIndex].children).forEach(function (item, i) {
                item.style.color = "#FFFFFF";
                item.style.backgroundColor = "#58c4a0";
            });
        }

        this.setItemSelected = function (match) {
            var index = -1;
            dvs.rows.forEach(function (item, i) {
                if (match(item, i)) index = i;
            });

            changeSelectItem(selectedRowIndex, index);
        }

        this.getSelectedValue = function () { return selectedValue; }
        this.getSelectedRowIndex = function () { return selectedRowIndex; };

        tv.ontablecontextmenu = function (sender, e) {

            e = tv.applyEvent(sender, e);

            selectedValue = null;

            if (e.rowIndex != -1) {
                changeSelectItem(selectedRowIndex, e.rowIndex);
                self.onrowselect(e.rowIndex);
                self.ontablecontextmenu(e);
            }

        };

        tv.ontablemousedown = function (sender, e) { };
        tv.ontablemousemove = function (sender, e) { };
        tv.ontablemouseup = function (sender, e) { };

        this.onsort = function (e) { }
        this.ontablecelldraw = function (ele, data, index) { }
        this.onrowselect = function (rowindex) { }
        this.ontablecontextmenu = function (e) { }

        tv.ontablecelldraw = function (ele, data, index) {

            if (index.rowIndex == -1) ele.parentElement.style.cursor = "pointer";

            self.ontablecelldraw(ele, data, index);

            ele.onclick = function (e) {

                e = tv.applyEvent(this, e);

                selectedValue = null;

                if (e.rowIndex != -1) {
                    changeSelectItem(selectedRowIndex, e.rowIndex);
                    self.onrowselect(e.rowIndex);
                }
                else {
                    //排序为什么要改到这里
                    self.onsort(e);
                }
            }

        };

        //数据绑定
        this.dataBind = function (_dvs) {
            tv.dataSource = _dvs;
            dvs = tv.dataSource;
            tv.dataBind();
            selectedRowIndex = null;
        };

    }

    this.PageManager = function (ele) {

        ele.innerHTML = "";

        ele.pageManager = this;

        var table1 = document.createElement('table');
        ele.appendChild(table1);
        var tbody1 = document.createElement('tbody');
        table1.appendChild(tbody1);
        var tr1 = document.createElement('tr');
        tbody1.appendChild(tr1);
        var td1 = document.createElement('td');
        tr1.appendChild(td1);
        var span1 = document.createElement('span');
        span1.innerText = "每页显示";
        td1.appendChild(span1);
        var input1 = document.createElement('input');
        input1.style.cssText = "width:50px;text-align:center;border:solid 1px #E0E0E0;";
        span1.appendChild(input1);
        var span2 = document.createElement('span');
        span2.innerText = "条记录";
        span1.appendChild(span2);

        var td22 = document.createElement('td');
        tr1.appendChild(td22);
        var input22 = document.createElement('input');
        input22.style.cssText = "margin: 4px 0 0 0; padding:0px 5px;width:50px;line-height:18px;height:18px;border:0;float:left;text-align:center;color:#000000;cursor:pointer;display:block;font-weight:bold;font-size:10pt;";
        input22.setAttribute("type", "button");
        input22.value = "首页";
        td22.appendChild(input22);

        var td2 = document.createElement('td');
        tr1.appendChild(td2);
        var input2 = document.createElement('input');
        input2.style.cssText = "margin-top:4px; padding:0px 5px;width:30px;line-height:18px;height:18px;border:0;float:left;text-align:center;color:#000000;cursor:pointer;display:block;font-weight:bold;font-size:12pt;";
        input2.setAttribute("type", "button");
        input2.value = "«";
        td2.appendChild(input2);
        var td3 = document.createElement('td');
        tr1.appendChild(td3);
        var input3 = document.createElement('input');
        input3.style.cssText = "width:50px;text-align:center;border:solid 1px #E0E0E0;";
        td3.appendChild(input3);
        var td4 = document.createElement('td');
        td4.innerText = "/";
        tr1.appendChild(td4);
        var td5 = document.createElement('td');
        tr1.appendChild(td5);
        var input4 = document.createElement('input');
        input4.style.cssText = "width:50px;text-align:center;border:solid 1px #E0E0E0;";
        input4.setAttribute("readOnly", "true");
        td5.appendChild(input4);
        var td6 = document.createElement('td');
        tr1.appendChild(td6);
        var input5 = document.createElement('input');
        input5.style.cssText = "margin-top:4px; padding:0px 5px;width:30px;line-height:18px;height:18px;border:0;float:left;text-align:center;color:#000000;cursor:pointer;display:block;font-weight:bold;font-size:12pt;";
        input5.setAttribute("type", "button");
        input5.value = "»";
        td6.appendChild(input5);

        var td66 = document.createElement('td');
        tr1.appendChild(td66);
        var input55 = document.createElement('input');
        input55.style.cssText = "margin: 4px 0 0 0; padding:0px 5px;width:50px;line-height:18px;height:18px;border:0;float:left;text-align:center;color:#000000;cursor:pointer;display:block;font-weight:bold;font-size:10pt;";
        input55.setAttribute("type", "button");
        input55.value = "尾页";
        td66.appendChild(input55);

        var td8 = document.createElement('td');
        tr1.appendChild(td8);
        var input7 = document.createElement('input');
        input7.style.cssText = "margin: 4px 0 0 0; padding:0px 5px;width:50px;line-height:18px;height:18px;border:0;float:left;text-align:center;color:#000000;cursor:pointer;display:block;font-weight:bold;font-size:10pt;";
        input7.setAttribute("type", "button");
        input7.value = "跳转";
        td8.appendChild(input7);


        var td7 = document.createElement('td');
        tr1.appendChild(td7);
        var span3 = document.createElement('span');
        span3.innerText = "总计";
        span3.style.cssText = "font-size:8pt;";
        td7.appendChild(span3);
        var input6 = document.createElement('input');
        input6.style.cssText = "width:50px;text-align:center;border:solid 1px #E0E0E0;";
        input6.setAttribute("readOnly", "true");
        span3.appendChild(input6);
        var span4 = document.createElement('span');
        span4.innerText = "条记录";
        span3.appendChild(span4);

        var CheckValueValidate = function () {

            if (isNaN(input3.value)) return false;
            if (isNaN(input1.value)) return false;
            if (Number(input3.value) <= 0 || Number(input3.value) > Number(input4.value)) return false;
            if (Number(input1.value) <= 0 || Number(input1.value) > 501) return false;
            return true;
        };

        var SetStatus = function () {

            if (Number(input3.value) <= 1) {
                input2.disabled = true;
                input22.disabled = true;
            }
            else {
                input2.disabled = false;
                input22.disabled = false;
            }

            if (Number(input3.value) >= Number(input4.value)) {
                input5.disabled = true;
                input55.disabled = true;
            }
            else {
                input5.disabled = false;
                input55.disabled = false;
            }

        }

        input1.onchange = function () {

            if (!CheckValueValidate()) {
                input1.value = input1.dataObject[input1.dataMember];
                return;
            }
            input1.dataObject[input1.dataMember] = input1.value;
            SetStatus();
            ele.onchange();
        };

        input22.onclick = function () {
            input3.value = "1";
            input3.dataObject[input3.dataMember] = input3.value;
            SetStatus();
            ele.onchange();
        }

        input2.onclick = function () {
            input3.value = (Number(input3.value) - 1).toString();
            input3.dataObject[input3.dataMember] = input3.value;
            SetStatus();
            ele.onchange();
        }
        input5.onclick = function () {
            input3.value = (Number(input3.value) + 1).toString();
            input3.dataObject[input3.dataMember] = input3.value;
            SetStatus();
            ele.onchange();
        }
        input55.onclick = function () {
            input3.value = input4.value;
            input3.dataObject[input3.dataMember] = input3.value;
            SetStatus();
            ele.onchange();
        }
        input3.onchange = function () {
            if (!CheckValueValidate()) {
                input3.value = input3.dataObject[input3.dataMember];
                return;
            }
        };

        input7.onclick = function () {
            input3.dataObject[input3.dataMember] = input3.value;
            SetStatus();
            ele.onchange();
        };

        this.BindData = function (data) {
            input1.value = data.pageSize;
            input3.value = data.pageIndex;
            input4.value = Math.ceil(data.resultCount / data.pageSize);
            input6.value = data.resultCount;

            input1.dataObject = data;
            input3.dataObject = data;
            input4.dataObject = data;
            input6.dataObject = data;

            input1.dataMember = "pageSize";
            input3.dataMember = "pageIndex";
            input4.dataMember = "resultCount";
            input6.dataMember = "resultCount";

            ele.__bindedData = data;

            SetStatus();
        }

        this.GetPageInfo = function () { return ele.__bindedData; };
    }

    this.PageManager2 = function (ele) {

        var root = ele;

        root.innnerHTML = "";

        var a_first = document.createElement("a");
        a_first.innerText = "首页";
        a_first.setAttribute("class", "a2");
        var a_last = document.createElement("a");
        a_last.innerText = "尾页";
        a_last.setAttribute("class", "a2");
        var a_pre = document.createElement("a");
        a_pre.innerText = "＜";
        a_pre.setAttribute("class", "a2");
        var span_current_page = document.createElement("span");
        span_current_page.setAttribute("class", "span1");
        span_current_page.innerText = "1";
        var span_page_split = document.createElement("span");
        span_page_split.setAttribute("class", "span1");
        span_page_split.innerText = "/";
        var span_page_count = document.createElement("span");
        span_page_count.setAttribute("class", "span1");
        span_page_count.innerText = "99";
        var a_next = document.createElement("a");
        a_next.innerText = "＞";
        a_next.setAttribute("class", "a2");

        var a_jump = document.createElement("a");
        a_jump.innerText = "跳转";
        a_jump.setAttribute("class", "a2");

        var input_jump_page = document.createElement("input");
        input_jump_page.setAttribute("class", "input1");

        var input_page_size_desc1 = document.createElement("span");
        input_page_size_desc1.setAttribute("class", "span1");
        input_page_size_desc1.innerText = "每页显示";

        var input_page_size = document.createElement("input");
        input_page_size.setAttribute("class", "input1");

        var input_page_size_desc2 = document.createElement("span");
        input_page_size_desc2.setAttribute("class", "span1");
        input_page_size_desc2.innerText = "条记录";

        var span_item_count_desc1 = document.createElement("span");
        span_item_count_desc1.setAttribute("class", "span1");
        span_item_count_desc1.innerText = "总计";

        var span_item_count = document.createElement("span");
        span_item_count.setAttribute("class", "span1");
        span_item_count.innerText = "999";

        var span_item_count_desc2 = document.createElement("span");
        span_item_count_desc2.setAttribute("class", "span1");
        span_item_count_desc2.innerText = "条记录";

        root.appendChild(a_first);
        root.appendChild(a_pre);
        root.appendChild(span_current_page);
        root.appendChild(span_page_split);
        root.appendChild(span_page_count);
        root.appendChild(a_next);
        root.appendChild(a_last);
        root.appendChild(a_jump);
        root.appendChild(input_jump_page);
        root.appendChild(input_page_size_desc1);
        root.appendChild(input_page_size);
        root.appendChild(input_page_size_desc2);
        root.appendChild(span_item_count_desc1);
        root.appendChild(span_item_count);
        root.appendChild(span_item_count_desc2);


        var CheckValue = function () {

            if (input_jump_page.value != "" && isNaN(input_jump_page.value)) return false;
            if (isNaN(input_page_size.value)) return false;
            if (input_jump_page.value != "" && (Number(input_jump_page.value) <= 0 || Number(input_jump_page.value) > Number(span_page_count.innerText))) return false;
            if (Number(input_page_size.value) <= 0 || Number(input_page_size.value) > 501) return false;
            return true;
        };

        var SetStatus = function () {

            if (Number(span_current_page.innerText) <= 1) {
                a_first.disabled = true;
                a_pre.disabled = true;
            }
            else {
                a_first.disabled = false;
                a_pre.disabled = false;
            }

            if (Number(span_current_page.innerText) >= Number(span_page_count.innerText)) {
                a_next.disabled = true;
                a_last.disabled = true;
            }
            else {
                a_next.disabled = false;
                a_last.disabled = false;
            }

        }

        input_page_size.onchange = function () {
            window.event.cancelBubble = true;
            if (!CheckValue()) {
                input_page_size.value = ele.__bindedData["pageSize"];
                return;
            }
            ele.__bindedData["pageSize"] = input_page_size.value;
            SetStatus();
            ele.onchange();
        };

        a_first.onclick = function () {
            span_current_page.innerText = "1";
            ele.__bindedData["pageIndex"] = span_current_page.innerText;
            SetStatus();
            ele.onchange();
        }

        a_pre.onclick = function () {
            span_current_page.innerText = (Number(span_current_page.innerText) - 1).toString();
            ele.__bindedData["pageIndex"] = span_current_page.innerText;
            SetStatus();
            ele.onchange();
        }
        a_next.onclick = function () {
            span_current_page.innerText = (Number(span_current_page.innerText) + 1).toString();
            ele.__bindedData["pageIndex"] = span_current_page.innerText;
            SetStatus();
            ele.onchange();
        }
        a_last.onclick = function () {
            span_current_page.innerText = span_page_count.innerText;
            ele.__bindedData["pageIndex"] = span_current_page.innerText;
            SetStatus();
            ele.onchange();
        }
        a_jump.onclick = function () {

            if (!CheckValue()) {
                input_jump_page.value = "";
                return;
            }
            ele.__bindedData["pageIndex"] = input_jump_page.value;
            input_jump_page.value = "";
            ele.onchange();
        };
        input_jump_page.onchange = function () {
            window.event.cancelBubble = true;
            return false;
        }


        this.BindData = function (data) {
            input_page_size.value = data.pageSize;
            span_current_page.innerText = data.pageIndex;
            span_page_count.innerText = Math.ceil(data.resultCount / data.pageSize);
            span_item_count.innerText = data.resultCount;

            ele.__bindedData = data;

            SetStatus();
        }

        this.GetPageInfo = function () { return ele.__bindedData; };
    }
}