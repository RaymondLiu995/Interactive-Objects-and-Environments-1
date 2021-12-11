function setup() {
  // graphics stuff:
  createCanvas(windowWidth, windowHeight);
  background(90, 145, 199);

  // instructions:
  textSize(48);
  textAlign(CENTER);
  textFont('Suez One');

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

  //let button = $('#submit');
  //let user_input = $('#user_input');
  //let output = $('#output');

  //button.mousedown(getText);

  async function gotSpeech() {
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      //user_input.val(input);
      background(90, 145, 199);
      fill(255, 255, 255);
      text('You : ' + input, width/2, height/2.5);
      await new Promise(r => setTimeout(r, 1000));
      bot.reply('local-user', input).then(function(reply){
        //output.html(reply);
        //background(255);
        fill('black');
        text('Agent : '+ reply, width/2, height/2.5 + 96);
        speech.speak(reply);
      });
    }
  }

  function getText(){
    input = user_input.val();
    bot.reply('local-user', input).then(function(reply){
      speech.speak(reply);
      output.html(reply);
    });
  }
}
