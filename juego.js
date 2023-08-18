const Cartas=["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
const Palos=["P","C","D","T"]
let car = []
let cartasimg = []
var l=0
let puntos=0
let puntos1=0
var lta=0
var jugador=0
var g=0
var op=0
var dinero = localStorage.getItem("Dinero");
var d = 0
var ficha = 0
function Canvas(){
    for(i=1; i<53; i++){
        var carta ="./maso_imagenes/"+i+".jpg";
        cartasimg.push(carta)  
    }
    for (i=0; i<Palos.length; i++){
        for(j=0;j<Cartas.length; j++){
            var maso ={Palo:Palos[i],valor:Cartas[j],carta:cartasimg[l]};
            car.push(maso)
            l=l+1        
        }     
    }
}
function Sacar_Carta(){
    document.getElementById("fichas").style.visibility ="hidden";
    document.getElementById("doblar").style.visibility ="visible";
    document.getElementById("apuesta").style.visibility ="hidden";
    document.getElementById("jugador1").style.visibility ="visible";
    document.getElementById("jugador2").style.visibility ="visible";
    document.getElementById("iniciar").style.visibility ="hidden";
    const ltf=car[Math.floor(Math.random()*car.length)];
    lta = ltf
    const filter = car.filter(car => car !== ltf )
    car = filter
    if(op == 0){
        Iniciar()  
    }
    else if(op == 1){
        carta()
    }else if(op == 3){
        carta2()      
    }
    d=d+1  
}
function CrearDiner(){
    if((document.getElementById("d").value)==""  || (document.getElementById("d").value)<1 ){
        alert("debe escribir un valor mayor a 0")
        location.reload(true);    
    }
    else{
        var diner = parseInt(document.getElementById("d").value)
        dinero = localStorage.getItem("Dinero");
        if(dinero == null){
        localStorage.setItem("Dinero",diner)
        }
        else{
            dinero = parseFloat(dinero) + diner
            localStorage.setItem("Dinero",dinero)
        }
        Dinero()
    }   
}
function ActualizarDinero(){
    localStorage.setItem("Dinero",dinero)
    Dinero()
}       
function Dinero(){
    document.getElementById("dinero").innerHTML ='$:'+(localStorage.getItem("Dinero"));
}
function EliminarDinero(){
    localStorage.removeItem("Dinero")
    location.reload(true);
}
function Iniciar(){
    if(jugador == 0) {
        document.getElementById("carta2").innerHTML +='<a><img src="'+lta.carta+'"></a>';
        jugador = 2
        op = 1
        Puntos()
        document.getElementById("apostando").innerHTML = '$:'+ficha
         if (ficha>localStorage.getItem("Dinero")){
            alert("No puedes apostar mas de lo que tienes")
            console.log(ficha)
            location.reload(true);
        }
        else if(ficha==0){
            alert("Debes apostar para poder iniciar")
            location.reload(true);
        }
        else if(isNaN(localStorage.getItem("Dinero"))){
            alert("No tienes dinero")
            console.log(ficha)
            location.reload(true);
        }
        else{
            dinero = localStorage.getItem("Dinero") - ficha
            ActualizarDinero()  
        }
    }        
}
function carta(){
    document.getElementById("carta").innerHTML +='<a><img src="'+lta.carta+'"></a>';
    jugador = 1
    Puntos()   
}
function carta2(){
    if(g<1){
        g=g+1
        op = 3
        Sacar_Carta()     
    }
    else if(puntos<17 || puntos <22 & puntos<puntos1){
        document.getElementById("carta2").innerHTML +='<a><img src="'+lta.carta+'" width="100px" height="150px"></a>';
        jugador = 2
        Puntos()    
    }else{
        Ganador()
    }
}    
function Puntos(){
    if(lta.valor =="J" ||lta.valor =="Q"||lta.valor =="K"){
        lta.valor=10
    }
    if(jugador == 1){ 
        if(lta.valor =="A"){
            if(puntos1<11){
                lta.valor=11
            }else{
                lta.valor = 1
            }
        } 
        puntos1 = lta.valor+puntos1
        document.getElementById("puntos").innerHTML = puntos1
    }
    else if(jugador == 2){
        if(lta.valor == "A"){
            if(puntos<11){
                lta.valor=11
            }else{
                lta.valor = 1
            }  
        } 
        puntos = lta.valor+puntos
        document.getElementById("puntos1").innerHTML = puntos
        Sacar_Carta()
    } 
}
function Doblar(){
    if(puntos1 == 21){
        alert("Ya no pudes doblar has ganado")
    }
    if(localStorage.getItem("Dinero")<ficha){
        alert("No puedes doblar, no te queda dinero suficiente")
    }
    else if(d==3){
        dinero = dinero-ficha
        ficha = ficha*2 
        d=d+1
        ActualizarDinero()
    }
    else if(d>3){
        alert("Solo puedes doblar 1 sola vez en la segunda carta")
    }
    else{
        alert("Aun no puedes doblar")
    }
    document.getElementById("apostando").innerHTML = '$:'+ficha     
}
const modal_container = document.getElementById("modal_container") 
function Ganador(){
    if(puntos1>21){
        createModal("<h2>Has perdido...Te has pasado de puntos</h2>")
    }else if(puntos1 == 21){
        createModal("<h2>Blackjack!!! Has ganado!</h2>")
    }else if(puntos>21){
        createModal("<h2>Has ganado!!! El croupier se ha pasado de puntos</h2>")
    }else if(puntos<puntos1){
        createModal("<h2>Has ganado!!!</h2>")    
    }else if(puntos == 21){
        createModal("<h2>Blackjack!!! Ha ganado el croupier!</h2>")
    }else if(puntos == puntos1 ){
        createModal("<h2><b>Empate!!!</h2>")
    }else{
        createModal("<h2>Ha ganado el croupier...</h2>")
    }
    document.getElementById("jugador1").disabled = true;
    document.getElementById("jugador2").disabled = true;
    document.getElementById("reset").style.visibility ="visible";
    Apuesta();
}
function createModal  (content, style = "modal-desdeArriba"){
    modal_container.innerHTML = `
        <div class="modal" id="modal">
        <div class="modal-content ${style}">
            ${content}
            <button class="modal-btn-closed" id="modal_btn_closed">x</button>
        </div>
        +
        </div>
    `;
    document.getElementById("modal").addEventListener("click", (e) => {
        if (e.target.id === "modal" || e.target.id === "modal_btn_closed") {
        modal_container.innerHTML = ""
        }
    })
}
function Apuesta(){
    if(puntos1>21){
        dinero = dinero 
    }else if(puntos1 == 21){
        dinero = parseInt(dinero) + parseInt(ficha*3)
    }else if(puntos>21){
        dinero = parseInt(dinero) + parseInt(ficha*2)
    }else if(puntos<puntos1){    
        dinero = parseInt(dinero) + parseInt(ficha*2)
    }else if(puntos == 21){
        dinero = dinero
    }else if(puntos == puntos1 ){
        dinero = dinero + ficha
    }else{
        dinero = dinero 
    }
    ActualizarDinero()
}
function Reinicio() {
	location.reload(true);
}
function ficha1(){
    var f=parseInt(document.getElementById("ficha1").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha 
}        
function ficha2(){
    var f=parseInt(document.getElementById("ficha2").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha    
}
function ficha3(){
    var f=parseInt(document.getElementById("ficha3").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha     
}
function ficha4(){
    var f=parseInt(document.getElementById("ficha4").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha   
}
function ficha5(){
    var f=parseInt(document.getElementById("ficha5").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha     
}
function ficha6(){
    var f=parseInt(document.getElementById("ficha6").innerHTML);
    ficha = f+ficha
    document.getElementById("apostando").innerHTML = '$:'+ficha    
}
