var Name = document.getElementById("PName");
var Price = document.getElementById("PPrice");
var Company = document.getElementById("PCompany");
var Desc = document.getElementById("PDesc");
var row = document.getElementById("InnHtml");
var btn = document.getElementById("Btn");
var Sarea = document.getElementById("Search-area");
var Sresult = document.getElementById("result-area");
var products;
var items;
var currentProduct = 0;

if (localStorage.getItem("items") == null)
    products = [];
else
    products = JSON.parse(localStorage.getItem("items"));

Display();


btn.onclick = function () {
    if (btn.innerHTML == "Add Product") {
        addproduct();
        Display();
        empty();
    } else {
        UpdateProduct();
        Display();

    }

}
Sarea.onkeyup = function () {
    search(Sarea.value);
}

function empty() {
    Name.value = "";
    Price.value = "";
    Company.value = "";
    Desc.value = "";
}
function addproduct() {
    if (isNaN(Number(Price.value)) == true)
        alert("enter a valid price");
    else {

        var product = {
            name: Name.value,
            price: Price.value,
            company: Company.value,
            Desc: Desc.value,

        }
        products.push(product);
    }
    localStorage.setItem("items", JSON.stringify(products));
}
function Display() {
    cols = "";
    for (var i = 0; i < products.length; i++) {
        cols += ` <div class="col-lg-4 text-center">
                 <h3 class="text-warning">` + products[i].name + `</h3>
                 <p class="text-primary">` + products[i].price + `</p>
                 <p class="text-warning">` + products[i].company + `</p>
                 <p class="text-success">` + products[i].Desc + `</p>
                  <button onclick="Delete(` + i + `)" id="btndel" class="btn btn-danger">Delete</button>
                  <button onclick="SetForm(` + i + `)" id="btndel" class="btn btn-primary">Update</button>
              </div>`;
    }
    row.innerHTML = cols;
}
function Delete(number) {
    products.splice(number, 1);
    localStorage.setItem("items", JSON.stringify(products));
    Display();
}
function search(Selemnt) {
    var scols = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toUpperCase().includes(Selemnt.toUpperCase())) {
            scols += ` <div class="col-lg-3 text-center">
                 <h3 class="text-warning">` + products[i].name + `</h3>
                 <p class="text-primary">` + products[i].price + `</p>
                 <p class="text-warning">` + products[i].company + `</p>
                 <p class="text-success">` + products[i].Desc + `</p>
                  <button onclick="Delete(` + i + `)" id="btndel" class="btn btn-danger">Delete</button>
              </div>`;
        }

    }
    Sresult.innerHTML = scols;
}
function SetForm(number) {
    Name.value = products[number].name;
    Price.value = products[number].price;
    Company.value = products[number].company;
    Desc.value = products[number].Desc;

    btn.innerHTML = "Update Product";

    currentProduct = i;
}
function UpdateProduct() {
    products[currentProduct].name = Name.value;
    products[currentProduct].price = Price.value;
    products[currentProduct].company = Company.value;
    products[currentProduct].Desc = Desc.value;
    btn.innerHTML = "Add Product";

    localStorage.setItem("items", JSON.stringify(products));

}