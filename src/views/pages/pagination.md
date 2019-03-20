<row>
<column :md=12>

### 使用

<pagination class="pull-right" 
     @page-change="pageChange" // 分页点击事件
     :page-no="pager.page_no" 
     :page-size="pager.page_size" 
     :total-result="pager.totalResult" 
     :total-pages="pager.totalPages">
</pagination>

<script>

  import  pagination from '../../components/pagination/pagination'
  
  export default {
    data () {
      return {
         pager: {
             page_no: 1, // 当前第几页
             page_size: 15, // 每页多少条数据
             totalResult: 100, // 共有多少条数据
             totalPages: 7 // 共有多少页数据
         }
      }
    },
    methods: {
        pageChange: function(num) { //分页点击回调(num: 第几页)
           
        } 
    },
    components: {
        pagination
    }
  }
</script>

</column>
</row>
