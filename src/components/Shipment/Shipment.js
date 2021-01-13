import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import './shipment.css';


//using react hook form: https://react-hook-form.com/get-started
const Shipment = () => {
    
    const { register, watch, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); // watch input value by passing the name of it
    const [loggedInUser, setLoggedInUser] = useContext(userContext) // we have to use the logged in users data from the context, so that the user doesn't have to provide all of his details on the shipment page 

    return (
        <form className = "ship-form" onSubmit={handleSubmit(onSubmit)} action="">
 
            <input name="name"  defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder =" Your name"/>
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder ="Your email " />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder ="Your addess "/>
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder ="Your phone number"/>
            {errors.phone && <span className="error">Phone number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;