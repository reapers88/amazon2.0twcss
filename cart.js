function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
        //image: doc.data().image,
        //name: doc.data().name,
        //make: doc.data().make,
        //rating: doc.data().rating,
        //price: doc.data().price,
      });
    });
    generateCartItems(cartItems);
  });
}

function generateCartItems(cartItems) {
  let itemsHTML = "";
  cartItems.forEach((item) => {
    itemsHTML += `
        <div class="cart-item flex items-center p-4 border-b border-gray-100">
            <div class="cart-item-image w-30 h-24 bg-white rounded-lg p-4 mr-3">
                <img class="w-full h-full object-contain" src="${item.image} ">

            </div>
            <div class="cart-item-details flex-grow">
                <div class="cart-item-title font-bold text-sm text-gray-600">
                ${item.name}
                </div>
                <div class="cart-item-brand font-bold text-sm text-gray-500">
                ${item.make}
                </div>
            </div>
            <div class="cart-item-counter w-48 flex items-center ">
                <div class="chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2 p-3">
                    <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                    <h4>x${item.quantity}</h4>
                <div class="chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2 p-3">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
                <div class="cart-item-total-cost w-40 font-bold text-gray-500">
                ${item.price * item.quantity}
                </div>
                <div class="cart-item-delete w-10 font-bold text-gray-400 cursor-pointer hover:bg-gray-600 ">
                    <i class="fas fa-times"></i>
                </div>
        </div>
        `;
  });
  document.querySelector(".cart-items").innerHTML = itemsHTML;
}

getCartItems();
