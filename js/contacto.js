document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");
    const mensajeExito = document.getElementById("mensajeExito");
    const mensajeError = document.getElementById("mensajeError");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recargar la página

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Expresión regular simple para validar email con dominios permitidos
        const emailRegex = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|duocuc\.cl|gmail\.com)$/i;

        if (nombre === "" || mensaje === "") {
            mensajeExito.style.display = "none";
            mensajeError.style.display = "block";
            mensajeError.textContent = "Por favor completa todos los campos.";
        } else if (!emailRegex.test(email)) {
            mensajeExito.style.display = "none";
            mensajeError.style.display = "block";
            mensajeError.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
        } else {
            mensajeError.style.display = "none";
            mensajeExito.style.display = "block";

            // Aquí podrías enviar los datos con fetch() a un backend si lo deseas
            form.reset();
        }
    });
});
