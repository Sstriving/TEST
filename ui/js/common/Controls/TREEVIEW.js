function TreeView(root, valueMember, displayMember) {
    var self = this;
    var root = root;
    var table;
    var valueMember = valueMember;
    var displayMember = displayMember;
    var _decorate;
    var _selectedNode;
    this.NodeFolding;
    this.NodeFolded;
    this.NodeUnfolding;
    this.NodeUnfolded;
    this.NodeSelecting;
    this.NodeSelected;
    this.NodeUnselecting;
    this.NodeUnselected;
    this.SelectedNode = function () {
        return _selectedNode;
    }
    this.LoadData = function (treeData, decorate) {
        var cols = CalcColumns(treeData) + 1;
        var rows = CalcRows(treeData);
        CreateTable(cols, rows);
        if (decorate) _decorate = decorate;
        DrawNode(treeData, cols, rows, 0, 0, treeData, _decorate);
        self.UnselectNode(_selectedNode);
    }
    this.SelectNode = function (nodeData, decorate) {
        if (!decorate) decorate = _decorate;
        if (nodeSelected(nodeData)) return;
        self.UnselectNode(_selectedNode);
        if (_selectedNode) return;
        if (!nodeData) return;
        var treeData = table.children[0].children[0].children[0]._nodeData;
        var cols = CalcColumns(treeData) + 1;
        var rows = CalcRows(treeData);
        for (var r = 0; r < rows; r++) {
            var tr = table.children[0].children[r];
            for (var c = 0; c < tr.children.length; c++) {
                var td = tr.children[c];
                if (td._nodeData == nodeData) {
                    var select = true;
                    if (self.NodeSelecting) select = self.NodeSelecting(nodeData);
                    if (!select) return;
                    _selectedNode = nodeData;
                    DrawNodeInCell(cols, rows, c, r, nodeData, decorate);
                    if (self.NodeSelected) self.NodeSelected(nodeData);
                    return;
                }
            }
        }
    }
    this.UnselectNode = function (nodeData, decorate) {
        if (!nodeData) return;
        if (!decorate) decorate = _decorate;
        if (!nodeSelected(nodeData)) return;
        var treeData = table.children[0].children[0].children[0]._nodeData;
        var cols = CalcColumns(treeData) + 1;
        var rows = CalcRows(treeData);
        for (var r = 0; r < rows; r++) {
            var tr = table.children[0].children[r];
            for (var c = 0; c < tr.children.length; c++) {
                var td = tr.children[c];
                if (td._nodeData == nodeData) {
                    var unselect = true;
                    if (self.NodeUnselecting) unselect = self.NodeUnselecting(nodeData);
                    if (!unselect) return;
                    _selectedNode = null;
                    DrawNodeInCell(cols, rows, c, r, nodeData, decorate);
                    if (self.NodeUnselected) self.NodeUnselected(nodeData);
                    return;
                }
            }
        }
        _selectedNode = null;
    }
    this.FoldNode = function (nodeData, decorate) {
        if (!decorate) decorate = _decorate;
        if (nodeIsLeaf(nodeData)) return;
        if (!nodeUnfolded(nodeData)) return;
        var treeData = table.children[0].children[0].children[0]._nodeData;
        var cols = CalcColumns(treeData) + 1;
        var rows = CalcRows(treeData);
        for (var r = 0; r < rows; r++) {
            var tr = table.children[0].children[r];
            for (var c = 0; c < tr.children.length; c++) {
                var td = tr.children[c];
                if (td._nodeData == nodeData) {
                    var fold = true;
                    if (self.NodeFolding) fold = self.NodeFolding(nodeData);
                    if (!fold) return;
                    var rows = CalcRows(nodeData);
                    nodeData._unfolded = false;
                    for (var i = rows; i > 1; i--) {
                        table.children[0].removeChild(table.children[0].children[r + 1]);
                        rows--
                    }
                    var newCols = CalcColumns(treeData) + 1;
                    if (newCols != cols) {
                        cols = newCols;
                        resolveColSpan(cols, rows);
                    }
                    DrawNodeInCell(cols, rows, c, r, nodeData, decorate);
                    if (self.NodeFolded) self.NodeFolded(nodeData);
                    return;
                }
            }
        }
    }
    function resolveColSpan(cols, rows) {
        for (var r = 0; r < rows; r++) {
            var tr = table.children[0].children[r];
            for (var c = tr.children.length - 1; c > -1; c--) {
                var td = tr.children[c];
                if (td._nodeData) {
                    td.setAttribute("colspan", cols - c);
                    break;
                }
            }
        }
    }
    this.UnfoldNode = function (nodeData, decorate) {
        if (!decorate) decorate = _decorate;
        if (nodeIsLeaf(nodeData)) return;
        if (nodeUnfolded(nodeData)) return;
        var tbody = table.children[0];
        var treeData = tbody.children[0].children[0]._nodeData;
        var cols = CalcColumns(treeData) + 1;
        var rows = CalcRows(treeData);
        for (var r = 0; r < rows; r++) {
            var tr = table.children[0].children[r];
            for (var c = 0; c < tr.children.length; c++) {
                var td = tr.children[c];
                if (td._nodeData == nodeData) {
                    var unfold = true;
                    if (self.NodeUnfolding) fold = self.NodeUnfolding(nodeData);
                    if (!unfold) return;
                    nodeData._unfolded = true;
                    var newCols = CalcColumns(treeData) + 1;
                    if (newCols != cols) {
                        cols = newCols;
                        resolveColSpan(cols, rows);
                    }
                    var newRows = CalcRows(nodeData);
                    if (newRows != 1) {
                        var doc = CurrDocument();
                        var index = r + 1;
                        for (var i = newRows; i > 1; i--) {
                            var tr = doc.createElement("TR");
                            insertTR(tbody, index++, tr);
                            for (var j = 0; j < cols; j++) {
                                var td = doc.createElement("TD");
                                tr.appendChild(td);
                            }
                            rows++;
                        }
                    }
                    DrawNode(treeData, cols, rows, c, r, nodeData, decorate);
                    if (self.NodeUnfolded) self.NodeUnfolded(nodeData);
                    return;
                }
            }
        }
    }
    function insertTR(tbody, index, tr) {
        if (index == tbody.children.length) {
            tbody.appendChild(tr);
        }
        else {
            tbody.insertBefore(tr, tbody.children[index]);
        }
    }
    function CalcColumns(nodeData) {
        var max = 0;
        if (nodeUnfolded(nodeData)) {
            var items = nodeData.children;
            if (items) {
                for (var i = 0; i < items.length; i++) {
                    var n = CalcColumns(items[i]);
                    if (n > max) max = n;
                }
            }
        }
        return max + 1;
    }
    function CalcRows(nodeData) {
        var n = 1;
        if (nodeUnfolded(nodeData)) {
            var items = nodeData.children;
            if (items) {
                for (var i = 0; i < items.length; i++) {
                    n += CalcRows(items[i]);
                }
            }
        }
        return n;
    }
    function CurrDocument() {
        return document;
    }
    function CreateTable(cols, rows) {
        root.innerHTML = "";
        var doc = CurrDocument();
        table = doc.createElement("TABLE");
        root.appendChild(table);
        var tbody = doc.createElement("TBODY");
        table.appendChild(tbody);
        for (var r = 0; r < rows; r++) {
            var tr = doc.createElement("TR");
            tbody.appendChild(tr);
            for (var c = 0; c < cols; c++) {
                var td = doc.createElement("TD");
                tr.appendChild(td);
            }
        }
    }
    function DrawNodeInCell(cols, rows, col, row, nodeData, decorate) {
        var tr = table.children[0].children[row];
        var td = tr.children[col];
        if (nodeIsLeaf(nodeData)) {
            td.innerText = "﹒";
        }
        else {
            td.innerText = nodeUnfolded(nodeData) ? "-" : "+";
        }
        td._nodeData = nodeData;
        td.onclick = function () {
            var d = td._nodeData;
            if (nodeUnfolded(d)) {
                self.FoldNode(d);
            }
            else {
                self.UnfoldNode(d);
            }
        }
        td = tr.children[col + 1];
        td.onclick = function () {
            var d = td._nodeData;
            if (!nodeSelected(d)) self.SelectNode(d);
        }
        td.innerText = nodeData ? nodeData[displayMember] : " ";
        td._nodeData = nodeData;
        td.setAttribute("colspan", cols - (col + 1));
        for (var i = tr.children.length - 1; i > col + 1; i--) {
            tr.removeChild(tr.children[i]);
        }
        if (decorate) decorate(nodeData, tr.children[col], tr.children[col + 1]);
    }
    function DrawNode(treeData, cols, rows, col, row, nodeData, decorate) {
        DrawNodeInCell(cols, rows, col, row, nodeData, decorate);
        var n = 1;
        if (nodeUnfolded(nodeData)) {
            var items = nodeData.children;
            if (items) {
                for (var i = 0; i < items.length; i++) {
                    n += DrawNode(treeData, cols, rows, col + 1, row + n, items[i], decorate);
                }
            }
        }
        return n;
    }
    function nodeSelected(node) {
        return _selectedNode == node;
    }
    function nodeUnfolded(node) {
        return node._unfolded && !node.IsLeaf;
    }
    function nodeIsLeaf(node) {
        return node.IsLeaf;
    }
    this.SetChildren = function (nodeData, nodeDatas) {
        if (nodeIsLeaf(nodeData)) return;
        if (!nodeDatas) nodeDatas = [];
        var unfold = nodeUnfolded(nodeData);
        var folding = self.NodeFolding;
        var folded = self.NodeFolded;
        var unfolding = self.NodeUnfolding;
        var unfolded = self.NodeUnfolded;
        var selecting = self.NodeSelecting;
        var selected = self.NodeSelected;
        var unselecting = self.NodeUnselecting;
        var unselected = self.NodeUnselected;
        self.NodeFolding = null;
        self.NodeFolded = null;
        self.NodeUnfolding = null;
        self.NodeUnfolded = null;
        self.NodeSelecting = null;
        self.NodeSelected = null;
        self.NodeUnselecting = null;
        self.NodeUnselected = null;

        var sn = _selectedNode;
        self.UnselectNode(_selectedNode);
        if (unfold) {
            self.FoldNode(nodeData);
        }
        nodeData.children = nodeDatas;
        if (unfold) {
            self.UnfoldNode(nodeData);
        }
        else {
            self.UnfoldNode(nodeData);
            self.FoldNode(nodeData);
        }
        self.SelectNode(sn);
        self.NodeFolding = folding;
        self.NodeFolded = folded;
        self.NodeUnfolding = unfolding;
        self.NodeUnfolded = unfolded;
        self.NodeSelecting = selecting;
        self.NodeSelected = selected;
        self.NodeUnselecting = unselecting;
        self.NodeUnselected = unselected;
    }
}