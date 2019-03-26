// 只是生成图片url字串，node运行，不需要被引入
var fs = require('fs')

function getUrls(){
    fs.readdir('./img/bg',(err,res)=>{
        if(err){
            console.log(err)
        }
        fs.writeFile('./imgUrls.txt', res,(er,r)=>{
            if(er){
                console.log(er)
            }
            console.log('write succeed!');
        })
    })
}

getUrls();