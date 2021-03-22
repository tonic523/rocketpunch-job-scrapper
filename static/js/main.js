var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
///////공////////
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var color = "#0095DD";
var colors = ["red", "yellow", "green", "blue"];
///////패들//////////
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
///////벽돌//////////
var brickRowCount = 5; // 벽돌 행 갯수
var brickColumnCount = 6; // 벽돌 열 갯수
var brickWidth = 75; // 벽돌 가로길이
var brickHeight = 20; // 벽돌 세로 길이
var brickPadding = 10; // 벽돌사이 간격
var brickOffsetTop = 30; // 캔버스 모서리와의 간격
var brickOffsetLeft = 30; // 캔버스 모서리와의 간격
var bricks = [];
var totalBricks = 0;

// 남은 목숨
var lives = 1;

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: Math.floor(Math.random() * 3) };
        totalBricks += bricks[c][r].status;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status >= 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status -= 1;
                    totalBricks--;
                    if (totalBricks == 0) {
                        alert("축하드립니다. 통과하셨어요!!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}
draw();
    // 10ms마다 draw 함수를 실행