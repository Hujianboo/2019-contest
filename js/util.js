function copyArray(arr){
  let copyArr = [];
  arr.forEach(element => {
    copyArr.push(element.concat());
  });
  return copyArr;
}
function nextState(){
  currentState += 1;
  justify();
  init();
}
function lastState(){
  currentState -= 1;
  justify();
  init();
  }
function Reset(){
  init();
}
function selectState(value){
  currentState = value;
  justify();
  init();
}
function showCurrentstate() {
  detail.innerHTML = currentState;
}
function justify(){
  if(currentState < 0) currentState = 0;
  if(currentState > 5) currentState = 5;
}
  //后退一步功能
function preStep(){
  if (flag)
  {
    flag = false;
    mapInit();//初始化地板
    draw(pre);//绘制出当前等级的地图
    nowState = copyArray(pre);
  }
  
}