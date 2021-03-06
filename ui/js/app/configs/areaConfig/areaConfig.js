function init() {
    this.SetColumnHeadInfo();
    var areaConfigForm = new AreaConfigForm();
    areaConfigForm.oo(new IdentifiedForm(document.body));
    var titles = {
        "AreaRecords": "AreaRecords",
        "SelectedPKCode": "SelectedPKCode",

        "NewArea": "NewArea",
        "SaveArea": "SaveArea",
        "DeleteArea": "DeleteArea",
        "ActiveArea": "ActiveArea",
        "FrozenAreaList": "FrozenAreaList",
        "ActivedAreaList": "ActivedAreaList",

        "AreaCode": "AreaCode",
        "AreaName": "AreaName",

        "MoveTop": "MoveTop",
        "MoveUp": "MoveUp",
        "MoveDown": "MoveDown",
        "MoveBottom": "MoveBottom",

        "NotifyTitle": "68579a1f-acc7-4673-9166-e4eca3fb13ca"
    };
    for (var t in titles) {
        areaConfigForm.SetTitle(t, titles[t]);
    }
    formCallCenter.RegisterForm(window.FormIDs.AreaConfigModule, areaConfigForm);
    
    document.oncontextmenu = function () { return false; }
   }

   function AreaConfigForm() {
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

function BeforeClick(id) {
    var table = document.getElementById(id);
    ElementCollectionToArray(table.parentNode.getElementsByTagName("TABLE")).forEach(function (x) { x.style.display = "none"; });

    document.getElementById(id).style.display = '';
}

function SetColumnHeadInfo() {
    var data = new Array();
    //Name,Description,Width(可空)
    data.push("AreaCode:出生地代码");
    data.push("AreaName:出生地名称");
   // data.push("DisplayNO:显示顺序:100");

    var ele = document.getElementById("AreaRecords");
    ele.setAttribute("displaymember", data.join(","));
    ele.setAttribute("valuemember", "AreaCode");
}


function IsDisabledOnClick(frozenDivID, activeDivID) {
    document.getElementById(frozenDivID).style.display = "none";
    document.getElementById(activeDivID).style.display = "block";
    $Array(document.getElementById("TableConfigArea").getElementsByTagName("input")).forEach(function (item, i) {
        if (frozenDivID == "frozenAreaID") {
            item.setAttribute("disabled", "disabled");
        }
        else {
            item.removeAttribute('disabled');
        }

    });
}


