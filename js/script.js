const data = [
	{
		id: 0,
		src: "./img/chair.jpeg",
		title: "Pica Chair",
		color: "Jade Velvet",
		"general dimensions": '29" L x 30" W x 27" H',
		price: "$690",
	},
	{
		id: 1,
		src: "./img/lounger.jpeg",
		title: "Range 4-Piece Sectional Lounger",
		color: "Heather Charcoal",
		"general dimensions": '91.5" L x 60.5" D x 28" H',
		price: "$3405",
	},
	{
		id: 2,
		src: "./img/sideboard.jpeg",
		title: "Carta Credenza",
		color: "Walnut",
		"general dimensions": '50" L x 16.5" W x 28" H',
		price: "$395",
	},
	{
		id: 3,
		src: "./img/ottoman.jpeg",
		title: "Range Ottoman",
		color: "Heather Charcoal",
		"general dimensions": '29.5" L x 29.5" D x 16" H',
		price: "$600",
	},
	{
		id: 4,
		src: "./img/lamp.jpeg",
		title: "Ellis Floor Lamp",
		color: "Walnut",
		"general dimensions": '16" Dia. x 11" H',
		price: "$190",
	},
	{
		id: 5,
		src: "./img/chorus-bed.jpeg",
		title: "Chorus Bed, Queen with Wood Headboard",
		color: "Walnut",
		"general dimensions": '85" D x 63" W x 14.5" H',
		price: "$1260",
	},
	{
		id: 6,
		src: "./img/lodge-chair.jpeg",
		title: "Lodge Chair",
		color: "Camel Leather",
		"general dimensions": '29" L x 31" W x 33" H',
		price: "$760",
	},
	{
		id: 7,
		src: "./img/prospect-nightstand.jpeg",
		title: "Prospect Nightstand",
		color: "Walnut",
		"general dimensions": '20" L x 17.7" D x 24" H',
		price: "$395",
	},
	{
		id: 8,
		src: "./img/index-stool.jpeg",
		title: "Index Stool",
		color: "Walnut",
		"general dimensions": '13.5" Dia. x 18" H',
		price: "$195",
	},
];

const dataOrdered = [];

const orderItemTemplate = `
<div class="cart-item">
						<div class="cart-item__img"><img src="" class="cart-item__img-src" alt="" /></div>
						<div class="cart-item__content">
							<div>
								<div class="cart-item__title"></div>
								<div class="cart-item__color"></div>
								<div class="cart-item__general-dimensions"></div>
							</div>
							<div class="cart-item__price">
								<div class="cart-item__price_default"></div>
							</div>
						</div>
						<button class="cart-item__trash">
					<svg class="cart-item__trash-svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M22,5a1,1,0,0,1-1,1H3A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5ZM4.934,21.071,4,8H20l-.934,13.071a1,1,0,0,1-1,.929H5.931A1,1,0,0,1,4.934,21.071ZM15,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Zm-4,0a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0ZM7,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Z" />
					</svg>
				</button>
					</div>`;

let catalog = document.querySelector(".catalog__wrapper");
const total = document.querySelector(".purchase__total-price");
let order = [];
const buttonCart = document.querySelector(".button");
let itemsCount = document.querySelector(".shopping-cart__count");
let discountCounter = 0;
const discountMessage = document.createElement("div");
let orderArea = document.querySelector(".shopping-cart__order");

window.onload = function () {
	if (window.location.href.indexOf("cart.html") > -1) {
		order = JSON.parse(localStorage.getItem("orderFull"));
		countOrderItems();
		showInCart();
		showTotalPrice();
		buttonCart.addEventListener("click", useDiscount);
	}
	if (window.location.href.indexOf("index.html") > -1) {
		showCatalog();
		let buttonsToAdd = document.querySelectorAll(".catalog-item__button");
		buttonsToAdd.forEach((button) => {
			button.addEventListener("click", addToCart);
		});
		createOrderList();
	}
};

function showCatalog() {
	data.forEach((el) => {
		catalog.innerHTML += `
	<div class="catalog-item">
						<div class="catalog-item__img"><img src='${el["src"]}'class="catalog-item__img-src" alt='${el["title"]}'/></div>
						<div class="catalog-item__content">
							<div>
								<div class="catalog-item__title">${el["title"]}</div>
								<div class="catalog-item__color">Color: ${el["color"]}</div>
								<div class="catalog-item__general-dimensions">General Dimensions: ${el["general dimensions"]}</div>
							</div>
							<div class="catalog-item__price">
								<div class="catalog-item__price_default">${el["price"]}</div>
							</div>
						</div>
						<button class="catalog-item__button" data-num="${el["id"]}">Add to Cart</button>
					</div>
	`;
	});
}

const addToCart = (e) => {
	e.target.style.display = "none";
	let buttonAdded = document.createElement("button");
	buttonAdded.className = "catalog-item__button_added";
	buttonAdded.innerHTML = "Added";
	e.target.after(buttonAdded);
	dataOrdered.push(data[e.target.dataset.num]);
};

function createOrderList() {
	localStorage.setItem("orderFull", JSON.stringify(dataOrdered));
}

function countOrderItems() {
	itemsCount.innerHTML = order.length + " items";
}

function showTotalPrice() {
	let sum = 0;
	for (let i = 0; i < orderArea.childElementCount; i++) {
		let price = +order[i]["price"].slice(1);
		sum += price;
	}
	total.innerHTML = "$" + sum;
}

function showInCart() {
	orderArea.innerHTML = "";
	order.forEach((el, index) => {
		orderArea.innerHTML += `
		<div class="cart-item">
								<div class="cart-item__img"><img src="${el["src"]}" class="cart-item__img-src" alt="${el["title"]}" /></div>
								<div class="cart-item__content">
									<div>
										<div class="cart-item__title">${el["title"]}</div>
										<div class="cart-item__color">Color: ${el["color"]}</div>
										<div class="cart-item__general-dimensions">General Dimensions: ${el["general dimensions"]}</div>
									</div>
									<div class="cart-item__price">
										<div class="cart-item__price_default">${el["price"]}</div>
									</div>
								</div>
								<button class="cart-item__trash" data-num='${index}'>
							<svg class="cart-item__trash-svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M22,5a1,1,0,0,1-1,1H3A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5ZM4.934,21.071,4,8H20l-.934,13.071a1,1,0,0,1-1,.929H5.931A1,1,0,0,1,4.934,21.071ZM15,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Zm-4,0a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0ZM7,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Z" />
							</svg>
						</button>
							</div>`;
	});
	let orderButton = document.querySelectorAll(".cart-item__trash");
	orderButton.forEach((button) => {
		button.addEventListener("click", deleteOrderedItem);
	});
}

const useDiscount = (e) => {
	let result = 0;
	let pricesDiscount = document.querySelectorAll(".cart-item__price_default");
	if (discountCounter === 1 && discountMessage.innerHTML !== "Cart is empty") {
		discountMessage.innerHTML = "You have already used the discount";
	}
	if (discountCounter === 0) {
		for (let i = 0; i < orderArea.childElementCount; i++) {
			let price = order[i]["price"].slice(1);
			let priceDiscount = price * (1 - 0.2);
			let discountDiv = document.createElement("div");
			discountDiv.className = "cart-item__price_discount";
			discountDiv.innerHTML = "$" + priceDiscount;
			pricesDiscount[i].after(discountDiv);
			pricesDiscount[i].classList.add("cart-item__price_irrelevant");
			result += priceDiscount;
		}
		discountMessage.className = "purchase__discount-message";
		if (result === 0) {
			discountMessage.innerHTML = "Cart is empty";
		} else {
			discountMessage.innerHTML = "Discount successfully used";
		}
		e.target.after(discountMessage);
		total.innerHTML = "$" + result;
		discountCounter = 1;
	}
};

const deleteOrderedItem = (e) => {
	order.splice(e.currentTarget.dataset.num, 1);
	discountCounter = 0;
	discountMessage.innerHTML = "";
	showInCart();
	countOrderItems();
	showTotalPrice();
};
