var player = {
    sprite:null,
    speed_x:0,
    speed_y:0,
    speed:0.5, 
    friction:0.95,
    shot:false,
    health:100,
    score:0,
    name:"player",
    update: function(){
    
    var dx = (game.input.mousePointer.x + game.camera.x) - this.sprite.x;
    var dy = (game.input.mousePointer.y + game.camera.y) - this.sprite.y;
    var angle = Math.atan2(dy,dx) - Math.PI/2;
    var dir = (angle - this.sprite.rotation) / (Math.PI * 2);
    dir -= Math.round(dir);
    dir = dir * Math.PI * 2;
    this.sprite.rotation += dir * 0.1;
    
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.UP)){
    this.speed_x += Math.cos(this.sprite.rotation + Math.PI/2) * this.speed;
    this.speed_y += Math.sin(this.sprite.rotation + Math.PI/2) * this.speed;
    }
    
    this.sprite.x += this.speed_x;
    this.sprite.y += this.speed_y;
    
    this.speed_x *= this.friction;
    this.speed_y *= this.friction;
    
    
    if(game.input.activePointer.leftButton.isDown && !this.shot){
    var speed_x = Math.cos(this.sprite.rotation + Math.PI/2) * 20;
    var speed_y = Math.sin(this.sprite.rotation + Math.PI/2) * 20;
    
    this.shot = true;
    
    socket.emit('shoot-bullet',{x:this.sprite.x,y:this.sprite.y,angle:this.sprite.rotation,speed_x:speed_x,speed_y:speed_y,id:socket.id})
    }
    if(!game.input.activePointer.leftButton.isDown) this.shot = false;
    
    
    if(this.sprite.alpha < 1){
    this.sprite.alpha += (1 - this.sprite.alpha) * 0.16;
    } else {
    
    }
    
    
    socket.emit('move-player',{x:this.sprite.x,y:this.sprite.y,angle:this.sprite.rotation})
    
    }
    
    
    };