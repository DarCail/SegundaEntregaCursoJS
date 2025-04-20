// ver carrito

const pintarCarrito = () => {
    modalContainer.innerHTML = ""; // Limpiar el contenido previo del modal
    modalContainer.style.display = "flex"; // Mostrar el modal
  
    //modal header
  
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header";
    modalheader.innerHTML = `
      <h2 class= "modal-header-title">Carrito de compras</h2>
      `;
    modalContainer.append(modalheader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalheader.append(modalbutton);
  
    //modal body
    if (carrito.length > 0) {
      carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
                  <img src="${product.img}">
                  <h3>${product.nombre}</h3>
                  <p class="price">${product.precio} $</p>
                  <span class="restar"> - </span>
                  <p>Cantidad: ${product.cantidad}</p>
                  <span class="sumar"> + </span>
                  <p>Total: ${product.cantidad * product.precio} $</p>
                  <span class="delete-product"> ❌ </span>
              `;
  
        modalContainer.append(carritoContent);
  
        //boton sumar y restar
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
          product.cantidad++;
          saveLocal(); // Guardar cambios en localStorage
          carritoCounter(); // Actualizar el contador del carrito
          pintarCarrito(); // Actualizar la vista del carrito
        });
  
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
          if (product.cantidad !== 1) {
            product.cantidad--;
            saveLocal(); // Guardar cambios en localStorage
            carritoCounter(); // Actualizar el contador del carrito
            pintarCarrito(); // Actualizar la vista del carrito
          }
        });
  
        //boton eliminar
  
        let eliminar = carritoContent.querySelector(".delete-product");
  
        eliminar.addEventListener("click", () => {
          eliminarProducto(product.id);
        });
      });
  
      //modal footer
  
       //boton finalizar compra
    const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar compra";
    finalizarCompra.className = "finalizar-compra";
    modalContainer.append(finalizarCompra);
  
    finalizarCompra.addEventListener("click", () => {
      Swal.fire({
        title: 'Gracias por tu compra!',
        text: '¡Tu pedido ha sido recibido!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      carrito.length = 0; // Vaciar el carrito
      saveLocal(); // Guardar el carrito vacío en localStorage
      carritoCounter(); // Actualizar el contador del carrito
      modalContainer.style.display = "none"; // Ocultar el modal del carrito
    });
  
      const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
      const totalBuying = document.createElement("div");
      totalBuying.className = "total-content";
      totalBuying.innerHTML = `Total a pagar: ${total} $`;
      modalContainer.append(totalBuying);
    } else {
      const modaltext = document.createElement("h2");
      modaltext.className = "modal-body";
      modaltext.innerText = "El carrito está vacío";
      modalContainer.append(modaltext);
    }
  
  };
  
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => carritoId.id !== id); // Filtrar por ID
  
    carritoCounter();
    saveLocal();
    pintarCarrito();
  };
  
  const carritoCounter = () => {
    const carritoLength = carrito.reduce((acc, prod) => acc + prod.cantidad, 0); // Sumar cantidades
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    if (carritoLength > 0) {
      cantidadCarrito.style.display = "block";
    } else {
      cantidadCarrito.style.display = "none";
    }
  
    cantidadCarrito.innerText = carritoLength; // Mostrar la cantidad total
  };
  
  carritoCounter();
  