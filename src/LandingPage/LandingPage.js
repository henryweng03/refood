import React from "react";
import "../index.css"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";


export default function StoreApp() {
  
  const [open, setOpen] = React.useState(false);
  const handleSignInOpen = () =>{
    setOpen(true);
  }

  const handleSignInClose = () =>{
    setOpen(false);
  }

  const { register, handleSubmit } = useForm();

  return <div id = "container">
      <img class = 'lp-logo' src="refood_transparent.png" alt="Refood Logo" />
      <Link to = "/view-events">
        <button className = 'landing-button'>View Upcoming Events</button>
      </Link>
      <button onClick = {handleSignInOpen} className = 'landing-button'>Sign in as Store</button>
      <Dialog
        open = {open}
        onClose = {handleSignInClose}
        PaperProps={{
          style: { borderRadius: 20, width: "55vh"}
        }}>
            <div class = "sign-form">
              <h2>Sign in as Store</h2>
              <br />
              <form id = "signup-form" onSubmit = {handleSubmit((data) =>{
                document.getElementById("signup-form").reset();
              })}>
                <div class = "field">
                  <input type = "text" required {...register("store-name")} /><br/><br/>
                  <label>Store Name</label>
                </div>
                <div class = "field">
                  <input type = "text" required {...register("address")} /><br/><br/>
                  <label>Store Address</label>
                </div>
                  <input type = "submit" />
              </form>
            </div>
      </Dialog>

    </div>
  }