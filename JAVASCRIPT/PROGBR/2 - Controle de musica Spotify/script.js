let music = document.getElementById("music");
let image = document.getElementById("image");
let progress = document.getElementById("progress");
let timerAtual = document.querySelector(".timer-vivo");
let timerFinal = document.querySelector(".timer-final");

function back(){
    music.currentTime -= 5
}

function avançar(){
    music.currentTime += 5
}

image.addEventListener("click", function(){


    if(music.paused){
        music.play()
        image.setAttribute("src", "images/pause.png")
    }
    else{
        music.pause()
        image.setAttribute("src", "images/play (1).png")
    }

})

music.addEventListener("timeupdate", function () {
    progress.max = music.duration;
    progress.value = music.currentTime;

    timerAtual.textContent = formatTime(music.currentTime);


});

progress.addEventListener("input", function () {
    music.currentTime = progress.value;
});

music.addEventListener("loadedmetadata", function () {
    progress.max = Math.floor(music.duration);
    progress.value = 0;

    // Mostra o tempo total formatado
    timerFinal.textContent = formatTime(music.duration);

    
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}



