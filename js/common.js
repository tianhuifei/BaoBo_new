var CENTRT = "#$*"; //心跳内容
mui.os.android ? os = "Webandroid" : os = "WebiPhone";
/**
 * 处理服务器返回的数据，并且返回
 * @param {Object} re 服务器返回的DATA
 * @return {String} result 返回经过处理的数据
 */
function dataDispose (re){
	var result = re;
	if(result == "#$*"){return "#$*"}
	result = JSON.parse(result.substring(1,result.length-1)); // 去头，去尾获取返回对象
	return result;
}

/**
 * 错误信息提示
 * @param {Object} data
 */
function errorDispose (data){
	plus.nativeUI.closeWaiting();
	var result  = true;
	if( parseInt(data.ERRNO)  == -1){// error:0      成功     error:-1失败
		if(data.ERRORMSG) mui.toast(data.ERRORMSG);
		if(data.ERROR) mui.toast(data.ERROR);
		result = false;
	}
	return result;
}
