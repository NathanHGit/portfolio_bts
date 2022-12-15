let ul = document.querySelector("ul");
let body = document.querySelector("body");
let menu = document.getElementById("menu");
let darkScreen = document.getElementById("dark-screen");

let index = document.getElementById("index");
let header = document.getElementById("header");
let displayedNode = null;
let isIndex = true;

document.documentElement.style.setProperty("--scroll-bar-width", window.innerWidth - document.documentElement.clientWidth + "px");

scroll();

setTimeout(function () {
    menu.classList.remove("init");
}, 0);

window.onscroll = function () {
    scroll();
};

window.onload = function () {
    document.getElementById("loading-screen").remove();
};

function scroll() {
    if (window.scrollY < window.innerHeight && isIndex) {
        menu.classList.add("transparent-menu");
    } else {
        menu.classList.remove("transparent-menu");
    }
}

function scrollInto(nodeId) {
    if (!isIndex) {
        displayIndex(nodeId);
    } else {
        document.querySelector("html").className = "smooth-scroll";
        document.getElementById(nodeId).scrollIntoView();
    }
}

function displayMenu(bool) {
    if (bool) {
        ul.className = "open-menu";
        body.classList.toggle("active");
        darkScreen.classList.toggle("active");
    } else {
        ul.className = "close-menu";
        darkScreen.classList.toggle("active");
        setTimeout(function () {
            body.classList.toggle("active");
        }, 350);
    }
}

function displayProject(nodeId) {
    document.querySelector("html").classList.remove("smooth-scroll");
    displayedNode = document.getElementById(nodeId);
    index.style.opacity = 0;
    setTimeout(function () {
        header.style.display = "none";
        isIndex = false;
        scroll();
        window.scrollTo(0, 0);
        index.style.display = "none";
        displayedNode.style.display = "flex";
    }, 500);
    setTimeout(function () {
        displayedNode.style.opacity = 1;
    }, 550);
}

function displayIndex(nodeId) {
    document.querySelector("html").classList.remove("smooth-scroll");
    displayedNode.style.opacity = 0;
    setTimeout(function () {
        displayedNode.style.display = "none";
        index.style.display = "block";
        header.style.display = "block";
        document.getElementById(nodeId).scrollIntoView();
    }, 500);
    setTimeout(function () {
        index.style.opacity = 1;
        isIndex = true;
    }, 550);
}

const sections = [...document.querySelectorAll(".skills-bloc")];

let options = {
    rootMargin: "0px",
    threshold: 0.25,
};

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        const { target } = entry;

        if (entry.intersectionRatio >= 0.25) {
            target.classList.add("visible");
        }
    });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach((section, index) => {
    observer.observe(section);
});
