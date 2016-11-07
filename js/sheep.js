function Sheep(type){
	base(this,LSprite,[]);
	var self = this;	
	self.mode="";
	self.id = type;	
	var list = LGlobal.divideCoordinate(480,110,1,4);
	var data = new LBitmapData(imglist["sheep"+type],0,0,120,110);
	sheep = new LAnimationTimeline(data,list);
	sheep.speed=4;//动画播放速度
	self.addChild(sheep);
	sheep.x=-sheep.getWidth()/2;
	sheep.y=-sheep.getHeight()/2;		
	randomNum=Math.random();//判断随机数
	if(randomNum<0.5){
		// 从右侧出现
		self.speedx=-3-Math.floor(Math.random()*8);
		self.x=700;
		self.scaleX=self.scaleY=1-randomNum/2;
	}else{
		//从左侧出现
		self.speedx=3+Math.floor(Math.random()*8);
		self.x=-100;	
		
		self.scaleX=-1+randomNum/2;	
		self.scaleY=-self.scaleX;
	}
	 if(self.scaleY<0.6){
				self.value=20;
			}		  
			else if(self.scaleY<0.8)
			{
				self.value=10;
			}		
			else {
				self.value=5;
			}
	self.y=parseInt(Math.random()*446+330);
	addnum = parseInt(Math.random()*8-3);//曲线行驶	
	self.addShape(LShape.RECT,[-10,-10,20,20]);//添加碰撞形状
	self.addEventListener(LEvent.ENTER_FRAME,self.run);
}
Sheep.prototype.run=function(event){
	var self=event.target;
	if(self.mode!="score"){//self.mode继承性值传递
        self.x+=self.speedx;
        self.y+=addnum;
        if(self.x<-120||self.x>width+80){
           self.mode="die";
        }
         if(self.mode=="die"){
        	self.parent.removeChild(self);
        }
		
	}else{
		self.removeEventListener(LEvent.ENTER_FRAME,self.run);
		setTimeout(function(){
			self.parent.removeChild(self);
		},800);
	}

}