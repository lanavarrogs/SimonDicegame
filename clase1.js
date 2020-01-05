
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar');
const lastLevel = 10
 
const audioCeleste = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
const audioVioleta = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
const audioVerde = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
const audioNaranja = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")

class Juego{
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        setTimeout(()=>this.nextLevel,500)
        this.nextLevel()
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.toogleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toogleBtnEmpezar(){
        if(btnEmpezar.classList .contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(lastLevel).fill(0).map(n => Math.floor(Math.random() *4))    
    }

    nextLevel(){
        this.subnivel=0;
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste'
            break;
            case 1:
                return 'naranja'
            break;
            case 2:
                return 'violeta'
            break;
            case 3:
                return 'verde'
            break;
        }
    }

    transformarColorANumero(numero){
        switch(numero){
            case 'celeste':
                return 0
            break;
            case 'naranja':
                return  1
            break;
            case 'violeta':
                return  2
            break;
            case 'verde':
                return  3
            break;
        }
    }

    iluminarSecuencia(){
        for(let i=0; i<this.nivel;i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            console.log(color)
            setTimeout(()=>this.iluminarColor(color),700*i) 
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=> this.apagarColor(color),500)
    }

    reproducirColor(color){
        switch(color){
            case 'celeste':
                audioCeleste.play()
            break;
            case 'violeta':
                audioVioleta.play()
            break;
            case 'verde':
                audioVerde.play()
            break;
            case 'naranja':
                audioNaranja.play()
            break;
        }
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click',this.elegirColor);
        this.colores.violeta.addEventListener('click',this.elegirColor);
        this.colores.naranja.addEventListener('click',this.elegirColor);
        this.colores.verde.addEventListener('click',this.elegirColor);
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor);
        this.colores.violeta.removeEventListener('click',this.elegirColor);
        this.colores.naranja.removeEventListener('click',this.elegirColor);
        this.colores.verde.removeEventListener('click',this.elegirColor);
    }

    elegirColor(ev){
        const nombre = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombre)
        this.iluminarColor(nombre)
        this.reproducirColor(nombre)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel===this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === this.lastLevel+1){
                    this.ganoElJuego()
                }else{
                    setTimeout(()=>this.nextLevel(),1000)
                }

            }
        }else{
            this.perdioElJuego()
        }
    }


    ganoElJuego(){
        swal('Ganaste!','','success').then(()=>{
            this.inicializar()
        })
    }

    perdioElJuego(){
        swal('Perdiste','','error').then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }


}



function empezarJuego(){
    var juego = new Juego()
 
}


