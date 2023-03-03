import React, { useEffect, useState} from 'react';

function HatForm( ) {
    const [locations, setLocations] = useState([]);

    const fetchData = async () => {
        const locationsUrl = "http://localhost:8100/api/locations/";
        const locationsResponse = await fetch(locationsUrl);
        if (locationsResponse.ok) {
            const locationsData = await locationsResponse.json();
            setLocations(locationsData.locations);
        }
    }

    const [fabric, setFabric] = useState('');
    const [style, setStyle] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [location, setLocation] =useState('')


    const handleFabricChange = event => {
        const value = event.target.value
        setFabric(value)
    }

    const handleStyleChange = event => {
        const value = event.target.value
        setStyle(value)
    }

    const handleColorChange = event => {
        const value = event.target.value
        setColor(value)
    }

    const handlePictureUrlChange = event => {
        const value = event.target.value
        setPictureUrl(value)
    }

    const handleLocationChange = event => {
        const value = event.target.value
        setLocation(value)
    }

    useEffect(() => {
        fetchData();
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty JSON object
        const data = {};

        data.fabric = fabric;
        data.style = style;
        data.color = color;
        data.picture_url = picture_url;
        data.location = location;
        console.log(data);

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const hatResponse = await fetch(hatUrl, fetchConfig);
        if (hatResponse.ok) {
            const hatData = await hatResponse.json();
            console.log(hatData);

            setFabric('');
            setStyle('');
            setColor('');
            setPictureUrl('');
            setLocation('');
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input value={fabric} onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input value={style} onChange={handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control"/>
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={picture_url} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select
                    required value={location} onChange={handleLocationChange} name="location"
                    id="location"
                    className="form-select">
                    <option key="" value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.href} value={location.href}>
                            {location.closet_name}
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

export default HatForm;
