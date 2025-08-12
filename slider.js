const carousel = new bootstrap.Carousel('#myCarousel')


// Recuperar carrito del almacenamiento local o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    listaCarrito.innerHTML += `
      <li>
        ${item.nombre} - $${item.precio} 
        <button onclick="eliminarDelCarrito(${index})">❌</button>
      </li>`;
  });
  totalElemento.textContent = total;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = boton.parentElement;
    carrito.push({
      id: producto.dataset.id,
      nombre: producto.dataset.nombre,
      precio: parseInt(producto.dataset.precio)
    });
    actualizarCarrito();
  });
});

document.getElementById('finalizar-compra').addEventListener('click', () => {
  alert('Gracias por tu compra!');
  carrito = [];
  actualizarCarrito();
});

actualizarCarrito();
