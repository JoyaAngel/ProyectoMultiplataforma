import { FORMS_CONFIG } from "../config/forms.js";
import { loadTableByKey } from "./tableLoader.js";

let currentModelKey = null;

function showMessage(type, text) {
    const box = $("#formMessage");
    box.removeClass("d-none alert-success alert-danger")
    .addClass(type === "success" ? "alert-success" : "alert-danger")
    .text(text);
}

function hideMessage() {
    $("#formMessage").addClass("d-none").text("");
}

function buildFieldHtml(field) {
    const requiredAttr = field.required ? "required" : "";

    if (field.type === "select") {
        const options = field.options
            .map(opt => '<option value="' + opt.value + '">' + opt.text + "</option>")
            .join("");

        return '' +
            '<div class="col-md-6">' +
                '<label class="form-label" for="' + field.name + '">' + field.label + "</label>" +
                '<select class="form-select" id="' + field.name + '" name="' + field.name + '" ' + requiredAttr + ">" +
                    options +
                "</select>" +
            "</div>";
    }

    if (field.type === "select-remote") {
        return '' +
            '<div class="col-md-6">' +
                '<label class="form-label" for="' + field.name + '">' + field.label + "</label>" +
                '<select class="form-select" id="' + field.name + '" name="' + field.name + '" ' + requiredAttr + ">" +
                    '<option value="">Cargando...</option>' +
                "</select>" +
            "</div>";
    }

    return '' +
        '<div class="col-md-6">' +
            '<label class="form-label" for="' + field.name + '">' + field.label + "</label>" +
            '<input class="form-control" id="' + field.name + '" name="' + field.name + '" type="' + field.type + '" ' + requiredAttr + ">" +
        "</div>";
}

async function loadRemoteSelects(fields) {
    for (const field of fields) {
        if (field.type !== "select-remote") continue;

        const res = await fetch(field.source);
        const payload = await res.json();
        const items = payload.data || [];
        const select = $("#" + field.name);

        select.empty();
        select.append('<option value="">Seleccione</option>');

        items.forEach(item => {
            const value = item[field.valueKey];
            const text = item[field.textKey];
            select.append('<option value="' + value + '">' + text + "</option>");
        });
    }
}

export async function openForm(modelKey) {
    const cfg = FORMS_CONFIG[modelKey];
    if (!cfg) {
        console.error("No existe FORMS_CONFIG para:", modelKey);
        return;
    }

    currentModelKey = modelKey;
    hideMessage();

    const fieldsHtml = cfg.fields.map(buildFieldHtml).join("");
    const formHtml = '' +
        '<form id="dynamicForm">' +
            '<div class="row g-3">' + fieldsHtml + "</div>" +
            '<div class="mt-3">' +
                '<button type="submit" class="btn btn-success">' + cfg.submitLabel + "</button>" +
            "</div>" +
        "</form>";

    $("#formTitle").text(cfg.title);
    $("#formContainer").html(formHtml);
    $("#formPanel").removeClass("d-none");

    await loadRemoteSelects(cfg.fields);

    $("#dynamicForm").on("submit", onSubmitDynamicForm);
}

export function closeForm() {
    $("#formPanel").addClass("d-none");
    $("#formContainer").empty();
    hideMessage();
    currentModelKey = null;
}

async function onSubmitDynamicForm(event) {
    event.preventDefault();

    const cfg = FORMS_CONFIG[currentModelKey];
    if (!cfg) return;

    hideMessage();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
        const res = await fetch(cfg.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const payload = await res.json();

        if (!res.ok) {
            showMessage("error", payload.error || "Error al guardar");
            return;
        }

        showMessage("success", payload.message || "Guardado correctamente");
        form.reset();
        loadTableByKey(currentModelKey);
    } catch (error) {
        showMessage("error", "Error de red o servidor");
    }
}