import React from "react";
import { useForm } from "react-hook-form";

export default function StoreApp() {
    const { register, handleSubmit } = useForm();

    return <div>
      <h1>Landing Page</h1><br />

      <div class = "create-event">
        <h2 class = "form-header">Create New Event</h2>
        <form id = "add-marker-form">
          <div class = "field">
           <input type = "number" step = "any" required {...register("lat")} /><br/><br/>
           <label>Latitude</label>
          </div>
          <div class = "field">
           <input type = "number" step = "any" required {...register("lng")} /><br/><br/>
           <label>Longitude</label>
          </div>
          <div class = "field">
           <input type = "text" required {...register("name")} /><br/><br/>
           <label>Event name</label>
          </div>
          <div class = "field">
           <input type = "datetime-local" required {...register("startDate")} /><br/><br/>
           <label>Event start</label>
          </div>
          <div class = "field">
           <input type = "datetime-local" required {...register("endDate")} /><br/><br/>
           <label>Event end</label>
          </div>
          <div class = "field">
            <input type = "text" required {...register("description")} /><br/>
           <label>Event description</label>
          </div>
           <input type = "submit" />
      </form>
      </div>
    </div>
  }