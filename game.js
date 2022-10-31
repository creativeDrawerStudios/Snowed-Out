const es = new Es(720,480);
//Player
let player = {x:320,y:120,w:50,h:50}
let project = {acc:1,onGround:false,images:{player_still:document.getElementById("player_still"),player_left:document.getElementById("player_left"),player_right:document.getElementById("player_right")},
              anim:0,snowIntensity:10, hitboxActive:false};
let fall = setInterval(onFall,1);
let anim = setInterval(onFrame,100);;
let leftKeyPresed = false;
let rightKeyPressed = false;
function onFall(){
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);
    playerMove();
    if(checkAllCol()){
        project.acc = -0.1;
        player.y -=0.0001;
    }
    else{
        project.acc += 0.01;
        player.y += project.acc;
    }
}
function onFrame(){
    if(leftKeyPressed||rightKeyPressed){
        if(project.anim == 0){project.anim = 1;}
        else if(project.anim == 1){project.anim = 2;}
        else if(project.anim == 2){project.anim = 3;}
        else{project.anim = 0;}
    }
    else{project.anim = 0;}
}
function checkAllCol(){
    if(es.checkCollisions(player.x,player.y,player.w,player.h,0,470,700,10)){return true;}
}
//Just a whole buch of garbage to get the movement working correctly
function keyPressed(evt){if(evt.keyCode == 37){leftKeyPressed = true;};if(evt.keyCode == 39){rightKeyPressed = true;};}
function keyReleased(evt){if(evt.keyCode == 37){leftKeyPressed = false;};if(evt.keyCode == 39){rightKeyPressed = false;};}
function playerMove(){if(leftKeyPressed){player.x--;};if(rightKeyPressed){player.x ++;};}
document.addEventListener('keydown',function (evt){
    if(event.keyCode == 32&&project.onGround == true){
        project.acc = -1.2;
        player.y -=1.2;
        if(project.onGround == true){
            project.acc = -1.2;
            player.y -=1.2;
        }
    }
    if(event.keyCode == 68){
        if(project.hitboxActive){
            project.hitboxActive = false;
        }
        else{
            project.hitboxActive = true;
        }
    }
});
//Snow
var angle = 0;
var W = canvas.width;
var H = canvas.height;  
var mp = 100;//max particles
var particles = [];
for(var i = 0; i < mp; i++){
    particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*4+1,
        d: Math.random()*mp
    });
}
function drawSnow(){for(var i = 0; i < mp; i++){var p = particles[i];es.eclipse(p.x,p.y,p.r,"#ffffff",0.5);}update();}
function update(){
    angle += 0.01;
    for(var i = 0; i < mp; i++){
        var p = particles[i];
        p.y += Math.cos(angle+p.d) + 1 + p.r/2;
        p.x += Math.sin(angle) * 2;
        if(p.x > W+5 || p.x < -5 || p.y > H){
            if(i%3 > 0){particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};}
            else{
                if(Math.sin(angle) > 0){particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};}
                else{particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};}
            }
        }
    }
}
//Main
function text(){es.text("Snowed Out",10,50,"#ffffff");es.text("Private test v0.0.1",10,70,"#ffffff",0.5);es.text("Acceleration:"+project.acc,10,90,"#ffffff",0.2);es.text("OnGround:"+project.onGround,10,110,"#ffffff",0.1);}
function redraw(anim){
    es.background("#000000");
    text();
    es.rect(0,470,720,10,"#ffffff");
    // The player animation frames.
    if(anim == 0){es.image(project.images.player_still,player.x-25,player.y-40,100,100);}
    if(anim == 1){es.image(project.images.player_left,player.x-25,player.y-40,100,100);}
    if(anim == 2){es.image(project.images.player_still,player.x-25,player.y-40,100,100);}
    if(anim == 3){es.image(project.images.player_right,player.x-25,player.y-40,100,100);}
    if(project.hitboxActive){
        es.rect(player.x,player.y,player.w,player.h,"#ffffff",0.5);
    }
    drawSnow();
}
window.main = function(){
    window.requestAnimationFrame( main );
    redraw(project.anim);
    if(project.acc == -0.1){
        project.onGround = true;
    }
    else{
        project.onGround = false;
    }
};main();
