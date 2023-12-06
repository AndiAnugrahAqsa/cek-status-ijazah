function checkStatus(e) {
    e.preventDefault()
    const nim = document.getElementById("nim").value
    window.location.href = "/"+nim
}