let dateSlice = value => {
    if (!value) return ''
    value = value.toString()
    return value.slice(0, 10)
}

let dateRemoveMs = value => {
    if (!value) return ''
    value = value.toString()
    return value.slice(0, 19)
}
//扩大100倍，向下取整
let MathFloor = value => {
	if(value == 'Infinity')return '*';
    if (!value) return 0;
    value = Math.floor(value*100);
    return value || 0;
}

//扩大100倍，四舍五入
let fixed = value => {
    if(value == 'Infinity')return '*';
    if (!value) return 0;
    value = (value*100).toFixed(0);
    return value || 0;
}

export { dateSlice,dateRemoveMs, MathFloor, fixed}