const total = document.querySelector(".purchase__total-price");
let order = [];
const button = document.querySelector(".button");
let itemsCount = document.querySelector(".shopping-cart__count");
let discountCounter = 0;
const discountMessage = document.createElement("div");
let result = 0;
let orderArea = document.querySelector(".shopping-cart__order");

function createOrderList() {
	localStorage.setItem("orderFull", JSON.stringify(order));
}

function showTotalPrice() {
	let sum = 0;
	for (let i = 0; i < orderArea.childElementCount; i++) {
		let price = +order[i]["Price"].slice(1);
		sum += price;
	}
	total.innerHTML = "$" + sum;
}

function countOrderItems() {
	itemsCount.innerHTML = order.length + " items";
}

function ShowInCart() {
	order.forEach((el) => {
		let OrderItem = document.createElement("div");
		OrderItem.className = "cart-item";
		let OrderItemImg = document.createElement("div");
		OrderItemImg.className = "cart-item__img";
		OrderItem.append(OrderItemImg);
		let OrderItemImgSrc = document.createElement("img");
		OrderItemImgSrc.className = "cart-item__img-src";
		OrderItemImgSrc.src = el["Picture"];
		OrderItemImg.append(OrderItemImgSrc);
		let OrderItemContent = document.createElement("div");
		OrderItemContent.className = "cart-item__content";
		OrderItem.append(OrderItemContent);
		let OrderItemContentDiv = document.createElement("div");
		OrderItemContent.append(OrderItemContentDiv);
		let OrderItemTitle = document.createElement("div");
		OrderItemTitle.className = "cart-item__title";
		OrderItemTitle.innerHTML = el["Title"];
		OrderItemContentDiv.append(OrderItemTitle);
		let OrderItemColor = document.createElement("div");
		OrderItemColor.className = "cart-item__color";
		OrderItemColor.innerHTML = el["Color"];
		OrderItemContentDiv.append(OrderItemColor);
		let OrderItemDimensions = document.createElement("div");
		OrderItemDimensions.className = "cart-item__general-dimensions";
		OrderItemDimensions.innerHTML = el["General dimensions"];
		OrderItemContentDiv.append(OrderItemDimensions);
		let OrderItemPrice = document.createElement("div");
		OrderItemPrice.className = "cart-item__price";
		OrderItemContent.append(OrderItemPrice);
		let OrderItemPriceDefault = document.createElement("div");
		OrderItemPriceDefault.className = "cart-item__price_default";
		OrderItemPriceDefault.innerHTML = el["Price"];
		OrderItemPrice.append(OrderItemPriceDefault);
		orderArea.append(OrderItem);
	});
}

function addToCart(card) {
	const buttonToAdd = card.querySelector(".catalog-item__button");
	buttonToAdd.style.display = "none";
	let buttonAdded = document.createElement("button");
	buttonAdded.className = "catalog-item__button_added";
	buttonAdded.innerHTML = "Added";
	card.append(buttonAdded);
	let cartItem = {};
	cartItem["Picture"] = card.querySelector(".catalog-item__img-src").src;
	cartItem["Title"] = card.querySelector(".catalog-item__title").innerText;
	cartItem["Color"] = card.querySelector(".catalog-item__color").innerText;
	cartItem["General dimensions"] = card.querySelector(".catalog-item__general-dimensions").innerText;
	cartItem["Price"] = card.querySelector(".catalog-item__price_default").innerText;
	localStorage.setItem(cartItem, JSON.stringify(cartItem));
	order.push(cartItem);
}

function useDiscount() {
	let pricesDiscount = document.querySelectorAll(".cart-item__price_default");
	if (discountCounter === 1) {
		discountMessage.innerHTML = "You have already used the discount";
	}
	if (discountCounter === 0) {
		for (let i = 0; i < orderArea.childElementCount; i++) {
			let price = order[i]["Price"].slice(1);
			let priceDiscount = price * (1 - 0.2);
			let discountDiv = document.createElement("div");
			discountDiv.className = "cart-item__price_discount";
			discountDiv.innerHTML = "$" + priceDiscount;
			pricesDiscount[i].after(discountDiv);
			pricesDiscount[i].classList.add("cart-item__price_irrelevant");
			result += priceDiscount;
		}
		discountMessage.className = "purchase__discount-message";
		discountMessage.innerHTML = "Discount successfully used";
		button.after(discountMessage);
		total.innerHTML = "$" + result;
		discountCounter = 1;
	}
}

window.onload = function () {
	if (window.location.href.indexOf("cart.html") > -1) {
		order = JSON.parse(localStorage.getItem("orderFull"));
		countOrderItems();
		ShowInCart();
		showTotalPrice();
	}
};
