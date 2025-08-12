document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');
  const cantidadCarrito = document.getElementById('cantidad-carrito');
  const iconoCarrito = document.getElementById('icono-carrito');
  const finalizarCompraBtn = document.getElementById('finalizar-compra');

  // Función para actualizar badge cantidad
  function actualizarCantidad() {
    cantidadCarrito.textContent = carrito.length;
  }

  // Función para actualizar la lista del modal
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
      total += item.precio;
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${item.nombre} - $${item.precio}
        <button class="btn btn-sm btn-danger">❌</button>
      `;
      li.querySelector('button').addEventListener('click', () => {
        eliminarDelCarrito(index);
      });
      listaCarrito.appendChild(li);
    });
    totalElemento.textContent = total;
    actualizarCantidad();
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.dataset.id;
      const nombre = boton.dataset.name;
      const precio = parseInt(boton.dataset.price);
      carrito.push({ id, nombre, precio });
      actualizarCarrito();
    });
  });

  // Mostrar modal al hacer click en el icono carrito
  iconoCarrito.addEventListener('click', () => {
    const modalCarrito = new bootstrap.Modal(document.getElementById('modalCarrito'));
    modalCarrito.show();
  });

  finalizarCompraBtn.addEventListener('click', () => {
    alert('Gracias por tu compra!');
    carrito = [];
    actualizarCarrito();
    // Cerrar modal luego de la compra
    const modalCarrito = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    modalCarrito.hide();
  });

  // Inicializar la vista
  actualizarCarrito();
});
