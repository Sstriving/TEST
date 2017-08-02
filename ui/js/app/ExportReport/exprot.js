ExamRequestRISExportConvMgr = function (groupName, layout, readOnly) {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function (ele, val) {
        if (val["GroupName"] != groupName) return;
        var form = new Form(document.body);
        var appFolder = form.GetField("AppDirectory");
        if (!ele.__apply) {
            var e = document.createElement("div");
            e.setAttribute("field", "RemoveGroupAttach");
            e.setAttribute("command", "-");
            e.setAttribute("conv", "ExamRequestConvMgr.RemoveExamRequestAttach_SysConv");
            ele.appendChild(e);
            ele.__apply = true;
        }
        ele = ele.children[0];
        val = val["AttachList"];
        //导出PDF用来去除无效图片

        while (ele.hasChildNodes()) //用来去除上次导出PDF的无效图片 当div下还存在子节点时 循环继续
        {
            ele.removeChild(ele.firstChild);
        }

        for (var i = 0; i < val.length; i++) {
            var attach = val[i];
            var div = null;
            var cnt = ele.children.length;
            var uid = attach.AttachUID;
            for (var j = 0; j < cnt; j++) {
                if (ele.children[j].__bindedData.AttachUID == uid) {
                    div = ele.children[j];
                    break;
                }
            }

            var img = null;
            if (!div) {
                if (!attach.Report) continue;
                var shiftReportImageField = "ShiftReportImage_" + uid;
                div = ele.ownerDocument.createElement("div");
                div.__bindedData = attach;
                div.style.position = "absolute";
                div.style.overflow = "hidden";
                div.style.display = "inline-block";
                div.style.textAlign = "center";

                img = ele.ownerDocument.createElement("img");
                img.style.verticalAlign = "middle";
                img.setAttribute("field", shiftReportImageField);
                img.setAttribute("command", "ShiftReportImage");
                img.setAttribute("condFields", shiftReportImageField);
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + {
                    "GroupName": groupName,
                    "AttachUID": uid
                }.toJSONString() + "')");

                if (!readOnly) {
                    var rmv = ele.ownerDocument.createElement("div");
                    rmv.style.top = "0px";
                    rmv.style.position = "absolute";
                    rmv.style.cursor = "pointer";
                    rmv.style.backgroundColor = "black";
                    rmv.style.color = "white";
                    rmv.style.fontSize = "15px";
                    rmv.style.width = "20px";
                    rmv.innerHTML = "X";
                    rmv.title = "移除报告图像";
                    rmv.onclick = function (i) {
                        return function () {
                            if (confirm("是否移除此报告图片")) commit(i);
                        }
                    } (img);
                }

                div.appendChild(img);
                if (!readOnly) {
                    div.appendChild(rmv);
                } else {
                    var lineHolder = ele.ownerDocument.createElement("span");
                    lineHolder.style.height = "100%";
                    lineHolder.style.verticalAlign = "middle";
                    lineHolder.style.display = "inline-block";
                    div.appendChild(lineHolder);
                }

                ele.appendChild(div);
                img.onload = function (i) {
                    return function () {
                        new ui(i).FitView();
                    }
                } (img);
                img.src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
            } else {
                if (!attach.Report) {
                    ele.removeChild(div);
                } else {
                    img = div.children[0];
                    img.src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
                }
            }
        }
        var cnt = ele.children.length;
        var rows = layout && layout.rows ? layout.rows : 3;
        var cols = layout && layout.cols ? layout.cols : 8;
        rows = parseInt((cnt + cols - 1) / cols, 10);
        cols = rows == 1 ? cnt : cols;
        ele.style.height = (240 * rows) + "px";
        var index = 0;
        for (var r = 0; r < rows - 1; r++) {
            for (var c = 0; c < cols; c++) {
                div = ele.children[index++];
                div.style.width = 100 / cols + "%";
                div.style.height = 100 / rows + "%";
                div.style.left = (100 / cols) * parseInt(index % cols, 10) + "%";
                div.style.top = (100 / rows) * r + "%";
                new ui(div.children[0]).FitView();
            }
        }
        var offset = (cols - cnt + index) * 100 / 2 / cols;
        for (; index < cnt; index++) {
            div = ele.children[index];
            div.style.width = 100 / cols + "%";
            div.style.height = 100 / rows + "%";
            div.style.left = (100 / cols) * parseInt(index % cols, 10) + offset + "%";
            div.style.top = (100 / rows) * (rows - 1) + "%";
            new ui(div.children[0]).FitView();
        }
    }
}