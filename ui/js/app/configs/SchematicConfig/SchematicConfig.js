function init() {
    SetColumnHeadInfo();
    var schematicConfigConfigForm = new SchematicConfigConfigForm();
    schematicConfigConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "SchematicBodyPartList": "SchematicBodyPartList",
        "SelectedPKCode": "SelectedPKCode",
        "FrozenSchematicList": "FrozenSchematicList",
        "DeleteSchematic": "DeleteSchematic",
        "ActivedSchematicList": "ActivedSchematicList",
        "ActiveSchematic": "ActiveSchematic",
        "ExamTypeList": "ExamTypeList",
        "ExamTypeID": "ExamTypeID",
        "SchematicBodyPartID": "SchematicBodyPartID",
        "SchematicImageUrl": "SchematicImageUrl",
        "SchematicBodyPartName": "SchematicBodyPartName",
        "InputX": "InputX",
        "InputY": "InputY",
        "NewSchematic": "NewSchematic",
        "SaveSchematic": "SaveSchematic",
        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",
        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        schematicConfigConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.SchematicModule, schematicConfigConfigForm);
    
    document.oncontextmenu = function () { return false; }
}

function SchematicConfigConfigForm() {
    this.Response = function (self) {
        return function (title, args) {
            switch (title) {
                default:
                    self.SetField(title, args);
                    break;
            }
        };
    } (this);
}


function SetColumnHeadInfo() {
    var data = new Array();
    data.push("SchematicBodyPartName:部位");
    data.push("X:X");
    data.push("Y:Y");
    document.getElementById("SchematicBodyPartList").setAttribute("displaymember", data.join(","));
    document.getElementById("SchematicBodyPartList").setAttribute("valuemember", "SchematicBodyPartID");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    $("#" + frozenDivID).hide();
    $("#" + activeDivID).show();
    $Array(document.getElementById("TableConfigSchematic").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenSchematicID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}


function SehcmaticClick(obj) {
    var span = document.getElementById("spot");
    var form = formCallCenter.GetFormByID("SchematicModule");
    var x = event.clientX - obj.getBoundingClientRect().left;
    var y = event.clientY - obj.getBoundingClientRect().top;
	form.Response("InputX", [(x / obj.width).toFixed(15)]);
    form.Response("InputY", [(y / obj.height).toFixed(15)]);
    span.innerHTML = "●";
    var top = event.clientY - 20;
    var left = event.clientX - 5;
    span.style.cssText = "display:block;width:" + obj.width + "px;" + "height:" + obj.height + "px;" + "z-index:999;border:1px;float:left;clear:both;position: absolute;top:" + top + "px;left:" + left + "px;";
	form.SetField("InputX", [(x / obj.width).toFixed(15)],true);
	form.SetField("InputY", [(y / obj.height).toFixed(15)],true);
}

function SehcmaticImageConv() {
    this.GetUIValue = function (root) { }
    this.ApplyValue = function (ele, val) {
        if (ele.children.length == 0) {
            if (val != null) {
                ele.setAttribute('src', val);
            }

        }
    }
    this.oo(new Form_SingleValueConv());
}

function Coordinates(){
    var X=document.getElementById("X").value;
    var Y=document.getElementById("Y").value;
    var span = document.getElementById("spot");
         if (X != null && Y != null) {
                 var left = span.nextSibling.getBoundingClientRect().left + span.nextSibling.width * X - 7;
                var top = span.nextSibling.getBoundingClientRect().top + span.nextSibling.height * Y - 20;
                span.innerHTML = "●";
                span.style.cssText = "display:block;width:" + span.nextSibling.width + "px;" + "height:" + span.nextSibling.height + "px;" + "z-index:999;border:1px;float:left;clear:both;position: absolute;top:" + top + "px;left:" + left + "px;";
            }

}
function clearBody() {
    var span = document.getElementById("spot");
    span.innerHTML = "";

}
