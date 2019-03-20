// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import * as filters from './common/filters.js'
import common from './common/common'
import 'element-ui/lib/theme-default/index.css'
import "./assets/iocnfont/iconfont.css"
import "./assets/css/themes/default.scss"
import './assets/css/loading.css'

const env = process.env.NODE_ENV

Vue.use(BootstrapVue)

import api from 'common/api'

if (env === 'development') {
    Vue.config.debug = true
    Vue.config.devtools = true
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.filter('switchIsPercent', function (isPercent, value) {
    if (isPercent === 0) {
        return value
    } else if (isPercent === 1) {
        return parseFloat(value * 100).toFixed(2) + '%'
    } else {
        return ''
    }
})

Vue.filter('switchDate', function (time) {
    return common.eleTimeFormat(time)
})

Vue.filter('formatDate', function (time) {
    if (time != null && time != '') {
        return common.eleTimeFormatim2(time)
    } else {
        return ''
    }
})

Vue.filter('switchDateToMinutes', function (time) {
    if (time != null && time != '') {
        return common.switchTimeToMinutes(time)
    } else {
        return ''
    }
})

Vue.filter('switchInsuranceStatus', function ([status, syncByCode]) {
    let result = ''
    switch (status) {
        case 0:
            result = '待报价'; break;
        case 1:
            result = '销售顾问报价'; break;
        case 2:
            if (syncByCode == null) {
                result = '销售顾问报价';
                break;
            }
            result = '保险专员报价'; break;
        case 3:
            result = '保险战败'; break;
    }
    return result
})

Vue.filter('switchFinanceStatus', function (status) {
    let result = ''
    switch (status) {
        case null:
            result = '全部'; break;
        case 1:
            result = '待协助'; break;
        case 2:
            result = '销售顾问报价'; break;
        case 3:
            result = 'SC准战败'; break;
        case 4:
            result = '金融专员报价'; break;
        case 5:
            result = '金融战败'; break;
        case 6:
            result = '已完成'; break;
        case 7:
            result = '已作废'; break;
    }
    return result
})

Vue.filter('switchOrderStatus', function (status) {
    let result = ''
    switch (status) {
        case 0:
            result = '草稿'; break;
        case 1:
            result = '已确认'; break;
        case -1:
            result = '作废'; break;
    }
    return result
})

Vue.filter('switchApplyType', function (status) {
    let result = ''
    switch (status) {
        case 1:
            result = '批增'; break;
        case 2:
            result = '批减'; break;
        case 3:
            result = '出单成功'; break;
        case -1:
            result = '批退'; break;
    }
    return result
})

Vue.filter('carName', function (item) {
    return (item.factoryName == null ? '' : item.factoryName) + ' ' + (item.brandName == null ? '' : item.brandName) + ' ' + (item.seriesName == null ? '' : item.seriesName) + ' ' + (item.modelName == null ? '' : item.modelName) + ' ' + (item.displayName == null ? '' : item.displayName)
})

Vue.filter('toFixed', function (val, num) {
    if (!val && val != 0) {
        return ''
    } else {
        return Number(val).toFixed(num)
    }
})

Vue.filter('numTokilo', function (num) {
    if (num && num > 1000) {
        return Number(num / 1000).toFixed() + "K";
    }
    return num
})

api.toLogin.getLoginInfo({}).then(res => {
    // 拿用户权限信息
    let userInfo = res.data.obj
    api.getUserAvailableInfo(msg => {
        if (msg.data.code === 'success') {
            userInfo.userAvailableInfo = msg.data.obj
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
            // 拿是否显示厂家标志位
            let params = { refDetailCode: 'factoryFlag' }
            api.ref.getDictionaryDetails(params).then(res => {
                if (res.data.code === 'success') {
                    let refDetailValue = res.data.obj.refDetailValue
                    sessionStorage.setItem('showFactory', refDetailValue)
                    /* eslint-disable no-new */
                    new Vue({
                        el: '#app',
                        store,
                        router,
                        render: h => h(App)
                    })
                }
            })
        }
    })
})
