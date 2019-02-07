let input = {
    left: false,
    right: false,
    jump: false,
    duck: false,
};

let player = {
    x: 0,
    y: 0
};

let canvas = document.getElementById("view");
let ctx = canvas.getContext("2d");

let heartImage = null;

let img = new Image();   // Create new img element
img.addEventListener("load", function() {
    heartImage = img;
  // execute drawImage statements here
}, false);
img.src = "heart.png"; // Set source path

window.addEventListener("keydown", function(e) {
    if(e.key == "a") {
        input.left = true;
    } else if(e.key == "d"){
        input.right = true;
    } else if(e.key == "w") {
        input.jump = true;
    } else if(e.key == "s") {
        input.duck = true;
    }
});

window.addEventListener("keyup", function(e) {
    if(e.key == "a") {
        input.left = false;
    } else if(e.key == "d"){
        input.right = false;
    } else if(e.key == "w") {
        input.jump = false;
    } else if(e.key == "s") {
        input.duck = false;
    }
});

function processInput() {
    if(input.left) {
        player.x -= 4;
        console.log("Left");
    } //else
     if(input.right) {
        player.x += 4;
        console.log("Right");
    } //else
     if(input.jump) {
        player.y -= 4;
        console.log("Jump");
    } //else 
    if(input.duck) {
        player.y += 5;
        console.log("Jump");
    } //else {
        //console.log("Nothing");
    //}
}

function update () {

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //ctx.fillStyle = "red";
    //ctx.fillRect(player.x, player.y, 32, 32);

    if(!heartImage) {
        return;
    }

    ctx.drawImage(heartImage, player.x, player.y);
}

function loop() {
    processInput();
    update();
    draw();

    requestAnimationFrame(loop);
}

loop();