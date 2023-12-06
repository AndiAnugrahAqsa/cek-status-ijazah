const login = async(e)=> {
    e.preventDefault()

    const data = Array.from(document.querySelectorAll("#formLogin input")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})

    const response = await fetch("/dashboard/login", {
        method: "POST",
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    })

    if(response.status == 200){
        const res = await response.json()
        localStorage.setItem('token', res.token);
        location.replace("/dashboard/proposer")
    }else{
        swal("Login gagal", "NIP atau password salah", "error")
    }
}