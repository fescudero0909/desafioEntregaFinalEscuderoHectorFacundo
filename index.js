
const shoppingCart = JSON.parse(localStorage.getItem('carro')) || [];
counterCart();
cartview();
totalToPay ();


//elemento contenedor de las tarjeta de productos

const contenedor = document.getElementById('container-cards');

//recorremos nuestro array de products
    const response = await fetch ('stock.json');
    const products = await response.json()
        
    products.forEach( product => {
        
    //creamos el elemento contenedor de las tarjetas de productos
    const div = document.createElement('div');

    div.classList.add ('tarjetas');
    div.classList.add ('col-12');
    div.classList.add ('col-sm-6');
    div.classList.add ('col-lg-4');

    //insertamos el HTML
    div.innerHTML = `
            
            <div class="tarjetaProducto col-12">
                <p class="producto">${product.names}</p>
                <img class="imgProducto img-fluid col-12" src=${product.img} alt="">
                <div class="row align-items-center">
                    <a class="btn btnAgregar col-6 m-3" id="${product.id}">Agregar al carrito</a>
                    <p class="precio col-5 text-center mb-0">$ ${product.price}</p> 
                </div>
            </div> 
        `;    

    contenedor.appendChild(div);
        
    //para agregar cada producto diferenciado por el id utlizando evento CLICK
    div.querySelector('.btnAgregar').addEventListener('click', () =>{

        addShoppingCart (product.id);
        saveProductStorage (shoppingCart)
    })

    });


//funcion para agregar al carrito
function addShoppingCart (id) {

    //obtenemos los datos de los productos pr el id
    let datos = products.find(products => products.id === id);
    //console.log (datos);

    //buscamos dentro del nuevo array los productos con id iguales y los agrupamos
    let SumaProductosEnCarrito = shoppingCart.find (products => products.id === id);
            
    //operador anvanzado TERNARIO  (reemplaza al if-else)
    SumaProductosEnCarrito ? SumaProductosEnCarrito.quantity++ : (datos.quantity = 1, shoppingCart.push(datos));


    //mensaje de confirmación incorporacion al carrito
    Toastify({
        text: 'Producto agregado al carrito',
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style:{
            background: 'green'
        }
        
    }).showToast();
    
            
    counterCart();
    cartview ();
    totalToPay ();
}

//hago una funcion para ver el contenido del carrito 
function  cartview (){
    //Llamo al carrito HTML
    const cart = document.getElementById('carrito');

    //limpia el array  cada vez que hago click en el boton comprar y los agrupa por producto
    cart.innerHTML = ' ';

    //Elemento contenedor del  carrito
    shoppingCart.forEach ((product, id) =>{
        const div = document.createElement('div');

        div.classList.add ('col-12');

        div.innerHTML = `
            <div class="row align-items-center">
                <img class="imgProductoCarrito img-fluid col-3 m-2" src=${product.img} alt="">
                <p class="producto col-3  m-2">${product.names}</p>
                <p class="col-2 m-2">Cantidad: ${product.quantity}</p>
                <p class="precio col-2  m-2">$ ${product.price} x unid.</p>
                <a class="btnEliminar col-1 m-2" >X</a>
            </div>

        `
        //evento al boton eliminar para los productos en el carrito
        div.querySelector('.btnEliminar').addEventListener ('click', () =>{
            
            //mensaje de eliminacion del producot en el carrito
            Swal.fire({
                title: 'Está seguro de eliminar el producto del carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, estoy seguro',
                cancelButtonText: 'No, no quiero eliminar',
                cancelButtonColor: 'red'
            }).then((result) => {
                if (result.isConfirmed){
                    deleteProductOfCart (id);
                    Swal.fire({
                        title: 'Eliminado',
                        icon: 'success',
                        text: 'Producto eliminado del carrito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                saveProductStorage (shoppingCart);
            });

        });

        cart.appendChild(div);
    })
}

//elimiar del carrito
function deleteProductOfCart (id) {
    
    shoppingCart[id].quantity--

    // if(shoppingCart[id].quantity === 0){
    //     shoppingCart.splice (id, 1);
    // }

    //operador anvanzado AND para eliminar de a una unidad (reemplaza al if)
    shoppingCart[id].quantity === 0 && shoppingCart.splice (id, 1)

    counterCart();
    totalToPay ();
    cartview();
    
} 

//llamo al contador para que sume la cantidad de productos(id) en el carrito (burbuja al lado del carrito)
function counterCart() {
    const counterCart = document.getElementById('contadorCarrito');
    counterCart.innerText = shoppingCart.reduce((acc, p) => (acc += p.quantity), 0)
    
}

//boton de eliminar TODOS los productos del carrito a la vez
function deleteAllCart (){
    const deleteAllProducts = document.getElementById ('btnEliminarTodo')
    deleteAllProducts.addEventListener ('click', () =>{
        shoppingCart.length  = 0
        saveProductStorage (shoppingCart)
        cartview();
        counterCart();
        totalToPay();
    })
}
deleteAllCart();


//resumen de compra (descripción y monto a pagar)
function totalToPay (){
    let subtotal = 0;
    let iva = 0;
    let total =  0;

    shoppingCart.forEach((products) => {
        subtotal += products.price * products.quantity;
        iva = subtotal * 0.21;
        total = subtotal + iva;
    })

    const totalPay = document.getElementById('total');
        
    totalPay.innerText =  `El total a pagar (incluido impuestos) es $ ${total}`
        
    //ventana al tocar el boton finalizar
    document.getElementById ('btnFinalizar').addEventListener ('click', () =>{
    
        Swal.fire({
            title: `El detalle de su factura es:
                    

                    Subtotal = $ ${subtotal}
                    IVA = $ ${iva}

                    Total = $ ${total}
                    `,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }

        })
    })
}

    
//Storage guardar
const saveProductStorage = (shoppingCart) =>{
    const enJSON = JSON.stringify(shoppingCart);
    localStorage.setItem ('carro' , enJSON);
    
}












