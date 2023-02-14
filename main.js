// array of objects

let flowers = [{
    name: "Rose (red)",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2014/04/10/11/35/red-320891_1280.jpg"
    },{
    name: "Rose (white)",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2016/11/18/22/26/rose-1837163_1280.jpg"
    },{
    name: "Tulip (red)",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2017/03/30/18/38/tulip-2189317_1280.jpg"
    },{
    name: "Tulip (yellow)",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2016/04/30/21/45/tulips-1364024_1280.jpg",
    },{
    name: "Tulip (orange)",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2016/01/05/06/35/tulip-1122031_1280.jpg",
    },{
    name: "Sunflower",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2018/11/02/19/04/sunflowers-3790834_1280.jpg",
    },{
    name: "Lily",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2018/10/21/19/23/flower-3763573_1280.jpg",
    },{
    name: "Orchid",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2018/01/21/20/25/flower-3097458_1280.jpg",
    },{
    name: "Daisy",
    qtty: 0,
    price: 5,
    image: "https://cdn.pixabay.com/photo/2013/07/11/18/34/daisy-144677_1280.jpg",
    }
]

//displays all objects with their respective description in html

for (let val of flowers) {
    document.getElementById("products").innerHTML += `
    <div class="productCard">
    <img src=${val.image} class="productImage"><hr>
    <p class="name">${val.name}</p></br>
    <p class="price">${val.price}€</p><hr>
    <input type="submit" value="Add to cart" class="addToCart"></br>
    </div>`;
}

// empty array for cart

let cart = [];

// all addToCart buttons in product cards 

let cartBtns = document.getElementsByClassName("addToCart");
console.log(cartBtns)

// gives every addToCart button the ability to envoke the addToCart function

for (let i = 0; i < cartBtns.length; i++) {
    cartBtns[i].addEventListener("click", function () {
        addToCart(flowers[i])});
    total();
}

function addToCart(obj) {
    if (cart.find(function(val) {return val.name == obj.name})) {
        obj.qtty++;
    } else {
        cart.push(obj);
}
    createCartInHTML();
    console.log(cart);
}

function createCartInHTML() {
    document.getElementById("cart").innerHTML = "";
    for (let val of cart) {
        document.getElementById("cart").innerHTML += `<div  style="display:flex;align-items: center; justify-content: space-around">
        <p>${val.name}</p>
        <p><img src="images/${val.image}" width="100"></p>
        <p>${val.price}</p>
        <p><p class="minus">-</p>  <span class="qtty">${val.qtty}</span> <p class="plus">+</p> <p class="delete">X</p></p>
        </div>`
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
    let totalPrice = 0;
    for (let val of cart) {
        totalPrice = totalPrice + (val.price*val.qtty);
    } 
    console.log(totalPrice);
}
