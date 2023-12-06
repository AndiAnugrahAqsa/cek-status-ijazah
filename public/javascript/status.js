const submitStatus = async(event) => {
    event.preventDefault();
    const data = Array.from(document.querySelectorAll("#statusModal input")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})

    statusModalLabel = document.getElementById("statusModalLabel").innerHTML
    if (statusModalLabel === "Tambahkan Status") {
        let response = await fetch("/dashboard/status", {
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
            swal("Failed to add data", "", "error").then(()=>{location.reload()})
        }
    } else{
        let response = await fetch("/dashboard/status", {
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
            swal("Failed to edit data", "", "error").then(()=>{location.reload()})
        }
    }
   
    event.preventDefault();
}

const editStatus = (status) => {
    statusModalLabel = document.getElementById("statusModalLabel")
    statusModalLabel.innerHTML = "Edit Status"

    const tag = document.querySelectorAll("#statusModal input")

    tag[0].setAttribute("disabled", "")

    tag.forEach((data)=>{
        data.value = status[data.id]
    })
}

const deleteStatus = (id)=>{
    swal({
        title: "Peringatan",
        text: `Yakin ingin menghapus data dengan ID ${id}?`, 
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            fetch(`/dashboard/status/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + getToken()
                },
            })
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            }).then(()=>{location.reload()});
        }
      });
}