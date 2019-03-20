<template>
    <div>
		<resume></resume>
	   <div class="row mt-3">
	    	<div class="col-md-12 col-lg-12">
	    		<b-form-textarea id="textarea1"
			                     v-model="text"
			                     placeholder="文本输入内容...."
			                     :rows="5"
			                     :max-rows="7">
			    </b-form-textarea>
	    	</div>
	    </div>
	    <div class="row mt-3 mb-3">
	    	<div class="col-md-12 col-lg-12">
	    		<div class="pull-right">
	    			<b-button>重置</b-button>
	    			<b-button variant="primary">确定</b-button>
	    		</div>
	    	</div>
	    </div>
    </div>
</template>
<script>
import resume from'./resume'
export default {
    data() {
        return {
        	text:'',

        }
    },
    components:{
    	resume
    },
    methods: {
        
    }
}
</script>
