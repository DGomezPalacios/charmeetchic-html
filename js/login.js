document.addEventListener("DOMContentLoaded", () => {
    // -------- Toggle Mostrar/Ocultar contraseña --------
    document.querySelectorAll(".toggle-pass").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-target");
            const input = document.getElementById(id);
            const showing = input.type === "text";
            input.type = showing ? "password" : "text";
            btn.setAttribute("aria-pressed", String(!showing));
            btn.title = showing ? "Mostrar contraseña" : "Ocultar contraseña";
            btn.textContent = showing ? "👁" : "🙈";
        });
    });

    // -------- Helpers --------
    const emailOk = (e) => {
        const regex = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        return regex.test(e);
    };
    const userOk = (u) => u && u.trim().length >= 3;
    const passOk = (p) => p && p.length >= 4 && p.length <= 10;


    // -------- Recordar Usuario --------
    const remembered = localStorage.getItem("rememberUser");
    const rememberCb = document.getElementById("remember");
    const loginUser = document.getElementById("loginUser");
    if (remembered) {
        loginUser.value = remembered;
        rememberCb.checked = true;
    }
    //  solo si hay valor recordado
    if (remembered) {
        loginUser.value = remembered;
        rememberCb.checked = true;
    } else {
        loginUser.value = ""; // limpia usuario si no hay remember
    }
    loginPass.value = ""; // nunca persistir contraseña

    // Manejar cambios en la casilla "Recuérdame" en el momento
    rememberCb.addEventListener("change", () => {
        const current = loginUser.value.trim();
        if (rememberCb.checked) {
            // guarda el usuario actual (si hay)
            if (current) localStorage.setItem("rememberUser", current);
        } else {
            // olvida y limpia el campo
            localStorage.removeItem("rememberUser");
            loginUser.value = "";
        }
    });

    window.addEventListener("pageshow", (e) => {
        if (!localStorage.getItem("rememberUser")) {
            loginUser.value = "";
        }
        loginPass.value = "";
    });

    // -------- LOGIN --------
    const formLogin = document.getElementById("formLogin");
    formLogin.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const userOrEmail = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPass").value;
        const msg = document.getElementById("msgLogin");

        const validUser = userOrEmail.includes("@") ? emailOk(userOrEmail) : userOk(userOrEmail);

        if (!validUser || !passOk(pass)) {
            msg.style.color = "#b00";
            msg.textContent = "Usuario/correo o contraseña incorrectos.";
            return;
        }

        // Simulación de acceso correcto
        msg.style.color = "green";
        msg.textContent = "¡Acceso correcto!";

        // Guardar "recordarme"
        if (rememberCb.checked) {
            localStorage.setItem("rememberUser", userOrEmail);
        } else {
            localStorage.removeItem("rememberUser");
        }

        formLogin.reset();
    });

});