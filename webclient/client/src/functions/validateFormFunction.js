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
            return true
        }
    } else {
        document.getElementById(notificationElement).innerHTML = 'Email không hợp lệ'
        return false
    }
}

const validateUserPassword = (password, notificationElement) => {
    if (password.length > 5 && password.length < 20) {
        document.getElementById(notificationElement).innerHTML = ''
        return true
    } else {
        document.getElementById(notificationElement).innerHTML = 'Mật khẩu từ 5 - 20 ký tự'
        return false
    }
}

const validateUserPasswordAgain = (password, passwordAgain, notificationElement) => {    
    if(passwordAgain === password){
        document.getElementById(notificationElement).innerHTML = ''
        return true
    }else{
        document.getElementById(notificationElement).innerHTML = 'Nhập lại mật khẩu không chính xác'
        return false
    }
}

export {
    validateUserFullname,
    validateUserEmail,
    validateUserPassword,
    validateUserPasswordAgain
}