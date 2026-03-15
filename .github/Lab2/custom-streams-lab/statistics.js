const { Transform } = require('stream');

class StatisticsStream extends Transform {
  constructor(options) {
    super(options);
    this.totalChars = 0;      
    this.totalWords = 0;      
    this.totalLines = 0;    
    this.totalSpaces = 0;   
  }
 
  _transform(chunk, encoding, callback) {
    const input = chunk.toString().trimEnd(); 
 
    if (!input) {
      callback();
      return;
    }
 
    const lines  = input.split('\n');
    const words  = input.match(/\S+/g) || [];          
    const chars  = input.replace(/\n/g, '').length;    
    const spaces = (input.match(/ /g) || []).length;   
 
    this.totalLines  += lines.length;
    this.totalWords  += words.length;
    this.totalChars  += chars;
    this.totalSpaces += spaces;
 
    console.log(` Текст   : "${input}"`);
    console.log(`Рядків  : ${lines.length}`);
    console.log(`Слів    : ${words.length}`);
    console.log(`Символів: ${chars}`);
    console.log(`Пробілів: ${spaces}`);
   
    console.log('Загальна статистика');
    console.log(`Рядків  : ${this.totalLines}`);
    console.log(`Слів    : ${this.totalWords}`);
    console.log(`Символів: ${this.totalChars}`);
    console.log(`Пробілів: ${this.totalSpaces}`);
 
    this.push(input + '\n');
    callback();
  }
 
  _flush(callback) {
  
    console.log('ПІДСУМКОВА СТАТИСТИКА');
    console.log(`Всього рядків  : ${this.totalLines}`);
    console.log(`Всього слів    : ${this.totalWords}`);
    console.log(`Всього символів: ${this.totalChars}`);
    console.log(`Всього пробілів: ${this.totalSpaces}`);
    callback();
  }
}
 
 
const statsStream = new StatisticsStream();
 
console.log('=== Завдання 2: Statistics CustomStream ===');
console.log('Введіть текст (Ctrl+D — підсумок, Ctrl+C — вихід):\n');
 
process.stdin.pipe(statsStream);
 
statsStream.on('end', () => {
  console.log('\n[StatisticsStream] Потік завершено.');
});
 
process.on('SIGINT', () => {
  console.log('\n\nЗавершення роботи...');
  process.exit(0);
});