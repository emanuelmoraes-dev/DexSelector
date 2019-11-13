const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let frames = {}

function showWindow(html, window, browserOptions) {
	frames[window] = new BrowserWindow(browserOptions)
	frames[window].loadURL(url.format({
		pathname: path.join(__dirname, '../viwer/' + html),
		protocol: 'file:',
		slashes: true
	}))

	ipcMain.on(window + '.args', function(event, args) {
		event.returnValue = frames[window].args
	})
}

