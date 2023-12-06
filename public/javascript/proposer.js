const submitProposer = async(event) => {
    event.preventDefault();
    const data = Array.from(document.querySelectorAll("#formProposer input, select, textarea")).reduce((acc, input)=>({...acc, [input.id]: input.value}), {})

    proposerModalLabel = document.getElementById("proposerModalLabel").innerHTML
    if (proposerModalLabel === "Tambahkan Pengusul") {
        let response = await fetch("/dashboard/proposer", {
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
        let response = await fetch("/dashboard/proposer", {
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

const editProposer = (proposer) => {
    proposerModalLabel = document.getElementById("proposerModalLabel")
    proposerModalLabel.innerHTML = "Edit Pengusul"

    const tag = document.querySelectorAll("#formProposer input, select, textarea")
    const defaultDate = proposer.entry_date.split("/")

    proposer.entry_date = `${defaultDate[2]}-${defaultDate[1]}-${defaultDate[0]}`

    tag[0].setAttribute("disabled", "")

    tag.forEach((data)=>{
        data.value = proposer[data.id]
    })
}

const deleteProposer = (id)=>{
    swal({
        title: "Peringatan",
        text: `Yakin ingin menghapus data dengan NIM ${id}?`, 
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(async(willDelete) => {
        if (willDelete) {
            const response = await fetch(`/dashboard/proposer/${id}`, {
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
                swal("Failed to delete data", "", "error").then(()=>{location.reload()})
            }
        }
      });
}