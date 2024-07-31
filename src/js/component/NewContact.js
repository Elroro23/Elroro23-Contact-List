//Importamos las "herramientas".
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Context } from '../store/appContext';
import "../../styles/NewContact.css";

const NewContact = () => { //Componente para agregar nuevo contacto.
    const { actions } = useContext(Context); //Solo necesitamos las funciones.
    const [name, setName] = useState(""); //Inicializamos todos los estados como strings vacíos.
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(""); 
    const navigate = useNavigate(); //Definimos USENAVIGATE para poder cambiar de página después de hacer algo(enviar formulario, por ejemplo).
//Función para enviar el nuevo contacto al servidor.
    const handleSubmit = (e) => {
        e.preventDefault(); //Evita que se recargue la página.
        const newContact = { //Crea un nuevo objeto de contacto con la información del formulario.
            id: Date.now(), //Usa la fecha y hora actual en milisegundos como un identificador único para el nuevo contacto.
            name, //Información introducida por el usuario.
            email,
            phone,
            address,
        };
        actions.addContact(newContact) //Llamamos a la función definida en ACTIONS y le pasamos el nuevo contacto como parámetro.
            .then(() => {
                navigate("/"); //Cuando ADDCONTACT se termina de ejecutar redirige a la página principal.
            })
            .catch(error => { //Si hay un error lo capturamos y mostramos en consola.
                console.error("Error saving new contact:", error);
            }); 
};
//Definimos .then() y .catch() aquí ya que queremos manejar la respuesta para realizar acciones específicas(Redirigir a la página principal).


    return (
        <div className="container">
            <h1><strong> Add a new contact</strong></h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)} //Sincronizamos lo que escribimos en el campo de texto con el estado.
                        placeholder="Enter full name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    /> 
                </div> 
                <div className="btns d-flex justify-content-center"> 
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/"> 
                <button type="submit" className="btn btn-danger">Get back</button> 
                </Link> 
                </div> 
            </form> 
        </div>
    );
};

export default NewContact;
