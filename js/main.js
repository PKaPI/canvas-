init(40,"mylegend",640,960,loading);
var startLayer,backLayer,itemLayer,playerLayer,resultLayer,shareLayer,flashLayer,bulletsLayer;
var width,height;
var life=0;
var timeNum=0;
var intervalId;
var scoreTxt,lifeTxt,tipsTxt,logoTxt,timeTxt;
var sheepnum=0;
var levelNum=1;
var playingFlag=1;
var playBtn,replayBtn,scoreBtn,shareBtn,backBtn,ruleBtn,rankBtn;
var cannonBase,cannon,bullet,scoreBg,num;
var bitmapData,bitmap;
var mouseDown=false;
var woundFlag=false;
var woundNum=0;
var framecount=1;
var tempx=tempy=0;
var degreeOld=degreeNew=rotateNew=0;
var bulletX=bulletY=0;
var fireFlag=true;
var list,data;
var resetFlag=false;
var soundHello,soundError;
var enableSound=true;
var waiting=1;
var imglist={};
var imgData=new Array(
   	{name:"backBtn",path:'img/backBtn.png'},
   	{name:"bullet",path:'img/bullet.png'},
   	{name:"cannon",path:'img/cannon.png'},
   	{name:"cannonBase",path:'img/cannonBase.png'},
   	{name:"coin",path:'img/coin.png'},
    {name:"num_0",path:'img/num_0.png'},
    {name:"num_1",path:'img/num_1.png'},
    {name:"num_2",path:'img/num_2.png'},
    {name:"num_3",path:'img/num_3.png'},
    {name:"num_4",path:'img/num_4.png'},
    {name:"num_5",path:'img/num_5.png'},
    {name:"num_6",path:'img/num_6.png'},
    {name:"num_7",path:'img/num_7.png'},
    {name:"num_8",path:'img/num_8.png'},
    {name:"num_9",path:'img/num_9.png'},
    {name:"playBg",path:'img/playBg.jpg'},
    {name:"playBtn",path:'img/playBtn.png'},
    {name:"rankBtn",path:'img/rankBtn.png'},
    {name:"replayBtn",path:'img/replayBtn.png'},
    {name:"ruleBtn",path:'img/ruleBtn.png'},
    {name:"ruleInfo",path:'img/ruleInfo.jpg'},
    {name:"scoreBg",path:'img/scoreBg.png'},
    {name:"scoreBtn",path:'img/scoreBtn.png'},
    {name:"shareInfo",path:'img/shareInfo.jpg'},
    {name:"sheep1",path:'img/sheep1.png'},
    {name:"sheep2",path:'img/sheep2.png'},
    {name:"sheep3",path:'img/sheep3.png'},
    {name:"sheep4",path:'img/sheep4.png'},
    {name:"startBg",path:'img/startBg.jpg'},
    {name:"weapon",path:'img/weapon.png'}
   
);
function loading(){//加载开场动画
	width=LGlobal.width;
	height=LGlobal.height;
	startLayer=new LSprite();
	addChild(startLayer);

    loadinglayer=new LoadingSample2(40);
    startLayer.addChild(loadinglayer);
    LLoadManage.load(
    	imgData,
    	function(progress){
    		loadinglayer.setProgress(progress);
    	},
    	main
    )
}
function main(result){
	imglist=result;
	startLayer.removeAllChild();
	loadinglayer=null;
	
	bitmapData = new LBitmapData(imglist["startBg"]);
    bitmap = new LBitmap(bitmapData);
    startLayer.addChild(bitmap);
    
    //button按钮
    playBtn=new LButton(new LBitmap(new LBitmapData(imglist["playBtn"])),new LBitmap(new LBitmapData(imglist["playBtn"])));
    playBtn.x=(width-playBtn.getWidth())/2;
    playBtn.y=350;
    startLayer.addChild(playBtn);
    playBtn.addEventListener(LMouseEvent.MOUSE_UP,onPlayHandler);
    
    ruleBtn = new LButton(new LBitmap(new LBitmapData(imglist["ruleBtn"])),new LBitmap(new LBitmapData(imglist["ruleBtn"])));
	ruleBtn.x = (width - ruleBtn.getWidth())/2;
	ruleBtn.y = 490;	
	startLayer.addChild(ruleBtn);
    ruleBtn.addEventListener(LMouseEvent.MOUSE_DOWN,onruleHandler);
	
}
function onPlayHandler(){//开始游戏层
	playBtn.removeEventListener(LMouseEvent.MOUSE_UP, onPlayHandler);
	playBtn.visible=false;
	startLayer.removeAllChild();
	removeChild(startLayer);
	startLayer=null;
	
	backLayer = new LSprite();
	addChild(backLayer);
	bitmapData = new LBitmapData(imglist["playBg"]);
    bitmap = new LBitmap(bitmapData);
    backLayer.addChild(bitmap);
	gameInit();
}
function onruleHandler(){ //添加遮罩层
	shareLayer = new LSprite();
	addChild(shareLayer);
    bitmap = new LBitmap(new LBitmapData(imglist["ruleInfo"]));
    shareLayer.addChild(bitmap);
	//返回按钮
	backBtn = new LButton(new LBitmap(new LBitmapData(imglist["backBtn"])),new LBitmap(new LBitmapData(imglist["backBtn"])));
	backBtn.x = (width-backBtn.getWidth())/2;
	backBtn.y = 890;	
	shareLayer.addChild(backBtn);
	
	backBtn.addEventListener(LMouseEvent.MOUSE_DOWN, onBackHandler);
}
function onBackHandler(){//移除规则层
	shareLayer.die();
	removeChild(shareLayer);
}
function gameInit(){
	life=60;
	timeNum=120;
	itemLayer = new LSprite();
	addChild(itemLayer);	
	itemLayer.mouseEnabled=false;

    bulletsLayer = new LSprite();//层级之间会有遮罩
	addChild(bulletsLayer);	
	bulletsLayer.mouseEnabled=false;
    		
	resultLayer = new LSprite();
	addChild(resultLayer);	
	
    flashLayer = new LSprite();
	addChild(flashLayer);	
	
    playerLayer = new LSprite();
	addChild(playerLayer);	
	playerLayer.mouseEnabled=false;
	
	
	//初始化炮台
	cannonBase=new LSprite();
	bitmap = new LBitmap(new LBitmapData(imglist["cannonBase"]));
	cannonBase.addChild(bitmap);
	cannonBase.x=0;
	cannonBase.y=height-cannonBase.getHeight();	
	resultLayer.addChild(cannonBase);
	
	//初始化炮筒
	cannon=new LSprite();
	bitmap = new LBitmap(new LBitmapData(imglist["cannon"]));
	bitmap.x=-51;
	bitmap.y=parseInt((-bitmap.getHeight())/2);
	cannon.addChild(bitmap);
	cannon.x=parseInt(width/2);
	cannon.y=height-70;	
	cannon.rotate=-90;
	playerLayer.addChild(cannon);
	
	//炮弹展示
	scoreBg = new LSprite();
    bitmap = new LBitmap(new LBitmapData(imglist["scoreBg"]));
    scoreBg.addChild(bitmap);
	scoreBg.x=20;
	scoreBg.y=20;	
	resultLayer.addChild(scoreBg);
	
	//分数显示
	num=new Num(Num.LEFT);
	num.x=width-40;
	num.y=30;
	resultLayer.addChild(num);
	num.setValue(0)
	
	//文字显示
	lifeTxt = new LTextField();//炮弹文字显示
	lifeTxt.color = "#ffffff";
	lifeTxt.font = "Microsoft Yahei";
	lifeTxt.size = 24;
	lifeTxt.text="炮弹："+life;	
	lifeTxt.x = 120;
	lifeTxt.y = 42;
	resultLayer.addChild(lifeTxt);	
	
	timeTxt = new LTextField();//时间文字显示
	timeTxt.color = "#ffffff";
	timeTxt.font = "Microsoft Yahei";
	timeTxt.size = 18;
	timeTxt.text="剩余时间："+timeNum+"秒";	
	timeTxt.x = 60;
	timeTxt.y = 110;
	resultLayer.addChild(timeTxt);
	
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onmouseup);
	
	setTimeout(function(){
		intervalId=setInterval(timecount,1000);
	},1000);
}
function timecount(){
	if(timeNum>0){
		timeNum-=1;
	}else{
		if(intervalId){
			clearInterval(intervalId);
		}
	}
}
function onframe(){
	framecount++;
    if (framecount%40==0)
    {
		randomNum=1+Math.floor(Math.random()*4);
		addSheep(randomNum);
	}		
    if (framecount > 90)
    {
		framecount=1;
	}
	num.setValue(sheepnum);
	lifeTxt.text="炮弹："+life;
	timeTxt.text="剩余时间："+timeNum+"秒";	
	
	if((life<=0 && bulletsLayer.numChildren==0) || timeNum==0){
		gameover();
	}
}
function onmouseup(event){

    tempx=event.offsetX-320;//判断在那边，宽的一半
    tempy=event.offsetY-890;//判断高
    if(tempy>-60){
   	return;
   }
   degreeNew=Math.atan2(tempy,tempx);//atan2(x,y) 方法可返回从 x 轴到点 (x,y) 之间的角度。
   /* 当y<0时，其值为负，
               当y>0时，其值为正.   x轴逆向旋转的角度值*/
   rotateNew=Math.floor(degreeNew/Math.PI*180);//角度值
  
   bulletX=320+103*Math.cos(degreeNew);//130为炮筒的高度
   bulletY=890+103*Math.sin(degreeNew);
   addBullets(bulletX,bulletY,degreeNew);
   cannon.rotate=rotateNew;
}
function addBullets(tempx,tempy,degree){//添加子弹
	var myBullets=new Bullets(tempx,tempy,degree);
	bulletsLayer.addChild(myBullets);
}
function addSheep(type){  //添加羊
	var mySheep=new Sheep(type);	
	itemLayer.addChild(mySheep);
}
function addFlash(tempx,tempy,val){
	var myFlashs=new Flashs(tempx,tempy,val);
	flashLayer.addChild(myFlashs);
}

function addCoins(tempx,tempy,val){
	var myCoins=new Coins(tempx,tempy,val);
	flashLayer.addChild(myCoins);
}
// 游戏结束
function gameover(){
    backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe);
	backLayer.removeEventListener(LMouseEvent.MOUSE_UP,onmouseup);	
	
    // playingFlag=0;
	
	bulletsLayer.removeAllChild();
    removeChild(bulletsLayer);	
		
	itemLayer.removeAllChild();
    removeChild(itemLayer);	
	
	playerLayer.removeAllChild();
    removeChild(playerLayer);	
	
	flashLayer.removeAllChild();
    removeChild(flashLayer);		
		
	resultLayer.removeAllChild();		
    //清除以上事件与元素
	tipsTxt = new LTextField();
	tipsTxt.color = "#de5e06";
	tipsTxt.font = "Microsoft Yahei";
	tipsTxt.size = 40;
	tipsTxt.x = 120;
	tipsTxt.y = 380;
	tipsTxt.text="恭喜，你获得 "+Math.floor(10)+" 分";		
	tipsTxt.textAlign="left";	
	resultLayer.addChild(tipsTxt);		
	tipsTxt.x = (width-tipsTxt.getWidth())/2;
			
	replayBtn = new LButton(new LBitmap(new LBitmapData(imglist["replayBtn"])),new LBitmap(new LBitmapData(imglist["replayBtn"])));
	replayBtn.x = -270;
	replayBtn.y = 490;	
	resultLayer.addChild(replayBtn);
	replayBtn.addEventListener(LMouseEvent.MOUSE_DOWN, onReplayHandler);
	LTweenLite.to(replayBtn,1,{x:(width - replayBtn.getWidth())*0.5,ease:LEasing.Quint.easeOut,delay:1});
	
}
function onReplayHandler(){
	resultLayer.die();
	resultLayer.removeAllChild();
	removeChild(resultLayer);
	gameInit();
}