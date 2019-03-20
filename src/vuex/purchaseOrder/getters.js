export const getWareHousesPageStart = (state) => {
    let pageNo = state.wareHousesPager.pageNo + 1
    return pageNo
}

export const getSuppliersPageStart = (state) => {
    let pageNo = state.suppliersPager.pageNo + 1
    return pageNo
}

export const getStoresPageStart = (state) => {
    let pageNo = state.storesPager.pageNo + 1
    return pageNo
}

export const isOnlyStore = (state) => {
    return (parseInt(state.availableType) == 0)
}