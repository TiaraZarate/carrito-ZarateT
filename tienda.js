const agregarBotones= document.querySelectorAll('.agregarCarrito');
agregarBotones.forEach((botonAgregar) => {
  botonAgregar.addEventListener('click', agregarCarrito);
});

const comprarButton = document.querySelector('.comprarBoton');
comprarButton.addEventListener('click', comprarButtonClicked);

const carritoCompras = document.querySelector(
  '.carritoCompras'
);

function agregarCarrito(e) {
  const button = e.target;
  const item = button.closest('.item');

  const itemTitulo = item.querySelector('.item-titulo').textContent;
  const itemPrecio = item.querySelector('.item-precio').textContent;
  const itemImg = item.querySelector('.item-img').src;

  agregarProductos(itemTitulo, itemPrecio, itemImg);
}

function agregarProductos(itemTitulo, itemPrecio, itemImg) {
  const elementosTitulos = carritoCompras.getElementsByClassName(
    'ArticuloCarrito'
  );
  for (let i = 0; i < elementosTitulos.length; i++) {
    if (elementosTitulos[i].innerText === itemTitulo) {
      let cantidadElementos = elementosTitulos[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.itemElementos'
      );
      cantidadElementos.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const carritoContenido = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImg} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = carritoContenido;
    carritoCompras.append(shoppingCartRow);
  
    shoppingCartRow
      .querySelector('.buttonDelete')
      .addEventListener('click', removeShoppingCartItem);
  
    shoppingCartRow
      .querySelector('.shoppingCartItemQuantity')
      .addEventListener('change', quantityChanged);
  
    updateShoppingCartTotal();
  }
  
  function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
        shoppingCartItemQuantityElement.value
      );
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
  }
  
  function removeShoppingCartItem(e) {
    const buttonClicked = e.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
  function quantityChanged(e) {
    const input = e.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }
  
  function comprarButtonClicked() {
    carritoCompras.innerHTML = '';
    updateShoppingCartTotal();
  }
