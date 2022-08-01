let carrito = {}

// -------------------> llamando al api.json <-------------------

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito()
    }
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




// document.addEventListener("keyup", e => {
//     if (e.target.matches("#buscador")){
//     if (e.key ==="Escape")e.target.value = ""
//         data.forEach(producto =>{
//             producto.nombre.textContent.toLowerCase().includes(e.target.value.toLowerCase())
//             ?producto.nombre.classList.remove("filtro")
//             :producto.nombre.classList.add("filtro")
//         })
//     }
// })




// const buscador = document.querySelector("#buscador");
// const texto = buscador.value.toLowerCase();

//     let nombre = data.nombre.toLowerCase();
//     if(nombre.indexOf(texto) !== -1){}

// const filtrar = () => {
// const pintarData = data => {
//     data.forEach(producto => {
//         div.innerHTML += `<div>
//                             <a href="../${producto.redireccion}">
//                             <img src="../${producto.img}"/>
//                             </a>
//                             <h4 class"productoNombre">${producto.nombre}</h4>
//                             <div class="rating">
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star"></i>
//                             <i class="fa-solid fa-star-half-stroke"></i>
//                         </div>
//                         </div>
//                         <div class="card-content">
//                             <p>$${producto.precio}</p>
//                         </div>
//                         <button class="btn alCarrito" id="alCarrito" value="${producto.id}" >Añadir al carrito</button>`
//                     })
//                 }
//             }


// buscador.addEventListener("keyup", filtrar);

// filtrar()

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
                                <h4 class"productoNombre">${producto.nombre}</h4>
                                <div class="rating">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>
                            </div>
                            <div class="card-content">
                                <p>${producto.precio}</p>
                            </div>
                            <button class="btn alCarrito" id="alCarrito" value="${producto.id}" >Añadir al carrito</button>`
            contenedorProductos.appendChild(div);
    })
}


// -------------------> Agregando productos al carrito <-------------------
// -------------------> Toastify boton de comprar <-------------------



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
        nombre: objeto.querySelector("h4").textContent,
        precio:  objeto.querySelector("p").textContent,
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
    pintarCarrito()
}


// -------------------> Funcion para pintar el carrito <-------------------

const items = document.getElementById('items')
const cards = document.getElementById('cards')
const fooCarrito = document.getElementById('fooCarrito')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        //botones
        templateCarrito.querySelector('.btnSuma').value = producto.id
        templateCarrito.querySelector('.btnResta').value = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    // -------------------> Almacenamiento por LocalStorage dentro de pintar carrito <-------------------

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const pintarFooter = () => {
    fooCarrito.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        fooCarrito.innerHTML = `
                                <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
    return
    }


// -------------------> Funcion para pintar total de los productos <-------------------

    const nCantidad = Object.values(carrito).reduce( (acumulador, {cantidad}) => acumulador + cantidad,0);
    const nPrecio = Object.values(carrito).reduce((acumulador, {cantidad, precio}) => acumulador + cantidad * precio,0);

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    fooCarrito.appendChild(fragment)


// -------------------> Función para vaciar todo <-------------------

    const btnVaciar = document.getElementById("vaciar-carrito")
    btnVaciar.addEventListener("click", () => {
        carrito = {}
        pintarCarrito()
    })
}


// -------------------> Función añadir evento a boton suma y boton resta <-------------------

items.addEventListener("click", e => {
    btnAumentarDisminuir(e)
})

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains("btnSuma")) {
        const producto = carrito[e.target.value.id]
        producto.cantidad++
        carrito[e.target.value.id] = {...producto}
        pintarCarrito()
    }

    if (e.target.classList.contains("btnResta")) {
        const producto = carrito [e.target.value.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.value.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}