const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const productos = [
    { id: 1,
         
        nombre: "G-435", 
        precio: 49.99, 
        stock: 20,
        img: "../images/auriculares 1.png"
    },

    { id: 2,
         
        nombre: "G-733", 
        precio: 67, 
        stock: 16,
        img: "../images/auriculares 2.png"
    },

    { id: 3,
         
        nombre: "G-335 Pro",
        precio: 50, 
        stock: 18, 
        img: "../images/auriculares 3.png"
    },

    { id: 4,
         
        nombre: "G-332", 
        precio: 25.99, 
        stock: 5, 
        img: "../images/auriculares 4.png"
    },

    { id: 5,
         
        nombre: "Signature K-650", 
        precio: 80, 
        stock: 8, 
        img: "../images/teclado 1.png"
    },

    { id: 6,
         
        nombre: "MX Mechanical", 
        precio: 85.99, 
        stock: 13, 
        img: "../images/teclado 2.png"
    },

    { id: 7,
         
        nombre: "ERGO K-860", 
        precio: 100, 
        stock: 6, 
        img: "../images/teclado 3.png"
    },

    { id: 8,
         
        nombre: "Teclado K-835", 
        precio: 82, 
        stock: 18, 
        img: "../images/teclado 4.png"
    },

    ];

JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos))

let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.innerHTML = `
    <img src="${product.img}" class="card-img-top  card-img-mobile" alt="article-img-3">
    <div class="card-body card-body-auriculares">
        <h2 class="title-size">${product.nombre}</h2>
        <p class="card-text placeholder-wave fw-bold">${product.precio}</p>
        <a class="btn btn-dark btn-size-auriculares btn-style" id="btn${product.id}">Agregar al Carrito</a>
    </div>
    `;

    shopContent.append(content)


    let comprar = document.getElementById (`btn${product.id}`)
    
    comprar.addEventListener("click", () =>{

        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
        })
    })
})


verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML= " ";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  
  
  <h1 class="modal-header-title">Carrito</h1>
  <a class="btn btn-dark btn-size-auriculares btn-style" id="modalCierre">X</a>
  
  `;

  modalContainer.appendChild(modalHeader);

  let modalCierre = document.getElementById ("modalCierre")
  modalCierre.addEventListener("click", () => {
    modalContainer.style.display = "none";

  })


  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
  
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio}$</p>
    
    `;
    
    modalContainer.appendChild(carritoContent);

  })
  
  
  const total = carrito.reduce((acc, el) => acc + el.precio, 0);


  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `
  Total a pagar ${total}$
  <a class="btn btn-dark btn-size-auriculares btn-style" id="modalBtn">Comprar</a>
  <a class="btn btn-dark btn-size-auriculares btn-style" id="modalCalculador">Calcular valor en Cuotas</a>
  
  `;

  modalContainer.appendChild(totalBuying);

let modalComprar = document.getElementById("modalBtn")
modalComprar.addEventListener("click", () => {
    for (let index = `${productos.stock}`; index > 0 ; index--) {
        if (index > 0) {
            alert("No hay mas stock");
        }
    }
})


  let modalCalculador = document.getElementById("modalCalculador")
  
  modalCalculador.addEventListener("click", () => {
    const calculadorCuotas = (a, b) => {
        return parseFloat(a / b);
    }

    let cuotas = parseInt(prompt("Elija cantidad de cuotas"));

    let resultado = calculadorCuotas (`${total}`, `${cuotas}`);
    switch(cuotas){
        case 3:
            if(cuotas = 3){
                alert (`Su resultado quedaria en ${resultado}$`);
            }
            break;
        case 6:
            if(cuotas = 6){
                alert (`Su resultado quedaria en ${resultado}$`);
            }
            break;
        case 12:
            if(cuotas = 12){
                alert (`Su resultado quedaria en ${resultado}$`);
            }
            break;
        default:
            while (cuotas !== 3 && 6 && 12) {
                alert("Elija un número entre 3, 6 y 12 respectivo a las cuotas");
                cuotas = parseInt(prompt("Elija cuantas cuotas"));
            }
            break
       }
  })
})