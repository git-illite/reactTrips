import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, Badge, Spinner, ListGroup, Pagination,Table} from 'react-bootstrap'

export default function Trips(props) {
    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(1);
    //let page = 1;
    const perPage = 10;
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`https://reacttripsapi-production.up.railway.app/api/trips?page=${page}&perPage=${perPage}`)
            .then((res) => res.json())
            .then((data) => {
              setTrips(data);
              //console.log(data);
            })
            .catch((err) => console.log("Error" + err));
        },[page]);

    function previousPage(){
        if (page > 1) 
        setPage(page - 1);
    };
    function nextPage(){
        setPage(page + 1);
    };
    let tripDur = (td) => (td /60).toFixed(2);

    if(!trips){
        return(<ListGroup.Item>
            <Spinner animation="border" variant="info" />
              Loading Trips...
          </ListGroup.Item>)
    }

  return (
    
        <> 
    <Card className="mb-4">
     <Card.Header>
      <h3>Trip List</h3>
      
       <p>Full list of Citibike Trips. </p>
        <div className="float-right"> 
     <Badge className='Subscriber' >Subcribers</Badge> <Badge className='Customer'>Customers</Badge>
       </div>
      
     </Card.Header>
    </Card>
    
          <Table bordered hover className="table" id="trips-table">
            <thead>
              <tr>
                  <th>Bike Id</th>
                  <th>Start Station</th>
                  <th>End Station</th>
                  <th>Duration</th>
              </tr>
          </thead>
              <tbody> 
              {trips.map((trip) => (
          <tr key={trip._id} className={trip.usertype}  onClick={()=>{ navigate(`/trip/${trip._id}`)}} >
            <td>{trip.bikeid}</td>
            <td>{trip['start station name']}</td>
            <td>{trip['end station name']}</td>
            <td>{tripDur(trip.tripduration)}</td>
          </tr>
        ))}                         
              </tbody>
          </Table>
          
       <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
        </>
    
  )
}
