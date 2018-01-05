
var INITIALIZED = false;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Save the ball", "Arial", 40);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 100;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.Ball_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2 +20
        });
		this.sprite.setScale(0.2,0.2);
        this.addChild(this.sprite, 0);
		
		var startLabel = new cc.LabelTTF("Start Game","Arial", 30);
        startLabel.x = size.width/2;
        startLabel.y = size.height/2 - 40;
        //this.addChild(startLabel,5);

        var menuItem = new cc.MenuItemFont("Start Game",Play);
        var menu = new cc.Menu(menuItem);
        menu.alignItemsVertically();
        menu.x = size.width/2;
        menu.y = size.height/2 - 40;
        this.addChild(menu);

        return true;
    }
});

var Play =function()
{
        var scene = new HelloWorldScene2();
        cc.director.pushScene(scene);
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if(INITIALIZED==false)
        {
            INITIALIZED = true;
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }
    }
});

