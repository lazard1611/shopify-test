const cartTest = () => { 

    const SELECTORS = {
        qty: '.js-quantity',
        value: '.js-quantity-value',
        input: '.js-quantity-input',
        increase: '.js-quantity-increase',
        decrease: '.js-quantity-decrease',
    };
    
    const quantity = (container) => {            

        const $input = container.querySelector(SELECTORS.input);
        const $value = container.querySelector(SELECTORS.value);
        const $decrease = container.querySelector(SELECTORS.decrease);
        const $increase = container.querySelector(SELECTORS.increase);

        if (!$input || !$value || !$decrease || !$increase) return;

        const maxVal = Number($input.getAttribute('max')) || 99999;
        const minVal = Number($input.getAttribute('min')) || 1;
        let currentVal = Number($input.value);        

        $value.textContent = currentVal;

        const updateContent = () => {
            $value.textContent = currentVal;
            $input.value = currentVal;
        };

        const handleDecrease = () => {
            if (currentVal === minVal) return;
            currentVal -= 1;
            updateContent();
        };
        const handleIncrease = () => {
            if (currentVal === maxVal) return;
            currentVal += 1;
            updateContent();
        };

        $increase.addEventListener('click', handleIncrease);
        $decrease.addEventListener('click', handleDecrease);
    };    

    const updateCart = (key, q) => {   
        
        let updates = {
            '48521706176808:4723b26efbababdd7170b20da16aec65': q            
          }

          console.log('change', change);
         
          fetch(window.Shopify.routes.root + 'cart/update.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updates })
          })
          .then(response => {
            return response.json();
          })
          .catch((error) => {
            console.error('Error:', error);
          });        
    }
   

    const $cartItems = document.querySelectorAll('.js-cart-item');

    $cartItems.forEach(($cartItem) => {
        const $btns = $cartItem.querySelectorAll('.js-quantity-btn');
        const key = $cartItem.getAttribute('data-line-item-key');
        const $currentQuantity = $cartItem.querySelector(SELECTORS.input);        

        quantity($cartItem);

        const handleQuantityUpdate = async (key, newQuantity) => {
            try {
                const response = await fetch('/cart/update.js', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ updates: { [key]: newQuantity } })
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
        
                const data = await response.json();
                console.log('Data:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
        $btns.forEach(($btn) => {
            $btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
        
                const inputValue = Number($currentQuantity.value);
                // console.log('$inputValue', inputValue);                                
                
                handleQuantityUpdate(key, inputValue);
                updateCart(key, inputValue);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', cartTest);