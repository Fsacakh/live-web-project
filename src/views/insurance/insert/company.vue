<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="主档信息">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="保险公司 *" :label-cols="4" class="text-right">
                            <b-form-input v-model="coName" :readonly="isReadonly" maxlength="30" :state="coState" placeholder="保险公司名称最多30个字符" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="保险公司类型 *" :label-cols="4" class="text-right">
                            <b-form-select v-model="insurance.coType" :options="typeOptions" :state="typeState" :disabled="isReadonly">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <router-link to="/insurance/query">
                            <b-button type="reset" size="sm">取消</b-button>
                        </router-link>
                        <b-button size="sm" variant="primary" @click="insert('创建')" v-show="btnInsert">创建</b-button>
                        <b-button size="sm" variant="warning" @click="insert('修改')" v-show="btnUpdata">修改</b-button>
                        <b-button size="sm" variant="primary" @click="insert('确定')" v-show="btnSure">确定</b-button>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>

import { Message } from 'element-ui'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import config from 'common/config'
import api from 'common/api'
import common from 'common/common'
import {getType} from 'common/com-api'
export default {
    data() {
        return {
            typeOptions: [],
            coName: '',
            insurance: {
                coCode: '',
                coName: '',
                coType: '',
                companyAddInfoVo: []
            },
            buttonText: '',
            obj: {},
            coState: null,
            typeState: null
        }
    },
    computed: {
        isReadonly() {
            if (this.isUpdata) {
                if (this.buttonText === '确定') {
                    return true
                } else if (this.buttonText === '修改') {
                    return false
                }
                return true
            } else {
                if (this.buttonText === '创建' || this.buttonText === '确定') {
                    return true
                } else if (this.buttonText === '修改') {
                    return false
                }
                return false
            }
        },
        btnInsert() {
            if (!this.isUpdata) {
                if (this.buttonText === '创建' || this.buttonText === '修改' || this.buttonText === '确定') {
                    return false
                }
                return true
            }
        },
        btnUpdata() {
            if (this.isUpdata) {
                if (this.buttonText === '确定') {
                    return true
                } else if (this.buttonText === '修改') {
                    return false
                }
                return true
            } else {
                if (this.buttonText === '创建' || this.buttonText === '确定') {
                    return true
                } else if (this.buttonText === '修改') {
                    return false
                }
            }
        },
        btnSure() {
            if (this.buttonText === '修改') {
                return true
            }
        },
        ...mapGetters('insurance', [
            'isUpdata',
            'coCode'
        ])
    },
    created() {
        getType(config.insurance.companyType, (items) => {
            items.forEach((item) => {
              let data = {
                  text: item.refDetailName,
                  value: item.refDetailCode
              }
              this.typeOptions.push(data)
            })
        })
        this._getCoCode()
    },
    mounted() {
        if (this.$route.params.id) {
            let _coCode = this.$route.params.id;
            this.getQuery({ coCode: _coCode }, res => {
                this.obj = res;
                this.coName = res.coName;
                this.insurance.coType = res.coType;
            })
        }
    },
    methods: {
        insert(e) {
            if(this.coName.length > 30) {
                this.coState = false;
                return;
            }else {
                this.coState = null;
            }
            if (e === '创建') {
                if (!this.insurance.coName || !this.insurance.coType) {
                    if(!this.insurance.coName) {
                        this.coState = false
                        return
                    }else if(!this.insurance.coType) {
                        this.typeState = false
                        return
                    }
                } else {
                    this.insurance.coCode = this.coCode;
                    let params = this.insurance;
                    this.insertOrUpdata(params)
                }
            } else if (e === '修改') {
                this.buttonText = '修改';
            } else {
                if (!this.insurance.coName || !this.insurance.coType) {
                    if(!this.insurance.coName) {
                        this.coState = false
                        return
                    }else if(!this.insurance.coType) {
                        this.typeState = null
                        return
                    }
                } else {
                    if (this.isUpdata) {
                        this.insurance.coCode = this.$route.params.id;
                        this.insurance.id = this.obj.id;
                        this.insertOrUpdata(this.insurance)
                        return
                    }
                    this.insurance.coCode = this.coCode;
                    this.getQuery({ coCode: this.coCode }, res => {
                        this.insurance.id = res.id;
                        let params = this.insurance;
                        this.insertOrUpdata(params)
                    })
                }
                this.buttonText = '确定';
            }
        },
        // 查询  id  => 后台用来判断是新增还是修改
        getQuery(params, callback) {
            api.insurance.queryByCocode(params).then(res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    callback(obj)
                }
            })
        },
        // 新增修改
        insertOrUpdata(params) {
            api.insurance.insertOrUpdata(params).then(res => {
                if (res.data.code === 'success') {
                    common.alertInfo('success')
                    this.buttonText = '创建';
                    this.typeState = null
                    this.coState = null
                    this.getInsertOver(true)
                } else {
                    common.alertInfo('warning')
                }
            })
        },
        // 获取保险公司编码
        _getCoCode() {
            const params = { serviceCode: config.insurance.getCoCode };
            this.getCoCode(params)
        },
        ...mapActions({
            getCoCode: 'insurance/getCoCode'
        }),
        ...mapMutations({
            getInsertOver: 'insurance/GET_INSERT_OVER'
        })
    },
    watch: {
        coName(val) {
            if(val.length <= 30) {
                this.coState = null;
            }
            this.insurance.coName = this.coName;
        }
    }
}
</script>
<style>

</style>

