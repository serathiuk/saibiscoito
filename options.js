function save_options() {
  var config = {};

  document.querySelectorAll("input[type=checkbox]")
    .forEach(checkbox => config[checkbox.id] = checkbox.checked)

  console.log(config);

  chrome.storage.sync.set(config, () => {
    alert("Configura&ccedil;&atilde;o salva com sucesso.");
  });
}

// Restaurar configurações
function restore_options() {
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
                .forEach(([key, value]) => processa_checkBox(key, value)));
}

function processa_checkBox(id, checked) {
  let item_lista = document.createElement("li");
  let label = document.createElement("label");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = checked;
  label.append(checkbox);

  let txt_label = document.createElement("span");
  txt_label.innerHTML = id;
  label.append(txt_label);

  item_lista.append(label);
  document.querySelector("#apps").append(item_lista);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('salvar_configuracoes').addEventListener('click', save_options);
