/*
  Sai Biscoito - Extensão de limpeza do Twitter.

  Desenvolvido por Ricardo Serathiuk (@rsrthk)
  ricardo@serathiuk.com

  Utiliza a biblioteca arrive.min.js (https://github.com/uzairfarooq/arrive)
  para "observar" pelas mudanças na página (carregamento de novos tweets)
*/

//A estratégia de bloqueio é via os ícones SVG que tem apenas nos tweets a serem bloqueados
//Abaixo é a lista de SVG's.
var BLOQUEIOS = [
  //Likes
  "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 "+
  "8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 "+
  "2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z",

  //Outros seguem
  "M12.225 12.165c-1.356 0-2.872-.15-3.84-1.256-.814-.93-1.077-2.368-.805-4.392.38-2.826 "+
  "2.116-4.513 4.646-4.513s4.267 1.687 4.646 4.513c.272 2.024.008 3.46-.806 4.392-.97 1.106-2.485 1.255-3.84 1.255zm5.849 "+
  "9.85H6.376c-.663 0-1.25-.28-1.65-.786-.422-.534-.576-1.27-.41-1.968.834-3.53 4.086-5.997 7.908-5.997s7.074 2.466 "+
  "7.91 5.997c.164.698.01 1.434-.412 1.967-.4.505-.985.785-1.648.785z",

  //Propagandas
  "M20.75 2H3.25C2.007 2 1 3.007 1 4.25v15.5C1 20.993 2.007 22 3.25 22h17.5c1.243 0 2.25-1.007 2.25-2.25V4.25C23 3.007 21.993 "+
  "2 20.75 2zM17.5 13.504c0 .483-.392.875-.875.875s-.875-.393-.875-.876V9.967l-7.547 7.546c-.17.17-.395.256-.62.256s-.447-.086-.618-."+
  "257c-.342-.342-.342-.896 0-1.237l7.547-7.547h-3.54c-.482 0-.874-.393-.874-.876s.392-.875.875-.875h5.65c.483 0 .875.39.875.874v5.65z"
]

//Checa se no elemento possui o SVG descrito
//Por causa do Like (coração), que é reaproveitado para Likes em geral, é checado se o ícone é cinza.
function processTweet(el, svg) {
  var elLikes = el.querySelector("path[d='"+svg+"']");
  if(elLikes!= null && window.getComputedStyle(elLikes).getPropertyValue('color') == "rgb(110, 118, 125)") {
    //el.style.border = "5px solid red"
    el.style.display = 'none';
    console.log(el);
  }
}

//Agora todo tweet é um 'article' :)
document.arrive('article', el => 
  BLOQUEIOS.forEach(svg => processTweet(el, svg))
);