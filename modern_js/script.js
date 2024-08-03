import add, {cart} from './importFile.js';

// add('bread', 5);
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data)
// console.log('Something')
// const getLastPost = async function(){
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     const data = await res.json();
    // console.log(data)

    // return {title: data.at(-1).title, text: data.at(-1).body};
// };
// const lastPost = await getLastPost();
// console.log(lastPost);
// lastPost.then(last => console.log(last));

// const ShoppingCart = (function (){
//     const cart = [];
//     const shoppingCost = 10;    
//     const totalPrice = 237;
//     const totalQuantity = 35;

//     const addToCart = function(product, quantity){
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart`);
//     };

//     const orderStock = function(product, quantity){
//         console.log(`${quantity} ${product} ordered from supplier`);
//     };

//     return {
//         addToCart,
//         cart, 
//         totalPrice,
//         totalQuantity
//     }
// })();

// ShoppingCart.addToCart('apple', 4);
// ShoppingCart.addToCart('pizza', 2);
// console.log(ShoppingCart.shoppingCost);
import cloneDeep from "lodash-es";
const state = {
    cart: [
        { product: 'bread', quantity: 5},
        { product: 'pizza', quantity: 5},
    ],
    user: { loggedIn: true},
};

const stateCLone = Object.assign({}, state);
const stateDeepCLone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateCLone);
console.log(stateDeepCLone);

if (module.hot) {
    module.hot.accept();
};

import 'core-js/stable';
import 'regenerator-runtime/runtime'



