import { TABLES_CONFIG } from "../config/tables.js";

const SPANISH_LANGUAGE = {
    "decimal": ",",
    "emptyTable": "No hay datos disponibles",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "infoEmpty": "Mostrando 0 a 0 de 0 registros",
    "infoFiltered": "(filtrado de _MAX_ registros totales)",
    "lengthMenu": "Mostrar _MENU_ registros",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "zeroRecords": "No se encontraron resultados"
};

export function initDataTableByKey(tableId, tableKey) {
    const config = TABLES_CONFIG[tableKey];

    if (!config) {
        console.error('No existe configuración para la tabla: ', tableKey);
        return null;
    }

    const $table = $(tableId);
    if ($table.length === 0) {
        console.error('No existe la tabla en el DOM: ', tableId);
        return null;
    }

    // Si ya estaba inicializada (por recargas parciales), reiniciarla
    if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().destroy();
    }

    // Insertar headers desde TABLES_CONFIG (mantiene las vistas más limpias)
    if (config.headers) {
        let $thead = $table.find('thead');
        if ($thead.length === 0) {
            $thead = $('<thead></thead>');
            $table.prepend($thead);
        }

        $thead.addClass('bg-light');

        let $tr = $thead.find('tr').first();
        if ($tr.length === 0) {
            $tr = $('<tr></tr>');
            $thead.append($tr);
        }

        $tr.html(config.headers);
    }

    return $table.DataTable({
        processing: true,
        serverSide: false,
        ajax: {
            url: `/api/${tableKey}`,
            dataSrc: function(json) {
                return json.data || [];
            }
        },
        columns: config.columns,
        language: SPANISH_LANGUAGE
    });
}
