const canvas = document.querySelector('#canvas');
const context = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

let player1 = {
    x: 10,
    y: 220,
    dy: 5,
}

let player2 = {
    x: 570,
    y: 220,
    dy: 5,
}

let ball = {
    x: 300,
    y: 250,
    dx: 7,
    dy: 2,
    radius: 10,
}

let player1Diraction = '';
let player2Diraction = '';

let player1Score = 0;
let player2Score = 0;

function moveFisrtPlayer() {
    document.addEventListener('keydown', (e) => {
        if(event.keyCode === 83) {
            player1Diraction = 'down';
        } else if(event.keyCode === 87) {
            player1Diraction = 'up';
        }
    })
    
    document.addEventListener('keyup', (e) => {
        if (event.keyCode === 83) {
            player1Diraction = '';
        } else if(event.keyCode === 87) {
            player1Diraction = '';
        }
    })
}

function moveSecondPlayer() {
    document.addEventListener('keydown', (e) => {
        if(event.keyCode === 12) {
            player2Diraction = 'down';
        } else if(event.keyCode === 38) {
            player2Diraction = 'up';
        }
    })
    
    document.addEventListener('keyup', (e) => {
        if (event.keyCode === 12) {
            player2Diraction = '';
        } else if(event.keyCode === 38) {
            player2Diraction = '';
        }
    })
}

function update() {
    move();
    checkCollision();
    moveFisrtPlayer();
    moveSecondPlayer();
    ballMove();
    updateScore();

}

function move() {
    if(player1Diraction === 'up') {
        player1.y -= player1.dy;
    } else if(player1Diraction === 'down') {
        player1.y += player1.dy;
    }

    if(player2Diraction === 'up') {
        player2.y -= player1.dy;
    } else if(player2Diraction === 'down') {
        player2.y += player1.dy;
    }
}

function checkCollision() {
    if(player1.y <= 0) {
        player1.y = 0;
    } else if(player1.y + 60 >= 500) {
        player1.y = 440;
    }

    if(player2.y <= 0) {
        player2.y = 0;
    } else if(player2.y + 60 >= 500) {
        player2.y = 440;
    }

}

function updateScore() {
    if(ball.x <= 0) player2Score += 1;
    if(ball.x + 10 >= 600) player1Score += 1;
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32) {
        ballMove();
    }
})

function ballMove() {
    ball.x += ball.dx;
    ball.y -= ball.dy;

    //Стены 
    if(ball.x >= 590 || ball.x <= 0) ball.dx = -ball.dx;
    if(ball.y <= 0 || ball.y >= 490) ball.dy = -ball.dy;
    
    
    if(ball.x <= player1.x + 20
        && ball.y >= player1.y
        && ball.y + 5 <= player1.y + 60) {
            ball.dx = -ball.dx;
        }

    if(ball.x >= player2.x - 5 
        && ball.y >= player2.y
        && ball.y + 10 <= player2.y + 60) {
            ball.dx = -ball.dx;
        } 
 
}


function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    context.rect(player1.x, player1.y, 20, 60);
    context.rect(player2.x, player2.y, 20, 60);

    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);

    context.font = "35px Arial";
    context.fillText(player1Score, 30, 50);
    context.fillText(player2Score, 550, 50)

    context.fillStyle = "#423653";
    context.fill();
    context.closePath();

    
}

