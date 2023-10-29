
(function () {
    const canva = document.querySelector('#cnv');
    const contexto = canva.getContext('2d');

    class Robo {
        constructor(image, posX, posY, width, height, velocidade) {
            this.image = image;
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
            this.velocidade = velocidade;
        }
        // Método para desenhar o robô no canvas
        desenharRobo() {
            contexto.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        }
    }
    // array das cores das imagens dos robos
    const roboCor = ['Azul', 'Roxo', 'Verde', 'Vermelho'];
    const roboCor2 = ['Amarelo', 'Branco', 'Rosa', 'Azul'];
    // Função para randomizar a imagem
    function randomRobo(images) {
        return images[Math.floor(Math.random() * images.length)];
    }

    // Desenhando os robos
    let imgRoboDireito = new Image();
    let imgRoboEsquerdo = new Image();

    // randomizando os robos ao iniciar a pagina
    imgRoboDireito.src = `../assets/images/roboDireito-${randomRobo(roboCor2)}.svg`
    imgRoboEsquerdo.src = `../assets/images/roboEsquerdo-${randomRobo(roboCor)}.svg`

    const elementoRoboEsquerdo = document.querySelector('#roboEsquerdo');
    elementoRoboEsquerdo.src = imgRoboEsquerdo.src;
    const elementoRoboDireito = document.querySelector('#roboDireito');
    elementoRoboDireito.src = imgRoboDireito.src;

    // randomizando os robos ao clicar no botao
    const rdRobo = document.querySelector('#randomRobo');
    rdRobo.addEventListener('click', () => {
        imgRoboDireito.src = `../assets/images/roboDireito-${randomRobo(roboCor2)}.svg`
        imgRoboEsquerdo.src = `../assets/images/roboEsquerdo-${randomRobo(roboCor)}.svg`
        elementoRoboEsquerdo.src = imgRoboEsquerdo.src;
        elementoRoboDireito.src = imgRoboDireito.src;
        imgVencedor.src = elementoRoboEsquerdo.src;
        imgVencedor.src = elementoRoboDireito.src;
    })

    const robos = [];

    // criando os robos
    const roboEsquerdo = new Robo(imgRoboEsquerdo, 0, 0, 120, 120, 5);
    robos.push(roboEsquerdo);
    const roboDireito = new Robo(imgRoboDireito, 1300, 500, 115, 115, 5);
    robos.push(roboDireito);

    //  criando os obstaculos
    const obstaculo = function (posX, posY, width, height, color, velocidade) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocidade = velocidade;
    }
    const obstaculos = [];
    // Criando os obstaculos
    const obstaculo1 = new obstaculo(120, 120, 350, 50, "rgba(220, 223, 226, 0.548)", 0);
    obstaculos.push(obstaculo1);
    const obstaculo2 = new obstaculo(380, 330, 200, 50, "rgba(220, 223, 226, 0.548)", 0);
    obstaculos.push(obstaculo2);
    const obstaculo3 = new obstaculo(800, 220, 90, 50, "rgba(220, 223, 226, 0.548)", 0);
    obstaculos.push(obstaculo3);
    const obstaculo4 = new obstaculo(1000, 50, 180, 50, "rgba(220, 223, 226, 0.548)", 0);
    obstaculos.push(obstaculo4);
    const obstaculo5 = new obstaculo(1000, 420, 50, 50, "rgba(220, 223, 226, 0.548)", 0);
    obstaculos.push(obstaculo5);
    //movimentos das setas
    let moveLeft = false;
    let moveUp = false;
    let moveRight = false;
    let moveDown = false;

    // pressionar as setas
    window.addEventListener('keydown', function (e) {
        const nomeKey = e.key;
        // console.log(nomeKey);
        switch (nomeKey) {
            case 'ArrowLeft':
                moveLeft = true;
                break;
            case 'ArrowUp':
                moveUp = true;
                break;
            case 'ArrowRight':
                moveRight = true;
                break;
            case 'ArrowDown':
                moveDown = true;
                break;
        }
    });

    //soltar as setas
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        switch (key) {
            case 'ArrowLeft':
                moveLeft = false;
                break;
            case 'ArrowUp':
                moveUp = false;
                break;
            case 'ArrowRight':
                moveRight = false;
                break;
            case 'ArrowDown':
                moveDown = false;
                break;
        }
    });

    // movimentos do AWSD
    let moveLeftA = false;
    let moveUpW = false;
    let moveRightD = false;
    let moveDownS = false;

    //  apertando as teclas awsd
    window.addEventListener('keydown', function (e) {
        const nomeKeyLetra = e.key;
        // console.log(nomeKeyLetra);
        switch (nomeKeyLetra) {
            case 'a':
            case 'A':
                moveLeftA = true;
                break;
            case 'w':
            case 'W':
                moveUpW = true;
                break;
            case 'd':
            case 'D':
                moveRightD = true;
                break;

            case 's':
            case 'S':
                moveDownS = true;
                break;
        }
    });

    //  soltando as teclas aswd
    window.addEventListener('keyup', (e) => {
        const keyLetra = e.key;
        switch (keyLetra) {
            case 'a':
            case 'A':
                moveLeftA = false;
                break;
            case 'w':
            case 'W':
                moveUpW = false;
                break;
            case 'd':
            case 'D':
                moveRightD = false;
                break;
            case 's':
            case 'S':
                moveDownS = false;
                break;
        }
    });

    // Movendo as setas - robo direito
    function moverRoboDireito() {

        if (fimJogo) {
            return;
            // parando o jogo no final das 5 colisoes
        }
        if (moveLeft) {
            roboDireito.posX -= roboDireito.velocidade;
        }
        if (moveRight) {
            roboDireito.posX += roboDireito.velocidade;
        }
        if (moveUp) {
            roboDireito.posY -= roboDireito.velocidade;
        }
        if (moveDown) {
            roboDireito.posY += roboDireito.velocidade;
        }
        let colidiu = false;
        // checando a colisao entre os robos e os obstaculos ou entre os robos
        for (const obstaculo of obstaculos) {
            if (roboDireito.posX < obstaculo.posX + obstaculo.width &&
                roboDireito.posX + roboDireito.width > obstaculo.posX &&
                roboDireito.posY < obstaculo.posY + obstaculo.height &&
                roboDireito.posY + roboDireito.height > obstaculo.posY) {
                colidiu = true;
                // reverter o movimento em caso de colisao
                if (moveLeft) roboDireito.posX += roboDireito.velocidade;
                if (moveRight) roboDireito.posX -= roboDireito.velocidade;
                if (moveUp) roboDireito.posY += roboDireito.velocidade;
                if (moveDown) roboDireito.posY -= roboDireito.velocidade;

            }
            if (colidiu) {
                return false;
            }
        }
        for (const {} of robos) {
            if (roboEsquerdo.posX < roboDireito.posX + roboDireito.width &&
                roboEsquerdo.posX + roboEsquerdo.width > roboDireito.posX &&
                roboEsquerdo.posY < roboDireito.posY + roboDireito.height &&
                roboEsquerdo.posY + roboEsquerdo.height > roboDireito.posY) {
                colidiu = true;
                if (moveLeftA) roboEsquerdo.posX += roboEsquerdo.velocidade;
                if (moveRightD) roboEsquerdo.posX -= roboEsquerdo.velocidade;
                if (moveUpW) roboEsquerdo.posY += roboEsquerdo.velocidade;
                if (moveDownS) roboEsquerdo.posY -= roboEsquerdo.velocidade;

                // em caso de colisaõ entre os robos, chamar o combate
                combate();
            }
        }
        if (colidiu) {
            return false;
        }
        roboDireito.posX = Math.max(0, Math.min(canva.width - roboDireito.width, roboDireito.posX));
        roboDireito.posY = Math.max(0, Math.min(canva.height - roboDireito.height, roboDireito.posY));

    }

    // Movendo as teclas awsd - robo esquerdo
    function moverRoboEsquerdo() {
        if (fimJogo) {
            return;
            // parando o jogo no final das 5 colisoes
        }
        if (moveLeftA) {
            roboEsquerdo.posX -= roboEsquerdo.velocidade;
        }
        if (moveRightD) {
            roboEsquerdo.posX += roboEsquerdo.velocidade;
        }
        if (moveUpW) {
            roboEsquerdo.posY -= roboEsquerdo.velocidade;
        }
        if (moveDownS) {
            roboEsquerdo.posY += roboEsquerdo.velocidade;
        }
        let colidiu = false;
        // checando a colisao entre os robos e os obstaculos ou entre os robos
        for (const obstaculo of obstaculos) {
            if (roboEsquerdo.posX < obstaculo.posX + obstaculo.width &&
                roboEsquerdo.posX + roboEsquerdo.width > obstaculo.posX &&
                roboEsquerdo.posY < obstaculo.posY + obstaculo.height &&
                roboEsquerdo.posY + roboEsquerdo.height > obstaculo.posY) {
                colidiu = true;
                // reverter o movimento em caso de colisao
                if (moveLeftA) roboEsquerdo.posX += roboEsquerdo.velocidade;
                if (moveRightD) roboEsquerdo.posX -= roboEsquerdo.velocidade;
                if (moveUpW) roboEsquerdo.posY += roboEsquerdo.velocidade;
                if (moveDownS) roboEsquerdo.posY -= roboEsquerdo.velocidade;

            }
        }
        for (const {} of robos) {
            if (roboEsquerdo.posX < roboDireito.posX + roboDireito.width &&
                roboEsquerdo.posX + roboEsquerdo.width > roboDireito.posX &&
                roboEsquerdo.posY < roboDireito.posY + roboDireito.height &&
                roboEsquerdo.posY + roboEsquerdo.height > roboDireito.posY) {
                colidiu = true;
                if (moveLeftA) roboEsquerdo.posX += roboEsquerdo.velocidade;
                if (moveRightD) roboEsquerdo.posX -= roboEsquerdo.velocidade;
                if (moveUpW) roboEsquerdo.posY += roboEsquerdo.velocidade;
                if (moveDownS) roboEsquerdo.posY -= roboEsquerdo.velocidade;

                // em caso de colisão entre os robos, chamar o combate
                combate();
            }
            if (colidiu) {
                return false;
            }
            roboEsquerdo.posX = Math.max(0, Math.min(canva.width - roboEsquerdo.width, roboEsquerdo.posX));
            roboEsquerdo.posY = Math.max(0, Math.min(canva.height - roboEsquerdo.height, roboEsquerdo.posY));
        }

    }

    let colisoes = Number(document.querySelector('#colisoes').textContent);
    let fimJogo = false;

    function combate() {
        // realizando o combate após a colisao entre os robos
        let vidaPlayer1 = Number(document.querySelector('#vidaPlayer1').textContent);
        let vidaPlayer2 = Number(document.querySelector('#vidaPlayer2').textContent);
        let barraVida1 = document.querySelector('.vida1');
        let barraVida2 = document.querySelector('.vida2');
        let vencedor = null;
        let dano1 = Math.floor(Math.random() * 21);
        let dano2 = Math.floor(Math.random() * 21);

        vidaPlayer1 -= dano1;
        vidaPlayer2 -= dano2;
        console.log('dano: ', dano1, dano2);

        roboDireito.posX = 1300;
        roboDireito.posY = 500;
        roboEsquerdo.posX = 0;
        roboEsquerdo.posY = 0;

        colisoes++;
        console.log('colisoes', colisoes);
        if (colisoes == 5) {
            if (vidaPlayer1 > vidaPlayer2) {
                vencedor = 'Player 1';
            } else {
                vencedor = 'Player 2';
            }
            fimJogo = true;

            // abrindo o modal do vencedor
            let modal = new bootstrap.Modal(document.getElementById('vencedorModal'));
            // alterando o modal de acordo com o vencedor
            if (vencedor === 'Player 1') {
                let imgVencedor = document.querySelector('#imgVencedor');
                imgVencedor.src = elementoRoboEsquerdo.src;
                document.querySelector('#player').textContent = 'Player 1';
                modal.show();

            } else if (vencedor === 'Player 2') {
                let imgVencedor = document.querySelector('#imgVencedor');
                imgVencedor.src = elementoRoboDireito.src;
                document.querySelector('#player').textContent = 'Player 2';
                modal.show();
            }
        }
        // atualizando os valores
        document.querySelector('#colisoes').textContent = colisoes;
        document.querySelector('#vidaPlayer1').textContent = vidaPlayer1;
        document.querySelector('#vidaPlayer2').textContent = vidaPlayer2;
        barraVida1.style.width = `${vidaPlayer1}%`;
        barraVida2.style.width = `${vidaPlayer2}%`;
    }

    // desenhando o jogo
    function desenharJogo() {
        contexto.clearRect(0, 0, canva.width, canva.height);
        for (const i in obstaculos) {
            const spr = obstaculos[i];
            contexto.fillStyle = spr.color;
            contexto.fillRect(spr.posX, spr.posY, spr.width, spr.height);
        }
        for (const i in robos) {
            const robo = robos[i];
            robo.desenharRobo();
        }
    }

    // Função para atualizar o jogo
    function atualizarJogo() {
        window.requestAnimationFrame(atualizarJogo, canva);
        desenharJogo();
        moverRoboEsquerdo();
        moverRoboDireito();
    }
    // Iniciar o jogo
    atualizarJogo();
}());