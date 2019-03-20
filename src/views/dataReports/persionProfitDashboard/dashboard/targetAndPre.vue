<template>
    <table>
        <tr>
            <td>目标</td>
            <td>{{data.target | tothousand }}</td>
        </tr>
        <tr>
            <td>实际</td>
            <td>{{data.percent | tothousand }}</td>
        </tr>
        <tr>
            <td>排名</td>
            <td>{{data.rank}}/{{data.totalNum}}</td>
        </tr>
    </table>
</template>
<script>
import common from "../common"
export default {
    data () {
        return{}
    },
    props: {
        data:{
            type: Object,
            default: function (){
                return {}
            }
        }
    },
    filters:{
        tothousand(value){
            return common.toThousand(value)
        }
    }
}
</script>
<style lang="scss" scoped>
tr{
    line-height: 25px;
    td:nth-child(1){
        width: 70%;
        position: relative;
        &::before{
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            left: -10px;
            top: 8px;
        }
    }
}
tr:nth-child(1){
    td:nth-child(1){
        &::before{
            background: #C9DFF4;
        }
    }
}
tr:nth-child(2){
    border-bottom: 1px solid #E9F0F5;
    td:nth-child(1){
        &::before{
            background: #1F39DE;
        }
    }
}
</style>


