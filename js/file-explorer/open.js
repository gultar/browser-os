const openFile = (filename) =>{
    const file = exec("getFile", [filename])
    console.log('File', file)
}