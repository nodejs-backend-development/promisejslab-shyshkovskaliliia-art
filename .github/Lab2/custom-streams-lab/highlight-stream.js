const { Transform } = require('stream');

class HighlightStream extends Transform {
  /**
   * @param {Object} options
   * @param {Object} options.keywords - Об'єкт { "слово": "код_кольору" }
   * @param {String} options.numberColor - Код кольору для чисел (напр. '33' для жовтого)
   */
  constructor(options = {}) {
    super(options);
    this.keywords = options.keywords || {};
    this.numberColor = options.numberColor || '37'; 
    this.reset = '\x1b[0m'; 
  }

  _transform(chunk, encoding, callback) {
    let text = chunk.toString();

    text = text.replace(/\d+/g, (match) => {
      return `\x1b[${this.numberColor}m${match}${this.reset}`;
    });

    for (const [word, colorCode] of Object.entries(this.keywords)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, (match) => {
        return `\x1b[${colorCode}m${match}${this.reset}`;
      });
    }

    this.push(text);
    callback();
  }
}

const config = {
  keywords: {
    'node': '31',     
    'stream': '32',   
    'javascript': '34',
    'lab': '35' 
  },
  numberColor: '33'    
};

const highlightStream = new HighlightStream(config);
process.stdin.pipe(highlightStream).pipe(process.stdout);

process.on('SIGINT', () => {
  console.log('\n\x1b[0m[Роботу завершено]\x1b[0m');
  process.exit(0);
});

console.log('Вводьте текст (Ctrl+C для виходу):');