# Guía Técnica de Referencia: SWAGGER & FORMS ENGINE

Esta guía detalla la implementación y el funcionamiento de dos pilares clave en **Academia OS**:
1. **Swagger UI**: La documentación interactiva y sandbox de pruebas para todas las APIs de la escuela.
2. **Forms Engine**: La arquitectura basada en configuraciones dinámicas (`FORMS_CONFIG`) para generar, validar y enviar formularios de manera automática.

---

## 1. Documentación de APIs con SWAGGER

Para facilitar el desarrollo, integración y pruebas de la aplicación, hemos integrado **Swagger UI** utilizando la especificación **OpenAPI 3.0.0**.

### ¿Cómo acceder a la documentación interactiva?
1. Asegúrate de tener el servidor corriendo (`node index.js`).
2. Abre tu navegador e ingresa a: **`http://localhost:3000/api-docs`**

### ¿Qué puedes hacer en la consola de Swagger?
* **Visualizar Rutas**: Inspeccionar todas las URLs de la API categorizadas por módulos (Alumnos, Profesores, Grupos, Horarios, Entidades).
* **Ver Esquemas de Datos**: Conocer con precisión los nombres de campos, tipos (integer, string, date, etc.), formatos y cuáles son obligatorios.
* **Probar Endpoints en Tiempo Real**: Puedes hacer clic en **"Try it out"** (Probar) en cualquier endpoint (por ejemplo, `GET /api/alumnos`), introducir parámetros de prueba y hacer clic en **"Execute"** para realizar la petición HTTP directamente a tu base de datos y ver la respuesta JSON en vivo.

### Mapeo de Rutas en `swagger.json`
El archivo `swagger.json` en la raíz define con precisión:
* **Entidades Federativas**: `/api/entidades` (CRUD Completo)
* **Alumnos**: `/api/alumnos` (CRUD Completo)
* **Profesores**: `/api/profesores` (CRUD Completo)
* **Grupos**: `/api/grupos` (CRUD Completo)
* **Horarios**: `/api/horarios` (CRUD Completo)

---

## 2. Arquitectura de Formularios Dinámicos (Forms Engine)

Para evitar duplicar código HTML al crear formularios para cada modelo (Alumnos, Profesores, etc.), la aplicación utiliza un **motor de formularios basado en configuración**.

### 2.1 El archivo de configuración: `js/config/forms.js`
El archivo [forms.js](file:///Users/giovanni/Documents/aplicaciones%20multiplataforma/ProyectoMultiplataforma/Escuelita/js/config/forms.js) exporta un objeto `FORMS_CONFIG`. Cada clave (por ejemplo, `alumnos`, `profesores`) define:
* `title`: Título para el formulario en modo creación.
* `titleEdit`: Título para el formulario en modo edición.
* `endpoint`: Endpoint del API para guardar (`POST` o `PUT`).
* `idField`: Llave primaria única del registro.
* `submitLabel`: Texto del botón de envío.
* `fields`: Un arreglo de campos a renderizar.

#### Ejemplo de un campo en la configuración:
```javascript
{
    name: "id_entidad",
    label: "Entidad Federativa",
    type: "select-remote",   // Tipo especial de campo
    required: true,
    source: "/api/entidades", // Endpoint para traer las opciones
    valueKey: "id_entidad",
    textKey: "nombre_entidad"
}
```

---

### 2.2 Motor de Renderizado en `layout-header.ejs`
Las funciones globales en el encabezado [layout-header.ejs](file:///Users/giovanni/Documents/aplicaciones%20multiplataforma/ProyectoMultiplataforma/Escuelita/public/partials/layout-header.ejs) toman esta configuración y construyen el HTML dinámicamente en el navegador.

#### 1. Construcción del Campo (`buildFieldHtml`):
Dependiendo del atributo `type` en la configuración de la columna, la función retorna el HTML adecuado:
* **`text` / `number` / `date` / `time` / `email`**: Genera un `<input>` HTML5 estándar con las validaciones básicas (como `required`).
* **`select`**: Genera una lista desplegable estática utilizando las opciones definidas en la propiedad `options`.
* **`select-remote`**: Genera un `<select>` que inicialmente muestra "Cargando..." y posteriormente hace un `fetch` automático al endpoint definido en `source` para rellenar las opciones dinámicamente (por ejemplo, cargar los estados desde `/api/entidades`).

#### 2. Apertura del Formulario (`openForm`):
Cuando haces clic en botones como "+ Nuevo Alumno", se invoca:
`openForm('alumnos')` (para creación) o `openForm('alumnos', recordData)` (para edición).
1. Importa dinámicamente `forms.js` para obtener la configuración.
2. Renderiza todos los campos en el contenedor `#formContainer`.
3. Invoca `loadRemoteSelects` para descargar la información de selects remotos.
4. Si está en **modo edición**, ejecuta `populateForm(recordData)` para rellenar automáticamente los campos con los valores del registro seleccionado.
5. Muestra el panel `#formPanel` retirando la clase `d-none`.

---

### 2.3 Procesamiento de Envío AJAX (`onSubmitDynamicForm`)
El envío del formulario es interceptado automáticamente para procesarlo como una solicitud asíncrona:
1. Convierte el formulario a un objeto de datos JSON mediante `FormData` y `Object.fromEntries`.
2. Reemplaza las cadenas vacías (`""`) en campos opcionales no seleccionados por `null`.
3. Determina el **Método HTTP** y el **Endpoint**:
   * **Modo Creación**: Petición **`POST`** a `${cfg.endpoint}`.
   * **Modo Edición**: Petición **`PUT`** a `${cfg.endpoint}/${recordId}`.
4. Realiza el `fetch` al servidor.
5. Si la respuesta es exitosa, muestra una alerta verde (`showMessage("success")`) y utiliza la API de DataTables para **recargar la tabla de forma asíncrona e instantánea** sin necesidad de refrescar todo el navegador:
   ```javascript
   const table = $('#' + currentModelKey + 'Table').DataTable();
   table.ajax.reload();
   ```

---

## 3. Guía paso a paso: ¿Cómo añadir un nuevo Formulario?

Si deseas agregar un nuevo módulo en el sistema (por ejemplo, **Materias**):

### Paso 1: Configurar el Formulario
Abre [forms.js](file:///Users/giovanni/Documents/aplicaciones%20multiplataforma/ProyectoMultiplataforma/Escuelita/js/config/forms.js) y añade la configuración al final del objeto:
```javascript
export const FORMS_CONFIG = {
    // ... configuraciones anteriores ...
    materias: {
        title: "Registrar Materia",
        titleEdit: "Editar Materia",
        endpoint: "/api/materias",
        idField: "id_materia",
        submitLabel: "Guardar Materia",
        fields: [
            { name: "nombre_materia", label: "Nombre de la Materia", type: "text", required: true },
            { name: "creditos", label: "Créditos", type: "number", required: true }
        ]
    }
};
```

### Paso 2: Crear el botón en tu vista HTML/EJS
En tu vista HTML5, simplemente llama a la función global pasándole la clave configurada:
```html
<button onclick="openForm('materias')" class="btn btn-success">+ Nueva Materia</button>
```

### Paso 3: Inicializar la Tabla de DataTables
En tu archivo de vista EJS, inicializa la tabla correspondiente:
```html
<table class="table" id="materiasTable">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script type="module">
import { initDataTableByKey } from "/assets/js/features/tableLoader.js";
$(document).ready(function() {
    initDataTableByKey('#materiasTable', 'materias');
});
</script>
```

¡Y listo! El Forms Engine se encargará automáticamente de generar el modal, rellenar los datos si es edición, enviar la petición asíncrona (`POST` o `PUT`) al backend y recargar los registros de la tabla.
