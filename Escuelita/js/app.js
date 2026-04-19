import { loadTableByKey } from "./features/tableLoader.js";
import { openForm, closeForm } from "./features/formLoader.js";

$(document).ready(function () {
    loadTableByKey("alumnos");

    $("#btnAlumnos").click(() => loadTableByKey("alumnos"));
    $("#btnEntidades").click(() => loadTableByKey("entidades"));
    $("#btnProfesores").click(() => loadTableByKey("profesores"));

    $("#btnRegisterAlumno").click(() => openForm("alumnos"));
    $("#btnRegisterEntidad").click(() => openForm("entidades"));
    $("#btnRegisterProfesor").click(() => openForm("profesores"));
    $("#btnCloseForm").click(closeForm);
});