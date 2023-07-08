import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate ,Link} from 'react-router-dom';
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [book,setBook]=useState(false)

  useEffect(() => {
    async function fetchCart() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const seats = await axios.post(
          `https://tbs-ye6x.onrender.com/cart`,
          {
            userId: user._id,
          },
          config
        );
        setCart(seats.data);
        setLoading(true);
        console.log(seats.data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCart();
  }, [book]);

  async function bookSeat(id) {
    // console.log(id)
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    console.log(token)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const bookTicket = await axios.post(
        `https://tbs-ye6x.onrender.com/book/${id}`,{userId:user._id},
        config
      );
      if(book){
        setBook(false)
      }else{
        setBook(true)
      }
      alert("Ticket has been booked");
    } catch (error) {
      alert(error.message);
    }
  }
  async function cancelSeat(id) {
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
        `https://tbs-ye6x.onrender.com/cart/${id}`,
        config
      );
      if(book){
        setBook(false)
      }else{
        setBook(true)
      }
      alert("Ticket has been Delted from Cart");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div><h1 className="Heading">Ticket in My Cart</h1>
      <Link to="/bookedticket"><button style={{fontSize:"30px",marginLeft:"130px"}}>see Booked Ticket</button></Link>
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
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.busId.name}</td>
                  <td>{item.busId.from}</td>
                  <td>{item.busId.to}</td>
                  <td>{item.busId.price}</td>
                  <td>{item.seatNo}</td>
                  <td>
                    <div className="action">
                      <button
                        className="book"
                        onClick={() => {
                          bookSeat(item._id);
                        }}
                      >
                        Book
                      </button>
                      <button
                        className="cancel"
                        onClick={() => {
                          cancelSeat(item._id);
                        }}
                      >
                        Remove
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

export default Cart;
