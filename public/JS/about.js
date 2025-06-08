function openMenu() {
    document.querySelector(".menu").setAttribute("style", "height: calc(100vh - 70px) !important;");
    document.querySelector(".hamburger-btn1").setAttribute("onclick", "closeMenu()");
    document.querySelector(".hamburger-btn2").setAttribute("onclick", "closeMenu()");
    document.querySelector(".hamburger-btn3").setAttribute("onclick", "closeMenu()");
    setTimeout(() => {
        document.getElementById("li1").setAttribute("style", "display:block;");
        document.getElementById("li2").setAttribute("style", "display:block;");
        document.getElementById("li3").setAttribute("style", "display:block;");
        document.getElementById("li4").setAttribute("style", "display:block;");
        document.getElementById("li5").setAttribute("style", "display:block;");
    }, 200);
    document.body.setAttribute("style", "overflow:hidden;");
}

function closeMenu() {
    document.getElementById("li1").setAttribute("style", "display:none;");
    document.getElementById("li2").setAttribute("style", "display:none;");
    document.getElementById("li3").setAttribute("style", "display:none;");
    document.getElementById("li4").setAttribute("style", "display:none;");
    document.getElementById("li5").setAttribute("style", "display:none;");
    document.querySelector(".menu").setAttribute("style", "height: 0px !important;");
    document.querySelector(".hamburger-btn1").setAttribute("onclick", "openMenu()");
    document.querySelector(".hamburger-btn2").setAttribute("onclick", "openMenu()");
    document.querySelector(".hamburger-btn3").setAttribute("onclick", "openMenu()");
    document.body.setAttribute("style", "overflow-y:scroll;");
}
function goToSearch() {
    window.location.href= "/search";
}
function goToHome() {
    window.location.href= "/";
}
function goToCategory() {
    window.location.href= "/category";
}

function goToDonate() {
    window.location.href= "/donateUs";
}
function goToAbout() {
    window.location.href= "/aboutUs";
}
