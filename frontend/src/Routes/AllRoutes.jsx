import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import SeatBook from '../components/SeatBook'
import PrivateRoutes from './PrivateRoutes'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} > </Route>
      <Route path='/login' element={<Login/>} > </Route>
      <Route path='/register' element={<Register/>} > </Route>
      {/* <Route path='/seatbook' element={<PrivateRoutes>
        <SeatBook/>
      </PrivateRoutes>}  > </Route> */}
       <Route path='/seatbook' element={<SeatBook/>} > </Route>
    </Routes>
  )
}

export default AllRoutes
