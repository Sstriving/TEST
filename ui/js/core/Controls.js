function TableView(ele, params, style, parent) {
    this.RowInserted = parent ? parent.RowInserted : null;
    this.onRowInserted = function (self) {
        return function (index, row) {
            var rowInserted = self.RowInserted;
            if (rowInserted) return rowInserted(self, index, row);
        }
    } (this);
    this.RowRemoved = parent ? parent.RowRemoved : null;
    this.onRowRemoved = function (self) {
        return function (index, row) {
            var rowRemoved = self.RowRemoved;
            if (rowRemoved) return rowRemoved(self, index, row);
        }
    } (this);
    this.ColumnInserted = parent ? parent.ColumnInserted : null;
    this.onColumnInserted = function (self) {
        return function (index, column) {
            var columnInserted = self.ColumnInserted;
            if (columnInserted) return columnInserted(self, index, column);
        }
    } (this);
    this.ColumnRemoved = parent ? parent.ColumnRemoved : null;
    this.onColumnRemoved = function (self) {
        return function (index, column) {
            var columnRemoved = self.ColumnRemoved;
            if (columnRemoved) return columnRemoved(self, index, column);
        }
    } (this);
    this.DrawCell = parent ? parent.DrawCell : null;
    this.onDrawCell = function (self) {
        return function (rowIndex, columnIndex, row, column, root) {
            var drawCell = self.DrawCell;
            if (drawCell) return drawCell(self, rowIndex, columnIndex, row, column, root);
        }
    } (this);
    this.createSubView = function (self) {
        return function (index, root, params, style) {
            return new TableView(root, params, style, self);
        }
    } (this);
    var root;

    function Table(view, root, params, style, parent, subViewCreate) {
        var level = parent ? parent.Level + 1 : 0;
        this.RowInserted;
        this.RowRemoved;
        this.ColumnInserted;
        this.ColumnRemoved;
        this.DrawCell;
        this.onDrawCell = function (self) {
            return function (rowIndex, columnIndex, row, column, root) {
                var drawCell = self.DrawCell;
                if (drawCell) return drawCell(rowIndex, columnIndex, row, column, root);
            }
        } (this);
        if (!params) params = {};
        if (!params.columnNameMember) params.columnNameMember = 'Name';
        if (!params.columnDescriptionMember) params.columnDescriptionMember = 'Description';
        if (!params.columnWidthMember) params.columnWidthMember = 'Width';
        if (!params.columnDisplayIndexMember) params.columnDisplayIndexMember = 'DisplayIndex';
        if (!style) style = {};

        root.innerHTML = "";

        var doc = root.ownerDocument;

        var tabHeader = doc.createElement("table");
        var tbHeader = doc.createElement("tbody");
        var trHeader = doc.createElement("tr");
        tbHeader.appendChild(trHeader);
        tabHeader.appendChild(tbHeader);

        tabHeader.className = style.view;
        trHeader.className = style.header;
        tabHeader.style.position = "absolute";
        root.appendChild(tabHeader);

        var divTable = doc.createElement("div");
        divTable.style.position = "absolute";
        divTable.style.overflow = parent ? "" : "auto";
        divTable.style.width = "100%";
        divTable.style.top = tabHeader.offsetHeight + "px";
        divTable.style.bottom = "0px";

        var table = doc.createElement("TABLE");
        table.className = style.view;
        table.style.width = "100%";
        var tbody = doc.createElement("TBODY");
        table.appendChild(tbody);
        var thead = doc.createElement("TR");
        thead.className = style.header;
        //        thead.style.visibility = "hidden";
        thead.style.display = "none";
        thead.style.borderColor = "transparent";
        thead.style.backgroundColor = "transparent";
        tbody.appendChild(thead);
        divTable.appendChild(table);
        root.appendChild(divTable);

        divTable.onscroll = function () {
            tabHeader.style.left = (-divTable.scrollLeft) + "px";
        }
        var columns = [];
        var rows = [];
        this.TableElement = function () {
            return tabHeader;
        }
        this.Refresh = function () {
            return function (e) {
                return function () {
                    Event.Unregister(e, "mousemove", root.__delayExe);
                    root.__delayExe = null;
                    if (new ui(root).visible()) {
                        tabHeader.style.width = "100%";
                        divTable.style.top = tabHeader.offsetHeight + "px";
                        if (parent) {
                            root.style.height = (table.offsetHeight + tabHeader.offsetHeight) + "px";
                            parent.Refresh();
                        }
                    }
                    else {
                        root.__delayExe = arguments.callee;
                        Event.Register(e, "mousemove", root.__delayExe);
                    }
                }
            } (root.ownerDocument.body);
        } ();
        this.GetLevel = function () {
            return level;
        }
        function parseWidth(column) {
            var wid = column[params.columnWidthMember];
            if (!wid) return 0;
            if (typeof (wid) == "number") return wid + "px";
            return wid;
        }
        this.AddColumn = function (self) {
            return function (column) {
                if (!column) throw new Error("Null column");
                var index = columnIndex(column, true);
                if (index > -1) throw new Error("Column exists");
                index = columnIndexForDisplay(column);

                var append = index >= thead.children.length;
                var headerCellStyle = null;
                var rowCellStyle = null;
                if (style[column[params.columnNameMember]]) {
                    if (style.headerCell) {
                        headerCellStyle = style[column[params.columnNameMember]] + " " + style.headerCell;
                    }
                    else {
                        headerCellStyle = style[column[params.columnNameMember]];
                    }
                    if (style.rowCell) {
                        rowCellStyle = style[column[params.columnNameMember]] + " " + style.rowCell;
                    }
                    else {
                        rowCellStyle = style[column[params.columnNameMember]];
                    }
                }
                else {
                    if (style.headerCell) headerCellStyle = style.headerCell;
                    if (style.rowCell) rowCellStyle = style.rowCell;
                }

                var td = doc.createElement("TD");
                td.className = headerCellStyle;
                td.style.width = parseWidth(column);
                column = td.__column = columns[columns.length] = { 'data': column, 'root': td };

                if (append) {
                    thead.appendChild(td);
                }
                else {
                    thead.insertBefore(td, thead.children[index]);
                }

                if (!self.onDrawCell(-1, columns.length - 1, null, column.data, td)) {
                    Element(td).setText(column.data[params.columnDescriptionMember]);
                    td.title = td.innerText;
                }
                if (columns.length == 1) self.onDrawCell(-1, -1, null, null, thead)

                var span = doc.createElement("td");
                span.className = td.className;
                span.style.width = td.style.width;
                span.__column = { 'data': column.data, 'root': span };
                if (append) {
                    trHeader.appendChild(span);
                }
                else {
                    trHeader.insertBefore(span, trHeader.children[index]);
                }
                if (!self.onDrawCell(-1, columns.length - 1, null, column.data, span)) {
                    Element(span).setText(td.innerText);
                    span.title = span.innerText;
                }


                for (var i = 0; i < rows.length; i++) {
                    var td = doc.createElement("TD");
                    var row = td.__row = rows[i];
                    td.className = rowCellStyle;
                    td.style.width = parseWidth(column);

                    column = td.__column = { 'data': column.data, 'root': td };

                    if (append) {
                        row.root.appendChild(td);
                    }
                    else {
                        row.root.insertBefore(td, row.root.children[index]);
                    }
                    if (!self.onDrawCell(i, columns.length - 1, row.data, column.data, td)) {
                        Element(td).setText(row.data[column.data[params.columnNameMember]]);
                        td.title = td.innerText;
                    }

                    if (row.__tableview) {
                        var d = row.__tableview.getElement();
                        d.__colSpan++;
                        d.colSpan = d.__colSpan;
                    }
                }
                var colInsert = self.ColumnInserted;
                if (colInsert) colInsert(columns.length - 1, column.data);

                self.Refresh();
            }
        } (this);
        this.RemoveColumn = function (self) {
            return function (filter) {
                var colRemove = self.ColumnRemoved;
                for (var i = columns.length - 1; i > -1; i--) {
                    var column = columns[i];
                    if (filter(view, i, column.data)) {
                        for (var j = thead.children.length - 1; j > -1; j--) {
                            if (thead.children[j].__column == column) {

                                var col = trHeader.children[j].__column;
                                col.root.parentNode.removeChild(col.root);
                                col.root.__column = null;
                                col.root = null;

                                for (var k = 0; k < rows.length; k++) {
                                    var col = rows[k].root.children[j].__column;

                                    col.root.__row = null;

                                    col.root.parentNode.removeChild(col.root);
                                    col.root.__column = null;
                                    col.root = null;
                                    if (rows[k].__tableview) {
                                        var d = rows[k].__tableview.getElement();
                                        d.__colSpan--;
                                        d.colSpan = d.__colSpan ? d.__colSpan : 1;
                                    }
                                }
                                break;
                            }
                        }
                        column.root.parentNode.removeChild(column.root);
                        column.root.__column = null;
                        column.root = null;
                        for (var j = i + 1; j < columns.length; j++) {
                            columns[j - 1] = columns[j];
                        }
                        columns.length--;

                        if (colRemove) colRemove(i, column.data);
                    }
                }

                self.Refresh();
            }
        } (this);
        this.UpdateColumn = function (self) {
            return function (filter) {
                for (var i = 0; i < thead.children.length; i++) {
                    var td = thead.children[i];
                    var column = td.__column.data;
                    if (!filter(view, i, column)) continue;

                    var headerCellStyle = null;
                    var rowCellStyle = null;
                    if (style[column[params.columnNameMember]]) {
                        if (style.headerCell) {
                            headerCellStyle = style[column[params.columnNameMember]] + " " + style.headerCell;
                        }
                        else {
                            headerCellStyle = style[column[params.columnNameMember]];
                        }
                        if (style.rowCell) {
                            rowCellStyle = style[column[params.columnNameMember]] + " " + style.rowCell;
                        }
                        else {
                            rowCellStyle = style[column[params.columnNameMember]];
                        }
                    }
                    else {
                        if (style.headerCell) headerCellStyle = style.headerCell;
                        if (style.rowCell) rowCellStyle = style.rowCell;
                    }

                    td.className = headerCellStyle;
                    td.style.width = parseWidth(column);
                    if (!self.onDrawCell(-1, i, null, column, td)) {
                        Element(td).setText(column[params.columnDescriptionMember]);
                        td.title = td.innerText;
                    }

                    var span = trHeader.children[i];
                    span.className = td.className;
                    span.style.width = td.style.width;
                    if (!self.onDrawCell(-1, i, null, column, span)) {
                        Element(span).setText(td.innerText);
                        span.title = span.innerText;
                    }

                    for (var j = 0; j < rows.length; j++) {
                        var row = rows[j];
                        var td = row.root.children[i];
                        row = row.data;
                        td.className = rowCellStyle;
                        td.style.width = parseWidth(column);
                        if (!self.onDrawCell(j, i, row, column, td)) {
                            Element(td).setText(row[column[params.columnNameMember]]);
                            td.title = td.innerText;
                        }
                    }
                }

                self.Refresh();
            }
        } (this);
        this.ColumnCount = function () {
            return columns.length;
        }
        this.IndexOfColumn = function (filter) {
            for (var i = columns.length - 1; i > -1; i--) {
                var column = columns[i];
                if (filter(view, i, column.data)) return i;
            }
            return -1;
        }
        this.ColumnAt = function (index) {
            if (index > -1 && index < columns.length) return columns[index].data;
            throw new Error("Index out of range");
        }
        this.AddRow = function (self) {
            return function (row) {
                if (!row) throw new Error("Null row");
                var index = rowIndex(row);
                if (index > -1) throw new Error("Row exists");

                var tr = doc.createElement("TR");
                tr.className = style.row;
                tr.__row = rows[rows.length] = row = { 'data': row, 'root': tr };
                tbody.insertBefore(tr, thead);

                for (var i = 0; i < thead.children.length; i++) {
                    var column = thead.children[i].__column.data;
                    var rowCellStyle = null;
                    if (style[column[params.columnNameMember]]) {
                        if (style.rowCell) {
                            rowCellStyle = style[column[params.columnNameMember]] + " " + style.rowCell;
                        }
                        else {
                            rowCellStyle = style[column[params.columnNameMember]];
                        }
                    }
                    else {
                        if (style.rowCell) rowCellStyle = style.rowCell;
                    }
                    var td = doc.createElement("TD");
                    td.className = rowCellStyle;
                    td.style.width = parseWidth(column);

                    column = td.__column = { 'data': column, 'root': td };
                    td.__row = row;
                    tr.appendChild(td);
                    if (!self.onDrawCell(rows.length - 1, i, row.data, column.data, td)) {
                        Element(td).setText(row.data[column.data[params.columnNameMember]]);
                        td.title = td.innerText;
                    }
                }

                self.onDrawCell(rows.length - 1, -1, row.data, null, tr);

                var rowInsert = self.RowInserted;
                if (rowInsert) rowInsert(rows.length - 1, row.data);

                self.Refresh();
            }
        } (this);
        this.RemoveRow = function (self) {
            return function (filter) {
                var rowRemove = self.RowRemoved;
                for (var i = rows.length - 1; i > -1; i--) {
                    var row = rows[i];
                    if (filter(view, i, row.data)) {
                        for (var j = 0; j < row.root.children.length; j++) {
                            var column = row.root.children[j].__column;
                            column.root.__row = null;
                            column.root.__column = null;
                            column.root = null;
                        }
                        if (row.__tableview) {
                            var sr = row.__tableview.getElement().parentNode;
                            sr.parentNode.removeChild(sr);
                            row.__tableview = null;
                        }
                        row.root.parentNode.removeChild(row.root);
                        row.root.__row = null;
                        row.root = null;
                        for (var j = i + 1; j < rows.length; j++) {
                            rows[j - 1] = rows[j];
                        }
                        rows.length--;

                        if (rowRemove) rowRemove(i, row.data);
                    }
                }

                self.Refresh();
            }
        } (this);
        this.UpdateRow = function (self) {
            return function (filter) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (!filter(view, i, row.data)) continue;
                    for (var j = 0; j < row.root.children.length; j++) {
                        var td = row.root.children[j];
                        var column = td.__column.data;
                        var rowCellStyle = null;
                        if (style[column[params.columnNameMember]]) {
                            if (style.rowCell) {
                                rowCellStyle = style[column[params.columnNameMember]] + " " + style.rowCell;
                            }
                            else {
                                rowCellStyle = style[column[params.columnNameMember]];
                            }
                        }
                        else {
                            if (style.rowCell) rowCellStyle = style.rowCell;
                        }
                        td.className = rowCellStyle;
                        td.style.width = parseWidth(column);
                        if (!self.onDrawCell(i, j, row.data, column, td)) {
                            Element(td).setText(row.data[column[params.columnNameMember]]);
                            td.title = td.innerText;
                        }
                    }
                    self.onDrawCell(i, -1, row.data, null, row.root);
                }

                self.Refresh();
            }
        } (this);
        this.RowCount = function () {
            return rows.length;
        }
        this.IndexOfRow = function (filter) {
            for (var i = rows.length - 1; i > -1; i--) {
                var row = rows[i];
                if (filter(view, i, row.data)) return i;
            }
            return -1;
        }
        this.RowAt = function (index) {
            if (index > -1 && index < rows.length) return rows[index].data;
            throw new Error("Index out of range");
        }
        this.TableViewAt = function (self) {
            return function (index, test) {
                var row = rows[index];
                if (!row) throw new Error("Index out of range");
                if (row.__tableview) return row.__tableview;
                if (test) return null;
                var tr = row.root;
                var r = doc.createElement("TR");
                var d = doc.createElement("TD");
                d.className = style.subView;
                d.__colSpan = thead.children.length;
                d.colSpan = d.__colSpan ? d.__colSpan : 1;
                r.appendChild(d);
                tbody.insertBefore(r, tr.nextSibling);
                row.__tableview = subViewCreate(index, d, params, style);
                row.__tableview.Remove = function (r, rmv) {
                    return function () {
                        if (!r.__tableview) return;
                        rmv();
                        var tr = r.__tableview.getElement().parentNode;
                        if (tr && tr.parentNode) tr.parentNode.removeChild(tr);
                        r.__tableview = null;
                    }
                } (row, row.__tableview.Remove);

                //self.onDrawCell(-1, -1, null, null, d);

                row.__tableview.Fold();
                return row.__tableview;
            }
        } (this);
        function columnIndexForDisplay(column) {
            var index = 0;
            for (index = 0; index < thead.children.length; index++) {
                var c = compareColumnForDisplay(thead.children[index].__column.data, column);
                if (c > 0) break;
            }
            return index;
        }
        function compareColumnForDisplay(col1, col2) {
            var c = compareObject(col1[params.columnDisplayIndexMember], col2[params.columnDisplayIndexMember]);
            if (!c) c = compareObject(col1[params.columnDescriptionMember], col2[params.columnDescriptionMember]);
            if (!c) c = compareObject(col1[params.columnNameMember], col2[params.columnNameMember]);
            return c;
        }
        function columnIndex(column, refEquals) {
            if (!column) return -1;
            if (refEquals) {
                for (var i = 0; i < columns.length; i++) {
                    if (column == columns[i].data) return i;
                }
            }
            else {
                for (var i = 0; i < columns.length; i++) {
                    if (column[params.columnNameMember] == columns[i].data[params.columnNameMember]) return i;
                }
            }
            return -1;
        }
        function rowIndex(row) {
            if (!row) return -1;
            for (var i = 0; i < rows.length; i++) {
                if (row == rows[i].data) return i;
            }
            return -1;
        }
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
                    x = obj1 + "";
                    y = obj2 + "";
                    if (x == y) return 0;
                    return parseInt(x) > parseInt(y) ? 1 : -1;
                }
                else {
                    return typeof (x) > typeof (y) ? 1 : -1;
                }
            }
        }
    }
    function ColumnCollection(view, table) {
        this.getCount = function () {
            return table.ColumnCount();
        }
        this.Add = function (column) {
            table.AddColumn(column);
        }
        this.Remove = function (filter) {
            table.RemoveColumn(filter);
        }
        this.Clear = function () {
            table.RemoveColumn(function () { return true; });
        }
        this.Update = function (filter) {
            table.UpdateColumn(filter);
        }
        this.IndexOf = function (filter) {
            return table.IndexOfColumn(filter);
        }
        this.Item = function (index) {
            return table.ColumnAt(index);
        }
        Object.defineProperty(this, 'Count', { get: function () { return this.getCount(); } });
    }
    function RowCollection(view, table) {
        this.getCount = function () {
            return table.RowCount();
        }
        this.Add = function (row) {
            table.AddRow(row);
        }
        this.Remove = function (filter) {
            table.RemoveRow(filter);
        }
        this.Clear = function () {
            table.RemoveRow(function () { return true; });
        }
        this.Update = function (filter) {
            table.UpdateRow(filter);
        }
        this.IndexOf = function (filter) {
            return table.IndexOfRow(filter);
        }
        this.Item = function (index) {
            return table.RowAt(index);
        }
        Object.defineProperty(this, 'Count', { get: function () { return this.getCount(); } });
    }
    this.getElement = function () {
        return root.parentNode;
    }
    this.SubView = function (self) {
        return function (index, test) {
            return table.TableViewAt(index, test);
        }
    } (this);
    this.Unfold = function (self) {
        return function () {
            (parent ? ele.parentNode : ele).style.display = "";
            if (parent) {
                for (var i = parent.Rows.Count - 1; i > -1; i--) {
                    var v = parent.SubView(i, true);
                    if (v == self) {
                        parent.Rows.Update(function (v, ix, r) {
                            return ix == i;
                        });
                        break;
                    }
                }
            }
            self.Refresh();
        }
    } (this);
    this.Fold = function (self) {
        return function () {
            (parent ? ele.parentNode : ele).style.display = "none";
            if (parent) {
                for (var i = parent.Rows.Count - 1; i > -1; i--) {
                    var v = parent.SubView(i, true);
                    if (v == self) {
                        parent.Rows.Update(function (v, ix, r) {
                            return ix == i;
                        });
                        break;
                    }
                }
            }
            self.Refresh();
        }
    } (this);
    this.getUnfolded = function (self) {
        return function () {
            return (parent ? ele.parentNode : ele).style.display == "";
        }
    } (this);
    this.Remove = function (self) {
        return function () {
            self.Columns.Clear();
            self.Rows.Clear();
        }
    } (this);
    this.getColumns = function (self) {
        return function () {
            return new ColumnCollection(self, table);
        }
    } (this);
    this.getRows = function (self) {
        return function () {
            return new RowCollection(self, table);
        }
    } (this);
    this.getLevel = function () {
        return table.GetLevel();
    }
    this.getParent = function () {
        return parent;
    }
    this.TableElement = function () {
        return table.TableElement();
    }
    Object.defineProperty(this, 'Columns', { get: function () { return this.getColumns(); } });
    Object.defineProperty(this, 'Rows', { get: function () { return this.getRows(); } });
    Object.defineProperty(this, 'Level', { get: function () { return this.getLevel(); } });
    Object.defineProperty(this, 'Parent', { get: function () { return this.getParent(); } });
    Object.defineProperty(this, 'Unfolded', { get: function () { return this.getUnfolded(); } });
    var table = ele.__table;
    if (!table) {
        root = ele.ownerDocument.createElement("div");
        root.style.width = "100%";
        root.style.height = "100%";
        root.style.position = "relative";
        if (!parent) root.style.overflow = "hidden";
        ele.innerHTML = "";
        ele.appendChild(root);
        ele.__table = table = new Table(this, root, params, style, parent, function (self) {
            return function (index, root, params, style) {
                return self.createSubView(index, root, params, style);
            };
        } (this));
        ele.__table.RowInserted = function (self) {
            return function (index, row) {
                self.onRowInserted(index, row);
            }
        } (this);
        ele.__table.RowRemoved = function (self) {
            return function (index, row) {
                self.onRowRemoved(index, row);
            }
        } (this);
        ele.__table.ColumnInserted = function (self) {
            return function (index, column) {
                self.onColumnInserted(index, column);
            }
        } (this);
        ele.__table.ColumnRemoved = function (self) {
            return function (index, column) {
                self.onColumnRemoved(index, column);
            }
        } (this);
        ele.__table.DrawCell = function (self) {
            return function (rowIndex, columnIndex, row, column, root) {
                return self.onDrawCell(rowIndex, columnIndex, row, column, root);
            }
        } (this);

    }
    else {
        root = ele.children[0];
    }
    this.Refresh = function () {
        table.Refresh();
    }
}
function TreeView(ele, params, style, sourcePathMap, parent) {
    TableView.apply(this, [ele, params, style, parent]);
    Object.defineProperty(this, 'Nodes', { get: function () { return this.Rows; } });
    this.NodeClick = parent ? parent.NodeClick : null;
    this.onNodeClick = function (self) {
        return function (node) {
            var nodeClick = self.NodeClick;
            if (nodeClick) nodeClick(self, node);
        }
    } (this);
    this.NodeDblClick = parent ? parent.NodeDblClick : null;
    this.onNodeDblClick = function (self) {
        return function (node) {
            var nodeDblClick = self.NodeDblClick;
            if (nodeDblClick) nodeDblClick(self, node);
        }
    } (this);
    var onDrawCell_base = this.onDrawCell;
    this.onDrawCell = function (self) {
        return function (ri, ci, r, c, e) {
            var result = onDrawCell_base(ri, ci, r, c, e);
            if (ri < 0 && ci == 0) e.parentNode.style.display = "none";
            if (r) {
                if (!c) {
                    e.onclick = function () {
                        self.onNodeClick(r);
                    }
                    e.ondblclick = function () {
                        self.onNodeDblClick(r);
                    }
                }
                else {
                    if (!r[params.typeMember]) {//lml
                        var __f, __d, __t;
                        if (e.__f) {
                            __f = e.__f;
                            __d = e.__d;
                            __t = e.__t;
                        }
                        else {
                            var doc = ele.ownerDocument;
                            e.__f = __f = doc.createElement('img');
                            e.__d = __d = doc.createElement('img');
                            e.__t = __t = doc.createElement('span');
                        }
                        if (!__f.parentNode) {
                            Element(e).setHtml('');
                            e.appendChild(__f);
                            e.appendChild(__d);
                            e.appendChild(__t);
                        }

                        var ii = self.Rows.IndexOf(function (view, index, row) {
                            return row == r;
                        });
                        var v = ii > -1 ? self.SubView(ii, true) : null;
                        __f.src = sourcePathMap + (v && v.Unfolded ? 'f-unfolded.png' : 'f-folded.png');
                        __d.src = sourcePathMap + (v && v.Unfolded ? 'd-unfolded.png' : 'd-folded.png');
                        Element(__t).setText(r[c[params.columnNameMember]]);
                        result = true;
                    }
                    else {
                        e.className = style.leaf;
                    }
                }
            }
            return result;
        }
    } (this);
    this.createSubView = function (self) {
        return function (index, root, params, style) {
            return new TreeView(root, params, style, sourcePathMap, self);
        }
    } (this);
    this.FindNode = function (self) {
        return function (filter) {
            var index = self.Rows.IndexOf(filter);
            if (index > -1) return { 'owner': self, 'index': index };
            for (var i = self.Rows.Count - 1; i > -1; i--) {
                var tmp = self.SubView(i, true);
                if (tmp) {
                    var result = tmp.FindNode(filter);
                    if (result.index > -1) return result;
                }
            }
            return { 'owner': self, 'index': -1 };
        }
    } (this);
    this.InsertNode = function (self) {
        return function (nodeData) {
            if (self.Columns.IndexOf(function (v, i, c) {
                return c.Name == params.displayMember;
            }) < 0) {
                self.Columns.Add({ 'Name': params.displayMember, 'Description': '-', 'DisplayIndex': 1, 'Width': '100%' });
            }
            var pid = nodeData[params.parentMember];
            var cid = nodeData[params.valueMember];
            var root = null;
            if (!pid) {
                root = { 'owner': self, 'index': -1 };
            }
            else {
                var filter = function (v, i, r) {
                    return r[params.valueMember] == pid;
                }
                root = self.FindNode(filter);
            }

            var parent = root.owner;
            var index = root.index;
            if (parent) {
                var view = index > -1 ? parent.SubView(index) : parent;

                var filter = function (v, i, r) {
                    return r[params.valueMember] == cid;
                }
                root = view.FindNode(filter);
                var curr = root ? root.owner : null;//lml
                index = root ? root.index : -1;
                if (curr && index < 0) {
                    if (curr.Columns.IndexOf(function (v, i, c) {
                        return c.Name == params.displayMember;
                    }) < 0) {
                        curr.Columns.Add({ 'Name': params.displayMember, 'Description': '-', 'DisplayIndex': 1, 'Width': '100%' });
                    }
                    curr.Rows.Add(nodeData);
                }
                else {//lml
                    //                    if (curr.SubView(index).Level == 1) {
                    curr.SubView(index).Rows.Clear();
                    //                        curr.SubView(index).Fold();
                    //                    }
                }
            }
            if (nodeData[params.childrenMember]) {
                for (var i = 0; i < nodeData[params.childrenMember].length; i++) {
                    self.InsertNode(nodeData[params.childrenMember][i]);
                }
            }
        }
    } (this);
}