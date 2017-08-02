var arrayColor = ["#FF0000", "#B23AEE", "#919191", "#6B8E23", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

function CutImage() {
    this.Rect = { "X": 0, "Y": 0, "Width": 1, "Height": 1 };

    //    this.Apply = function (self) {
    //        var ID = function (id) {
    //            return document.getElementById(id);
    //        }
    //        var getCss = function (o, key) {
    //            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    //        }

    //        return function (parentEle, imgEle) {
    //            var rootDiv = ID("bluesky");
    //            if (rootDiv) {
    //                parentEle.removeChild(rootDiv);
    //            }
    //            else {
    //                rootDiv = document.createElement("div");
    //                rootDiv.setAttribute("id", "bluesky");
    //                rootDiv.style.left = "0px";
    //                rootDiv.style.width = "100%";
    //                rootDiv.style.top = "0px";
    //                rootDiv.style.height = "100%";
    //                rootDiv.style.position = "relative";

    //                rootDiv.zIndex = "1000";
    //                var cropLeft = parentEle.clientWidth / 2 - 50;
    //                var cropTop = parentEle.clientHeight / 2 - 50;
    //                var cropHeight = 100;
    //                var cropWidth = 100;
    //                var sInnerHtml = '<div id="zxxCropBox" style="height:' + cropHeight + 'px; width:' + cropWidth + 'px; position:absolute;left:' + cropLeft + 'px; top:' + cropTop + 'px; border:1px solid black;"><div id="zxxDragBg" style="height:100%; background:white; opacity:0.3; filter:alpha(opacity=30); cursor:move;"></div><div id="dragLeftTop" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:-3px; cursor:nw-resize;"></div><div id="dragLeftBot" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; bottom:-3px; cursor:sw-resize;"></div><div id="dragRightTop" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:-3px; cursor:ne-resize;"></div><div id="dragRightBot" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; bottom:-3px; cursor:se-resize;"></div><div id="dragTopCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; top:-3px; left:50%; margin-left:-3px; cursor:n-resize;"></div><div id="dragBotCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; bottom:-3px; left:50%; margin-left:-3px; cursor:s-resize;"></div><div id="dragRightCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:50%; margin-top:-3px; cursor:e-resize;"></div><div id="dragLeftCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:50%; margin-top:-3px; cursor:w-resize;"></div></div></div>';
    //                rootDiv.innerHTML = sInnerHtml;
    //                parentEle.insertBefore(rootDiv);

    //                var params = {
    //                    left: 0,
    //                    top: 0,
    //                    width: 0,
    //                    height: 0,
    //                    currentX: 0,
    //                    currentY: 0,
    //                    flag: false,
    //                    kind: "drag"
    //                };
    //                var startDrag = function (self, point, target, kind) {

    //                    params.width = getCss(target, "width");
    //                    params.height = getCss(target, "height");

    //                    if (getCss(target, "left") !== "auto") {
    //                        params.left = getCss(target, "left");
    //                    }
    //                    if (getCss(target, "top") !== "auto") {
    //                        params.top = getCss(target, "top");
    //                    }
    //                    point.onmousedown = function (event) {
    //                        params.kind = kind;
    //                        params.flag = true;
    //                        if (!event) {
    //                            event = window.event;
    //                        }
    //                        var e = event;
    //                        params.currentX = e.clientX;
    //                        params.currentY = e.clientY;

    //                        point.onselectstart = function () {
    //                            return false;
    //                        }
    //                        window.event.cancelBubble = true
    //                        return false;
    //                    };
    //                    rootDiv.onmousedown = function (event) {
    //                        window.event.cancelBubble = true
    //                        return false;
    //                    }
    //                    rootDiv.onmouseup = function () {
    //                        params.flag = false;
    //                        if (getCss(target, "left") !== "auto") {
    //                            params.left = getCss(target, "left");
    //                        }
    //                        if (getCss(target, "top") !== "auto") {
    //                            params.top = getCss(target, "top");
    //                        }
    //                        params.width = getCss(target, "width");
    //                        params.height = getCss(target, "height");


    //                        var posX = parseInt(target.style.left) - imgEle.style.posLeft;
    //                        var posY = parseInt(target.style.top) - imgEle.style.posTop;
    //                        var cropW = parseInt(target.style.width);
    //                        var cropH = parseInt(target.style.height);

    //                        posX /= imgEle.clientWidth;
    //                        posY /= imgEle.clientHeight;
    //                        cropW = (posX + cropW) / imgEle.clientWidth;
    //                        cropH = (posY + cropH) / imgEle.clientHeight;

    //                        self.Rect.X = posX;
    //                        self.Rect.Y = posY;
    //                        self.Rect.Width = cropW;
    //                        self.Rect.Height = cropH;
    //                        window.event.cancelBubble = true
    //                    };
    //                    rootDiv.onmousemove = function (event) {
    //                        var e = event ? event : window.event;
    //                        if (params.flag) {
    //                            var nowX = e.clientX, nowY = e.clientY;
    //                            var disX = nowX - params.currentX, disY = nowY - params.currentY;
    //                            if (params.kind === "n") {
    //                                //上拉伸
    //                                //高度增加或减小，位置上下移动
    //                                target.style.top = parseInt(params.top) + disY + "px";
    //                                target.style.height = parseInt(params.height) - disY + "px";
    //                            } else if (params.kind === "w") {//左拉伸
    //                                target.style.left = parseInt(params.left) + disX + "px";
    //                                target.style.width = parseInt(params.width) - disX + "px";
    //                            } else if (params.kind === "e") {//右拉伸
    //                                target.style.width = parseInt(params.width) + disX + "px";
    //                            } else if (params.kind === "s") {//下拉伸
    //                                target.style.height = parseInt(params.height) + disY + "px";
    //                            } else if (params.kind === "nw") {//左上拉伸
    //                                target.style.left = parseInt(params.left) + disX + "px";
    //                                target.style.width = parseInt(params.width) - disX + "px";
    //                                target.style.top = parseInt(params.top) + disY + "px";
    //                                target.style.height = parseInt(params.height) - disY + "px";
    //                            } else if (params.kind === "ne") {//右上拉伸
    //                                target.style.top = parseInt(params.top) + disY + "px";
    //                                target.style.height = parseInt(params.height) - disY + "px";
    //                                //右
    //                                target.style.width = parseInt(params.width) + disX + "px";
    //                            } else if (params.kind === "sw") {//左下拉伸
    //                                target.style.left = parseInt(params.left) + disX + "px";
    //                                target.style.width = parseInt(params.width) - disX + "px";
    //                                //下
    //                                target.style.height = parseInt(params.height) + disY + "px";
    //                            } else if (params.kind === "se") {//右下拉伸
    //                                target.style.width = parseInt(params.width) + disX + "px";
    //                                target.style.height = parseInt(params.height) + disY + "px";
    //                            } else {//移动
    //                                target.style.left = parseInt(params.left) + disX + "px";
    //                                target.style.top = parseInt(params.top) + disY + "px";
    //                            }
    //                            window.event.cancelBubble = true
    //                        }
    //                    }
    //                };

    //                startDrag(self, ID("zxxDragBg"), ID("zxxCropBox"), "drag");
    //                startDrag(self, ID("dragLeftTop"), ID("zxxCropBox"), "nw");
    //                startDrag(self, ID("dragLeftBot"), ID("zxxCropBox"), "sw");
    //                startDrag(self, ID("dragRightTop"), ID("zxxCropBox"), "ne");
    //                startDrag(self, ID("dragRightBot"), ID("zxxCropBox"), "se");
    //                startDrag(self, ID("dragTopCenter"), ID("zxxCropBox"), "n");
    //                startDrag(self, ID("dragBotCenter"), ID("zxxCropBox"), "s");
    //                startDrag(self, ID("dragRightCenter"), ID("zxxCropBox"), "e");
    //                startDrag(self, ID("dragLeftCenter"), ID("zxxCropBox"), "w");
    //            }
    //        };
    //    } (this);

    this.Apply2 = function(self) {
        return function(parentEle, imgEle) {
            var rootDiv = document.getElementById("bluesky");
            if (rootDiv) {
                parentEle.removeChild(rootDiv);
            } else {
                rootDiv = document.createElement("div");
                rootDiv.setAttribute("id", "bluesky");
                rootDiv.style.left = imgEle.offsetLeft + "px";
                rootDiv.style.width = imgEle.offsetWidth + "px";
                rootDiv.style.top = imgEle.offsetTop + "px";
                rootDiv.style.opacity = 0.3;
                rootDiv.style.height = imgEle.offsetHeight + "px";
                rootDiv.style.background = "white";
                rootDiv.style.position = "absolute";

                rootDiv.zIndex = "1000";
                parentEle.insertBefore(rootDiv);
                var e = window.event;
                // startX, startY 为鼠标点击时初始坐标
                // diffX, diffY 为鼠标初始坐标与 box 左上角坐标之差，用于拖动
                var startX, startY, diffX, diffY;


                // 鼠标按下
                rootDiv.onmousedown = function(e) {
                    startX = e.offsetX;
                    startY = e.offsetY;

                    var ee = document.getElementById("deleteBox");
                    if (ee !== null) {
                        rootDiv.removeChild(ee);
                    }
                    // 在页面创建 box
                    var active_box = document.createElement("div");
                    active_box.style.background = "#f00";
                    active_box.style.position = "absolute";
                    active_box.style.opacity = 0.5;
                    active_box.style.cursor = "move";
                    active_box.id = "active_box";
                    active_box.style.top = startY + 'px';
                    active_box.style.left = startX + 'px';
                    rootDiv.appendChild(active_box);
                    active_box = null;

                    window.event.cancelBubble = true
                };

                // 鼠标移动
                rootDiv.onmousemove = function(e) {
                    // 更新 box 尺寸
                    if (document.getElementById("active_box") !== null) {
                        var ab = document.getElementById("active_box");
                        ab.style.width = e.offsetX - startX + 'px';
                        ab.style.height = e.offsetY - startY + 'px';
                    }
                }
                window.event.cancelBubble = true
            };

            // 鼠标抬起
            rootDiv.onmouseup = function(e) {
                var ab = document.getElementById("active_box");
                if (ab == null) return
                ab.id = "deleteBox";
                if (ab.offsetWidth < 3 || ab.offsetHeight < 3) {
                    rootDiv.removeChild(ab);
                } else {
                    var posX = parseInt(ab.style.left) - imgEle.style.posLeft;
                    var posY = parseInt(ab.style.top) - imgEle.style.posTop;
                    var cropW = parseInt(ab.style.width);
                    var cropH = parseInt(ab.style.height);

                    posX /= imgEle.clientWidth;
                    posY /= imgEle.clientHeight;
                    cropW = (posX + cropW) / imgEle.clientWidth;
                    cropH = (posY + cropH) / imgEle.clientHeight;

                    self.Rect.X = posX;
                    self.Rect.Y = posY;
                    self.Rect.Width = cropW;
                    self.Rect.Height = cropH;
                }
                window.event.cancelBubble = true
            };
        }
    }(this);
}

var ExamRequestConvMgr = new function() {
    this.oo(BaseConvMgr);
}();

function ExamRequestAttach_SysConv(groupName, uid) {
    Form_SingleValueConv.apply(this, arguments);
    this.DecodeArguments = function(ele, args) {
        if (!args.length) throw new Error("Array arguments needed for Set");
        var attach = {};
        attach.GroupName = args[0].GroupName;
        attach.Attach = args[0].AttachList[0];
        return attach;
    }
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return val["GroupName"] == groupName && val.Attach.AttachUID == uid && self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    }(this);
    this.ApplyValue = function(ele, val) {
        ele.__uid = uid;
        ele.src = addUrlParam(val.Attach.AttachUrl, "tmp", Math.random());
    }
}
ExamRequestConvMgr.ExamRequestAttachList_SysConv = function(groupName, layout) {
    Form_SingleValueConv.apply(this, arguments);
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return val["GroupName"] == groupName && self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    }(this);

    this.ApplyValue = function(ele, val) {
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

        for (var i = 0; i < val.length; i++) {
            var attach = val[i];
            var div = null;
            var cnt = ele.children.length;
            var uid = attach.AttachUID;
            for (var j = 0; j < cnt; j++) {
                if (ele.children[j].__bindedData.AttachUID == uid) {
                    div = ele.children[j];
                    div.__bindedData = attach;
                    break;
                }
            }
            var img = null;
            if (!div) {
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (!m_CaptureImageList.count)
                        m_CaptureImageList.count = 1;
                    else
                        m_CaptureImageList.count++;
                    m_CaptureImageList[uid] = uid;
                }
                var shiftReportImageField = "ShiftReportImage_" + uid;
                div = ele.ownerDocument.createElement("div");
                div.__bindedData = attach;
                //div.style.position = "absolute";//若采用动态计算图像布局，需要取消该行注释
                div.style.overflow = "hidden";
                div.style.display = "inline-block";
                div.style.textAlign = "center";

                img = ele.ownerDocument.createElement("img");
                img.setAttribute("field", shiftReportImageField);
                img.setAttribute("command", "ShiftReportImage");
                img.setAttribute("condFields", shiftReportImageField);
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + { "GroupName": groupName, "AttachUID": uid }.toJSONString() + "')");

                var rmv = ele.ownerDocument.createElement("span");
                rmv.style.position = "absolute";
                rmv.style.cursor = "pointer";
                rmv.style.backgroundColor = "black";
                rmv.style.color = "white";
                rmv.style.fontSize = "15px";
                rmv.innerHTML = "X";
                rmv.title = "删除该图";
                rmv.onmousedown = function(group, uid, d) {
                    return function() {
                        var tmp = ele.__img__container;
                        if (tmp && tmp.parentNode) {
                            ele.__img__container = null;
                            tmp.parentNode.removeChild(tmp);
                        }
                        if (confirm("是否删除此图片")) {
                            var param = {};
                            param.field = "RemoveGroupAttach_" + uid;
                            param.command = "RemoveGroupAttach";
                            param.condFields = "RemoveGroupAttach_" + uid;
                            param.conv = "StaticValueConv('" + { "GroupName": group, "AttachUIDList": [uid] }.toJSONString() + "')";
                            usercommit(d, param);
                        }
                        return false;
                    }
                }(groupName, uid, div);


                img.onload = function(i) {
                    return function() {
                        new ui(i).FitView();
                    }
                }(img);
                img.onmousedown = function(i) {
                    var func = function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            playVideo(i._videoSrc);
                        return false;
                    }
                    return func;
                }(img);
                div.onclick = function(i) {
                    return function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            return
                        else
                            commit(i)
                    }
                }(img);
                div.ondblclick = function(d, i, r, group) {
                    var show = function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            return
                        if (!i.parentNode) return;
                        var doc = Wnd(ele).GetDocument();
                        var tmp = ele.__img__container;
                        if (!tmp) {
                            tmp = doc.createElement("div");
                            tmp.GetGroupName = function() { return group; }
                            tmp.GetAttachUID = function() { return tmp.__uid; }
                            tmp.setAttribute("command", "AttachWindow");
                            var currAttachField = "field_CurrAttach_UID";
                            tmp.setAttribute("field", currAttachField);
                            tmp.setAttribute("condFields", currAttachField);
                            tmp.setAttribute("conv", "ExamRequestConvMgr.AttachWindowConv");

                            tmp.style.position = "absolute";
                            tmp.style.backgroundColor = "#bbb";
                            tmp.style.left = doc.documentElement.scrollLeft + "px";
                            tmp.style.top = doc.documentElement.scrollTop + "px";
                            tmp.style.zIndex = 99999999;
                            ele.__img__container = tmp;
                            doc.body.appendChild(tmp);

                            var container = doc.createElement("div");
                            container.style.position = "absolute";
                            container.style.left = "0px";
                            container.style.right = "0px";
                            container.style.top = "0px";
                            container.style.bottom = "24px";
                            container.style.textAlign = "center";
                            container.style.border = "8px solid black";

                            var im = doc.createElement("img");
                            im.style.verticalAlign = "middle";
                            im.title = "左键调节，双击还原"
                            im.setAttribute("field", "AttachList");
                            im.setAttribute("command", "AttachReset");
                            im.setAttribute("condFields", currAttachField);

                            im.setAttribute("conv", "ExamRequestAttach_SysConv('" + group + "','" + i.__uid + "')");

                            im.onload = function(i) {
                                return function() {
                                    new ui(i).FitView();
                                }
                            }(im);
                            container.onmousedown = function() {
                                if (isModifyGray) {
                                    tmp.__curr = tmp.GetAttachUID();
                                    tmp.__offset = Event().Offset();
                                    return false;
                                }
                            }
                            container.onmousemove = function() {
                                if (isModifyGray) {
                                    if (!tmp.GetAttachUID() || tmp.__curr != tmp.GetAttachUID()) return;
                                    var offset = Event().Offset();
                                    var dx = offset.x - tmp.__offset.x;
                                    var dy = offset.y - tmp.__offset.y;
                                    tmp.__offset = offset;
                                    tmp.__DOffset = { 'x': dx, 'y': dy };
                                    var src = im.src;
                                    commit(tmp);
                                    if (src == im.src) tmp.__curr = null; //修改失败
                                }
                            }
                            container.ondblclick = function() {
                                commit(im);
                                if (isCutImg) {
                                    EndClip();
                                }
                            }
                            container.onmouseup = function() {
                                if (isModifyGray) {
                                    tmp.__curr = null;
                                }
                            }
                            container.appendChild(im);
                            var lineHolder = doc.createElement("span");
                            lineHolder.style.height = "100%";
                            lineHolder.style.verticalAlign = "middle";
                            lineHolder.style.display = "inline-block";
                            container.appendChild(lineHolder);
                            tmp.appendChild(container);

                            function goto(btnFirst, btnPrevious, btnNext, btnLast, index) {
                                if (index < 0) index = 0;
                                if (index >= ele.children.length) index = ele.children.length - 1;
                                if (index > -1) {
                                    tmp.children[0].children[0].setAttribute("conv", "ExamRequestAttach_SysConv('" + group + "','" + ele.children[index].children[0].__uid + "')");
                                    tmp.children[0].children[0].src = ele.children[index].children[0].src;
                                    tmp.children[0].children[0].curr = ele.children[index].children[0];
                                    tmp.__uid = ele.children[index].children[0].__uid;
                                } else {
                                    tmp.children[0].children[0].src = null;
                                    tmp.children[0].children[0].curr = null;
                                    tmp.__uid = null;
                                }
                                btnFirst.disabled = index == 0 || ele.children.length < 1 ? "disabled" : "";
                                btnPrevious.disabled = index < 1 ? "disabled" : "";
                                btnNext.disabled = index > ele.children.length - 2 ? "disabled" : "";
                                btnLast.disabled = index == ele.children.length - 1 || ele.children.length < 1 ? "disabled" : "";
                                if (isCutImg) {
                                    EndClip();
                                }
                            }
                            var bar = doc.createElement("div");
                            bar.style.textAlign = "center";
                            var btnFirst = doc.createElement("input");
                            btnFirst.type = "button";
                            btnFirst.className = "button";
                            btnFirst.value = "最前";
                            bar.appendChild(btnFirst);
                            var btnPrevious = doc.createElement("input");
                            btnPrevious.type = "button";
                            btnPrevious.className = "button";
                            btnPrevious.value = "上一副";
                            bar.appendChild(btnPrevious);
                            var btnNext = doc.createElement("input");
                            btnNext.type = "button";
                            btnNext.className = "button";
                            btnNext.value = "下一副";
                            bar.appendChild(btnNext);
                            var btnLast = doc.createElement("input");
                            btnLast.type = "button";
                            btnLast.className = "button";
                            btnLast.value = "最后";
                            bar.appendChild(btnLast);
                            btnFirst.onclick = function() {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, 0);
                            }
                            btnPrevious.onclick = function() {
                                for (var j = 0; j < ele.children.length; j++) {
                                    if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
                                        goto(btnFirst, btnPrevious, btnNext, btnLast, j - 1);
                                        break;
                                    }
                                }
                            }
                            btnNext.onclick = function() {
                                for (var j = 0; j < ele.children.length; j++) {
                                    if (ele.children[j].children[0] == tmp.children[0].children[0].curr) {
                                        goto(btnFirst, btnPrevious, btnNext, btnLast, j + 1);
                                        break;
                                    }
                                }
                            }
                            btnLast.onclick = function() {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, ele.children.length - 1);
                            }
                            if (isCutImg) {
                                var cutImage = new CutImage();
                                cutImage.Rect = formCallCenter.DetectFormByElement(d).GetField("DefaultClip");
                                var btnApplyCut = doc.createElement("input");
                                btnApplyCut.GetGroupName = tmp.GetGroupName;
                                btnApplyCut.GetAttachUID = tmp.GetAttachUID;
                                btnApplyCut.type = "button";
                                btnApplyCut.className = "button";
                                btnApplyCut.value = "确定裁剪";
                                btnApplyCut._cutImage = cutImage;
                                btnApplyCut.setAttribute("disabled");
                                btnApplyCut.setAttribute("field", "field_CurrAttachClip");
                                btnApplyCut.setAttribute("command", "AttachClip");
                                btnApplyCut.setAttribute("condFields", "field_CurrAttachClip");
                                btnApplyCut.setAttribute("conv", "ExamRequestConvMgr.AttachClipConv");
                                bar.appendChild(btnApplyCut);

                                btnApplyCut.onclick = function() {
                                    commit(this);
                                    btnShowCut.onclick();
                                }
                                var btnShowCut = doc.createElement("input");
                                btnShowCut.type = "button";
                                btnShowCut.className = "button";
                                btnShowCut.value = "显示裁剪区域";

                                bar.appendChild(btnShowCut);
                                btnShowCut.onclick = function() {
                                    if (btnShowCut.value == "显示裁剪区域") {
                                        BeginClip();
                                    } else {
                                        EndClip();
                                    }
                                }

                                function BeginClip() {
                                    if (btnShowCut.value == "显示裁剪区域") {
                                        btnShowCut.value = "隐藏裁剪区域";
                                        btnApplyCut.removeAttribute("disabled");
                                        cutImage.Apply2(container, im);
                                    }
                                }

                                function EndClip() {
                                    if (btnShowCut.value != "显示裁剪区域") {
                                        btnShowCut.value = "显示裁剪区域"
                                        btnApplyCut.setAttribute("disabled");
                                        cutImage.Apply2(container, im);
                                    }
                                }
                                var btnDefaultCut = doc.createElement("input");
                                btnDefaultCut.type = "button";
                                btnDefaultCut.className = "button";
                                btnDefaultCut.value = "默认裁剪";
                                btnDefaultCut.setAttribute("conv", "ExamRequestConvMgr.DefAttachClipConv");
                                btnDefaultCut.setAttribute("field", "field_DefAttachClip");
                                btnDefaultCut.setAttribute("condFields", "field_DefAttachClip");
                                btnDefaultCut.setAttribute("command", "AttachClip");
                                btnDefaultCut.GetGroupName = tmp.GetGroupName;
                                btnDefaultCut.GetAttachUID = tmp.GetAttachUID;
                                btnDefaultCut.onclick = function() {
                                    //暂时还没考虑调窗的问题
                                    commit(im);
                                    commit(this);
                                    EndClip();
                                }
                                bar.appendChild(btnDefaultCut);

                                var btnSetDefaultRect = doc.createElement("input");
                                btnSetDefaultRect.type = "button";
                                btnSetDefaultRect.className = "button";
                                btnSetDefaultRect.style.width = "120px";
                                btnSetDefaultRect.value = "设为默认裁剪区";
                                btnSetDefaultRect.onclick = function() {
                                    window.CurrAttachClipConv = function() {
                                        Form_SingleValueConv.apply(this, arguments);
                                        this.GetUIValue = function() {
                                            return cutImage.Rect.toJSONString();
                                        }
                                    }
                                    try {
                                        var param = {};
                                        param.field = "DefaultClip";
                                        param.conv = "window.CurrAttachClipConv";
                                        useroperate(this, changeFieldValue, param);
                                    } finally {
                                        window.CurrAttachClipConv = undefined;
                                    }
                                }

                                bar.appendChild(btnSetDefaultRect);

                                var btnCancelDefaultRect = doc.createElement("input");
                                btnCancelDefaultRect.type = "button";
                                btnCancelDefaultRect.className = "button";
                                btnCancelDefaultRect.style.width = "120px";
                                btnCancelDefaultRect.value = "取消默认裁剪区";
                                btnCancelDefaultRect.onclick = function() {
                                    var param = {};
                                    param.field = "DefaultClip";
                                    param.conv = "StaticValueConv('{\"X\": 0, \"Y\": 0, \"Width\": 1, \"Height\": 1}')";
                                    useroperate(d, changeFieldValue, param);
                                }
                                bar.appendChild(btnCancelDefaultRect);
                            }
                            var btnClose = doc.createElement("input");
                            btnClose.type = "button";
                            btnClose.className = "button";
                            btnClose.value = "关闭";
                            bar.appendChild(btnClose);
                            btnClose.onclick = function() {
                                ele.__img__container = null;
                                if (tmp.parentNode) tmp.parentNode.removeChild(tmp);
                            }
                            tmp.__goto = function(index) {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, index);
                            }
                            bar.style.position = "absolute";
                            bar.style.left = "300px";
                            bar.style.marginLeft = "0px";
                            bar.style.bottom = "0px";
                            tmp.appendChild(bar);
                        }
                        tmp.style.left = "6px";
                        tmp.style.top = "6px";
                        //tmp.style.backgroundColor = "#bbb";
                        tmp.style.width = (doc.documentElement.scrollWidth - 12) + "px";
                        tmp.style.height = (doc.documentElement.scrollHeight - 12) + "px";
                        tmp.children[0].children[0].src = i.src;
                        tmp.children[0].children[0].curr = i;
                        tmp.__group = group;
                        tmp.__uid = i.__uid;

                        for (var j = 0; j < ele.children.length; j++) {
                            if (ele.children[j].children[0] == i) {
                                tmp.__goto(j);
                                break;
                            }
                        }
                    }
                    return show;
                }(div, img, rmv, groupName);

                div.appendChild(img);
                div.appendChild(rmv);

                ele.appendChild(div);
            } else {
                img = div.children[0];
            }
            if (IsAVI(attach.AttachUrl)) {
                img.src = "../../../img/video.png";
                img._videoSrc = attach.AttachUrl;
            } else {
                img.src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
            }
            img.__uid = attach.AttachUID;

            if (attach["Report"] && attach["Report"]["Index"] >= 0) {
                img.title = "报告图像";
                img.alt = "报告图像";
                img.parentNode.style.border = "1px solid red";
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (!m_ReportImageList.count) {
                        m_ReportImageList.count = 1;
                        m_ReportImageList[attach.AttachUID] = attach.AttachUID;
                    } else {
                        if (!m_ReportImageList[attach.AttachUID]) {
                            m_ReportImageList.count++;
                            m_ReportImageList[attach.AttachUID] = attach.AttachUID;
                        }
                    }
                }
            } else if (IsAVI(attach.AttachUrl)) {
                img.title = "检查视频";
                img.alt = "检查视频";
                img.parentNode.style.border = "1px solid blue";
            } else {
                img.title = "检查图像";
                img.alt = "检查图像";
                img.parentNode.style.border = "1px solid blue";
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (m_ReportImageList.count) {
                        if (m_ReportImageList[attach.AttachUID]) {
                            delete m_ReportImageList[attach.AttachUID];
                            m_ReportImageList.count--;
                        }
                    }
                }
            }
        }

        var cnt = ele.children.length;
        //固定图像显示在一行（横向滚动轴）
        ele.parentNode.style.overflowX = "scroll";
        ele.parentNode.style.overflowY = "hidden";
        for (var j = 0; j < cnt; j++) {
            div = ele.children[j];
            div.style.width = "160px";
            div.style.marginLeft = "20px";
        }
        ele.style.height = "100%";
        ele.style.width = cnt * 200 + "px";

        //动态计算图像显示在多行（纵向滚动轴）
        // var rows = layout && layout.rows ? layout.rows : 3;
        // var cols = layout && layout.cols ? layout.cols : 8;
        // for (var j = 0; j < cnt; j++) {
        //     div = ele.children[j];
        //     div.style.width = 100 / cols + "%";
        //     div.style.height = 100 / rows + "%";
        //     div.style.left = (100 / cols) * parseInt(j % cols, 10) + "%";
        //     div.style.top = (100 / rows) * parseInt(j / cols, 10) + "%";
        //     div.style.marginLeft = ((parseInt(j % cols, 10)) * 3) + "px";
        //     div.style.marginTop = ((parseInt(j / cols, 10)) * 3) + "px";
        // }
        UpdateImageCount();
    }
}
var m_CaptureImageList = {};
var m_ReportImageList = {};

function UpdateImageCount() {
    var eleCaptureImageCount = document.getElementById("CaptureImageCount");
    if (eleCaptureImageCount) {
        if (m_CaptureImageList && m_CaptureImageList.count) {
            eleCaptureImageCount.innerHTML = m_CaptureImageList.count;
        } else {
            eleCaptureImageCount.innerHTML = "0";
        }
    }

    var eleReportImageCount = document.getElementById("ReportImageCount");
    if (eleReportImageCount) {
        if (m_ReportImageList && m_ReportImageList.count) {
            eleReportImageCount.innerHTML = m_ReportImageList.count;
        } else {
            eleReportImageCount.innerHTML = "0";
        }
    }
}

ExamRequestConvMgr.DefAttachClipConv = function() {
    Form_SingleValueConv.apply(this, arguments);
    this.GetValue = function(ele) {
        var groupName = ele.GetGroupName();
        var attachUID = ele.GetAttachUID();
        var defClip = formCallCenter.DetectFormByElement(ele).GetField("DefaultClip");
        return { "GroupName": groupName, "AttachUID": attachUID, "X": defClip.X, "Y": defClip.Y, "Width": defClip.Width, "Height": defClip.Height }.toJSONString();
    }
}
ExamRequestConvMgr.AttachWindowConv = function() {
    this.GetValue = function(ele) {
        var param = {};
        param.GroupName = ele.GetGroupName();
        param.AttachUID = ele.GetAttachUID();
        param.DX = ele.__DOffset ? ele.__DOffset.x : 0;
        param.DY = ele.__DOffset ? ele.__DOffset.y : 0;
        return param.toJSONString();
    }
    this.oo(new BaseConvMgr.DefaultValueConverter());
}
ExamRequestConvMgr.AttachClipConv = function() {
    this.GetValue = function(ele) {
        var param = {};
        param.GroupName = ele.GetGroupName();
        param.AttachUID = ele.GetAttachUID();
        param.X = ele._cutImage.Rect.X;
        param.Y = ele._cutImage.Rect.Y;
        param.Width = ele._cutImage.Rect.Width;
        param.Height = ele._cutImage.Rect.Height;
        return param.toJSONString();

    }
    this.oo(new BaseConvMgr.DefaultValueConverter());
}
ExamRequestConvMgr.RemoveExamRequestAttach_SysConv = function() {
    this.ApplyValue = function(self) {
        return function(ele, val) {
            if (!val || !val.AttachUIDList) return;
            var children = ele.children;
            var uidList = val.AttachUIDList;
            for (var i = children.length - 1; i > -1; i--) {
                for (var j = 0; j < uidList.length; j++) {
                    if (children[i].__bindedData.AttachUID == uidList[j]) {
                        var uid = m_CaptureImageList[children[i].__bindedData.AttachUID];
                        var pos = [children[i].style.left, children[i].style.top, children[i].style.marginLeft, children[i].style.marginTop];
                        ele.removeChild(children[i]);
                        if (uid) {
                            delete m_CaptureImageList[uid];
                            m_CaptureImageList.count--;
                            if (m_ReportImageList[uid]) {
                                delete m_ReportImageList[uid];
                                m_ReportImageList.count--;
                            }
                        }
                        for (var j = i; j < children.length; j++) {
                            var tmp = [children[j].style.left, children[j].style.top, children[j].style.marginLeft, children[j].style.marginTop];
                            children[j].style.left = pos[0];
                            children[j].style.top = pos[1];
                            children[j].style.marginLeft = pos[2];
                            children[j].style.marginTop = pos[3];
                            pos = tmp;
                        }
                        break;
                    }
                }
            }
            UpdateImageCount();
        }
    }(this);
    var base = new Form_SingleValueConv();
    var determineApply_base = base.DetermineApply;
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return determineApply_base(ele, val) && val && val.AttachUIDList && val.AttachUIDList.length > 0;
        };
    }(this);
    this.oo(base);
}

function addUrlParam(url, name, value) {
    if (!url) return "?" + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (url.indexOf("?") > -1) return url + "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url + "?" + encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

function IsAVI(src) {
    var res = false;
    if (src.indexOf('.avi') > 0)
        res = true;
    return res;
}
//RIS 报告图像缩略图Conv
ExamRequestConvMgr.ExamRequestAttachList_SysConv_ReportThumbnail = function(groupName, layout, readOnly) {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        if (val["GroupName"] != groupName) return;
        var form = formCallCenter.DetectFormByElement(ele);
        var appFolder = form.GetField(form.GetTitle("AppDirectory"))
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

        while (ele.hasChildNodes()) //当div下还存在子节点时 循环继续
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
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + { "GroupName": groupName, "AttachUID": uid }.toJSONString() + "')");

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
                    rmv.onclick = function(i) {
                        return function() {
                            if (confirm("是否移除此报告图片")) commit(i);
                        }
                    }(img);
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
                img.onload = function(i) {
                    return function() {
                        new ui(i).FitView();
                    }
                }(img);
                var urlParams = ParseUrl(attach.AttachUrl);
                var src0 = "file:///" + appFolder + "\\ImageCache\\Capture\\" + form.GetField("CurrReportExamRequestID") + "\\ReportImage\\" + urlParams.Parameters.uid + ".jpg?" + Math.random()
                img.__src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
                img.onerror = function() {
                    if (this.src != this.__src) this.src = this.__src;
                }
                img.onload = function() {
                    delete this.__src;
                }
                img.src = src0
            } else {
                if (!attach.Report) {
                    ele.removeChild(div);
                } else {
                    img = div.children[0];
                    var urlParams = ParseUrl(attach.AttachUrl);
                    var src0 = "file:///" + appFolder + "\\ImageCache\\Capture\\" + form.GetField("CurrReportExamRequestID") + "\\ReportImage\\" + urlParams.Parameters.uid + ".jpg?" + Math.random()
                    img.__src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
                    img.onerror = function() {
                        if (this.src != this.__src) this.src = this.__src;
                    }
                    img.onload = function() {
                        delete this.__src;
                    }
                    img.src = src0
                }
            }
        }
        var cnt = ele.children.length;
        var rows = layout && layout.rows ? layout.rows : 3;
        var cols = layout && layout.cols ? layout.cols : 8;
        rows = parseInt((cnt + cols - 1) / cols, 10);
        cols = rows == 1 ? cnt : cols;
        var heightval = 240;
        //        if(cnt==3||cnt>4){
        //            heightval=162;
        //        }
        //        if(cnt==4){
        //            cols = rows =2;
        //        }
        //        else if(cnt==6){
        //            cols = 3;
        //            rows =2;
        //        }
        //        else if(cnt==9){
        //            cols = rows =3;
        //        }
        //        else if(cnt==12){
        //            cols = 4;
        //            rows =3;
        //        }
        ele.style.height = (heightval * rows) + "px";
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

window.playVideo = function(file) {
    if (window.videoControlPan) {
        window.videoControlPan.parentNode.removeChild(window.videoControlPan);
        window.videoControlPan.outerHTML = '';
        window.videoControlPan = undefined;
    }

    var videoPan = document.createElement("div");
    videoPan.style.cssText = "z-index:1000;position: absolute; top: 84px; left: 500px;";
    var videoClosePan = document.createElement("div");
    videoClosePan.align = "right";
    var videoCloseButton = document.createElement("input");
    videoCloseButton.setAttribute("type", "button");
    videoCloseButton.setAttribute("width", "10px");
    videoCloseButton.setAttribute("value", "X");
    videoCloseButton.onclick = function() {
        if (window.videoControlPan) {
            window.videoControlPan.parentNode.removeChild(window.videoControlPan);
            window.videoControlPan.outerHTML = '';
            window.videoControlPan = undefined;
        }
    }
    var videoControl = document.createElement("embed");
    videoControl.setAttribute("width", "400px");
    videoControl.setAttribute("id", "test");
    videoControl.setAttribute("height", "300px");
    videoControl.setAttribute("border", "1");
    videoControl.setAttribute("showdisplay", "0");
    videoControl.setAttribute("showcontrols", "1");
    videoControl.setAttribute("autostart", "1");
    videoControl.setAttribute("autorewind", "0");
    videoControl.setAttribute("playcount", "1");
    videoControl.setAttribute("filename", "");
    videoControl.setAttribute("src", file);

    videoPan.appendChild(videoClosePan);
    videoClosePan.appendChild(videoCloseButton);
    videoPan.appendChild(videoControl);
    document.body.appendChild(videoPan);
    window.videoControlPan = videoPan;
}

ExamRequestConvMgr.ExamRequestAttachList_SchematicSysConv = function(groupName, layout) {
    var eleOldWidth = 1;
    Form_SingleValueConv.apply(this, arguments);
    this.DetermineApply = function(self) {
        return function(ele, val) {
            return val["GroupName"] == groupName && self.CompareValues(val, self.GetValue(ele)) != 0;
        }
    }(this);
    this.ApplyValue = function(ele, val) {
        var perElement = ele;
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

        var from = formCallCenter.GetFormByID("ReportModule");
        for (var i = 0; i < val.length; i++) {
            var attach = val[i];
            var div = null;
            var cnt = ele.children.length;
            var uid = attach.AttachUID;
            for (var j = 0; j < cnt; j++) {
                if (ele.children[j].__bindedData.AttachUID == uid) {
                    div = ele.children[j];
                    div.__bindedData = attach;
                    break;
                }
            }
            var img = null;
            var body = null;
            if (!div) {
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (!m_CaptureImageList.count)
                        m_CaptureImageList.count = 1;
                    else
                        m_CaptureImageList.count++;
                    m_CaptureImageList[uid] = uid;
                }
                var shiftReportImageField = "ShiftReportImage_" + uid;
                div = ele.ownerDocument.createElement("div");
                div.__bindedData = attach;
                //div.style.position = "absolute"; //若采用动态计算图像布局，需要取消该行注释
                div.style.overflow = "hidden";
                div.style.display = "inline-block";
                div.style.textAlign = "center";
                var value = from.GetField("SchematicBodyPartList");

                var body = ele.ownerDocument.createElement("div");
                body.setAttribute("conv", "ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicBodyPartListConv('" + uid + "')");
                body.setAttribute("field", "SchematicBodyPartList");
                body.setAttribute("valuemember", "SchematicBodyPartID");
                body.setAttribute("displaymember", "SchematicBodyPartName");
                body.setAttribute("itemfield", "SchematicBodyPart");
                body.setAttribute("itemCommand", "-");

                var content = ele.ownerDocument.createElement("div");
                if (attach.Schematic != null) {
                    content.innerHTML = attach.Schematic.Index;
                    content.style.width = "6px";
                    content.style.height = "6px";
                    var color = arrayColor[attach.Schematic.Index - 1]; //RGBToHex(attach.Schematic.Color);
                    content.style.color = color;
                    content.style.cssText = content.style.cssText + "margin-left:45px;";
                } else {
                    content.style.color = "";
                    content.innerHTML = "";
                    content.style.cssText = content.style.cssText + "margin-left:45px;";
                }

                img = ele.ownerDocument.createElement("img");
                img.setAttribute("field", shiftReportImageField);
                img.setAttribute("command", "ShiftReportImage");
                img.setAttribute("condFields", shiftReportImageField);
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + { "GroupName": groupName, "AttachUID": uid }.toJSONString() + "')");

                var rmv = ele.ownerDocument.createElement("span");

                rmv.style.position = "absolute";
                rmv.style.cursor = "pointer";
                rmv.style.backgroundColor = "black";
                rmv.style.color = "white";
                rmv.style.fontSize = "15px";
                rmv.innerHTML = "X";
                rmv.title = "删除该图";
                rmv.onmousedown = function(group, uid, d) {
                    return function() {
                        var tmp = ele.__img__container;
                        if (tmp && tmp.parentNode) {
                            ele.__img__container = null;
                            tmp.parentNode.removeChild(tmp);
                        }
                        if (confirm("是否删除此图片")) {
                            var param = {};
                            param.field = "RemoveGroupAttach_" + uid;
                            param.command = "RemoveGroupAttach";
                            param.condFields = "RemoveGroupAttach_" + uid;
                            param.conv = "StaticValueConv('" + { "GroupName": group, "AttachUIDList": [uid] }.toJSONString() + "')";
                            usercommit(d, param);
                        }
                        return false;
                    }
                }(groupName, uid, div);


                img.onload = function(i) {
                    return function() {
                        new ui(i).FitView();
                    }
                }(img);
                img.onmousedown = function(i) {
                    var func = function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            playVideo(i._videoSrc);
                        return false;
                    }
                    return func;
                }(img)
                img.onclick = function(i) {
                    return function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            return
                        else
                            commit(i)
                    }
                }(img);
                img.ondblclick = function(d, i, r, group) {
                    var show = function() {
                        if ((i._videoSrc) && (IsAVI(i._videoSrc)))
                            return
                        if (!i.parentNode) return;
                        var doc = Wnd(ele).GetDocument();
                        var tmp = ele.__img__container;
                        if (!tmp) {
                            tmp = doc.createElement("div");
                            tmp.GetGroupName = function() { return group; }
                            tmp.GetAttachUID = function() { return tmp.__uid; }
                            tmp.setAttribute("command", "AttachWindow");
                            var currAttachField = "field_CurrAttach_UID";
                            tmp.setAttribute("field", currAttachField);
                            tmp.setAttribute("condFields", currAttachField);
                            tmp.setAttribute("conv", "ExamRequestConvMgr.AttachWindowConv");


                            tmp.style.position = "absolute";
                            tmp.style.backgroundColor = "#bbb";
                            tmp.style.left = doc.documentElement.scrollLeft + "px";
                            tmp.style.top = doc.documentElement.scrollTop + "px";
                            tmp.style.zIndex = 99999999;
                            ele.__img__container = tmp;
                            doc.body.appendChild(tmp);

                            var container = doc.createElement("div");
                            container.style.position = "absolute";
                            container.style.left = "0px";
                            container.style.right = "0px";
                            container.style.top = "0px";
                            container.style.bottom = "24px";
                            container.style.textAlign = "center";
                            container.style.border = "8px solid black";

                            var im = doc.createElement("img");
                            im.style.verticalAlign = "middle";
                            im.title = "左键调节，双击还原"
                            im.setAttribute("field", "AttachList");
                            im.setAttribute("command", "AttachReset");
                            im.setAttribute("condFields", currAttachField);

                            im.setAttribute("conv", "ExamRequestAttach_SysConv('" + group + "','" + i.__uid + "')");

                            im.onload = function(i) {
                                return function() {
                                    new ui(i).FitView();
                                }
                            }(im);
                            container.onmousedown = function() {
                                if (isModifyGray) {
                                    tmp.__curr = tmp.GetAttachUID();
                                    tmp.__offset = Event().Offset();
                                    return false;
                                }
                            }
                            container.onmousemove = function() {
                                if (isModifyGray) {
                                    if (!tmp.GetAttachUID() || tmp.__curr != tmp.GetAttachUID()) return;
                                    var offset = Event().Offset();
                                    var dx = offset.x - tmp.__offset.x;
                                    var dy = offset.y - tmp.__offset.y;
                                    tmp.__offset = offset;
                                    tmp.__DOffset = { 'x': dx, 'y': dy };
                                    var src = im.src;
                                    commit(tmp);
                                    if (src == im.src) tmp.__curr = null; //修改失败
                                }
                            }
                            container.ondblclick = function() {
                                commit(im);
                                if (isCutImg) {
                                    EndClip();
                                }
                            }
                            container.onmouseup = function() {
                                if (isModifyGray) {
                                    tmp.__curr = null;
                                }
                            }
                            container.appendChild(im);
                            var lineHolder = doc.createElement("span");
                            lineHolder.style.height = "100%";
                            lineHolder.style.verticalAlign = "middle";
                            lineHolder.style.display = "inline-block";
                            container.appendChild(lineHolder);
                            tmp.appendChild(container);

                            function goto(btnFirst, btnPrevious, btnNext, btnLast, index) {
                                if (index < 0) index = 0;
                                if (index >= ele.children.length) index = ele.children.length - 1;
                                if (index > -1) {
                                    tmp.children[0].children[0].setAttribute("conv", "ExamRequestAttach_SysConv('" + group + "','" + ele.children[index].children[2].__uid + "')");
                                    tmp.children[0].children[0].src = ele.children[index].children[2].src;
                                    tmp.children[0].children[0].curr = ele.children[index].children[2];
                                    tmp.__uid = ele.children[index].children[2].__uid;
                                } else {
                                    tmp.children[0].children[0].src = null;
                                    tmp.children[0].children[0].curr = null;
                                    tmp.__uid = null;
                                }
                                btnFirst.disabled = index == 0 || ele.children.length < 1 ? "disabled" : "";
                                btnPrevious.disabled = index < 1 ? "disabled" : "";
                                btnNext.disabled = index > ele.children.length - 2 ? "disabled" : "";
                                btnLast.disabled = index == ele.children.length - 1 || ele.children.length < 1 ? "disabled" : "";
                                if (isCutImg) {
                                    EndClip();
                                }
                            }
                            var bar = doc.createElement("div");
                            bar.style.textAlign = "center";
                            var btnFirst = doc.createElement("input");
                            btnFirst.type = "button";
                            btnFirst.className = "button";
                            btnFirst.value = "最前";
                            bar.appendChild(btnFirst);
                            var btnPrevious = doc.createElement("input");
                            btnPrevious.type = "button";
                            btnPrevious.className = "button";
                            btnPrevious.value = "上一副";
                            bar.appendChild(btnPrevious);
                            var btnNext = doc.createElement("input");
                            btnNext.type = "button";
                            btnNext.className = "button";
                            btnNext.value = "下一副";
                            bar.appendChild(btnNext);
                            var btnLast = doc.createElement("input");
                            btnLast.type = "button";
                            btnLast.className = "button";
                            btnLast.value = "最后";
                            bar.appendChild(btnLast);
                            btnFirst.onclick = function() {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, 0);
                            }
                            btnPrevious.onclick = function() {
                                for (var j = 0; j < ele.children.length; j++) {
                                    if (ele.children[j].children[2] == tmp.children[0].children[0].curr) {
                                        goto(btnFirst, btnPrevious, btnNext, btnLast, j - 1);
                                        break;
                                    }
                                }
                            }
                            btnNext.onclick = function() {
                                for (var j = 0; j < ele.children.length; j++) {
                                    if (ele.children[j].children[2] == tmp.children[0].children[0].curr) {
                                        goto(btnFirst, btnPrevious, btnNext, btnLast, j + 1);
                                        break;
                                    }
                                }
                            }
                            btnLast.onclick = function() {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, ele.children.length - 1);
                            }
                            if (isCutImg) {
                                var cutImage = new CutImage();
                                cutImage.Rect = formCallCenter.DetectFormByElement(d).GetField("DefaultClip");
                                var btnApplyCut = doc.createElement("input");
                                btnApplyCut.GetGroupName = tmp.GetGroupName;
                                btnApplyCut.GetAttachUID = tmp.GetAttachUID;
                                btnApplyCut.type = "button";
                                btnApplyCut.className = "button";
                                btnApplyCut.value = "确定裁剪";
                                btnApplyCut._cutImage = cutImage;
                                btnApplyCut.setAttribute("disabled");
                                btnApplyCut.setAttribute("field", "field_CurrAttachClip");
                                btnApplyCut.setAttribute("command", "AttachClip");
                                btnApplyCut.setAttribute("condFields", "field_CurrAttachClip");
                                btnApplyCut.setAttribute("conv", "ExamRequestConvMgr.AttachClipConv");
                                bar.appendChild(btnApplyCut);

                                btnApplyCut.onclick = function() {
                                    commit(this);
                                    btnShowCut.onclick();
                                }
                                var btnShowCut = doc.createElement("input");
                                btnShowCut.type = "button";
                                btnShowCut.className = "button";
                                btnShowCut.value = "显示裁剪区域";

                                bar.appendChild(btnShowCut);
                                btnShowCut.onclick = function() {
                                    if (btnShowCut.value == "显示裁剪区域") {
                                        BeginClip();
                                    } else {
                                        EndClip();
                                    }
                                }

                                function BeginClip() {
                                    if (btnShowCut.value == "显示裁剪区域") {
                                        btnShowCut.value = "隐藏裁剪区域";
                                        btnApplyCut.removeAttribute("disabled");
                                        cutImage.Apply2(container, im);
                                    }
                                }

                                function EndClip() {
                                    if (btnShowCut.value != "显示裁剪区域") {
                                        btnShowCut.value = "显示裁剪区域"
                                        btnApplyCut.setAttribute("disabled");
                                        cutImage.Apply2(container, im);
                                    }
                                }
                                var btnDefaultCut = doc.createElement("input");
                                btnDefaultCut.type = "button";
                                btnDefaultCut.className = "button";
                                btnDefaultCut.value = "默认裁剪";
                                btnDefaultCut.setAttribute("conv", "ExamRequestConvMgr.DefAttachClipConv");
                                btnDefaultCut.setAttribute("field", "field_DefAttachClip");
                                btnDefaultCut.setAttribute("condFields", "field_DefAttachClip");
                                btnDefaultCut.setAttribute("command", "AttachClip");
                                btnDefaultCut.GetGroupName = tmp.GetGroupName;
                                btnDefaultCut.GetAttachUID = tmp.GetAttachUID;
                                btnDefaultCut.onclick = function() {
                                    //暂时还没考虑调窗的问题
                                    commit(im);
                                    commit(this);
                                    EndClip();
                                }
                                bar.appendChild(btnDefaultCut);

                                var btnSetDefaultRect = doc.createElement("input");
                                btnSetDefaultRect.type = "button";
                                btnSetDefaultRect.className = "button";
                                btnSetDefaultRect.style.width = "120px";
                                btnSetDefaultRect.value = "设为默认裁剪区";
                                btnSetDefaultRect.onclick = function() {
                                    window.CurrAttachClipConv = function() {
                                        Form_SingleValueConv.apply(this, arguments);
                                        this.GetUIValue = function() {
                                            return cutImage.Rect.toJSONString();
                                        }
                                    }
                                    try {
                                        var param = {};
                                        param.field = "DefaultClip";
                                        param.conv = "window.CurrAttachClipConv";
                                        useroperate(this, changeFieldValue, param);
                                    } finally {
                                        window.CurrAttachClipConv = undefined;
                                    }
                                }

                                bar.appendChild(btnSetDefaultRect);

                                var btnCancelDefaultRect = doc.createElement("input");
                                btnCancelDefaultRect.type = "button";
                                btnCancelDefaultRect.className = "button";
                                btnCancelDefaultRect.style.width = "120px";
                                btnCancelDefaultRect.value = "取消默认裁剪区";
                                btnCancelDefaultRect.onclick = function() {
                                    var param = {};
                                    param.field = "DefaultClip";
                                    param.conv = "StaticValueConv('{\"X\": 0, \"Y\": 0, \"Width\": 1, \"Height\": 1}')";
                                    useroperate(d, changeFieldValue, param);
                                }
                                bar.appendChild(btnCancelDefaultRect);
                            }

                            var btnClose = doc.createElement("input");
                            btnClose.type = "button";
                            btnClose.className = "button";
                            btnClose.value = "关闭";
                            bar.appendChild(btnClose);
                            btnClose.onclick = function() {
                                ele.__img__container = null;
                                if (tmp.parentNode) tmp.parentNode.removeChild(tmp);
                            }
                            tmp.__goto = function(index) {
                                goto(btnFirst, btnPrevious, btnNext, btnLast, index);
                            }
                            bar.style.position = "absolute";
                            bar.style.left = "300px";
                            bar.style.marginLeft = "0px";
                            bar.style.bottom = "0px";
                            tmp.appendChild(bar);
                        }
                        tmp.style.left = "6px";
                        tmp.style.top = "6px";
                        //tmp.style.backgroundColor = "#bbb";
                        tmp.style.width = (doc.documentElement.scrollWidth - 12) + "px";
                        tmp.style.height = (doc.documentElement.scrollHeight - 12) + "px";
                        tmp.children[0].children[0].src = i.src;
                        tmp.children[0].children[0].curr = i;
                        tmp.__group = group;
                        tmp.__uid = i.__uid;

                        for (var j = 0; j < ele.children.length; j++) {
                            if (ele.children[j].children[0] == i) {
                                tmp.__goto(j);
                                break;
                            }
                        }
                    }
                    return show;
                }(div, img, rmv, groupName);

                div.appendChild(body);
                div.appendChild(content);
                div.appendChild(img);
                div.appendChild(rmv);

                ele.appendChild(div);
                from.SetField("SchematicBodyPartList", value);
            } else {
                img = div.children[2];

                if (attach.Schematic != null) {
                    div.children[1].innerHTML = attach.Schematic.Index;
                    div.children[1].style.width = "4px";
                    div.children[1].style.height = "4px";
                    var color = arrayColor[attach.Schematic.Index - 1]; //"red"; //RGBToHex(attach.Schematic.Color);
                    div.children[1].style.color = color;
                } else {
                    div.children[1].style.color = "";
                    div.children[1].innerHTML = "";
                }
            }

            from.SetField("SchematicBodyPart", [{
                "AttachUID": attach.AttachUID,
                "SchematicBodyPartID": attach.Schematic ? attach.Schematic.BodyPartID : null

            }]);
            if (IsAVI(attach.AttachUrl)) {
                img.src = "../../../img/video.png";
                img._videoSrc = attach.AttachUrl;
            } else {
                img.src = addUrlParam(attach.AttachUrl, "tmp", Math.random());
            }
            img.__uid = attach.AttachUID;
            if (attach["Report"] && attach["Report"]["Index"] >= 0) {
                img.title = "报告图像";
                img.alt = "报告图像";
                img.parentNode.style.border = "1px solid red";
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (!m_ReportImageList.count) {
                        m_ReportImageList.count = 1;
                        m_ReportImageList[attach.AttachUID] = attach.AttachUID;
                    } else {
                        if (!m_ReportImageList[attach.AttachUID]) {
                            m_ReportImageList.count++;
                            m_ReportImageList[attach.AttachUID] = attach.AttachUID;
                        }
                    }
                }
            } else if (IsAVI(attach.AttachUrl)) {
                img.title = "检查视频";
                img.alt = "检查视频";
                if (body)
                    body.style.display = 'none';
                img.parentNode.style.border = "1px solid blue";
            } else {
                img.title = "检查图像";
                img.alt = "检查图像";
                img.parentNode.style.border = "1px solid blue";
                if (groupName == "68579a1f-acc7-46aa-9166-e4eca3fb13ca") {
                    if (m_ReportImageList.count) {
                        if (m_ReportImageList[attach.AttachUID]) {
                            delete m_ReportImageList[attach.AttachUID];
                            m_ReportImageList.count--;
                        }
                    }
                }
            }
        }

        var cnt = ele.children.length;
        //固定图像显示在一行（横向滚动轴）
        var itemConf = {
            width: 130,
            marginLeft: 20
        };
        var itemWidth = itemConf.width + itemConf.marginLeft;
        ele.parentNode.style.overflowX = "scroll";
        ele.parentNode.style.overflowY = "hidden";
        for (var j = 0; j < cnt; j++) {
            div = ele.children[j];
            div.style.width = itemConf.width + "px";
            div.style.marginLeft = itemConf.marginLeft + "px";
            var content = div.children[1];
            content.style.position = "absolute";
            content.style.top = "2px";
            content.style.left = 85 + j * (itemWidth + 2) + "px";
        }

        ele.style.height = "100%";
        ele.style.width = (cnt + 1) * itemWidth + "px";

        if (eleOldWidth && eleOldWidth != perElement.scrollWidth) {
            perElement.scrollLeft = perElement.scrollWidth - perElement.clientWidth;
        }
        window.setTimeout(function() {
            eleOldWidth = perElement.scrollWidth;
        }, 1);

        //动态计算图像显示在多行（纵向滚动轴）
        // var rows = layout && layout.rows ? layout.rows : 3;
        // var cols = layout && layout.cols ? layout.cols : 8;
        // for (var j = 0; j < cnt; j++) {
        //     div = ele.children[j];
        //     div.style.width = 100 / cols + "%";
        //     div.style.height = 100 / rows + "%";
        //     div.style.left = (100 / cols) * parseInt(j % cols, 10) + "%";
        //     div.style.top = (100 / rows) * parseInt(j / cols, 10) + "%";
        //     div.style.marginLeft = ((parseInt(j % cols, 10)) * 3) + "px";
        //     div.style.marginTop = ((parseInt(j / cols, 10)) * 3) + "px";
        // }
        UpdateImageCount();
    }
}

ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicBodyPartListConv = function(uid) {
    WritableListConv.apply(this, [{ 'dropItem': 'dropItem', 'single': 'singleDropItem', 'first': 'firstDropItem', 'middle': 'middleDropItem', 'menu': 'menu', 'last': 'lastDropItem' }, null, function() { return 1; }]);
    var decodeArguments_base = this.DecodeArguments;
    this.DecodeArguments = function(ele, args) {
        args = decodeArguments_base(ele, args);

        var newDate = {
            "DisplayNO": 0,
            "SchematicBodyPartName": "",
            "SchematicBodyPartID": null,
            "X": 0,
            "Y": 0
        }
        var list = [newDate];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                list[i + 1] = args[i];
            }
        }
        return list;
    }
    var inheritProperties_base = this.InheritProperties;
    this.InheritProperties = function(srcElement, desElement) {
        Form.SetAttribute(desElement, "conv", "ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicBodyPartListConv.SchematicBodyPartListItemConv('" + uid + "')", true);
        inheritProperties_base(srcElement, desElement);

    }
    ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicBodyPartListConv.SchematicBodyPartListItemConv = function(uid) {
        Form_ListValueConv.ListItemValueConv.apply(this);
        this.CompareValues = function(val1, val2) {
            return -1;
        }

        this.DetermineApply = function(self) {
            return function(ele, val) {
                return val && val.AttachUID == uid;
            }
        }(this);
        this.ApplyValue = function(ele, val) {

            if (val.SchematicBodyPartID != null) {
                var valueMember = ele.getAttribute("valueMember");
                if (!valueMember) valueMember = "__valueMember";
                var displayMember = ele.getAttribute("displayMember");
                if (!displayMember) displayMember = "__displayMember";
                var menu = ele.__menu;
                var items = menu.Items();
                val = val[valueMember];
                Element(ele).setText(val);
                var curr = null;
                for (var i = 0; i < items.Count(); i++) {
                    var d = items.ItemAt(i).GetData();
                    if (d[valueMember] == ele.value) {
                        curr = d;
                        Element(ele).setText(d[displayMember]);
                        break;
                    }
                }
                ele.__currData = curr;
            }

        }
        this.GetUIValue = function(ele) {
            var valueMember = ele.getAttribute("valueMember");
            var val = {};
            val.AttachUID = uid;
            val[valueMember] = ele.__currData ? ele.__currData[valueMember] : null;
            return val.toJSONString();
        }
    }
}
ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicImageBodyPartListConv = function() {
    Form_SingleValueConv.apply(this);
    this.DetermineApply = function(ele, val) {
        return val && val.GroupName == '68579a1f-acc7-46aa-9166-e4eca3fb13ca' && val.AttachList && val.AttachList.length > 0;
    }
    this.ApplyValue = function(ele, val) {
        var ele = ele;

        var bodyPartListRemoveEle = ele.BodyPartListRemoveEle;
        if (!bodyPartListRemoveEle) {
            bodyPartListRemoveEle = ele.BodyPartListRemoveEle = ele.ownerDocument.createElement("div");
            bodyPartListRemoveEle.setAttribute("field", "RemoveGroupAttach");
            bodyPartListRemoveEle.setAttribute("command", "-");
            bodyPartListRemoveEle.setAttribute("conv", "ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicImageBodyPartListConv.SchematicImageBodyParrRemoveConv");
            bodyPartListRemoveEle.style.display = "none";
            ele.appendChild(bodyPartListRemoveEle);
        }
        var from = formCallCenter.GetFormByID("ReportModule");
        var value = from.GetField("SchematicBodyPartList");

        if (!value || !value.length) return;

        if (val.AttachList.length == 1) {
            if (!val.AttachList[0].Schematic) {
                for (var j = 0; j < ele.children.length; j++) {
                    if (ele.children[j].AttachUID == val.AttachList[0].AttachUID) {
                        div = ele.children[j];
                        break;
                    }
                }
                if (!div) return;
                else {
                    ele.removeChild(div);
                }
            }
        }

        for (var i = 0; i < val.AttachList.length; i++) {
            var attach = val.AttachList[i];
            if (!attach.Schematic) continue;
            var div = null;
            for (var j = 0; j < ele.children.length; j++) {
                if (ele.children[j].AttachUID == attach.AttachUID) {
                    div = ele.children[j];
                    break;
                }
            }
            if (!div) {
                div = ele.ownerDocument.createElement("div");
                div.AttachUID = attach.AttachUID;
                div.style.position = "absolute";
                ele.appendChild(div);
            }

            for (var j = 0; j < value.length; j++) {
                if (attach.Schematic.BodyPartID == value[j].SchematicBodyPartID) {
                    var color = arrayColor[attach.Schematic.Index - 1]; // RGBToHex(attach.Schematic.Color);
                    div.style.width = "6px";
                    div.style.height = "6px";
                    div.innerHTML = attach.Schematic ? attach.Schematic.Index : "";
                    div.style.backgroundColor = color;
                    div.style.left = parseInt(value[j].X * 100) + "%";
                    div.style.top = parseInt(value[j].Y * 100) + "%";
                    break;
                }
            }
        }
    }


    ExamRequestConvMgr.ExamRequestAttachList_SysConv.SchematicImageBodyPartListConv.SchematicImageBodyParrRemoveConv = function() {
        Form_SingleValueConv.apply(this, arguments);
        this.DetermineApply = function(ele, val) {
            return val && val.GroupName == '68579a1f-acc7-46aa-9166-e4eca3fb13ca' && val.AttachUIDList && val.AttachUIDList.length > 0;
        }
        this.ApplyValue = function(ele, val) {
            if (ele.parentNode) {
                var bodyPartListEle = ele.parentNode;
                for (var i = 0; i < val.AttachUIDList.length; i++) {
                    for (var j = 0; j < bodyPartListEle.children.length; j++) {
                        if (bodyPartListEle.children[j].AttachUID == val.AttachUIDList[i]) {
                            bodyPartListEle.removeChild(bodyPartListEle.children[j]);
                            break;
                        }
                    }
                }
            }
        }
    }
}

function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "#";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        }
        hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('');
    }
    //alert(hexColor)  
    return hexColor;
}

ExamRequestConvMgr.ExamRequestAttachList_SysConv_SchematicReportThumbnail = function(groupName, layout, readOnly) {
    Form_SingleValueConv.apply(this, arguments);
    this.ApplyValue = function(ele, val) {
        if (val["GroupName"] != groupName) return;
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


                var from = formCallCenter.GetFormByID("ReportModule");
                var value = from.GetField("SchematicBodyPartList");
                var body = null;
                if (value != null && attach.Schematic != null) {
                    for (var k = 0; k < value.length; k++) {
                        if (attach.Schematic.BodyPartID == value[k].SchematicBodyPartID) {
                            div.innerHTML = value[k].SchematicBodyPartName ? value[k].SchematicBodyPartName : "";
                            var color = arrayColor[attach.Schematic.Index - 1]; // RGBToHex(attach.Schematic.Color);
                            div.style.color = color;
                        }
                    }
                }

                img = ele.ownerDocument.createElement("img");
                img.style.verticalAlign = "middle";
                img.setAttribute("field", shiftReportImageField);
                img.setAttribute("command", "ShiftReportImage");
                img.setAttribute("condFields", shiftReportImageField);
                img.setAttribute("conv", "ExamRequestConvMgr.DefaultConstValueConverter('" + { "GroupName": groupName, "AttachUID": uid }.toJSONString() + "')");

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
                    rmv.onclick = function(i) {
                        return function() {
                            if (confirm("是否移除此报告图片")) commit(i);
                        }
                    }(img);
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
                img.onload = function(i) {
                    return function() {
                        new ui(i).FitView();
                    }
                }(img);
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