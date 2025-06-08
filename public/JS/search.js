function loadBody() {
    console.log(document.getElementById("input").offsetHeight);
}
function searchBro() {
    var a = document.getElementById("input").value;
    for(var i = 0;i<=20;i++) {
        a = a.replace(" ", "%20");
    }
        fetch("http://127.0.0.1/searchOk:"+a)
        .then(response => response.json())
        .then(data => {
            var l = data.length;
            console.log(data);
            for(var j = 0;j<l;j++) {
                if(data[j] == '') {
                    // Eat Five Star Do Nothing
                }
                else {
                var container = document.querySelector(".card-container");
                var inn = document.querySelector(".card-container").innerHTML;
                var name = data[j]['templateName'];
                var id = data[j]['templateId'];
                var imgUrl = data[j]['imgUrl'];
                var desc = data[j]['description'];
                desc = desc.replace("Purple Fox Devs", "<a href='https://www.purplefoxdevs.tk'>Purple Fox Devs</a>");
                var Xi = desc.indexOf(",");
                var title = desc.slice(0, Xi);
                desc = desc.slice(Xi+1);
                var Element = `
                <div class="snip-card" id="${id}" onclick="enLarge(this)">
            <img src="${imgUrl}" class="img-container" />
            <div class="text-container">
                <div class="header-title">${name}</div>
                <div class="snip-author">${title}</div>
                <div class="snip-desc">${desc}</div>
            </div>
        </div>
                `;
                container.innerHTML = Element + inn;
            }
        }
        });
}

function enLarge(a) {
    var id = a.getAttribute("id");
    window.location.href = "/product:"+id;
}