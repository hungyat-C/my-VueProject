import $ from 'jquery';
let common = {
	getType (value) {
    let result = value;
    switch (value) {
      case 'job':
        result = '招聘'
        break
      case 'good':
        result = '精华'
        break
      case 'share':
        result = '分享'
        break
      case 'ask':
        result = '问答'
        break
      default:
        result = '全部'
        break
    }
    return result
  },
  ajaxGet(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: data || {},
            success: data => {
                resolve(data);
            },
            error: data => {
                reject();
                console.error("数据请求失败");
            }
        })
    });
  }
}
export default common
