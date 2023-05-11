let numero;
let time;
let skillsp1
let skillsp2






let characters = [
  {
    character: "Martinez",
    nombre: "player1",
    imagen: "assets/martinez.png",
    poder: 7,
    habilidades: [
      {
        nombre: "Himno",
        stats: 1.2,
        tipo: "boost",
       
      },
      {
        nombre: "Trabucazo",
        stats: 2.5,
        tipo: "ataque",
      },
      {
        nombre: "Salmo",
        stats: 20,
        tipo: "curacion",
      },
      {
        nombre: "Machetazo",
        stats: 2.5,
        tipo: "ataque",
      },
    ],
    enemigo: "player2",
    
  },
  {
    character: "King",
    nombre: "player2",
    imagen: "assets/king.png",
    poder: 7,

    habilidades: [
      {
        nombre: "sanadora",
        stats: 20,
        tipo: "curacion",
      },
      {
        nombre: "puño",
        stats: 2.5,
        tipo: "ataque",
      },
      {
        nombre: "Cabezaso",
        stats: 2.5,
        tipo: "ataque",
      },
      {
        nombre: "Concentracion",
        stats: 1.2,
        tipo: "boost",
      },
    ],
   
   
    enemigo: "player1",

    maxenemyattack:(
      
    )=>{  
      let maximo = 0    
 characters[0].habilidades.forEach(habilidad=> {
 
     if(habilidad.tipo === 'ataque'){
      maximo < habilidad.stats ?  maximo = habilidad.stats : maximo = maximo

     }
    });
    return maximo
    },
    maxmyattack:(
      
      )=>{  
        let maximo = 0
        let i = 0    
   characters[1].habilidades.forEach((habilidad,index)  => {
   
       if(habilidad.tipo === 'ataque'){
        console.log(habilidad.stats + '' + index)
      if(maximo<habilidad.stats){
        maximo = habilidad.stats
        i = index
      }
        
       }
       
      });
      return [maximo,i]
      },
    inteligencia: (myLife,hisLife,myDamage,hisDamage) => {
     
   let maxdmg =characters[0].poder * characters[1].maxenemyattack()
   let maxatk= (characters[1].poder * characters[1].maxmyattack()[0])
   console.log(characters[1].maxmyattack()[1])
   let constante = myLife<=maxdmg && myLife<100 ? 0 : maxatk>=hisLife?characters[1].maxmyattack()[0]  : maxdmg>90?1:myLife<100 ? Math.floor(Math.random() * (characters[1].habilidades.length) ) :Math.floor(Math.random() * (characters[1].habilidades.length -1) +1 )


   return constante    
    }
  }
];
characters.forEach((character) => {
  document.write(
    `<div class="pokemon" id = "${character.nombre}">
    <div class="progress mt-1" style="width: 100%">
    <div id="barra-${character.nombre}" class="progress-bar bg-success"role="progressbar"style="width: 100%"aria-valuenow="100"aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h2>${character.character}</h2> 
    <img class="imagen" src="${character.imagen}" alt="" />
    <button class="btn-success mt-1 mx-3 skill-${character.nombre}"type="button" id="ataque1-${character.nombre}">${character.habilidades[0].nombre}</button> 
    <button class="btn-danger mt-1 mx-3 skill-${character.nombre}" type="button" id="ataque2-${character.nombre}">${character.habilidades[1].nombre}</button>
    <button class="btn-success mt-1 mx-3 skill-${character.nombre}" type="button" id="ataque3-${character.nombre}">${character.habilidades[2].nombre}</button>
    <button class="btn-danger mt-1 mx-3 skill-${character.nombre}" type="button" id="ataque4-${character.nombre}">${character.habilidades[3].nombre}</button>
    </div>`
  );
  let botones = [...document.getElementsByClassName("skill-" + character.nombre)];
  console.log(`${character.nombre}`);
  botones.forEach((boton, index) => {
    boton.onclick = function () {
      if (vivos()) {
        switch (character.habilidades[index].tipo) {
          case "ataque":
            ataque(
              character.habilidades[index].stats * character.poder,
              "barra-" + character.enemigo
            );

            break;
          case "boost":
            character.poder *= character.habilidades[index].stats;
            time = setTimeout(player2, 1000);

            break;
          case "curacion":
            curacion(
              character.habilidades[index].stats,
              "barra-" + character.nombre
            );
            break;
          default:
            "";
            break;
        }
        document.getElementById("title").textContent =
          `${character.nombre} ha usado ${character.habilidades[index].nombre}`;
      }
      skillsp1.forEach((Element) => {Element.hidden = true});
    };
  });
});

 skillsp1 = Array.of(...document.getElementsByClassName("skill-player1"));
 skillsp2 = Array.of(...document.getElementsByClassName("skill-player2"));
skillsp2.forEach((Element) => Element.hidden = true);

function player2() {
  let habilidadd = Math.floor(Math.random() * skillsp2.length);
 
    
    habilidad = characters[1].inteligencia(parseFloat(document.getElementById("barra-player2").style.width),parseFloat(document.getElementById("barra-player1").style.width),characters[1].poder,characters[0].poder)
    

  
  
skillsp2[habilidad].click();
  clearTimeout(time);
  vivos();
}

const ataque = (daño, barra) => {
  numero = parseFloat(document.getElementById(barra).style.width) - daño;

  numero < 0
    ? (document.getElementById(barra).style.width = 0 + "%")
    : (document.getElementById(barra).style.width = numero + "%");
  time = setTimeout(player2, 1000);

  vivos();
};

const curacion = (cura, barra) => {
  numero = parseFloat(document.getElementById(barra).style.width) + cura;
  numero > 100 ? (numero = 100) : "";
  document.getElementById(barra).style.width = numero + "%";
  time = setTimeout(player2, 1000);
};

const vivos = () => {
  let barra1 = parseFloat(document.getElementById("barra-player1").style.width);
  let barra2 = parseFloat(document.getElementById("barra-player2").style.width);
  if (barra1 > 0 && barra2 > 0) {
    skillsp1.forEach((Element) => {Element.hidden = false});

    return true;
  } else {
    barra1 > 0
      ? (document.getElementById("title").textContent =
          "!Se acabo! El Player 1 ha ganado")
      : (document.getElementById("title").textContent =
          "!Se acabo! El Player 2 ha ganado");
          skillsp1.forEach((Element) => {Element.hidden = true});
          return false;
  }
};
