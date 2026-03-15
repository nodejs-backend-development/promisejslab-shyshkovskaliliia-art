// ==================== ЗАВДАННЯ 2.5 ====================
/**
 * Створіть функцію для конвертації callback-based функції в проміс
 * Функція має приймати значення та callback(error, result)
 * Поверніть проміс, який резолвиться з результатом
 * 
 * @param {any} value 
 * @returns {Promise<string>}
 */
function callbackToPromise(value) {
    return new Promise((resolve, reject) => {
        setTimeout((error, reject) => {
            if (error){
                reject(error);
            } else {
                resolve('Processed:'+value);
            }
        },100);
    });
}

// Перевірка:
callbackToPromise('test')
    .then(result => console.log(' Тест 2.5:', result));
// Очікується: 'Processed: test'