export function validateEmail(email) {
    // regex matching that used in HTML5 email validation
    var regEx = RegExp(
        '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$'
    )
    return regEx.test(email)
}

export function sanitiseServerResp(response) {}
