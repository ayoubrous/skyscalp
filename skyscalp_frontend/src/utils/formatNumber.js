const formatNumber = (strNum) => {
    let num
    if (typeof strNum === 'string') {
         num = parseInt(strNum.replace(/\s/g, ''), 10);
    }
    else {
        num = strNum
    }

    if (num >= 1000000) {
        return Math.floor(num / 1000000) + 'm';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'k';
    } else {
        return num.toString();
    }

}

export default formatNumber