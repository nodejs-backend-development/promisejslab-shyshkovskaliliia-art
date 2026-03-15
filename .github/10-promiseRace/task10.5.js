// ==================== ЗАВДАННЯ 10.5 ====================
/**
 * Створіть систему з fallback серверами
 * Спробуйте основний сервер, якщо він не відповідає за 1 секунду
 * переключіться на резервний
 */

function primaryServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Primary data'), 2000);
    });
}

function backupServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Backup data'), 500);
    });
}

/**
 * Спробуйте отримати дані:
 * 1. Спочатку з primary
 * 2. Якщо primary не відповідає за 1000ms - використайте backup
 * 3. Поверніть {source: 'primary'|'backup', data: string}
 * 
 * @returns {Promise<{source: string, data: string}>}
 */
function getDataWithFallback() {
    const timeout = new Promise((_, reject) =>
        setTimeout(()=> reject(new Error('Timeout')), 1000)
);
return Promise.race([primaryServer(), timeout])
        .then(data => ({ source: 'primary', data }))
        .catch(() =>
            backupServer().then(data => ({ source: 'backup', data }))
        );
}

// Перевірка:
getDataWithFallback()
    .then(result => console.log(' Тест 10.5:', result));
// Очікується: { source: 'backup', data: 'Backup data' }
