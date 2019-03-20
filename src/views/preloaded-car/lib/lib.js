export default {
    filtersMsrp(actualMSRPInclusiveTaxValue, preinstalledTotalPrice){
        let taxValue = actualMSRPInclusiveTaxValue === null ? 0 : actualMSRPInclusiveTaxValue,
            totalPrice = preinstalledTotalPrice === null ? 0 : preinstalledTotalPrice;
        return this.priceFormat((taxValue + totalPrice).toFixed(2));
    },
    //价格千分位处理
    priceFormat(val){
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        let str = val.toString();
        let integerNum = str.substring(0, str.indexOf('.')); //整数部分
        let decimalsNum = str.substring(str.indexOf('.'), str.length);
        integerNum = integerNum.replace(re, ",");
        return integerNum + decimalsNum;
    },
    //判断数据是否重复，arr1新数据, arr2旧数据
    unique(arr1, arr2) {
        let newArr = '';
        arr1.forEach(v => {
            arr2.forEach(j => {
                if(v.skuCode == j.skuCode) {
                    newArr += v.skuCode + ',';
                }
            })
        })
        return newArr;
    }
}