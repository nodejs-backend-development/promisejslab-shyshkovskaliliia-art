// ==================== БОНУСНЕ ЗАВДАННЯ 11.6 ====================
/**
 * Створіть систему graceful degradation
 * Якщо основний сервіс недоступний - використайте запасний
 * Якщо і він недоступний - використайте кеш
 * Поверніть звіт про те, звідки отримали дані
 */

const cache = new Map([
    ['user:1', { id: 1, name: 'Cached User', source: 'cache' }]
]);

function fetchFromPrimary(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                reject(new Error('Primary service down'));
            } else {
                resolve({ id, name: 'Primary User', source: 'primary' });
            }
        }, 100);
    });
}

function fetchFromBackup(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                reject(new Error('Backup service down'));
            } else {
                resolve({ id, name: 'Backup User', source: 'backup' });
            }
        }, 200);
    });
}

/**
 * Спробуйте отримати дані з трьох джерел одночасно
 * Використайте перше успішне
 * Якщо всі недоступні - поверніть помилку
 * 
 * @param {number} userId 
 * @returns {Promise<{data: object, source: string, attemptedSources: string[]}>}
 */
async function fetchWithFallback(userId) {
    const attemptedSources = ['primary', 'backup', 'cache'];

    const results = await Promise.allSettled([
        fetchFromPrimary(userId),
        fetchFromBackup(userId),
        Promise.resolve(cache.get(`user:${userId}`) || null)
    ]);

    for (let i = 0; i < results.length; i++) {
        if (results[i].status === 'fulfilled' && results[i].value) {
            return {
                data: results[i].value,
                source: attemptedSources[i],
                attemptedSources
            };
        }
    }

    throw new Error('All sources unavailable');
}

fetchWithFallback(1)
    .then(result => {
        console.log('✅ Тест 11.6:', result);
    })
    .catch(err => console.log('❌ Помилка:', err.message));