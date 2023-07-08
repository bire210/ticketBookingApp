import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
const SeatBook = () => {
  const [seatsofbus, setSeatsofBus] = useState([]);
  const [chooseSeat, setChooseSeat] = useState();
  useEffect(() => {
    async function fetchSeats() {
      let user = JSON.parse(localStorage.getItem("item"));
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        const seats = await axios.get(
          `https://tbs-ye6x.onrender.com/bus/search/${user._id}`,
          config
        );
        let ob = seats.data.seats;
        let arr = [];
        for (let x in ob) {
          let object = {};
          object["number"]=x;
          object[`${x}`] = ob[x];
          arr.push(object);
        }
        setSeatsofBus(arr);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchSeats();
  }, [chooseSeat]);

  async function addToCart(sno) {
    let user = JSON.parse(localStorage.getItem("user"));
    let bus = JSON.parse(localStorage.getItem("item"));
    let token = user.token;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
       const cart=await axios.post("https://tbs-ye6x.onrender.com/cart/add",{
       userId:user._id,
       busId:bus._id,
       seatNo:sno
       },config)
      // console.log({ userId: user._id, busId: bus._id, seatNo: sno });
      alert("ticket is  added to cart");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div>
        <h1 className="Heading">Seat Available</h1>
        <Link to="/cart">
          <button style={{ fontSize: "30px", marginLeft: "130px" }}>
            My Cart
          </button>
        </Link>
      </div>
      <div className="seatcontainer">
        {seatsofbus.map((element, index) => {
          return (
            <div key={index + 1}>
              <button className="seatNo">seat No :{index + 1}</button>
              <button
                type="button"
                onClick={(e) => {
                  console.log(element.number)
                  setChooseSeat(element.number);
                  addToCart(element.number);
                }}
              >
                {element[`${index + 1}`] ? (
                  <p style={{ background: "red", color: "white" }}>Booked</p>
                ) : (
                  "Availabe"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatBook;
