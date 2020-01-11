import { windowDialog } from "../../interface"
import execa from "../../utils/execa"
import path from 'path'

const vbsFile = path.join(__dirname, '../../bin/msg.vbs')

// source https://github.com/tomas/dialog/blob/master/index.js
const windowsDialog = async (conf: windowDialog) => {
  let { type, text, title } = conf
  let code = 0
  // return codes for Windows (default value minus 1)
  // defaults in https://www.tutorialspoint.com/vbscript/vbscript_dialog_boxes.htm

  // 0 - vbOK
  // 1 - vbCancel
  // 2 - vbAbort
  // 3 - vbRetry
  // 4 - vbIgnore
  // 5 - vbYes
  // 6 - vbNo

  switch (type) { // Set MsgBox icon
    case 'error':
      code = 16;
      break;
    case 'info':
      code = 64;
      break;
    case 'warning':
      code = 48;
      break;
  }

  text = text.replace(/"/g, "'") // double quotes to single quotes
  // msgbox.vbs script from http://stackoverflow.com/questions/774175
  const run = execa({
    exe: 'cscript',
    cmds: [
      vbsFile,
      text,
      code,
      title
    ]
  })
  return run
}

export default windowsDialog