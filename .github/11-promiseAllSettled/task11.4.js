// ==================== ЗАВДАННЯ 11.4 ====================
/**
 * Створіть систему моніторингу здоров'я серверів
 * Перевірте всі сервери і створіть звіт про їх статус
 */

function checkServerHealth(serverName, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${serverName} is down`));
            } else {
                resolve({
                    server: serverName,
                    status: 'healthy',
                    responseTime: delay
                });
            }
        }, delay);
    });
}

/**
 * @returns {Promise<{healthy: object[], unhealthy: object[], totalServers: number}>}
 */
async function monitorServers() {
    const servers = [
        { name: 'Server A', delay: 100, shouldFail: false },
        { name: 'Server B', delay: 300, shouldFail: true },
        { name: 'Server C', delay: 150, shouldFail: false },
        { name: 'Server D', delay: 500, shouldFail: true },
        { name: 'Server E', delay: 200, shouldFail: false }
    ];
    const results = await Promise.allSettled(
        servers.map(s => checkServerHealth(s.name, s.delay, s.shouldFail))
    );

    const healthy = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);

    const unhealthy = results
        .filter(r => r.status === 'rejected')
        .map(r => ({ server: r.reason.message }));

    return {
        healthy,
        unhealthy,
        totalServers: servers.length
    };
}

// Перевірка:
monitorServers()
    .then(report => {
        console.log(' Тест 11.4: Server Health Report');
        console.log('  Healthy:', report.healthy.length);
        console.log('  Unhealthy:', report.unhealthy.length);
        console.log('  Total:', report.totalServers);
    });

