const openFile = async (path) =>{
    const file = await exec("getFile", [path])

    const fileExtension = handleExtension(file.name)
    if(fileExtension == "png" || fileExtension == 'jpg' || fileExtension == "gif"){
        
        window.viewImage(file)
    }else{
        window.launchEditor(path, file.content, path)
    }
    
}

const handleExtension = (filename) =>{
    const [ name, ...extensions ] = filename.split(".")

    return extensions[extensions.length - 1]
}