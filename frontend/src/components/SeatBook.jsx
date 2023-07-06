import React, { useEffect, useState } from "react";
import axios from "axios";

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
          `http://localhost:8080/api/bus/search/${user._id}`,
          config
        );
        let ob = seats.data.seats;
        let arr = [];
        for (let x in ob) {
          let object = {};
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

  async function addToCart() {
    let user = JSON.parse(localStorage.getItem("user"));
    let bus = JSON.parse(localStorage.getItem("item"));
    let token=user.token;
    const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      };
     
    try {
     const cart=await axios.post("http://localhost:8080/api/bus/cart/add",{
     userId:user._id,
     busId:bus._id,
     seatNo:chooseSeat
     },config)

     console.log("tocket added")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h1 className="Heading">Seat Available</h1>
      <div className="seatcontainer">
        {seatsofbus.map((element, index) => {
          return (
            <div key={index + 1}>
              <button className="seatNo">seat No :{index + 1}</button>
              <button
                type="button"
                onClick={(e) => {
                  setChooseSeat(index + 1);
                  addToCart();
                }}
              >
                {element[`${index + 1}`] ? <p>Booked</p> : "Availabe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatBook;
