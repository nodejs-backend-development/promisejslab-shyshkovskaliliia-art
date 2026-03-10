// ==================== ЗАВДАННЯ 7.3 ====================
/**
 * Створіть ланцюжок з асинхронними операціями
 * Використовуйте функції нижче для побудови ланцюжка
 */

function fetchUserData(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, username: 'user_' + userId });
        }, 100);
    });
}

function fetchUserPosts(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...user,
                posts: ['Post 1', 'Post 2', 'Post 3']
            });
        }, 100);
    });
}

function countPosts(userData) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...userData,
                postCount: userData.posts.length
            });
        }, 100);
    });
}

/**
 * Створіть функцію, яка:
 * 1. Отримує дані користувача
 * 2. Отримує його пости
 * 3. Рахує кількість постів
 * 
 * @param {number} userId 
 * @returns {Promise<{id: number, username: string, posts: string[], postCount: number}>}
 */
function getUserWithPostCount(userId) {
    return fetchUserData(userId)
    .then(user => fetchUserPosts(user))
    .then(userData =>countPosts(userData));
}

// Перевірка:
getUserWithPostCount(123)
    .then(result => console.log(' Тест 7.3:', result));
