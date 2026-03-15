const http = require('http');
const VALID_TOKEN = 'Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM';

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    if (authHeader === VALID_TOKEN) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Доступ дозволено', status: 'OK' }));
    } else {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Неавторизований доступ', status: 'Unauthorized' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});

