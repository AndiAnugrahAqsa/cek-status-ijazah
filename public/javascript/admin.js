const submitAdmin = async(event) => {
    event.preventDefault();
    const data = Array.from(document.querySelectorAll("#formAdmin input, select")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})
    adminModalLabel = document.getElementById("adminModalLabel").innerHTML
    if (adminModalLabel === "Tambahkan Admin") {
        let response = await fetch("/dashboard/admin", {
            method: "POST",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + getToken()
                },
            body: JSON.stringify(data)
        })

        if (response.status === 200){
            swal("Successfully add data", "", "success").then(()=>{location.reload()})
        }else{
            swal("Failed to add data", "", "error")
        }
    } else{
        let response = await fetch("/dashboard/admin", {
            method: "PUT",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + getToken()
                },
            body: JSON.stringify(data)
        })
        if (response.status === 200){
            swal("Successfully edit data", "", "success").then(()=>{location.reload()})
        }else{
            swal("Failed to edit data", response.json().message || "", "error")
        }
    }
}

const editAdmin = (admin) => {
    adminModalLabel = document.getElementById("adminModalLabel")
    adminModalLabel.innerHTML = "Edit Admin"

    const tag = document.querySelectorAll("#formAdmin input, select")

    tag[0].setAttribute("disabled", "")

    tag.forEach((data)=>{
        data.value = admin[data.id]
    })
}

const deleteAdmin = (id)=>{
    swal({
        title: "Peringatan",
        text: `Yakin ingin menghapus data dengan NIP ${id}?`, 
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(async(willDelete) => {
        if (willDelete) {
            const response = await fetch(`/dashboard/admin/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + getToken()
                },
            })

            if (response.status === 200){
                swal("Successfully delete data", "", "success").then(()=>{location.reload()})
            }else{
                swal("Failed to delete data", "", "error")
            }
        }
      });
}