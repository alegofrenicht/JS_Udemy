'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const closeModal = function (){
    modal.style.display = 'none'
    overlay.style.display = 'none'
}
const openModal = function (){
    modal.style.display = 'block'
    overlay.style.display = 'block'
}

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal)
btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keypress', function (e){
    if (e.key === 'c'){
        closeModal()
    }
})

