var CENTRT = "#$*"; //心中内容
mui.os.android ? os = "Webandroid" : os = "WebiPhone";
/**
 * 处理服务器返回的数据，并且返回
 * @param {Object} re 服务器返回的DATA
 * @return {String} result 返回经过处理的数据
 */
function dataDispose (re){
	var result = re;
	switch (result){
		case "#$*":
			//心跳，不做处理，直接返回
			break;
		default:
			result = JSON.parse(result.substring(1,result.length-1)); // 去头，去尾获取返回对象
			break;
	}
	
	return result;
}

/**
 * uuid
 * @param {Object} len
 * @param {Object} radix
 */
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}