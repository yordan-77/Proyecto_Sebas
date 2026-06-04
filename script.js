/**
 * PROYECTO: ALARMBOT
 * SCRIPT DE INTERACCIÓN Y SIMULACIÓN EN VIVO
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  startAutomatedSimulation();
});

// 1. EFECTO DE APARICIÓN AL HACER SCROLL (FADE IN SUAVE)
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.add("active");
        // Alternativa compatible sin classList directo:
        element.className += " active";
        // Limpieza para evitar duplicar nombres de clase
        element.className = element.className.replace(
          / active active/g,
          " active",
        );
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Ejecución inicial
}

// 2. SISTEMA DE GALERÍA (LIGHTBOX INTERACTIVO)
function openLightbox(element) {
  const lightbox = document.getElementById("lightbox");
  const lightboxInner = document.getElementById("lightbox-inner");

  // Clonamos el contenido interno de la tarjeta pulsada (soporta imagen o placeholder)
  lightboxInner.innerHTML = element.innerHTML;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// 3. SIMULACIÓN DINÁMICA EN BUCLE (DASHBOARD VIRTUAL)
function startAutomatedSimulation() {
  const door = document.getElementById("sim-door");
  const key = document.getElementById("sim-key");
  const sensor = document.getElementById("sim-sensor");
  const buzzer = document.getElementById("sim-buzzer");
  const chatBox = document.getElementById("chat-box");

  let step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        // Paso 1: Todo normal / Reseteo
        door.style.transform = "rotateY(0deg)";
        sensor.style.backgroundColor = "#475569";
        sensor.style.color = "#fff";
        buzzer.style.color = "#475569";
        chatBox.innerHTML = ""; // Limpiar chat
        step = 1;
        break;

      case 1:
        // Paso 2: La puerta se abre
        door.style.transform = "rotateY(-75deg)";
        step = 2;
        break;

      case 2:
        // Paso 3 & 4: Sensor detecta y ESP procesa
        sensor.style.backgroundColor = "#ff3333";
        sensor.innerText = "¡DETECTADO!";
        step = 3;
        break;

      case 3:
        // Paso 5: Alerta acústica activa
        buzzer.style.color = "#ff3333";
        // Simulación visual de parpadeo acústico
        buzzer.style.transform = "translateX(-50%) scale(1.2)";
        step = 4;
        break;

      case 4:
        // Paso 6: Envío de mensaje automático por WhatsApp
        buzzer.style.transform = "translateX(-50%) scale(1)";

        const msg = document.createElement("div");
        msg.className = "wa-msg";
        msg.innerHTML = `<strong>⚠️ ALERTA ALARMBOT</strong><br>Olvidaste retirar las llaves.<br>Por favor regresa y retíralas.`;
        chatBox.appendChild(msg);

        step = 5;
        break;

      case 5:
        // Pausa en el estado final y reinicio al bucle
        step = 0;
        break;
    }
  }, 2200);
}
