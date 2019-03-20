<template>
<div class="row">
    <div class="col-md-12">
        <b-card>
            <div class="row">
              <!-- 本月展厅客流量 -->
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-8">
                            <b-form-select v-model="flow" :options="flowOptions">
                            </b-form-select>
                        </div>
                        <div class="col-md-4">
                            <b-form-input v-model="getAllObj.total" readonly/>
                        </div>
                    </div>
                </div>
                <!-- 本月进店线索数 -->
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-8">
                            <b-form-select v-model="storeNum" :options="storeNumOptions">
                            </b-form-select>
                        </div>
                        <div class="col-md-4">
                            <b-form-input v-model="leadNums" readonly/>
                        </div>
                    </div>
                </div>
                <!-- 本月新增订单 -->
                <div class="col-md-6 my-center">
                    <div class="row">
                        <div class="col-md-8">
                            <b-form-select v-model="addOrder" :options="addOrderOptions">
                            </b-form-select>
                        </div>
                        <div class="col-md-4">
                            <b-form-input v-model="orderNums" readonly/>
                        </div>
                    </div>
                </div>
                <!-- 当前时间 -->
                <div class="col-md-6 text-right my-center">
                    <strong>{{getToday}}</strong>
                </div>
            </div>
            <!-- 预约和值班 -->
            <div class="row">
                <div class="col-md-12 text-right">
                    <router-link to="/appointment">
                        <b-button size="sm" variant="primary">预约信息</b-button>
                    </router-link>
                    <router-link to="/work">
                        <b-button size="sm" variant="primary">值班排班</b-button>
                    </router-link>
                </div>
            </div>
        </b-card>
    </div>
</div>
</template>
<script>

import config from 'common/config'
import api from 'common/api'
import {mapMutations, mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('receptionist', [
            'getToday',
            'getAllObj'
        ])
    },
    data() {
        return {
            flowOptions: [
                {
                    value: 0,
                    text: '本日展厅客流量'
                }
            ],
            flow: 0,
            storeNumOptions: [
                {
                    value: 0,
                    text: '本日进店线索数'
                }
            ],
            storeNum: 0,
            addOrderOptions: [
                {
                    value: 0,
                    text: '本日新增订单'
                }
            ],
            addOrder: 0,
            leadNums: 0,
            orderNums: 0
        }
    },
    created() {
        this.setToday(this.getDate())
    },
    methods: {
        // 获取当前时间
        getDate() {
            let date = new Date()
            let y = date.getFullYear();
            let m = date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1;
            let d = date.getDate();
            return `${y}-${m}-${d}`
        },
        ...mapMutations({
            setToday: 'receptionist/SET_TODAY'
        })
    },
    watch: {
        getAllObj(val) {
            this.leadNums = 0;
            this.orderNums = 0;
            let leadCodeObj = {};
            for(let i = 0; i < val.list.length; i ++) {
                if(val.list[i].keepFileStatus >= 1 && !leadCodeObj.hasOwnProperty(val.list[i].leadCode)) {
                    this.leadNums ++
                    leadCodeObj[val.list[i].leadCode] = val.list[i].leadCode;
                }
                for(let j = 1; j <= val.list[i].createOrderStatus; j ++) {
                  this.orderNums ++;
                }
            }
        }
    }
}
</script>
<style lang="css">
.my-center {
    padding-top: 12px;
}
</style>

