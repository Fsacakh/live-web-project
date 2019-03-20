export const queryParams = state => state.queryParams

export const obj = state => state.obj

export const isServiceChargeMapEmpty = (state) => {
    return (Object.keys(state.serviceChargeMap).length === 0)
}

export const isInterSubsidyMapEmpty = (state) => {
    return (Object.keys(state.interSubsidyMap).length === 0)
}
