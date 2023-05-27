import React from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Button, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Trip() {
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    useEffect(() => {
      setLoading(true);
         fetch(`https://reacttripsapi-production.up.railway.app/api/trips/${id}`)
          .then(res => res.json())
          .then((data) => {
              //console.log(data)
            setLoading(false);
            if (data.hasOwnProperty('_id')) {
              setTrip(data);
            } else {
              setTrip(null);
            }
          });
      }, [id]);


      function handleChange(e){
        let target = e.target; // the element that initiated the event
        let value = target.value; // its value
        let name = target.name; // its name

        setTrip(userTrip=>{
            return {...userTrip, [name]:value}
        });
    }

  
    if(loading===true){
      return(
          <>
          <br/>
          <Card>
          <Card.Header>
                  <Card.Title>{`Unable to find Trip with id: ${id}`}</Card.Title>
              </Card.Header>
          </Card>
          </>
      )
  } else if (loading === false && trip===null){
      return(
          <>
           <br/>
          <Card>
              <Card.Header>
                  <Card.Title>{`Unable to find Trip with id: ${id}`}</Card.Title>
              </Card.Header>
          </Card>
          </>
      )
  }else if(trip){
    return (
    <>
     <Card bg={'light'} className="mb-2">
            <Card.Body>
              <Card.Title>{`Bike: ${trip.bikeid} (${trip.usertype})`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {trip['start station name']} - {trip['end station name']}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <MapContainer 
                style={{ "height": "400px" }} 
                center={[
                    trip["start station location"]["coordinates"][1],
                    trip["start station location"]["coordinates"][0]
                ]} 
                zoom={15}> 
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                <Marker position={[trip["start station location"]["coordinates"][1],trip["start station location"]["coordinates"][0]]}> 
                    <Tooltip permanent direction='right'>Start: {trip["start station name"]}</Tooltip> 
                </Marker> 
                <Marker position={[trip["end station location"]["coordinates"][1],trip["end station location"]["coordinates"][0]]}> 
                    <Tooltip permanent direction='right'>End: {trip["end station name"]}</Tooltip> 
                </Marker>
            </MapContainer><br/>
        <Form>
    <Form.Group>
        <Form.Label>Bike ID</Form.Label>
        <Form.Control type="number" name="bikeid" value={trip.bikeid} onChange={handleChange}/>
    </Form.Group>
    <Form.Group>
        <Form.Label>Birth Year</Form.Label>
        <Form.Control type="number" name="birth year" value={trip["birth year"]} onChange={handleChange} />
    </Form.Group>
    <Form.Check
        type="radio"
        label="Subscriber"
        name="usertype"
        value="Subscriber"
        id="subscriber"
        checked={trip.usertype==="Subscriber"}
        onChange={handleChange}
    />
    <Form.Check
        type="radio"
        label="Customer"
        name="usertype"
        value="Customer"
        id="customer"
        checked={trip.usertype==="Customer"}
        onChange={handleChange}
    />
    <hr />
    <Link to="/Trips" className="btn btn-secondary float-right ml-1">Back to Trips</Link>
    <Button type="submit" className="float-right" >Update Trip User</Button>
</Form>

    </>
  )
}
}


export default Trip
