var pages = {};
var langData = {};
var currentLang = "en"; // Default language

// Função para buscar os dados de tradução do lang.json
async function fetchLangData() {
  await fetch("lang.json")
    .then((res) => res.json())
    .then((data) => (langData = data));
}

// Função para buscar o conteúdo das páginas HTML
async function fetchPages() {
  const contentDiv = document.getElementById("app");
  contentDiv.innerHTML = "Loading page...";

  await fetch("pages/resume/resume.html")
    .then((res) => res.text())
    .then((data) => (pages.resume = data));
  await fetch("pages/home/home.html")
    .then((res) => res.text())
    .then((data) => (pages.home = data));
  await fetch("pages/projects/projects.html")
    .then((res) => res.text())
    .then((data) => (pages.projects = data));
}

// Função de inicialização
async function initialize() {
  await fetchLangData();
  await fetchPages();

  // Define a hash para home se não houver uma hash na URL
  if (!location.hash) {
    location.hash = "#home";
  }

  // Carrega o conteúdo da página inicial
  loadContent();
  // Aplica as traduções iniciais
  applyTranslations();

  // Adiciona evento para mudança de hash (navegação entre páginas)
  window.addEventListener("hashchange", loadContent);

  // Adiciona evento para mudança de idioma
  document
    .getElementById("languageSelector")
    .addEventListener("change", (event) => {
      currentLang = event.target.value;
      applyTranslations();
    });
}

// Função para obter o conteúdo da página pelo id
function getContent(pageId) {
  return pages[pageId];
}

// Função para carregar o conteúdo da página
function loadContent() {
  // faz com que a variavel contentDiv seja a <div id="app" />
  const contentDiv = document.getElementById("app");
  // pega qual a hashtag (#) que esta no endereco da pagina
  const pageId = location.hash.substring(1);
  // variavel conteudo da pagina recebe o retorno da funcao getContent()
  const pageContent = getContent(pageId);
  // adiciona na variavel contentDiv (<div id="app" />) o conteudo da pagina
  contentDiv.innerHTML = pageContent;

  applyTranslations();
}

// Função para aplicar as traduções baseadas no idioma selecionado
function applyTranslations() {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = langData[currentLang][key];
  });

  // Atualiza o título do documento
  document.title = langData[currentLang]["navTitle"];
}

// Inicializa o script, lidando com possíveis erros
initialize().catch(() => {
  document.getElementById("app").innerHTML = "Error ao carregar a pagina";
});
