var maxL=0;
var minL=0;
var i=0;
var obj;
var board;
var j,k;
var size;
var score;
var Score;
var LoactionX;
var INITIALIZED_2 = false;
var sprite_ball = null;
var sprite_board = null;
var sprite_board1 = null;
var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

       obj = this;
        size = cc.winSize;

        cc.log("a");
        sprite_board1 = new cc.Sprite.create(res.Board_jpg);
        sprite_board1.setAnchorPoint(cc.p(0.5,0.5));
        sprite_board1.setPosition(size.width/2,10);
        sprite_board1.setScale(0.5);
        this.addChild(sprite_board1, 5);
        board=[];

        score = 0;
        Score = new cc.LabelTTF("Score :"+score,"Arial",40);
        Score.x = size.width-100;
        Score.y = size.height-30;
        Score.fillStyle = cc.color(255,0,0,255);
        this.addChild(Score,0);    
        for(k=0;k<4;k++)
        {
            board[k]=sprite_board1;
        }
        j=0;
        this.schedule(boardCreate,4);
        sprite_ball = new cc.Sprite(res.Ball_png);
        sprite_ball.attr({
            x: size.width / 2,
            y: 28
        });
        sprite_ball.setScale(0.1,0.1);
        this.addChild(sprite_ball, 0);
        if(cc.sys.capabilities.hasOwnProperty('mouse'))
        {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,

                onMouseDown: function(event){
                    if(event.getButton()== cc.EventMouse.BUTTON_LEFT)
                    {
                       
                        
                        cc.log("Mouse Event"+score);
                        score++;
                        LoactionX = event.getLocationX();
                        var sprite_action = cc.JumpTo.create(1.5,cc.p(event.getLocationX(),event.getLocationY()),100,1);
                        var sprite_action2 = cc.MoveTo.create(2,cc.p(0,-100));
                        sprite_ball.runAction(sprite_action);
                        sprite_board1.runAction(sprite_action2);
                        obj.scheduleOnce(ballmove,1.5);
                        Score_update();


                    }
                }
            },this);
        }
		 
		cc.director.setClearColor(cc.color(255, 255, 255, 255))
        this.schedule(collision, 0);
        
        return true;
    }
});

function Score_update(){
    Score.setString("Score :" +score);
}

var collision=function(){
    for(var j = 0;j < 4;j++){
        if(cc.rectIntersectsRect(sprite_ball.getBoundingBox(),board[j].getBoundingBox())) {
            cc.log("Colliaion");
            sprite_ball.stopAllActions();
            var sprite_action = cc.MoveTo.create(3,cc.p(LoactionX,-10));
            sprite_ball.runAction(sprite_action);
        }   
    }
    if(sprite_ball.getPositionY() < 10)
        {
            var gameOver = new cc.LabelTTF("Game Over","Arial",30)
            gameOver.x = size.width/2;
            gameOver.y = size.height/2;
            gameOver.fillStyle = cc.color(255,0,0,255);
            this.addChild(gameOver);
            cc.director.pause();
        }
}
var boardCreate=function()
{
    size=cc.winSize;
    i++;
    if(i%2!=0)
    {
        maxL=size.width/2-20;
        minL=15;
    }
    else
    {
        maxL=size.width;
        minL=size.width/2+20;   
    }
    sprite_board = new cc.Sprite(res.Board_jpg);
    rnd=Math.random() * (maxL - minL) + minL;
    sprite_board.setPosition(rnd,size.height-10);
    sprite_board.setScale(0.5);
    var sprite_action = cc.MoveTo.create(8,cc.p(rnd,-10));
    sprite_board.runAction(sprite_action);
    
    board[j] = sprite_board;
    j++;
    if(j == 4){
        j = 0;
    }
    this.addChild(sprite_board, 0);

}

var ballmove=function()
{
    var b = sprite_ball.getBoundingBox();
    var sprite_action = cc.MoveTo.create(1.5,cc.p(LoactionX,-10));
    sprite_ball.runAction(sprite_action);
    
    
    
}


var HelloWorldScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if(INITIALIZED_2==false)
        {
            INITIALIZED_2 = true;
            var layer = new HelloWorldLayer2();
            this.addChild(layer);
        }
    }
});

