import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";
import PropTypes from "prop-types";

function App() {

 let initialAppointments = JSON.parse(localStorage.getItem('appointments')); 
 if(!initialAppointments) {
   initialAppointments = [];
 }

  const [ appointments, setAppointments] = useState(initialAppointments);

  useEffect(()=>{ if (initialAppointments){
    localStorage.setItem('appointments',JSON.stringify(appointments))
  } else {
    localStorage.setItem('appointments', JSON.stringify([]));
  }
},[appointments,initialAppointments])

  const doAppointment = appointment =>{ setAppointments([...appointments, appointment]);}

  const deleteAppointment = id => { 
    const newAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(newAppointments);
  }

  const title = appointments.length === 0 ? "There are not appointments" : "Manage your appointments"

  
  return (
    <Fragment>
      <h1>Patiens Administration</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
            doAppointment={doAppointment}/>
          </div>
          <div className="one-half column">
          <h2>{title}</h2>
            {appointments.map(cita=>(
              <Appointment
                key={cita.id}
                appointment={cita}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Form.propTypes = {
  doAppointment: PropTypes.func.isRequired
}

export default App;
