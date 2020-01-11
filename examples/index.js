const Dialog = require('../dist')

const wow = new Dialog.default

/*
** 默认导出
** - sayDialog
** - sayInput
*/
wow.sayDialog('你好世界')
wow.sayInput('个个都是人才')
// ------

const mac = Dialog.macos
const gnome = Dialog.gnome
const win = Dialog.win

// ----------WIN
try {
  win.default({
    type: 'info', // 'info' && 'warning' && 'error'
    text: '你好啊',
    title: '提示'
  })
} catch (error) {
  
}
//

// ----------MAC

mac.sayDialog('你好世界')
mac.sayInput('请输入值')

// 获取ip
const ip = mac.getIP()
console.log('当前ip: ', ip)

// 通知
mac.notification({
  title: '标题',
  content: '内容',
  subTitle: '副标题'
})

mac.default({
  type: 'default', // default && input
  title: '标题',
  icon: 'note', // 'note' && 'caution' && 'stop'
  buttons: [
    {
      text: '我知道了',
      id: 'know'
    },
    {
      text: '滚犊子',
      id: 'fuck'
    },
    {
      text: '扯淡呢',
      id: 'fuck_jump'
    }
  ],
  placeholder: '不打工'
}).then(id=> {
  if (id == 'know') {
    console.log('Yes')
  } else console.log('No')
})

// ----------

// ----------GNOME

// 'calendar' | // 显示日历对话框
// 'entry' | // 显示文字输入栏对话框
// 'error' | // 显示错误信息对话框(ok)
// 'info' | // 显示信息对话框(ok)
// 'question' | // 显示提问信息对话框
// 'text-info' | // 显示文字资信对话框
// 'warning' // 显示警告信息对话框(ok)

const options = {
  type: 'entry', // 类型
  title: '提示',
  text: '请输入今日份の幸运数字',
  width: 400,
  height: 300,
  // 默认时间, `type` 为 `calendar` 可用
  time: new Date,
  // 输入框默认值, 'entry' && 'text-info'
  placeholder: 'wow',
  // 输入框类型, 'text' && 'password'
  // `type` 为 `text-info` 可设置为文本域 `textarea`
  inputType: 'text',
  // 确定文本
  ok_text: '确定',
  // 取消文本
  cancel_text: '取消'
}
const now = gnome.default(options)
console.log('今日份の幸运数字为: ', now)

// ----------