export const getWareHousesPageStart = (state) => {
    let pageNo = state.wareHousesPager.pageNo + 1
    return pageNo
}