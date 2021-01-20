function create(){

    for(var i=0;i<=WORLD_SIZE.w/1100+1;i++){
    for(var j=0;j<=WORLD_SIZE.h/1016+1;j++){
    var tile_sprite = game.add.sprite(i * 1100, j * 1016, 'water');
    tile_sprite.anchor.setTo(0.5,0.5);
    tile_sprite.alpha = 0.5;
    water_tiles.push(tile_sprite);
    }
    }
    
                    game.stage.disableVisibilityChange = true;
    
                    text = game.add.text(  0, 0, "", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.anchor.set(0.5);
                    // Create player
                    var player_ship_type = String(getRandomInt(1,5));
                    player.sprite = game.add.sprite(Math.random() * WORLD_SIZE.w/2 + WORLD_SIZE.w/2,Math.random() * WORLD_SIZE.h/2 + WORLD_SIZE.h/2,'ship'+player_ship_type+'_1');
                    player.sprite.anchor.setTo(0.5,0.5);
                   
    
                    game.world.setBounds(0, 0, WORLD_SIZE.w, WORLD_SIZE.h);
    
                    game.camera.x = player.sprite.x - WINDOW_WIDTH/2;
                    game.camera.y = player.sprite.y - WINDOW_HEIGHT/2;
    
                    socket = io(); 
                    socket.emit('new-player',{x:player.sprite.x,y:player.sprite.y,angle:player.sprite.rotation,type:1,health:player.health,score:player.score,name:player.name})
  
              
                   
                    socket.on('update-players',function(players_data){
     
                        playerses = players_data;
                        var players_found = {};

                        for(var id in players_data){
 
                            if(other_players[id] == undefined && id != socket.id){ 
                                var data = players_data[id];
                                var p = CreateShip(data.type,data.x,data.y,data.angle);
                                other_players[id] = p;
                                console.log("Created new player at (" + data.x + ", " + data.y + ")");
                            }
                            players_found[id] = true;
                            
                            if(id != socket.id){
                              other_players[id].target_x  = players_data[id].x; 
                              other_players[id].target_y  = players_data[id].y;
                              other_players[id].target_rotation  = players_data[id].angle;
                            }
                            
                            
                        }
                       
                        for(var id in other_players){
                            if(!players_found[id]){
                                other_players[id].destroy();
                                delete other_players[id];
                            }
                        }
                       
                       
                    })
                  
    socket.on('bullets-update',function(server_bullet_array){
    for(var i=0;i<server_bullet_array.length;i++){
    if(bullet_array[i] == undefined){
    bullet_array[i] = game.add.sprite(server_bullet_array[i].x,server_bullet_array[i].y,'bullet');
    } else {
    bullet_array[i].x = server_bullet_array[i].x; 
    bullet_array[i].y = server_bullet_array[i].y;
    }
    }
    for(var i=server_bullet_array.length;i<bullet_array.length;i++){
    bullet_array[i].destroy();
    bullet_array.splice(i,1);
    
    i--;
    }
    
    })
                    
                  
                    socket.on('player-hit',function(id,server_bullet_array){
                        if(id == socket.id){
                            
                            
                            player.health-=10;
                            console.log(player.health)
                            player.sprite.alpha = 0;
                            
                            if(player.health === 0 ){
                                
                                
                                console.log("dead")
                               player.sprite.x = Math.random() * WORLD_SIZE.w/2 + WORLD_SIZE.w/2
                            player.sprite.y = Math.random() * WORLD_SIZE.h/2 + WORLD_SIZE.h/2
                            player.health = 100;
                            }
                            
                        } else {
                            other_players[id].alpha = 0;
                        }
                    })
                    
                }