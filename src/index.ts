/*
** author: d1y
** 参考: 
** https://www.jianshu.com/p/d42dff738d70
*/

import * as macos from './wm/macos'
import * as win from './wm/win'
import * as gnome from './wm/gnome'

// TODO
type Desktop =
  // 'kde' |
  'gnome' |
  // http://deepin.org
  // 'dde' |
  // https://elementary.io/
  // 'pantheon' |
  'win' |
  'macos'

// TODO
interface dialogInterface {
  type: Desktop
}

// type osNames = 'darwin' | 'linux' | 'win32'

const osRun = (conf: Array<any>)=> {
  const os = process.platform
  try {
    let result: any = ''
    if (os == 'darwin') {
      result = conf[0]
    } else if (os == 'linux') {
      result = conf[1]
    } else if (os == 'win32') {
      result = conf[2]
    }
    return result()
  } catch (error) {
    throw new Error('未知错误')
  }
}

class Dialog {
  // type: Desktop
  os: string
  constructor(conf?: dialogInterface) {
    // const { type } = conf
    // this.type = type
    this.os = process.platform
  }
  sayDialog = async (title: string)=> {
    if (this.os == 'darwin') {
      return macos.sayDialog(title)
    } else if (this.os == 'linux') {
      return gnome.default({
        type: 'question',
        ok_text: '确定',
        cancel_text: '取消',
        title: '提示',
        text: title
      })
    } else if (this.os == 'win32') {
      return win.default({
        type: 'info',
        text: title,
        title: '提示'
      })
    }
  }
  sayInput(title: string) {
    if (this.os == 'darwin') {
      return macos.sayInput(title)
    } else if (this.os == 'linux') {
      return gnome.default({
        type: 'entry',
        ok_text: '确定',
        cancel_text: '取消',
        inputType: 'text',
        title: '提示',
        text: title
      })
    } else {
      throw new Error('不支持操作')
    }
  }
}

// const wrapper = new Dialog({
//   type: 'macos'
// })
// wrapper.sayDialog('你好世界').then(r=> {
//   console.log('r: ', r);
// })
// wrapper.sayInput('请输入姓名').then(msg=> {
//   console.log('msg: ', msg);
// })

export {
  win,
  macos,
  gnome
}
export default Dialog