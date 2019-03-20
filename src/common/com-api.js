/**
 * Created by NS-5_lwx on 2017/11/09.
 */
import api from './api'
import {Message} from 'element-ui'
import config from 'common/config'
import common from 'common/common'

const parserDate = function (date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
}

export function getType(code, success) {
    const params = {refCode: code}
    api.ref.getDataDictionary(params).then( res => {
        if(res.data.code === 'success' && res.data.obj) {
            let items = res.data.obj.referenceDetailInfos
            if(items) {
                success(items)
            }
        }
    })
}

export function getSequence(code, result) {
    const params = {serviceCode: code}
    api.ordinalInfo.getSequence(params, (res) => {
        if(res.data.code === 'success') {
            result(res.data.obj)
        }
    })
}

export function formatDate(date) {
    if(typeof date === 'string' && date) {
        return parserDate(date)
    }else if(date !== null && typeof date === 'object') {
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? `0${m}` : m;  
        let d = date.getDate();  
        d = d < 10 ? `0${d}` : d;  
        return `${y}-${m}-${d}` 
    }else {
        return ''
    }
}


export function format(date) {
    if(typeof date === 'string' && date) {
        if(date[10] === 'T') {
            let oTime = date.slice(0, 10)
            let dat = new Date(oTime)
            let y = dat.getFullYear();
            let m = dat.getMonth() + 1;
            m = m < 10 ? `0${m}` : m;
            let d = dat.getDate() + 1;
            d = d < 10 ? `0${d}` : d;
            return `${y}-${m}-${d}`
        }else {
            return date.slice(0, 10)
        }
    }else if(typeof date === 'object' && date !=  null) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? `0${m}` : m;
        let d = date.getDate();
        d = d < 10 ? `0${d}` : d;
        return `${y}-${m}-${d}`
    }else {
        return ''
    }
}

export function alertInfo(res, success = () => {}, error = () => {}) {
    if (res.data.code === 'success') {
        success()
        Message({
            type: 'success',
            message: "操作成功"
        });
    } else {
        error(res.data.message)
    }
}

export function hasBtn(url) {
    // let userInfo = JSON.parse(common.getSession('userInfo'))
    // if(!userInfo) {
    //     return false
    // }
    // if(userInfo.hasOwnProperty('menuUrls')) {
    //     const _urlMap = userInfo.menuUrls
    //     return _urlMap.hasOwnProperty(`/api${url}`) 
    // }else {
    //     return false
    // }
    // 为方便测试模块功能 暂时写死 返回true
    return true
}

export function sortChinese(name) {
    return (a, b) => a[name].localeCompare(b[name], 'zh')
}

// 获取数据字典明细
export function getRefDetail(refDetailCode, next) {
    api.ref.getDictionaryDetails({
        refDetailCode: refDetailCode
    }).then((res) => {
        const obj = res.data.obj
        if (res.data.code === 'success') {
            next(obj)
        } 
    })
}

//将后台的json转成jsonTree格式
export function jsonTree(data,config) {
    // 1.声明了变量，拿到传参过来的值，注意这里拿到的是string类型，不是对应的值
    var id = config.id || 'id',
        pid = config.pid || 'pid',
        children = config.children || 'children';
        var idMap = [],
        newIdMap = [],
        jsonTree = [];

    // 2.v[id]==v[“id”]==v.id
    //  idMap数组的下标对应着id为下标的相应json数据a[1]对应着id为1的json数据，以此类推
    data.forEach(function(v){
      idMap[v[id]] = v;
    });

    // 3拿到当前遍历的父元素id
    /* 根据父元素id，判断数组里是否存在这样一条数据
        存在，就判断父元素是否有子元素数组，若没有就添加一个children数组（传参过来的） 
        把当前元素添加父元素的children数组里
        不存在，就直接添加到jsonTree里 */
    data.forEach(function(v){
      var parent = idMap[v[pid]];
      //定义一个newIdMap
      delete v.parent;//删除{v}的parent和id
      //delete v.id;
      if(parent) {
        !parent[children] && (parent[children] = []);
        parent[children].push(v);
      } else {
        jsonTree.push(v);
      }
    });
    return jsonTree;
}