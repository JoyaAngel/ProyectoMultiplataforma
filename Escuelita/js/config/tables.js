export const TABLES_CONFIG = {
    alumnos: {
        headers: `
            <th>Número de Cuenta</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>CURP</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Entidad Federativa</th>
        `,
        columns: [
            { data: 'numero_cuenta' },
            { data: 'nombre' },
            { data: 'apellido_paterno' },
            { data: 'apellido_materno' },
            { data: 'curp' },
            { data: 'telefono' },
            { data: 'sexo' },
            { data: 'correo_electronico' },
            { data: 'fecha_nacimiento' },
            { data: 'entidad_federativa.nombre_entidad' }
        ]
    },
    entidades: {
        headers: `
            <th>ID</th>
            <th>Nombre de Entidad</th>
            <th>Abreviatura</th>
        `,
        columns: [
            { data: 'id_entidad' },
            { data: 'nombre_entidad' },
            { data: 'abreviatura' }
        ]
    },
    profesores: {
        headers: `
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>CURP</th>
            <th>RFC</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Sueldo</th>
        `,
        columns: [
            { data: 'id_profesor' },
            { data: 'nombre' },
            { data: 'apellido_paterno' },
            { data: 'apellido_materno' },
            { data: 'curp' },
            { data: 'rfc' },
            { data: 'telefono' },
            { data: 'sexo' },
            { data: 'correo_electronico' },
            { data: 'fecha_nacimiento' },
            { data: 'sueldo' }
        ]
    }
};