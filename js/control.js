
let pre = [],flag;
// function coordinate(x,y){
//   this.x = x;
//   this.y = y;
// }

function step(dir){
  let nc,hc;
  switch(dir){
    case "u":
      people = u;
      nc = new coordinate(perPosition.x-1,perPosition.y);
      hc = new coordinate(perPosition.x-2,perPosition.y);
      break;
    case "d":
      people = d;
      nc = new coordinate(perPosition.x+1,perPosition.y);
      hc = new coordinate(perPosition.x+2,perPosition.y);
      break;
    case "l":
      people = l;
      nc = new coordinate(perPosition.x,perPosition.y-1);
      hc = new coordinate(perPosition.x,perPosition.y-2);
      break;
    case "r":
      people = r ;
      nc = new coordinate(perPosition.x,perPosition.y+1);
      hc = new coordinate(perPosition.x,perPosition.y+2);
      break;
  }
  pre = copyArray(nowState);

  if(detact(nc,hc)){
    flag = true;
  }

  mapInit();
  draw(nowState);
  
  if(check()){
    nextState();
  }
}

function check(){
  for (var i=0;i<nowState.length ;i++ )
  {
    for (var j=0;j<nowState[i].length ;j++ )
    {
      // 当前移动过的地图和初始地图进行比较，如果初始地图上的陷进参数在移动之后不是箱子的话就指代没推成功
      if (current[i][j] == 2 && nowState[i][j] != 3 || current[i][j] == 5 && nowState[i][j] != 3)
      {
        return false;
      }
      
    }
  }
  return true;
}

function detact(nc,hc){

  if(nc.x<0||nc.y<0||nc.x>nowState.length||nc.y>nowState[0].length||nowState[nc.x][nc.y]==1){
    return false;
  }
  if (nowState[nc.x][nc.y]==3 || nowState[nc.x][nc.y]==5){//如果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
    if (nowState[hc.x][hc.y]==1 || nowState[hc.x][hc.y]==3){
      return false;
    }
    //如果判断不成功小人前面的箱子前进一步
    nowState[hc.x][hc.y] = 3;//更改地图对应坐标点的值
 
  }
  //如果都没判断成功小人前进一步
  nowState[nc.x][nc.y] = 4;//更改地图对应坐标点的值
  //如果小人前进了一步，小人原来的位置如何显示
  let v = current[perPosition.x][perPosition.y];
  if (v!=2){
    if (v==5){
      v=2;//如果小人本身就在陷进里面的话移开之后还是显示陷进
    }else{
      v=0;//小人移开之后之前小人的位置改为地板
    }
  }
  //重置小人位置的地图参数
  nowState[perPosition.x][perPosition.y] = v;
  //如果判断小人前进了一步，更新坐标值
  perPosition = nc;
  //如果小动了 返回true 指代能够移动小人
  return true;
}

function pressKey(e){ 
  switch(e.keyCode){
    case 38:
      step("u");
      break;
    case 39:
      step("r");
      break;
    case 40:
      step("d");
      break;
    case 37:
      step("l");
      break;
  }
}
