// ==================== ЗАВДАННЯ 19.6 ====================
/**
 * Створіть "розумний" retry з адаптивною затримкою
 * Затримка залежить від типу помилки
 */

// ==================== ЗАВДАННЯ 19.6 ====================

class RateLimitError extends Error {
    constructor(retryAfter) {
        super('Rate limit exceeded');
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
}

async function smartRetry(fn, maxRetries) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (error instanceof RateLimitError) {
                await new Promise(resolve => 
                    setTimeout(resolve, error.retryAfter * 1000)
                );
            } else if (error instanceof ServerError) {
                const delay = Math.pow(2, attempt) * 100;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }

            if (attempt === maxRetries - 1) {
                throw new Error(`Max retries (${maxRetries}) reached`);
            }
        }
    }
}

// Перевірка:
let attempt6 = 0;
function smartAPI() {
    attempt6++;
    if (attempt6 === 1) {
        return Promise.reject(new RateLimitError(1));
    }
    if (attempt6 === 2) {
        return Promise.reject(new ServerError('Server overload'));
    }
    if (attempt6 === 3) {
        return Promise.resolve('Success!');
    }
}

smartRetry(smartAPI, 5)
    .then(result => console.log(' Тест 19.6:', result));
