function Flashs(tempx,tempy,val){
	base(this,LSprite,[]);
	var self=this;
	self.mode="";
	self.value=val;
	var list=LGlobal.divideCoordinate(870,145,1,6);
	var data=new LBitmapData(imglist["weapon"],0,0,145,145);
	flash=new LAnimationTimeline(data,list);//LAnimationTimeline对象不用调用onfram方法了
	flash.speed=3;
	flash.x=-flash.getWidth()/2;
	flash.y=-flash.getHeight()/2;
	self.addChild(flash);
	self.x=tempx;
	self.y=tempy;
	console.log(tempx,tempy)
	flash.addEventListener(LEvent.COMPLETE,self.oncomplete);
}
Flashs.prototype.oncomplete=function(event){
	var self=event.target;//指的是缓动动画LAnimationTimeline对象
	console.log(this);
	self.removeEventListener(LEvent.COMPLETE,self.oncomplete);
	addCoins(self.parent.x,self.parent.y,self.parent.value); //self.parent.x指的是LSprite对象
	self.parent.parent.removeChild(self.parent);
}