import React, { Fragment, useState } from "react";
import shortid from "shortid";

const Form = ({ doAppointment }) => {
  const [appointment, setAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    time: "",
    symptoms: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const { pet, owner, date, time, symptoms } = appointment;

  const submitAppointment = (e) => {
    e.preventDefault();
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    appointment.id = shortid();

    doAppointment(appointment);

    setAppointment({
      pet: "",
      owner: "",
      date: "",
      time: "",
      symptoms: ""
    })
  };

  return (
    <Fragment>
      <h2> Make an appointment</h2>
      {error ? <p className="alerta-error">All fields are required </p> : null}
      <form onSubmit={submitAppointment}>
        <label>Pet´s name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Your pet´s name"
          onChange={handleChange}
          value={pet}
        />
        <label>Owner´s name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Owner´s name"
          onChange={handleChange}
          value={owner}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={handleChange}
          value={date}
        />
        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={handleChange}
          value={time}
        />
        <label>Symptoms</label>
        <textarea
          className="u-full-width"
          name="symptoms"
          onChange={handleChange}
          value={symptoms}
        ></textarea>
        <button type="submit" className="u-full-widt button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
