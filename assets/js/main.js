"use strict";
import "./file01.js";
// Page loading
var pageLoading = document.querySelector(".page-loading");

if (pageLoading) {
  window.addEventListener("load", () => {
    pageLoading.classList.add("hide");

    setTimeout(() => {
      pageLoading.style.display = "none";
    }, 1000);
  });
}

// Navbar
const navbar = document.querySelector(".ic-navbar"),
  navbarToggler = navbar.querySelector("[data-web-toggle=navbar-collapse]");

navbarToggler.addEventListener("click", function () {
  const dataTarget = this.dataset.webTarget,
    targetElement = document.getElementById(dataTarget),
    isExpanded = this.ariaExpanded === "true";

  if (!targetElement) {
    return;
  }

  navbar.classList.toggle("menu-show");
  this.ariaExpanded = !isExpanded;
  navbarToggler.innerHTML = navbar.classList.contains("menu-show")
    ? '<i class="lni lni-close"></i>'
    : '<i class="lni lni-menu"></i>';
});

// Sticky navbar
window.addEventListener("scroll", function () {
  if (this.scrollY >= 72) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Web theme
const webTheme = document.querySelector("[data-web-trigger=web-theme]"),
  html = document.querySelector("html");

window.addEventListener("load", function () {
  var theme = localStorage.getItem("Inazuma_WebTheme");

  if (theme == "light") {
    webTheme.innerHTML = '<i class="lni lni-sun"></i>';
  } else if (theme == "dark") {
    webTheme.innerHTML = '<i class="lni lni-night"></i>';
  } else {
    theme = "light";
    localStorage.setItem("Inazuma_WebTheme", theme);
    webTheme.innerHTML = '<i class="lni lni-night"></i>';
  }

  html.dataset.webTheme = theme;
});

webTheme.addEventListener("click", function () {
  var theme = localStorage.getItem("Inazuma_WebTheme");

  webTheme.innerHTML =
    theme == "dark"
      ? '<i class="lni lni-sun"></i>'
      : '<i class="lni lni-night"></i>';
  theme = theme == "dark" ? "light" : "dark";
  localStorage.setItem("Inazuma_WebTheme", theme);
  html.dataset.webTheme = theme;
});

// Scrollspy
function scrollspy(event) {
  var links = document.querySelectorAll(".ic-page-scroll"),
    scrollpos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

  for (let i = 0; i < links.length; i++) {
    var currentLink = links[i],
      dataTarget = currentLink.getAttribute("href"),
      targetElement = document.querySelector(dataTarget),
      topminus = scrollpos + 74;

    if (targetElement) {
      if (
        targetElement.offsetTop <= topminus &&
        targetElement.offsetTop + targetElement.offsetHeight > topminus
      ) {
        document.querySelector(".ic-page-scroll").classList.remove("active");
        currentLink.classList.add("active");
      } else {
        currentLink.classList.remove("active");
      }
    }
  }
}

window.document.addEventListener("scroll", scrollspy);

// Menu scroll
const pageLink = document.querySelectorAll(".ic-page-scroll");

pageLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(link.getAttribute("href"));

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 74,
      });
    }

    navbar.classList.remove("menu-show");
    navbarToggler.innerHTML = navbar.classList.contains("menu-show")
      ? '<i class="lni lni-close"></i>'
      : '<i class="lni lni-menu"></i>';
  });
});

// Tabs
const tabs = document.querySelectorAll(".tabs");

tabs.forEach((tab) => {
  const links = tab.querySelectorAll(".tabs-nav .tabs-link"),
    contents = tab.querySelectorAll(".tabs-content");

  if (!contents) {
    return;
  }

  window.addEventListener("load", function () {
    for (let i = 0; i < contents.length; i++) {
      contents[i].classList.add("hide");
    }

    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      links[i].ariaSelected = false;
    }

    links[0].classList.add("active");
    links[0].ariaSelected = true;

    const dataTarget = links[0].dataset.webTarget,
      targetElement = this.document.getElementById(dataTarget);

    targetElement.classList.remove("hide");
  });

  links.forEach((link) => {
    const dataTarget = link.dataset.webTarget,
      targetElement = document.getElementById(dataTarget);

    if (targetElement) {
      link.addEventListener("click", function () {
        for (let i = 0; i < contents.length; i++) {
          contents[i].classList.add("hide");
        }

        for (let i = 0; i < links.length; i++) {
          links[i].classList.remove("active");
          links[i].ariaSelected = false;
        }

        link.classList.add("active");
        link.ariaSelected = true;
        targetElement.classList.remove("hide");
      });
    } else {
      link.disabled = true;
    }
  });
});

// Portfolio filter
const portfolioFilters = document.querySelectorAll(".portfolio-menu button");

portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let btn = portfolioFilters[0];

    while (btn) {
      if (btn.tagName === "BUTTON") {
        btn.classList.remove("active");
      }

      btn = btn.nextSibling;
    }

    this.classList.add("active");

    let selected = filter.getAttribute("data-filter"),
      itemsToHide = document.querySelectorAll(
        '.portfolio-grid .portfolio :not([data-filter="' + selected + '"])'
      ),
      itemsToShow = document.querySelectorAll(
        '.portfolio-grid .portfolio [data-filter="' + selected + '"]'
      );

    if (selected == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        ".portfolio-grid .portfolio [data-filter]"
      );
    }

    itemsToHide.forEach((el) => {
      el.parentElement.classList.add("hide");
      el.parentElement.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.parentElement.classList.remove("hide");
      el.parentElement.classList.add("show");
    });
  });
});

// Scroll to top
var st = document.querySelector("[data-web-trigger=scroll-top]");

if (st) {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      st.classList.remove("is-hided");
    } else {
      st.classList.add("is-hided");
    }
  };

  st.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Portafolio
  const portfolioItems = [
    {
      title: "Diseño de Alien",
      description:
        "Short description for the ones who look for something new. Awesome!",
      imageUrl: "/img/portfolio/small/Alien.png",
      category: "ten",
    },
    {
      title: "Diseño de Astronauta",
      description:
        "Short description for the ones who look for something new. Awesome!",
      imageUrl: "/img/portfolio/small/Astronauta.png",
      category: "ten",
    },
    {
      title: "Diseño de BugsBunny",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/BugsBunny.png",
      category: "ten",
    },
    {
      title: "Diseño de Calavera",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Calavera.png",
      category: "ten",
    },
    {
      title: "Diseño de Cigarrillo",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Cigarrillo.png",
      category: "ten",
    },
    {
      title: "Diseño de Cr7",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Cr7.png",
      category: "ten",
    },
    {
      title: "Diseño de Fantasma",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Fantasma.png",
      category: "ten",
    },
    {
      title: "Diseño de Freezer",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Freezer.png",
      category: "ten",
    },
    {
      title: "Diseño de Furia",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/FuriaNocturna.png",
      category: "ten",
    },
    {
      title: "Diseño de Messi",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Messi.png",
      category: "ten",
    },
    {
      title: "Diseño de Pantera Rosa",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/PanteraRosa.png",
      category: "ten",
    },
    {
      title: "Diseño de Saturno",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Saturno.png",
      category: "ten",
    },
    {
      title: "Diseño de Stich",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Stich.png",
      category: "ten",
    },
    {
      title: "Diseño de Toad",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/small/Tortuga.png",
      category: "ten",
    },
    {
      title: "Frase Balenciaga",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/normal/BalenciagaCBeige.png",
      category: "fifteen",
    },
    {
      title: "Diseño de Cr7",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/normal/Cr7SaraCBlanca.png",
      category: "fifteen",
    },
    {
      title: "Diseño de Jiraiya",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/normal/Jiraiya.png",
      category: "fifteen",
    },
    {
      title: "Diseño de Naruto",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/normal/NarutoCBlanca.png",
      category: "fifteen",
    },
    {
      title: "Diseño de Akatsuki",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/normal/AkatsukiCNegra.png",
      category: "fifteen",
    },
    {
      title: "Diseño de BadBunny",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/BadBunny_3CBeige.png",
      category: "twenty",
    },
    {
      title: "Diseño de Canserbero",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/Canserbero.png",
      category: "twenty",
    },
    {
      title: "Diseño de Dragon Ball",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/DragonBallCNegra.png",
      category: "twenty",
    },
    {
      title: "Diseño de Gaara",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/Gaara_2CNegra.png",
      category: "twenty",
    },
    {
      title: "Diseño de JujutsuKaisen",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/JujutsuKaisenCBeige.png",
      category: "twenty",
    },
    {
      title: "Diseño de Messi",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/MessiCBlanco.png",
      category: "twenty",
    },
    {
      title: "Diseño de One Piece",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/OnePiece.png",
      category: "twenty",
    },
    {
      title: "Diseño de Paulo Londra",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/PauloLondraCBeige.png",
      category: "twenty",
    },
    {
      title: "Diseño de Snoopy",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/SnoopyCBeige.png",
      category: "twenty",
    },
    {
      title: "Diseño de Spider",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/Spider_3CBlanca.png",
      category: "twenty",
    },
    {
      title: "Diseño de Spiderman",
      description: "Descripción del otro diseño.",
      imageUrl: "/img/portfolio/big/Spiderman.png",
      category: "twenty",
    },
  ];

  const container = document.getElementById("portfolio-container");

  portfolioItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "group";
    article.dataset.filter = item.category;

    article.innerHTML = `
      <div class="relative overflow-hidden w-full aspect-[4/3] rounded-xl">
        <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover" />
        <div class="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible">
          <div class="flex flex-wrap gap-2 p-4">
            <div class="inline-block relative">
              <a href="${item.imageUrl}" data-gallery="portfolio-${item.category}" class="glightbox text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color">
                <i class="lni lni-zoom-in"></i>
              </a>
            </div>
            <div class="portfolio-icon">
              <a href="javascript:void(0)" class="text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color">
                <i class="lni lni-link"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-4">
        <h4 class="mb-2">
          <a href="javascript:void(0)" class="text-[1.5rem] leading-tight text-inherit">${item.title}</a>
        </h4>
        <p>${item.description}</p>
      </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.className = "portfolio col-12 sm:col-6 lg:col-4";
    wrapper.appendChild(article);

    container.appendChild(wrapper);
  });

  const lightbox = GLightbox({
    selector: ".glightbox",
  });
}
