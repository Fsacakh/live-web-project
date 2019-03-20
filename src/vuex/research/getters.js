export const disposeTaskStatus = (state) => {
    let statusList = JSON.parse(JSON.stringify(state.taskStatus))
    statusList.splice(0, 1)
    return statusList
}

export const failReasonList = (state) => {
    let list = JSON.parse(JSON.stringify(state.failReason))
        list.splice(0, 1)
    return list
}

export const queryParams = state => state.queryParams