const validateUserFullname = (fullname, notificationElement) => {
    if (fullname.length > 0 && fullname.length < 50) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Họ tên từ 1 - 50 ký tự'
        return false
    }
}

const validateUserEmail = (email, notificationElement) => {
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

const validateUserPassword = (password, notificationElement) => {
    if (password.length >= 5 && password.length <= 20) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Mật khẩu từ 5 - 20 ký tự'
        return false
    }
}

const validateUserPasswordAgain = (password, passwordAgain, notificationElement) => {
    if (passwordAgain === password) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Nhập lại mật khẩu không chính xác'
        return false
    }
}

const validateUserPhoneNumber = (phoneNumber, notificationElement) => {
    const reg = /^0\d{9}$/i
    if (reg.test(phoneNumber)) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Số điện thoại không hợp lệ (Bắt đầu từ số 0 và gồm 10 chữ số)'
        return false
    }
}

const validateUserAddress = (address, notificationElement) => {
    // console.log(address.length);
    if (address.length > 0 && address.length <= 100) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Địa chỉ từ 1 - 100 ký tự'
        return false
    }
}

const validateUserProvince = (province, selectElement) => {
    if (province !== '') {
        document.getElementById(selectElement).classList.remove('is-invalid')
        return true
    } else {
        document.getElementById(selectElement).classList.add('is-invalid')
        return false
    }
}

const validateUserDistrict = (district, selectElement) => {
    if (district !== '') {
        document.getElementById(selectElement).classList.remove('is-invalid')
        return true
    } else {
        document.getElementById(selectElement).classList.add('is-invalid')
        return false
    }
}

const validateUserWard = (ward, selectElement) => {
    if (ward !== '') {
        document.getElementById(selectElement).classList.remove('is-invalid')
        return true
    } else {
        document.getElementById(selectElement).classList.add('is-invalid')
        return false
    }
}

const validateUserAgree = (argee, checkElement) => {
    if (argee) {
        document.getElementById(checkElement).classList.remove('is-invalid')
        return true
    } else {
        document.getElementById(checkElement).classList.add('is-invalid')
        return false
    }
}

export {
    validateUserFullname,
    validateUserEmail,
    validateUserPassword,
    validateUserPasswordAgain,
    validateUserPhoneNumber,
    validateUserAddress,
    validateUserProvince,
    validateUserDistrict,
    validateUserWard,
    validateUserAgree
}