const createConsole = (id) =>{
     $('.prompt').html('[user@sh] ');
         
     // Initialize a new terminal object
     const term = new TerminalEmulator(id);
     term.init();
 }

 const activeTerminals = []

 const spawnTerminalContainer = ()=>{
   const id = Date.now()
   const domElement = `
   <div id="terminal-window-${id}" class="terminal-window" style="">
     <div id="container-${id}" class="container">
             <output id="output-${id}" class="output">
             </output>
             <div action="#" id="input-line-${id}" class="input-line">
                 <div id="prompt-${id}" class="prompt">
                 </div>
                 <div>
                   <input tabindex="0" id="cmdline-${id}" class="cmdline" autofocus />
                 </div>
             </div>
     </div>
   </div>
   `
   const parentNode = $("#main-container")
   parentNode.append(domElement)
   activeTerminals.push(id)
   return id
 }

function createTerminalWindow(){
    if(activeTerminals.length > 20) throw new Error('Cannot open more than 20 terminals')
    const id = spawnTerminalContainer()
    createConsole(id);
    const terminal = document.getElementById("terminal-window-"+id)
    terminal.style.visibility = "visible"

    const termWindow = new WinBox({ 
        x:50,
        y:50,
        title: "", 
        mount: terminal,
        height: "500px",
        width: "700px",
        onclose:()=>{
            terminal.remove();
        }
    });
    terminal.style.height = "100%"
    terminal.style.width = "100%"
}

setInterval(()=>{
    const date = new Date()
    $("#clock").text(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}, 1000)