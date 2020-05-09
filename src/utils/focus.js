import Vue from 'vue'

// v-focus: 自动获取焦点
Vue.directive('focus', {
  inserted(el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
