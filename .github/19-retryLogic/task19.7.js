// ==================== ЗАВДАННЯ 19.7 ====================
/**
 * Створіть універсальну retry систему з усіма можливостями
 */

/**
 * @param {Function} fn 
 * @param {Object} config
 * @returns {Promise<{result: any, attempts: number, totalTime: number, errors: Error[]}>}
 */
async function universalRetry(fn, config = {}) {
    const defaults = {
        maxRetries: 3,
        maxTime: 10000,
        initialDelay: 100,
        maxDelay: 5000,
        backoffMultiplier: 2,
        shouldRetry: () => true,
        onRetry: () => {},
        onSuccess: () => {},
        onFailure: () => {}
    };

    const options = { ...defaults, ...config };
    const startTime = Date.now();
    const errors = [];
    let attempt = 0;

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    while (true) {
        try {
            attempt++;
            const result = await fn();
            
            // Якщо успіх:
            const totalTime = Date.now() - startTime;
            const successStats = { result, attempts: attempt, totalTime, errors };
            options.onSuccess(successStats);
            return successStats;

        } catch (error) {
            errors.push(error);
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (
                attempt > options.maxRetries || 
                elapsedTime >= options.maxTime || 
                !options.shouldRetry(error)
            ) {
                const failureStats = { attempts: attempt, totalTime: elapsedTime, errors };
                options.onFailure(failureStats);
                throw failureStats; // Викидаємо статистику як помилку
            }

            // Розрахунок затримки перед наступною спробою
            const nextDelay = Math.min(
                options.initialDelay * Math.pow(options.backoffMultiplier, attempt - 1),
                options.maxDelay
            );

            options.onRetry(attempt, error, nextDelay);
            
            // Чекаємо перед наступною ітерацією
            await delay(nextDelay);
    }
}
}

let attempt7 = 0;
universalRetry(
   () => {
    attempt7++;
    if (attempt7 < 3) {
        return Promise.reject(new Error('Not yet'));
    }
return Promise.resolve('Finally!');
},
{
    maxRetries: 5,
    initialDelay: 50,
    onRetry: (attempt, error) => console.log(`  Retry ${attempt}: ${error.message}`)
}
)
.then(result => console.log(' Тест 19.7:', result));
