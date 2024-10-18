const submenus = document.querySelectorAll('.prod-menu');
const productoBotones = document.querySelectorAll('#prod-boton');

function abrirProducto(idSubmenu, boton) {
    var submenuSeleccionado = document.getElementById(idSubmenu);

    submenus.forEach(submenu => {
        submenu.classList.remove('submenu-activado');
    });

    productoBotones.forEach(boton => {
        boton.classList.remove('boton-activado');
    });

    boton.classList.add('boton-activado');
    submenuSeleccionado.classList.add('submenu-activado');
}

function scrolearA(id) {
    var elemento = document.getElementById(id);
    console.log(elemento);
    if (window.location.pathname != "/" && window.location.pathname != "/index.html") {
        window.location.href = 'index.html?scrollTo=contacto';
    } else {
        window.scrollTo({
            top: elemento.offsetTop - 200,
            behavior: "smooth"
        });
    }
}

function scrolearAProducto(producto) {
    window.location.href = 'productos.html?scrollTo=' + producto;
}

window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const scrollToElementId = params.get('scrollTo');

    if (scrollToElementId) {
        setTimeout(() => {
            const elemento = document.getElementById(scrollToElementId);
            window.scrollTo({
                top: elemento.offsetTop - 200,
                behavior: "smooth"
            });
        }, 100);
    }
});

const menu = document.querySelector('.navbar-content');

function changeBars(x) {
    x.classList.toggle('bar-active');
    menu.classList.toggle('display-menu');
}

/* --------------------- Corrusel de Clientes ---------------------- */
window.onload = function () {

    if (window.innerWidth > 768) {


        const track = document.querySelector('.carousel-track');
        const leftButton = document.getElementById('leftBtn');
        const rightButton = document.getElementById('rightBtn');

        // Clonamos los primeros y últimos 5 elementos
        const firstClones = [];
        const lastClones = [];
        const items = document.querySelectorAll('.carousel-item');
        const visibleSlides = 5;

        for (let i = 0; i < visibleSlides; i++) {
            const firstClone = items[i].cloneNode(true);
            const lastClone = items[items.length - 1 - i].cloneNode(true);
            firstClones.push(firstClone);
            lastClones.push(lastClone);
        }

        // Añadir clones al principio y al final del track
        firstClones.forEach(clone => track.appendChild(clone));
        lastClones.forEach(clone => track.insertBefore(clone, track.firstChild));

        let currentSlide = visibleSlides; // Inicial en la posición original
        const totalSlides = items.length + firstClones.length + lastClones.length;

        const slideWidth = document.querySelector('.carousel-item').offsetWidth;

        // Posicionamos el track en la posición inicial (después de los clones iniciales)
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        // Mover a la derecha
        rightButton.addEventListener('click', () => {
            currentSlide++;
            moveCarousel();
            if (currentSlide === totalSlides - visibleSlides) {
                setTimeout(() => {
                    track.style.transition = 'none'; // Desactiva la transición temporalmente
                    currentSlide = visibleSlides; // Volvemos al principio (sin que el usuario lo note)
                    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                }, 500); // El tiempo debe coincidir con el de la animación CSS
            }
        });

        // Mover a la izquierda
        leftButton.addEventListener('click', () => {
            currentSlide--;
            moveCarousel();
            if (currentSlide === 0) {
                setTimeout(() => {
                    track.style.transition = 'none'; // Desactiva la transición temporalmente
                    currentSlide = totalSlides - 2 * visibleSlides; // Volvemos al final (sin que el usuario lo note)
                    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                }, 500); // El tiempo debe coincidir con el de la animación CSS
            }
        });

        function moveCarousel() {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    }
}
/* ---------------------------------------------------------------------- */