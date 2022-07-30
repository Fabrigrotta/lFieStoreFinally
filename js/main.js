// -------------------> llamando al api.json <-------------------

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch("../api.json")
        const data = await res.json()
        pintarData(data);
    } catch (error) {
        console.log(error);
    }
}


// -------------------> Funcion cambiar precio de menor a mayor <-------------------

// const sortMenorMayor = () => {
//     productosArray.sort ((a, b) => a.precio - b.precio);
//     console.log (productosArray);
//     mostrarListaOrdenada();
// }


// -------------------> Funcion cambiar precio de mayor a menor <-------------------

// const sortMayorMenor = () => {
//     productosArray.sort ((a, b) => b.precio - a.precio);
//     console.log (productosArray);
//     mostrarListaOrdenada();
// }


// -------------------> Funcion mostrar lista ordenada <-------------------

// const mostrarListaOrdenada = () => {
//     let arrayLista = [];
//     productosArray.forEach(producto => arrayLista.push(producto.nombre + " $" + producto.precio));
// }


// -------------------> Agregando dinamismo a la pagina de productos <-------------------

    const contenedorProductos = document.getElementById("producto-contenedor");

    const pintarData = data => {
        data.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('col-4');
            div.innerHTML += `<div>
                                <a href="../${producto.redireccion}">
                                <img src="../${producto.img}"/>
                                </a>
                                <h4>${producto.nombre}</h4>
                                <div class="rating">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>
                            </div>
                            <div class="card-content">
                                <p>$${producto.precio}</p>
                            </div>
                            <button class="btn alCarrito" id="alCarrito" value="${producto.id}" >Añadir al carrito</button>`
            contenedorProductos.appendChild(div);
    })
}


// -------------------> Agregando productos al carrito <-------------------
// -------------------> Toastify boton de comprar <-------------------

let carrito = {}

contenedorProductos.addEventListener("click", (e) => {
    addCarrito(e)
});

const addCarrito = e => {
    if (e.target.classList.contains("alCarrito")) {
        setCarrito(e.target.parentElement);
        e.stopPropagation()
    }
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector(".alCarrito").value,
        titulo: objeto.querySelector("h4").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: Number(1)
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
        Toastify({
            text: "Añadiste un (1) producto al carrito",
            duration: 3000,
            position: "right",
            gravity: "bottom",
            style: {
            background: "linear-gradient(to right, #ff523b, #ffcbc4)",
            }
        }).showToast();
    }

    carrito[producto.id] = {...producto}

}


// -------------------> Funcion para pintar el carrito <-------------------

const contenedorCarrito = document.getElementById("contenedor-carrito");
const cards = document.getElementById("cards");

const pintarCarrito = () => {
    console.log(carrito);
    Object.values(carrito).forEach(producto => {
        contenedorCarrito.getElementById("nombreCarrito").textContent = producto.nombre
        contenedorCarrito.getElementById("precioCarritoUnidad").textContent = producto.precio
        contenedorCarrito.getElementById("precioCarrito").textContent = producto.precio
        contenedorCarrito.getElementById("cantidadCarrito") = producto.cantidad * producto.precio
        contenedorCarrito.getElementById("carritoSuma").value.id = producto.id
        contenedorCarrito.getElementById("carritoResta").value.id = producto.id

        const clone = contenedorCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}


// Crear una función que se llame renderCarrito

// const renderCarrito = (producto) => {views/productos.html
//     contenedorProductos.addEventListener("click", () => {
//     })
// }

// -------------------> Función para eliminar del carrito <-------------------
