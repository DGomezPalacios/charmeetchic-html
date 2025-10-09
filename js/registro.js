document.addEventListener("DOMContentLoaded", () => {
    // Mostrar y Ocultar Contraseña
    document.querySelectorAll(".toggle-pass").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-target");
            const input = document.getElementById(id);
            const showing = input.type === "text";
            input.type = showing ? "password" : "text";
            btn.setAttribute("aria-pressed", String(!showing));
            btn.title = showing ? "Mostrar contraseña" : "Ocultar contraseña";
            btn.textContent = "👁";
        });
    });
    // Auxiliares de validación
    const emailOk = (e) => /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(e);
    const textoOk = (t) => t && t.trim().length >= 2;
    const rutOk = (rut) => /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]$/.test(rut);
    const passOk = (p) => p && p.length >= 4 && p.length <= 10;
    const telOk = (t) => /^\+?[\d\s]{8,15}$/.test(t);
    const edadOk = (fechaStr, minEdad) => {
        if (!fechaStr) return false;
        const fechaNac = new Date(fechaStr);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
        return edad >= minEdad;
    };

    // Registro
    const formReg = document.getElementById("formRegistro");
    const msg = document.getElementById("msgRegistro");

    formReg.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const nombre = document.getElementById("regNombres").value.trim();
        const apPaterno = document.getElementById("regApellidoPaterno").value.trim();
        const apMaterno = document.getElementById("regApellidoMaterno").value.trim();
        const rut = document.getElementById("regRut").value.trim();
        const nacimiento = document.getElementById("regNacimiento").value.trim();
        const direccion = document.getElementById("regDireccion").value.trim();
        const comuna = document.getElementById("regComuna").value.trim();
        const provincia = document.getElementById("regProvincia").value.trim();
        const region = document.getElementById("regRegion").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const telefono = document.getElementById("regTelefono").value.trim();
        const pass = document.getElementById("regPass").value;

        document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
        msg.textContent = "";

        let valido = true;

        if (!textoOk(nombre)) { document.getElementById("errRegNombres").textContent = "Ingrese su nombre."; valido = false; }
        if (!textoOk(apPaterno)) { document.getElementById("errRegApellidoPaterno").textContent = "Ingrese su apellido paterno."; valido = false; }
        if (!textoOk(apMaterno)) { document.getElementById("errRegApellidoMaterno").textContent = "Ingrese su apellido materno."; valido = false; }
        if (!rutOk(rut)) { document.getElementById("errRegRut").textContent = "RUT inválido. Ejemplo: 12.345.678-9"; valido = false; }
        if (!edadOk(nacimiento, 18)) { document.getElementById("errRegNacimiento").textContent = "Debe ser mayor de 18 años para registrarse."; valido = false; }
        if (!textoOk(direccion)) { document.getElementById("errRegDireccion").textContent = "Ingrese una dirección válida."; valido = false; }
        if (!textoOk(comuna)) { document.getElementById("errRegComuna").textContent = "Ingrese su comuna."; valido = false; }
        if (!textoOk(provincia)) { document.getElementById("errRegProvincia").textContent = "Ingrese su provincia."; valido = false; }
        if (!textoOk(region)) { document.getElementById("errRegRegion").textContent = "Ingrese su región."; valido = false; }
        if (!emailOk(email)) { document.getElementById("errRegEmail").textContent = "Correo inválido (solo se permiten @duoc.cl, @profesor.duoc.cl, @gmail.com)."; valido = false; }
        if (!telOk(telefono)) { document.getElementById("errRegTelefono").textContent = "Teléfono inválido."; valido = false; }
        if (!passOk(pass)) { document.getElementById("errRegPass").textContent = "Contraseña debe tener 4-10 caracteres."; valido = false; }

        if (valido) {
            msg.style.color = "green";
            msg.textContent = "Registro exitoso.";
            formReg.reset();
        } else {
            msg.style.color = "#b00020";
            msg.textContent = "Corrija los errores antes de continuar.";
        }
    });
});
