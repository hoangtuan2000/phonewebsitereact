const reverseString = (string) => {
    let newString = ""
    for (let i = string.length - 1; i >= 0; i--) {
        newString += string[i]
    }
    return newString
}

const moneyFormat = (number) => {
    let i
    let n = number.toString() //chuyển n thành chuỗi
    n = reverseString(n) //đảo chuỗi
    let result = '' //biến kết quả
    for (i = 0; i < n.length; i++) {
        if (i % 3 == 0 && i != 0) {
            result += ','
        }
        result += n[i]
    }
    result = reverseString(result)

    return result;
}

const reducedPrice = (price, reduced) => {
    let decrease = price * (reduced / 100)
    let newPrice = Math.round(price - decrease);
    return newPrice;
}

export {
    moneyFormat,
    reducedPrice
}