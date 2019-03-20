import api from '../../common/api'
import common from '../../common/common'
export const exportCarModelExl = ({ commit }, params) => {
    api.dataReport
        .carInfoWriteExcel(params, (res) => {
            let path = res.data.obj;
            console.log(res);
            if (path !== undefined && path !== null && path.length > 0) {
                window.location.href = common.isDevFile() + path
            }
        }
    )
}