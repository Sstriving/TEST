function Html4Graphics(ele) {
    //譬如，draw椭圆还存在问题：未封口
    if (!Html4Graphics.Cache) Html4Graphics.Cache = [];
    Html4Graphics.Cache[Html4Graphics.Cache.length] = { "Key": ele, "Value": this };
    var root = ele;
    function resize() {
        var size = Graphics.ElementSize(root);
        cvs.style.width = size.width + "px";
        cvs.style.height = size.height + "px";
    }
    this.Clear = function (color) {
        clipCVS.innerHTML = "";
        clipCVS.style.backgroundColor = color;
    }
    this.DrawString = function (s, font, brush, point, format) {
        var span = document.createElement("SPAN");
        span.style.overflow = "hidden";
        span.style.position = "absolute";
        span.style.left = point.x + "px";
        span.style.top = point.y + 4 + "px";
        if (font) span.style.font = font;
        span.style.color = brush.color;
        span.innerText = s;
        clipCVS.appendChild(span);
        return { 'width': span.offsetWidth, 'height': span.offsetHeight };
    }
    this.MeasureString = function (s, font, maxSize, format) {
        var span = document.createElement("SPAN");
        span.style.overflow = "hidden";
        span.style.position = "absolute";
        if (font) span.style.font = font;
        span.innerText = s;
        clipCVS.appendChild(span);
        var size = Graphics.ElementSize(span);
        clipCVS.removeChild(span);
        if (!maxSize) return size;
        var wid = size.width < maxSize.width ? size.width : maxSize.width;
        var hit = size.height < maxSize.height ? size.height : maxSize.height;
        return { "width": wid, "height": hit };
    }
    this.DrawImage = function (imageUrl, desRect, srcRect, srcUnit) {
        var img = document.createElement("IMG");
        img.style.overflow = "hidden";
        img.style.position = "absolute";
        img.src = imageUrl;
        clipCVS.appendChild(img);
        var imgSize = Graphics.ElementSize(img);
        if (!desRect.width) desRect.width = imgSize.width;
        if (!desRect.height) desRect.height = imgSize.height;

        if (!srcRect) srcRect = {};
        if (!srcRect.width) srcRect.width = imgSize.width;
        if (!srcRect.height) srcRect.height = imgSize.height;
        if (!srcRect.x) srcRect.x = 0;
        if (!srcRect.y) srcRect.y = 0;

        desRect = RegulateRect(desRect);
        srcRect = RegulateRect(srcRect);
        var div = document.createElement("DIV");
        div.style.overflow = "hidden";
        div.style.position = "absolute";
        div.style.left = desRect.x + "px";
        div.style.top = desRect.y + "px";
        div.style.width = (desRect.width + 1) + "px";
        div.style.height = (desRect.height + 1) + "px";
        clipCVS.removeChild(img);
        var scaleX = desRect.width / srcRect.width;
        var scaleY = desRect.height / srcRect.height;
        img.style.width = (imgSize.width * scaleX + 1) + "px";
        img.style.height = (imgSize.height * scaleY + 1) + "px";
        img.style.left = srcRect.x * scaleX + "px";
        img.style.top = srcRect.y * scaleY + "px";
        clipCVS.appendChild(div);
        div.appendChild(img);
    }
    this.DrawPie = function (self) {
        return function (pen, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.DrawEllipse(pen, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                //这里会存在微小的偏差
                ps[ps.length] = { "x": Math.floor(rect.x + rect.width / 2 + 0.5), "y": Math.floor(rect.y + rect.height / 2 + 0.5) };
                self.DrawPolygon(pen, ps);
            }
        }
    } (this);
    this.FillPie = function (self) {
        return function (brush, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.FillEllipse(brush, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                //这里会存在微小的偏差
                ps[ps.length] = { "x": Math.floor(rect.x + rect.width / 2 + 0.5), "y": Math.floor(rect.y + rect.height / 2 + 0.5) };
                self.FillPolygon(brush, ps);
            }
        }
    } (this);
    this.DrawArc = function (self) {
        return function (pen, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.DrawEllipse(pen, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                self.DrawCurve(pen, ps);
            }
        }
    } (this);
    function MapArcPoints(rect, startAngle, sweepAngle) {
        rect = RegulateRect(rect)
        var ps = MapEllipsePoints(rect);
        var a = rect.width / 2;
        var b = rect.height / 2;
        var x0 = rect.x + a;
        var y0 = rect.y + b;
        var len = ps.length;
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": ps[len - 1 - i].x, "y": rect.y * 2 + rect.height - ps[len - 1 - i].y };
        }
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": rect.x * 2 + rect.width - ps[i].x, "y": rect.y * 2 + rect.height - ps[i].y };
        }
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": rect.x * 2 + rect.width - ps[len - 1 - i].x, "y": ps[len - 1 - i].y };
        }
        var aa = a * a;
        var bb = b * b;
        var ab = a * b;
        var angle = startAngle * Math.PI / 180;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var ab_del = ab / Math.sqrt(aa * sin * sin + bb * cos * cos);
        var p1 = { "x": x0 + ab_del * cos, "y": y0 + ab_del * sin };
        p1.x = Math.floor(p1.x + 0.5);
        p1.y = Math.floor(p1.y + 0.5);

        angle = (startAngle + sweepAngle) * Math.PI / 180;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        ab_del = ab / Math.sqrt(aa * sin * sin + bb * cos * cos);
        var p2 = { "x": x0 + ab_del * cos, "y": y0 + ab_del * sin };
        p2.x = Math.floor(p2.x + 0.5);
        p2.y = Math.floor(p2.y + 0.5);

        var minD1 = Math.sqrt(aa + bb);
        var minD2 = Math.sqrt(aa + bb);
        var i1 = -1;
        var i2 = -1;
        var len = ps.length;
        for (var i = 0; i < len; i++) {
            var d1, d2;
            if (ps[i].x == p1.x) {
                d1 = ps[i].y - p1.y;
                if (d1 < 0) d1 = -d1;
                if (d1 < minD1) {
                    minD1 = d1;
                    i1 = i;
                }
            }
            else if (ps[i].y == p1.y) {
                d1 = ps[i].x - p1.x;
                if (d1 < 0) d1 = -d1;
                if (d1 < minD1) {
                    minD1 = d1;
                    i1 = i;
                }
            }
            if (ps[i].x == p2.x) {
                d2 = ps[i].y - p2.y;
                if (d2 < 0) d2 = -d2;
                if (d2 < minD2) {
                    minD2 = d2;
                    i2 = i;
                }
            }
            else if (ps[i].y == p2.y) {
                d2 = ps[i].x - p2.x;
                if (d2 < 0) d2 = -d2;
                if (d2 < minD2) {
                    minD2 = d2;
                    i2 = i;
                }
            }
        }
        var result = [];
        if (sweepAngle > 0) {
            var cnt = (i1 - i2 + len) % len;
            for (var i = 0; i < cnt; i++) {
                var ii = (i1 - i + len) % len;
                result[i] = ps[ii];
            }
        }
        else {
            var cnt = (i2 - i1 + len) % len;
            for (var i = 0; i < cnt; i++) {
                var ii = (i1 + i + len) % len;
                result[i] = ps[ii];
            }
        }
        return result;
    }
    this.DrawLine = function (pen, p1, p2) {
        if (p1.x == p2.x) {
            AppendVLine(p1.x, p1.y, p2.y, pen);
        }
        else if (p1.y == p2.y) {
            AppendHLine(p1.x, p2.x, p1.y, pen);
        }
        else {
            var x1 = p1.x;
            var y1 = p1.y;
            var x2 = p2.x;
            var y2 = p2.y;
            var dx = x1 > x2 ? x1 - x2 : x2 - x1;
            var dy = y1 > y2 ? y1 - y2 : y2 - y1;
            if (dx > dy) {
                var ys = CalcLinearLUT(x1, x2, y1, y2);
                var cx = x1;
                var cy = ys[0];
                if (x1 > x2) {
                    for (var x = x1; x >= x2; x--) {
                        if (ys[x1 - x] != cy) {
                            AppendHLine(cx, x + 1, cy, pen);
                            cx = x;
                            cy = ys[x1 - x];
                        }
                    }
                }
                else {
                    for (var x = x1; x <= x2; x++) {
                        if (ys[x - x1] != cy) {
                            AppendHLine(cx, x - 1, cy, pen);
                            cx = x;
                            cy = ys[x - x1];
                        }
                    }
                }
                AppendHLine(cx, x2, cy, pen);
            }
            else {
                var xs = CalcLinearLUT(y1, y2, x1, x2);
                var cx = xs[0];
                var cy = y1;
                if (y1 > y2) {
                    for (var y = y1; y >= y2; y--) {
                        if (xs[y1 - y] != cx) {
                            AppendVLine(cx, cy, y + 1, pen);
                            cx = xs[y1 - y];
                            cy = y;
                        }
                    }
                }
                else {
                    for (var y = y1; y <= y2; y++) {
                        if (xs[y - y1] != cx) {
                            AppendVLine(cx, cy, y - 1, pen);
                            cx = xs[y - y1];
                            cy = y;
                        }
                    }
                }
                AppendVLine(cx, cy, y2, pen);
            }
        }
    }
    function CalcLinearLUT(surStart, surEnd, desStart, desEnd) {
        var surSign = surStart <= surEnd;
        var desSign = desStart <= desEnd;
        if (!surSign) {
            var tmp = surStart;
            surStart = surEnd;
            surEnd = tmp;
        }
        if (!desSign) {
            var tmp = desStart;
            desStart = desEnd;
            desEnd = tmp;
        }
        var surWid = surEnd - surStart;
        var desWid = desEnd - desStart;
        var table = [];
        table.length = surWid + 1;
        var v = desStart;
        if (surWid > 0) {
            var n = parseInt(desWid / surWid, 10);
            var n__1 = n + 1;
            var s = (desWid % surWid) << 1;
            var surWid_s = surWid - s;
            var wid_add = s - (surWid << 1);
            var d = 0;

            if (desSign) {
                table[0] = v;
                for (var i = 0; i < surWid; ) {
                    if (d >= surWid_s) {
                        v += n__1;
                        d += wid_add;
                    }
                    else {
                        v += n;
                        d += s;
                    }
                    table[++i] = v;
                }
            }
            else {
                v = desStart + desEnd - v;
                table[0] = v;
                for (var i = 0; i < surWid; ) {
                    if (d >= surWid_s) {
                        v -= n__1;
                        d += wid_add;
                    }
                    else {
                        v -= n;
                        d += s;
                    }
                    table[++i] = v;
                }
            }
        }
        return table;
    }

    this.DrawRectangle = function (pen, rect) {
        rect = RegulateRect(rect);
        AppendHLine(rect.x, rect.x + rect.width, rect.y, pen);
        AppendHLine(rect.x, rect.x + rect.width, rect.y + rect.height, pen);
        AppendVLine(rect.x, rect.y, rect.y + rect.height, pen);
        AppendVLine(rect.x + rect.width, rect.y, rect.y + rect.height, pen);
    }
    this.FillRectangle = function (brush, rect) {
        rect = RegulateRect(rect);
        var minX = rect.x;
        var minY = rect.y;
        var maxX = rect.x + rect.width;
        var maxY = rect.y + rect.height;
        var div = document.createElement("DIV");
        div.style.overflow = "hidden";
        div.style.width = (maxX - minX + 1) + "px";
        div.style.height = (maxY - minY + 1) + "px";
        div.style.position = "absolute";
        div.style.left = minX + "px";
        div.style.top = minY + "px";
        div.style.backgroundColor = brush.color;
        clipCVS.appendChild(div);
    }

    this.DrawCurve = function (self) {
        return function (pen, points) {
            points = RegulatePolygon(points);
            var cnt = points ? points.length : 0;
            for (var i = 0; i < cnt - 1; i++) {
                self.DrawLine(pen, points[i], points[i + 1]);
            }
        };
    } (this);
    this.DrawPolygon = function (self) {
        return function (pen, points) {
            points = RegulatePolygon(points);
            var cnt = points ? points.length : 0;
            for (var i = 0; i < cnt; i++) {
                self.DrawLine(pen, points[i], points[(i + 1) % cnt]);
            }
        };
    } (this);
    this.FillPolygon = function (brush, points) {
        points = RegulatePolygon(points);
        var minX = points[0].x;
        var minY = points[0].y;
        var maxX = minX;
        var maxY = minY;
        for (var i = 1; i < points.length; i++) {
            if (minX > points[i].x) {
                minX = points[i].x;
            }
            else if (maxX < points[i].x) {
                maxX = points[i].x;
            }
            if (minY > points[i].y) {
                minY = points[i].y;
            }
            else if (maxY < points[i].y) {
                maxY = points[i].y;
            }
        }
        var table = [];
        for (var y = minY; y <= maxY; y++) {
            table[table.length] = [];
        }
        var x1 = points[0].x;
        var y1 = points[0].y;
        for (var i = 0; i < points.length; i++) {
            var p = points[(i + 1) % points.length];
            var x2 = p.x;
            var y2 = p.y;
            var dx = x1 > x2 ? x1 - x2 : x2 - x1;
            var dy = y1 > y2 ? y1 - y2 : y2 - y1;
            if (dx > dy) {
                var step = x1 < x2 ? 1 : -1;
                var ys = CalcLinearLUT(x1, x2, y1, y2);
                var x = x1;
                for (var j = 0; j < ys.length; j++) {
                    var y = ys[j];
                    table[y - minY][x - minX] = 1;
                    x += step;
                }
            }
            else {
                var step = y1 < y2 ? 1 : -1;
                var xs = CalcLinearLUT(y1, y2, x1, x2);
                var y = y1;
                for (var j = 0; j < xs.length; j++) {
                    var x = xs[j];
                    table[y - minY][x - minX] = 1;
                    y += step;
                }
            }
            x1 = x2;
            y1 = y2;
        }
        for (var y = minY; y <= maxY; y++) {
            var start = minX - 1;
            var end = start - 1;
            for (var x = minX; x <= maxX + 1; x++) {
                if (table[y - minY][x - minX]) {
                    if (start < minX) start = x;
                    var c = false;
                    for (x = x + 1; x <= maxX + 1; x++) {
                        if (!table[y - minY][x - minX]) {
                            if (!c) {
                                if (!InnerPoint({ "x": x, "y": y }, points, minX, minY, maxX, maxY)) {
                                    end = x - 1;
                                    AppendHLine(start, end, y, brush);
                                    start = minX - 1;
                                    end = start - 1;
                                    break;
                                }
                                else {
                                    c = true;
                                }
                            }
                        }
                        else {
                            c = false;
                        }
                    }
                }
            }
        }
    }
    this.DrawEllipse = function (self) {
        return function (pen, rect) {
            rect = RegulateRect(rect);
            var ps = MapEllipsePoints(rect);
            var start = ps[0];
            var end = null;
            var t = null;
            for (var i = 1; i < ps.length; i++) {
                var curr = ps[i];
                if (curr.x == start.x) {
                    if (curr.y == start.y) {
                        //
                    }
                    else {
                        switch (t) {
                            case "x":
                                AppendHLine(start.x, end.x, start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, start.y, pen);
                                AppendHLine(start.x, end.x, rect.y * 2 + rect.height - start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - start.y, pen);
                                start = curr;
                                end = null;
                                t = null;
                                break;
                            case "y":
                            default:
                                end = curr;
                                t = "y";
                                break;
                        }
                    }
                }
                else {
                    if (curr.y == start.y) {
                        switch (t) {
                            case "y":
                                AppendVLine(start.x, start.y, end.y, pen);
                                AppendVLine(start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                                AppendVLine(rect.x * 2 + rect.width - start.x, start.y, end.y, pen);
                                AppendVLine(rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                                start = curr;
                                end = null;
                                t = null;
                                break;
                            case "x":
                            default:
                                end = curr;
                                t = "x";
                                break;
                        }
                    }
                    else {
                        switch (t) {
                            case "x":
                                AppendHLine(start.x, end.x, start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, start.y, pen);
                                AppendHLine(start.x, end.x, rect.y * 2 + rect.height - start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - start.y, pen);
                                break;
                            case "y":
                                AppendVLine(start.x, start.y, end.y, pen);
                                AppendVLine(start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                                AppendVLine(rect.x * 2 + rect.width - start.x, start.y, end.y, pen);
                                AppendVLine(rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                                break;
                            default:
                                AppendHLine(start.x, start.x, start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - start.x, start.y, pen);
                                AppendHLine(start.x, start.x, rect.y * 2 + rect.height - start.y, pen);
                                AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, pen);
                                break;
                        }
                        start = curr;
                        end = null;
                        t = null;
                    }
                }
            }
            switch (t) {
                case "x":
                    AppendHLine(start.x, end.x, start.y, pen);
                    AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, start.y, pen);
                    AppendHLine(start.x, end.x, rect.y * 2 + rect.height - start.y, pen);
                    AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - start.y, pen);
                    break;
                case "y":
                    AppendVLine(start.x, start.y, end.y, pen);
                    AppendVLine(start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                    AppendVLine(rect.x * 2 + rect.width - start.x, start.y, end.y, pen);
                    AppendVLine(rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, rect.y * 2 + rect.height - end.y, pen);
                    break;
                default:
                    AppendHLine(start.x, start.x, start.y, pen);
                    AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - start.x, start.y, pen);
                    AppendHLine(start.x, start.x, rect.y * 2 + rect.height - start.y, pen);
                    AppendHLine(rect.x * 2 + rect.width - start.x, rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, pen);
                    break;
            }
        }
    } (this);
    this.FillEllipse = function (self) {
        return function (brush, rect) {
            rect = RegulateRect(rect);
            var ps = MapEllipsePoints(rect);
            var start = ps[0];
            var end = null;
            var t = null;
            var yflag = false;
            var rx, ry;
            for (var i = 1; i < ps.length; i++) {
                var curr = ps[i];
                if (curr.x == start.x) {
                    if (curr.y == start.y) {
                        //
                    }
                    else {
                        switch (t) {
                            case "x":
                                AppendHLine(end.x, rect.x * 2 + rect.width - end.x, end.y, brush);
                                AppendHLine(end.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - end.y, brush);
                                start = curr;
                                end = null;
                                t = null;
                                break;
                            case "y":
                            default:
                                end = curr;
                                t = "y";
                                break;
                        }
                    }
                }
                else {
                    if (curr.y == start.y) {
                        switch (t) {
                            case "y":
                                AppendVLine(start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                AppendVLine(rect.x * 2 + rect.width - start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                if (!yflag) {
                                    rx = start.x - 1;
                                    ry = start.y;
                                }
                                yflag = true;
                                start = curr;
                                end = null;
                                t = null;
                                break;
                            case "x":
                            default:
                                end = curr;
                                t = "x";
                                break;
                        }
                    }
                    else {
                        switch (t) {
                            case "x":
                                AppendHLine(end.x, rect.x * 2 + rect.width - end.x, end.y, brush);
                                AppendHLine(end.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - end.y, brush);
                                break;
                            case "y":
                                AppendVLine(start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                AppendVLine(rect.x * 2 + rect.width - start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                if (!yflag) {
                                    rx = start.x - 1;
                                    ry = start.y;
                                }
                                yflag = true;
                                break;
                            default:
                                if (yflag) {
                                    AppendVLine(start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                    AppendVLine(rect.x * 2 + rect.width - start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                                }
                                else {
                                    AppendHLine(start.x, rect.x * 2 + rect.width - start.x, start.y, brush);
                                    AppendHLine(start.x, rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, brush);
                                }
                                break;
                        }
                        start = curr;
                        end = null;
                        t = null;
                    }
                }
            }
            switch (t) {
                case "x":
                    AppendHLine(end.x, rect.x * 2 + rect.width - end.x, end.y, brush);
                    AppendHLine(end.x, rect.x * 2 + rect.width - end.x, rect.y * 2 + rect.height - end.y, brush);
                    break;
                case "y":
                    AppendVLine(start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                    AppendVLine(rect.x * 2 + rect.width - start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                    if (!yflag) {
                        rx = start.x - 1;
                        ry = start.y;
                    }
                    yflag = true;
                    break;
                default:
                    if (yflag) {
                        AppendVLine(start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                        AppendVLine(rect.x * 2 + rect.width - start.x, start.y, rect.y * 2 + rect.height - start.y, brush);
                    }
                    else {
                        AppendHLine(start.x, rect.x * 2 + rect.width - start.x, start.y, brush);
                        AppendHLine(start.x, rect.x * 2 + rect.width - start.x, rect.y * 2 + rect.height - start.y, brush);
                    }
                    break;
            }
            if (yflag) {
                var wid = rx * 2 - rect.x * 2 - rect.width;
                var hit = ry * 2 - rect.y * 2 - rect.height;
                if (wid > 0 && hit > 0) self.FillRectangle(brush, { "x": rx - wid, "y": ry - hit, "width": wid, "height": hit });
            }
        }
    } (this);
    function MapEllipsePoints(rect) {
        var a = rect.width / 2;
        var b = rect.height / 2;
        var x0 = rect.x + a;
        var y0 = rect.y + b;
        var aa = a * a;
        var bb = b * b;
        var xx = x0 + aa / Math.sqrt(aa + bb);
        var yy = y0 + bb / Math.sqrt(aa + bb);
        var ps = [];
        var p;
        for (var x = x0; x < xx; x++) {
            p = { "x": Math.floor(x + 0.5), "y": Math.floor(b * Math.sqrt(1 - (x - x0) * (x - x0) / aa) + y0 + 0.5) };
            ps[ps.length] = p;
        }
        {//这里可能存在重复点            
            for (var y = yy; y > y0; y--) {
                p = { "x": Math.floor(a * Math.sqrt(1 - (y - y0) * (y - y0) / bb) + x0 + 0.5), "y": Math.floor(y + 0.5) };
                ps[ps.length] = p;
            }
            p = { "x": Math.floor(a + x0 + 0.5), "y": Math.floor(y0 + 0.5) };
            ps[ps.length] = p;
        }
        return ps;
    }
    function RegulateRect(rect) {
        if (rect.width < 0) {
            rect.x += rect.width;
            rect.width = -rect.width;
        }
        if (rect.height < 0) {
            rect.y += rect.height;
            rect.height = -rect.height;
        }
        return rect;
    }
    function RegulatePolygon(polygon) {
        var ps = [];
        var start = polygon[0];
        var end = null;
        var t = null;
        for (var i = 1; i < polygon.length; i++) {
            var curr = polygon[i];
            if (curr.x == start.x) {
                if (curr.y == start.y) {
                    //
                }
                else {
                    switch (t) {
                        case "x":
                            ps[ps.length] = start;
                            ps[ps.length] = end;
                            start = curr;
                            end = null;
                            t = null;
                            break;
                        case "y":
                        default:
                            end = curr;
                            t = "y";
                            break;
                    }
                }
            }
            else {
                if (curr.y == start.y) {
                    switch (t) {
                        case "y":
                            ps[ps.length] = start;
                            ps[ps.length] = end;
                            start = curr;
                            end = null;
                            t = null;
                            break;
                        case "x":
                        default:
                            end = curr;
                            t = "x";
                            break;
                    }
                }
                else {
                    ps[ps.length] = start;
                    if (end) ps[ps.length] = end;
                    start = curr;
                    end = null;
                    t = null;
                }
            }
        }
        ps[ps.length] = start;
        if (end) ps[ps.length] = end;
        return ps;
    }
    function Sign(n) {
        if (n == 0) return 0;
        return n < 0 ? -1 : 1;
    }
    function CrossLine(refLineStart, refLineEnd, lineStart, lineEnd) {
        if (refLineEnd.x == refLineStart.x && refLineEnd.y == refLineStart.y) {
            if (lineEnd.x == lineStart.x && lineEnd.y == lineStart.y) {
                return refLineStart.x == lineStart.x && refLineEnd.y == lineEnd.y;
            }
            else {
                var dx1 = lineEnd.x - lineStart.x;
                var dy1 = lineEnd.y - lineStart.y;
                var df1 = dx1 * (refLineStart.y - lineStart.y) - dy1 * (refLineStart.x - lineStart.x);
                if (df1 != 0) return false;
                var rect = { "x": lineStart.x, "y": lineStart.y, "width": dx1, "height": dy1 };
                return RectContainsPoint(rect, refLineStart);
            }
        }
        else {
            if (lineEnd.x == lineStart.x && lineEnd.y == lineStart.y) {
                var dx1 = refLineEnd.x - refLineStart.x;
                var dy1 = refLineEnd.y - refLineStart.y;
                var df1 = dx1 * (lineStart.y - refLineStart.y) - dy1 * (lineStart.x - refLineStart.x);
                if (df1 != 0) return false;
                var rect = { "x": refLineStart.x, "y": refLineStart.y, "width": dx1, "height": dy1 };
                return RectContainsPoint(rect, lineStart);
            }
            else {
                var dx1 = refLineEnd.x - refLineStart.x;
                var dy1 = refLineEnd.y - refLineStart.y;
                var df1 = dx1 * (lineStart.y - refLineStart.y) - dy1 * (lineStart.x - refLineStart.x);
                var df2 = dx1 * (lineEnd.y - refLineStart.y) - dy1 * (lineEnd.x - refLineStart.x);
                if (Sign(df1) * Sign(df2) > 0) return false;
                if (df1 == 0 && df2 == 0) {
                    var rect = { "x": refLineStart.x, "y": refLineStart.y, "width": dx1, "height": dy1 };
                    if (!RectContainsPoint(rect, lineStart) && !RectContainsPoint(rect, lineEnd)) return false;
                }

                dx1 = lineEnd.x - lineStart.x;
                dy1 = lineEnd.y - lineStart.y;
                df1 = dx1 * (refLineStart.y - lineStart.y) - dy1 * (refLineStart.x - lineStart.x);
                df2 = dx1 * (refLineEnd.y - lineStart.y) - dy1 * (refLineEnd.x - lineStart.x);
                if (Sign(df1) * Sign(df2) > 0) return false;
                return true;
            }
        }
    }
    function RectContainsPoint(rect, p) {
        if (Sign(p.x - rect.x) * Sign(rect.x + rect.width - p.x) < 0) return false;
        if (Sign(p.y - rect.y) * Sign(rect.y + rect.height - p.y) < 0) return false;
        return true;
    }
    function InnerPoint(p, polygon, minX, minY, maxX, maxY) {
        if (p.x < minX || p.x > maxX) return false;
        if (p.y < minY || p.y > maxY) return false;

        var flags = [];
        var p1 = p;
        var p2 = { "x": maxX, "y": p1.y };
        var counter = 0;
        for (var i = 0; i < polygon.length; i++) {
            if (flags[i]) continue;
            flags[i] = true;
            var lineStart = polygon[i];
            var lineEnd = polygon[(i + 1) % polygon.length];

            if (CrossLine(p1, p2, lineStart, lineEnd)) {
                if (lineStart.y == p1.y) {
                    var leftY = lineStart.y;
                    var rightY = lineStart.y;
                    for (var j = 0; j < polygon.length - 2; j++) {
                        var index = (i - 1 - j + polygon.length) % polygon.length;
                        flags[index] = true;
                        if (polygon[index].y != lineStart.y) {
                            leftY = polygon[index].y;
                            break;
                        }
                    }
                    for (var j = 0; j < polygon.length - 2; j++) {
                        var index = (i + 1 + j) % polygon.length;
                        if (polygon[index].y != lineStart.y) {
                            rightY = polygon[index].y;
                            break;
                        }
                        flags[index] = true;
                    }
                    if (Sign(leftY - lineStart.y) * Sign(rightY - lineStart.y) < 0) counter++;
                }
                else {
                    if (lineEnd.y != p1.y) counter++;
                }
            }
        }
        return counter % 2 == 1;
    }
    var t = 0;
    function DoAppendHLine(x1, x2, y, pen) {
        //DoAppendHLine(x1,x2,y,pen);return
        setTimeout(function (xx1, xx2, yy, ppen) {
            return function () {
                DoAppendHLine(xx1, xx2, yy, ppen);
            }
        } (x1, x2, y, pen), t)
        t += 20;
    }
    function DoAppendVLine(x, y1, y2, pen) {
        //DoAppendVLine(x,y1,y2,pen);return
        setTimeout(function (xx, yy1, yy2, ppen) {
            return function () {
                DoAppendVLine(xx, yy1, yy2, ppen);
            }
        } (x, y1, y2, pen), t)
        t += 20;
    }
    function AppendHLine(x1, x2, y, pen) {
        var min = x1 < x2 ? x1 : x2;
        var max = x1 < x2 ? x2 : x1;
        var div = document.createElement("DIV");
        div.style.overflow = "hidden";
        div.style.width = (max - min + 1) + "px";
        div.style.height = "1px";
        div.style.position = "absolute";
        div.style.left = min + "px";
        div.style.top = y + "px";
        div.style.backgroundColor = pen.color;
        clipCVS.appendChild(div);
    }
    function AppendVLine(x, y1, y2, pen) {
        var min = y1 < y2 ? y1 : y2;
        var max = y1 < y2 ? y2 : y1;
        var div = document.createElement("DIV");
        div.style.overflow = "hidden";
        div.style.width = "1px";
        div.style.height = (max - min + 1) + "px";
        div.style.position = "absolute";
        div.style.left = x + "px";
        div.style.top = min + "px";
        div.style.backgroundColor = pen.color;
        clipCVS.appendChild(div);
    }
    var cvs = document.createElement("DIV");
    cvs.style.position = "relative";
    cvs.style.overflow = "hidden";
    var clipCVS = cvs;
    resize();
    root.appendChild(clipCVS);
    Graphics.RegisterEvent(root, "resize", resize);
}
Html4Graphics.FromElement = function (ele) {
    if (!Html4Graphics.Cache) Html4Graphics.Cache = [];
    for (var i = 0; i < Html4Graphics.Cache.length; i++) {
        var kv = Html4Graphics.Cache[i];
        if (kv.Key == ele) return kv.Value;
    }
    return new Html4Graphics(ele);
}

function Html5Graphics(ele) {
    if (!Html5Graphics.Cache) Html5Graphics.Cache = [];
    Html5Graphics.Cache[Html5Graphics.Cache.length] = { "Key": ele, "Value": this };
    var root = ele;
    function resize() {
        var size = Graphics.ElementSize(root);
        clipCVS.width = size.width;
        clipCVS.height = size.height;
    }
    this.Clear = function (color) {
        context.fillStyle = color;
        context.fillRect(0, 0, clipCVS.width, clipCVS.height);
    }
    this.DrawString = function (self) {
        return function (s, font, brush, point, format) {
            context.fillStyle = brush.color;
            if (font) context.font = font;
            var size = self.MeasureString(s, font, null, format);
            context.fillText(s, point.x, point.y + 16);
            return size;
        }
    } (this);
    this.MeasureString = function (s, font, maxSize, format) {
        if (font) context.font = font;
        var size1 = context.measureText(s + "");
        if (maxSize) {
            var wid = size1.width < maxSize.width ? size1.width : maxSize.width;
            var hit = size1.height < maxSize.height ? size1.height : maxSize.height;
            size1 = { "width": wid, "height": hit };
        }

        if (!size1.width || !size1.height) {
            var span = document.createElement("SPAN");
            span.style.overflow = "hidden";
            span.style.position = "absolute";
            if (font) span.style.font = font;
            span.innerText = s;
            root.appendChild(span);
            var size2 = Graphics.ElementSize(span);
            root.removeChild(span);
            if (maxSize) {
                var wid = size2.width < maxSize.width ? size2.width : maxSize.width;
                var hit = size2.height < maxSize.height ? size2.height : maxSize.height;
                size2 = { "width": wid, "height": hit };
            }
            if (!size1.width) size1.width = size2.width;
            if (!size1.height) size1.height = size2.height;
        }
        return size1;
    }
    this.DrawImage = function (imageUrl, desRect, srcRect, srcUnit) {
        var img = new Image();
        img.src = imageUrl;

        var imgSize = { "width": img.width, "height": img.height };
        if (!desRect.width) desRect.width = imgSize.width;
        if (!desRect.height) desRect.height = imgSize.height;
        if (!desRect.x) desRect.x = 0;
        if (!desRect.y) desRect.y = 0;

        if (!srcRect) srcRect = {};
        if (!srcRect.width) srcRect.width = imgSize.width;
        if (!srcRect.height) srcRect.height = imgSize.height;
        if (!srcRect.x) srcRect.x = 0;
        if (!srcRect.y) srcRect.y = 0;


        desRect = RegulateRect(desRect);
        srcRect = RegulateRect(srcRect);

        var scaleX = desRect.width / srcRect.width;
        var scaleY = desRect.height / srcRect.height;

        context.save();
        context.rect(desRect.x, desRect.y, desRect.width, desRect.height);
        context.stroke();
        context.clip();
        context.transform(scaleX, 0, 0, scaleY, desRect.x - srcRect.x * scaleX, desRect.y - srcRect.y * scaleY);
        context.drawImage(img, 0, 0);
        context.restore();
    }
    this.DrawPie = function (self) {
        return function (pen, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.DrawEllipse(pen, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                //这里会存在微小的偏差
                ps[ps.length] = { "x": Math.floor(rect.x + rect.width / 2 + 0.5), "y": Math.floor(rect.y + rect.height / 2 + 0.5) };
                self.DrawPolygon(pen, ps);
            }
        }
    } (this);
    this.FillPie = function (self) {
        return function (brush, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.FillEllipse(brush, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                //这里会存在微小的偏差
                ps[ps.length] = { "x": Math.floor(rect.x + rect.width / 2 + 0.5), "y": Math.floor(rect.y + rect.height / 2 + 0.5) };
                self.FillPolygon(brush, ps);
            }
        }
    } (this);
    this.DrawArc = function (self) {
        return function (pen, rect, startAngle, sweepAngle) {
            if (Math.abs(sweepAngle) >= 360) {
                self.DrawEllipse(pen, rect);
            }
            else {
                var ps = MapArcPoints(rect, startAngle, sweepAngle);
                self.DrawCurve(pen, ps);
            }
        }
    } (this);
    function MapArcPoints(rect, startAngle, sweepAngle) {
        rect = RegulateRect(rect)
        var ps = MapEllipsePoints(rect);
        var a = rect.width / 2;
        var b = rect.height / 2;
        var x0 = rect.x + a;
        var y0 = rect.y + b;
        var len = ps.length;
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": ps[len - 1 - i].x, "y": rect.y * 2 + rect.height - ps[len - 1 - i].y };
        }
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": rect.x * 2 + rect.width - ps[i].x, "y": rect.y * 2 + rect.height - ps[i].y };
        }
        for (var i = 0; i < len; i++) {
            ps[ps.length] = { "x": rect.x * 2 + rect.width - ps[len - 1 - i].x, "y": ps[len - 1 - i].y };
        }
        var aa = a * a;
        var bb = b * b;
        var ab = a * b;
        var angle = startAngle * Math.PI / 180;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var ab_del = ab / Math.sqrt(aa * sin * sin + bb * cos * cos);
        var p1 = { "x": x0 + ab_del * cos, "y": y0 + ab_del * sin };
        p1.x = Math.floor(p1.x + 0.5);
        p1.y = Math.floor(p1.y + 0.5);

        angle = (startAngle + sweepAngle) * Math.PI / 180;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        ab_del = ab / Math.sqrt(aa * sin * sin + bb * cos * cos);
        var p2 = { "x": x0 + ab_del * cos, "y": y0 + ab_del * sin };
        p2.x = Math.floor(p2.x + 0.5);
        p2.y = Math.floor(p2.y + 0.5);

        var minD1 = Math.sqrt(aa + bb);
        var minD2 = Math.sqrt(aa + bb);
        var i1 = -1;
        var i2 = -1;
        var len = ps.length;
        for (var i = 0; i < len; i++) {
            var d1, d2;
            if (ps[i].x == p1.x) {
                d1 = ps[i].y - p1.y;
                if (d1 < 0) d1 = -d1;
                if (d1 < minD1) {
                    minD1 = d1;
                    i1 = i;
                }
            }
            else if (ps[i].y == p1.y) {
                d1 = ps[i].x - p1.x;
                if (d1 < 0) d1 = -d1;
                if (d1 < minD1) {
                    minD1 = d1;
                    i1 = i;
                }
            }
            if (ps[i].x == p2.x) {
                d2 = ps[i].y - p2.y;
                if (d2 < 0) d2 = -d2;
                if (d2 < minD2) {
                    minD2 = d2;
                    i2 = i;
                }
            }
            else if (ps[i].y == p2.y) {
                d2 = ps[i].x - p2.x;
                if (d2 < 0) d2 = -d2;
                if (d2 < minD2) {
                    minD2 = d2;
                    i2 = i;
                }
            }
        }
        var result = [];
        if (sweepAngle > 0) {
            var cnt = (i1 - i2 + len) % len;
            for (var i = 0; i < cnt; i++) {
                var ii = (i1 - i + len) % len;
                result[i] = ps[ii];
            }
        }
        else {
            var cnt = (i2 - i1 + len) % len;
            for (var i = 0; i < cnt; i++) {
                var ii = (i1 + i + len) % len;
                result[i] = ps[ii];
            }
        }
        return result;
    }
    this.DrawLine = function (pen, p1, p2) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.closePath();
        context.strokeStyle = pen.color;
        context.stroke();
    }
    this.DrawRectangle = function (pen, rect) {
        rect = RegulateRect(rect);
        context.beginPath();
        context.moveTo(rect.x, rect.y);
        context.lineTo(rect.x + rect.width, rect.y);
        context.lineTo(rect.x + rect.width, rect.y + rect.height);
        context.lineTo(rect.x, rect.y + rect.height);
        context.lineTo(rect.x, rect.y);
        context.closePath();
        context.strokeStyle = pen.color;
        context.stroke();
    }
    this.FillRectangle = function (brush, rect) {
        rect = RegulateRect(rect);
        context.beginPath();
        context.moveTo(rect.x, rect.y);
        context.lineTo(rect.x + rect.width, rect.y);
        context.lineTo(rect.x + rect.width, rect.y + rect.height);
        context.lineTo(rect.x, rect.y + rect.height);
        context.lineTo(rect.x, rect.y);
        context.closePath();
        context.fillStyle = brush.color;
        context.fill();
    }
    this.DrawCurve = function (pen, points) {
        //有待验证
        points = RegulatePolygon(points);
        var cnt = points ? points.length : 0;
        if (cnt < 1) return;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < cnt; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
        context.strokeStyle = pen.color;
        context.stroke();
    }
    this.DrawPolygon = function (pen, points) {
        points = RegulatePolygon(points);
        var cnt = points ? points.length : 0;
        if (cnt < 1) return;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < cnt; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.lineTo(points[0].x, points[0].y);
        context.closePath();
        context.strokeStyle = pen.color;
        context.stroke();
    }
    this.FillPolygon = function (brush, points) {
        points = RegulatePolygon(points);
        var cnt = points ? points.length : 0;
        if (cnt < 1) return;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < cnt; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.lineTo(points[0].x, points[0].y);
        context.closePath();
        context.fillStyle = brush.color;
        context.fill();
    }
    this.DrawEllipse = function (self) {
        return function (pen, rect) {
            rect = RegulateRect(rect);
            var ps = MapEllipsePoints(rect);
            var cnt = ps.length;
            for (var i = 0; i < cnt; i++) {
                var p = ps[cnt - 1 - i];
                ps[i + cnt] = { "x": p.x, "y": rect.y * 2 + rect.height - p.y };
            }
            cnt = ps.length;
            for (var i = 0; i < cnt; i++) {
                var p = ps[cnt - 1 - i];
                ps[i + cnt] = { "x": rect.x * 2 + rect.width - p.x, "y": p.y };
            }
            self.DrawPolygon(pen, ps);
        }
    } (this);
    this.FillEllipse = function (self) {
        return function (brush, rect) {
            rect = RegulateRect(rect);
            var ps = MapEllipsePoints(rect);
            var cnt = ps.length;
            for (var i = 0; i < cnt; i++) {
                var p = ps[cnt - 1 - i];
                ps[i + cnt] = { "x": p.x, "y": rect.y * 2 + rect.height - p.y };
            }
            cnt = ps.length;
            for (var i = 0; i < cnt; i++) {
                var p = ps[cnt - 1 - i];
                ps[i + cnt] = { "x": rect.x * 2 + rect.width - p.x, "y": p.y };
            }
            self.FillPolygon(brush, ps);
        }
    } (this);
    function MapEllipsePoints(rect) {
        var a = rect.width / 2;
        var b = rect.height / 2;
        var x0 = rect.x + a;
        var y0 = rect.y + b;
        var aa = a * a;
        var bb = b * b;
        var xx = x0 + aa / Math.sqrt(aa + bb);
        var yy = y0 + bb / Math.sqrt(aa + bb);
        var ps = [];
        var p;
        for (var x = x0; x < xx; x++) {
            p = { "x": Math.floor(x + 0.5), "y": Math.floor(b * Math.sqrt(1 - (x - x0) * (x - x0) / aa) + y0 + 0.5) };
            ps[ps.length] = p;
        }
        {//这里可能存在重复点            
            for (var y = yy; y > y0; y--) {
                p = { "x": Math.floor(a * Math.sqrt(1 - (y - y0) * (y - y0) / bb) + x0 + 0.5), "y": Math.floor(y + 0.5) };
                ps[ps.length] = p;
            }
            p = { "x": Math.floor(a + x0 + 0.5), "y": Math.floor(y0 + 0.5) };
            ps[ps.length] = p;
        }
        return ps;
    }
    function RegulateRect(rect) {
        if (rect.width < 0) {
            rect.x += rect.width;
            rect.width = -rect.width;
        }
        if (rect.height < 0) {
            rect.y += rect.height;
            rect.height = -rect.height;
        }
        return rect;
    }
    function RegulatePolygon(polygon) {
        var ps = [];
        var start = polygon[0];
        var end = null;
        var t = null;
        for (var i = 1; i < polygon.length; i++) {
            var curr = polygon[i];
            if (curr.x == start.x) {
                if (curr.y == start.y) {
                    //
                }
                else {
                    switch (t) {
                        case "x":
                            ps[ps.length] = start;
                            ps[ps.length] = end;
                            start = curr;
                            end = null;
                            t = null;
                            break;
                        case "y":
                        default:
                            end = curr;
                            t = "y";
                            break;
                    }
                }
            }
            else {
                if (curr.y == start.y) {
                    switch (t) {
                        case "y":
                            ps[ps.length] = start;
                            ps[ps.length] = end;
                            start = curr;
                            end = null;
                            t = null;
                            break;
                        case "x":
                        default:
                            end = curr;
                            t = "x";
                            break;
                    }
                }
                else {
                    ps[ps.length] = start;
                    if (end) ps[ps.length] = end;
                    start = curr;
                    end = null;
                    t = null;
                }
            }
        }
        ps[ps.length] = start;
        if (end) ps[ps.length] = end;
        return ps;
    }
    function Sign(n) {
        if (n == 0) return 0;
        return n < 0 ? -1 : 1;
    }
    function CrossLine(refLineStart, refLineEnd, lineStart, lineEnd) {
        if (refLineEnd.x == refLineStart.x && refLineEnd.y == refLineStart.y) {
            if (lineEnd.x == lineStart.x && lineEnd.y == lineStart.y) {
                return refLineStart.x == lineStart.x && refLineEnd.y == lineEnd.y;
            }
            else {
                var dx1 = lineEnd.x - lineStart.x;
                var dy1 = lineEnd.y - lineStart.y;
                var df1 = dx1 * (refLineStart.y - lineStart.y) - dy1 * (refLineStart.x - lineStart.x);
                if (df1 != 0) return false;
                var rect = { "x": lineStart.x, "y": lineStart.y, "width": dx1, "height": dy1 };
                return RectContainsPoint(rect, refLineStart);
            }
        }
        else {
            if (lineEnd.x == lineStart.x && lineEnd.y == lineStart.y) {
                var dx1 = refLineEnd.x - refLineStart.x;
                var dy1 = refLineEnd.y - refLineStart.y;
                var df1 = dx1 * (lineStart.y - refLineStart.y) - dy1 * (lineStart.x - refLineStart.x);
                if (df1 != 0) return false;
                var rect = { "x": refLineStart.x, "y": refLineStart.y, "width": dx1, "height": dy1 };
                return RectContainsPoint(rect, lineStart);
            }
            else {
                var dx1 = refLineEnd.x - refLineStart.x;
                var dy1 = refLineEnd.y - refLineStart.y;
                var df1 = dx1 * (lineStart.y - refLineStart.y) - dy1 * (lineStart.x - refLineStart.x);
                var df2 = dx1 * (lineEnd.y - refLineStart.y) - dy1 * (lineEnd.x - refLineStart.x);
                if (Sign(df1) * Sign(df2) > 0) return false;
                if (df1 == 0 && df2 == 0) {
                    var rect = { "x": refLineStart.x, "y": refLineStart.y, "width": dx1, "height": dy1 };
                    if (!RectContainsPoint(rect, lineStart) && !RectContainsPoint(rect, lineEnd)) return false;
                }

                dx1 = lineEnd.x - lineStart.x;
                dy1 = lineEnd.y - lineStart.y;
                df1 = dx1 * (refLineStart.y - lineStart.y) - dy1 * (refLineStart.x - lineStart.x);
                df2 = dx1 * (refLineEnd.y - lineStart.y) - dy1 * (refLineEnd.x - lineStart.x);
                if (Sign(df1) * Sign(df2) > 0) return false;
                return true;
            }
        }
    }
    function RectContainsPoint(rect, p) {
        if (Sign(p.x - rect.x) * Sign(rect.x + rect.width - p.x) < 0) return false;
        if (Sign(p.y - rect.y) * Sign(rect.y + rect.height - p.y) < 0) return false;
        return true;
    }
    function InnerPoint(p, polygon, minX, minY, maxX, maxY) {
        if (p.x < minX || p.x > maxX) return false;
        if (p.y < minY || p.y > maxY) return false;

        var flags = [];
        var p1 = p;
        var p2 = { "x": maxX, "y": p1.y };
        var counter = 0;
        for (var i = 0; i < polygon.length; i++) {
            if (flags[i]) continue;
            flags[i] = true;
            var lineStart = polygon[i];
            var lineEnd = polygon[(i + 1) % polygon.length];

            if (CrossLine(p1, p2, lineStart, lineEnd)) {
                if (lineStart.y == p1.y) {
                    var leftY = lineStart.y;
                    var rightY = lineStart.y;
                    for (var j = 0; j < polygon.length - 2; j++) {
                        var index = (i - 1 - j + polygon.length) % polygon.length;
                        flags[index] = true;
                        if (polygon[index].y != lineStart.y) {
                            leftY = polygon[index].y;
                            break;
                        }
                    }
                    for (var j = 0; j < polygon.length - 2; j++) {
                        var index = (i + 1 + j) % polygon.length;
                        if (polygon[index].y != lineStart.y) {
                            rightY = polygon[index].y;
                            break;
                        }
                        flags[index] = true;
                    }
                    if (Sign(leftY - lineStart.y) * Sign(rightY - lineStart.y) < 0) counter++;
                }
                else {
                    if (lineEnd.y != p1.y) counter++;
                }
            }
        }
        return counter % 2 == 1;
    }
    var cvs = document.createElement("canvas");
    var clipCVS = cvs;
    var context = clipCVS.getContext("2d");
    resize();
    root.appendChild(clipCVS);
    Graphics.RegisterEvent(root, "resize", resize);
    this.CVS = function () { return clipCVS; }
}
Html5Graphics.FromElement = function (ele) {
    if (!Html5Graphics.Cache) Html5Graphics.Cache = [];
    for (var i = 0; i < Html5Graphics.Cache.length; i++) {
        var kv = Html5Graphics.Cache[i];
        if (kv.Key == ele) {
            if (kv.Value.CVS().parentNode != ele) ele.appendChild(kv.Value.CVS());
            return kv.Value;
        }
    }
    return new Html5Graphics(ele);
}

function Graphics(ele) {
    var g = Graphics.FromElement(ele);
    for (var func in g) {
        eval("this." + func + "=g." + func);
    }
}
Graphics.FromElement = function (ele) {
    var html5 = false;
    try {
        var cvs = document.createElement("canvas");
        html5 = cvs.getContext;
    }
    catch (err) {
    }
    return html5 ? Html5Graphics.FromElement(ele) : Html4Graphics.FromElement(ele);
}
Graphics.ElementSize = function (e) {
    var p = {};
    p.width = e.offsetWidth;
    p.height = e.offsetHeight;
    return p;
}
Graphics.RegisterEvent = function (ele, eventName, eventHandler) {
    if (ele.attachEvent) {
        if (eventName.indexOf("on") == 0) {
            ele.attachEvent(eventName, eventHandler);
        }
        else {
            ele.attachEvent("on" + eventName, eventHandler);
        }
    }
    else {
        if (eventName.indexOf("on") == 0) {
            ele.addEventListener(eventName.slice(2), eventHandler, true);
        }
        else {
            ele.addEventListener(eventName, eventHandler, true);
        }
    }
}
Graphics.UnregisterEvent = function (ele, eventName, eventHandler) {
    if (ele.detachEvent) {
        if (eventName.indexOf("on") == 0) {
            ele.detachEvent(eventName, eventHandler);
        }
        else {
            ele.detachEvent("on" + eventName, eventHandler);
        }
    }
    else {
        if (eventName.indexOf("on") == 0) {
            ele.removeEventListener(eventName.slice(2), eventHandler, true);
        }
        else {
            ele.removeEventListener(eventName, eventHandler, true);
        }
    }
}
function Histogram(ele, data, displayMember, xMember, yMember, style) {
    var size = Graphics.ElementSize(ele);
    var minX, maxX, minY, maxY;
    minX = 0;
    maxX = minX;
    minY = 0;
    maxY = minY;
    for (var i = 0; i < data.length; i++) {
        if (data[i][xMember] < minX) minX = data[i][xMember];
        else if (data[i][xMember] > maxX) maxX = data[i][xMember];
        if (data[i][yMember] < minY) minY = data[i][yMember];
        else if (data[i][yMember] > maxY) maxY = data[i][yMember];
    }
    var l = { 'x': 24, 'y': 24 };
    var s = { 'width': size.width - l.x * 2, 'height': size.height - l.y * 2 };
    var w = s.width / parseInt(maxX - minX + 1, 10);
    var h = s.height / parseInt(maxY - minY + 1, 10);
    var g = Graphics.FromElement(ele);
    g.Clear(style.bg.color);
    g.DrawLine(style.fg, { 'x': l.x, 'y': l.y + s.height }, { 'x': l.x + s.width, 'y': l.y + s.height });
    g.DrawLine(style.fg, { 'x': l.x, 'y': l.y }, { 'x': l.x, 'y': l.y + s.height });
    for (var i = 0; i < data.length; i++) {
        var dx = data[i][xMember] - minX;
        var dy = data[i][yMember] - minY;
        var ox = w * dx;
        var oy = h * dy;
        var x = l.x + ox;
        var y = s.height + l.y - oy;
        var c = { "color": calcColor(0, data.length, i) };
        g.FillRectangle(c, { 'x': x - w / 8, 'y': y, 'width': w / 4, 'height': oy });
        var sz = g.MeasureString(data[i][displayMember]);
        g.DrawString(data[i][displayMember], style.ft, c, { 'x': x - sz.width / 2, 'y': y + oy });
        var sz = g.MeasureString(data[i][yMember]);
        g.DrawString(data[i][yMember], style.ft, c, { 'x': x - sz.width / 2, 'y': y - sz.height - 2 });
    }
}
function Table(ele, columns, rows, style) {
    ele.innerHTML = "";
    ele.style.backgroundColor = style.bg.color;
    var table = ele.ownerDocument.createElement("TABLE");
    var tbody = ele.ownerDocument.createElement("TBODY");
    table.appendChild(tbody);
    table.style.tableLayout = "fixed";
    table.style.width = "100%";
    table.cellSpacing = "0";
    table.cellPadding = "0";
    var tr = ele.ownerDocument.createElement("TR");
    tbody.appendChild(tr);
    for (var c = 0; c < columns.length; c++) {
        var td = ele.ownerDocument.createElement("TD");
        tr.appendChild(td);
        td.style.color = style.header.color;
        td.style.font = style.header.font;
        td.innerHTML = columns[c].DisplayText;
        td.title = columns[c].DisplayText;
        td.style.width = columns[c].Width;
        td.style.border = style.border;
    }
    for (var r = 0; r < rows.length; r++) {
        var tr = ele.ownerDocument.createElement("TR");
        tbody.appendChild(tr);
        for (var c = 0; c < columns.length; c++) {
            var td = ele.ownerDocument.createElement("TD");
            tr.appendChild(td);
            td.style.color = style.row.color;
            td.style.font = style.row.font;
            td.style.overflow = "hidden";
            td.innerHTML = rows[r][columns[c].Name];
            td.title = rows[r][columns[c].Name];
            td.style.width = columns[c].Width;
            td.style.border = style.border;
        }
    }
    ele.appendChild(table);
}

function Sector(ele, data, displayMember, valueMember, style) {
    var size = Graphics.ElementSize(ele);
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i][valueMember];
    }
    var g = Graphics.FromElement(ele);
    g.Clear(style.bg.color);
    var sum = 0;
    var s = size.width < 200 ? size.width * 0.8 : size.width - 100;
    if (s > size.height * 0.8) s = size.height * 0.8;
    var y = 0;
    for (var i = 0; i < data.length; i++) {
        var startAngle = sum * 360 / total;
        sum += data[i][valueMember];
        var sweepAngle = data[i][valueMember] * 360 / total;
        var c = { "color": calcColor(0, data.length, i) };
        g.FillPie(c, { 'x': 0, 'y': (size.height - s) / 2, 'width': s, 'height': s }, startAngle, sweepAngle);
        g.DrawString(data[i][displayMember] + ":" + parseInt(data[i][valueMember] * 100 / total, 10) + "%", style.ft, c, { 'x': size.width - s, 'y': y }, null);
        y += 18;
    }
}
function calcColor(bg, count, index) {
    count++;
    var total = 256 * 256 * 256;
    index++;
    var offset = parseInt(index * total / count, 10);
    var val = (bg + offset) % total;
    return "rgb(" + ((val & 0xff0000) >> 16) + "," + ((val & 0xff00) >> 8) + "," + ((val & 0xff) >> 0) + ")";
}