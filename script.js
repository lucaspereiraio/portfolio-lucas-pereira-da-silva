var paginas = {};

async function fetchPaginas() {
  const contentDiv = document.getElementById("app");
  contentDiv.innerHTML = "Loading page...";

  await fetch("paginas/resume/resume.html")
    .then((res) => res.text())
    .then((data) => (paginas.resume = data));
  await fetch("paginas/home/home.html")
    .then((res) => res.text())
    .then((data) => (paginas.home = data));
  await fetch("paginas/projects/projects.html")
    .then((res) => res.text())
    .then((data) => (paginas.projects = data));
  await fetch("paginas/contact/contact.html")
    .then((res) => res.text())
    .then((data) => (paginas.contact = data));
}

fetchPaginas()
  .then(() => {
    function pegarConteudo(paginaId) {
      return paginas[paginaId];
    }

    function carregarConteudo() {
      // faz com que a variavel contentDiv seja a <div id="app" />
      const contentDiv = document.getElementById("app");
      // pega qual a hashtag (#) que esta no endereco da pagina
      paginaId = location.hash.substring(1);
      // variavel conteudo da pagina recebe o retorno da funcao pegarConteudo()
      const conteudoDaPagina = pegarConteudo(paginaId);
      // adiciona na variavel contentDiv (<div id="app" />) o conteudo da pagina
      contentDiv.innerHTML = conteudoDaPagina;
      //verifica se a pagina eh a pagina contact. Se for adiciona o endereco do arquivo html na variavel src
      var src =
        paginaId === "contact" ? "paginas/contact/contact.js" : undefined;
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

    carregarConteudo();

    window.addEventListener("hashchange", carregarConteudo);
  })
  .catch(() => {
    document.getElementById("app").innerHTML = "Error ao carrgear a pagina";
  });
