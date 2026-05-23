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
            <th>Acciones</th>
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
            { data: 'entidad_federativa.nombre_entidad' },
            {
                data: 'numero_cuenta',
                render: (data, type, row) => `
                    <button class="btn btn-sm btn-primary" onclick="openForm('alumnos', ${JSON.stringify(row).replace(/"/g, '&quot;')})">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('alumnos', '${row.numero_cuenta}', 'Alumno ${row.nombre}')">
                        🗑️ Eliminar
                    </button>
                `
            }
        ]
    },
    entidades: {
        headers: `
            <th>ID</th>
            <th>Nombre de Entidad</th>
            <th>Abreviatura</th>
            <th>Acciones</th>
        `,
        columns: [
            { data: 'id_entidad' },
            { data: 'nombre_entidad' },
            { data: 'abreviatura' },
            {
                data: 'id_entidad',
                render: (data, type, row) => `
                    <button class="btn btn-sm btn-primary" onclick="openForm('entidades', ${JSON.stringify(row).replace(/"/g, '&quot;')})">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('entidades', '${row.id_entidad}', 'Entidad ${row.nombre_entidad}')">
                        🗑️ Eliminar
                    </button>
                `
            }
        ]
    },
    horarios: {

        headers: `
            <th>ID</th>
            <th>Día</th>
            <th>Hora de inicio</th>
            <th>Hora de término</th>
            <th>Acciones</th>
        `,

        columns: [

            { data: 'id_horario' },
            { data: 'dia'},
            { data: 'hora_inicio'},
            { data: 'hora_fin'},
            {
                data: 'id_horario',
                render: (data, type, row) => `
                    <button class="btn btn-sm btn-primary" onclick="openForm('horarios', ${JSON.stringify(row).replace(/"/g, '&quot;')})">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('horarios', '${row.id_horario}', 'Horario ${row.dia}')">
                        🗑️ Eliminar
                    </button>
                `
            }

        ]

    },
    grupos: {

        headers: `
            <th>ID</th>
            <th>Nombre del grupo</th>
            <th>Acciones</th>
        `,

        columns: [

            { data: 'id_grupo' },
            { data: 'nombre_grupo' },
            {
                data: 'id_grupo',
                render: (data, type, row) => `
                    <button class="btn btn-sm btn-primary" onclick="openForm('grupos', ${JSON.stringify(row).replace(/"/g, '&quot;')})">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('grupos', '${row.id_grupo}', 'Grupo ${row.nombre_grupo}')">
                        🗑️ Eliminar
                    </button>
                `
            }

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
            <th>Acciones</th>
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
            { data: 'sueldo' },
            {
                data: 'id_profesor',
                render: (data, type, row) => `
                    <button class="btn btn-sm btn-primary" onclick="openForm('profesores', ${JSON.stringify(row).replace(/"/g, '&quot;')})">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('profesores', '${row.id_profesor}', 'Profesor ${row.nombre}')">
                        🗑️ Eliminar
                    </button>
                `
            }
        ]
    }
};