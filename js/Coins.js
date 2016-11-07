function Coins(tempx,tempy,val){
	base(this,LSprite,[]);
	var self = this;
	self.mode="";
	self.value=val;
	var list = LGlobal.divideCoordinate(180,45,1,4);
	var data = new LBitmapData(imglist["coin"],0,0,45,45);	
	coins = new LAnimationTimeline(data,list);
	coins.speed = 3;
	coins.x=-coins.getWidth()/2;
	coins.y=-coins.getHeight()/2;
	self.addChild(coins);
	self.x=tempx;
	self.y=tempy;
	LTweenLite.to(self,1.2,{x:580,y:60,ease:LEasing.Quint.easeOut,delay:0.4,onComplete:self.onCoincomplete});	
}
Coins.prototype.onCoincomplete=function(event){
	var self = event.target;
	self.parent.removeChild(self);
}