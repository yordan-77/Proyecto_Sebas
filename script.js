document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  startAutomatedSimulation();
});

// 1. EFECTO DE APARICIÓN AL HACER SCROLL (CORREGIDO)
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add("active");  // ✅ CORREGIDO
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

// 2. SISTEMA DE GALERÍA 
window.openLightbox = function(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const inner = document.getElementById("lightbox-inner");

  // Crear imagen
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Imagen ampliada";
  img.className = "lightbox-image";
  
  // Tamaño inicial para que entre en pantalla
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.width = "auto";
  img.style.height = "auto";
  img.style.cursor = "zoom-in";

  // Evento de zoom (toggle)
  img.onclick = (e) => {
    e.stopPropagation();
    img.classList.toggle("zoomed");
    if (img.classList.contains("zoomed")) {
      // Al hacer zoom, quitamos límites para que la imagen pueda crecer
      img.style.maxWidth = "none";
      img.style.maxHeight = "none";
      img.style.cursor = "zoom-out";
    } else {
      // Restaurar al salir del zoom
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.cursor = "zoom-in";
      // Opcional: devolver scroll al inicio del contenedor
      const content = document.querySelector(".lightbox-content");
      if (content) content.scrollTo(0, 0);
    }
  };

  // Limpiar y agregar imagen
  inner.innerHTML = "";
  inner.appendChild(img);

  // Bloquear scroll del body y mostrar lightbox con animación
  document.body.style.overflow = "hidden";
  lightbox.style.display = "flex";
  requestAnimationFrame(() => lightbox.classList.add("open"));
};

window.closeLightbox = function() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  
  lightbox.classList.remove("open");
  document.body.style.overflow = "";  // Restaurar scroll
  
  // Limpiar contenido después de la animación
  setTimeout(() => {
    lightbox.style.display = "none";
    const inner = document.getElementById("lightbox-inner");
    if (inner) inner.innerHTML = "";
  }, 300);
};

// 3. SIMULACIÓN DINÁMICA (sin cambios, funciona bien)
function startAutomatedSimulation() {
  const door = document.getElementById("sim-door");
  const sensor = document.getElementById("sim-sensor");
  const buzzer = document.getElementById("sim-buzzer");
  const chatBox = document.getElementById("chat-box");

  let step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        door.style.transform = "rotateY(0deg)";
        if (sensor) {
          sensor.style.backgroundColor = "#475569";
          sensor.innerText = "SENSOR IR";
        }
        if (buzzer) buzzer.style.color = "#475569";
        if (chatBox) chatBox.innerHTML = "";
        step = 1;
        break;

      case 1:
        if (door) door.style.transform = "rotateY(-75deg)";
        step = 2;
        break;

      case 2:
        if (sensor) {
          sensor.style.backgroundColor = "#ff3333";
          sensor.innerText = "¡DETECTADO!";
        }
        step = 3;
        break;

      case 3:
        if (buzzer) {
          buzzer.style.color = "#ff3333";
          buzzer.style.transform = "translateX(-50%) scale(1.2)";
        }
        step = 4;
        break;

      case 4:
        if (buzzer) buzzer.style.transform = "translateX(-50%) scale(1)";
        if (chatBox) {
          const msg = document.createElement("div");
          msg.className = "wa-msg";
          msg.innerHTML = `<strong>⚠️ ALERTA ALARMBOT</strong><br>Olvidaste retirar las llaves.<br>Por favor regresa y retíralas.`;
          chatBox.appendChild(msg);
        }
        step = 5;
        break;

      case 5:
        step = 0;
        break;
    }
  }, 2200);
}