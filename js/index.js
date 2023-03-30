/*Created by Felix Zandamela*/
   

 
function formatToUnits(number, precision) {
 const abbrev = ['', 'k', 'M', 'B', 'T']; 
 const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3) 
 const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 )) 
 const suffix = abbrev[order]; 
 return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;

 } // format To Units player time

// active audio amination
const setActive = (i) => {
  setEqualizer()
  let a =  trackList.querySelector(".active");
  if(a !== null) {
   a.classList.remove("active");
  }
  const ele = document.getElementsByClassName("track")[i-1];
  ele.classList.add("active");
}

function setEqualizer(action = false){
 const elc = trackList.getElementsByClassName("indicator")[index-1];
}


// set Current Track datas
let nam, srcs;
function setCurrentTrack(data){
banners = document.querySelectorAll(".currentBanner");
trackNames = document.querySelectorAll(".currentName");
 trackCategory = document.querySelectorAll(".currentTrackCategory")
 downloadBtn = document.getElementById("downloadBtn")
 
 var str = !data.lyrics || data.lyrics == undefined ? "No lyrics found for this song" : data.lyrics
str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
 lyrics.innerHTML =` <p>${str}</p>`
 trackNames.forEach((trackname) => {
    trackname.textContent = data.name;
  })
  
  srcs = data.src
  nam = data.name
   banners.forEach((bunner) => {
    bunner.src = !data.image || data.image == undefined ? "/avatar.jpg" :
    data.image;
  })
  trackCategory.forEach((category) => {
    category.textContent = data.category;
  })
  btn.addEventListener("click", () =>
    webShareAPI(nam)
  );
  downloadBtn.setAttribute("onclick", `saveFile('${srcs}')`)
} 


// function for web share api
function webShareAPI(name) {
  let shares = navigator.share ? true : false
  if(!shares){ toastFunc("Your Browser doesn't support Web Share API");
  }else{
    navigator
      .share({
      title: "Hello!",
      text:`I'm listening ${name} in itMusic player, join us it's for free.`,
      url: baseUrl
    })
    .then(() =>toastFunc("Successfully done"))
    .catch((error) => toastFunc("Error sharing", error));
  }
}


// download function
function saveFile(url, blobName) {
  var blob;
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, true);
  xmlHTTP.responseType = 'arraybuffer';
  xmlHTTP.onload = function(e){
    blob = new Blob([this.response]);   
  }
    
  //download progress
  Progress = document.getElementById("progresso")
  xmlHTTP.onprogress = function(e) {
    let downloaded = e.lengthComputable && e.loaded === e.total ? true : false;
    let valP = (e.loaded / e.total) *100;
    Progress.style.width = downloaded ? "0%" : `${valP}%`
    Msg = ("Download completed");
    downloaded ? toastFunc(Msg) : null
  }
  
  xmlHTTP.onloadend = function(e){
    var fileName = `${nam}.mp3`;
    var tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.style = "display: none";
    url = window.URL.createObjectURL(blob);
    tempEl.href = url;
    tempEl.download = fileName;
    tempEl.click();
    window.URL.revokeObjectURL(url);
  }
  xmlHTTP.send();

}


// themes function
function setTheme(event, i){
   i = parseInt(event.target.id)
   addTheme(i)
 }
 
 var  themes = [
  {name: 'Default', background: '#061b26', color:'#fff'},
  {name: 'Light',background: '#f8f9fd',color:'#000'},
  { name: 'Gray', background: '#37474F', color:'#fff'},
  { name:'Blue Dark', background:'RGB(37,2,83)',color:'#fff'}
  ]
 
 
function getThemes(){
  let WrapThemes = document.getElementById("WrapThemes")
  for(var i = 0; i < themes.length; ++i){
    var id  = themes[i]
    var theme = document.createElement("div")
    theme.setAttribute("id", i )
    theme.setAttribute("onclick", "setTheme(event)")
    theme.setAttribute("class", "theme")
    theme.textContent = themes[i].name
    theme.style.background = themes[i].background
    theme.style.color = themes[i].color
    WrapThemes.appendChild(theme)
  }
}
 
 function addTheme(i){
   document.body.style.background = themes[i].background
   document.body.style.color = themes[i].color
   conponentsThemes.push(settings,secEqualizer,secList,secLyric, scrollLyric, roundVolumeBgColor, roundVolumeOverlay , draggablecl)
    for(var k = 0; k < conponentsThemes.length; ++k){
      conponentsThemes[k].style.background = themes[i].background;
    }
 }// end of themes


function openTrackLyric(){
  let dragg = document.getElementById("dragg-names")
  setLyric = setLyric ? false: true;
  secLyric.style.display = !setLyric ? "none" : "inline"
  let setDrag = !setLyric ? false : true;
  setDragControl(setDrag)
  dragg.setAttribute("onclick", "openTrackLyric()" )
}


function setDragControl(showDragControl){
  showDragControl = showDragControl ? true: false;
  draggablecl.style.display = !showDragControl ? "none": "inline";
}

function openTrackList(){
  let dragg = document.getElementById("dragg-names")
  setFooList = setFooList ? false: true;
  let drag = !setFooList ? false : true
  secList.style.display = !setFooList ? "none" : "inline";
  setDragControl(drag);
  dragg.setAttribute("onclick", "openTrackList()" )
}

let setEqua = false
function toggleEqualizer(){
  let dragg = document.getElementById("dragg-names")
  document.getElementById("container-equalizer").style.display = !setEqua ? "inline" : "none";
  setEqua = setEqua ? false : true
  setSettings == true ? openSettings() : setSettings = true;
  let setDrag = !setEqua ? false : true;
  setDragControl(setDrag)
  dragg.setAttribute("onclick", "toggleEqualizer()" )
}


function openSettings(){
   setSettings = setSettings ? false: true;
   settings.style.display = !setSettings ? "none" : "inline";
 }
 
 // toast message
 function toastFunc(Msg){
  toast.style.display ="flex"
   toastMsg.innerText= Msg; 
  setTimeout(()=>{
  toast.style.display ="none"
   toastMsg.innerText= ""; 
  },6000);
}

