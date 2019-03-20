import {
    Message
} from 'element-ui'
export default {
    isdev: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '/cxb/api' : '/api';
    },
    isweb: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/web';
    },
    isDevFile: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '/file' : '';
    },
    isDevTemplate: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '/templateFile' : '';
    },
    islivePro: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/livepro';
    },
    isliveCs: function (env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/livecs';
    },
    isWebNative: function () {
       return false
    },
    isliveProNative: function() {
        return true
    },
    isliveCsNative: function() {
        return false
    },
    env: function () {
        return process.env.NODE_ENV
    },
    getUploadUrl(){
        const origin = window.location.origin;
        var env = process.env.NODE_ENV;
        return env === 'development' ? 'http://dev.iris.com' : origin;
    },
    /* 设置cookie函数 */
    setCookie: (key, value, day) => {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + escape(value) + ';expires=' + date;
    },
    /* 获取cookie函数 */
    getCookie: (key) => {
        var coo = unescape(document.cookie); //解码
        var arr1 = coo.split('; '); //第一次分解后是数组
        for (var i = 0; i < arr1.length; i++) { //第二次循环拆分数组
            var arr2 = arr1[i].split('=');
            if (arr2[0] == key) {
                return arr2[1];
            }
        }
    },
    parseData: function (data) {
        var _data;
        if (!data) return data;
        try {
            _data = JSON.parse(data);
        } catch (e) {
            _data = data;
        }
        return _data;
    },
    /* 删除cookie */
    removeCookie: (key) => {
        setCookie(key, '', -1);
    },
    /* 获取session storage**/
    getSession: (key) => {
        return sessionStorage.getItem(key)
    },
    /* 设置session storage值**/
    setSession: (key, value) => {
        sessionStorage.setItem(key, value)
    },
    /* 清空session storage 数据项**/
    removeSessionItem: (key) => {
        sessionStorage.removeItem(key)
    },
    /**清空session storage**/
    clearSession: () => {
        sessionStorage.clear()
    },
    alertInfo(type, message) {
        var obj = {
            'error': '内容尚未填写完整',
            'warning': '操作失败',
            'success': "操作成功",
            'info': message
        };
        Message({
            message: obj[type],
            type: type
        })
    },
    protocol: function () {
        return window.location.protocol + '//';
    },
    // 验证是否是11位数字
    isTel: function (value) {
        if (value.length > 0) {
            if (/^.{11}$/.test(value)) {
                // 11 位判断
                return /^\d{11}$/.test(value)
            } else {
                return false
            }
        } else {
            return true
        }
    },
    //字母排序 wang
    by: function (name, minor) {
        return function (o, p) {
            var a, b;
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else {
                thro("error");
            }
        }
    },
    //时间
    eleTimeFormat: function (str) {
        if (!str) return '';
        var obj = new Date(str),
            y = obj.getFullYear(),
            m = obj.getMonth() + 1,
            d = obj.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;

        return y + '-' + m + '-' + d;
    },
    // 格式化element时间的组件  转成 YYYY-MM-DD格式的
    formattingTime(arg) {
        let judge = Array.isArray(arg)
        if (judge) {
            let startDate = new Date(arg[0])
            let endDate = new Date(arg[1])
            let startYear = startDate.getFullYear()
            let startMonth = startDate.getMonth() + 1
            let startDay = startDate.getDate()

            let endYear = endDate.getFullYear()
            let endMonth = endDate.getMonth() + 1
            let endDay = endDate.getDate()

            let startTime = startYear + '-' + (startMonth > 9 ? startMonth : ('0' + startMonth)) + '-' + (startDay > 9 ? startDay : ('0' + startDay))
            let endTime = endYear + '-' + (endMonth > 9 ? endMonth : ('0' + endMonth)) + '-' + (endDay > 9 ? endDay : ('0' + endDay))
            return {
                startTime,
                endTime
            }
        } else {
            return
        }
    },
    eleTimeFormatim2: function (str) {
        //if(typeof str != 'object')return;
        var obj = new Date(str),
            y = obj.getFullYear(),
            m = obj.getMonth() + 1,
            d = obj.getDate(),
            h = obj.getHours(),
            min = obj.getMinutes(),
            sec = obj.getSeconds();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec;
    },
    switchTimeToMinutes: function (str) {
        var obj = parseFloat(str);
        var h = parseInt(obj / (60 * 60 * 1000));
        var min = parseInt((obj - h * 60 * 60 * 1000) / (60 * 1000));
        var sec = parseInt((obj - h * 60 * 60 * 1000 - min * 60 * 1000) / 1000);
        h = h < 10 ? '0' + h : h;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        return h + ':' + min + ':' + sec;
    },
    // 浮点型小数放大处理问题
    dealNumberWithPoint: function (num1, num2) {
        // debugger
        let tempMax = (num1 - 0) + ''
        let arrMax = tempMax.split('.')
        let maxLain
        if (arrMax.length === 1) {
            maxLain = (arrMax.join('') - 0) * 100
        } else {
            let maxAgain = arrMax[1].split('')
            if (maxAgain.length === 1) {
                maxAgain.push('0')
            }
            maxAgain.splice(2, 0, '.')
            maxLain = (arrMax[0] + maxAgain.join('')) - 0
        }
        if (num2) {
            maxLain = maxLain.toFixed(num2)
        }
        return maxLain
    },
    // 浮点型小数缩小处理问题
    dealNumberWithSmall: function (num1, num2) {
        let tempMin = (num1 - 0) + ''
        let minMain = tempMin.split('.')
        let arrOne = ['0', '.']
        let arrTwo = ['0', '.', '0']
        let minArr = minMain[0].split('')
        if (minMain.length === 1) {
            if (minArr.length > 2) {
                minArr.splice(minArr.length - 2, 0, '.')
            } else if (minArr.length === 2) {
                minArr = arrOne.concat(...minArr)
            } else {
                minArr = arrTwo.concat(...minArr)
            }
        } else {
            if (minArr.length > 2) {
                minArr.splice(minArr.length - 3, 0, '.')
                minArr = minArr.concat(minMain[1])
            } else if (minArr.length === 2) {
                minArr = arrOne.concat(...minArr).concat(minMain[1])
            } else {
                minArr = arrTwo.concat(...minArr).concat(minMain[1])
            }
        }
        let importValue = minArr.join('') - 0
        if (num2) {
            importValue = importValue.toFixed(num2)
        }
        return importValue
    },
    getOrigin() {
        return window.location.origin
    },
    filterIsPercent(isPercent, value) {
        if (isPercent == 1) {
            return (value * 100).toFixed(2)
        } else {
            return value
        }
    },
    //数值转化为千分号
	thousandBitSeparator(num) {
	    return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
	        return $1 + ",";
	     }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
	         return $1 + ",";
	     }));
     },
     //千分位(点隔开))
    MillenniumRepresentation(value){
            var list = new String(Math.round(value)).split('').reverse();
            for(var i = 0; i < list.length; i++){
                if(i % 4 == 3){
                    list.splice(i, 0, '.');
                }
            }
            return list.reverse().join('');
            },
    //获取年份的天数
    getYearDays(y) {
        let days = 0;
        for (var i = 1; i <= 12; i++) {
            if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                days += 31;
            }
            if (i == 2 || i == 4 || i == 6 || i == 9 || i == 11) {
                days += 30;
            }
        }
        //判断是否为闰年，如果月份大于2并且为闰年，总天数-1，否则-2
        if (y % 400 == 0 || y % 4 == 0 && y % 100 != 0) days -= 1;
        else days -= 2;
        return days
    },
    //获取月份的天数
    getMonthDays() {
        var d = new Date();
        var days = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        return days.getDate();
    },
    //小数转化为百分比
    toPercent(point){
        if(isNaN(point)){
            return point
        }
        var str=Number(point*100).toFixed(0);
        str+="%";
        return str;
    },
    //获取上个月月份
    getPreMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        t2 = t2.slice(0,7)
        return t2;
    }
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }

    return fmt
}
