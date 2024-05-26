var pages = {};

async function fetchpages() {
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
  await fetch("pages/contact/contact.html")
    .then((res) => res.text())
    .then((data) => (pages.contact = data));
}

fetchpages()
  .then(() => {
    function getContent(pageId) {
      return pages[pageId];
    }

    function loadContent() {
      // faz com que a variavel contentDiv seja a <div id="app" />
      const contentDiv = document.getElementById("app");
      // pega qual a hashtag (#) que esta no endereco da pagina
      pageId = location.hash.substring(1);
      // variavel conteudo da pagina recebe o retorno da funcao pegarConteudo()
      const pageContent = getContent(pageId);
      // adiciona na variavePaginal contentDiv (<div id="app" />) o conteudo da pagina
      contentDiv.innerHTML = pageContent;
      //verifica se a pagina eh a pagina contact. Se for adiciona o endereco do arquivo html na variavel src
      var src = pageId === "contact" ? "pages/contact/contact.js" : undefined;
      // verifica se a variavel src tem algum valor. Se tiver gera a tag <script /> na sessao head da pagina index.html
      if (src) {
        var script = document.createElement("script");
        script.setAttribute("src", src);
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    }

    if (!location.hash) {
      location.hash = "#home";
    }

    loadContent();

    window.addEventListener("hashchange", loadContent);
  })
  .catch(() => {
    document.getElementById("app").innerHTML = "Error ao carregar a pagina";
  });
