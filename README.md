## 以Vue3+Vite+Ts+Pinia组合的高效开发套件

上面已提到Vite基于Ts语法，并且对Vue3天然的支持，加上尤大主推的[Pinia](https://pinia.vuejs.org/)作为vuex的最佳替代品。此套组合或成为22年Vue开发的最佳选择。我建个了[Vue3+Vite+Pinia的基础模板](https://github.com/MaleWeb/vue3-vite-ts) 供大家参考，后续也会加入一些工具包(自封装的)。这里只是基础，根据自己项目需求可以增加 Volar / Vue Router /   Vue Devtools / [VueUse](https://vueuse.org/) / Element Plus / NutUI。

我们团队是在21年3月份就开始使用Vue3开发项目了，也是第一批使用vite构建项目的。无线端业务最高峰值`PV30万+`，整体项目运行稳定，比较多的还是安卓端兼容问题(历史问题了)。此套组合整体的优势：

- 面向未来技术栈，不需要维护复杂的依赖升级问题
- 拥抱更多新特性，类似SFC等
- 提高构建效率-翻倍的
- .....

### 工具包分享

另外分享一下我们团队使用的技术包，可以大大团队提升研发效率

- [pnpm](https://pnpm.io/zh/motivation) 节省你的磁盘空间，让依赖包也能统一管理，按需更新，老板再也不用担心我的C盘臃肿了

  ![image-20220110125758056](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125758056.png)

- [tailwindcss](https://tailwindcss.com/)，艾玛香的一塌糊涂，一行css不写，3分钟出一个页面。不适合初中级前端，建议还是先踏实学基础再用框架。

  ![tailwindcss-1](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-1.gif)

  ![tailwindcss-2](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-2.gif)

- [Vue I18n](https://vue-i18n.intlify.dev/)  是 Vue.js 的国际化插件，如果你想做开源框架，国际化首选插件。

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO优化，这个项目有点意思，大家可以玩玩这个方案，之前我都是通过服务端渲染搞SEO，后来了解到这个可以直接在Vue3的服务器上生成。

- [Vitest](https://github.com/vitest-dev/vitest),基于Vite的单元测试工具，目前迭代比较快，尤大金牌赞助。可以持续关注，不建议使用在小项目中。

  ![image-20220110125605172](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125605172.png)
