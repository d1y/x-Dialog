const enum cmds {
  getIP = 'IPv4 address of (system info)',
  notification = 'display notification "CONTENT" with title "TITLE" subtitle "SUB"',
  dialog ='display dialog "TITLE"'
}

export default cmds

// 修改
export const exe_change = (data: any, cmd: string): string=> {
  let result = cmd
  for (let key in data) {
    const newStr = gulpPullString(data[key])
    result = result.replace(key, newStr)
  }
  return result
}

// [fix] 将用户输入的数据自动转格式
const gulpPullString = (oldStr: string): string=> {
  // 需要转格式的应该只有 ' | "
  return oldStr
    .replace(/\'/g, '\\\'')
    .replace(/\"/g, '\\\"')
}