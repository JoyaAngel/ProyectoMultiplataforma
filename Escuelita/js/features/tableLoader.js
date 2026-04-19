import { renderTable } from "../core/tableManager.js";
import { TABLES_CONFIG } from "../config/tables.js";

export function loadTableByKey(key){
    const tableConfig = TABLES_CONFIG[key];

    if (!tableConfig){
        console.error('No existe configuración para la tabla: ', key);
        return;
    }

    renderTable(tableConfig.headers, tableConfig.endpoint, tableConfig.columns);
}