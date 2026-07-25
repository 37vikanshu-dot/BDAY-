/* ==========================================
   BIRTHDAY WEBSITE
   SCRIPT.JS - PART 1
========================================== */

// ---------- ELEMENTS ----------

const loader = document.getElementById("loader");

const music = document.getElementById("bgMusic");

const gift = document.getElementById("gift");

const envelope = document.getElementById("envelope");

const replayBtn = document.querySelector(".end-btn");

const scenes = document.querySelectorAll(".scene");

const typedMessage = document.getElementById("typedMessage");

// ---------- VARIABLES ----------

let currentScene = 0;

let musicStarted = false;

let typingDone = false;

// ---------- SHOW SCENE ----------

function showScene(index){

scenes.forEach(scene=>{

scene.classList.remove("active");

});

scenes[index].classList.add("active");

currentScene=index;

}

// ---------- LOADER ----------

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.style.display="none";

},900);

},2200);

});

// ---------- MUSIC ----------

function startMusic(){

if(musicStarted) return;

musicStarted=true;

music.volume=0.5;

music.play().catch(()=>{});

}

// ---------- INTRO ----------

document.getElementById("introScene").addEventListener("click",()=>{

startMusic();

showScene(1);

});

// ---------- GIFT ----------

gift.addEventListener("click",()=>{

gift.style.pointerEvents="none";

gift.style.transition=".7s";

gift.style.transform="scale(1.4) rotate(25deg)";

gift.style.opacity="0";

setTimeout(()=>{

showScene(2);

},700);

});

// ---------- LETTER ----------

envelope.addEventListener("click",()=>{

envelope.classList.toggle("open");

if(!typingDone){

typingDone=true;

typeLetter();

}

});

// ---------- LETTER TEXT ----------

const letterText=
`Dear Joshita,

Happy 16th Birthday! 🎉

May your life always be filled with happiness, success, laughter and beautiful memories.

Keep smiling because your smile makes everyone around you happy.

May this year bring countless blessings, unforgettable moments and everything you wish for.

Once again...

Happy Birthday! ❤️`;

function typeLetter(){

let i=0;

typedMessage.innerHTML="";

const timer=setInterval(()=>{

typedMessage.innerHTML+=letterText.charAt(i);

i++;

if(i>=letterText.length){

clearInterval(timer);

}

},35);

}

// ---------- REPLAY ----------

replayBtn.addEventListener("click",()=>{

location.reload();

});


/* ==========================================
   SCRIPT.JS - PART 2
   Scene Navigation + Effects
========================================== */

// ---------- NEXT SCENE ----------

function nextScene(){

if(currentScene >= scenes.length-1) return;

showScene(currentScene+1);

afterSceneChange();

}

// ---------- PREVIOUS SCENE ----------

function previousScene(){

if(currentScene<=0) return;

showScene(currentScene-1);

afterSceneChange();

}

// ---------- TAP TO NEXT ----------

scenes.forEach((scene,index)=>{

// Skip intro (already handled)
if(index===0) return;

// Skip gift (gift click handles it)
if(scene.id==="giftScene") return;

// Skip letter (tap envelope instead)
if(scene.id==="letterScene") return;

// Skip final
if(scene.id==="finalScene") return;

scene.addEventListener("click",()=>{

nextScene();

});

});

// ---------- SWIPE SUPPORT ----------

let startX=0;

document.addEventListener("touchstart",(e)=>{

startX=e.touches[0].clientX;

});

document.addEventListener("touchend",(e)=>{

let endX=e.changedTouches[0].clientX;

let diff=endX-startX;

// Swipe Right
if(diff>80){

previousScene();

}

// Swipe Left
else if(diff<-80){

nextScene();

}

});

// ---------- AFTER SCENE CHANGE ----------

function afterSceneChange(){

switch(currentScene){

case 2:

createConfetti(120);

createHearts(25);

break;

case 3:

createPhotoSparkles();

break;

case 4:

createPetals();

break;

case 5:

createConfetti(200);

createHearts(40);

break;

}

}

// ==========================================
// CONFETTI
// ==========================================

function createConfetti(total){

for(let i=0;i<total;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=

`hsl(${Math.random()*360},100%,60%)`;

c.style.animationDuration=

(3+Math.random()*3)+"s";

c.style.animationDelay=

(Math.random()*1.5)+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},7000);

}

}

// ==========================================
// HEARTS
// ==========================================

function createHearts(total){

for(let i=0;i<total;i++){

const h=document.createElement("div");

h.className="heart";

h.innerHTML="❤";

h.style.left=Math.random()*100+"vw";

h.style.bottom="-40px";

h.style.animationDuration=

(5+Math.random()*4)+"s";

h.style.fontSize=

(18+Math.random()*18)+"px";

document.body.appendChild(h);

setTimeout(()=>{

h.remove();

},9000);

}

}

// ==========================================
// PHOTO SPARKLES
// ==========================================

function createPhotoSparkles(){

const scene=document.getElementById("photoScene");

for(let i=0;i<12;i++){

const s=document.createElement("div");

s.className="photo-sparkle";

s.innerHTML="✨";

s.style.left=Math.random()*100+"%";

s.style.top=Math.random()*100+"%";

s.style.animationDelay=(Math.random()*3)+"s";

scene.appendChild(s);

}

}

// ==========================================
// PETALS
// ==========================================

function createPetals(){

for(let i=0;i<18;i++){

const p=document.createElement("div");

p.className="petal";

p.innerHTML="🌸";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=

(6+Math.random()*4)+"s";

p.style.animationDelay=

(Math.random()*3)+"s";

document.body.appendChild(p);

setTimeout(()=>{

p.remove();

},10000);

}

}
/* ==========================================
   SCRIPT.JS - PART 3
   Gift Explosion + Fireworks + Typing Upgrade
========================================== */

// ---------- BETTER GIFT OPENING ----------

gift.onclick = function () {

    startMusic();

    gift.style.transition = "all .8s ease";

    gift.style.transform = "scale(2) rotate(35deg)";
    gift.style.opacity = "0";

    // Create sparkle burst
    for (let i = 0; i < 30; i++) {

        let spark = document.createElement("div");

        spark.innerHTML = "✨";
        spark.style.position = "fixed";
        spark.style.left = (gift.getBoundingClientRect().left + 70) + "px";
        spark.style.top = (gift.getBoundingClientRect().top + 70) + "px";
        spark.style.fontSize = (16 + Math.random() * 18) + "px";
        spark.style.pointerEvents = "none";
        spark.style.transition = "1s ease";
        spark.style.zIndex = "9999";

        document.body.appendChild(spark);

        requestAnimationFrame(() => {

            spark.style.left =
                (gift.getBoundingClientRect().left - 180 + Math.random() * 360) + "px";

            spark.style.top =
                (gift.getBoundingClientRect().top - 180 + Math.random() * 360) + "px";

            spark.style.opacity = "0";
            spark.style.transform = "scale(2) rotate(360deg)";

        });

        setTimeout(() => spark.remove(), 1200);

    }

    setTimeout(() => {

        showScene(2);
        afterSceneChange();
        startFireworks();

    }, 800);

};

// ==========================================
// FIREWORKS
// ==========================================

function startFireworks() {

    const canvas = document.getElementById("fireworks-layer");

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function explode(x, y) {

        for (let i = 0; i < 80; i++) {

            particles.push({

                x,

                y,

                dx: (Math.random() - .5) * 8,

                dy: (Math.random() - .5) * 8,

                life: 100,

                color:
                    `hsl(${Math.random() * 360},100%,60%)`

            });

        }

    }

    explode(canvas.width / 2, canvas.height / 3);
    explode(canvas.width * .25, canvas.height * .45);
    explode(canvas.width * .75, canvas.height * .35);

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {

            p.x += p.dx;

            p.y += p.dy;

            p.dy += .05;

            p.life--;

            ctx.beginPath();

            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);

            ctx.fillStyle = p.color;

            ctx.fill();

            if (p.life <= 0) {

                particles.splice(index, 1);

            }

        });

        if (particles.length > 0) {

            requestAnimationFrame(animate);

        }

    }

    animate();

}

// ==========================================
// TYPING IMPROVEMENT
// ==========================================

function typeLetter() {

    typedMessage.innerHTML = "";

    let i = 0;

    const speed = 28;

    function type() {

        if (i < letterText.length) {

            const ch = letterText.charAt(i);

            typedMessage.innerHTML +=
                ch === "\n" ? "<br>" : ch;

            i++;

            setTimeout(type, speed);

        }

    }

    type();

}

// ==========================================
// TITLE ANIMATION
// ==========================================

const birthdayTitle = document.getElementById("birthdayTitle");

if (birthdayTitle) {

    setInterval(() => {

        birthdayTitle.style.transform = "scale(1.08)";

        setTimeout(() => {

            birthdayTitle.style.transform = "scale(1)";

        }, 350);

    }, 2500);

}

// ==========================================
// PHOTO CARDS FLOAT RANDOMLY
// ==========================================

document.querySelectorAll(".photo-card").forEach((card, index) => {

    setInterval(() => {

        card.style.transform =

            `translateY(${Math.random() * 12 - 6}px)
             rotate(${Math.random() * 10 - 5}deg)`;

    }, 2500 + index * 400);

});

// ==========================================
// MUSIC FADE-IN
// ==========================================

function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    music.volume = 0;

    music.play().catch(() => {});

    let vol = 0;

    const fade = setInterval(() => {

        vol += 0.05;

        music.volume = Math.min(vol, 0.5);

        if (vol >= 0.5) {

            clearInterval(fade);

        }

    }, 150);

}/* ==========================================
   SCRIPT.JS - PART 4 (FINAL)
   Premium Effects + Final Polish
========================================== */

// ==========================================
// SHOOTING STARS
// ==========================================

function createShootingStar() {

    const star = document.createElement("div");

    star.innerHTML = "✦";

    star.className = "star";

    star.style.position = "fixed";
    star.style.left = (Math.random() * window.innerWidth) + "px";
    star.style.top = "-20px";
    star.style.fontSize = (12 + Math.random() * 10) + "px";
    star.style.zIndex = "9999";
    star.style.transition = "2s linear";
    star.style.pointerEvents = "none";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transform =
            `translate(-250px,350px) rotate(180deg)`;

        star.style.opacity = "0";

    });

    setTimeout(() => {

        star.remove();

    }, 2200);

}

setInterval(createShootingStar, 3000);

// ==========================================
// FLOATING FIREFLIES
// ==========================================

function createFireflies() {

    for (let i = 0; i < 15; i++) {

        const firefly = document.createElement("div");

        firefly.className = "firefly";

        firefly.style.left = Math.random() * 100 + "vw";
        firefly.style.top = Math.random() * 100 + "vh";

        firefly.style.animationDelay =
            Math.random() * 6 + "s";

        document.body.appendChild(firefly);

    }

}

createFireflies();

// ==========================================
// PHOTO AUTO GLOW
// ==========================================

const photoCards = document.querySelectorAll(".photo-card");

let activePhoto = 0;

setInterval(() => {

    photoCards.forEach(card => {

        card.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.3)";

    });

    if(photoCards.length){

        photoCards[activePhoto].style.boxShadow =
            "0 0 40px #ff4ea8";

        activePhoto++;

        if(activePhoto >= photoCards.length){

            activePhoto = 0;

        }

    }

},2500);

// ==========================================
// CONFETTI EVERY 8 SECONDS
// ==========================================

setInterval(()=>{

if(currentScene===2 || currentScene===5){

createConfetti(60);

}

},8000);

// ==========================================
// SECRET EASTER EGG
// ==========================================

let tapCount=0;

document.body.addEventListener("click",()=>{

tapCount++;

if(tapCount===16){

alert("🎉 Secret Unlocked!\n\nYou're 16 today, Joshita! ❤️");

tapCount=0;

}

});

// ==========================================
// LONG PRESS MESSAGE
// ==========================================

let holdTimer;

document.body.addEventListener("touchstart",()=>{

holdTimer=setTimeout(()=>{

alert("💜 Wishing you endless happiness and success. Happy Birthday! 🎂");

},2000);

});

document.body.addEventListener("touchend",()=>{

clearTimeout(holdTimer);

});

// ==========================================
// AUTO SCENE TIMER
// ==========================================

let autoSlide;

function startAutoSlide(){

clearInterval(autoSlide);

autoSlide=setInterval(()=>{

if(currentScene>=2 && currentScene<5){

nextScene();

}

},9000);

}

startAutoSlide();

// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener("resize",()=>{

const fw=document.getElementById("fireworks-layer");

fw.width=window.innerWidth;

fw.height=window.innerHeight;

});

// ==========================================
// FINAL LOG
// ==========================================

console.log("🎉 Birthday Website Loaded Successfully!");