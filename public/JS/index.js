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

function goToCategory() {
    window.location.href= "/category";
}

function goToDonate() {
    window.location.href= "/donateUs";
}
function goToAbout() {
    window.location.href= "/aboutUs";
}


function loadBody() {
    var element = `<div class="div">
    <img src="" class="img-container" />
    <div class="text-container">
        <div class="head-title"></div>
        <div class="card-content"></div>
    </div>
</div>`;
    var myUrl =  "/API";
    fetch(myUrl)
    .then(response => response.json())
    .then(data => {
        var myArr = data;
        var l = myArr.length;
        for(var i = 0;i<17;i++) {
            var id = myArr[i]['templateId'];
            var name = myArr[i]['templateName'];
            var desc = myArr[i]['description'];
            var Url = myArr[i]['imgUrl'];
            var ind = desc.indexOf(',');
            desc = desc.slice(0, ind);
            desc = desc.replace("Purple Fox Devs", "<a href='https://www.purplefoxdevs.tk' target='_blank'>Purple Fox Devs</a>");
            var mainDiv = document.querySelector(".section-2");
            var Div = document.querySelector(".section-2").innerHTML;
            var element = `<div class="div" onclick='enLarge(this)' id="${id}">
    <img src="${Url}" class="img-container" />
    <div class="text-container">
        <div class="head-title">${name}</div>
        <div class="card-content">${desc}</div>
    </div>
</div>`;
mainDiv.innerHTML = Div + element;
        }
    });
}

function enLarge(a) {
    var id = a.getAttribute("id");
    window.location.href="/product:"+id;
}