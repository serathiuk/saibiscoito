/*
  Sai Biscoito - Plugin de limpeza do Twitter.

  Desenvolvido por Ricardo Serathiuk (@rsrthk)
  ricardo@serathiuk.com

  Utiliza a biblioteca arrive.min.js (https://github.com/uzairfarooq/arrive)
  para "observar" pelas mudanças na página (carregamento de novos tweets)
*/

//Filtra tweets por querySelector.
function filterTweetsByQuerySelector(querySelector) {
  document.arrive(querySelector, el =>
    searchParentElement(el).then(parent => parent.style.display = "none")
  );
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
Filtra curiouscat.me. Busca nas URL's (elemento A) do tweet e ve se tem alguma do
curiouscat.me. O conteúdo do tweet é a classe CSS TweetTextSize e a query
a[data-expanded-url*='curiouscat.me'] busca quais possuem URL do curiouscat.
É utilizado o atributo data-expanded-url pois no href a URL pode vir minificada.
*/
filterTweetsByQuerySelector(".TweetTextSize > a[data-expanded-url*='curiouscat.me']");
