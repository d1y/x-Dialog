/*
** 参考: https://www.xuebuyuan.com/650003.html
*/

import execa from "../../utils/execa"
import { ExecaConf, zenityDialogInterface } from "../../interface"


const zenityDialog = (conf: zenityDialogInterface) => {
  let {
    type, 
    title,
    text,
    width,
    height,
    time,
    placeholder,
    inputType
  } = conf
  title = title ? title : 'title'
  text = text ? text : 'text'
  const exe: ExecaConf = {
    exe: 'zenity',
    cmds: []
  }
  const push = (key: string, value?: string | number)=> {
    let result = `--${ key }`
    if (value) result +=`="${ value }"`
    exe.cmds.push(result)
  }
  exe.cmds.push(`--${ type }`)
  push('title', title)
  push('text', text)
  if (width) push('width', width)
  if (height) push('height', height)
  if (type == 'calendar' && time) {
    let d = time.getDate(),
        m = time.getMonth(),
        y = time.getFullYear()
    m++
    push('day', d)
    push('month', m)
    push('year', y)
  }
  if (type == 'entry' || type == 'text-info' ) {
    if (type == 'entry' && placeholder) {
      push('entry-text', placeholder)
    }
    if (type == 'entry' && inputType == 'password') {
      push('hide-text')
    }
    if (type == 'text-info' && inputType == 'textarea') {
      push('editable')
    }
  }
  const data = execa(exe)
  // TODO
  // let list = data.split('\n')
  // if (list.length >= 2) return list[list.length-1]
  return data
}

// const test = zenityDialog({
//   type: 'entry',
//   text: '你好世界',
//   title: '不打工日记',
//   inputType: 'password'
// })
// console.log('log: ', test);