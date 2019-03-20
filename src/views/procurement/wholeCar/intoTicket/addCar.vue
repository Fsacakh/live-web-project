<template>
	<div>
		<b-card header="车辆基础信息">
			<div class="row">
				<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="车款" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="车款年份" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="生产号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="车架号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="SKU名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="生产日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="底盘号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="发动机号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
			</div>
		</b-card>
		<b-card header="厂家采购和上报信息">
			<div class="row">
				<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="实际MSRP(不含税)" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="运费" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="运费是否计入采购成本" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="采购价格(含税)" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="加配价格(含税)" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="采购税率" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="原厂配置" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="原厂加配" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
			</div>
		</b-card>
		<b-card header="物流信息">
			<div class="row">
				<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="港口名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="关单到店日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="关单号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="厂商禁止销售日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="合格证到店日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="合格证号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="申请允许销售日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="批发日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	
           		<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="批发付款到期日" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="商检单号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="商检单到店日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="申请允许销售日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
	           	<div class="col-md-4 col-lg-4">
                    <b-form-fieldset horizontal label="批发日期" label-text-align="right" :label-cols="4">
                        <b-form-input v-model='addQuery.odd' />
                    </b-form-fieldset>
	           	</div>
			</div>
		</b-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				addQuery:{
					odd:''
				}
			}
		}
	}
</script>

<style>
</style>