/*
  Sai Biscoito - Extensão de limpeza do Twitter.

  Desenvolvido por Ricardo Serathiuk (@rsrthk)
  ricardo@serathiuk.com

  Utiliza a biblioteca arrive.min.js (https://github.com/uzairfarooq/arrive)
  para "observar" pelas mudanças na página (carregamento de novos tweets)
*/

//Filtra tweets por querySelector.
function filterTweetsByQuerySelector(querySelector) {
  //var onFoundElement = el => searchParentElement(el).then(parent => parent.style.display = "none");
  var onFoundElement = el => searchParentElement(el)
                              .then(parent => parent.style.border = "5px solid red");

  document.querySelectorAll(querySelector).forEach(onFoundElement);
  document.arrive(querySelector, onFoundElement);
}

function filterByDomain(domain) {
  filterTweetsByQuerySelector(".TweetTextSize > a[data-expanded-url*='"+domain+"']");
}

/*
Procura o item raiz de um tweet através da classe CSS do item raiz.
Vai buscar o parentElement até que algum possua a classe de item raiz (stream-item).
*/
function searchParentElement(el) {
  while(el != null) {
    if(el.classList.contains("stream-item")) {
      break;
    } else {
      el = el.parentElement;
    }
  }

  return new Promise((resolve, reject) => el != null ? resolve(el) : reject(null));
}

//Processa as configurações
function processa_bloqueio(id, bloqueado) {
  if(!bloqueado) return;

  if("Curtidas" == id) {
    log("Filtrando Curtidas");
    filterTweetsByQuerySelector(".tweet-context > .Icon--heartBadge");
  } else if("Propagandas" == id) {
    log("Filtrando Propagandas");
    filterTweetsByQuerySelector(".tweet-context > .Icon--promoted");
  } else if("Retweets" == id) {
    log("Filtrando Retweets");
    filterTweetsByQuerySelector(".tweet-context > .Icon--retweeted");
  } else {
    log("Filtrando URL: "+id);
    filterByDomain(id);
  }
}

function log(str) {
  console.log("Sai Biscoito - "+str);
}

//Busca as configurações
chrome.storage.sync.get({
  "Curtidas": true,
  "Propagandas": true,
  "Retweets": false,
  "curiouscat.me": true,
  "nomesigue.com": true,
  "rnkpr.com": true,
  "ask.fm": true,
  "twcm.me": true,
  "twcm.co": true,
  "trueachievements.com": true,
  "paper.li": true,
  "untp.beer": true,
  "fllwrs.com": true,
  "spoti.fi": true,
  "instagram.com": true
}, items => Object.entries(items)
              .forEach(([key, value]) => processa_bloqueio(key, value)));
