import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()

import './style.css'
import App from '@/App.vue'
import { createApp } from 'vue'
import '@/assets/font/fonts.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
