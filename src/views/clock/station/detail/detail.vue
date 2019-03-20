<template>
<div class="animated fadeIn" style="marginBottom: 20px">
    <div class="row">
        <div class="col-md-12 clearfix">
            <div class="left-box pull-left">
                <left-station></left-station>
            </div>
            <div class="td-top pull-left" style="width: calc(100% - 210px)">
                <div class="task-box">
                    <div class="title">当前任务</div>
                    <car-info-list :list="toDayList"></car-info-list>
                </div>

                <main-list></main-list>  
            </div>
        </div>
    </div>
    
</div>
</template>
<script>
import LeftStation from './left-station'
import CarInfoList from 'views/afterSaleMainBusiness/resource-utilization/carTab/car-info-list'
import MainList from '../../technician/detail/main-list'
export default {
    components: {
        CarInfoList,
        MainList,
        LeftStation
    },
    data() {
        return {
            toDayList: [
                {code: '123456789012', carId: '沪A1213', name: '约定交车', overTime: '2018/02/29 00:00', waitTime: '010:00', bg: 'success'},
                {code: '123456789012', carId: '沪A1213', name: '约定交车', overTime: '2018/02/29 00:00', waitTime: '010:00', bg: 'success'},
                {code: '123456789012', carId: '沪A1213', name: '约定交车', overTime: '2018/02/29 00:00', waitTime: '010:00', bg: 'warnning'},
                {code: '123456789012', carId: '沪A1213', name: '约定交车', overTime: '2018/02/29 00:00', waitTime: '010:00', bg: 'danger'},
            ],
        }
    }
}
</script>
<style scoped>
.td-top {
    margin-bottom: 30px;
}

.left-box {
    width: 200px;
    height: 100%;
    background-color: #fff;
    margin-right: 10px;
    border-radius: 4px;
}

.task-box {
    margin-bottom: 30px;
    padding: 12px 30px;
    background-color: #fff;
    border-radius: 4px;
}
.task-box .title {
    font-size: 22px;
    color: #333333;
    margin-bottom: 10px;
}

</style>
