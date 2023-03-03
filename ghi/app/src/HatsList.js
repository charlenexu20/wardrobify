import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HatsList(props) {
  const [hats, setHats] = useState([]);
  const fetchData = async () => {
    const hatUrl = 'http://localhost:8090/api/hats/';
    const response = await fetch(hatUrl);
    if (response.ok) {
      const data = await response.json();
      setHats(data.hats);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHat = async (id) => {
    const response = await fetch(`http://localhost:8090/api/hats/${id}`, {
      method: "delete",
    })
    if (response.ok) {
      console.log('Hat deleted')
      window.location.reload();
    }
  };

  if (hats === undefined) {
    return null;
  }

  return (
    <><div className="px-4 py-5 my-5 mt-0 text-center bg-info">
      <h1 className="display-5 fw-bold">Hat Organizer</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The best resource to keep your hats organized.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add New Hat</Link>
        </div>
      </div>
    </div><table className="table table-striped">
        <thead>
          <tr>
            <th>Fabric</th>
            <th>Style</th>
            <th>Color</th>
            <th>Picture URL</th>
            <th>Location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {hats.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{hat.fabric}</td>
                <td>{hat.style}</td>
                <td>{hat.color}</td>
                <td>
                  <img className="img-thumbnail w-25 p-3" src={hat.picture_url} />
                </td>
                <td>{hat.location}</td>
                <td>
                  <button onClick={() => deleteHat(hat.id)} type="button">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table></>
  );
}

export default HatsList;
