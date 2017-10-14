//用于接受传送的数据
let buffer = new Array(100); 
/**
 * 提取数据，放入buffer中
 */
const shiftLeft = (lastNum) => {
  for (let i = 0; i < 32; i++) {
    buffer[i] = buffer[i + 1];
  }
  buffer[31] = lastNum;
}
/**
 * 判断是否为一组数据
 */
const checkOutOneSequence = () => {
  return (buffer[0] == 0x42) && (buffer[1] == 0x4D) && (buffer[2] == 0x00) && (buffer[3] == 0x1C);
}
/**
 * 获取一组数据
 */
const getMeasuredVal = (high, low) => {
  return low + 256 * high;
}

/**
 * 更新buffer
 */
export const updateBuffer = (ch, isG5T, func) => {
  shiftLeft(ch);
  if (checkOutOneSequence()) {
    let text = "\n美国标准:\n";
    text += "PM1.0 : " + getMeasuredVal(buffer[4], buffer[5]) + "ug/m3\n";
    text += "PM2.5 : " + getMeasuredVal(buffer[6], buffer[7]) + "ug/m3\n";
    text += "PM\t10 : " + getMeasuredVal(buffer[8], buffer[9]) + "ug/m3\n";
    text += "\n中国标准:\n";
    text += "PM1.0 : " + getMeasuredVal(buffer[10], buffer[11]) + "ug/m3\n";
    text += "PM2.5 : " + getMeasuredVal(buffer[12], buffer[13]) + "ug/m3\n";
    text += "PM\t10 : " + getMeasuredVal(buffer[14], buffer[15]) + "ug/m3\n";
    if (isG5T) {
      text += "\n环境温度:\t\t" + (getMeasuredVal(buffer[24], buffer[25])) / 10 + "\t℃\n";
      text += "\n空气湿度:\t\t" + (getMeasuredVal(buffer[26], buffer[27])) / 10 + "\t%\n";
    }
    console.log(text)
    
    func(text) // 传递text, that.setData({ result: text });
  }
}