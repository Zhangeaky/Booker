const {app,BrowserWindow} = require('electron');
//var aler = require('al');

let mainwindow = null;
app.allowRendererProcessReuse = true;
app.on('ready',()=>{
    console.log('my first electron app!');
    mainwindow = new BrowserWindow(
        {
            width:1080,
            height:400,
            webPreferences:{
                nodeIntegration:true//十分重要,没有这个语句,html中的脚本无法使用node模块
            }
        }
    );
    mainwindow.loadFile('./app/index.html');//当前目录是项目根目录
});