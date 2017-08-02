function CASignListConv(){
	Form_SingleValueConv.apply(this);
	
	
	this.DecodeArguments = function (ele, args) {
		return args;
	}
	
	this.ApplyValue = function (ele, val) {		
	    function GetStatusName(statusCode){
			var res = '未知';
			switch(statusCode){
				case 'Reported':res = '已报告';break;
				case 'Reviewed':res = '已审核';break;
			}
			return res;
		}
		
		for(var i=ele.childNodes.length-1;i>=0;i--) {
			ele.removeChild(ele.childNodes[i]);
		} 
		var spanItem = document.createElement("div");
		spanItem.style.cssText="padding-left:2px;";
		spanItem.innerHTML  = "&nbsp;&nbsp;&nbsp;状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期时间 ";
		ele.appendChild(spanItem);
		
		
		for(var i=0;i<val.length;i++) {
			spanItem = document.createElement("span");
			spanItem._bindData = val[i];
			spanItem.style.cssText="display:block;border-top:1px solid #BFBFBF;border-bottom:1px solid #BFBFBF";
			spanItem.innerHTML = "&nbsp;&nbsp"+GetStatusName(val[i].Status) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+val[i].OperateDateTime;
			spanItem.onclick = function(event){
					var current_ele = event.target;
					var root = current_ele.parentNode;
					for(var j=0;j<root.childNodes.length;j++) {
						root.childNodes[j].style.fontWeight = 'normal';
					} 
					
					current_ele.style.fontWeight = "bold";
					var obj = event.target._bindData;
					var form = formCallCenter.GetFormByID(FormIDs.CAVerifyModule);
					form.SetField("SelectedSignInfo", obj.UID, true);
				};
			
			ele.appendChild(spanItem);
		}
	}
	
	
}

function CAConditionConv(){  
	Form_SingleValueConv.apply(this);
	this.DecodeArguments = function (ele, args) {
		var res = '';
		if(args[0]!=null)
			res =args[0];
		return res;
	}
	
	this.GetUIValue=function(ele){ 
		return ele.value;
	}
	
	this.ApplyValue = function (ele, val){
		ele.value = val;
	}
} 

function CAInfoPropertyShowConv(){
	Form_SingleValueConv.apply(this);
	this.DecodeArguments = function (ele, args) {
		return args[0];
	}
	
	this.ApplyValue = function (ele, val){
		ele.innerText = val;
	}
}

function SelectedSignInfoConv(){
	Form_SingleValueConv.apply(this);
	this.DecodeArguments = function (ele, args) {
		return args;
	}
}

function SignVerifyResultConv(){
	Form_SingleValueConv.apply(this); 
	this.DecodeArguments = function (ele, args) {
		return args[0];
	}
	this.ApplyValue=function(ele,val){
		if(!val) return;
		if(val.Result == true) 
			alert("验证通过");
		else
			alert("验证失败："+val.Msg);
	}
}

function StampVerifyResultConv(){ 
	Form_SingleValueConv.apply(this);
	this.DecodeArguments = function (ele, args) {
		return args[0];
	}
	this.ApplyValue=function(ele,val){
		if(!val) return;
		if(val.Result == true)
			alert("签名时间为:"+val.Msg);
		else
			alert("时间戳验证失败");
	}
}

function CAImageConv(){ 
	Form_SingleValueConv.apply(this);
	this.DecodeArguments = function (ele, args) {
		return args[0];
	}
	this.ApplyValue=function(ele,val){
		ele.src = val;
	}
}