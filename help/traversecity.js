// path模块
// 将目录解析成gojs数据
/**
 * {
 *  rootNmae:vue
 *  chirdren:[{}]
 * }
 * 
 */
const PATH = require("path")
const FS = require("fs")

let rootdir = '/Users/apple/Desktop/dir'
// let rootdir = '/Users/apple/WebstormProjects/vue'

let  gojsData = {
    nodeKeyProperty: "key",
    nodeDataArray: [
        {
            key:1,name:'测试目录',type:'rootDir'
        }
    ],
    linkDataArray: []
}

let key = 2    // 累计
walk(rootdir)


/***
 * @function walk 读取目录  
 * @param currentDirPath   要读取的目录
 * @param callback 回调函数
 */

function walk(currentDirPath,current) {
      let files = FS.readdirSync(currentDirPath)  // 获取当前路径下的文件
      files.forEach(function(name){
        let form = key++
        let filePath = PATH.join(currentDirPath, name); // 当前文件的绝对路径
        let stat = FS.statSync(filePath); 
        gojsData.nodeDataArray.push({
            key:form,
            name:name,
        })
        if(stat.isFile()){
            if(current){
                gojsData.linkDataArray.push({
                    from:current,
                    to:form,
                })
            }else{
                gojsData.linkDataArray.push({
                    from:1,
                    to:form,
                })
            }
        }else if(stat.isDirectory()){
            walk(filePath,form)
            if(current){
                gojsData.linkDataArray.push({
                    from:current,
                    to:form,
                })
            }else{
                gojsData.linkDataArray.push({
                    from:1,
                    to:form,
                })
            }
        }
      })
}




// let gojsData = {
//     class:'go.TreeModel',
//     nodeDataArray:[
//         {key:1,name:'dir',title:'root'}
//     ]
// }

// let key = 1
// function walk(currentDirPath,current) {
//       let files = FS.readdirSync(currentDirPath)  // 获取当前路径下的文件
//       files.forEach(function(name){
//         let filePath = PATH.join(currentDirPath, name); // 当前文件的绝对路径
//         let stat = FS.statSync(filePath); 
//         if(stat.isFile()){
//             gojsData.nodeDataArray.push({
//                 key:  key++,
//                 name:  name,
//                 title: filePath,
//                 parent: current?current:1
//             })
//         }else if(stat.isDirectory()){
//             gojsData.nodeDataArray.push({
//                 key:  key++,
//                 name:  name,
//                 title: name,
//                 parent: current?current:1
//             })
//             let parents = key-1
//             walk(filePath,parents)
//         }
//       })
// }


console.log(gojsData)


// 将gojs写入文件
FS.writeFile('gojs.json', JSON.stringify(gojsData),function(err) {
    if (err) {
        console.log('文件写入失败，错误原因：' + err);
    } else {
        console.log('文件写入成功');
    }
})

