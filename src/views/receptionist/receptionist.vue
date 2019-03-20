<template>
    <div>
        <today-info></today-info>
        <wait @allListChange="allListChange" ref="startReception"></wait>
        <tablist ref="tab" @tabRemove="tabRemove" ></tablist>
    </div>
</template>
<script>
import TodayInfo from './todayInfo'
import Wait from './wait'
import Tablist from './tablist'
import {mapActions} from 'vuex'
export default {
    components: {
        TodayInfo,
        Wait,
        Tablist
    },
    mounted() {
        this.getUserAbleInfo()
    },
    methods: {
        allListChange() {
            this.$refs.tab.queryAllList()
        },
        tabRemove() {
            this.$refs.startReception.getWorkSc()
        },
        ...mapActions({
            getUserAbleInfo: 'receptionist/getUserAbleInfo'
        })
    }
}
</script>