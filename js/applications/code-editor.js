let isOpenCodeEditor = false
const launchCodeEditor = (filename, content, exists=false) =>{
    if(isOpenCodeEditor) return false;

    const save = async (filecontent) =>{
        const fileExists = await exec("getFile", [filename])

        if(!fileExists){
            return await exec("touch", [filename, filecontent])
        }else{
            return await exec("editFile", [filename, filecontent])

        }

    }

    const winbox = new WinBox({ 
        title: "", 
        height:"95%", 
        width:"80%",
        url:"./js/external/code-editor.html",
    })

    setTimeout(()=>{
        const [ iframe ] = winbox.window.querySelector(".wb-body").childNodes
        
        const iWindow = iframe.contentWindow
        const startCodeEditor = iWindow.startCodeEditor
        const getContent = iWindow.getContent

        iWindow.addEventListener("message", async (event)=>{
            const message = event.data
            if(message.saveContent){
              const filecontent = getContent()
              const saved = await exec("editFile", [filename, filecontent])
              alert(`Saved file ${filename}: ${saved}`)
            }
        })

        startCodeEditor(filename, content)

    }, 500)

}

window.launchCodeEditor = launchCodeEditor
