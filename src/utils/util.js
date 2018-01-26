var redColor = "#e0434e";
var greenColor = "#69bd5f";
var grayColor = "#9c9c9c";

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//得到标准时区的时间的函数
function getLocalTime(i) {
  //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
  if (typeof i !== 'number') return;
  var d = new Date();
  //得到1970年一月一日到现在的秒数
  var len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  var offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  var utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
}

function getAmount(count, unit) {
  var curCount = Math.round(count / unit);
  var countStr = curCount + "";
  if (curCount > 100000000)
    countStr = (curCount / 100000000).toFixed(2) + "亿";
  else if (curCount > 10000)
    countStr = (curCount / 10000).toFixed(2) + "万";

  return countStr;
}

function getColor(curPrice, lastPrice) {
  var color = "#4c4c4c";
  if (curPrice > lastPrice)
    color = redColor;
  else if (curPrice < lastPrice)
    color = greenColor;
  return color;
}

//获取小数点位数
function getPrecision(value) {
  if (value == null)
    return 2;
  var arr = value.split('.');
  if (arr.length < 2)
    return 2;

  if (arr[1].length < 2)
    return 2;

  return arr[1].length;
}

//数字转化为万、亿、万亿
function getMoney(value, unit) {
  var str = "--";
  if (isNaN(value))
    return str;

  var val = value / unit;
  if (val >= 1000000000000)
    str = (val / 1000000000000).toFixed(2) + "万亿";
  else if (val >= 100000000)
    str = (val / 100000000).toFixed(2) + "亿";
  else if (val >= 10000)
    str = (val / 10000).toFixed(2) + "万";
  else
    str = val.toFixed(0) + "";

  return str;
}

function inTradeTime() {
  var localTime = getLocalTime(8);
  var hour = localTime.getHours();
  var min = localTime.getMinutes();
  var timeNum = hour * 100 + min;
  if ((timeNum >= 915 && timeNum <= 1130) || (timeNum >= 1300 && timeNum <= 1503)) {
    return true;
  }

  return false;
}

function formatDate(date) {
  if (date.length != 8)
    return "";

  return date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
}

module.exports = {
  red: redColor,
  green: greenColor,
  gray: grayColor,
  formatTime: formatTime,
  getLocalTime: getLocalTime,
  getAmount: getAmount,
  getColor: getColor,
  getPrecision: getPrecision,
  getMoney: getMoney,
  inTradeTime: inTradeTime,
  formatDate: formatDate,
  zsArr: ['1A0001', '399001', '399005', '399006', '399300', '399905'],
}
