<template>
<div>
    <div class="block-header clearfix">
        <div class="select pull-left">
            <b-form-select v-model="selectWork" :options="workType" ref="select">
            </b-form-select>
        </div>
        <div class="pull-left textStyle">
            <img src="../img/info.png" alt="">
            <span style="marginLeft: 8px">仅显示已被派工的工位和正在施工的工位</span>
        </div>
    </div>
    <div class="block-content">
        <station-list :list="list" @itemClick="itemClick"></station-list>
    </div>
    
</div>
</template>
<script>
import StationList from './station-list'
export default {
    components: {
        StationList
    },
    data() {
       return {
            workType: [
                {
                    text: '机电',
                    value: '0'
                },
                {
                    text: '钣金',
                    value: '1'
                },
                {
                    text: '油漆',
                    value: '2'
                }
            ],
            selectWork: '0',
            list: [
                {stationName: '机电工位', number: 'MO 1'},
                {stationName: '喷漆工位', number: 'MO 2'},
                {stationName: '钣金工位', number: 'MO 3'},
                {stationName: '油漆工位', number: 'MO 4'},
                {stationName: '美容工位', number: 'BO 1'},
                {stationName: '机电工位', number: 'BO 2'},
                {stationName: '钣金工位', number: 'BO 3'},
                {stationName: '喷漆工位', number: 'BO 4'},
            ]
       }
    },
    methods: {
        itemClick(item) {
            this.$router.push({
                path: `/clock/station-tdetail/${item.stationName}`
            })
        }
    }
}
</script>
<style scoped>
.block-header {
    padding-bottom: 10px;
    border-bottom: 3px solid #F2F2F2;
}
.select {
    width: 270px;
    height: 38px;
}
.select select {
    border-radius: 2px;
    border: 1px solid #E9EFF3;
}
.textStyle {
    margin-left: 40px;
    margin-top: 6px;
}

.block-content {
    /* padding-top: 50px;
    padding-left: 50px; */
}
</style>
