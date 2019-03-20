export const financeStatus = (state) => {
    let result = ''
    if (state.financeWorkbenchData != {}) {
        let financeStatus = state.financeWorkbenchData.financeStatus
        switch (financeStatus) {
            case -1:
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
    }
    return result
}
