function TableView(root, tvStyle, columnComparer, rowComparer) {
    if (!tvStyle) tvStyle = {};
    if (!tvStyle.valueMember) tvStyle.valueMember = "name";
    if (!tvStyle.displayMember) tvStyle.displayMember = "text";
    if (!tvStyle.widthMember) tvStyle.widthMember = "width";
    if (!tvStyle.rowPKMember) tvStyle.rowPKMember = "id";
    if (!columnComparer) columnComparer = function (x, y) {
        return x[tvStyle.valueMember] == y[tvStyle.valueMember] ? 0 : -1;
    }
    if (!rowComparer) rowComparer = function (x, y) {
        return x[tvStyle.rowPKMember] == y[tvStyle.rowPKMember] ? 0 : -1;
    }
    var columns = new ItemCollection(columnComparer);
    this.Columns = function (columns) {
        return function (index) {
            if (arguments.length == 1) {
                return columns.ItemAt(index);
            }
            else {
                return new function () {
                    this.Add = function (col) {
                        columns.Add(col);
                    }
                    this.Remove = function (col) {
                        columns.Remove(col);
                    }
                    this.Count = function () {
                        return columns.Count();
                    }
                    this.IndexOf = function (col) {
                        return columns.IndexOf(col);
                    }
                    this.Clear = function () {
                        columns.Clear();
                    }
                }
            }
        }
    } (columns);
    var e = document.createElement("div");
    var divHeader = document.createElement("div");
    e.appendChild(divHeader);
    var divBody = document.createElement("div");
    e.appendChild(divBody);

    var tabHeader = document.createElement("table");
    var tbodyHeader = document.createElement("tbody");
    tabHeader.appendChild(tbodyHeader);
    var trHeader = document.createElement("tr");
    tbodyHeader.appendChild(trHeader);
    divHeader.appendChild(tabHeader);
    var tabBody = document.createElement("table");
    var tbodyBody = document.createElement("tbody");
    tabBody.appendChild(tbodyBody);
    divBody.appendChild(tabBody);

    var divPlaceHolder = document.createElement("div");//用于占位，解决列头宽度超出可视区域但没有行数据时横向滚动条不可见的bug
    divBody.appendChild(divPlaceHolder);

    divBody.onscroll = function () {
        tabHeader.style.left = -divBody.scrollLeft + 'px';
        if (_scroll) _scroll();
    }
    var _scroll;
    var refreshFlag = false;
    function asyncRefresh(self) {
        if (refreshFlag) return;
        refreshFlag = true;
        setTimeout(function () {
            if (refreshFlag) self.Refresh();
        }, 1);
    }
    this.Scroll = function (scroll) {
        if (scroll) {
            _scroll = scroll;
        }
        else {
            return { 'x': divBody.scrollLeft, 'y': divBody.scrollTop, 'width': divBody.scrollWidth, 'height': divBody.scrollHeight };
        }
    }
    this.Offset = function () {
        return { 'x': divBody.offsetLeft, 'y': divBody.offsetTop, 'width': divBody.offsetWidth, 'height': divBody.offsetHeight };
    }
    this.Header = function () {
        return divHeader;
    }
    this.Body = function () {
        return divBody;
    }
    this.Refresh = function () {
        refreshFlag = false;
        var func = function () {
            tabHeader.cellSpacing = 0;
            tabBody.cellSpacing = 0;

            tabHeader.style.position = 'absolute';
            tabHeader.style.tableLayout = 'fixed';
            divHeader.style.position = 'relative';
            divHeader.style.overflow = 'hidden';
            tabBody.style.tableLayout = 'fixed';
            divBody.style.overflow = 'auto';

            var wid = 0;
            for (var i = 0; i < tbodyHeader.children[0].children.length; i++) {
                wid += tbodyHeader.children[0].children[i].offsetWidth;
            }
            tabHeader.style.width = wid + 'px';
            tabHeader.style.left = -divBody.scrollLeft + 'px';

            divPlaceHolder.style.width = wid + 'px';
            divPlaceHolder.style.height = '1px'

            divHeader.style.width = root.offsetWidth + 'px';
            divHeader.style.height = tabHeader.offsetHeight + 'px';

            tabBody.style.width = tabHeader.style.width;
            divBody.style.width = divHeader.style.width;

            var hit = root.offsetHeight - divHeader.offsetHeight;
            if (!hit || hit < 0) hit = divBody.offsetHeight;
            divBody.style.height = hit + "px";
        }
        func();
        func();
    }
    this.Columns = function (columns) {
        return function (index) {
            if (arguments.length == 1) {
                return columns.ItemAt(index);
            }
            else {
                return new function () {
                    this.Add = function (col) {
                        columns.Add(col);
                    }
                    this.Remove = function (col) {
                        columns.Remove(col);
                    }
                    this.Count = function () {
                        return columns.Count();
                    }
                    this.IndexOf = function (col) {
                        return columns.IndexOf(col);
                    }
                    this.Clear = function () {
                        columns.Clear();
                    }
                }
            }
        }
    } (columns);
    columns.ItemEdited = function (self) {
        return function (total, index, col, operation) {
            switch (operation) {
                case 1: //add
                    var td = document.createElement('td');
                    trHeader.appendChild(td);
                    td.onclick = function (d, cl) {
                        return function () {
                            if (self.CellClick) self.CellClick(-1, indexOfElement(d), cl, d, columns);
                        }
                    } (td, col);
                    drawCell(-1, index, col, td, columns);
                    var wid = col[tvStyle.widthMember];
                    if (wid == parseInt(wid, 10)) {
                        td.style.width = wid + 'px';
                    }
                    else {
                        td.style.width = wid;
                    }
                    for (var r = 0; r < rows.Count(); r++) {
                        var trBody = tabBody.children[0].children[r];
                        var td = document.createElement('td');
                        trBody.appendChild(td);
                        td.onclick = function (d, cl) {
                            return function () {
                                if (self.CellClick) self.CellClick(indexOfElement(d.parentNode), indexOfElement(d), cl, d, rows);
                            }
                        } (td, col);
                        drawCell(r, index, col, td, rows);
                        td.style.width = trHeader.children[index].style.width;
                    }
                    asyncRefresh(self);
                    break;
                case 0: //update
                    break;
                case -1: //remove
                    var td = trHeader.children[index];
                    trHeader.removeChild(td);

                    for (var r = 0; r < rows.Count(); r++) {
                        var trBody = tabBody.children[0].children[r];
                        var td = trBody.children[index];
                        trBody.removeChild(td);
                    }
                    asyncRefresh(self);
                    break;
            }
        }
    } (this);
    var rows = new ItemCollection(rowComparer);
    this.Rows = function (rows) {
        return function (index) {
            if (arguments.length == 1) {
                return rows.ItemAt(index);
            }
            else {
                return new function () {
                    this.Add = function (row) {
                        rows.Add(row);
                    }
                    this.Remove = function (row) {
                        rows.Remove(row);
                    }
                    this.Count = function () {
                        return rows.Count();
                    }
                    this.IndexOf = function (row) {
                        return rows.IndexOf(row);
                    }
                    this.Clear = function () {
                        rows.Clear();
                    }
                }
            }
        }
    } (rows);
    function indexOfElement(ele) {
        if (!ele.parentNode) return -1;
        for (var i = 0; i < ele.parentNode.children.length; i++) {
            if (ele.parentNode.children[i] == ele) return i;
        }
        return -1;
    }
    rows.ItemEdited = function (self) {
        return function (total, index, row, operation) {
            switch (operation) {
                case 1: //add 
                    var trBody = document.createElement('tr');
                    tbodyBody.appendChild(trBody);
                    for (var c = 0; c < columns.Count(); c++) {
                        var col = columns.ItemAt(c);
                        var td = document.createElement('td');
                        trBody.appendChild(td);
                        td.onclick = function (d, cl) {
                            return function () {
                                if (self.CellClick) self.CellClick(indexOfElement(d.parentNode), indexOfElement(d), cl, d, rows);
                            }
                        } (td, col);
                        drawCell(index, c, col, td, rows);
                        td.style.width = trHeader.children[c].style.width;
                    }
                    asyncRefresh(self);
                    break;
                case 0: //update
                    break;
                case -1: //remove
                    var trBody = tabBody.children[0].children[index];
                    tabBody.children[0].removeChild(trBody);
                    asyncRefresh(self);
                    break;
            }
        }
    } (this);
    root.appendChild(e);

    this.DrawCell;
    var drawCell = function (self) {
        return function (rowIndex, colIndex, col, ele, data) {
            var style = tvStyle;
            if (!style) style = tvStyle = { 'header': 'header', 'row': 'row' };
            if (rowIndex == -1) {
                css(ele).Add(style.header);
            }
            else {
                css(ele).Add(style.row);
            }
            if (!self.DrawCell || !self.DrawCell(rowIndex, colIndex, col, ele, data)) {
                var txt = null;
                if (rowIndex == -1) {
                    txt = data.ItemAt(colIndex)[tvStyle.displayMember];
                }
                else {
                    txt = data.ItemAt(rowIndex)[col[tvStyle.valueMember]];
                }
                if (!txt || txt == "") txt = "-";
                ele.innerText = txt;
                ele.textContent = txt;
                ele.title = txt;
            }
        }
    } (this);
    this.CellClick;
}
//function TableViewWithMenu(root, style, columnComparer, rowComparer) {
//    var args = [];
//    for (var i = 0; i < arguments.length; i++) {
//        args[i] = arguments[i];
//    }
//    args[1] = style ? style.tvStyle : null;
//    TableView.apply(this, args);
//    var menu = new Menu(root.children[0].children[1], style ? style.mnuStyle : null);
//    var unfold = menu.Unfold;
//    menu.Unfold = function (self) {
//        return function () {
//            var offset = { 'left': 0, 'top': 0 };
//            var body = self.Body();
//            var p = body;
//            while (p) {
//                offset.left += p.offsetLeft;
//                offset.top += p.offsetTop;
//                p = p.offsetParent;
//                if (p) {
//                    offset.left -= p.scrollLeft;
//                    offset.top -= p.scrollTop;
//                }
//            }
//            if (arguments.length < 1) {
//                var evt = Event();
//                if (!evt) {
//                    if (arguments.length > 0) {
//                        evt = { 'clientX': arguments[0].x, 'clientY': arguments[0].y };
//                    }
//                    else {
//                        evt = { 'clientX': offset.left, 'clientY': offset.top };
//                    }
//                }
//                var bounds = { 'x': evt.clientX - offset.left + body.scrollLeft, 'y': evt.clientY - offset.top + body.scrollTop };
//                var dock = { 'bounds': { 'x': body.scrollLeft, 'y': body.scrollTop, 'width': body.offsetWidth - 18, 'height': body.offsetHeight - 18} };
//                unfold(bounds, dock);
//            }
//            else if (arguments.length < 2) {
//                unfold(arguments[0]);
//            }
//            else {
//                var evt = Event();
//                if (!evt) {
//                    if (arguments.length > 0) {
//                        evt = { 'clientX': arguments[0].x, 'clientY': arguments[0].y };
//                    }
//                    else {
//                        evt = { 'clientX': offset.left, 'clientY': offset.top };
//                    }
//                }
//                var bounds = { 'x': evt.clientX - offset.left + body.scrollLeft, 'y': evt.clientY - offset.top + body.scrollTop };
//                bounds.width = arguments[0].width;
//                bounds.height = arguments[0].height;
//                var dock = { 'bounds': { 'x': body.scrollLeft, 'y': body.scrollTop, 'width': body.offsetWidth, 'height': body.offsetHeight} };
//                dock.offsetX = arguments[1].offsetX;
//                dock.offsetY = arguments[1].offsetY;
//                unfold(bounds, dock);
//            }
//        }
//    } (this);
//    this.Menu = function () {
//        return menu;
//    }
//    var refresh = this.Refresh;
//    this.Refresh = function () {
//        refresh();
//        menu.Fold();
//    }
//}