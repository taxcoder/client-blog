import path from "path";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

//@ts-ignore
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    build: {
        target: 'es2015'
    },
    css: {
        preprocessorOptions: {
            scss: {
                /**如果引入多个文件，可以使用
                 * '@import "@/assets/scss/globalVariable1.scss";
                 *  @import"@/assets/scss/globalVariable2.scss";'
                 **/
                additionalData: '@import "@/common.scss";',
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "common": path.resolve(__dirname, "src/common"),
            "components": path.resolve(__dirname, "src/components"),
            "styles": path.resolve(__dirname, "src/styles"),
            "plugins": path.resolve(__dirname, "src/plugins"),
            "views": path.resolve(__dirname, "src/views"),
            "layouts": path.resolve(__dirname, "src/layouts"),
            "utils": path.resolve(__dirname, "src/utils"),
            "apis": path.resolve(__dirname, "src/apis"),
            "dirs": path.resolve(__dirname, "src/directives"),
        }
    },
    plugins: [
        vue(),
        legacy({
            targets: ['chrome 52'],
            polyfills: ['es.promise.finally', 'es/map', 'es/set'],
            modernPolyfills: ['es.promise.finally']
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ]
})
