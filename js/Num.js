function Num(direction){
	base(this,LSprite,[]);
	this.init(direction);
}
Num.LEFT="num_left";
Num.RIGHT="num_Right";
Num.prototype.init=function(direction){
	var self=this;
	self.direction=direction;
	self.dataList=[
	    new LBitmapData(imglist["num_0"]),
		new LBitmapData(imglist["num_1"]),
		new LBitmapData(imglist["num_2"]),
		new LBitmapData(imglist["num_3"]),
		new LBitmapData(imglist["num_4"]),
		new LBitmapData(imglist["num_5"]),
		new LBitmapData(imglist["num_6"]),
		new LBitmapData(imglist["num_7"]),
		new LBitmapData(imglist["num_8"]),
		new LBitmapData(imglist["num_9"])
	];
	self.list=[];
	self.setValue(0);
}
Num.prototype.setValue=function(value){
	var self=this;
	self.value=value;
	var strValue=self.value.toString();
	var numBitmap,sx;
//	console.log(self.childList.length,strValue.length); ==》0 1
	if(self.childList.length!=strValue.length){//刚开始是不等的
		self.setList(strValue.length);
	}
	for(var i=0;i<strValue.length;i++){
		numBitmap=self.childList[i];
	    numBitmap.bitmapData=self.dataList[parseInt(strValue.charAt(i))];
	}
}
Num.prototype.setList=function(length){
	var self = this;
	if(self.childList.length > length){
		self.childList.splice(length - 1,self.childList.length - length);
		return;
	}
	var sx,numBitmap;
	if(self.direction == Num.LEFT){
		sx = -length*50-40;//相对位置的变化
	}else{
		sx = -50;
	}
	for(var i=0;i<length;i++){
		if(i >= self.childList.length){
			numBitmap = new LBitmap(self.dataList[0]);
			self.addChild(numBitmap);
		}
		numBitmap = self.childList[i];
		sx += 50;
		numBitmap.x = sx;
	}
	
}
