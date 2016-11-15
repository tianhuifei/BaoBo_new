var CENTRT = "#$*"; //心跳内容
mui.os.android ? os = "Webandroid" : os = "WebiPhone";
/**
 * 处理服务器返回的数据，并且返回
 * @param {Object} re 服务器返回的DATA
 * @return {String} result 返回经过处理的数据
 */
function dataDispose (re,ws){
	var result = re;
	switch (result){
		case "#$*":
			//心跳，不做处理，直接返回
			if(ws.readyState == ws.OPEN){
				console.log(ws)
				ws.send("#$*");
			}
			result = 0;
			break;
		default:
			result = JSON.parse(result.substring(1,result.length-1)); // 去头，去尾获取返回对象
			break;
	}
	
	
	return result;
}

/**
 * 错误信息提示
 * @param {Object} data
 */
function errorDispose (data){
	var result  = true;
	if( parseInt(data.errno)  == -1){// error:0      成功     error:-1失败
		mui.toast(data.errorMsg);
		result = false;
	}
	return result;
}
