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
        document.body.style.color = "#0369a1"; // Texto azul oscuro
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