// https://github.com/request/request-promise-native
const rp = require('request-promise-native');
const configed = require('dotenv').config();
const colors = require('colors');

// user configuration
const {
  TEXTRAZOR_API_KEY,
  TEXTRAZOR_NUM_PROCESSORS,
  TEXTRAZOR_URL
} = process.env;

if(TEXTRAZOR_API_KEY === undefined) {
  console.error(colors.red('no TextRazor API key defined in environment variable TEXTRAZOR_API_KEY'));
  process.exit(1);
}

class TextRazor {
  analyze(params) {
    const {
      text,
      url,
      extractors,
    } = params;

    let form = { extractors };

    if(text) {
      form.text = text;
    } else if (url) {
      form.url = url;
      form['cleanup.mode'] = 'cleanHTML';
      form['cleanup.returnCleaned'] = true;
    }

    return rp.post({
      url: TEXTRAZOR_URL,
      headers: { 'x-textrazor-key': TEXTRAZOR_API_KEY },
      form
    });
  }
}

module.exports = new TextRazor();