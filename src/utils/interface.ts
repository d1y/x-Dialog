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

type DialogAsType =
  'default' |
  'input'

type DialogAsIconType = 
  'note' | // Notification
  'caution' |
  'stop'

export enum DialogIconType {
  stop,
  caution,
  note
}

export interface DialogButtonsInterface {
  text: string
  id: string
}

export interface DialogInputInterface {
  id: string
  value: string
}

export interface DialogInterface {
  title: string
  // 类型
  type?: DialogAsType,
  // 图标
  icon?: DialogAsIconType,
  // 按钮
  buttons?: Array<DialogButtonsInterface>,
  // 默认值
  placeholder?: string
}