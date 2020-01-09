/*
** author: d1y
** 参考: 
** https://www.jianshu.com/p/d42dff738d70
*/
import appleScript from './wm/macos'

type Desktop =
  'kde' |
  'gnome' |
  // http://deepin.org
  'dde' |
  // https://elementary.io/
  'pantheon' |
  'win' |
  'macos'


interface dialogInterface {
  type: Desktop
}

class Dialog {
  type: Desktop
  constructor(conf: dialogInterface) {
    const { type } = conf
    this.type = type
  }
}