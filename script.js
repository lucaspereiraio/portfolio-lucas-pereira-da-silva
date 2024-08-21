document.addEventListener("DOMContentLoaded", () => {
  var pages = {};
  var langData = {};
  var currentLang = "en"; // Current language, by default english

  // Funçction to fetch the translation data (lang.json)
  async function fetchLangData() {
    await fetch("lang.json")
      .then((res) => res.json())
      .then((data) => (langData = data));
  }

  // Function to fetch the pages content
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

  // Initialize function
  async function initialize() {
    await fetchLangData();
    await fetchPages();

    // Get the language in the localStorage
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      currentLang = savedLang;
    }

    // Hash defined to home when there is not a hash in URL
    if (!location.hash) {
      location.hash = "#home";
    }

    // Load the homepage content
    loadContent();
    // Apply the initial translations
    applyTranslations();

    //  Add an event listener to change the hash in pagen navigation
    window.addEventListener("hashchange", loadContent);

    // Add an event listener to language changing
    document
      .getElementById("languageButton")
      .addEventListener("click", (event) => {
        toggleLanguage();
        localStorage.setItem("selectedLanguage", currentLang); // Save the current language on the local storage and set it by default
        applyTranslations();
      });
  }

  // Function to get the page content by the id
  function getContent(pageId) {
    return pages[pageId];
  }

  // Function to load the page content
  function loadContent() {
    // var contentDiv = <div id="app" />
    const contentDiv = document.getElementById("app");
    // Get the hastag (#) that is in the page address
    const pageId = location.hash.substring(1);
    // Var pageContent get the getContent return
    const pageContent = getContent(pageId);
    // Add an inner HTML to the var contentDiv (<div id="app" />)
    contentDiv.innerHTML = pageContent;

    applyTranslations();
  }

  // Function to apply all the translations based on the selected language
  function applyTranslations() {
    // Apply the translations to the elements with the data-translate attribute
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      element.textContent = langData[currentLang][key];
    });

    // Update the navTitle based on the currentLang
    document.title = langData[currentLang]["navTitle"];
  }

  // Function to toggle between the languages
  function toggleLanguage() {
    if (currentLang === "en") {
      currentLang = "pt";
    } else {
      currentLang = "en";
    }
  }

  // Initialize the script and take care of the possible Errors
  initialize().catch(() => {
    document.getElementById("app").innerHTML = "Error ao carregar a pagina";
  });

  // Toggle theme button
  const themeToggleBtn = document.getElementById("toggle-theme");
  const themeIcon = document.getElementById("toggle-icon");

  // Definir o tema inicial com base na preferência do usuário
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("sun-icon");
    themeIcon.classList.add("moon-icon");
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    if (isDarkTheme) {
      themeIcon.classList.remove("sun-icon");
      themeIcon.classList.add("moon-icon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("moon-icon");
      themeIcon.classList.add("sun-icon");
      localStorage.setItem("theme", "light");
    }
  });
});
