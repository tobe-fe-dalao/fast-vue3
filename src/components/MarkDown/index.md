```shell
# 安装plop
pnpm add plop
```
根目录创建`plopfile.ts`
```typescript
import { NodePlopAPI } from 'plop';
export default function (plop: NodePlopAPI) {
    plop.setWelcomeMessage('请选择需要创建的模式：')
    plop.setGenerator('page', require('./plop-tpls/page/prompt'))
    plop.setGenerator('component', require('./plop-tpls/component/prompt'))
    plop.setGenerator('store', require('./plop-tpls/store/prompt'))
}
```
在根目录下创建`plop-tpls/page`文件夹，并创建`index.hbs`和`prompt.js`
```javascript
// index.hbs 一种模板文件
<template>
    <div>
        <!-- Your content -->
    </div>
</template>

<script setup name="{{ properCase componentName }}">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
</script>

<style lang="less" scoped>

</style>
```