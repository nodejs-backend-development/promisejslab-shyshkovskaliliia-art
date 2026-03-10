// ==================== ЗАВДАННЯ 2.7 ====================
/**
 * Створіть функцію-обгортку для синхронних функцій,
 * яка перехоплює помилки та повертає проміс
 * 
 * @param {Function} fn - Синхронна функція
 * @param {any[]} args - Аргументи для функції
 * @returns {Promise<any>}
 */
function tryCatchPromise(fn, ...args) {
    try{
        return Promise.resolve(fn(...args));
    } catch(error){
        return Promise.reject(error);
    }
}

// Перевірка:
const goodFunction = (a, b) => a + b;
const badFunction = () => { throw new Error('Oops!'); };

tryCatchPromise(goodFunction, 5, 3)
    .then(result => console.log(' Тест 2.7a:', result)); // 8

tryCatchPromise(badFunction)
    .catch(error => console.log(' Тест 2.7b:', error.message)); // 'Oops!'

