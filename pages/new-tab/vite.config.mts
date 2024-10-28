import { resolve } from "node:path";
import { withPageConfig } from "@extension/vite-config";
import viteCompression from "vite-plugin-compression";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");

export default withPageConfig({
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  publicDir: resolve(rootDir, "public"),
  build: {
    outDir: resolve(rootDir, "..", "..", "dist", "new-tab"),
    sourcemap: false,
    minify: 'terser',
    assetsInlineLimit: 1024 * 20, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
    emptyOutDir: false, //Vite 会在构建时清空该目录
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
      format: {
        comments: false, // 删除注释
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]', //静态文件输出的文件夹名称
        chunkFileNames: 'js/[name]-[hash].js', //chunk包输出的文件夹名称
        entryFileNames: 'js/[name]-[hash].js', //入口文件输出的文件夹名称
        compact: true,
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString(); // 拆分多个vendors
          }
        },
      },
    },
  },
  plugins: [
    // 压缩
    viteCompression({
      verbose: true,
      disable: false,
      // 体积大于这个数被压缩,单位b,这里是 5 k,因为是移动端体积尽可能的小
      threshold: 1024 * 2,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],

});
