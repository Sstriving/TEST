var needPrinterSetup = 0; //是否需要显示打印机“页面设置”，0：不显示；1：显示。
var needPrinterPreview = 1; //是否需要显示“打印预览界面”，0：不显示；1：显示。

function Printer(ele) {
    function getQueryParam(name) {
        var split = window.location.href.split("?");
        var params = split[split.length - 1].split("&");
        for (var i = 0; i < params.length; i++) {
            var nv = params[i].split("=");
            if (nv[0] == name) return nv[1];
        }
        return null;
    }
    this.BeginPrint = function (local) {
        if (local) {
            window.top.location.href = ele.__currData.ReportTempUrl + "?mode=local";
        }
        else {
            var iframe = null;
            var iframes = ele.ownerDocument.getElementsByTagName("IFRAME");
            for (var i = 0; i < iframes.length; i++) {
                var ownerIframe = iframes[i];
                if (ownerIframe.src && ownerIframe.src.indexOf(ele.__currData.ReportTempUrl + "?mode=datasource") > -1) {
                    iframe = ownerIframe;
                    break;
                }
            }
            if (!iframe) {
                iframe = ele.ownerDocument.createElement("iframe");
                try {
                    iframe.style.width = "0px";
                    iframe.style.height = "1px";
                    iframe.style.visibility = "hidden";
                    iframe.src = ele.__currData.ReportTempUrl + "?mode=datasource";
                    ele.ownerDocument.body.appendChild(iframe);
                }
                catch (err) {
                    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
                    throw err;
                }
            }
            else {
                iframe.src = ele.__currData.ReportTempUrl + "?mode=datasource&tmp=" + Math.random();
            }
        }
    }
    function CallAfterWindowCompleted(wnd, call, timeoutCheck) {
        var waitImages = function (check) {
            return function (wait) {
                if (typeof (check) != 'function' || check(wait)) {
                    call();
                }
                else {
                    var c = arguments.callee;
                    var elapse = 500;
                    setTimeout(function () {
                        c(wait - elapse);
                    }, elapse);
                }
            }
        } (timeoutCheck);
        waitImages(5000);
    }
    this.EndPrint = function (prepare, print, timeoutCheck) {
        var htmlName = "__print__html__";
        var mode = getQueryParam("mode");
        var delay = function () {
            switch (mode) {
                case "keepalive":
                    window.resizeTo(300, 60);
                    window.moveTo(0, 0);
                    window.document.body.innerHTML = "<table style='width:100%;'><tr><td style='font-size:16pt;font-weight:bold;color:red'>工作中，请勿关闭该窗口(您可点击其它空白区隐藏)</td></tr></table>";
                    break;
                case "datasource": //new iframe
                    prepare();
                    CallAfterWindowCompleted(window, function () {
                        window.open(window.location.href.replace("mode=datasource", "mode=keepalive"), 'keepalive', 'height=100, width=100, top=0, left=0px,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')   //该句写成一行代码
                        window.top[htmlName] = window.document.body.innerHTML;
                        window.top.open(window.location.href.replace("mode=datasource", "mode=print"));
                    }, timeoutCheck);
                    break;
                case "print": //new window
                    try {
                        window.document.body.innerHTML = window.opener[htmlName];
                        var wb = document.createElement("object");
                        wb.setAttribute("classid", "CLSID:8856F961-340A-11D0-A96B-00C04FD705A2");
                        wb.setAttribute("width", "0");
                        wb.setAttribute("height", "0");
                        try {
                            window.document.body.appendChild(wb);
                            if (!print) {
                                print = function (wb) {
                                    wb.ExecWB(7, 1);
                                }
                            }
                            print(wb);
                        }
                        catch (err1) {
                            throw err1;
                        }
                        finally {
                            if (wb.parentNode) wb.parentNode.removeChild(wb);
                        }
                    }
                    catch (err2) {
                        throw err2;
                    }
                    finally {
                        window.close();
                    }
                    break;
                case "local": //current document
                    try {
                        if (prepare) prepare();
                        CallAfterWindowCompleted(window, function () {
                            try {
                                var wb = document.createElement("object");
                                wb.setAttribute("classid", "CLSID:8856F961-340A-11D0-A96B-00C04FD705A2");
                                wb.setAttribute("width", "0");
                                wb.setAttribute("height", "0");
                                try {
                                    document.body.appendChild(wb);
                                    if (!print) {
                                        print = function (wb) {
                                            wb.ExecWB(7, 1);
                                        }
                                    }
                                    print(wb);
                                }
                                catch (err0) {
                                    throw err0;
                                }
                                finally {
                                    if (wb.parentNode) wb.parentNode.removeChild(wb);
                                }
                            }
                            catch (err1) {
                                throw err1;
                            }
                            finally {
                                window.history.back();
                            }
                        }, timeoutCheck);
                    }
                    catch (err2) {
                        window.history.back();
                        throw err2;
                    }
                    break;
            }
        }
        delay();
    }
}