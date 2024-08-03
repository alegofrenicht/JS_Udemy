const shoppingCost = 10;
const cart = [];

export default function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 35;

export { totalPrice, totalQuantity};
