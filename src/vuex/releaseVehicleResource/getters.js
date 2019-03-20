export const canEditCarShareInfo = (state) => {
    return (state.carShareInfoData.id != undefined && state.carShareInfoData.id != null && state.carShareInfoData.id != '')
}