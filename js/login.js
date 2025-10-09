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

    // Validaciones básicas login
    const emailOk = (e) => /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(e);
    const passOk = (p) => p && p.length >= 4 && p.length <= 10;

    const formLogin = document.getElementById("formLogin");
    const msg = document.getElementById("msgLogin");

    formLogin.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const pass = document.getElementById("loginPass").value;

        document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
        msg.textContent = "";

        let valido = true;

        if (!emailOk(email)) {
            document.getElementById("errLoginEmail").textContent = "Correo inválido.";
            valido = false;
        }
        if (!passOk(pass)) {
            document.getElementById("errLoginPass").textContent = "Contraseña debe tener 4-10 caracteres.";
            valido = false;
        }

        if (valido) {
            msg.style.color = "green";
            msg.textContent = "Ingreso exitoso.";
            formLogin.reset();
        } else {
            msg.style.color = "#b00020";
            msg.textContent = "Corrija los errores antes de continuar.";
        }
    });
});
