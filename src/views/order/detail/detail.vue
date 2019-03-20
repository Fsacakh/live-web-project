<template>
  <div class="animated fadeIn">
      <!-- 订单头 -->
      <order-header></order-header>
      <!-- 整车订单 -->
      <vehicle-order></vehicle-order>
      <!-- 金融报价 -->
      <finance-offer></finance-offer>
      <!-- 保险报价 -->
      <insurance-offer></insurance-offer>
      <!-- 后市场报价 -->
      <aftermarket-offer></aftermarket-offer>
      <!-- 商务政策 -->
      <business-policy></business-policy>
      <!-- 服务费及其他 -->
      <service-fee></service-fee>
      <!-- 支付相关 -->
      <pay-relevant></pay-relevant>
      <!-- 发票相关 -->
      <invoice-relevant></invoice-relevant>
      <!-- 审批履历 -->
      <approve-resume></approve-resume>
  </div>
</template>
<script>
import OrderHeader from './order-header'
import VehicleOrder from './vehicle-order'
import FinanceOffer from './finance-offer'
import InsuranceOffer from'./insurance-offer'
import AftermarketOffer from './aftermarket-offer'
import BusinessPolicy from './business-policy'
import ServiceFee from './service-fee'
import PayRelevant from './pay-relevant'
import InvoiceRelevant from './invoice-relevant'
import ApproveResume from './approve-resume'
export default {
   components: {
       OrderHeader,
       VehicleOrder,
       FinanceOffer,
       InsuranceOffer,
       AftermarketOffer,
       BusinessPolicy,
       ServiceFee,
       PayRelevant,
       InvoiceRelevant,
       ApproveResume
   },
   mounted() {
       
   },
   methods: {
       
   }
}
</script>

