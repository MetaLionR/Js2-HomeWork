var d = document,
    itemBox = d.querySelectorAll('.item_box'),
		cartCont = d.getElementById('cart_content');
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {}, 
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'),
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML,
            itemCalories = parentBox.querySelector('.item_calories').innerHTML;
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][3] += 1;
	} else { 
		cartData[itemId] = [itemTitle, itemPrice,itemCalories, 1];
	}
	if(!setCartData(cartData)){ 
		this.disabled = false; 
		cartCont.innerHTML = 'Товар добавлен в корзину.';
		setTimeout(function(){
			cartCont.innerHTML = 'Продолжить покупки...';
		}, 1000);
	}
	return false;
}

for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

function openCart(e){
	
	var cartData = getCartData(),
			totalItems = '';
	console.log(JSON.stringify(cartData));
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена<th>Калорийность</th></th><th>Кол-во</th></tr>';
		for(var items in cartData){
			totalItems += '<tr>';
			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '</tr>';
		}
		totalItems += '<table>';
		cartCont.innerHTML = totalItems;
	} else {
		cartCont.innerHTML = 'В корзине пусто!';
	}
	return false;
}
addEvent(d.getElementById('checkout'), 'click', openCart);
addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очишена.';	
});