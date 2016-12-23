function initVue() {
	settingVue = new Vue({
		el: "#seting-pages",
		data: {
			oldPwd: "",
			newPwd: "",
			affPwd: "",
			userName:"",
			retrieveText:""
		},
		methods: {
			//找回密码
			retrievePwd: function() {
				if(!this.userName){
					mui.toast("请输入当前用户名");
					return false;
				}
				plus.nativeUI.showWaiting("请稍后...")
				var message = '#{CMD:"repassword",USERNAME:"'+this.userName+'",TAG:"repassword",TYPE:"'+ os +'"}*';
				ws.send(message);
			},
			//修改手势密码
			editLocker: function() {
				lockerPage.evalJS("editPwd()");
				lockerPage.show();
			},
			//修改用户密码
			editUserPwd: function() {
				var account = JSON.parse(localStorage.getItem("account"));
				if(!(account.passWord == this.oldPwd)) {
					mui.toast("旧密码输入错误");
					return false;
				};
				plus.nativeUI.showWaiting("请稍等...")
				var message = '#{"CMD":"resetpassword","USERNAME":"' + account.userName + '","PASSWORD":"' + account.passWord + '","TAG":"editUserPwd","NEWPASSWORD":"' + this.affPwd + '","TYPE":"' + os + '"}*'
				ws.send(message);
				console.log("修改密码 :" + message)
			}
		}
	})
};

function initWebsocket() {
	ws = new ReconnectingWebSocket("ws://123.56.176.67:9010/ws");

	ws.onopen = function(e) {

	};
	ws.onmessage = function(event) {
		var data = dataDispose(event.data)
		if(data == CENTRT) {
			console.log("心跳")
			ws.send(data);
			return;
		}
		switch (data.TAG){
			case "editUserPwd":
				plus.nativeUI.closeWaiting();
				if(errorDispose(data)){
					mui.toast("密码修改成功")
				}
				break;
			case "repassword":
				plus.nativeUI.closeWaiting();
				if(errorDispose(data)){
					settingVue.$data.retrieveText = data.PASSWORD;
					mui.toast("密码成功找回");
				}
				break;
			default:
				break;
		}
	};
	ws.onerror = function(e) {

	};
	ws.onclose = function(e) {

	}
}