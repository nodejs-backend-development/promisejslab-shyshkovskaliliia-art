// ==================== ЗАВДАННЯ 7.5 ====================
/**
 * Створіть складний ланцюжок обробки замовлення
 */

const products = {
    101: { id: 101, name: 'Laptop', price: 1000, stock: 5 },
    102: { id: 102, name: 'Mouse', price: 25, stock: 50 },
    103: { id: 103, name: 'Keyboard', price: 75, stock: 0 }
};

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products[productId];
            if (product) {
                resolve(product);
            } else {
                reject(new Error('Product not found'));
            }
        }, 100);
    });
}

function checkStock(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (product.stock > 0) {
                resolve(product);
            } else {
                reject(new Error('Out of stock'));
            }
        }, 100);
    });
}

function calculateTotal(product, quantity) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                product: product.name,
                quantity: quantity,
                unitPrice: product.price,
                total: product.price * quantity
            });
        }, 100);
    });
}

/**
 * Створіть функцію оформлення замовлення:
 * 1. Отримати продукт за ID
 * 2. Перевірити наявність на складі
 * 3. Обчислити вартість
 * 4. Обробити всі можливі помилки
 * 
 * @param {number} productId 
 * @param {number} quantity 
 * @returns {Promise<{product: string, quantity: number, unitPrice: number, total: number} | {error: string}>}
 */
function placeOrder(productId, quantity) {
    return getProduct(productId)
    .then(product => checkStock(product))
    .then(product => calculateTotal(product, quantity))
    .catch(error => ({ error: error.message }));
}

// Перевірка:
placeOrder(101, 2)
    .then(result => console.log(' Тест 7.5a:', result));
// Очікується: { product: 'Laptop', quantity: 2, unitPrice: 1000, total: 2000 }

placeOrder(103, 1)
    .then(result => console.log(' Тест 7.5b:', result));
// Очікується: { error: 'Out of stock' }

placeOrder(999, 1)
    .then(result => console.log(' Тест 7.5c:', result));
// Очікується: { error: 'Product not found' }
