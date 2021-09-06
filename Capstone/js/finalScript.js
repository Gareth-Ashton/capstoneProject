let carts = document.querySelectorAll(".shop-item-button");

let products = [
  {
    name: "Monstera",
    tag: "monstera",
    price: 10,
    inCart: 0,
  },
  {
    name: "Eucalyptus",
    tag: "eucalyptus",
    price: 20,
    inCart: 0,
  },
  {
    name: "Succulent",
    tag: "succulent",
    price: 30,
    inCart: 0,
  },
  {
    name: "Palm",
    tag: "palm",
    price: 40,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers"); //This outputs a string and not a number

  productNumbers = parseInt(productNumbers); // parseInt turns productNumbers in a number

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    // the below grabs the product tag from the top of the page and increases it by 1
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  // console.log("The product price is", product.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cart cost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-items");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      
      <div class="product">
      <button class="btn btn-danger" type="button">REMOVE</button>
      
      
      <img src="./img/${item.tag}.jpg" width=100>
      
      <span>${item.name}</span>
      
      
      
      
      
      <div class="cart-quantity"></div>
      
      <div class="cart-price">R${item.price},00</div>
      
      
      
      <div class="cart-quantity cart-quantity-input">
      <span>${item.inCart}</span>
      </div>
      <div class="total">
      R${(item.inCart * item.price).toFixed(2)}
      </div>
      `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer"
    <h4 class="basketTotalTitle">
    Total incl.VAT:
    </h4>
    <h4 class="basketTotal">
    R${cartCost = (cartCost * 1.15 * 100 / 100).toFixed(2)} 
    
    </h4>
    </div>
    `;

    //COURIER ADDING TO TOTAL
    const selectElement = document.querySelector('.courier');
    selectElement.addEventListener('change', (event) => {
      const result = document.querySelector('.basketTotal');
      result.textContent = `R${(+event.target.value * 1.15 * 100 / 100 + +cartCost).toFixed(2)}`;
    });


    //COUPON ADDING TO TOTAL
    const selectCoupon = document.querySelector('.coupon');
    selectCoupon.addEventListener('change', (event) => {
      const result = document.querySelector('.basketTotal');
      result.textContent = `R${(cartCost - (cartCost * event.target.value)/100).toFixed(2)}`
    });


    //USING THE MATH.ROUND FUNCTION TO ROUND THE TOTAL TO TWO DECIMAL PLACES
    productContainer = Math.round(cartCost);
    document.getElementsByClassName("basketTotal").innerText =
      "R" + cartCost * 1.15 * 100 / 100;
    alert("Your total is R" + cartCost);
  }
}



// PURCHASE BUTTON CLICKED TO GENERATE REFERENCE NUMBER
function purchaseClicked() {
  alert(
    "Your order was successful! Your reference number is: " +
    Math.random().toString(36).substr(2, 9)
  );
}

function addToCartClicked() {
  alert(
    "Your current total is " + products.price
  );
}


onLoadCartNumbers();
displayCart();
