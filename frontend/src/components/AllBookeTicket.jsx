import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate ,Link} from 'react-router-dom';
const AllBookeTicket = () => {
  const [bookedTicket, setBookedTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book,setBook]=useState(false)
  useEffect(() => {
    async function fetcBookedTicket() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const tickets = await axios.post(
          `https://tbs-ye6x.onrender.com/book`,
          {
            userId: user._id,
          },
          config
        );
        setBookedTicket(tickets.data);
        setLoading(true);
        console.log(tickets.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetcBookedTicket();
  }, [book]);

  async function cancelTicket(id) {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const cancelTicket = await axios.delete(
        `https://tbs-ye6x.onrender.com/book/${id}`,
        config
      );
      if(book){
        setBook(false)
      }else{
        setBook(true)
      }
      alert("Ticket has been Cancel");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
       <div><h1 className="Heading">All Booked Tickets</h1>
      <Link to="/cart"><button style={{fontSize:"30px",marginLeft:"130px"}}>go TO My cart</button></Link>
      <Link to="/seatbook"><button style={{fontSize:"30px",marginLeft:"130px"}}>Check Seat Availble</button></Link>
      </div>
      <div className="Table">
        {loading && (
          <table>
            <thead
              style={{
                background: "blue",
                color: "white",
              }}
            >
              <tr>
                <th>BUSNAME</th>
                <th>FROM</th>
                <th>TO</th>
                <th>PRICE</th>
                <th>SEAT NO</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody
              style={{
                textAlign: "center",
              }}
            >
              {bookedTicket.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.busId.name}</td>
                  <td>{item.busId.from}</td>
                  <td>{item.busId.to}</td>
                  
                  <td>{item.busId.price}</td>
                  <td>{item.seatNo}</td>
                  <td>
                    <div className="action">
                    <Link to="/pay"><button className="book">Pay Now</button></Link>
                      
                      <button
                        className="cancel"
                        onClick={() => {
                          cancelTicket(item._id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllBookeTicket;
