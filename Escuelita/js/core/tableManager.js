let table;

function resetTable(headers){
    if(table){
        table.destroy();
    }

    $('#mainTable').empty();

    $('#mainTable').append(
        '<thead class="table-dark"><tr>' + headers + '</tr></thead><tbody></tbody>'
    );
}

export function renderTable(headers, ajaxUrl, columns) {
    resetTable(headers);

    table = $('#mainTable').DataTable({
        ajax: ajaxUrl,
        columns: columns
    });
}