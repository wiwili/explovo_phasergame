//Instructions Page
var news;
var rotate;
var i;
var stContext1 = function(game) {
};
stContext1.prototype = {
    preload: function(){
        l("Context1_preload");
        this.game.stage.backgroundColor = "#000000";
        // add in background
        
    },//end_preload
    create: function(){
       l("Context1_create");
       sfx= this.game.add.audio("whirling");

       sfx.play('',0,.2,false);
        // add in start button 
        rotate=0;
        

        news = this.game.add.image(this.game.width/2, this.game.height/2, 'News1');
        news.anchor.set(0.5,0.5);
        news.scale.setTo(0.1,0.1);

        this.game.add.tween(news).to( { angle: 720 }, 900, Phaser.Easing.Linear.None, true);
        this.game.add.tween(news.scale).to( { x: 1, y: 1 }, 1200, Phaser.Easing.Linear.None, true);

     
        this.button = this.game.add.button(this.game.width/2, this.game.height - 120, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.4,0.4);
        this.button.onInputOver.add(this.over, this);
        this.button.onInputOut.add(this.out, this);  
        
    },//end_create
    update: function(){
   
    },
    over: function() {
        //l("over");
    },//end_over
    out: function() {
        //l("out");
    },//end_out
    startGame: function() {
		this.state.start("stGame");
    }//end_startGame
};
