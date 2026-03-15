const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const PORT = 3000;
const CSV_FILE = 'data.csv';

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }

    if (!fs.existsSync(CSV_FILE)) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'CSV file not found' }));
    }

    const results = [];
    let headers = null;

    fs.createReadStream(CSV_FILE, { encoding: 'utf8' })
        .pipe(split2())
        .pipe(through2(function (chunk, enc, callback) {
            const line = chunk.toString().trim();
            if (!line) return callback();

            const values = line.split(',');

            if (!headers) {
                headers = values.map(h => h.trim());
            } else {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] ? values[index].trim() : '';
                });
                results.push(obj);
            }
            callback();
        }))
        .on('finish', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(results, null, 2));
        })
        .on('error', (err) => {
            console.error('Error reading file:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to read CSV file' }));
        });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});