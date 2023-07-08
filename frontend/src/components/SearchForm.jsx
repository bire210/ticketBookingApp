import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [loading,setLoading]=useState(false)
  const [buses,setBuses]=useState([])

  useEffect(()=>{
   async function fetchCity(){
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "https://tbs-ye6x.onrender.com/bus/search",
        {
          from: "ranchi",
          to: "bokaro",
        },
        config
      );
      setBuses(data.data);
      setLoading(true)
    } catch (error) {
      alert(error.message)
    }
    }
    fetchCity()
  })
  const handleFromCityChange = (e) => {
    setFromCity(e.target.value);
  };

  const handleToCityChange = (e) => {
    setToCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "https://tbs-ye6x.onrender.com/bus/search",
        {
          from: fromCity,
          to: toCity,
        },
        config
      );
      setBuses(data.data);
      setLoading(true)
    } catch (error) {}
  };

  return (
    <div>
      <form className="searchForm" onSubmit={handleSubmit}>
      <label>
        From:
        <input type="text" value={fromCity} onChange={handleFromCityChange} />
      </label>
      <label>
        To:
        <input type="text" value={toCity} onChange={handleToCityChange} />
      </label>
      <button type="submit">Search</button>
    </form>
    <div className="Table">
    {
      loading&&(
        <table>
      <thead style={{
        background:"blue",
        color:"white"
      }}>
        <tr>
          <th>BUSNAME</th>
          <th>FROM</th>
          <th>TO</th>
          <th>CHECK</th>
        </tr>
      </thead>
      <tbody style={{
        textAlign:"center"
      }}>
        {buses.map((item, index) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td><Link to="/seatbook"><button onClick={()=>{
              localStorage.setItem("item",JSON.stringify(item))
            }}>Check</button></Link></td>
          </tr>
        ))}
      </tbody>
    </table>
      )
    }

    </div>
    </div>
  );
};

export default SearchForm;
