// ==================== ЗАВДАННЯ 19.5 ====================
/**
 * Створіть систему retry з обмеженням за часом
 * Навіть якщо є спроби, зупиніться якщо пройшло багато часу
 */

/**
 * @param {Function} fn 
 * @param {Object} options - {maxRetries, maxTime, initialDelay}
 * @returns {Promise}
 */
async function retryWithTimeout(fn, options = {}) {
    const {
        maxRetries = 3,
        maxTime = 5000,  // Максимальний час в мс
        initialDelay = 100
    } = options;

    const startTime = Date.now();
    let delay = initialDelay;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            const elapsed = Date.now() - startTime;

            if (attempt === maxRetries) {
                throw new Error(`Max retries (${maxRetries}) reached`);
            }

            if (elapsed >= maxTime) {
                throw new Error(`Max time (${maxTime}ms) exceeded after ${attempt + 1} attempts`);
            }

            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
}

// Перевірка:
let attempt5 = 0;
function slowFunction() {
    attempt5++;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (attempt5 < 10) {
                reject(new Error(`Attempt ${attempt5}`));
            } else {
                resolve('Success');
            }
        }, 200);
    });
}

console.log('Starting retryWithTimeout at', new Date().toLocaleTimeString());
retryWithTimeout(slowFunction, {
    maxRetries: 20,
    maxTime: 1000,
    initialDelay: 100
})
    .catch(error => {
        console.log(' Тест 19.5: Stopped due to timeout');
        console.log('  Total attempts:', attempt5);
    });

