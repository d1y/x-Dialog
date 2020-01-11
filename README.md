# x-Dialog

> fork by https://github.com/tomas/dialog

用`nodejs`调用原生弹窗

# 依赖

`mac`下使用了`applescript`来编写, `linux`下采用`zenity`

```bash
# debian
sudo apt install zenity
# mac
brew install zenity
```

![test.gif](https://i.loli.net/2020/01/11/qs3pCUZRnbeVdvB.gif)

# 使用

```js
const Dialog = require('x-dialog')

const wow = new Dialog.default
wow.sayDialog('你好世界')
wow.sayInput('个个都是人才')
```

更多接口请看[这里](./examples/index.js)