// ==================== ЗАВДАННЯ 7.2 ====================
/**
 * Створіть ланцюжок обробки даних користувача:
 * 1. Отримати об'єкт {name: 'john doe', age: 25}
 * 2. Конвертувати name у верхній регістр
 * 3. Додати поле isAdult (age >= 18)
 * 4. Додати поле nameLength
 * 
 * @param {{name: string, age: number}} user 
 * @returns {Promise<{name: string, age: number, isAdult: boolean, nameLength: number}>}
 */
function processUser(user) {
    return Promise.resolve(user)
        .then(u => ({ ...u, name: u.name.toUpperCase() }))
        .then(u => ({ ...u, isAdult: u.age >= 18 }))
        .then(u => ({ ...u, nameLength: u.name.length }));
}

// Перевірка:
processUser({ name: 'john doe', age: 25 })
    .then(result => console.log(' Тест 7.2:', result));
// Очікується: { name: 'JOHN DOE', age: 25, isAdult: true, nameLength: 8 }
