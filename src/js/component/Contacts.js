//useContext: Para acceder al contexto.
//useState: Para manejar el contexto de componentes.
//useEffect: Para ejecutar efectos secundarios como cargar datos.
//useRef: Para acceder a referencias del DOM.
//Context: Importa el contexto creado en flux.js
//Link: Para navegar entre rutas sin recargar la página.
import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import "../../styles/Contacts.css";
import { Link } from "react-router-dom";

const Contacts = ({ imgs }) => { //Componente al cual se le envían imagenes como props.
    const { store, actions } = useContext(Context); //Permite acceder a las funciones e información disponibles en el contexto global.
    const [editingContact, setEditingContact] = useState(null); //Definimos varios estados que cambiarán con el tiempo.
    const [name, setName] = useState(""); //Inicializamos las variables con strings vacíos ya que estos datos se van a rellenar. 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const editRef = useRef(null); //Referencia al DIV de edición(para que la pantalla se acerque al editar el contacto).

    useEffect(() => {
        actions.fetchContacts(); //Carga los contactos cuando se monta el componente.
    }, []);

//Función para manejar la cción de editar un contacto.
    const handleEditContact = (contact) => {
        setEditingContact(contact); //CONTACTO que actualmente se está editando en el estado.
        setName(contact.name); //Actualiza el estado NAME con el nombre del contacto seleccionado. Así con los siguientes:
        setEmail(contact.email);
        setPhone(contact.phone);
        setAddress(contact.address);

        setTimeout(() => { //SETTIMEOUT "0" se usa para ejecutar la acción de desplazamiento de la pantalla luego del re-renderizado.
            editRef.current.scrollIntoView({ behavior: "smooth" }); //Desplazamos al pantalla al elemento referenciado(formulario).
        }, 0);
    };
//Función para guardar los cambios realizados a un contacto en el formulario de edición.
    const handleSaveEdit = () => {
        //Llama a la función EDITCONTACT y envía el nuevo arreglo con el contacto editado al servidor.
        actions.editContact({ ...editingContact, name, email, phone, address });
        setEditingContact(null); //Ocultamos el formulario una vez editado.
        setName(""); //Limpiamos los campos de texto en el formulario.
        setEmail("");
        setPhone("");
        setAddress("");
    };
//Función para manejar la cancelación de la edición de un contacto.
    const handleCancelEdit = () => {
        setEditingContact(null); //Ocultamos el formulario.
        setName(""); //Reiniciamos el estado a una cadena vacía(limpiamos los campos de texto).
        setEmail("");
        setPhone("");
        setAddress("");
        window.scrollTo({ top: 0, behavior: "smooth" }); //Desplazamos la pantalla a la parte superior(contactos).
    };

    return (
        <div className="container"> 
            <div className="row add">
                <Link to="/new-contact"> 
                    <button className="btn btn-success">Add Contact</button>
                </Link>
            </div>
            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (//Si store.contacts es un array y contiene al menos un elemento.
                store.contacts.map((contact, index) => ( //Se renderiza la lista de contactos.
                    <div className="row row-card" key={contact.id}>
                        <div className="col-3 colimg">
                            <div className="card">
                                <img
                                    src={imgs[index % imgs.length]}//Aplicamos una imagen a cada contacto, si hay más imágenes que contactos se repiten.
                                    alt={contact.name}
                                />
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="card-body">
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">{contact.email}</p>
                                <p className="card-text">{contact.phone}</p>
                                <p className="card-text">{contact.address}</p>
                            </div> 
                        </div>

                        <div className="col-3 icons">
                            <i
                                className="fa-solid fa-pen-to-square" //No usamos EDITCONTACT directamente ya que necesitamos preparar el formulario antes.
                                onClick={() => handleEditContact(contact)} //Agregamos el evento(EditarContacto) al icono de editar.
                            ></i> 
                            <i
                                className="fa-solid fa-trash"
                                onClick={() => actions.deleteContact(contact.id)} //Agregamos el evento(EliminarContacto) al icono de eliminar
                            ></i>
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                    <div className="col-12">
                        <h2>No hay contactos</h2>
                    </div>
                </div>
            )}
            {editingContact && ( //Si hay un contacto para editar, se muestra el formulario.
                <div ref={editRef} className="hr"> {/* Referencia al contenedor de edición */}
                    <hr />
                    <div className="edit">
                        <div className="row title">
                            <h5>
                                <strong>Edit Contact</strong>
                            </h5>
                        </div>
                        <div className="row inputs">
                            <div className="col">
                                <label>
                                    <strong>Full name</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="text"
                                    value={name} //Mostramos el valor actual de name
                                    onChange={(e) => setName(e.target.value)} //Manejador de eventos que se ejecuta cuando el usuario escribe algo en el campo de texto.
                                    placeholder="Name" //Se ejecuta la función que modifica el estado de la variable por lo que escribimos en el campo de texto.
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Email</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Phone</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Address</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="col col-buttons">
                                <button className="btn btn-primary" onClick={handleSaveEdit}> 
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;

