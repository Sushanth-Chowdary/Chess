let side = "white";
for(let i = 0; i < 8; i++) {
    for(let j =a; j < h; j++){
        if((i + j) % 2 === 0){
            document.querySelector('.i .j').style.backgroundColor = side;
        } else {
            document.querySelector('.i .j').style.backgroundColor = "black";
        }
    }
}

