const fs = require('fs')

let inspectDir = process.argv[2]// "/Users/kawashimakeiji/develop";
let exportTo = process.argv[3];

fs.readdir(inspectDir, {withFileTypes: true}, (err, datas) => {
    datas.forEach(data => {
        if(data.isDirectory()){
            let currentFolder = data.name;
            let currentFolderArr = currentFolder.split(']');
            let saveBaseName = currentFolder;
            if(currentFolderArr.length > 1){
                saveBaseName = parseInt(currentFolderArr[0].replace('[')).toString()+"_"+currrentFolderArr[1].replace(new RegExp(" ", "g"),"");
            }
            let searchDir = inspectDir + "/" + data.name
            let seqNo = 0;
            fs.readdir(searchDir, {withFileTypes: true}, (err, files)=>{
                files.forEach((filesolo, key)=>{
                    //console.log(key)
                    if(filesolo.isDirectory() === false){
                        let filenameArr = filesolo.name.split('.');
                        let extention = filenameArr[filenameArr.length -1];
                        let fileexport2 = exportTo + saveBaseName
                        if(seqNo != 0){
                            fileexport2 = fileexport2 + "_" + seqNo.toString()
                        }
                        fileexport2 = fileexport2 + "." + extention;
                        let filefullpath = searchDir + "/" + filesolo.name;
                        console.log(filefullpath, fileexport2)
                        fs.copyFile(filefullpath, fileexport2, function(err, success){
                            if(err){ throw err; }
                            else console.log(success)
                        })
                        seqNo++;
                    }
                })
            });
        }
    })
})