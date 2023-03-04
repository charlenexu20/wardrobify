import { NavLink } from "react-router-dom"
import React from 'react'


function ShoeList(props) {

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        const deleteId = e.target.value
        const deleteUrl = "http://localhost:8080/api/shoes/${deleteId}/"
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(deleteUrl,fetchConfig)
        if (response.ok){
            props.fetchShoes()
        }
    }

    return (
        <div>
            <NavLink className="nav-link" to="/shoes/new">Add a new shoe to our collection</NavLink>
            <table className="table table-striped table-hover align-middle mt-5">
                <thead>
                    <tr>
                        <th>Manufacturer Name</th>
                        <th>Model Name</th>
                        <th>Color</th>
                        <th>Closet Name</th>
                        <th>Bin</th>
                        <th>Photo</th>
                        <th>Delete Shoe!</th>
                    </tr>
                </thead>
                <tbody>
                    {props.shoes.map(shoe => {
                        return (
                            <tr key={shoe.href}>
                                <td>{shoe.manufacturer_name}</td>
                                <td>{shoe.model_name}</td>
                                <td>{shoe.color}</td>
                                <td>{shoe.bin.closet_name}</td>
                                <td>{shoe.bin.bin_number}</td>
                                <td><img src={shoe.photo_url} className="img-shoes" width="300"></img></td>
                                <td>
                                    <button type="button" value={shoe.id} onClick={handleDeleteClick}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShoeList
