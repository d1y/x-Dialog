export interface ExecaConf {
  exe: string
  cmds: Array<string | number>
}

export interface NotificationInterface {
  // 内容
  content?: string
  // 标题
  title?: string
  // 副标题
  subTitle?: string
}