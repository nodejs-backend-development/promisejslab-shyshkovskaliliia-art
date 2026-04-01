// ==================== ЗАВДАННЯ 2.4 ====================
/**
 * Створіть функцію, яка приймає проміс або звичайне значення
 * і завжди повертає проміс
 * Підказка: Promise.resolve() може приймати вже існуючий проміс
 * 
 * @param {any} value 
 * @returns {Promise<any>}
 */
function ensurePromise(value) {
    return Promise.resolve(value);
}

// Перевірка:
ensurePromise(42)
    .then(val => console.log(' Тест 2.4a:', val)); // 42

ensurePromise(Promise.resolve(100))
    .then(val => console.log(' Тест 2.4b:', val)); // 100

