const cartTest = () => {
    const SELECTORS = {
        qty: '.js-quantity',
        value: '.js-quantity-value',
        input: '.js-quantity-input',
        increase: '.js-quantity-increase',
        decrease: '.js-quantity-decrease',
        count: '.js-cart-count',
        totalPrice: '.js-total-price',
    };

    const $count = document.querySelector(SELECTORS.count);
    const $totalPrice = document.querySelector(SELECTORS.totalPrice);
    const $spinner = document.querySelector('.js-spinner');

    const textContentCount = Number($count.textContent);

    let isPosted = false;

    // const quantity = (container, btn) => {
    //     const $input = container.querySelector(SELECTORS.input);
    //     const $value = container.querySelector(SELECTORS.value);
    //     const $decrease = container.querySelector(SELECTORS.decrease);
    //     const $increase = container.querySelector(SELECTORS.increase);
    //
    //     if (!$input || !$value || !$decrease || !$increase) return;
    //
    //     const maxVal = Number($input.getAttribute('max')) || 99999;
    //     const minVal = Number($input.getAttribute('min')) || 1;
    //     let currentVal = Number($input.value);
    //
    //     $value.textContent = currentVal;
    //
    //     const updateContent = () => {
    //         $value.textContent = currentVal;
    //         $input.value = currentVal;
    //     };
    //
    //     const handleDecrease = () => {
    //         if (currentVal === minVal) return;
    //         currentVal -= 1;
    //         updateContent();
    //     };
    //
    //     const handleIncrease = () => {
    //         if (currentVal === maxVal) return;
    //         currentVal += 1;
    //         updateContent();
    //     };
    //
    //     if (btn.closest(SELECTORS.decrease)) {
    //         handleDecrease();
    //         console.log('-');
    //     } else {
    //         handleIncrease();
    //         console.log('+');
    //     }
    // };

    const $cartItems = document.querySelectorAll('.js-cart-item');

    $cartItems.forEach(($cartItem) => {
        const $btns = $cartItem.querySelectorAll('.js-quantity-btn');
        const key = $cartItem.getAttribute('data-line-item-key');
        const price = $cartItem.getAttribute('data-item-price');
        const $currentQuantity = $cartItem.querySelector(SELECTORS.input);
        const inputValue = Number($currentQuantity.value);


        // $spinner.style.display = 'block'

        const updateCartData = async (key, cartItem, btn) => {
            isPosted = true;
            const $input = cartItem.querySelector(SELECTORS.input);
            const $value = cartItem.querySelector(SELECTORS.value);
            const maxVal = Number($input.getAttribute('max')) || 99999;
            const minVal = Number($input.getAttribute('min')) || 1;
            let currentVal = Number($input.value);

            $value.textContent = currentVal;

            const updateContent = () => {
                $value.textContent = currentVal;
                $input.value = currentVal;

            };

            $btns.forEach(($btn) => {
                $btn.disabled = true;
            });

            $spinner.style.display = 'block';

            const isDecrease = btn.closest(SELECTORS.decrease)

            try {
                console.log(currentVal);
                const response = await fetch('/cart/update.js', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        updates: { [key] : isDecrease ? currentVal - 1 : currentVal + 1}
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                isPosted = false;

                $btns.forEach(($btn) => {
                    $btn.disabled = false;
                });

                const handleDecrease = () => {
                    if (currentVal === minVal) return;
                    currentVal -= 1;
                    $count.textContent = `${textContentCount - 1}`;
                    updateContent();
                };

                const handleIncrease = () => {
                    if (currentVal === maxVal) return;
                    currentVal += 1;
                    $count.textContent = `${textContentCount + 1}`;
                    updateContent();
                };

                if (btn.closest(SELECTORS.decrease)) {
                    handleDecrease();
                } else {
                    handleIncrease();
                }

                $spinner.style.display = 'none';

            }
        };

        $btns.forEach(($btn) => {
            $btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isPosted) return;

                updateCartData(key, $cartItem, $btn);
            });
        });
    });
}


document.addEventListener('DOMContentLoaded', cartTest);
