
var commonjsloader = new function () {

    var js = document.scripts;
    js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
    
    this.loadjs = function (ralativeFullName) {
        document.write("<script src='" + js + ralativeFullName + "'><\/script>");
    }

} ();


//加载JS文件
commonjsloader.loadjs("base.formids.js");
commonjsloader.loadjs("base.conv.js");