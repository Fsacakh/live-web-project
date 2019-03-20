export default {
    millisecondToDate(time) {
        if (null != time && "" != time) {
            if (time <= 60) {
                time = parseInt(time) + '秒'
            }
            else if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + "分" + parseInt(time % 60.0)+ '秒';
            }
            else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + "时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分";
            }
        }
        return time;
    },
    // 小数转百分比
    toPercent(point){
        var str=Number(point*100).toFixed(0);
        str+="%";
        return str;
    },
    // 四舍五入
    roRound(num){
        return Math.round(num)
    },
    // 数据过大用k表示
    toThousand(val){
        var value = 0;
        (Number(val) < 10000 || Number(val) > -10000) &&  (value = (Number(val).toFixed()));
        (Number(val) >= 10000 || Number(val) <= -10000) && (value = (Number(val) / 1000).toFixed() + 'k');
        return value
    }
}