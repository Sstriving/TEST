function Element(ele) {
    this.setText = function (text, enc) {
        if (enc) text = enc(text);
        if (text != 0) text = text ? text : "";
        if (text == "未定义") text = "";
        switch (ele.tagName) {
            case "INPUT":
            case "TEXTAREA":
                ele.value = text;
                break;
            default:
                ele.textContent = text;
                ele.innerText = text;
                break;
        }
        return text;
    }
    this.getText = function () {
        switch (ele.tagName) {
            case "INPUT":
            case "TEXTAREA":
                return ele.value;
            default:
                return ele.innerText ? ele.innerText : ele.textContent;
        }
    }
    this.setHtml = function (html) {
        if (html != 0) html = html ? html : "";
        ele.innerHTML = html;
        return html;
    }
    this.getHtml = function () {
        return ele.innerHTML;
    }
    return this;
}
function ParseUrl(url) {
    var result = {};
    result.Parameters = {};
    var split = url.split("://");
    var left;
    if (split.length > 1 && split[0].length) {
        result.Protocol = split[0];
        left = url.substr(split[0].length + 3, url.length - split[0].length - 3);
    }
    else {
        result.Protocol = "http";
        left = url;
    }
    split = left.split("?");
    result.Path = "";
    for (var i = 0; i < split.length - 1; i++) {
        if (i == split.length - 2) {
            result.Path += split[i];
        }
        else {
            result.Path += split[i] + "?";
        }
    }
    var params = split[split.length - 1].split("&");
    for (var i = 0; i < params.length; i++) {
        var nv = params[i].split("=");
        result.Parameters[nv[0]] = nv[1];
    }
    return result;
}