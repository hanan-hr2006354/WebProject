

const loggedin=localStorage.getItem('loggedInUser');
const choosenCategory = localStorage.getItem('choosenCategory');
const items = localStorage.getItem('items');
let arrayOfItems = [];

if (items) {
    arrayOfItems = JSON.parse(items); //prevents overwriting changes
} else {
    fetch('data/items.json')
        .then(response => response.json())
        .then(data => {
            arrayOfItems = data;
            localStorage.setItem('items', JSON.stringify(arrayOfItems));
        });


    
}

document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/public/login.html'; 
});
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
});


let listOfItems = document.getElementById('category');

let listOfChoosen = [];
let category = [];
if (choosenCategory == 1) {
    category = arrayOfItems.find(item =>item.category==="necklaces");
    
}
if (choosenCategory == 2) {
    category = arrayOfItems.find(item => item.category==="bracelets");
}
if (choosenCategory == 3) {
    category = arrayOfItems.find(item => item.category==="rings");
}
if (choosenCategory == 4) {
    category = arrayOfItems.find(item => item.category==="earrings");
}

if (category) {
    listOfChoosen = category.items;

    const choosenItemsHtml = listOfChoosen.map(item => addDataToHTML(item)).join('');
    listOfItems.innerHTML = choosenItemsHtml;
}

function addDataToHTML(item) {
    return `
        <div class="item" id="${item.id}">
            <div class="card">
                <img src="/public/images/${item.image}" alt="${item.category}" width="250" height="300">
                <p>${item.name}</p>
                <div class="price">$${item.price}</div>
                <div class="quantity">Quantity: ${item.quantity}</div>
                <button class="purchase_button" id="${item.id}" name="${encodeURIComponent(item.name)}" image="${item.image}" price="${item.price}" quantity="${item.quantity}">Purchase Item</button>
            </div>
        </div>`;
}
document.querySelectorAll('.purchase_button').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('id');
        const productName = button.getAttribute('name');
        const productImage = button.getAttribute('image'); //getting the necessary url's
        const productPrice = parseFloat(button.getAttribute('price'));
        const productQuantity = parseFloat(button.getAttribute('quantity'));
        fetch('data/users.json')
            .then(response => response.json())
            .then(data => {
                const customers = data.customers; 
                const customer = customers.find(c => c.username === loggedin);
                if(loggedin ){ if (customer && customer.balance >= productPrice) {
                    console.log(customer.balance);
                    // Redirect to the purchase page with customer's details
                    window.location.href = `/public/purchase.html?id=${productId}&price=${productPrice}&pname=${productName}&pimage=${productImage}&pquantity=${productQuantity}&cname=${customer.name}&cbalance=${customer.balance}`;
                } else {
                    alert('Insufficient balance to make the purchase.');
                }}else{
                    alert('Please Log in.');

                }
               
            });
    });
});