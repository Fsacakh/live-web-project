<row>
  <column :md=12>

  ### 使用

  <template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="开始时间" label-text-align="right" :label-cols="4">
                                <date-picker 
                                    v-model="financePro.effectStarttime"  //双向绑定取值
                                    :state="state"       //校验值是否正确状态位
                                    :disabled="created"  //是否禁用状态位
                                >
                                </date-picker>
                            </b-form-fieldset>
                        </div>
                    </div> 
                </b-card>
       </div>  
    </div>  
 </div>    
</template>

<script>
    import DatePicker from '../../components/datepicker/datepicker'
    export default {
        data: function() {
            return {
                state: true,
                financePro: {
                    financeCode: '',
                    financeName: '',
                    orgInfo: '',
                    financeType: '',
                    rateType: '',
                    doType: 1,
                    loanType: '',
                    effectStarttime: '',
                    effectEndtime: ''
                }
            }
        },
        methods: {
            
        },
        components: {
            DatePicker
        }
    }
</script> 
</row>
