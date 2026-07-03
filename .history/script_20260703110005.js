// === ACCESIBILIDAD (ZOOM) ===
let tamaño = 16;

document.getElementById("aumentar").onclick = function () {
    tamaño += 2;
    document.body.style.fontSize = tamaño + "px";
};

document.getElementById("disminuir").onclick = function () {
    if (tamaño > 12) {
        tamaño -= 2;
        document.body.style.fontSize = tamaño + "px";
    }
};


// === CAMBIO DE TEMA (BLANCO / AZUL CELESTE) ===
const botonTema = document.getElementById("tema");
let temaAzul = false;

botonTema.addEventListener("click", function () {
    const card = document.getElementById("mainCard");
    const header = document.getElementById("cardHeader");
    const listItems = document.querySelectorAll(".list-group-item");

    if (temaAzul) {
        document.body.style.backgroundColor = "#f8f9fa";
        document.body.style.color = "#212529";
        card.style.backgroundColor = "#ffffff";
        header.className = "card-header bg-primary text-white";
        
        listItems.forEach(item => {
            item.style.backgroundColor = "#ffffff";
            item.style.color = "#212529";
        });
    } else {
        document.body.style.backgroundColor = "#e0f2fe"; // Celeste
        document.body.style.color = "#0595e2"; // Texto azul oscuro
        card.style.backgroundColor = "#f0f9ff";
        header.className = "card-header text-white";
        header.style.backgroundColor = "#0284c7";
        
        listItems.forEach(item => {
            item.style.backgroundColor = "#f0f9ff";
            item.style.color = "#0369a1";
        });
    }
    temaAzul = !temaAzul;
});

// === CONTROL DEL CHECKLIST (REALIZADO / PENDIENTE) ===
const checkboxes = document.querySelectorAll(".item-check");

function actualizarEstado(checkbox) {
    const contenedorFila = checkbox.closest("li");
    
    // Eliminar etiqueta vieja si existe
    let badgeExistente = contenedorFila.querySelector(".badge");
    if (badgeExistente) {
        badgeExistente.remove();
    }

    // Crear la nueva etiqueta dinámicamente
    const badge = document.createElement("span");

    if (checkbox.checked) {
        badge.textContent = "Realizado";
        badge.className = "badge bg-success"; // Verde Bootstrap
    } else {
        badge.textContent = "Pendiente";
        badge.className = "badge bg-danger"; // Rojo Bootstrap
    }

    // Insertar al final de la fila
    contenedorFila.appendChild(badge);
}

// Inicializar y escuchar clics
checkboxes.forEach(checkbox => {
    actualizarEstado(checkbox);

    checkbox.addEventListener("change", function () {
        actualizarEstado(checkbox);
    });
});

const btnAgregar = document.getElementById("btnAgregar");
const input = document.getElementById("nuevaTarea");
const lista = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", agregarTarea);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        agregarTarea();
    }
});

function agregarTarea(){

    const texto = input.value.trim();

    if(texto === ""){
        alert("Ingrese una tarea");
        return;
    }

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        <div>
            <input class="form-check-input me-2" type="checkbox">
            ${texto}
        </div>

        <span class="badge bg-danger">Pendiente</span>
    `;

    lista.appendChild(li);

    input.value = "";
    input.focus();
}

document.getElementById("btnReporte").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Reporte de tareas", 20, 20);

    pdf.setFontSize(12);
    pdf.text("Total: " + total, 20, 40);
    pdf.text("Realizadas: " + realizadas, 20, 50);
    pdf.text("Pendientes: " + pendientes, 20, 60);
    pdf.text("Avance: " + porcentaje + "%", 20, 70);

    pdf.save("reporte.pdf");

});

const datos = [
    ["Tarea","Estado"],
    ["Módulo 1","Realizado"],
    ["Módulo 2","Pendiente"]
];