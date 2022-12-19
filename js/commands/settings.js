function changeBackground(args){
    const value = args[0]
    if(value.substr(0, 4) == "http"){
      $('#page-wrapper').css("background-image", "url("+args[0]+")")
      $('#page-wrapper').css("background-size", "cover")
    }else{
      $('#page-wrapper').css("background-image", "none")
      $('#page-wrapper').css("background", value)
    }
}

function toggleWaveEffect(){
    // $('#page-wrapper').css("background", "linear-gradient(-45deg, #2c4f99, #365afc, #414141, #575757)")
    // $('#page-wrapper').css("background-size", "400% 400%")
    const pageWrapper = document.getElementById('page-wrapper')
    if(pageWrapper.style.animation !== "")
      pageWrapper.style.animation = "gradient 60s ease infinite"
    else
      pageWrapper.style.animation = ""

    return true
}

function toggleParticles(){
  if(window.particles){
    window.particles = false;
  }else{
    initParticles()
  }
}

function changeWindowStyle(){

}

