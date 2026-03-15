// ==================== ЗАВДАННЯ 10.4 ====================
/**
 * Створіть функцію, яка конкурує кілька джерел даних
 * і повертає першу успішну відповідь
 * Але якщо всі джерела падають - reject
 */

function unreliableSource(name, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve({ source: name, data: 'Success!' });
            }
        }, delay);
    });
}

/**
 * Спробуйте отримати дані з кількох джерел
 * Поверніть перше успішне
 * 
 * @returns {Promise<{source: string, data: string}>}
 */
function getDataFromAnySource() {
    const sourceA = unreliableSource('Source A', 300, true);
    const sourceB = unreliableSource('Source B', 500, false);
    const sourceC = unreliableSource('Source C', 200, true);

    return Promise.any([sourceA, sourceB, sourceC]);
}

// Перевірка:
getDataFromAnySource()
    .then(result => console.log(' Тест 10.4:', result));
// Очікується: { source: 'Source B', data: 'Success!' }
