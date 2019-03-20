import * as types from './mutation-types'
//用来给当前模块的mutation里的方法来命名的 官方上叫事件类型
const mutations = {
  [types.SET_PARAMS](state, {
    params
  }) {
    console.log(params)
    state.params = params
  }, // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名 [types.FINANCE_ADD_FINANCE]
  [types.FINANCE_ADD_FINANCECODE](state, data) {
    // state就是当前这个模块的下 state
    state.financeCode = data;
  },
  [types.PRESERVE_SHOP](state, data) {
    // state就是当前这个模块的下 state
    state.tabType = data.tabType;
    state.istabType = data.istabType
  },
  [types.SET_QUERYPARAMS](state, queryParams) {
    state.queryParams = queryParams;
  },
  [types.FINANCE_SET_SHOPDATA](state, data) {
    state.shopData = JSON.parse(JSON.stringify(data));
  },
  [types.FINANCE_SET_SALESDATA](state, data) {
    state.salesData = JSON.parse(JSON.stringify(data));
  },
  [types.FINANCE_SET_GOVERNMENTDATA](state, data) {
    state.governmentData = data
  },
  [types.FINANCE_SET_SETTABACATIVE](state, data) {
    let array = Object.prototype.toString.call(data) === '[object Array]' ? data : false;
    if (!array) {
      for (var i in state.tabsscope) {
        state.tabsscope[i] = true;
      }
    } else {
      state.tabsscope[data[0]] = data[1];
    }
  },
  [types.GET_DATALIST](state, datalist) {
    state.datalist = datalist
  },
  [types.SETINTERSUBSIDYDATA](state,data){
    state.intersubsidyData = JSON.parse(JSON.stringify(data));
  },
  [types.SETINTEREST](state,data){
    state.interestFlag = data;
  },
  [types.SETPOUNDAGE](state,data){
    state.poundage = data;
  },
  [types.UPDATAFINANCEID](state,data){
    state.updataFinanceId = data
  },
  [types.GET_OBJ](state, obj) {
      state.obj = obj
  },
  [types.ORGANIZE](state) {
    state.organize++
  }, 
}

export default mutations
