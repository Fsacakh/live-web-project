<template>
    <b-button size="sm">
        <div class="text-left">
            <div>
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :data = 'addParams'
                    :show-file-list = 'false'
                    :on-progress = 'loading'
                    :on-success="handleSuccess"
                    :on-error="handleErr"
                    :disabled="disabled"
                    :before-upload="beforeUpload"
                    >
                    {{ buttonName }}
                </el-upload>
            </div>
            
            <!-- <div class="img-name" v-else>
                {{imageName}}
            </div> -->
            <!-- <div class="imgModal" @onMouseOver="showMadelImg">
                <div>1231312</div>
                <img>
            </div> -->
            <div :class="{'cover': proshow}">
                <!-- <el-progress v-if="proshow" :stroke-width="18" :percentage="schedule"></el-progress> -->
                <div class="loading"  v-if="loading2">
                    <div v-loading="loading2" element-loading-text="解析中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="width: 100%"></div>
                </div>
            </div> 
        </div>
    </b-button>
</template>

<script>
import config from 'common/config'
import api from 'common/api'
import Vue from "vue";
import { Upload, Button, Progress, Loading, Message } from "element-ui";
Vue.use(Upload);
Vue.use(Button);
// Vue.use(Progress)
Vue.use(Loading);
export default {
  props: {
    addParams: {
      type: Object,
      default: function() {
        return {};
      }
    },
    buttonName: {
      type: String,
      default: ""
    },
    analysisExcel: {
      type: Function,
      default: function() {}
    },
    url: {
      type: String,
      default: ""
    },
    showBack: {
      type: Object,
      default: function() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theEcho: {
      type: Function,
      default: function() {}
    },
    validate: {
      type: Function,
      default: function() {
        return true;
      }
    },
    onlyImage: {
      type: Boolean,
      default: false
    },
    onlyExcel:{
      type: Boolean,
      default: false
    },
    formatList: {
      type: Array,
      default: () => []
    },
    alertInfo: {
      type: String,
      default: '上传格式不正确'
    }
  },
  data() {
    return {
      showMadel: false,
      imgPath: "",
      showImg: false,
      imageName: "",
      analysisExcelprops: {},
      uploadUrl: config.uploadUrl,
      proshow: false,
      schedule: "",
      loading2: false
    };
  },
  methods: {
    beforeUpload(file) {
      
      let fileSize = Math.round(file.size / 1024 * 100) / 100;
      //新增Excel表格判断
      if(this.onlyExcel){
        const isExcel = file.name.split('.')[1] === 'xlsx';
        if(!isExcel) {
          Message({
            type: 'warning',
            message: '导入文件格式不正确',
          })
          return false;
        }
      }else if(this.onlyImage) {// 保留这里的代码是为了不影响之前用到onlyImage的地方
        const isImage = file.type.split('/')[0] === 'image'
        if(!isImage) {
          Message({
            type: 'warning',
            message: '请上传图片格式的文件',
          })
        }
        //添加图片大小校验
        if(fileSize > 200){
          Message({
            type: 'warning',
            message: '请上传小于200K的图片',
          })
          return false;
        }
        return isImage
      }else if(this.formatList.length) {
        let _name = file.name.split('.'),
            _formatList = new Set(this.formatList)
        if(!_formatList.has(_name[_name.length - 1])) {
          Message({
            type: 'warning',
            message: this.alertInfo,
          })
        }
        return _formatList.has(_name[_name.length - 1])
      }else if(!this.formatList.length) {
        return true
      }
      
    },
    showMadelImg: function() {
      this.showMadel = true;
    },
    loading: function() {
      // this.proshow = true
      for (let i = 0; i < 50; i++) {
        this.schedule = i++;
      }
    },
    analysisExcelpropsAgain(resolve){
      const $this = this;
      $this.analysisExcelprops.continueFlag = true;
      api.analysisExcel
        .methods($this.analysisExcelprops, $this.url)
        .then(res => {          
          if (res.data.code == "success") {            
            Message({
              type: "success",
              message: "上传成功"
            });
            resolve();
          }
        });
    },
    handleSuccess(file, fileList) {
      const $this = this;

      // $this.imageName = fileList.name
      // $this.imgPath = config.serviceId + file.obj[0].filePath
      // $this.showImg = true
      let fileName = fileList.name;
      let filepath = config.serviceId + file.obj[0].filePath;
      for (let i = 50; i < 50; i++) {
        $this.schedule = i++;
      }
      if ($this.url != "") {
        $this.loading2 = true;
        this.analysisExcelprops = this.showBack;
        this.analysisExcelprops.continueFlag = false;
        this.analysisExcelprops.fileName = file.obj[0].fileName;//文件code2018年6月25日新增
        this.analysisExcelprops.fileCode = file.obj[0].fileCode;//文件name2018年6月25日新增
        if (this.validate && this.validate()) {

          api.analysisExcel
            .methods(this.analysisExcelprops, $this.url)
            .then(res => {
              this.proshow = false;
              this.loading2 = false;
              if (res.data.code == "success") {
                $this.analysisExcel(res);
              }
            });
        } else {
          Message({
            type: "error",
            message: "解析参数不全"
          });
          this.loading2 = false;
          this.proshow = false;
        }
      } else {
      this.theEcho(fileName, filepath);
        Message({
          type: "success",
          message: "上传成功"
        });
        this.proshow = false;
      }
    },
    handleErr(file) {
      Message({
        type: "error",
        Message: "上传失败"
      });
    }
  }
};
</script>
<style>
.img-name {
  /* background: red; */
}
.upload {
  /* display: inline */
  /* position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 9999; */
}
.imgModal {
  position: fixed;
  left: 0;
  top: 0;
  height: 50%;
  width: 50%;
  /* background-color: rgba(0,0,0,.5); */
  z-index: 99999;
}
.cover {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.loading > div {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
