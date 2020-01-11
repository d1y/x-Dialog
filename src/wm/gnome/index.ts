/*
** 参考: https://www.xuebuyuan.com/650003.html
** 样式: https://stackoverflow.com/questions/18234920/control-the-size-of-the-content-in-a-zenity-window
*/

import execa from "../../utils/execa"
import { ExecaConf, zenityDialogInterface } from "../../interface"

const zenityDialog = async (conf: zenityDialogInterface) => {
  let {
    type, 
    title,
    text,
    width,
    height,
    time,
    placeholder,
    inputType,
    ok_text,
    cancel_text
  } = conf
  title = title ? title : 'title'
  text = text ? text : 'text'
  let Return: any = true
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

  if (ok_text) push('ok-label', ok_text)
  // -----
  if (type == 'calendar' || type == 'entry' || type == 'question' || type == 'text-info') {
    if (cancel_text) push('cancel-label', cancel_text)
  }
  // [fix] https://www.howtogeek.com/435020/how-to-add-a-gui-to-linux-shell-scripts
  if (type == 'question') {
    exe.cmds.push(`; echo $?`)
  }
  // -----
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
  if (type == 'question') Return = !(+data)
  Return = data
  return Return
}

export default zenityDialog