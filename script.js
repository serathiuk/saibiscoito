/*
  Sai Biscoito - Extensão de limpeza do Twitter.

  Desenvolvido por Ricardo Serathiuk (@rsrthk)
  ricardo@serathiuk.com

  Utiliza a biblioteca arrive.min.js (https://github.com/uzairfarooq/arrive)
  para "observar" pelas mudanças na página (carregamento de novos tweets)
*/

//Filtra tweets por querySelector.
function filterTweetsByQuerySelector(querySelector) {
  var onFoundElement = el => searchParentElement(el).then(parent => parent.style.display = "none");
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

/*
Filtra os "fulano curtiu X". A lógica é. Todo tweet que tiver um header com um heartBadge é
considerado um tweet de like.
*/
filterTweetsByQuerySelector(".tweet-context > .Icon--heartBadge");

/*
Filtra alguns dominios. Busca nas URL's (elemento A) do tweet e ve se tem alguma do
curiouscat.me. O conteúdo do tweet é a classe CSS TweetTextSize e a query
a[data-expanded-url*='curiouscat.me'] busca quais possuem URL do curiouscat.
É utilizado o atributo data-expanded-url pois no href a URL pode vir minificada.
*/
filterByDomain("curiouscat.me");
filterByDomain("nomesigue.com");
filterByDomain("rnkpr.com");
filterByDomain("ask.fm");
filterByDomain("twcm.me");
filterByDomain("twcm.co");
filterByDomain("trueachievements.com");
filterByDomain("paper.li");
filterByDomain("untp.beer");
filterByDomain("fllwrs.com");
filterByDomain("spoti.fi");
filterByDomain("instagram.com")
