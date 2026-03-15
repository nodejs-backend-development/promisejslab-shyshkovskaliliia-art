// ==================== ЗАВДАННЯ 1.4 ====================
/**
 * Створіть проміс, який симулює авторизацію користувача
 * - Якщо username та password не порожні - resolve з об'єктом користувача
 * - Якщо username порожній - reject з 'Username is required'
 * - Якщо password порожній - reject з 'Password is required'
 * - Якщо password коротший за 6 символів - reject з 'Password too short'
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{username: string, authenticated: boolean}, string>}
 */
function authenticateUser(username, password) {
   return new Promise((resolve, reject) => {
    if(!username){
        reject('Username is required');
    } else if(!password){
        reject('Password is required');
    } else if(password.length < 6){
        reject('Password too short');
    } else {
        resolve({ username, authenticated: true});
    }
   });
}

// Перевірка:
authenticateUser('john', 'password123')
    .then(user => console.log(' Тест 1.4 (успіх):', user))
    .catch(err => console.log('   Помилка:', err));

authenticateUser('', 'password123')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (немає username):', err));

authenticateUser('john', '12345')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (короткий пароль):', err));
