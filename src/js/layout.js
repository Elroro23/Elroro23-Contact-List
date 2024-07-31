import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import NewContact from "./component/NewContact";
import { Home } from "./views/home";
import injectContext from "./store/appContext";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (  //Definimos las rutas de cada componente
        <div> 
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/new-contact" element={<NewContact />} />
                        <Route path="*" element={<h1>Not found!</h1>} /> 
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
/*
Podría crear un nuevo componente DETAILSCONTACT para mostrar los detalles de cada contacto por su ID y específicarlo en la ruta:
<Route path="/DetailsContact/:theid" element={<DetailsContact />} /> 
En el componente DETAILSCONTACT estaría el código para obtener los detalles del contacto.
En el componente CONTACTS la lógica que me redirige a DETAILSCONTACT. 
Esto mejora la experiencia de usuario.*/