const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const compraFinal = document.getElementById("contCompra")

let carrito = JSON.parse (localStorage.getItem("data")) || [];

const saveLocal = ()  =>  {
  localStorage.setItem("data", JSON.stringify(carrito));
}

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

fetch("../data.json")
.then(response => response.json())
.then(data => {
  data.forEach((product) => {
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


      Swal.fire({
      title:'Su producto se ha agregado correctamente!',
      showCloseButton: true,
      icon: 'success',
      })



        const repeat = data.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
          carrito.map((prod) => {
            if (prod.id === product.id) {
              prod.cant++;
            }
          });
        
          carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cant: product.cant,
          });
        carritoCounter();
        saveLocal();
        
        
    }})
})
})

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>${product.precio} $</p>
          <span class="restar"> - </span>
          <!--recomiendo no escribir la palabra cantidad para que no quede tan largo :)-->
          <p>${product.cant}</p>
          <span class="sumar"> + </span>
          <p>Total: ${product.cant * product.precio} $</p>
          <span class="delete-product"> ❌ </span>
        `;
  
      modalContainer.append(carritoContent);
      
      let total = `${product.cant * product.precio}`
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cant !== 1) {
          product.cant--;
        }
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cant++;
        saveLocal();
        pintarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-product");
      
      eliminar.addEventListener("click", () => {
        Swal.fire({
          title: 'Estas seguro de eliminar el producto?',
          showCancelButton: true,
          confirmButtonText: 'Si',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success'
            })
            eliminarProducto(product.id);
          } 
        })
        
      });
  
    });
;

  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cant, 0);

    const totalBuying = document.createElement("div");
    totalBuying.innerHTML = `Total a pagar: ${total} $
    <a class="btn btn-dark btn-size-auriculares btn-style" id="modalCalculador"> Calculador de cuotas </a>
    <a class="btn btn-dark btn-size-auriculares btn-style" id="finalCompra"> Comprar </a>`;
    
    modalContainer.append(totalBuying);


    const calculadora = document.getElementById("modalCalculador")
    calculadora.addEventListener("click", () => {
      const calculadorCuotas = (a, b) => {
        return parseFloat(a / b);
      }
    (async () =>  {const {value: cuotas} = await Swal.fire({
      text: `Seleccione cantidad de cuotas`,
      input: `select`,
      position: `center`,
      icon: `question`,
      inputPlaceholder: `Cuotas`,
      inputOptions: {
        3: 3,
        6: 6,
        12: 12,
      }
    })
   
    let resultado = calculadorCuotas (`${total}`, `${cuotas}`);
    Swal.fire({
      text: `Te quedaría un total de ${resultado} en ${cuotas} cuotas`
    })
    })()
    
    finalCompra.addEventListener("click", () => {
    let contCompra = document.createElement("div")
    contCompra.className = "modal-content-form";
    contCompra.innerHTML = `
    <form action="contacto.html" enctype="application/x-www-form-urlencoded" method="post" class="col-lg-5 col-sm-12 col-xs-12 flex-form mx-auto">
    <div class="hover-form col-sm-12 col-xs-12 rounded">
    <h1>  Registrese </h1>
      <div class="mb-3 label-w">
        <label for="exampleFormControlInput1" class="form-label">Email</label>
        <input class="form-control" type="email" aria-label="default input example" placeholder="nombre@email.com">
      </div>

      <div class="mb-3 label-w">
        <label for="exampleFormControlInput1" class="form-label">Contraseña</label>
        <input type="password" class="form-control " id="exampleFormControlInput1">
      </div>

      <div class="check-btn-flex pb-3">
        <div class="form-check mx-auto">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">Acepta los términos y condiciones</label>
        </div>
      </div>
      <button type="submit" class="btn btn-dark btn-style btn-form-mobile" id="realizarCompra">Enviar</button>
      <button type="submit" class="btn btn-dark btn-style btn-form-mobile" id="terminarCompra">Realizar compra</button>
    </div>
  </form>
    `
    
    modalContainer.append(contCompra)

    let realizarCompra = document.getElementById("realizarCompra")
    realizarCompra.addEventListener("click", () => {
      Swal.fire({
        title: 'Se ha registrado exitosamente!',
        icon: 'success',
      })
    })


    let terminarCompra = document.getElementById("terminarCompra")
    terminarCompra.addEventListener("click", () =>{
      Swal.fire({
        title: 'Su compra se realizo de manera exitosa!',
        icon: 'success'
      })
    })
    })
  })
  };
  

  verCarrito.addEventListener("click", () => {
    pintarCarrito()
  })


  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
    
  };

  

  
 
  carritoCounter();