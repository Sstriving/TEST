var corejsloader = new function () {

    var js = document.scripts;
    js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
    
    this.loadjs = function (ralativeFullName) {
        document.write("<script src='" + js + ralativeFullName + "'><\/script>");
    }

} ();


//加载JS文件

corejsloader.loadjs("Compatible.js");
corejsloader.loadjs("OO.js");
corejsloader.loadjs("Map.js");
corejsloader.loadjs("Domain.js");
corejsloader.loadjs("Converter.js");
corejsloader.loadjs("Form.js");
corejsloader.loadjs("Event.js");
corejsloader.loadjs("Controls.js");