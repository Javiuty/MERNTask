import React, { useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
} from "../../types";

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Diseño de Sitio web" },
    { id: 4, nombre: "MERN" },
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
  };

  // Dispath para ejecutar las acciones
  const [state, dispath] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispath({
      type: FORMULARIO_PROYECTO,
    });
  };

  // Obtener los proyectos
  const obtenerProyectos = () => {
    dispath({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  // Agregar nuevo Proyecto
  const agregarProyecto = (proyecto) => {
    proyecto.id = uuidv4();

    // Agregar el proyecto en el state
    dispath({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  // Valida el formulario por errores
  const mostrarError = () => {
    dispath({
      type: VALIDAR_FORMULARIO,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
