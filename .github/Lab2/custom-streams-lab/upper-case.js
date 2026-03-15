const { Transform } = require('stream');
 
class UpperCaseStream extends Transform {
  _transform(chunk, encoding, callback) {
    const input = chunk.toString();
 
    const transformed = input
      .split('')
      .map((char) => {
        if (/\d/.test(char)) return char;
        return char.toUpperCase();
      })
      .join('');
 
    console.log('\n[UpperCaseStream] Результат трансформації:');
    console.log(transformed.trimEnd());
     this.push(transformed);
    callback();
  }
 
  _flush(callback) {
    callback();
  }
}
  
const upperCaseStream = new UpperCaseStream();
 
console.log('=== Завдання 1: UpperCase CustomStream ===');
console.log('Введіть текст (Ctrl+C для виходу):\n');
 
process.stdin.pipe(upperCaseStream);
 
upperCaseStream.on('end', () => {
  console.log('\n[UpperCaseStream] Потік завершено.');
});
 
process.on('SIGINT', () => {
  console.log('\n\nЗавершення роботи...');
  process.exit(0);
});