const checkToken = async() =>{
    const token = localStorage.getItem('token')
    const response = await fetch("/dashboard/check-token", {
        method: "POST",
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
            },
    })
    if (response.redirected) {
        location.replace(response.url)
    }
}

checkToken()

const logout = () => {
    swal({
        title: "Yakin ingin logout?",
        text: ``, 
        icon: "warning",
        buttons: true,
        dangerMode: false,
    }).then(async(willDelete) => {
        if (willDelete) {
            localStorage.removeItem("token")    
            location.replace("/dashboard/login")
        }
      });
}

const changePassword = async(e) => {
    e.preventDefault()
    const data = Array.from(document.querySelectorAll("#formChangePassword input")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})

    if (data.newPassword == data.newPasswordConfirmation) {
        const response = await fetch("/dashboard/change-password", {
            method: "POST",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + getToken()
            },
            body: JSON.stringify(data)
        })
        const responseBody = await response.json()
        if (response.status === 200){
            swal("Successfully change password", "", "success").then(()=>{location.reload()})
        }else{
            swal("Failed to change password", responseBody.message, "error")
        }
    } else {
        swal("Failed to change password", "new password and new password confirmation is not same", "error")
    }
}

const typingPassword = (e) => {
    const data = Array.from(document.querySelectorAll("#formChangePassword input")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})
    const errorLabel = document.getElementById("confirmPasswordErrorLabel")
    if (data.newPassword != data.newPasswordConfirmation) {
        errorLabel.setAttribute("class", "text-danger d-block")
    }else{
        errorLabel.setAttribute("class", "text-danger d-none")
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    tokenParsed = JSON.parse(jsonPayload)
    return tokenParsed
}