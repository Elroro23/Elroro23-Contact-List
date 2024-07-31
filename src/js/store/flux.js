//getState: Función para configurar el estado y las acciones, se le pasan como parámetros las siguientes funciones:
//getStore: Retorna el estado actual de "store" (contactos, slug, etc.)
//getActions: Retorna un objeto con todas laas funciones definidas en "actions".
//setStore: Modifica el estado "store" con las nuevos valores.
const getState = ({ getStore, getActions, setStore }) => {
	const urlApi = "https://playground.4geeks.com/contact/";
	const slug = "Elroro23"; // Asegúrate de reemplazar esto con tu slug específico

	return {
		store: { //Define el estado inicial de la aplicación.
			slug: slug, //Identificador de la agenda(Elroro23).
			contacts: [] //Array vacío que almacenará los contactos una vez que se obtengan de la API.
		},
		actions: { //Funciones que interactúan con el estado y las API.

			//Función para crear la agenda.		
			createAgenda: () => {
				return fetch(urlApi + "agendas/" + slug, { //Específicamos la URL de la API.
					method: "POST", //Método para agregar información.
					headers: {
						"Content-Type": "application/json" //Contenido a envíar(json).
					},
					body: JSON.stringify({ //Específicamos la información a envíar al servidor.
						slug: slug, //Identificador.
						contacts: [] //Array vacío de contactos.
					})
				})
					.then(response => { //Recibimos una respuesta.
						if (response.ok) { //Si la respuesta es OK mostramos el siguiente mensaje:
							console.log("Agenda creada exitosamente");
						} else { //Si el status de la respuesta NO es Ok mostramos el siguiente error(detiene la ejecución):
							throw new Error("Error creando la agenda");
						}
					}) //Capturamos el error y lo mostramos en consola.
					.catch(error => console.error("Error creando la agenda:", error));
			},
			//Función para obtener los contactos de la agenda.
			fetchContacts: () => {
				fetch(urlApi + "agendas/" + slug + "/contacts") //Solicitamos información a la API.
					.then(response => { //Recibimos una respuesta.
						if (!response.ok) { //Si la respuesta no es OK la agenda no existe(probablemente).
							if (response.status === 404) { //Confirmamos que no existe.
								//Llamamos a CREATEAGENDA una vez resuelta la promesa intentamos obtener la lista de contactos llamando a FETCHCONTACTS mediante GETACTIONS.
								return getActions().createAgenda().then(() => getActions().fetchContacts());
							} else { //Si el error es otro mostramos el siguiente mensaje deteniendo la ejecución del código.
								throw new Error('Network response was not ok');
							}
						} //Retornamos la respuesta.json
						return response.json();
					})
					//data es un objeto obtenido de la respuesta.json. actualizamos la propiedad contacts con el nuevo array de contactos(estamos verificando si se encontraron contactos).
					.then(data => setStore({ contacts: data.contacts }))
					.catch(error => console.error("Error fetching contacts:", error)); //Si hay un error lo capturamos y mostramos.
			},
			//Función para añadir contactos. 
			addContact: (contact) => {
				return fetch(urlApi + `agendas/${slug}/contacts`, { //Solicitamos añadir información al servidor.
					method: "POST", //Método para añadir información.
					headers: {
						"Content-Type": "application/json" //Tipo de contenido: json.
					},
					body: JSON.stringify({ //Información a añadir al servidor:
						name: contact.name, //Esta es la información que tiene que específicar el usuario.
						email: contact.email,
						phone: contact.phone,
						address: contact.address
					})
				})
					.then(response => { //Recibimos una respuesta, sino es OK mostramos el siguiente mensaje y detenemos la ejecución.
						if (!response.ok) throw new Error('Network response was not ok');
						return response.json(); //Retornamos la respuesta .json
					})
					.then(newContact => { //Resolvemos la promesa con el nuevo objeto NEWCONTACT
						const store = getStore(); //Obtenemos el estado actual con GETSTORE que incluye el array de contactos.
						//Creamos un nuevo array de contactos que contiene los existentes más el nuevo.
						const updatedContacts = [...store.contacts, newContact];
						setStore({ contacts: updatedContacts }); //Actualizamos el array de contactos con el nuevo.
					})
					.catch(error => console.error("Error adding contact:", error)); //Si hay un error lo captamos y mostramos en consola.
			},
			//Función para editar los contactos.
			editContact: (updatedContact) => { //updatedContact es un objeto que creamos que contiene la información del contacto a actualizar.
				fetch(urlApi + `agendas/${slug}/contacts/${updatedContact.id}`, { //Solicitamos actualizar información.
					method: "PUT", //Método para actualizar información.
					headers: {
						"Content-Type": "application/json" //Tipo de contenido: .json
					},
					body: JSON.stringify({ //Información a actualizar.
						name: updatedContact.name, //Objeto creado(updatedContact) con los datos a añadir.
						email: updatedContact.email,
						phone: updatedContact.phone,
						address: updatedContact.address
					})
				})
					.then(response => { //Recibimos una respuesta.
						//Si NO  es ok mostramos el siguiente mensaje y detenemos la ejecución del código.
						if (!response.ok) throw new Error('Network response was not ok');
						return response.json(); //Retornamos la respuesat .json
					})
					.then(modifiedContact => { //Objeto que devuelve el servidor luego de la solicitud PUT.
						const store = getStore(); //Obtenemos el estado actual con GETSTORE que incluye el array de contactos antes de modificarlos.
//Creamos un nuevo array basado en el array de contactos actual del estado STORE.CONTACTS.
						const updatedContacts = store.contacts.map(contact =>
//Si el ID del contacto coincide con el ID del contacto modificado remplaza el contacto por el modificado sino mantiene el contacto sin modificar.
							contact.id === modifiedContact.id ? modifiedContact : contact
						);
						setStore({ contacts: updatedContacts }); //Actualiza el array de contactos con el modificado.
					})
					.catch(error => console.error("Error editing contact:", error)); //Si hay error lo captura y lo muestra en consola.
			},
			//Función para eliminar contacto mediante su id.
			deleteContact: (id) => { 
				fetch(urlApi + `agendas/${slug}/contacts/${id}`, { //Solicitamos eliminar información a la API.
					method: "DELETE" //Método para eliminar información
				})
					.then(response => { //Recibimos una respuesta. Si no es OK mostramos el siguiente mensaje y detenemos la ejecución.
						if (!response.ok) throw new Error('Network response was not ok');
						const store = getStore(); //Obtenemos el estado actual que incluye los contactos antes de eliminar uno.
//Creamos un nuevo array excluyendo el ID del contacto eliminado.						
						const updatedContacts = store.contacts.filter(contact => contact.id !== id);
						setStore({ contacts: updatedContacts }); //Actualizamos el array de contactos sin el eliminado.
					})
					.catch(error => console.error("Error deleting contact:", error)); //Si hay un error lo captamos y mostramos en consola.
			}
		}
	};
};

export default getState; //Exportamos.
