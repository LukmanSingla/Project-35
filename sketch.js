var pet,database,petImg,petImg2,petposition,foodN=20,game="wait",a;

function preload(){
    petImg=loadAnimation("images/dogImg.png");
    petImg2=loadAnimation("images/dogImg1.png");
}
function setup(){
    createCanvas(500,500);
    pet = createSprite(250,250,10,10);
    pet.addAnimation("pet",petImg);
    pet.addAnimation("pet1",petImg2);
    pet.scale=0.2;
    database=firebase.database();
    reference=database.ref("Pet/");
    reference.on("value",readPosition);
    pet.shapeColor = "red";
}

function draw(){
    background("green");
    fill("white");
    textSize(20);
    text("Food Remaining :" + foodN,150,150);
    text("Note : Press UP_ARROW key to feed drago milk",50,20);
    if(petposition != undefined && game=="play") {if(keyDown(UP_ARROW)){
        writePosition(1);
        pet.changeAnimation("pet",petImg);
        game="wait";
    }}
    if(game=="wait" && frameCount%60==0 ){
        pet.changeAnimation("pet1",petImg2);
        game="play"; 
        }
    if(foodN==0){
        game="end";
        text("Game Over Press space to continue",50,50);
        if(keyCode === 32){
            game="play";
           writePosition(-20);
        }
    }
    drawSprites();
}
function readPosition(data){
    petposition=data.val();
    foodN=petposition.food;
}

function writePosition(no){
    reference.set(
        {
            food:foodN-no
        }
    );
}