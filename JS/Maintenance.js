let name_page = "";
if (document.title === "طلبات الصيانه") {
  name_page = "مطلوب صيانه"
  let items_list = document.querySelector(".Items-list")
  items_list.querySelectorAll("a")[2].classList.add("hoverd")

} else if (document.title === "طلبات تمت") {
  name_page = "تمت الصيانه"
  let items_list = document.querySelector(".Items-list")
  items_list.querySelectorAll("a")[3].classList.add("hoverd")

} else {
  name_page = "العقد منتهي"
  let items_list = document.querySelector(".Items-list")
  items_list.querySelectorAll("a")[4].classList.add("hoverd")

}

function fetches() {
  fetch(City_URL)
    .then((response) => response.json())
    .then((row) => {
      let element = "";
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        element += `<option value="${colum[1]}">${colum[1]}</option>`
      }
      document.querySelector(".city").innerHTML += element
    });
     fetch(Vilage_URL)
    .then((response) => response.json())
    .then((row) => {
      let element = "";
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        element += `<option value="${colum[1]}">${colum[1]}</option>`
      }
      document.querySelector(".vilage").innerHTML += element
    });

  fetch(General_URL)
    .then((response) => response.json())
    .then((row) => {
      localStorage.removeItem("account")
      let account = []
      let colum = "";
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        if (colum[27] === name_page) {
          let obj = {
            nu: colum[0], name: colum[1], city: colum[2], vilage: colum[3], address: colum[4],
            phone: colum[5], filter: colum[6], total: colum[23], visit: colum[24], candle: colum[25], alart: colum[28]
          }
          account.push(obj)
        }
        localStorage.setItem("account", JSON.stringify(account))
      }
      showData()
    })
}; fetches()

function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  for (let i = 0; i < account.length; i++) {
    element += `
              <tr id="${i}" onclick="toggle2(id)">
                <td >${account[i].nu}</td>
                <td >${account[i].name}</td>
                <td >${account[i].city}</td>
                <td >${account[i].vilage}</td>
                <td >${account[i].address}</td>
                <td >${account[i].phone}</td>
                <td >${account[i].filter}</td>
                <td >${account[i].candle}</td>
                <td >${account[i].visit}</td>
                <td >${account[i].total}</td>
                <td >${account[i].alart}</td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
  document.querySelector(".loader").classList.add("Done")
}

function Search() {
  let table = []
  if (localStorage.table != null) { table = JSON.parse(localStorage.table) }
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  let value = document.querySelector(".city").value
  let value2 = document.querySelector(".vilage").value
  if (value == "اختار المدينه") { value = "" }
  if (value2 == "اختار القريه") { value2 = "" }

  let element = "";
  for (let i = 0; i < account.length; i++) {
    if (account[i].city.includes(value) && account[i].vilage.includes(value2) ) {
      element += `
               <tr>
                <td >${account[i].nu}</td>
                <td >${account[i].name}</td>
                <td >${account[i].city}</td>
                <td >${account[i].vilage}</td>
                <td >${account[i].address}</td>
                <td >${account[i].phone}</td>
                <td >${account[i].filter}</td>
                <td >${account[i].candle}</td>
                <td >${account[i].visit}</td>
                <td >${account[i].total}</td>
                <td >${account[i].alart}</td>
              </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}


function insert_value(id) {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  let date = document.querySelector(".date").value
  let price = document.querySelector(".price").value

  if (date ==="") {alert("ادخل التاريخ");return};
  if (price ==="") {alert("ادخل قيمة القسط");return};


  let co = account[id].visit + 11
  let id1 = account[id].nu

  MsgBox();

  url = General_URL + "?date=" + date + "&id=" + id1 + "&action=update" + "&price=" + price + "&co=" + co
  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

  document.querySelector(".date").value = ""
  document.querySelector(".price").value =""
}


function toggle2(id) {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  if (document.title === "طلبات تمت" || document.title === "عقود منتهيه") { return }
  let parent = document.querySelector(".parent_abc");
  parent.classList.toggle("active");
  document.querySelector(".btn_save").id = id
  document.querySelector(".price").value =""


  if (id ==="canceel") {return}
  document.querySelector(".name_customer").innerText =  account[id].name

  let date = new Date(), yeer = date.getFullYear(), mons = date.getMonth() + 1, day = date.getDate(), fulldate
  if (mons < 10 && day < 10) { fulldate = yeer + "-0" + mons + "-0" + day }
  else if (mons > 10 && day > 10) { fulldate = yeer + "-" + mons + "-" + day }
  else if (mons > 10 && day < 10) { fulldate = yeer + "-" + mons + "-0" + day }
  else if (mons < 10 && day > 10) { fulldate = yeer + "-0" + mons + "-" + day }
  document.querySelector(".date").value = fulldate;

}
