function Bullets(tempx,tempy,degree){
	base(this,LSprite,[]);
	var self = this;
	self.mode="";
	self.value = 0;
    var bitmap = new LBitmap(new LBitmapData(imglist["bullet"]));
	bitmap.x=-bitmap.getWidth();	
	bitmap.y=-bitmap.getHeight()/2;	
	self.addChild(bitmap);
	self.x=tempx;
	self.y=tempy;
	self.degree=degree;
	self.rotate=Math.floor(degree/Math.PI*180);
	self.speed=10;
	self.speedX=self.speed*Math.cos(self.degree);
	self.speedY=self.speed*Math.sin(self.degree);
	self.addEventListener(LEvent.ENTER_FRAME,self.run);
	life-=1;
}
Bullets.prototype.run=function(event){
	var self = event.target;
	var hit = self.checkHit();
	if(hit || self.y < -100 || self.x < -100 || self.x > 740){
		setTimeout(function(){sheepnum += self.value;},2000);
		if(sheepnum==1000){
			sheepnum=980;
		}
		self.mode="die";
		self.parent.removeChild(self);
	}
	self.x += self.speedX;
	self.y += self.speedY;	
}
Bullets.prototype.checkHit=function(){
	var self=this;
	if(itemLayer.numChildren>0){
		for(var key in itemLayer.childList){
			if(self.hitTestObject(itemLayer.childList[key])){
				if(itemLayer.childList[key].mode!="score"){
					itemLayer.childList[key].mode="score";
					console.log(itemLayer.childList[key].x,itemLayer.childList[key].y)
					self.value = itemLayer.childList[key].value;//记录sheep的分数值
					addFlash(itemLayer.childList[key].x,itemLayer.childList[key].y,itemLayer.childList[key].value);
					return true;
				}
			}
		}
	}
	return false;
}