<template>
    <div class="fixed-table-pagination clearfix" style="display: block;" v-if="totalPages >= 1 && totalResult >= 1 && pageSize >= 1 && totalResult <= totalPages*pageSize">
        <div class="pull-right pagination margin-right-10">
            <b-pagination v-model="pageNum" 
                          size="md" 
                          :limit="pagination.limit"
                          :total-rows="totalResult" 
                          :per-page="pageSize"
                          :hide-goto-end-buttons="pagination.hidegotoendbuttons"
                          :prev-text="pagination.prevText" 
                          :next-text="pagination.nextText"
                          :first-text="pagination.firstText"
                          @change="pageChange">
            </b-pagination> 
        </div>
        <div class="pull-right mt-2 mr-2">
            <div class="pagination">
               <span class="pagination-info">第 {{ pageNum }} 页/共 {{ totalPages? totalPages : 1 }} 页</span>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                pagination: {
                    limit: 5,
                    prevText: '&lsaquo;',
                    nextText: '&rsaquo;',
                    firstText: '&laquo;',
                    lastText: '&raquo;',
                    hidegotoendbuttons: false
                },
                pageNum: this.pageNo
            }
        },
        props: {
            pageNo: {
                type: Number,
                validator: function (value) {
                    return value > 0
                },
                default: 1
            },
            pageSize: {
                type: Number,
                validator: function (value) {
                    return value > 0
                },
                default: 10
            },
            totalResult: {
                type: Number,
                default: 0
            },
            totalPages: {
                type: Number,
                default: 0
            }
        },
        methods: {
           pageChange: function(num) {
              this.$emit('page-change', num)
           }  
        },
        watch: {
            pageNo: {
                handler(val) {
                    this.pageNum = val 
                }
            }
        },
        components: {
        
        }
    }
</script>