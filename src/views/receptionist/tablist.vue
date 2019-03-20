<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <b-tabs pills v-model="index">
                    <b-tab title="本店当日进店接待">
                        <all-list ref="all"></all-list>                        
                    </b-tab>
                    <b-tab title="个人当日进店接待">
                        <sc-list @remove="remove"></sc-list>                        
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>
<script>

import AllList from './allList'
import ScList from './scList'
import {mapGetters} from 'vuex'
export default {
    components: {
        AllList,
        ScList
    },
    data() {
        return {
            index: 0
        }
    },
    computed: {
        ...mapGetters('receptionist', [
            'getSeeHistory'
        ])
    },
    methods: {
        queryAllList() {
            this.$refs.all.query()
        },
        remove() {
            this.$emit('tabRemove')
        }
    },
    watch: {
        getSeeHistory(val) {
            this.index = 1
        },
        index(val) {
            if(val === 0) {
                this.queryAllList()
            }
        }
    }
}
</script>
<style>

</style>


