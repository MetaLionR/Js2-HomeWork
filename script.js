function makeGETRequest(url, callback) {
  return new Promise((resolve, reject) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(callback(xhr.responseText));
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
  });
}


class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `<div class="goods-item">
      <h3 class="goods-item__title">${ this.product_name }</h3>
      <p class="goods-item__price">${ this.price }</p>
    </div>`;
  }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    makeGETRequest(`${ API_URL }/catalogData.json`, (goods) => {
      const promise = new Promise((resolve, reject) => {
        resolve(this.goods = JSON.parse(goods));
      });

      promise
        .then(this.render())
        .then(this.calculateCost())
    });
  }

  calculateCost() {
    let sum = null;
    this.goods.forEach(good => {
      sum += good.price;
    });
    return sum;
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const GoodItem = new GoodsItem(good.product_name, good.price);
      listHtml += GoodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class CartItem {
  constructor() {}

  increaseQuantity() {} //Увеличить кол-во продуктов, уже добавленных в корзину

  reduceQuantity() {} //Уменьшить кол-во продуктов, уже добавленных в корзину

  render() {}
}

class Cart {
  constructor() {}

  goods = [];

  //Добавить продукт в корзину
  add(good) {
    this.goods.push(good);
  }

  //Удалить продукт из корзины
  remove(good) {
    this.goods.splice(this.goods.indexOf(good), 1);
  } 

  clear() {} //Очистить корзину

  calculateCost() {} //Подсчитать стоимость продуктов в корзине

  //Получение списка товаров корзины
  getList() {
    return this.goods;
  }
}

const list = new GoodsList();
list.fetchGoods();

const cart = new Cart();

setTimeout(() => {
  cart.add(list.goods[0]);
  cart.add(list.goods[1]);
  
  cart.remove(cart[0]);

  console.log(cart);

  console.log(cart.getList());  
}, 100);