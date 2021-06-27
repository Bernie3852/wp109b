# 本專案學習自
https://developer.mozilla.org/zh-TW/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

### 圖形繪製使用Canvas
設定繪製區塊
```js
<canvas id="myCanvas" width="960" height="640"></canvas>
```

### 將所有設定值以變數置於頂部，用以方便設定
```js
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var ballRadius = 10;
        var x = canvas.width / 2;
        var y = canvas.height - 30;
        var dx = 2;
        var dy = -2;
        var paddleHeight = 10;
        var paddleWidth = 50;
        var paddleX = (canvas.width - paddleWidth) / 2;
        var rightPressed = false;
        var leftPressed = false;
        var brickRowCount = 11;
        var brickColumnCount = 5;
        var brickWidth = 72;
        var brickHeight = 25;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        var score = 0;
        var lives = 3;
        var bricksColor = "#0095DD";
        var ballColor = "#00FFFF";
        var paddleColor = "#00DDFF";
```

### 磚塊設定
```js
        var bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
```

### 置入同步處理執行續，分別用於追蹤滑鼠動態
```js
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
```

### 滑鼠追蹤功能之實作
```js
function keyDownHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }
```

### 碰撞檢測功能實作，檢測磚塊的消滅及遊戲的勝利
```js
        function collisionDetection() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var b = bricks[c][r];
                    if (b.status == 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickRowCount * brickColumnCount) {
                                alert("YOU WIN, CONGRATS!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }
```

### 繪製功能實作，分別用於繪製球, 反彈版, 磚塊, 分數, 剩餘生命
```js
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = ballColor;
            ctx.fill();
            ctx.closePath();
        }
        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = paddleColor;
            ctx.fill();
            ctx.closePath();
        }
        function drawBricks() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = bricksColor;
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: " + score, 8, 20);
        }
        function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
        }
```

### 主程式內容，內含有失敗檢測以及反彈版之控制實作，總和以上其他內容便完成整個遊戲
```js
        function main() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            }
            else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                }
                else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            }
            else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx;
            y += dy;
            requestAnimationFrame(main);
        }
```
