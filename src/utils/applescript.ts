/*
** https://github.com/sindresorhus/run-applescript/blob/master/index.js
** 参考: https://www.jianshu.com/p/a22084e87b09
** https://hubpages.com/technology/applescript_code#
*/

import execa from './execa'
import { ExecaConf, NotificationInterface, DialogInterface, DialogButtonsInterface, DialogIconType, DialogInputInterface } from './interface'
import appleCmds, { exe_change } from './applecmds'

const run = (script: string | Array<number | string>): any=> {
  if (process.platform !== 'darwin') {
    throw new Error('macOS only')
	}
  let cmd: string = ''
  if (Array.isArray(script)) {
    (script as Array<any>).forEach((item: string)=> {
      cmd += ` ${ item }`
    })
  } else cmd += script
  let cmds: Array<string | number> = []
  cmds.push('-e')
  cmds.push(`\'${ cmd }\'`)
  let result: ExecaConf = {
    exe: 'osascript',
    cmds
  }
  const stdout = execa(result)
  return stdout;
}

// 获取当前ip(局域网)
export const getIP = (): string=> {
  const ip: string =  run(appleCmds.getIP)
  let temp: string[] = ip.split('.')
  // TODO 弱行判断ip格式是否正确
  if (temp.length >= 2) {
    let flag = temp.every(item=> {
      return !Number.isNaN(+item)
    })
    if (flag) return ip
  }
  return ''
}

// 显示通知
export const notification = (conf: NotificationInterface)=> {
  let {
    content: CONTENT,
    title: TITLE,
    subTitle: SUB
  } = conf
  CONTENT = CONTENT ? CONTENT : ''
  SUB = SUB ? SUB : ''
  TITLE = TITLE ? TITLE : ''
  const text: string = appleCmds.notification
  const option = {
    CONTENT,
    TITLE,
    SUB
  }
  const cmd = exe_change(option, text)
  const data = run(cmd)
}

// notification({
//   title: '测试代码',
//   content: '你的IP：' + getIP()
// })

// 默认的点击按钮
export const dialogDefaultButtons: DialogButtonsInterface[] = [
  {
    text: '取消',
    id: 'cancel'
  },
  {
    text: '确定',
    id: 'ok'
  }
]

export const dialog = async (conf: DialogInterface)=> {
  let {
    type,
    icon,
    buttons,
    title,
    placeholder
  } = conf
  type = type ? type : 'default'
  let isInput: boolean = type == 'input'
  let icon_str = 'with icon ICON'
  let icon_type = icon && DialogIconType[icon]
  if (typeof icon_type == 'number' && icon_type >= 0) {
    icon_str = icon_str.replace('ICON', (icon_type as any))
  } else icon_str = ''
  buttons = buttons ? buttons : dialogDefaultButtons
  let buttons_temp: string = `BUTTONS`
  let map: string[] | string = buttons.map(item=> {
    return item['text']
  })
  map = JSON.stringify(map)
  // [fix] 转换个格式自动转换的`\`
  map = map.replace(/\\/g, '')
  map = map.replace('[', '{')
  map = map.slice(0, map.length-1) + '}'
  buttons_temp = buttons_temp.replace(`BUTTONS`, map)
  let str: string = appleCmds.dialog
  let temp_answer = placeholder ? placeholder : ''
  let ANSWER = isInput ? `default answer "${ temp_answer }"` : ''
  const option = {
    "TITLE": title,
    "BUTTONS": buttons_temp,
    "ICON": icon_str,
    ANSWER
  }
  const cmd = exe_change(option, str, false)
  // console.log('cmd: ', cmd)
  const data: string = run(cmd)
  let result: string = ''
  let key = data.split('button returned:')
  if (key && key.length >= 2) {
    let index: number = -1
    let text = key[1]
    if (isInput) {
      text = text.slice(0,text.indexOf(','))
    }
    buttons.filter((item, i)=> {
      if (item['text'] === text) {
        index = i
        return true
      }
    })
    if (index >= 0) {
      const cur = buttons[index]
      result = cur['id']
    }
  }
  if (isInput) {
    const split = data.split('text returned:')
    const value = split[1]
    let Return: DialogInputInterface = {
      id: result,
      value
    }
    return Return
  } else return result
}

export const sayDialog = async (title: string)=> {
  const eye = await dialog({ title })
  return eye === 'ok'
}

export const sayInput = async (title: string)=> {
  const eye = await dialog({
    title,
    type: 'input'
  })
  const Input = eye as DialogInputInterface
  return Input['value']
}

// const log = run(appleCmds.test)
// console.log('log: ', log);

export default run