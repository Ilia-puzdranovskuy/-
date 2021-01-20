var ASSET_URL = "assets/"

var WINDOW_WIDTH = 1920;
var WINDOW_HEIGHT = 940;
var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, '', {preload:preload, create:create, update:GameLoop} );

var WORLD_SIZE = {w:3000,h:3000};


var water_tiles = [];
            var bullet_array = [];
          
            var socket; 
            var other_players = {};
            var playerses;
         


function CreateShip(type,x,y,angle){
var sprite = game.add.sprite(x,y,'ship' + String(type) + '_1');
sprite.rotation = angle;
sprite.anchor.setTo(0.5,0.5);
return sprite;
}


function preload(){
game.load.crossOrigin = "Anonymous";
game.stage.backgroundColor = "#3399DA";


for(var i=1;i<=6;i++){
game.load.image('ship'+String(i) +'_1', ASSET_URL + 'ship'+String(i)+'_1.png');

}

game.load.image('bullet', ASSET_URL + 'cannon_ball.png');
game.load.image('water', ASSET_URL + 'water_tile.jpg');
}
function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let text;
                var style = { font: "bold 15px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

function GameLoop(){
player.update();

var camera_x = player.sprite.x - WINDOW_WIDTH/2;
var camera_y = player.sprite.y - WINDOW_HEIGHT/2;
game.camera.x += (camera_x - game.camera.x) * 0.08;
game.camera.y += (camera_y - game.camera.y) * 0.08;


for(var id in other_players){
if(other_players[id].alpha < 1){
other_players[id].alpha += (1 - other_players[id].alpha) * 0.16;
} else {
other_players[id].alpha = 1;
}
}


for(var id in other_players){
var p = other_players[id];
if(p.target_x != undefined){
p.x += (p.target_x - p.x) * 0.16;
p.y += (p.target_y - p.y) * 0.16;
var angle = p.target_rotation;
var dir = (angle - p.rotation) / (Math.PI * 2);
dir -= Math.round(dir);
dir = dir * Math.PI * 2;
p.rotation += dir * 0.16;
}
}
let scr = [];
let scr1 = "";

for( key in playerses){
let value = playerses[key];
let val = key;
for( key in value){
if(key=="score"){
scr.push({
id:value.name,
score:value.score
})
}

}

}
scr.sort(function (a, b) {
if (a.score > b.score) {
return -1;
}
if (a.score < b.score) {
return 1;
}

return 0;
});
for(i=0;i<scr.length;i++){
scr1 +=(i+1)+"  " + scr[i].id+"  "+ scr[i].score + "\n"

}
text.setText(scr1);
text.x =  game.camera.x+100;
text.y = game.camera.y+50;
}


