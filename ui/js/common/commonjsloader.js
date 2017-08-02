var commonjsloader = new function () {

    var js = document.scripts;
    js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
    
    this.loadjs = function (ralativeFullName) {
        document.write("<script src='" + js + ralativeFullName + "'><\/script>");
    }

} ();


//加载JS文件
commonjsloader.loadjs("json.js");
commonjsloader.loadjs("override.js");
commonjsloader.loadjs("css.js");
commonjsloader.loadjs("Collection.js");
commonjsloader.loadjs("jquery-1.9.1.min.js");
commonjsloader.loadjs("Controls/Datetimepicker/WdatePicker.js");
commonjsloader.loadjs("Controls/DateTime/DateTimeEx.js");
commonjsloader.loadjs("Controls/CUSTOMSELECT.js");
commonjsloader.loadjs("Controls/EDITSELECT.js");
commonjsloader.loadjs("Controls/LISTSELECT.js");
commonjsloader.loadjs("Controls/MENUCONTEXT.js");
commonjsloader.loadjs("Controls/TAB.js");
commonjsloader.loadjs("Controls/TABLE.js");
commonjsloader.loadjs("Controls/TREEVIEW.js");
commonjsloader.loadjs("Controls/Menu.js");
commonjsloader.loadjs("Controls/CUSTOMTREE/CUSTOMTREE.js");
