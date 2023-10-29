// Entrega nª1  Curso Backend - CoderHouse 
// Comisión : CH-55610
// Alumno: Mario Campos
// email: mcampos@infocam.com.ar
// Fecha Límite de entrega : 01/11/2023

// Clase para la Gestión de Productos
class ProductManager{
    constructor(){
        this.products = [];
    }
    // Método para recuperar los productos
    getProducts(){
        return this.products;
    }

    //Recuperar un producto a partir de su id
    getProductById(idProducto){
        const producto = this.products.find((producto =>producto.id===idProducto));
        if (!producto){
            console.log("Not found");
        }else{
            console.log(producto);
        }
    }

    //Método para agregar un producto al arreglo
    addProduct(producto){
        const lcMsg = "";
        const existeCode = this.validarCode(producto.code); 
        const productoValido = this.validarProducto(
            producto.title, 
            producto.description,
            producto.price,
            producto.thumbnail,
            producto.code,
            producto.stock
            );    
       if (existeCode === false){
            if (productoValido){
                producto.id= this.generaId();
                this.products.push(producto);
                console.log("El Producto se ha registrado correctamente.");
            }else {
                console.log("Algunos datos no son correctos . No se puede registrar el producto!.");
              }
            
            
       }else{
        console.log(`No se agregó el producto solicitado porque ya existe un producto con code ${producto.code}`);
       }
    }

    // Validar existencia de códe, devuelve true si ya existe o false si no existe
    validarCode(idCode){
        const producto = this.products.find((producto) => producto.code === idCode);     
        if (!producto){
            return false;
        }
    }

    validarProducto(lcTitle, lcDescription, lnPrice, lctumbnail, lcCode, lnStock) {
        if (typeof lcTitle === 'string' && lcTitle.length > 0 &&
            typeof lcDescription === 'string' && lcDescription.length > 0 &&
            typeof lnPrice === 'number' && lnPrice > 0 &&
            typeof lctumbnail === 'string' && lctumbnail.length > 0 &&
            typeof lcCode === 'string' && lcCode.length > 0 &&
            typeof lnStock === 'number' && lnStock >= 0) {
          return true;
        } else {
          return false;
        }
      }

    // Generar ID único
    generaId(){
        if (this.products.length ===0){
            return 1;
        }else{
            return this.products[this.products.length-1].id + 1;
        }
    }
}

class Producto {
    constructor(
        title,          //(nombre del producto)
        description,    // (descripción del producto)
        price,          // (precio)
        thumbnail,      // (ruta de imagen)
        code,           // (código identificador)
        stock          // (número de piezas disponibles)
    ){
        this.title = title;          
        this.description = description;    
        this.price = price;          
        this.thumbnail = thumbnail;      
        this.code = code;           
        this.stock = stock;         
    }
}

// Testing
console.log("Instanciando la Clase ProductoManager");
console.log("*************************************");
const productos = new ProductManager();
console.log("Agregar un Producto ");
console.log("*******************");
productos.addProduct(new Producto("Nafta Super", "Producto de 95 Octanos", 488.50,"img001", "01-01",15000));
console.log("Agregar un Segundo Producto ");
console.log("*******************");
productos.addProduct(new Producto("Nafta Quantium", "Producto de 98 Octanos", 504.50,"img002", "01-02",20000));
console.log("Agregar un Tercer Producto, debería dar error por dupicidad de la propiedad code ");
console.log("********************************************************************************");
productos.addProduct(new Producto("Nafta Quantium", "Producto de 98 Octanos", 504.50,"img002", "01-02",20000));
console.log("Mostrar los productos ingresados ");
console.log("********************************");
const misproductos = productos.getProducts();
console.log(misproductos);
console.log("MOstrar el producto con Id 1");
console.log("****************************");
const buscarProducto1 = productos.getProductById(1);
console.log("MOstrar el producto con Id 2");
console.log("****************************");
const buscarProducto2 = productos.getProductById(2);
console.log("MOstrar el producto con Id 3 Debería Indicar not found");
console.log("****************************");
const buscarProducto3 = productos.getProductById(3);
console.log(" Se intenta ingresar un producto con datos faltantes");
console.log("********************************************************************************");
productos.addProduct(new Producto("Nafta Quantium", "Producto de 98 Octanos"));