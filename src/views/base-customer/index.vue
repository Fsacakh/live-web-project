<template>
    <div class="background-my-special">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础标签客群" name="first">基础标签客群</el-tab-pane>
            <el-tab-pane label="客群推荐计划定制" name="second">客群推荐计划定制</el-tab-pane>
            <el-tab-pane label="用户删选" name="third">用户删选</el-tab-pane>
        </el-tabs> -->
        <div class="my-need-tabs">
            <span class="my-special-tabs" @click="itemClick('jichu')">
                <i>基础标签客群</i>
                <i>流失预警、待回访等基础客群分类</i>
                <b :class="{'line': judgejichu}"></b>
            </span>
            <span class="my-special-tabs" @click="itemClick('jihua')">
                <i>客群推荐计划定制</i>
                <i>行为、消费、类型、时间维度分类定制</i>
                <b :class="{'line': judgejihua}"></b>
            </span>
            <span class="my-special-tabs" @click="itemClick('shaixuan')">
                <i>用户筛选</i>
                <i>简单维度筛选、批量导入</i>
                <b :class="{'line': judgeshaixuan}"></b>
            </span>
        </div>
        <div class="my-container-tabs">
            <customergroup v-if="judgejichu"></customergroup>
            <customerplan v-if="judgejihua"></customerplan>
            <customerfilter v-if="judgeshaixuan"></customerfilter>
        </div>
    </div>
</template>
<script>
    // import Vue from 'vue'
    // import {Tabs, TabPane} from "element-ui"
    // Vue.use(Tabs)
    // Vue.use(TabPane)
    import customergroup from './tabs/customer-group.vue'
    import customerplan from './tabs/customer-plan.vue'
    import customerfilter from './tabs/customer-filter.vue'
    // import customergroup from './tabs/customer-group.vue'
    export default {
        components: {
            customergroup,
            customerplan,
            customerfilter
        },
        data() {
            return {
                judgejichu: true,
                judgejihua: false,
                judgeshaixuan: false
            }
        },
        methods: {
            itemClick(value) {
                if(value === 'jichu') {
                    this.judgejichu = true
                    this.judgejihua = false
                    this.judgeshaixuan = false
                }else if(value === 'jihua') {
                    this.judgejichu = false
                    this.judgejihua = true
                    this.judgeshaixuan = false
                }else if(value === 'shaixuan') {
                    this.judgejichu = false
                    this.judgejihua = false
                    this.judgeshaixuan = true
                }
            }
        }
    }
</script>
<style>
    .my-need-tabs {
        box-shadow: 1px 1px 5px #ccc;
    }
    .my-special-tabs {
        display: inline-block;
        /* color: yellow; */
        padding: 10px;
        padding-bottom: 0px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
    }
    .my-special-tabs i:first-child {
        display: block;
        height: 28px;
        font-size: 20px;
        color: #333333;
    }
    .my-special-tabs i {
        font-style: normal;
        height: 20px;
        font-size: 14px;
        color: #97A8BE;
    }
    .my-special-tabs b {
        display: block;
        width: 65%;
        margin: 15px auto 0px;
        height: 4px;
        background-color: #fff;
    }
    .my-special-tabs .line {
        background-color: #587EB9;
    }
    .background-my-special {
        background-color: #FFFFFF;
    }
</style>
