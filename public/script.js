function submt() {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password == confirmPassword) {
        return true
    } else {
        const form = document.getElementById('signup-form')
        const warning = document.createElement('div')
        warning.classList.add('alert')
        warning.classList.add('alert-warning')
        warning.setAttribute('role', "alert")
        warning.innerHTML = "Password Didn't Match"
        form.insertBefore(warning, form.childNodes[0])
        return false
    }
}