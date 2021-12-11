let regexp = '\\yellow|green|blue|white';
let bgColor = 'white'

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // instructions:
  textSize(42);
  textAlign(LEFT);
  textFont('Suez One');
  fill(255, 255, 255);

  // fill(0);
  text('Say something .....', width/2.3, height/2);

  let speech = new p5.Speech();
  let speechRec = new p5.SpeechRec('en-US', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  let bot = new RiveScript();
  bot.loadFile('brain.rive', brainReady, brainError);

  function brainReady() {
    console.log('Chatbot ready!');
    bot.sortReplies();
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  async function gotSpeech() {
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      background(0);
      fill(255, 255, 255); 
      text('You : ' + input, 150, 550);
      await new Promise(r => setTimeout(r, 1000));
      bot.reply('local-user', input).then(async function(reply){
        text('Wallpaper manager : '+ reply, 150, 650);
        speech.speak(reply);
        if(reply.startsWith('So it shall be')){
          let m = match(reply , regexp);
          if(m){
            await new Promise(r => setTimeout(r, 1000));
            bgColor = m;
            background(bgColor);
            fill(255, 255, 255);
            text('Say something .....', width/2.3, height/2);
          }
        }
      });
    }
  }
}
