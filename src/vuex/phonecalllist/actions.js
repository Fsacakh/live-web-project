import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'
import { Message } from "element-ui";

export const queryPhoneCallList = ({ commit }, params) => {
    api.sales
        .appointment
        .queryPhoneCallList(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.PHONE_CALL_LIST_PAGER, {
                        pager
                    })
                    commit(types.PHONE_CALL_LIST, {
                        list
                    })
                }

            }
        })
}
export const exporPhoneCallList = ({ commit }, params) => {
    api.scPhoneCallList
        .export(params, (res) => {
            let obj = res.data.obj
            if(typeof (obj) === 'string') {
                Message.closeAll();
                Message({
                type: "warning",
                message: "没有数据可以导出"
                });
            }
            let path = res.data.obj.filePath;
            console.log(path)
            if (path !== undefined && path !== null && path.length > 0) {
                window.location.href = common.isDevFile() + path
            }
        }
    )
}
