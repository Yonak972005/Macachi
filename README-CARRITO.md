# Carrito de Compras - Macachi 2.0

## Funcionalidades Implementadas

### ✅ Características Principales

1. **Almacenamiento Local (localStorage)**
   - Los productos se guardan automáticamente en el navegador
   - Persistencia entre sesiones del navegador
   - Recuperación automática del carrito al recargar la página

2. **Gestión Completa de Productos**
   - Añadir productos al carrito
   - Modificar cantidades
   - Eliminar productos individuales
   - Vaciar carrito completo
   - Selección de medidas/tamaños

3. **Interfaz de Usuario**
   - Contador visual en el ícono del carrito
   - Modal completo del carrito
   - Notificaciones cuando se añaden productos
   - Diseño responsive (móvil y escritorio)

4. **Integración con WhatsApp**
   - Botón "Proceder por WhatsApp"
   - Mensaje automático con detalles del pedido
   - Formato profesional del mensaje

### 🏗️ Archivos Modificados

1. **carrito.js** - Nuevo archivo con toda la lógica del carrito
2. **index.html** - Agregado contador y modal del carrito
3. **tornillos-de-lujo.html** - Agregado contador y modal del carrito
4. **style.css** - Nuevos estilos para el carrito
5. **popup.js** - Actualizado para usar la nueva clase del carrito

### 🔧 Cómo Funciona

#### Estructura de Datos
```javascript
// Cada producto en el carrito tiene esta estructura:
{
    id: "tornillos-de-lujo",
    title: "Tornillos de lujo",
    image: "https://...",
    selectedSize: "M6x20",
    quantity: 2,
    dateAdded: "2025-01-07T..."
}
```

#### Métodos Principales
- `cart.addItem(product, quantity, selectedSize)` - Añadir producto
- `cart.removeItem(productId, selectedSize)` - Eliminar producto
- `cart.updateQuantity(productId, selectedSize, newQuantity)` - Actualizar cantidad
- `cart.clearCart()` - Vaciar carrito
- `cart.checkout()` - Proceder por WhatsApp

### 🎯 Cómo Usar

#### Para el Usuario Final:
1. **Añadir productos**: Hacer clic en un producto → seleccionar medida → "Añadir al carrito"
2. **Ver carrito**: Hacer clic en el ícono del carrito (esquina superior derecha)
3. **Modificar cantidades**: Usar los botones +/- en el modal del carrito
4. **Eliminar productos**: Hacer clic en el ícono de basura
5. **Finalizar compra**: Hacer clic en "Proceder por WhatsApp"

#### Para Desarrolladores:
```javascript
// Añadir producto manualmente
cart.addItem({
    id: 'mi-producto',
    title: 'Mi Producto',
    image: 'url-imagen'
}, 1, 'Talla M');

// Verificar total de productos
console.log(cart.getTotalItems());

// Acceder a todos los productos
console.log(cart.items);
```

### 🎨 Características de UI/UX

1. **Contador Dinámico**: Se actualiza automáticamente
2. **Notificaciones**: Confirmación visual al añadir productos
3. **Modal Responsive**: Se adapta a móviles y escritorio
4. **Estados Vacío**: Mensaje cuando no hay productos
5. **Animaciones Suaves**: Transiciones CSS para mejor experiencia

### 🔗 Integración con WhatsApp

Cuando el usuario hace checkout, se genera un mensaje como:
```
¡Hola Macachi! 🏍️

Me interesa el siguiente pedido:

1. Tornillos de lujo
   Medida: M6x20
   Cantidad: 2

2. Tapa Válvulas
   Medida: Tipo Bala
   Cantidad: 1

Total de productos: 3

¿Podrías ayudarme con los precios y disponibilidad? ¡Gracias!
```

### ⚙️ Configuración Técnica

#### localStorage Key: `macachi_cart`
#### Dependencias: Ninguna (Vanilla JavaScript)
#### Compatibilidad: Todos los navegadores modernos

### 🚀 Próximas Mejoras Sugeridas

1. **Wishlist/Lista de Deseos**
2. **Comparador de Productos**
3. **Historial de Compras**
4. **Cupones de Descuento**
5. **Cálculo de Envío**
6. **Múltiples Direcciones de Entrega**

---

**Autor**: Implementado por GitHub Copilot
**Fecha**: Enero 2025
**Versión**: 1.0
