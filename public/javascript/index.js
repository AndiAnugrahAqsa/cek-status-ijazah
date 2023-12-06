const getToken = () => {
    return localStorage.getItem('token')
}

const closeModal = (idForm) =>{
    document.getElementById(idForm).reset();
    document.querySelector(`#${idForm} input`).removeAttribute("disabled")
}

new DataTable('#example');

const displyingAdminLink = () =>{
    const adminLink = document.getElementById("adminLink")
    const tokenParsed = parseJwt (localStorage.getItem("token"))
    if (!tokenParsed.is_super) {
        adminLink.setAttribute("class", "d-none")
    }
}

displyingAdminLink()