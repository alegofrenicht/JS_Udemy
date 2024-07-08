// const lotteryPromise = new Promise(function(resolve, reject){
//     console.log('Lotter draw is happening');
//     setTimeout(function(){
//     if(Math.random() >= 0.5){
//         resolve('You WIN')
//     } else {
//         reject(new Error('You lost money'));
//     }}, 2000)
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000);
    });
};

wait(1).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
}).then(() => console.log('I waited for 1 second'));
// setTimeout(function(){console.log('YOU WIN')}, 2000);
// setTimeout(function(){
//     console.log('I waited for 1 seconds')
//     setTimeout(function(){console.log('I waited for 2 seconds')}, 2000)
// }, 1000)

Promise.resolve('abc').then()

