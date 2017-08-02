
var jsDir = document.scripts;
jsDir = jsDir[jsDir.length - 1].src.substring(0, jsDir[jsDir.length - 1].src.lastIndexOf("/") + 1);
    
document.write("<link rel='stylesheet' type='text/css' href='" + jsDir + "Style.css'>");


var CustomTree = function (ele) {

    var rootEle = ele;
    var self = this;
    var rootNode = null;

    var regFoldEvent = function (children, item, node, deep, lastDeepEle, itemTypeEle, lstTitle) {
        node.changefoldstate = function () {
            if (currentleafselector(item))return;
            node._folder = node._folder ? 0 : 1;
            itemTypeEle.style.background = node._folder ? "url(" + jsDir + "Images/foldericon.png) center no-repeat" : "url(" + jsDir + "Images/openfoldericon.png) center no-repeat";

            switch ((node._folder << 1) + deep.last()) {
                case 0: lastDeepEle.style.background = "url(" + jsDir + "Images/Tminus.png) center no-repeat"; break;
                case 1: lastDeepEle.style.background = "url(" + jsDir + "Images/Lminus.png) center no-repeat"; break;
                case 2: lastDeepEle.style.background = "url(" + jsDir + "Images/Tplus.png) center no-repeat"; break;
                case 3: lastDeepEle.style.background = "url(" + jsDir + "Images/Lplus.png) center no-repeat"; break;
                default: break;
            }

            children.style.display = node._folder ? "none" : "";
        }
        lastDeepEle.onclick = function () {
            node.changefoldstate();
            if (!node._folder && !currentleafselector(node.__bindedData)) self.onnodeunfolded(node);
        }
        itemTypeEle.onclick = function () { lastDeepEle.click(); };
        if(!currentleafselector(node.__bindedData))lstTitle.onclick = function () { lastDeepEle.click(); };
    }

    var selectedNode = null;

    this.getSelectedNode = function () {
        return selectedNode;
    }

    this.onnodeunfolded = function (node) { }

    this.change = function (nodeEle, treeData) {

        load(nodeEle, treeData);
        nodeEle.changefoldstate();
        nodeEle.changefoldstate();
    }

    this.setNodeSelected = function (node) {

        selectedNode = node;

        var loop = function (nodes) {
            $Array(nodes).forEach(function (item) {
                currentondraw(item.children[1]);
                loop(item.children[2].children);
            });
        }
        loop(rootEle.children);

        currentondraw(rootNode.children[1]);
    }

    this.onnodeselected = function (node) {

    }

    var currentvalueselector = null;
    var currentchildrenselector = null;
    var currentleafselector = null;
    var currentondraw = null;
    this.load = function (treeData, ondraw, valueselector, childrenselector, leafselector) {

        rootEle.innerHTML = "";
        currentvalueselector = valueselector;
        currentchildrenselector = childrenselector;
        currentleafselector = leafselector;
        currentondraw = ondraw;

        rootNode = document.createElement("div");
        rootEle.appendChild(rootNode);
        rootNode.setAttribute("class", "treenode");

        var deep = [];
        deep.add(1);
        rootNode._deep = deep;
        rootNode.__bindedData = treeData;
        rootNode._folder = 0;

        var lstHead = document.createElement("span");
        deep.forEach(function (iitem, ii) {
            applyHeads(lstHead, deep, item, rootNode, iitem, ii, 0);
        });
        var headicon = applyHeadsIcon(lstHead, item, rootNode);

        rootNode.appendChild(lstHead);
        lstHead.setAttribute("class", "treeheads");

        var lstTitle = document.createElement("span");
        rootNode.appendChild(lstTitle);
        currentondraw(lstTitle);
        lstTitle.innerText = currentvalueselector(treeData);
        lstTitle.setAttribute("class", "treetitle");
        lstTitle.onclick = function () { self.setNodeSelected(this.parentNode); self.onnodeselected(this.parentNode); };

        var children = document.createElement("span");
        rootNode.appendChild(children);
        children.setAttribute("class", "treechildren");

        regFoldEvent(children, treeData, rootNode, deep, lstHead.children[lstHead.children.length - 2], lstHead.children[lstHead.children.length - 1],lstTitle);

        if (currentchildrenselector(treeData)) load(rootNode, currentchildrenselector(treeData));

        //默认折叠
        rootNode.changefoldstate();
    }

    var load = function (ele, lst) {
        if (!lst) return;
        var childrenContainer = ele.children[2];
        childrenContainer.innerHTML = "";
        ele.__bindedData.children = lst;

        lst.forEach(function (item, i) {
            var node = document.createElement("div");
            childrenContainer.appendChild(node);
            node.setAttribute("class", "treenode");

            var deep = ele._deep.slice(0);
            deep.add(i == lst.length - 1 ? 1 : 0);
            node._deep = deep;
            node.__bindedData = item;
            node._folder = 0;

            var lstHead = document.createElement("span");
            deep.forEach(function (iitem, ii) {
                applyHeads(lstHead, deep, item, node, iitem, ii);
            });
            var headicon = applyHeadsIcon(lstHead, item, node);

            node.appendChild(lstHead);
            lstHead.setAttribute("class", "treeheads");

            var lstTitle = document.createElement("span");
            node.appendChild(lstTitle);
            currentondraw(lstTitle);
            lstTitle.innerText = currentvalueselector(item);
            lstTitle.setAttribute("class", "treetitle");
            lstTitle.onclick = function () { self.setNodeSelected(this.parentNode); self.onnodeselected(this.parentNode); };

            var children = document.createElement("span");
            node.appendChild(children);
            children.setAttribute("class", "treechildren");

            regFoldEvent(children, item, node, deep, lstHead.children[lstHead.children.length - 2], lstHead.children[lstHead.children.length - 1],lstTitle);

            if (currentchildrenselector(item)) load(node, currentchildrenselector(item));

            //默认折叠
            node.changefoldstate();
        });
    }
    var applyHeads = function (lstHead, deep, item, node, iitem, ii) {

        var temp = document.createElement("span");
        lstHead.appendChild(temp);
        temp.setAttribute("class", "treehead");
        temp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        temp.style.cursor = "pointer";

        switch (((ii == deep.length - 1 ? 0 : 1) << 3) + ((currentleafselector(item) ? 1 : 0) << 2) + (node._folder << 1) + iitem) {
            case 0: temp.style.background = "url(" + jsDir + "Images/Tminus.png) center no-repeat"; break;
            case 1: temp.style.background = "url(" + jsDir + "Images/Lminus.png) center no-repeat"; break;
            case 6: temp.style.background = "url(" + jsDir + "Images/Tplus.png) center no-repeat"; break;
            case 7: temp.style.background = "url(" + jsDir + "Images/Lplus.png) center no-repeat"; break;

            case 4: temp.style.background = "url(" + jsDir + "Images/T.png) center no-repeat"; break;
            case 5: temp.style.background = "url(" + jsDir + "Images/L.png) center no-repeat"; break;

            case 8: temp.style.background = "url(" + jsDir + "Images/I.png) center no-repeat"; break;
            case 12: temp.style.background = "url(" + jsDir + "Images/I.png) center no-repeat"; break;
            case 13: temp.style.background = "url(" + jsDir + "Images/blank.png) center no-repeat"; break;

            default: break;
        }
    }

    var applyHeadsIcon = function (lstHead, item, node) {

        var temp = document.createElement("span");
        lstHead.appendChild(temp);
        temp.setAttribute("class", "treehead");
        temp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        temp.style.cursor = "pointer";
        temp.style.display = currentleafselector(item) ? "none" : "";

        switch (((currentleafselector(item) ? 1 : 0) << 1) + node._folder) {
            case 0: temp.style.background = "url(" + jsDir + "Images/openfoldericon.png) center no-repeat"; break;
            case 1: temp.style.background = "url(" + jsDir + "Images/foldericon.png) center no-repeat"; break;
            case 2: temp.style.background = "url(" + jsDir + "Images/file.png) center no-repeat"; break;
            case 3: temp.style.background = "url(" + jsDir + "Images/file.png) center no-repeat"; break;
            default: break;
        }

        return temp;
    }

    var hasNode = function (treeData, data) {

        if (treeData == data) return true;
        if (!treeData.children) return false;

        return treeData.children.first(function (item) { return hasNode(item, data); }) == true;
    }

    var getNode = function (nodes, match) {
        nodes = $Array(nodes);
        var node = nodes.first(function (item) { return match(item.__bindedData) });

        if (!node) nodes.forEach(function (item) {
            var n = getNode(item.children[2].children, match);
            node = n ? n : node;
        });

        return node;
    }

    this.getNode = function (match) {
        return getNode(rootEle.children, match);
    }
}