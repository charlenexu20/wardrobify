import React, {useEffect, useState} from "react";

function ShoeForm(props) {

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.manufacturer_name = Namemanufacturer
        data.model_name = Namemodel
        data.color = color
        data.photo = photoUrl
        data.bin = {"import_href": bin}

        const shoeUrl = "http://localhost:8080/api/shoes/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(shoeUrl, fetchConfig)
        if(response.ok) {
            props.fetchShoes()
            setNamemanufacturer("")
            setNamemodel("")
            setcolor("")
            setphotoUrl("")
            setBin("")
        }
    }
    const [Namemanufacturer, setNamemanufacturer] = useState("")
    const [Namemodel, setNamemodel] = useState("")
    const [color, setcolor] = useState("")
    const [photoUrl, setphotoUrl] = useState("")
    const [bin, setBin] = useState("")
    const [bins, setBins] = useState([])

    const handleNameManufacturerChange = (event) => {
        const value = event.target.value
        setNamemanufacturer(value)
    }
    const handleNameModelChange = (event) => {
        const value = event.target.value
        setNamemodel(value)
    }
    const handleColorChange = (event) => {
        const value = event.target.value
        setcolor(value)
    }
    const handlePhotoUrlChange = (event) => {
        const value = event.target.value
        setphotoUrl(value)
    }
    const handleBinChange = (event) => {
        const value = event.target.value
        setBin(value)
    }
    const FetchData = async () => {
        const url = "http://localhost:8100/api/bins/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setBins(data.bins)
        }
    }
    useEffect(()=> {
        FetchData();
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input value={Namemanufacturer} onChange={handleNameManufacturerChange} required type="text" name="manufacturer_name" id="manufacturer_name" className="form-control" />
                            <label>Manufacturer Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={Namemodel} onChange={handleNameModelChange} required type="text" name="model_name" id="model_name" className="form-control" />
                            <label>Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} required type="text" name="color" id="color" className="form-control" />
                            <label>Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={photoUrl} onChange={handlePhotoUrlChange} required name="photo_url" id="photo_url" type = "url" className="form-control" />
                            <label>PicUrl</label>
                        </div>
                        <div className="mb-3">
                            <select value={bin} onChange={handleBinChange} required id="bin" name="bin" className="form-select">
                                <option value=''>Choose a bin</option>
                                {bins.map(bin => {
                                    return (
                                        <option key={bin.href} value={bin.href}>
                                        {bin.closet_name}, Bin #{bin.bin_number}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShoeForm
