function DiagTempMenu() {
}
DiagTempMenu.Toggle = function (ele, show) {
    if (show) {
        $(ele).find(".List").show();
    }
    else {
        $(ele).find(".List").hide();
    }
}
DiagTempMenu.Select = function (ele) {
    ele.parentNode.previousSibling.innerHTML = ele.innerHTML;
    ele.parentNode.style.display = "none";
}