document.addEventListener("DOMContentLoaded", () => {
    // -------- Helpers --------
    const emailOk = (e) => {
        const regex = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        return regex.test(e);
    };
    const userOk = (u) => u && u.trim().length >= 3;
    const passOk = (p) => p && p.length >= 4 && p.length <= 10;

    // -------- REGISTRO --------
    const formReg = document.getElementById("formRegistro");
    const strengthMsg = document.getElementById("strengthMsg");

    formReg.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const user = document.getElementById("regUser").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const pass = document.getElementById("regPass").value;

        const errUser = document.getElementById("errRegUser");
        const errEmail = document.getElementById("errRegEmail");
        const errPass = document.getElementById("errRegPass");
        const msg = document.getElementById("msgRegistro");

        // Reset mensajes
        errUser.textContent = "";
        errEmail.textContent = "";
        errPass.textContent = "";
        msg.textContent = "";

        let valido = true;

        // Validar usuario
        if (!userOk(user)) {
            errUser.textContent = "El usuario debe tener al menos 3 caracteres.";
            valido = false;
        }

        // Validar correo
        if (!emailOk(email)) {
            errEmail.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            valido = false;
        }

        // Validar contraseña
        if (!passOk(pass)) {
            errPass.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            valido = false;
        }

        if (!valido) return;

        // Simulación de registro correcto
        msg.style.color = "green";
        msg.textContent = "¡Cuenta creada! Ahora puedes iniciar sesión.";
        formReg.reset();
        strengthMsg.textContent = "";
    });
});
