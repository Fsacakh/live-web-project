<template>
  <div :class="classes" v-click-outside="close" onselectstart="return false">
    <button type="button" class="tree-select-single" @click="open = !open" v-if="selectedItems.length <= 1">
      <span v-if="selectedItems.length === 0">{{placeholder}}</span>
      <span v-if="selectedItems.length === 1">{{selectedItems[0].text}}</span>
    </button>
    <div class="tree-select-multiple" @click="open = !open" v-else>
      <div class="tree-select-tag" v-for="item in selectedItems">
        {{item.text}}
      </div>
    </div>
    <i class="tree-selec-allow" @click="open = !open"></i>
    <div class="tree-select-dropdown">
      <tree :data="data" ref="tree"
            :size="size"
            :showCheckbox="showCheckbox"
            :wholeRow="wholeRow"
            :noDots="noDots"
            :multiple="multiple"
            :allowBatch="allowBatch"
            :textFieldName="textFieldName"
            :valueFieldName="valueFieldName"
            :async="async"
            :loadingText="loadingText"
            @item-click="itemClick"></tree>
    </div>
  </div>
</template>
<script>
  import Tree from './tree.vue'
  export default{
    data () {
      return {
        open: false,
        selectedItems: []
      }
    },
    props: {
      value: null,
      placeholder: {type: String, default: '请选择'},
      data: {type: Array},
      size: {type: String, validator: value => ['large', 'small'].indexOf(value) > -1},
      showCheckbox: {type: Boolean, default: false},
      wholeRow: {type: Boolean, default: false},
      noDots: {type: Boolean, default: false},
      multiple: {type: Boolean, default: false},
      allowBatch: {type: Boolean, default: false},
      textFieldName: {type: String, default: 'text'},
      valueFieldName: {type: String, default: 'value'},
      async: {type: Function},
      loadingText: {type: String, default: 'Loading...'},
      klass: String
    },
    model: {
      prop: 'value',
      event: 'update:value'
    },
    computed: {
      classes () {
        return [
          {'tree-select': true},
          {'tree-select-open': this.open},
          {[this.klass]: !!this.klass}
        ]
      }
    },
    methods: {
      itemClick () {
        this.selectedItems.length = 0
        this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, node => {
          if (node.model.selected) {
            this.selectedItems.push({
              text: node.model[this.textFieldName],
              value: node.model[this.valueFieldName]
            })
          }
        })
        if (this.selectedItems.length === 1) {
          this.$emit('update:value', this.selectedItems[0].value)
        } else if (this.selectedItems.length > 1) {
          this.$emit('update:value', this.selectedItems.map(item => {
            return item.value
          }))
        } else {
          this.$emit('update:value', null)
        }
      },
      close () {
        this.open = false
      }
    },
    components: {
      Tree
    }
  }
</script>
<style lang="sass">
  @import "./sass/_treeselect"
</style>
