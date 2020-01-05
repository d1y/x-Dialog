/*
** https://github.com/sindresorhus/run-applescript/blob/master/index.js
** 参考: https://www.jianshu.com/p/a22084e87b09
*/

import execa from './execa'
import { ExecaConf, NotificationInterface } from './interface'
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
  const ip =  run(appleCmds.getIP)
  return ip
}

// 显示通知
// notification({
//   title: '测试代码',
//   content: '你的IP：' + getIP()
// })
export const notification = (conf: NotificationInterface)=> {
  let { content, title, subTitle } = conf
  content = content ? content : ''
  subTitle = subTitle ? subTitle : ''
  title = title ? title : ''
  const text: string = appleCmds.notification
  const option = {
    "CONTENT": content,
    "TITLE": title,
    "SUB": subTitle
  }
  const cmd = exe_change(option, text)
  const data = run(cmd)
}

export const dialog = (conf?: any)=> {
  let str: string = appleCmds.dialog
  let button: string =  `buttons BUTTONS`
  const option = {
    "TITLE": '\'sdfdfd我是标题\"dsfdfsd',
    "BUTTONS": ''
  }
  const cmd = exe_change(option, str)
  const data = run(cmd)
  // console.log('data: ', data);
}
dialog()

export default run