const validateUserFullname = (fullname) => {
    if (fullname.length > 0 && fullname.length < 50) {
        return true
    } else {
        return false
    }
}

const validateUserEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i //note: * (from 0 - more); + (from 1 - more);
    if (reg.test(email)) {
        if (email.length < 100) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

const validateUserPassword = (password) => {
    if (password.length >= 5 && password.length <= 20) {
        return true
    } else {
        return false
    }
}

// const validateUserPasswordAgain = (password, passwordAgain, notificationElement) => {
//     if (passwordAgain === password) {
//         return true
//     } else {
//         return false
//     }
// }

const validateUserPhoneNumber = (phoneNumber) => {
    const reg = /^0\d{9}$/i
    if (reg.test(phoneNumber)) {
        return true
    } else {
        return false
    }
}

const validateUserAddress = (address) => {
    // console.log(address.length);
    if (address.length > 0 && address.length <= 100) {
        return true
    } else {
        return false
    }
}

// const validateUserProvince = (province, selectElement) => {
//     if (province !== '') {
//         return true
//     } else {
//         return false
//     }
// }

// const validateUserDistrict = (district, selectElement) => {
//     if (district !== '') {
//         return true
//     } else {
//         return false
//     }
// }

const validateUserWard = (ward) => {
    if (ward !== '') {
        return true
    } else {
        return false
    }
}

module.exports = {
    validateUserFullname,
    validateUserEmail,
    validateUserPassword,
    // validateUserPasswordAgain,
    validateUserPhoneNumber,
    validateUserAddress,
    // validateUserProvince,
    // validateUserDistrict,
    validateUserWard
}