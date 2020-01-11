<div>
  <h1 align="center">x-Dialog</h1>
  <h3 align="center">nodejs call native alert dialogs<h3>
</div>

> fork by https://github.com/tomas/dialog

# Use

Before using this library, you need to understand the dependency packages called through nodejs. Linux `GNOME` use `zenity`.Some distributions usually come with it🧐(I also know that `kdialog` is also good)

```bash
zenity --version

# debian
sudo apt install zenity

# mac
brew install zenity
```

# Api

```ts
# only mac
import dialog, {
  getIp,
  notification,
  dialog
} from 'x-dialog/dist/wm/macos'

let localIP = getIP()
if (!localIP) localIP = `No network`

// show notification
notification({
  title: 'Wow, look',
  content: `You local ip is: ${ localIP }`
})

const dialogOptions = {
  title: 'hello dialog'
}

// show simple dialog
dialog.sayDialog(dialogOptions).then(flag=> {
  const test = flag ? 'Yes' : 'no'
  console.log('You clicked to: ', test)
})

const Buttons = [
  {
    text: 'Run',
    id: 'use_run'
  },
  {
    text: 'Stop',
    id: 'use_stop'
  },
  {
    text: 'Go',
    id: 'use_go'
  }
]

const inputOptions = {
  title: 'Enter your lucky number🐶',
  type: 'input',
  // default value
  placeholder: 'look!',
  icon: 'stop',
  buttons: Buttons
}

;(async ()=> {
  const data = await dialog(inputOptions)
  const { value } = data
  console.log('You lucky number is: ', value)
})

```