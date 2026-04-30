export const FORMS_CONFIG = {
    alumnos: {
        title: "Registrar Alumno",
        endpoint: "/api/alumnos",
        submitLabel: "Guardar Alumno",
        fields: [
            { name: "numero_cuenta", label: "Número de Cuenta", type: "number", required: true },
            { name: "nombre", label: "Nombre", type: "text", required: true },
            { name: "apellido_paterno", label: "Apellido Paterno", type: "text", required: true },
            { name: "apellido_materno", label: "Apellido Materno", type: "text", required: true },
            { name: "curp", label: "CURP", type: "text", required: true },
            { name: "telefono", label: "Teléfono", type: "text", required: true },
            {
                name: "sexo",
                label: "Sexo",
                type: "select",
                required: true,
                options: [
                    { value: "", text: "Seleccione" },
                    { value: "M", text: "Masculino" },
                    { value: "F", text: "Femenino" },
                ]
            },
            { name: "correo_electronico", label: "Correo Electrónico", type: "email", required: true },
            { name: "fecha_nacimiento", label: "Fecha de Nacimiento", type: "date", required: true },
            {
                name: "id_entidad",
                label: "Entidad Federativa",
                type: "select-remote",
                required: true,
                source: "/api/entidades",
                valueKey: "id_entidad",
                textKey: "nombre_entidad"
            }
        ]
    },
    entidades: {
        title: "Registrar Entidad",
        endpoint: "/api/entidades",
        submitLabel: "Guardar Entidad",
        fields: [
            { name: "nombre_entidad", label: "Nombre", type: "text", required: true },
            { name: "abreviatura", label: "Abreviatura", type: "text", required: true }
        ]
    },
    horarios: {

        title: "Registrar Horario",
        endpoint: "/api/horarios",
        submitLabel: "Guardar Horario",
        fields: [
            {
                name: "dia",
                label: "Dia",
                type: "select",
                required: true,
                options: [

                    //Aquí los values vab sin tilde, en la base no tienen
                    {value: "", text: "Seleccione"},
                    {value: "Lunes", text: "Lunes"},
                    {value: "Martes", text: "Martes"},
                    {value: "Miercoles", text: "Miércoles"},
                    {value: "Jueves", text: "Jueves"},
                    {value: "Viernes", text: "Viernes"},
                    {value: "Sabado", text: "Sábado"},
                ]
            },
            {
                name: "hora_inicio",
                label: "Hora de inicio",
                //Ni perra idea, auxilio
            }
        ]

    },
    grupo: {

        title: "Registrar Grupo",
        endpoint: "/api/grupo",
        submitLabel: "Guardar Grupo",
        fields: [
            { name: "nombre_grupo", label: "Nombre del grupo", type: "text", required: true }
        ]

    },
    profesores: {
        title: "Registrar Profesor",
        endpoint: "/api/profesores",
        submitLabel: "Guardar Profesor",
        fields: [
            { name: "nombre", label: "Nombre", type: "text", required: true },
            { name: "apellido_paterno", label: "Apellido Paterno", type: "text", required: true },
            { name: "apellido_materno", label: "Apellido Materno", type: "text", required: true },
            { name: "curp", label: "CURP", type: "text", required: true },
            { name: "rfc", label: "RFC", type: "text", required: true },
            { name: "telefono", label: "Teléfono", type: "text", required: true },
            {
                name: "sexo",
                label: "Sexo",
                type: "select",
                required: true,
                options: [
                    { value: "", text: "Seleccione" },
                    { value: "M", text: "Masculino" },
                    { value: "F", text: "Femenino" },
                ]
            },
            { name: "correo_electronico", label: "Correo Electrónico", type: "email", required: true },
            { name: "fecha_nacimiento", label: "Fecha de Nacimiento", type: "date", required: true },
            { name: "sueldo", label: "Sueldo", type: "number", required: true }
        ]
    }
};