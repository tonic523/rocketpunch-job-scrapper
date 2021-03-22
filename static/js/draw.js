function drawBall(color) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleWidth);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status >= 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(bricks[c][r].status == 2) {
                    ctx.fillStyle = "black";
                }else{
                    ctx.fillStyle = "gray";
                }               
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawLeftoverBricks() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("남은 갯수: "+totalBricks, 8, 20);    
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);   
}

function drawBackground() {
    ctx.fillStyle = '#CA9B89';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 지울 부분(from x, from y,to x, to y)
    drawBackground() 
    drawBricks();
    drawBall(color);
    drawPaddle();
    drawLeftoverBricks();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        color = colors[Math.floor(Math.random() * 4)];
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius-paddleHeight+5) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(x < paddleX + 20){
                if (dx  > 0) {
                    dx = -dx;
                }
                dx = -4;
            }else if(x < paddleX + 40){
                if (dx  > 0) {
                    dx = -dx;
                }
                dx = -2;
            }
            else if(x < paddleX + 60){
                if (dx  < 0) {
                    dx = -dx;
                }
                dx = 2;
            }else{
                if (dx  < 0) {
                    dx = -dx;
                }
                dx = 4;
            }   
            dy = -dy;
        }
        else {
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
            else {
                lives --;
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy; 
    requestAnimationFrame(draw);           
}