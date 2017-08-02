Object.prototype.ooInherit = function () {
    if (!this.ooBase) return;
    this.ooBase.ooInherit(this.ooBase);
    for (var m in this.ooBase) {
        if (m == "ooBase" || m == "ooInherit" || m == "ooOverride" || m == "oo") continue;
        if (eval("this." + m)) continue;
        var code = "this." + m + "=this.ooBase." + m;
        eval(code);
    }
}
Object.prototype.ooOverride = function () {
    if (!this.ooBase) return;
    for (var m in this) {
        if (m == "ooBase" || m == "ooInherit" || m == "ooOverride" || m == "oo") continue;
        var code = "this.ooBase." + m + "=this." + m;
        eval(code);
    }
    this.ooBase.ooOverride();
}
Object.prototype.oo = function () {
    if (arguments && arguments.length > 0) {
        this.ooBase = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            arguments[i].ooBase = arguments[i + 1];
        }
    }
    this.ooInherit();
    this.ooOverride();
}
