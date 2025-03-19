const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

const productos = [
    { id: 1, nombre: "Monster hunter", precio: 1200, img: "https://microless.com/cdn/products/018c82745311b1d3dd435becfa99137a-hi.jpg"},
    {id: 2, nombre: "Demons souls", precio: 2000, img: "https://th.bing.com/th/id/OIP.jJBvk2uO3QbBrdRl6M3yvAAAAA?rs=1&pid=ImgDetMain"},
    { id: 3, nombre: "GTA", precio: 1800, img: "https://m.media-amazon.com/images/I/71rmY66nqoL.jpg"},
    { id: 4, nombre: "Resident evil", precio: 1700, img: "https://www.startechstore.com/wp-content/uploads/2023/04/CD-For-Resident-Evil-4-PS5-1.jpg"},
    { id: 5, nombre: "God of war", precio: 1500, img: "https://th.bing.com/th/id/OIP.YjrMLQ8KtYSZtZH-GviM9AAAAA?w=468&h=600&rs=1&pid=ImgDetMain"},
    
];

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    productos.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;
        
        shopContent.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";
        comprar.className = "comprar";
        
        content.append(comprar);

        comprar.addEventListener("click", () => {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
            }) 
         console.log(carrito);
         saveLocal();
        });
    });

    verCarrito.addEventListener("click", () => {
        const modalheader = document.createElement ("div");
        modalheader.className = "modal-header";
        modalheader.innerHTML = `
        <h2 class= "modal-header-title">Carrito de compras</h2>
        `;
        modalContainer.append(modalheader);

        const modalbutton = document.createElement("h1");
        modalbutton.innerText = "X";
        modalbutton.className = "modal-header-button";
        modalheader.append(modalbutton);


        carrito.forEach((product) => {
            let carritoContent = document.createElement("div");
            carritoContent.className = "modal-content";
            carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="price">${product.precio} $</p>
            `;
            modalContainer.append(carritoContent);
        });


        const total = carrito.reduce((acc, el) => acc + el.precio, 0);



    });


    //set item

    const saveLocal = () =>{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    //get item

    JSON.parse(localStorage.getItem("carrito"));

