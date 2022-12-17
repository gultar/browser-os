let serverAvailable = false

const pingServer = () =>{
   return new Promise((resolve)=>{
      
      setTimeout(()=>{
        resolve(false)
      }, 1000)
      serverAvailable = $.get("/online")
      resolve({ available:serverAvailable })

   })
}

const execRemoteCommand = (cmd, args=[]) =>{
  return new Promise((resolve)=>{
    try{
      
      socket.once("shell-result", (shellResult)=>{
        if(shellResult.error){
          resolve({ error:shellResult.error })
        }
        else{
          const { result } = shellResult
          console.log('Exec cmd', cmd, result)
          resolve(result)
        }
      })
      socket.emit("shell-command", cmd, args)
    }catch(e){
      resolve({ error:e })
    }
  })
}

const execServerCommand = async (cmd, args=[]) =>{
  const {error, result} = await Promise.resolve($.post("http://localhost:8000/command", {
      cmd:cmd,
      args:args
    })
  );

  if(error) return { error:error }

  return result
}

const runFileSystemCommand = (cmd, args=[]) =>{
  try{
    const commandResult = FileSystem[cmd](...args)
    
    return commandResult
  }catch(e){
    console.log(e)
    return { error:e.message }
  }
}

const exec = async (cmd, args=[]) =>{
  
  if(serverAvailable){
    return await execServerCommand(cmd, [...args])//execRemoteCommand(cmd, [...args])
  }else{
    return runFileSystemCommand(cmd, [...args])
  }
}

pingServer()


