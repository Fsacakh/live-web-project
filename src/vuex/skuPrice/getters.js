export const getBrandsPageStart = (state) => {
    let pageNo = state.skuBrandPager.pageNo + 1
    return pageNo
}