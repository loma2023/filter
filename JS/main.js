if (localStorage.UserData == null) { location.href = "index.html" }
let UserData = JSON.parse(localStorage.UserData);
document.querySelector("head").innerHTML += `<link rel="icon" href="${UserData[0].imgUser}">`

document.querySelector(".list").innerHTML = `
<h1 class="logo"><a class="fab fa-meetup"></a>odern<span> App</span></h1>
<div class="Items-list">
    <i onclick="toggle()" class="fas fa-circle-xmark"></i>
    <a class="item" href="Home.html">
        <span class="fas fa-home"></span>
        <span>الصفحة الرئيسيه</span>
    </a>
    <a class="item" href="New_Contract.html">
        <span class="fas fa-users"></span>
        <span>تعاقد جديد</span>
    </a>
    <a class="item" href="Maintenance.html">
        <span class="fas fa-scroll"></span>
        <span>طلبات الصيانه</span>
    </a>
    <a class="item" href="Maintenance2.html">
        <span class="fas fa-scroll"></span>
        <span>طلبات تمت</span>
    </a>
    <a class="item" href="Maintenance3.html">
        <span class="fas fa-scroll"></span>
        <span>العقود المنتهيه</span>
    </a>
    <a class="item" href="City.html">
        <span class="fas fa-scroll"></span>
        <span>المناطق</span>
    </a>
    <a class="item" href="Vilage.html">
        <span class="fas fa-scroll"></span>
        <span>القري</span>
    </a>
    
</div>`

document.querySelector(".header").innerHTML = `
<a onclick="toggle()" class="fas fa-align-right"></a>
<div class="pages"></div>
<div class="left-header">
    <div>
        <span></span>
        <h4>${UserData[0].Username}</h4>
        <p>${UserData[0].Email}</p>
    </div>
   <a href="Setting.html"><img class="img-user" src="${UserData[0].imgUser}" alt=""></a>
</div>`

if (document.title === "الصفحه الرئيسية") {
    document.querySelector(".img-home").src = UserData[0].imgBg ;
    document.querySelector(".header").style.background = "none"
    document.querySelector(".header").style.boxShadow = "none"
    let items_list = document.querySelector(".Items-list")
    items_list.querySelectorAll("a")[0].classList.add("hoverd")
}

document.querySelector(".main").innerHTML += `
<audio src="CSS/Msg.mp3"></audio>
<div class="parentMsg">
    <div class="Msg-Box">
        <a class="fa fa-cloud-arrow-up"></a>
        <h1> جارِ حفظ البيانات </h1>
        <div class="bg-loader">
            <div class="load"></div>
        </div>
    </div>
</div>`

document.querySelector(".footer").innerHTML += `
<div>© 2023 Esla<a class="fab fa-meetup"></a> Loma. All Rights Reserved</div>
<div class="social-media">
    <a href="#" class="fab fa-facebook-f"></a>
    <a href="#" class="fab fa-whatsapp"></a>
    <a href="https://www.instagram.com/faceloma/?hl=ar" class="fab fa-instagram"></a>
    <a href="#" class="fab fa-google"></a>
    <a href="tel/201158347657" class="fas fa-phone"></a>
</div>`



function MsgBox() {
    document.querySelector("audio").play();
    let parent = document.querySelector(".parentMsg");
    let loader = parent.querySelector(".bg-loader");
    parent.classList.add("active");
    setTimeout(() => {
        loader.style.display = "none";
        parent.querySelector("a").classList.remove("fa-cloud-arrow-up")
        parent.querySelector("a").classList.add("fa-check")
        parent.querySelector("h1").innerText = " تم الحفظ "
    }, 4000);
    setTimeout(() => { parent.classList.remove("active"); }, 5000);
    setTimeout(() => { location.reload(); }, 5300);
}

function Doprint(event) {
    document.querySelector("body").classList.add("body-active")
    document.querySelector(".list").style.display = "none"
    document.querySelector(".main").style.padding = "5px"
    document.querySelector(".header").style.display = "none"
    document.querySelector(".parentMsg").style.display = "none"
    document.querySelector(".footer").style.display = "none"

    event.target.style.display = "none"
    let section = document.querySelector(".section-search")
    if (section != null) { section.style.display = "none" }
    let forPrint = document.querySelector(".Forprint")
    if (forPrint != null) { forPrint.style.display = "grid" }

    let theed = document.querySelector("table")
    let td = theed.querySelectorAll("td")
    td.forEach(td => {
        td.style.background = "#fff"
        td.style.color = "#000"
        td.style.fontSize = "15px"
        td.style.border = "1px solid #000"
    });
    print();
}

setTimeout(() => {
    if (document.querySelector(".loader").classList.contains("Done") != true) {
        location.reload();
    }
}, 10000);

function toggle() {
    document.querySelector("body").classList.toggle("body-active");
};

function SignOut() {
    localStorage.removeItem("username")
    location.href = "index.html"
}

let General_URL = "https://script.google.com/macros/s/AKfycbyIXMO_NIKfpQpZnbNqHwF1XLMF3xvI1fgDB8XQ91ZdfJ2zAKyytyFkA0kMhD-Av8-Q/exec";
let City_URL = "https://script.google.com/macros/s/AKfycbwtPg0MOiYExP4f9B8e-WoC1HfkwH2xEdE0Kom9p0qmJ9G4zfGkeLRsXgi8YqiPFzix/exec";
let Vilage_URL = "https://script.google.com/macros/s/AKfycbyRFiyta0RMn4oUsbOKf41BRBtNCXEtgyHFmk8Q4micKJSZUEawZreloqEP0l1MSZFi/exec";
// let urlImages = "https://script.google.com/macros/s/AKfycbzInpr5KRwBxBy48MISwiYRyjabobjS2OyRjdQ6fzSyIngT3gLeSeepuo0WRRlpPjI0/exec";
// let Login_URL = "https://script.google.com/macros/s/AKfycbw0GpDKkYbDutVr5oPkLd_TnkXhONuvLtl89cCpnhn59BZN7Iae7qDzx2f1yAXRGZkJ/exec"


// <a class="item" href="Setting.html">
// <span class="fas fa-gear"></span>
// <span>الاعدادات</span>
// </a>

// <a class="item" onclick="SignOut()">
// <span class="fas fa-right-from-bracket"></span>
// <span>خروج</span>
// </a>