<template>
<div>
    <div class="block-header clearfix">
        <div class="select pull-left">
            <b-form-select v-model="selectWork" :options="workType" ref="select">
            </b-form-select>
        </div>
        <div class="pull-left textStyle">
            <img src="../img/info.png" alt="">
            <span style="marginLeft: 8px">仅显示已被派工的技师和正在施工的技师</span>
        </div>
    </div>
    <div class="block-content">
        <technician-list :list="list" @itemClick="itemClick"></technician-list>
    </div>
</div>
</template>
<script>
import TechnicianList from './technician-list'
export default {
    components: {
        TechnicianList
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
                {
                    technicianName: '张晓俊',
                    workType: '钣金维修工',
                    img: '/livepro/static/image/userimg.jpg'
                },
                {
                    technicianName: '刘涛',
                    workType: '机电维修工',
                    img: '/livepro/static/image/person1.png'
                },
                {
                    technicianName: '李富贵',
                    workType: '喷漆维修工',
                    img: '/livepro/static/image/person2.png'
                },
                {
                    technicianName: '张顺',
                    workType: '钣金维修工',
                    img: '/livepro/static/image/person3.png'
                },
                {
                    technicianName: '王建国',
                    workType: '机电维修工',
                    img: '/livepro/static/image/person4.png'
                },
                {
                    technicianName: '李子俊',
                    workType: '钣金维修工',
                    img: '/livepro/static/image/person5.png'
                },
                {
                    technicianName: '王强',
                    workType: '喷漆维修工',
                    img: '/livepro/static/image/person6.png'
                },
                {
                    technicianName: '李磊',
                    workType: '钣金维修工',
                    img: '/livepro/static/image/person1.png'
                },
                {
                    technicianName: '李涛',
                    workType: '机电维修工',
                    img: '/livepro/static/image/person2.png'
                },
            ]
       }
    },
    methods: {
        itemClick(item) {
            this.$router.push({
                path: `/clock/technician-tdetail/${item.technicianName}`
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
.textStyle::before {
    content: "";
    width: 20px;
    height: 20px;
    background-image: url('../img/info.png');
    background-size: 100%;
}

.block-content {
    /* padding-top: 50px;
    padding-left: 50px; */
}
</style>
