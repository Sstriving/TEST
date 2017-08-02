function ExamRequestTimeConv(isStartAndEnd,style) {
    if (!style) style = { 'inputItemText': 'inputItemText'
    };
    this.GetUIValue = function (root) {
        var start = root.children[0].value==null ? "":root.children[0].value.substr(0,10);
        var end=null;
        if(isStartAndEnd){
            if(root.children[2].value==""||root.children[2].value==null){
                end=null;
            }
            else{
                var enddate = new Date(root.children[2].value.replace(/-/g,"/"));
                enddate=new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                end = enddate;
            }
        }
        else {
            if(start=="" ||start==null){
                end=null;
            }
            else{
                var enddate = new Date(start.replace(/-/g,"/"));
                enddate=new Date(enddate.getTime() + 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                end = enddate;
            }
        }
        var a = {
            'Start': start,
            'End': end
        };
        return a.toJSONString();
    }
    this.ApplyValue = function (ele, val) {
        if (ele.children.length == 0) {
            var input0 = document.createElement('input');
            css(input0).Add(style.inputItemText);
            //input0.setAttribute('class', 'inputItemText inputSearch');
            //input0.setAttribute('id', 'Start');

            input0.setAttribute('onchange', 'changeFieldValue(this.parentNode);');
            input0.setAttribute('onclick', 'WdatePicker({onpicked:function(){}, dateFmt:"yyyy-MM-dd", readOnly: true});');
            ele.appendChild(input0);
            if(isStartAndEnd){
                var span = document.createElement('span')
                span.innerText = '~';
                ele.appendChild(span);

                var input1 = document.createElement('input');
                css(input1).Add(style.inputItemText);
                //input1.setAttribute('class', 'inputItemText inputSearch');
                input1.setAttribute('onchange', 'changeFieldValue(this.parentNode);');
                //input1.setAttribute('id', 'End');
                input1.setAttribute('onclick', 'WdatePicker({onpicked:function(){}, dateFmt:"yyyy-MM-dd", readOnly: true});');
                ele.appendChild(input1);
            }
            if (val) {
                if(isStartAndEnd){
                    input0.innerText = val.Start==null ? "":val.Start.substr(0,10);
                    if(val.End==""||val.End==null){
                        input1.innerText = "";
                    }else{
                        var enddate = new Date(val.End.replace(/-/g,"/"));
                        enddate=new Date(enddate.getTime() - 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                        input1.innerText = enddate;
                    }
                }
                else{
                    input0.innerText = val.Start==null ? "":val.Start.substr(0,10);
                }
            }
        } else {
            if (val) {
                if(isStartAndEnd){
                    ele.children[0].value = val.Start==null ? "":val.Start.substr(0,10);
                    if(val.End==""||val.End==null){
                        ele.children[2].value = "";
                    }else{
                        var enddate = new Date(val.End.replace(/-/g,"/"));
                        enddate=new Date(enddate.getTime() - 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                        ele.children[2].value = enddate;
                    }
                }
                else{
                    ele.children[0].value = val.Start==null ? "":val.Start.substr(0,10);
                }

            }
        }
        if (val == null) {
            if(isStartAndEnd){
                ele.children[0].value = "";
                ele.children[2].value = "";
            }
            else{
                ele.children[0].value = "";
            }
        }
    }
    this.oo(new Form_SingleValueConv());
}
