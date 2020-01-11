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

// -----------------

type zenityDialogType =
  'calendar' | // 显示日历对话框
  'entry' | // 显示文字输入栏对话框
  'error' | // 显示错误信息对话框
  'info' | // 显示信息对话框
  'question' | // 显示提问信息对话框
  'text-info' | // 显示文字资信对话框
  'warning' // 显示警告信息对话框

type zenityDialogInputType =
  'text' |
  'password' |
  'textarea'

export interface zenityDialogInterface {
  type: zenityDialogType
  // 标题
  title?: string
  // window 宽高 
  width?: number
  height?: number
  // 文本
  text?: string
  // 日历专属, 默认时间
  time?: Date
  // 文本输入框的默认值
  placeholder?: string
  // 文本输入类型
  inputType?: zenityDialogInputType
}