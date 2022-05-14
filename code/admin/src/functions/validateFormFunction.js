//hàm xóa ký tự đầu tiên 
function deleteCharFist(string) {
    //xóa ký tự đầu
    //chuổi bắt đầu từ 0
    string = string.substring(1);
    return string;
}

//hàm xóa dấu phẩy trong số (giá, số lượng)
function deleteDots(number) {
    //xóa dấu phẩy
    let numberDeleteDots = "";
    for (var i = 0; i < number.length; i++) {
        if (number[i] != ",") {
            numberDeleteDots += number[i];
        }
    }
    return numberDeleteDots;
}

//hàm thêm dấu phẩy trong số (giá, số lượng)
function insertDots(number) {
    //reverse làm việc trên mảng nên phải cắt số thành từng mảng
    let reverseNumber = number.split("").reverse().join("");

    //chuyen chuoi về mảng để tạo biến chạy i
    reverseNumber = reverseNumber.split("");

    //biến kết quả
    let resultNumber = '';

    //vòng lặp thêm dấu ","
    for (let i = 0; i < reverseNumber.length; i++) {
        if (i % 3 == 0 && i != 0) {
            resultNumber += ",";
        }
        resultNumber += reverseNumber[i];
    }
    //sau khi thêm dấu thì đảo ngược chuỗi về ban đầu
    resultNumber = resultNumber.split("").reverse().join("");

    return resultNumber;
}

//=====================================================================

const validateProductName = (productName, notificationElement, elementFocus) => {
    if (productName.length > 0 && productName.length <= 40) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Tên từ 1 - 40 ký tự'
        document.getElementById(elementFocus).focus()
        return false
    }
}

//hàm kiểm tra và định dạng số
function validateProductPrice(price, showPriceElement, notificationElement, elementFocus) {
    //nếu số đầu tiên là số "0" thì xóa bỏ
    if (price[0] == 0) {
        price = deleteCharFist(price);
    }

    // //nếu dữ liệu khi nhập có dấu xóa bỏ để thêm dấu lại cho chính xác
    let numberDeleteDots = deleteDots(price);

    const regex = /^\d{4,10}$/gi
    if (regex.test(numberDeleteDots)) {
        //thêm dấu phẩy vào giá
        let numberInsertDots = insertDots(numberDeleteDots);
        document.getElementById(showPriceElement).value = numberInsertDots
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(showPriceElement).innerHTML = price
        document.getElementById(notificationElement).innerHTML = 'Số không hợp lệ ( ví dụ: 1 đồng = 1000 )'
        document.getElementById(elementFocus).focus()
        return false
    }
}

//hàm kiểm tra và định dạng số
function validateProductNumber(price, showPriceElement, notificationElement, elementFocus) {
    //nếu số đầu tiên là số "0" thì xóa bỏ
    if (price[0] == 0) {
        price = deleteCharFist(price);
    }

    // //nếu dữ liệu khi nhập có dấu xóa bỏ để thêm dấu lại cho chính xác
    let numberDeleteDots = deleteDots(price);

    const regex = /^\d{1,10}$/gi
    if (numberDeleteDots != 0) {
        if (regex.test(numberDeleteDots)) {
            //thêm dấu phẩy vào giá
            let numberInsertDots = insertDots(numberDeleteDots);
            document.getElementById(showPriceElement).value = numberInsertDots
            document.getElementById(notificationElement).innerHTML = ''
            return true
        } else {
            document.getElementById(showPriceElement).innerHTML = price
            document.getElementById(notificationElement).innerHTML = 'Số không hợp lệ ( Số từ 1 ký tự trở lên )'
            document.getElementById(elementFocus).focus()
            return false
        }
    } else {
        document.getElementById(showPriceElement).innerHTML = price
        document.getElementById(notificationElement).innerHTML = 'Số không hợp lệ ( Số lớn hơn 0 )'
        document.getElementById(elementFocus).focus()
        return false
    }
}

const validateSelect = (select, selectElement) => {
    if (select !== '') {
        document.getElementById(selectElement).classList.remove('is-invalid')
        return true
    } else {
        document.getElementById(selectElement).classList.add('is-invalid')
        document.getElementById(selectElement).focus()
        return false
    }
}

const validateFullname = (fullname, notificationElement) => {
    if (fullname.length > 0 && fullname.length < 50) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Họ tên từ 1 - 50 ký tự'
        return false
    }
}

const validatePhoneNumber = (phoneNumber, notificationElement) => {
    const reg = /^0\d{9}$/i
    if (reg.test(phoneNumber)) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Số điện thoại không hợp lệ (Bắt đầu từ số 0 và gồm 10 chữ số)'
        return false
    }
}

const validateEmail = (email, notificationElement) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i //note: * (from 0 - more); + (from 1 - more);
    if (reg.test(email)) {
        if (email.length < 100) {
            document.getElementById(notificationElement).innerHTML = ''
            return true
        } else {
            document.getElementById(notificationElement).innerHTML = 'Email dưới 100 ký tự'
            return false
        }
    } else {
        document.getElementById(notificationElement).innerHTML = 'Email không hợp lệ'
        return false
    }
}

const validatePassword = (password, notificationElement) => {
    if (password.length >= 5 && password.length <= 20) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Mật khẩu từ 5 - 20 ký tự'
        return false
    }
}

const validateAddress = (address, notificationElement) => {
    // console.log(address.length);
    if (address.length > 0 && address.length <= 100) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Địa chỉ từ 1 - 100 ký tự'
        return false
    }
}

export {
    validateProductName,
    validateProductPrice,
    validateProductNumber,
    validateSelect,
    deleteDots,
    validateFullname,
    validatePhoneNumber,
    validateEmail,
    validatePassword,
    validateAddress
}