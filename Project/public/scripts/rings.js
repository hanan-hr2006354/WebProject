
let listProductHTML = document.querySelector('.category-rings');

const getBracelet = () => {
    fetch('rings.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    })
    .then(() => {
        document.querySelectorAll('.purchase_button').forEach(button => {
            button.addEventListener('click', () => {
                const productId=button.getAttribute('id');
                const productName=button.getAttribute('name');
                const productImage=button.getAttribute('image'); //getting the necessary url's
                const productPrice=parseFloat(button.getAttribute('price'));
                const productQuanity=parseFloat(button.getAttribute('quantity'));

                fetch('customer.json')
                .then(response => response.json())
                .then(customers => {
                    // Find Alice's information in the array
                    const customer = customers.find(c => c.name === "Mohammed");
                    
                    // Check if Alice's balance is sufficient
                    if (customer && customer.balance >= productPrice) {
                        console.log(customer.balance);
                        // Redirect to the purchase page with Alice's details
                        window.location.href = `/public/purchase.html?id=${productId}&price=${productPrice}&pname=${productName}&pimage=${productImage}&pquantity=${productQuanity}&cname=${customer.name}&cbalance=${customer.balance}`;
                    } else {
                        alert('Alice has insufficient balance to make the purchase.');
                    }
                });
            
            });
        });
    });
}

getBracelet();

const addDataToHTML = () => {
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<div class="card">
                <img src="/public/images/${product.image}" alt="bracelets"width="250" height="300">
                <p>${product.name}</p>
                <div class="price">$${product.price}</div>
                <div class="quantity">Quantity: ${product.quantity}</div>
               <button class="purchase_button" id=${product.id} name=${encodeURIComponent(product.name)} image=${product.image} price=${product.price} quantity=${product.quantity}>Purchase Item</button>
            </div>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }



