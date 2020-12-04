var _string = {
    // 千位符
    thousandBitSeparator(num) {
        var decimal = String(num).split('.')[1] || '';//小数部分
        var tempArr = [];
        var revNumArr = String(num).split('.')[0].split("").reverse();//倒序
        for (var i in revNumArr){
            tempArr.push(revNumArr[i]);
            if((i+1)%3 === 0 && i != revNumArr.length-1){
            tempArr.push(',');
            }
        }
        var zs = tempArr.reverse().join('');//整数部分
        return decimal?zs+'.'+decimal:zs;
    }
}

export default _string