const enum cmds {
  getIP = 'IPv4 address of (system info)',
  notification = 'display notification "CONTENT" with title "TITLE" subtitle "SUB"',
  dialog = 'set result to (display dialog "TITLE" ANSWER buttons BUTTONS ICON)',
  test = 'set result to (display dialog "test" default answer "草草草")'
}

export default cmds

/*
** 转换文字
** @param {boolean} format 是否转格式
*/
export const exe_change = (data: any, cmd: string, format: boolean = true): string=> {
  let result = cmd
  for (let key in data) {
    let newStr: string = data[key]
    if (format) newStr = gulpPullString(data[key])
    result = result.replace(key, newStr)
  }
  return result
}

// [fix] 将用户输入的数据自动转格式
const gulpPullString = (oldStr: string): string=> {
  // 需要转格式的应该只有 ' | "
  return oldStr
    // .replace(/\'/g, '\\\'')
    .replace(/\"/g, '\\\"')
}