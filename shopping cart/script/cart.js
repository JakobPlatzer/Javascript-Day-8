const products = [{
        name: "HTML Course",
        image: "html-icon-logo.png",
        price: 500.99,
        qtty: 1,
    },
    {
        name: "CSS Course",
        image: "css-icon-logo.png",
        price: 800.5,
        qtty: 1,
    },
    {
        name: "JS Course",
        image: "js-icon-logo.png",
        price: 2100.0,
        qtty: 1,
    }
];

for (let val of products) {
    document.getElementById("products").innerHTML += `<p>${val.name}</p>
  <p>${val.price}</p>
  <img src="images/${val.image}" width="150"><br>
  <input type="submit" value="Add to cart" class="addToCart"><hr>
  `;
}

let cart = [];

let btns = document.getElementsByClassName("addToCart");
console.log(btns)
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i]); // a = products[i]
        total();
    })
}


function addToCart(obj) { //  html course
    if (cart.find(function(val) { return val.name == obj.name })) { // () => 
        obj.qtty++;
    } else {
        cart.push(obj);
    }

    createCartInHTML();
}




function createCartInHTML() {
    document.getElementById("cart").innerHTML = "";
    for (let val of cart) {
        document.getElementById("cart").innerHTML += `<div style="display:flex;align-items: center; justify-content: space-around">
      <p>${val.name}</p>
      <p><img src="images/${val.image}" width="100"></p>
      <p>${val.price}</p>
      <p><p class="minus">-</p>  <span class="qtty">${val.qtty}</span> <p class="plus">+</p> <p class="delete">X</p></p>

    </div>`;
    }

    let plusBtns = document.getElementsByClassName("plus");
    let minusBtns = document.getElementsByClassName("minus");
    let deleteBtns = document.getElementsByClassName("delete");

    for (let i = 0; i < plusBtns.length; i++) {
        plusBtns[i].addEventListener("click", function() {
            cart[i].qtty++;
            document.getElementsByClassName("qtty")[i].innerHTML = cart[i].qtty;
            total();
        })

        minusBtns[i].addEventListener("click", function() {
            if (cart[i].qtty == 1) {
                cart.splice(i, 1);
                createCartInHTML();
                total();
                // -----
            } else {
                cart[i].qtty--;
                document.getElementsByClassName("qtty")[i].innerHTML = cart[i].qtty;
                total();
            }
        })

        deleteBtns[i].addEventListener("click", function() {
            cart[i].qtty = 1;
            cart.splice(i, 1);
            createCartInHTML();
            total();
        })
    }
}

function total() {
    let total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }
    document.getElementById("total").innerHTML = `Total : ${total} €`;
}


// arrayName.splice(indexOfyourElementthatyouwanttoremove, 1)