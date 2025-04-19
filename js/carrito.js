 // ver carrito

 const pintarCarrito = () => {
    modalContainer.innerHTML = ""; // Limpiar el contenido previo del modal
    modalContainer.style.display = "flex"; // Mostrar el modal


    //modal header

    const modalheader = document.createElement ("div");
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
            saveLocal();
            pintarCarrito();
        }
        );

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) { 

             product.cantidad--;
            } 
            saveLocal();
            pintarCarrito();
        });


        //boton eliminar

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });


    //modal footer

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
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => { 
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    if (carritoLength > 0) {
        cantidadCarrito.style.display = "block";
    } else {
        cantidadCarrito.style.display = "none";
    }
    

    


    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));


    
};

carritoCounter();
