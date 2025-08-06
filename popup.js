

// ============================================
// FUNCIONALIDADES DE POPUP/MODAL DE PRODUCTOS
// ============================================

/**
 * Este archivo gestiona la apertura, cierre y funcionamiento del modal de productos.
 * Incluye la base de datos de productos, selección de medidas, cantidad y la integración con el carrito.
 * Todas las funciones principales están comentadas para facilitar el mantenimiento.
 */

// --------------------------------------------
// Base de datos de productos con medidas
// --------------------------------------------

const productsData = {
    // TORNILLOS DE LUJO
    'tornillos-boton5mm': {
        title: 'Tornillos Boton Plano 5MM',
        description: 'Tornillos de boton para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO DE LUJO.jpg',
        sizes: ['Dorado', 'Naranja', 'Rojo', 'Fucsia', 'Morado', 'Azul', 'Verde', 'Plateado', 'Negro']
    },
    'tornillos-boton6mm': {
        title: 'Tornillos Boton Plano 6MM',
        description: 'Tornillos de boton para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO DE LUJO.jpg',
        sizes: ['Dorado', 'Naranja', 'Rojo', 'Fucsia', 'Morado', 'Azul', 'Verde', 'Plateado', 'Negro']
    },
    'boton-rayitos': {
        title: 'Boton importado rayitos',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLORAYITOS.png',
        sizes: ['Rojo', 'Azul', 'Morado', 'Dorado', 'Negro', 'Plateado', 'Verde']
    },
    'tornillo-pesa': {
        title: 'Tornillo tipo pesa o copa',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO PESA.png',
        sizes: ['Dorado', 'Naranja', 'Rojo', 'Fucsia', 'Morado', 'Azul', 'Verde', 'Plateado', 'Negro']
    },
    'tornillo-pesa-sin-rayas': {
        title: 'Tornillo tipo pesa o copa sin rayas',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLOPESASINRAYOS.png',
        sizes: ['Dorado', 'Naranja', 'Rojo', 'Fucsia', 'Morado', 'Azul', 'Verde', 'Plateado', 'Negro']
    },
    'tornillo-diamante': {
        title: 'Tornillos diamante',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO DIAMANTE.png',
        sizes: ['Rojo', 'Plateado', 'Azul', 'Verde', 'Dorado', 'Morado', 'Negro']
    },
    'boton-allen': {
        title: 'Boton allen',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO BOTON ALLEN.png',
        sizes: ['Rojo', 'Plateado', 'Azul', 'Verde', 'Dorado', 'Morado', 'Negro', 'Tornasol']
    },
    'tornillos-golosos': {
        title: 'Tornillos golosos',
        description: 'Tornillos de lujo para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosdelujo/TORNILLO GOLOSO.png',
        sizes: ['10 x 5/8"']
    },

    // TAPA VALVULAS
    'Tipo-Bala-Alta': {
        title: 'Tipo Bala Alta 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPO BALA ALTA.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-proyectil': {
        title: 'Tipo Proyectil 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOPREYECTIL.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-bala-con-punta': {
        title: 'Tipo bala con punta 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOBALACONPUNTA.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-tornasol': {
        title: 'Tipo tornasol 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/MOTIVOTORNASOL.png',
        sizes: ['Cilindro', 'Hexagono', 'Proyectil corta', 'Cohete', 'Punta']
    },
    'tipo-calavera': {
        title: 'Tipo calavera 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOCALAVERA.png',
        sizes: ['Negro', 'Plateado']
    },
    'tipo-cohete': {
        title: 'Tipo cohete 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOCOHETE.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-granada': {
        title: 'Tipo granada 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOGRANADA.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-dado': {
        title: 'Tipo dado 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPODADO.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-fusil': {
        title: 'Tipo fusil 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOFUSIL.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-cilindro': {
        title: 'Tipo cilindro 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOCILINDRO.png',
        sizes: ['Verde', 'Plateado', 'Humo', 'Dorado', 'Negro', 'Azul', 'Rojo', 'Morado', 'Tornasol']
    },
    'tipo-neon': {
        title: 'Tipo neon 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPONEON.png',
        sizes: ['Verde', 'Blanco', 'Verde', 'Rosado', 'Trasparente']
    },
    'tipo-seguridad': {
        title: 'Tipo seguridad 4UNI',
        description: 'Tapa valvulas para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tapavalvulas/TIPOSEGURIDAD.png',
        sizes: ['Negro Seguridad']
    },
    // LUJOS VARIOS
    'Lujo-para-botella': {
        title: 'Lujo para botella PAR',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/LUJOPARABOTELLA.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Amarilla', 'Humo', 'Negra', 'Blanca', 'Naranja', 'Fucsia', 'Morado', 'Neon']
    },
    'medias-para-barras': {
        title: 'Medias para barras',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/MEDIASPARABARRA.png',
        sizes: ['Pequeña', 'Mediana', 'Larga']
    },
    'mangos': {
        title: 'Mangos',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/MANGOS.png',
        sizes: ['Univerasal (Color)', 'PROTAPER']
    },
    'tapa-tornillos': {
        title: 'Tapa tornillos',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/TAPATORNILLOS.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Dorado', 'Morado', 'Negra', 'Plateada', 'Tornasol']
    },
    'Cuelleros': {
        title: 'Cuelleros',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/CUELLEROS.png',
        sizes: ['Corto 50cm', 'Mediano 75cm', 'Largo 100cm']
    },
    'reatas-moto': {
        title: 'Reatas moto',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/REATAS.png',
        sizes: ['Único']
    },
    'Cinta-Cinta-rines': {
        title: 'Cinta rines',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/CINTARINES.png',
        sizes: ['Único']
    },
    'slider-para-rueda': {
        title: 'Slider para rueda',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/SLIDER.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Plateado', 'Morado', 'Dorado', 'Naranja', 'Tornasol', 'Negro']
    },
    'slider-bombon': {
        title: 'Slider Bombon',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/SLIDERBONBON.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Plateado', 'Morado', 'Dorado', 'Naranja', 'Tornasol', 'Negro']
    },
    'llavero-elastico-largo': {
        title: 'Llavero elastico largo',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/LLAVEROELASTICOLARGO.png',
        sizes: ['Universal (Color)']
    },
    'tillavero-elastico-corto': {
        title: 'Tipo neon',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/LLAVEROELASTICOCORTO.png',
        sizes: ['Universal (Color)']
    },
    'llavero-manilla': {
        title: 'Llavero manilla',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/LLAVEROMANILLA.png',
        sizes: ['Universal (Color)']
    },
    'llavero-con-motivos': {
        title: 'Llavero con motivos',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/LLAVEROMOTIVOS.png',
        sizes: ['Universal (Diseño)']
    },
    'Cortavientos': {
        title: 'Cortavientos',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/CORTAVIENTOS.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Plateado', 'Morado', 'Dorado', 'Tornasol', 'Negro']
    },
    'pitillo-pitillo-radio': {
        title: 'Pitillo radio',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/PITILLORADIO.png',
        sizes: ['Roja', 'Azul', 'Verde', 'Plateado', 'Morado', 'Dorado', 'Naranja', 'Tornasol', 'Negro']
    },
    'pato-motero': {
        title: 'Pato motero',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/PATOMOTERO.png',
        sizes: ['Único']
    },
    'forro-para-tanque': {
        title: 'Forro para tanque',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'lujos-varios/FORRO.png',
        sizes: ['Único']
    },
    // TUERCAS
    'tuerca-flange': {
        title: 'Tuerca Flange',
        description: 'Tuerca para motocicletas, diseñada para ofrecer seguridad.',
        image: 'tuerca/TUERCAFLANGE.png',
        sizes: ['5MM (100uni)', '6MM (100uni)', '8MM (100uni)', '10MM (50uni)', '12MM (30uni)', '14MM (20uni)']
    },
    'tuerca-con-teflon': {
        title: 'Tuerca con teflon',
        description: 'Tuerca para motocicletas, diseñada para ofrecer seguridad.',
        image: 'tuerca/TUERCACONTEFLON.jpeg',
        sizes: ['4MM (100uni)', '5MM (100uni)', '6MM (100uni)', '8MM (100uni)', '10MM (50uni)', '12MM (30uni)', '14MM (20uni)', '16MM (20uni)']
    },
    'tuerca-especial': {
        title: 'Tuerca especial con seguridad',
        description: 'Tuerca para motocicletas, diseñada para ofrecer seguridad.',
        image: 'tuerca/TUERCAESPECIAL.png',
        sizes: ['6MM (20uni)', '8MM (20uni)', '10MM (20uni)', '12MM (20uni)', '14MM (20uni)', '16MM (20uni)']
    },
    'tuerca-hexagonal': {
        title: 'Tuerca hexagonal',
        description: 'Tuerca para motocicletas, diseñada para ofrecer seguridad.',
        image: 'tuerca/TUERCAHEXAGONAL.png',
        sizes: ['4MM (100uni)', '5MM (100uni)', '6MM (100uni)', '8MM (50uni)', '10MM (30uni)', '12MM (50uni)']
    },
    'tuerca-ciega': {
        title: 'Tuerca ciega',
        description: 'Tuerca para motocicletas, diseñada para ofrecer seguridad.',
        image: 'tuerca/CIEGAS.png',
        sizes: ['6MM (20uni)', '9MM (20uni)', '10MM (20uni)', '12MM (20uni)']
    },
    // TUERCAS
    'tornillo-flange-hexagonal-5mm': {
        title: 'Tornillo Flange hexagonal 5mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/5 MM ROSCA TOTAL LLAVE 8.png',
        sizes: ['5x10MM (50uni)', '5x15MM (50uni)', '5x20MM (50uni)', '5x25MM (50uni)', '5x30MM (50uni)', '5x35MM (50uni)']
    },
    'tornillo-flange-hexagonal-6mm': {
        title: 'Tornillo Flange hexagonal 6mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/6 MM ROSCA TOTAL IRIS LLAVE 10.png',
        sizes: ['6x8MM (50uni)', '6x10MM (50uni)','6x12MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)', '6x35MM (50uni)', '6x40MM (50uni)', '6x45MM (50uni)', '6x50MM (50uni)', '6x60MM (50uni)']
    },
    'tornillo-flange-hexagonal-8mm': {
        title: 'Tornillo Flange hexagonal 8mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/8 MM ROSCA PARCIAL LLAVE 12.png',
        sizes: ['8x12MM (50uni)', '8x15MM (50uni)', '8x20MM (50uni)', '8x25MM (50uni)', '8x30MM (50uni)', '8x35MM (30uni)', '8x40MM (30uni)', '8x45MM (30uni)', '8x50MM (30uni)', '8x55MM (30uni)', '8x60MM (30uni)', '8x70MM (30uni)', '8x80MM (20uni)', '8x90MM (20uni)', '8x100MM (20uni)', '8x110MM (10uni)', '8x120MM (10uni)']
    },
    'tornillo-flange-hexagonal-10mm': {
        title: 'Tornillo Flange hexagonal 10mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/10 MM R.P. LLAVE 14 1.25.png',
        sizes: ['10x15MM (30uni)', '10x20MM (30uni)', '10x25MM (30uni)', '10x30MM (30uni)', '10x35MM (20uni)', '10x40MM (20uni)', '10x45MM (20uni)', '10x50MM (20uni)', '10x60MM (20uni)', '10x70MM (20uni)', '10x80MM (20uni)', '10x90MM (20uni)', '10x100MM (20uni)', '10x110MM (20uni)', '10x120MM (20uni)']
    },
    'tornillo-flange-ep': {
        title: 'Tornillo Flange EP',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/tornillospor.jpg',
        sizes: ['6x10MM (30uni)', '6x12MM (30uni)', '6x15MM (30uni)', '6x20MM (30uni)', '6x25MM (30uni)', '6x30MM (30uni)', '6x35MM (30uni)', '6x40MM (30uni)', '6x45MM (30uni)', '6x50MM (30uni)', '6x55MM (30uni)', '6x60MM (30uni)', '6x65MM (30uni)', '6x70MM (30uni)', '6x80MM (20uni)', '6x90MM (10uni)', '6x100MM (10uni)']
    },
    'tornillo-paragua': {
        title: 'Tornillo Paragua Phillips 5mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/TORNILLOPARAGUA.png',
        sizes: ['6x10MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)']
    },
    'tornillo-alleen-ep': {
        title: 'Tornillo Allen EP',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/ALLEN EP CROMADO.png',
        sizes: ['5x10MM (30uni)', '5x15MM (30uni)', '6x10MM (30uni)', '6x15MM (30uni)', '6x20MM (30uni)', '6x25MM (30uni)']
    },
    'tornillo-lenteja': {
        title: 'Tornillo lenteja cromado',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/LENTEJA PHILIPS CROMADO.png',
        sizes: ['5x10MM (50uni)', '5x12MM (50uni)', '5x15MM (50uni)', '5x20MM (50uni)', '5x25MM (50uni)', '5x30MM (50uni)']
    },
    'tornillo-hexagonal-milimetrico-llave-13': {
        title: 'Tornillo hexagonal milimétrico llave 13',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/ROSCA TOTAL 8.8 LLAVE 13.png',
        sizes: ['8x50MM (30uni)', '8x55MM (30uni)', '8x60MM (30uni)', '8x70MM (30uni)', '8x80MM (30uni)']
    },
    'tornillo-hexagonal-milimetrico-llave-12': {
        title: 'Tornillo hexagonal milimétrico llave 12',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/ROSCA TOTAL 10.9 LLAVE 12.png',
        sizes: ['8x15MM (50uni)', '8x20MM (50uni)', '8x25MM (50uni)', '8x30MM (50uni)', '8x35MM (30uni)', '8x40MM (30uni)', '8x45MM (30uni)', '8x50MM (30uni)', '8x55MM (30uni)', '8x60MM (30uni)']
    },
    'tornillo-hexagonal-milimetrico-especial-7mm': {
        title: 'Tornillo hexagonal milimétrico especial 7mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/ESPECIAL 7 MM.png',
        sizes: ['7x15MM (30uni)', '7x20MM (30uni)', '7x25MM (30uni)', '7x30MM (30uni)', '7x35MM (30uni)', '7x40MM (30uni)']
    },
    'tornillo-hexagonal-milimetrico-6mm': {
        title: 'Tornillo hexagonal milimétrico 6mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/HEXAGONAL 6 MM.png',
        sizes: ['6x10MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)', '6x35MM (30uni)', '6x40MM (30uni)']
    },
    'tornillo-hexagonal-milimetrico-10mm': {
        title: 'Tornillo hexagonal milimétrico 10mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/10 MM ROSCA PARCIAL 10.9 LLAVE 14.png',
        sizes: ['10x20MM (30uni)', '10x25MM (30uni)', '10x30MM (30uni)', '10x35MM (30uni)', '10x40MM (30uni)', '10x45MM (30uni)', '10x50MM (20uni)', '10x55MM (20uni)', '10x60MM (20uni)', '10x70MM (20uni)', '10x80MM (20uni)', '10x90MM (20uni)', '10x100MM (20uni)']
    },
    'tornillo-bristol-5mm': {
        title: 'Tornillo Bristol 5mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/BRISTROL.png',
        sizes: ['5x10MM (50uni)', '5x12MM (50uni)', '5x15MM (50uni)', '5x20MM (50uni)', '5x25MM (50uni)', '5x30MM (50uni)', '5x35MM (50uni)', '5x40MM (50uni)', '5x45MM (50uni)', '5x50MM (50uni)']
    },
    'tornillo-bristol-6mm': {
        title: 'Tornillo Bristol 6mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/BRISTROL.png',
        sizes: ['6x10MM (50uni)', '6x12MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)', '6x35MM (30uni)', '6x40MM (30uni)', '6x45MM (30uni)', '6x50MM (30uni)', '6x55MM (30uni)', '6x60MM (30uni)', '6x65MM (30uni)', '6x70MM (30uni)', '6x75MM (30uni)']
    },
    'tornillo-bristol-8mm': {
        title: 'Tornillo Bristol 8mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/BRISTROL.png',
        sizes: ['8x10MM (50uni)', '8x15MM (50uni)', '8x20MM (50uni)', '8x25MM (50uni)', '8x30MM (50uni)', '8x35MM (30uni)', '8x40MM (30uni)', '8x45MM (30uni)', '8x50MM (30uni)', '8x55MM (30uni)', '8x60MM (30uni)', '8x70MM (20uni)', '8x80MM (20uni)', '8x90MM (20uni)', '8x100MM (20uni)']
    },
    'tornillo-cilindro-phillips-4mm': {
        title: 'Tornillo Cilindro Phillips 4mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/4 MM ROSCA TOTAL.png',
        sizes: [ '4x10MM (50uni)', '4x12MM (50uni)', '4x15MM (50uni)', '4x20MM (50uni)', '4x25MM (50uni)', '4x30MM (50uni)', '4x35MM (30uni)', '4x40MM (30uni)', '4x45MM (30uni)', '4x50MM (30uni)']
    },
    'tornillo-cilindro-phillips-5mm': {
        title: 'Tornillo Cilindro Phillips 5mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/4 MM ROSCA TOTAL.png',
        sizes: [ '5x10MM (50uni)', '5x12MM (50uni)', '5x15MM (50uni)', '5x20MM (50uni)', '5x25MM (50uni)', '5x30MM (50uni)', '5x35MM (30uni)', '5x40MM (30uni)', '5x45MM (30uni)', '5x50MM (30uni)', '5x60MM (30uni)', '5x70MM (30uni)']
    },
    'tornillo-cilindro-phillips-6mm': {
        title: 'Tornillo Cilindro Phillips 6mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/4 MM ROSCA TOTAL.png',
        sizes: [ '6x10MM (50uni)', '6x12MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)', '6x35MM (30uni)', '6x40MM (30uni)', '6x45MM (30uni)', '6x50MM (30uni)', '6x60MM (30uni)',  '6x70MM (30uni)']
    },
    'tornillo-conico-avellanado-phillips-4mm': {
        title: 'Tornillo Cónico Avellanado Phillips 4mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/AVELLANADO 4 MM ROSCA TOTAL.png',
        sizes: [ '4x10MM (50uni)', '4x12MM (50uni)', '4x15MM (50uni)', '4x20MM (50uni)']
    },
    'tornillo-conico-avellanado-phillips-5mm': {
        title: 'Tornillo Cónico Avellanado Phillips 5mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.', 
        image: 'tornillos/AVELLANADO 5 MM ROSCA TOTAL.png',
        sizes: [ '5x10MM (50uni)', '5x12MM (50uni)', '5x15MM (50uni)', '5x20MM (50uni)', '5x25MM (50uni)', '5x30MM (50uni)']
    },
    'tornillo-conico-avellanado-phillips-6mm': {
        title: 'Tornillo Cónico Avellanado Phillips 6mm',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/AVELLANADO 6 MM ROSCA TOTAL.png',
        sizes: [ '6x10MM (50uni)', '6x15MM (50uni)', '6x20MM (50uni)', '6x25MM (50uni)', '6x30MM (50uni)']
    },
    'tornillo-goloso-cabeza-lenteja-#8': {
        title: 'Tornillo Goloso Cabeza Lenteja #8',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/GOLOSO LAMINA 8.png',
        sizes: [ '8x1/2MM (50uni)', '8x5/8MM (50uni)', '8x3/4MM (50uni)', '8x1,5MM (50uni)']
    },
    'tornillo-goloso-cabeza-lenteja-#10': {
        title: 'Tornillo Goloso Cabeza Lenteja #10',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/GOLOSO LAMINA 8.png',
        sizes: [ '10x1/2MM (50uni)', '10x5/8MM (50uni)', '10x3/4MM (50uni)', '10x1,5MM (50uni)']
    },
    'tornillo-goloso-cabeza-lenteja-#12': {
        title: 'Tornillo Goloso Cabeza Lenteja #12',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/GOLOSO LAMINA 8.png',
        sizes: [ '12x1/2MM (50uni)', '12x5/8MM (50uni)', '12x3/4MM (50uni)', '12x1,5MM (50uni)']
    },
    'tornillo-goloso-cabeza-lenteja-#14': {
        title: 'Tornillo Goloso Cabeza Lenteja #14',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/GOLOSO LAMINA 8.png',
        sizes: [ '14x5/8MM (50uni)', '14x3/4MM (50uni)', '14x1,5MM (50uni)']
    },
    'tornillo-con-buje': { 
        title: 'Tornillo con Buje 5MM-6MM',
        description: 'Tornillo para motocicletas, diseñado para ofrecer seguridad.',
        image: 'tornillos/TORNILLOBUJE.png',
        sizes: [ '5x12MM (20uni)', '5x15MM (20uni)', '5x20MM (20uni)', '5x25MM (20uni)', '6x13MM (20uni)', '6x15MM (20uni)', '6x19MM (20uni)', '6x25MM (20uni)']
    },
    // CHAPETAS
    'chapeta-tornillo-goloso': {
        title: 'Chapeta Tornillo Goloso',
        description: 'Chapeta para motocicletas, diseñada para ofrecer seguridad.',
        image: 'chapetas/CHAPETA TORNILLO GOLOSO.png',
        sizes: ['N8 Corta (30uni)', 'N8 Larga (30uni)', 'N10 Corta (30uni)', 'N10 Larga (30uni)', 'N12 Corta (30uni)', 'N12 Larga (30uni)']
    },
    'chapeta-especial': {
        title: 'Chapeta Especial',
        description: 'Chapeta para motocicletas, diseñada para ofrecer seguridad.',
        image: 'chapetas/CHAPETAESPECIAL.png',
        sizes: ['N5 Corta (20uni)', 'N5 Larga (20uni)', 'N6 Corta (20uni)', 'N6 Larga (20uni)', 'Chapeta Farola Honda (20uni)']
    },
    'chapeta-milimetrica': {
        title: 'Chapeta Milimétrica',
        description: 'Chapeta para motocicletas, diseñada para ofrecer seguridad.',
        image: 'chapetas/CHAPETAMILIMETRICA.png',
        sizes: ['N4 Corta (20uni)', 'N5 Corta (20uni)', 'N5 Larga (20uni)', 'N6 Corta (20uni)', 'N6 Larga (20uni)', 'N8 Corta (20uni)', 'N8 Larga (20uni)']
    },
    // TORNILLOS ESPECIALES
    'tornillo-cadenilla-tvs': {
        title: 'Tornillo Cadenilla TVS',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOCADENILLA.png',
        sizes: ['Único (5uni)']
    },
    'tornillo-manigueta': {
        title: 'Tornillo Manigueta',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOMANIGUETA.png',
        sizes: ['5MM BOXER-DISCOVER (10uni)', '5MM Pulsar izq (10uni)', '6MM Pulsar der (10uni)', 'Fz-Pulsar (10uni)', '6MM DT (10uni)', '5MM TT (10uni)', 'GN 125 (10uni)','6MM TS (10uni)', '6MM Honda izq (10uni)', '6MM Evo der (10uni)', '6MM NKD (10uni)', '5MM AX100 (10uni)', '6MM Eco, C90, XL 10 (10uni)', 'yamaha (10uni)', '6MM Rx (10uni)']
    },
    'tornillo-bamba-de-lubricacion': {
        title: 'Tornillo Bamba de Lubricación',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOLUBRICACION.png',
        sizes: ['BOXER 8MM (10uni)', 'AKT 10MM (10uni)']
    },
    'tornillo-tapa': {
        title: 'Tornillo Tapa',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOTAPAAKT.png',
        sizes: ['CR4 5X20 (10uni)']
    },
    'tornillo-mordaza': {
        title: 'Tornillo Mordaza',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOS PASADOR MORDAZA.png',
        sizes: ['Universal (5uni)', 'Xtz-best (5uni)', 'Akt Universal (5uni)', 'Pulsar 125 (5uni)', 'TT (5uni)', 'NKD Corto (5uni)', 'Honda universal (5uni)','Invicta (5uni)', 'Xt Xm (5uni)', 'NKD Largo (5uni)', 'Pulsar ns, FZ 180 (5uni)', 'NS Nueva (5uni)', 'NS Vieja (5uni)', 'TS (5uni)', 'YBR Libero crypton (5uni)', 'NS Vieja (5uni)', 'RX 115 (5uni)', 'NMax (5uni)']
    },
    'tornillo-portabanda': {
        title: 'Tornillo Portabanda',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOPORTABANDA.png',
        sizes: ['N8 Corto (20uni)', 'N8 Medio (20uni)', 'N8 Largo (20uni)', '10x35 boxer (20uni)']
    },
    'tornillo-pata-lateral': {
        title: 'Tornillo Pata Lateral',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOPATALATERAL.png',
        sizes: ['N10 Corto (20uni)', 'N10 Largo (20uni)', '10 A 8 (20uni)']
    },
    'grapa-para-defensa': {
        title: 'Grapa para defensa',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/GUIAPARADEFENSA.png',
        sizes: ['8MM X 2 1/4" X 1 1/2"(5uni)', '8MM X 2 1/4" X 2" (6uni)',]
    },
    'tornillo-pasante-motor': {
        title: 'Tornillo Pasante Motor',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOPASANTEMOTOR.png',
        sizes: [ '8x130 (5uni)', '8x140 (5uni)', '8x150 (5uni)', '8x160 (5uni)', '8x170 (5uni)', '8x180 (5uni)', '8x190 (5uni)', '8x200 (5uni)', '8x210 (5uni)', '8x220 (5uni)']
    },
    'tornillo-balancin': {
        title: 'Tornillo Balancín',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOBALANCIN.png',
        sizes: ['Auteco Eco 100 (10uni)','Auteco Deluxe (10uni)','Auteco C70 C90 (10uni)','Akt (10uni)']
    },
    'tornillo-barra-telescopica': {
        title: 'Tornillo Barra Telescópica',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TORNILLOBARRATELESCOPICA.png',
        sizes: ['Universal (10uni)','AKT (10uni)']
    },
    'adaptador-de-espejo': {
        title: 'Adaptador de Espejo',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/ADAPTADORDEESPEJO.png',
        sizes: [
            '10 der / 10 izq (5uni)',
            '10 izq / 10 der (5uni)',
            '10 der / 10 der (5uni)',
            '8 der / 7/16 rf (5uni)',
            '10 der / 7/16 rf (5uni)',
            '8 der / 8 der (5uni)',
            '8 izq / 8 izq (5uni)',
            '10 der / 8 izq (5uni)',
            '10 izq / 8 der (5uni)',
            '8 izq / 10 der (5uni)',
            '8 izq / 7/16rf (5uni)',
            '8 izq / 7/16ro (5uni)',
            '8 der / 10 der (5uni)',
            '10 der / 8 der (5uni)',
            '10 izq / 7/16 ro (5uni)',
            '8 der  /10 izq (5uni)',
            '8 der / 7/16 ro (5uni)',
            '8 izq / 8 der (5uni)',
            '8 der / 8 izq (5uni)',
            '10izq / 10izq (5uni)',
            '10 izq / 7/16 rf (5uni)',
            '10 der / 7/16 ro (5uni)'
        ]
    },
    'tuerca-de-cigueñal-derecha': {
        title: 'Tuerca de Cigueñal Derecha',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TUERCACIGUEÑAL.png',
        sizes: ['Pulsar derecha (20uni)']
    },
    'tuerca-para-freno': {
        title: 'Tuerca para varilla de Freno',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/TUERCACIGUEÑAL1.png',
        sizes: ['5MM (20uni)', '6MM (20uni)', '7MM (20uni)', '8MM (20uni)']
    },
    'bulon-varilla-de-freno': {
        title: 'Bulon varilla de Freno',
        description: 'Lujos para motocicletas, diseñados para ofrecer un estilo elegante.',
        image: 'tornillosespeciales/BULLONFRENO.png',
        sizes: ['5MM (10uni)', '6MM (10uni)', '7MM (10uni)', '8MM (10uni)']
    },
    'kit-varilla-de-freno': {
        title: 'Kit varilla de Freno',
        description: 'Esparragos para motocicletas.',
        image: 'tornillosespeciales/KITVARILLAFRENO.png',
        sizes: ['5MM (5uni)', '6MM (5uni)', '7MM (5uni)', '8MM (5uni)']
    },
    // TORNILLOS ESPECIALES
    'esparragos-combinados': {
        title: 'Esparragos Combinados',
        description: 'Esparragos para motocicletas.',
        image: 'esparragos/ESPARRAGOS10.png',
        sizes: [
            '1/4 X 6 X 40 (5uni)',
            '1/4 X 6 X 50 (5uni)',
            '1/4 X 6 X 60 (5uni)',
            '8 X 3/8 X 40 (5uni)',
            '18 X 3/8 X 50 (5uni)',
            '8 X 3/8 X 60 (5uni)',
            '8 X 7/16 X 40 (5uni)',
            '8 X 7/16 X 50 (5uni)',
            '8 X 7/16 X 60 (5uni)',
            '8 X 1/2 X 40 (5uni)',
            '8 X 1/2 X 50 (5uni)',
            '8 X 1/2 X 60 (5uni)',
            '6 X 8 X 40 (5uni)',
            '6 X 8 X 45 (5uni)',
            '6 X 8 X 50 (5uni)',
            '6 X 8 X 60 (5uni)'
        ]
    },
    'esparragos-parejos': {
        title: 'Esparragos parejos',
        description: 'Esparragos para motocicletas.',
        image: 'esparragos/ESPARRAGOS8.png',
        sizes: [
            '6 X 30 (10uni)',
            '6 X 35 (10uni)',
            '6 X 40 (10uni)',
            '6 X 45 (10uni)',
            '6 X 50 (10uni)',
            '6 X 60 (10uni)',
            '6 X 60 (10uni)',
            '6 X 80 (10uni)',
            '6 X130 (5uni)',
            '8 X 30 (10uni)',
            '8 X 35 (10uni)',
            '8 X 40 (10uni)',
            '8 X 45 (10uni)',
            '8 X 50 (10uni)',
            '8 X 60 (10uni)',
            '8 X 70 (10uni)',
            '8 X 80 (10uni)',
            '8 X 140 (5uni)',
            '10 X 30 (5uni)',
            '10 X 35 (5uni)',
            '10 X 40 (5uni)',
            '10 X 45 (5uni)',
            '10 X 50 (5uni)',
            '10 X 60 (5uni)',
            '10 X 70 (5uni)',
            '10 X 80 (5uni)'
        ]
    },
    'perno-moto-carro': {
        title: 'Perno moto carro',
        description: 'Perno moto carro.',
        image: 'esparragos/PERNOMOTOCARRO.png',
        sizes: ['10x30 (20uni)', '10MM (20uni)']
    },
    'perno-moto-carguero': {
        title: 'Perno moto carguero',
        description: 'Perno moto carguero.',
        image: 'esparragos/ESPARRAGOMOTOCARGUERO.png',
        sizes: ['12x32 (20uni)', '12MM (20uni)']
    },
    //ARRANDELASGUIAS
    'guias-cilindro': {
        title: 'Guías Cilindro',
        description: 'Guías cilindro para motocicletas.',
        image: 'arandelas/GUIACILINDRO.png',
        sizes: ['UNICO (10uni)']
    },
    'uniones-cadena': {
        title: 'Uniones de Cadena',
        description: 'Uniones para cadenas de motocicletas.',
        image: 'arandelas/UNIONES DE CADENA.png',
        sizes: ['420H (10uni)', '428H (10uni)', '520H (10uni)']
    },
    'arandelas-piñon': {
        title: 'Arandelas Piñón',
        description: 'Arandelas para piñones de motocicletas.',
        image: 'arandelas/ARANDELASPIÑON.png',
        sizes: ['DT-AX (10uni)', 'BOXER (10uni)', 'YBR (10uni)', 'FZ (10uni)', 'GN125 (10uni)', 'HAYATE (10uni)', 'APACHE (10uni)', 'XT 660 (10uni)', 'SZR (10uni)', 'XL 125 (10uni)', 'ECO (10uni)',]
    },
    'arandelas-amplias': {
        title: 'Arandelas Amplias',
        description: 'Arandelas amplias para motocicletas.',
        image: 'arandelas/ARANDELASAMPLIAS.png',
        sizes: ['AA5 5MM (100uni)', 'AA6 6MM (100uni)', 'AA8 8MM(100uni)', 'AA10 10MM(100uni)', 'AA12 12MM(100uni)']
    },
    'arandelas-milimetricas': {
        title: 'Arandelas Milimétricas AP',
        description: 'Arandelas milimétricas para motocicletas.',
        image: 'arandelas/ARANDELASMILIMETRICAS.png',
        sizes: ['4MM (100uni)', '5MM (100uni)', '6MM (100uni)', '8MM (100uni)', '10MM (50uni)', '12MM (30uni)', '14MM (30uni)', '16MM (20uni)', '18MM (20uni)', '20MM (20uni)', '22MM (20uni)']
    },
    'arandelas-presion': {
        title: 'Arandelas de Presión W',
        description: 'Arandelas de presión para motocicletas.',
        image: 'arandelas/ARANDELAPRESION.png',
        sizes: ['5MM (100uni)', '6MM (100uni)', '8MM (100uni)', '10MM (50uni)', '12MM (30uni)', '14MM (20uni)']
    },
    'arandelas-cobre': {
        title: 'Arandelas de Cobre AC',
        description: 'Arandelas de cobre para motocicletas.',
        image: 'arandelas/ARANDELACOBRE.png',
        sizes: ['5MM (10uni)', '6MM (10uni)', '8MM (10uni)', '10MM (10uni)', '12MM (10uni)', '14MM (10uni)', '16MM (10uni)', '18MM (10uni)', '20MM (10uni)', '22MM (10uni)', '24MM (10uni)',
            '1/4" (10uni)', '5/16" (10uni)', '3/8" (10uni)', '7/16" (10uni)', '1/2" (10uni)', '9/16" (10uni)', '5/8" (10uni)', '3/4" (10uni)', '7/8" (10uni)', '1" (10uni)'
        ]
    },
    'arandelas-de-aluminio': {
        title: 'Arandelas de Aluminio AL',
        description: 'Arandelas de aluminio para motocicletas.',
        image: 'arandelas/ARANDELASDEALUMINIO.png',
        sizes: ['6MM (100uni)', '8MM (100uni)', '10MM (50uni)', '12MM (30uni)', '14MM (30uni)']
    },
    'arandelas-balancin': {
        title: 'Arandelas de Balancín',
        description: 'Arandelas de balancín para motocicletas.',
        image: 'arandelas/ARANDELASBALANCIN.png',
        sizes: ['BALAN (10uni)']
    },
    //RESORTES
    'pata-lateral-boxer': {
        title: 'Resorte Pata lateral Boxer',
        description: 'Resorte Pata Boxer Pulsar Win Discover Akt Eco.',
        image: 'resortes/RPB.png',
        sizes: ['Unica']
    },
    'pata-lateral-gn-gs-gixxer': {
        title: 'Resorte Pata Y Gato Gn Gs 125 Dr 200, Gixxer, Rtx150',
        description: 'Resorte Pata lateral GN125/GS125/Gixxer/DR200/RTX150.',
        image: 'resortes/RPGN.png',
        sizes: ['Unica']
    },
    'pata-lateral-akt-nkd-evo-cbr-kimko-vivas-cbz': {
        title: 'Resorte Pata Akt 125, Nkd Sl, Evo, Cbr, Kimko, Vivas, Cbz',
        description: 'Resorte Pata Akt 125, Nkd Sl, Evo, Cbr, Kimko, Vivas, Cbz',
        image: 'resortes/RPSL.png',
        sizes: ['Unica']
    },
    'pata-lateral-Fz-Ax-Rx-Libero-Cripton-Ts-C90': {
        title: 'Resorte Pata Libero Fz Ax Rx Libero Cripton Ts C90',
        description: 'Resorte Pata Libero Fz Ax Rx Libero Cripton Ts C90',
        image: 'resortes/RPFZ.png',
        sizes: ['Unica']
    },
    'pata-lateral-Szr-150-Xtz-125-150-Dr-Xr-Enduro': {
        title: 'Resorte Pata Szr 150, Xtz 125, 150 Dr, Xr, Enduro',
        description: 'Resorte Pata Szr 150, Xtz 125, 150 Dr, Xr, Enduro.',
        image: 'resortes/RPSZR.png',
        sizes: ['Unica']
    },
    'pata-lateral-dt': {
        title: 'Resorte pata lateral Dt',
        description: 'Resorte pata lateral Dt para motocicletas.',
        image: 'resortes/RPDT.png',
        sizes: ['Unica']
    },
    'pedal-freno-discover': {
        title: 'Resorte Pedal Freno Discover, Pulsar 135 - 180',
        description: 'Resorte Pedal Freno Discover, Pulsar 135 - 180.',
        image: 'resortes/RPFD.png',
        sizes: ['Unica']
    },
    'pedal-freno-honda': {
        title: 'Resorte Pedal Honda Cbz Cbf Eco',
        description: 'Resorte Pedal Honda Cbz Cbf Eco.',
        image: 'resortes/RPFH.png',
        sizes: ['Unica']
    },
    'pedal-freno-evo': {
        title: 'Resorte Pedal Freno Evo, Ne 125 - 150, Akt 110, Tvs 160',
        description: 'Resorte Pedal Freno Evo, Ne 125 - 150, Akt 110, Tvs 160.',
        image: 'resortes/RPFE.png',
        sizes: ['Unica']
    },
    'pedal-freno-fz': {
        title: 'Resorte Pedal Freno  Fz 16, Szr, Fazer',
        description: 'Resorte Pedal Freno  Fz 16, Szr, Fazer.',
        image: 'resortes/RPFFZ.png',
        sizes: ['Unica']
    },
    'pedal-freno-akt125': {
        title: 'Resorte Pedal Freno Akt 125, Nkd Sl',
        description: 'Resorte Pedal Freno Akt 125, Nkd Sl.',
        image: 'resortes/RPFSL.png',
        sizes: ['Unica']
    },
    'pedal-freno-gn': {
        title: 'Resorte Pedal Freno Gn, Gs, Evo 125 1-2',
        description: 'Resorte Pedal Freno Gn, Gs, Evo 125 1-2.',
        image: 'resortes/RPFGN.png',
        sizes: ['Unica']
    },
    'pedal-freno-rpfb': {
        title: 'Resorte Pedal Freno Boxer Win Platino',
        description: 'Resorte Pedal Freno Boxer Win Platino.',
        image: 'resortes/RPFB.png',
        sizes: ['Unica']
    },
    'pedal-freno-ybr': {
        title: 'Resorte Pedal Freno Ybr Libero Crypton',
        description: 'Resorte Pedal Freno Ybr Libero Crypton.',
        image: 'resortes/RPFYBR.png',
        sizes: ['Unica']
    },
    'pedal-freno-eco': {
        title: 'Resorte Pedal Freno Ax 100, 115',
        description: 'Resorte Pedal Freno Ax 100, 115.',
        image: 'resortes/RPFAX.png',
        sizes: ['Unica']
    },
    'resorte-especial-rlv': {
        title: 'Resorte Especial larga vida',
        description: 'Resorte Especial larga vida.',
        image: 'resortes/RLV.png',
        sizes: ['Unica']
    },
    'resorte-especial-rae': {
        title: 'Resorte Para Varilla Freno',
        description: 'Resorte Para Varilla Freno.',
        image: 'resortes/RAE.png',
        sizes: ['Unica']
    },
    'resorte-especial-rvf': {
        title: 'Resorte Pera Freno Universal',
        description: 'Resorte Pera Freno Universal.',
        image: 'resortes/RVF.png',
        sizes: ['Unica']
    },
    'resorte-especial-rp': {
        title: 'Resorte Pedal Freno Gixxer',
        description: 'Resorte Pedal Freno Gixxer.',
        image: 'resortes/RP.png',
        sizes: ['Unica']
    },
    'pedal-especial-rlc': {
        title: 'Resorte Leva Clutch Pulsar 180',
        description: 'Resorte Leva Clutch Pulsar 180.',
        image: 'resortes/RLC.png',
        sizes: ['Unica']
    },
    'pedal-especial-rga': {
        title: 'Resorte Gato Central Auteco',
        description: 'Resorte Gato Central Auteco.',
        image: 'resortes/RGA.png',
        sizes: ['Unica']
    },
    'pedal-especial-cg': {
        title: 'Resorte Gato Akt Sl,Nkd',
        description: 'Resorte Gato Akt Sl,Nkd.',
        image: 'resortes/RGSL.png',
        sizes: ['Unica']
    },
    'pin-de-ojo': {
        title: 'Pin de ojo',
        description: 'Pin de ojo.',
        image: 'resortes/PINDEOJO.png',
        sizes: ['Primario (20uni)','Araña clutch (20uni)','Piñon loco y salida (20uni)','Crank Yamaha (20uni)','Eje crack interno (20uni)','Campana Honda (10uni)','Campana akt (10uni)']
    },
    'pin-medialuna': {
        title: 'Pin medialuna',
        description: 'Pin medialuna.',
        image: 'resortes/PINMEDIALUNA.png',
        sizes: ['Agujas carburador (20uni)','Automatico Fz(20uni)','Automatico Suzuki (20uni)','Crank DT (20uni)','Selectro Cambios RX (20uni)','Pata RX (10uni)','Pata DT (10uni)']
    },
    'pines-telescopicos': {
        title: 'Pin telescópico',
        description: 'Pin telescópico.',
        image: 'resortes/PINTELESCOPIO.png',
        sizes: ['FZ (20uni)','Pulsar (20uni)']
    },
    'chavetta': {
        title: 'Chavetta',
        description: 'Chavetta.',
        image: 'resortes/CHAVETTA.png',
        sizes: ['1/16 x 1/2" (50uni)','1/16 x 1" (50uni)','3/32 x 1" (50uni)','1/8 x 1" (50uni)']
    },
    'pin-rr': {
        title: 'Pin RR',
        description: 'Pin RR.',
        image: 'resortes/PINRR.png',
        sizes: ['Plano (10uni)','Doblado (10uni)']
    },
    'pin-plastico': {
        title: 'Pin plástico',
        description: 'Pin plástico.',
        image: 'resortes/PINPLASTICO.png',
        sizes: ['Pequeño (20uni)','Mediano (20uni)','Grande (20uni)']
    },
    //FUELLOS Y CAUCHOS
    'fuelle-delantero': {
        title: 'Fuelle delantero PAR',
        description: 'Fuelle delantero para motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/FUELLES.png',
        sizes: ['BROSS', 'DT', 'AKT', 'PULSAR/GN', 'AX', 'BOXER', 'DISCOVER', 'BWS', 'ENDURO']
    },
    'caucho-pasaguayas': {
        title: 'Caucho pasaguayas 5uni',
        description: 'Caucho pasaguayas para motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPASAGUAYAS.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-para-crank': {
        title: 'Caucho para crank 5uni',
        description: 'Caucho para crank de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPARACRANK.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-para-palanca-cambio': {
        title: 'Caucho para palanca de cambio 5uni',
        description: 'Caucho para palanca de cambio de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPARAPALANCACAMBIO.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-para-palanca-cambio-curvo': {
        title: 'Caucho para palanca de cambios curvo 5uni',
        description: 'Caucho para palanca de cambios curvo de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPARAPALANCACAMBIOCURVO.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-para-manigueta-colores': {
        title: 'Caucho para manigueta colores 5uni',
        description: 'Caucho para manigueta de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOMANIGUETA.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-para-manigueta-liso': {
        title: 'Caucho para manigueta liso 5uni',
        description: 'Caucho para manigueta de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOMANIGUETA.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-protector-palanca': {
        title: 'Caucho protector de palanca 5uni',
        description: 'Caucho protector de palanca de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPROTECTORDEPALANCA.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-protector': {
        title: 'Caucho protector 5uni',
        description: 'Caucho protector de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPROTECTOR.png',
        sizes: ['Roja', 'Azul', 'Negro', 'Gris', 'Naranja', 'Amarillo', 'Verde', 'Morado', 'Rosado', 'Verde Neon']
    },
    'caucho-pasaguayas-2': {
        title: 'Caucho pasaguayas 5uni',
        description: 'Caucho pasaguayas 2 de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOPASAGUAYAS2.png',
        sizes: ['Mediano', 'Doble NKD 125']
    },
    'correas-bateria': {
        title: 'Correas de batería 5uni',
        description: 'Correas de batería de motocicletas, diseñadas para ofrecer un estilo elegante.',
        image: 'cauchos/CORREASBATERIA.png',
        sizes: ['14CM', '18CM', '21CM']
    },
    'caucho-reposapies': {
        title: 'Caucho reposapies delantero PAR',
        description: 'Caucho reposapies de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/CAUCHOREPOSAPIES.png',
        sizes: ['Universal', 'Akt 125', 'Akt 110', 'GS 125', 'Pulsar', 'Boxer', 'Eco', 'Libero', 'AX 100 115 COLORES']
    },
    'caucho-reposapies-traseros': {
        title: 'Caucho reposapies traseros PAR',
        description: 'Caucho reposapies traseros de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/REPOSAPIESTRASERO.png',
        sizes: ['Negro']
    },
    'deslizador-cadena': {
        title: 'Deslizador de cadena',
        description: 'Deslizador de cadena de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/DESLIZADOR CADENA.png',
        sizes: ['AKT Unidad']
    },
    'guarda-polvos': {
        title: 'Guarda polvos',
        description: 'Guarda polvos de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/GUARDAPOLVOS.png',
        sizes: ['En pasta', 'Sin marca de moto', 'Marca de moto', 'Refuerzo de acero', 'Suzuki kit del/tras']
    },
    'pulpos': {
        title: 'Pulpos',
        description: 'Pulpos de motocicletas, diseñado para ofrecer un estilo elegante.',
        image: 'cauchos/PULPOS.png',
        sizes: ['Malla tejida', 'Malla caucho', 'Plano caucho', 'Redondo caucho']
    },
    //FUELLOS Y CAUCHOS
    'caucho-tapa-lateral': {
        title: 'Caucho tapa lateral',
        description: 'Cauchos internos para motocicletas, diseñados para ofrecer seguridad.',
        image: 'cauchosinternos/CAUCHOTAPALATERAL.png',
        sizes: ['GN,AX,AKT (50uni)', 'DT,RX (50uni)', 'Discover, pulsar (50uni)', 'NS,Exosto (50uni)', 'Boxer,Pulsar,Discover (50uni)', 'Guarda barros (50uni)', 'Ovalado, Akt corto (50uni)', 'Akt largo 125,Tt,Xl 250 (50uni)', 'NKD (50uni)', 'Gs, Suzuki (50uni)', 'Con buje (50uni)', 'Sin buje carenaje (50uni)', 'Sin buje carnaje cruz (50uni)']
    },
    'caucho-sillin-gato': {
        title: 'Caucho',
        description: 'Cauchos internos para motocicletas, diseñados para ofrecer seguridad.',
        image: 'cauchosinternos/CAUCHOSILLIN.png',
        sizes: ['Sillin Gs grande (20uni)', 'Sillin Muescado (20uni)', 'Sillin Acanalado (20uni)', 'Sillin gn (20uni)', 'Burro Bws, Auteco, Boxer, Pulsar (20uni)', 'Gato central agility (20uni)', 'Burro alto (30uni)', 'Burro corto (30uni)', 'Sillin, Gato pulsar corto (30uni)', 'Sillin auteco/nkd (30uni)']
    },
    'caucho-varios': {
        title: 'Cauchos varios',
        description: 'Cauchos internos para motocicletas, diseñados para ofrecer seguridad.',
        image: 'cauchosinternos/CAUCHOSVARIOS.png',
        sizes: ['Tapa cadena eco (20uni)', 'Caucho antivibrante (10 juegos)', 'Kit de farola AKT (5 juegos)', 'Kit de mordaza universal (5 juegos)', 'Caucho tapa cadena (20uni)', 'Combo tornillo carenaje (20uni)', 'cauchos maletero (30uni)', 'cauchos tacometro (30uni)', 'cauchos flauta cadenilla (20uni)']
    },
    'caucho-para-tanque': {
        title: 'Caucho',
        description: 'Cauchos internos para motocicletas, diseñados para ofrecer seguridad.',
        image: 'cauchosinternos/CAUCHOSTANQUE.png',
        sizes: ['tanque Buje Gn 125, Suzuki (20unid)', 'Exosto ns200 (20unid)', 'Tope manubrio largo (50unid)', 'tope manubrio interno auteco (50uni)', 'Amortiguador 4 tiempos (30uni)', 'Amortiguador 2 tiempos (30uni)', 'Tanque Dt (10uni)', 'Tanque Boxer, Pulsar (10uni)', 'Tanque Ax, Gn (10uni)', 'Tanque RX (10uni)', 'Tanque Akt, XI (10uni)']
    },
    'caucho-campana': {
        title: 'Caucho campana 5uni',
        description: 'Cauchos internos para motocicletas, diseñados para ofrecer seguridad.',
        image: 'cauchosinternos/CAUCHOCAMPANA.png',
        sizes: ['campana 4 huecos bajaj', 'GN GS AKT EVO RTX RTR', 'AX100-115, AKT 100, VIVAS, GR80', '6 huecos pulsar, ns', 'Suzuki gixer', 'Boxer ct100 platino ', 'Exo 100, Akt 110, C70, C90', 'Honda cb 110, Ax4, wave', 'Honda cbf 125', 'cbf 150-160', 'Rx 100-115, Cirpton 115', 'FZ 2.0', 'Fz 1ibero 125', 'cr4', 'cr5', 'Gs Akt Evo 150', 'Akt Nkd' ]
    },
    //PARTES ACELERADOR
    'cable-de-guaya': {
        title: 'Cable de guaya',
        description: 'Partes de acelerador',
        image: 'guaya/GUAYA.png',
        sizes: ['Acelerador 1.5MT (20uni)', 'Closh 1.5MT  (20uni)', 'Ax 1.5MT (20uni)', 'Choke 2MT (20uni)', 'Acelerador 3MT (20uni)', 'Closh 3MT (20uni)']
    },
    'Tensor-de-guaya': {
        title: 'Tensor de Manigueta',
        description: 'Partes de acelerador',
        image: 'guaya/TENSORGUAYA.png',
        sizes: ['longitud 27mm (10uni)', 'Tensor Boxer/Ct-100/PLatino 35mm(10uni)']
    },
    'micos': {
        title: 'Caucho campana 5uni',
        description: 'Partes de acelerador',
        image: 'guaya/MICO.png',
        sizes: ['Mico acelerador 3/16 pequeño (100uni)', 'Mico clutch 1/4 mediano (100uni)', 'Mico clutch 5/16 Grande (100uni)', 'Mico acelerador (100uni)', 'Mico clutch 5/16 grande (100uni)' ]
    },
    //PDPP
    'punteras-defensas-pasta': {
        title: 'Punteras para defensas',
        description: 'Punteras para defensas',
        image: 'pdpp/PUNTERAS PASTA.png',
        sizes: ['Universal']
    },
    'punteras-defensa-colores': {
        title: 'Punteras para defensas ',
        description: 'Punteras para defensas',
        image: 'pdpp/PUNTERAS.png',
        sizes: ['Azul', 'Rojo', 'Negro', 'Verde']
    },
    'platinas': {
        title: 'Platina',
        description: 'Platinas para motocicletas, diseñadas para ofrecer seguridad.',
        image: 'pdpp/PLATINAS.png',
        sizes: ['Larga defensa universal', 'Corta Honda cb', 'Guarda barro trasero']
    },
    'porta-placas': {
        title: 'Porta placas',
        description: 'Porta placas para motocicletas, diseñadas para ofrecer seguridad.',
        image: 'pdpp/PORTAPLACAS.png',
        sizes: ['Metalica colores', 'Metálica Boxer', 'sencillo acero', 'plastico colores', 'acero nkd contramarcado']
    },
    // KITS PROCKET
    'STTRI': {
        title: 'STTRI',
        description: 'kitsprocket STTRI',
        image: 'kitsprocket/STTRI.png',
        sizes: ['Unica']
    },
    'SRX': {
        title: 'SRX',
        description: 'kitsprocket SRX',
        image: 'kitsprocket/SRX.png',
        sizes: ['Unica']
    },
    'SECO': {
        title: 'SECO',
        description: 'kitsprocket SECO',
        image: 'kitsprocket/SECO.png',
        sizes: ['Unica']
    },
    'SXL': {
        title: 'SXL',
        description: 'kitsprocket SXL',
        image: 'kitsprocket/SXL.png',
        sizes: ['Unica']
    },
    'SXTZ': {
        title: 'SXTZ',
        description: 'kitsprocket SXTZ',
        image: 'kitsprocket/SXTZ.png',
        sizes: ['Unica']
    },
    'SCT': {
        title: 'SCT',
        description: 'kitsprocket SCT',
        image: 'kitsprocket/SCT.png',
        sizes: ['Unica']
    },
    'SAX': {
        title: 'SAX',
        description: 'kitsprocket SAX',
        image: 'kitsprocket/SAX.png',
        sizes: ['Unica']
    },
    'SGN': {
        title: 'SGN',
        description: 'kitsprocket SGN',
        image: 'kitsprocket/SGN.png',
        sizes: ['Unica']
    },
    'SCR5': {
        title: 'SCR5',
        description: 'kitsprocket SCR5',
        image: 'kitsprocket/SCR5.png',
        sizes: ['Unica']
    },
    'SNKD': {
        title: 'SNKD',
        description: 'kitsprocket SNKD',
        image: 'kitsprocket/SNKD.png',
        sizes: ['Unica']
    },
    'SP180': {
        title: 'SP180',
        description: 'kitsprocket SP180',
        image: 'kitsprocket/SP180.png',
        sizes: ['Unica']
    },
    'SYBR': {
        title: 'SYBR',
        description: 'kitsprocket SYBR',
        image: 'kitsprocket/SYBR.png',
        sizes: ['Unica']
    },
    'SA110': {
        title: 'SA110',
        description: 'kitsprocket SA110',
        image: 'kitsprocket/SA110.png',
        sizes: ['Unica']
    },
    'SAX4': {
        title: 'SAX4',
        description: 'kitsprocket SAX4',
        image: 'kitsprocket/SAX4.png',
        sizes: ['Unica']
    },
    'SCB': {
        title: 'SCB',
        description: 'kitsprocket SCB',
        image: 'kitsprocket/SCB.png',
        sizes: ['Unica']
    },
    'SD1': {
        title: 'SD1',
        description: 'kitsprocket SD1',
        image: 'kitsprocket/SD1.png',
        sizes: ['Unica']
    },
    'SDT6': {
        title: 'SDT6',
        description: 'kitsprocket SDT6',
        image: 'kitsprocket/SDT6.png',
        sizes: ['Unica']
    },
    'SFZ1': {
        title: 'SFZ1',
        description: 'kitsprocket SFZ1',
        image: 'kitsprocket/SFZ1.png',
        sizes: ['Unica']
    },
    'SD': {
        title: 'SD',
        description: 'kitsprocket SD',
        image: 'kitsprocket/SD.png',
        sizes: ['Unica']
    },
    'SNS': {
        title: 'SNS',
        description: 'kitsprocket SNS',
        image: 'kitsprocket/SNS.png',
        sizes: ['Unica']
    },
    'SWAVE': {
        title: 'SWAVE',
        description: 'kitsprocket SWAVE',
        image: 'kitsprocket/SWAVE.png',
        sizes: ['Unica']
    },
    'SXR': {
        title: 'SXR',
        description: 'kitsprocket SXR',
        image: 'kitsprocket/SXR.png',
        sizes: ['Unica']
    },
    'SV80': {
        title: 'SV80',
        description: 'kitsprocket SV80',
        image: 'kitsprocket/SV80.png',
        sizes: ['Unica']
    },
    'SCBF': {
        title: 'SCBF',
        description: 'kitsprocket SCBF',
        image: 'kitsprocket/SCBF.png',
        sizes: ['Unica']
    },
    'SVIVA': {
        title: 'SVIVA',
        description: 'kitsprocket SVIVA',
        image: 'kitsprocket/SVIVA.png',
        sizes: ['Unica']
    },
    'STVS': {
        title: 'STVS',
        description: 'kitsprocket STVS',
        image: 'kitsprocket/STVS.png',
        sizes: ['Unica']
    },
    'SXCD': {
        title: 'SXCD',
        description: 'kitsprocket SXCD',
        image: 'kitsprocket/SXCD.png',
        sizes: ['Unica']
    },
    'SC': {
        title: 'SC',
        description: 'kitsprocket SC',
        image: 'kitsprocket/SC.png',
        sizes: ['Unica']
    },
    'SGI': {
        title: 'SGI',
        description: 'kitsprocket SGI',
        image: 'kitsprocket/SGI.png',
        sizes: ['Unica']
    },
    'SA160': {
        title: 'SA160',
        description: 'kitsprocket SA160',
        image: 'kitsprocket/SA160.png',
        sizes: ['Unica']
    },
    'SA200': {
        title: 'SA200',
        description: 'kitsprocket SA200',
        image: 'kitsprocket/SA200.png',
        sizes: ['Unica']
    },
    'SBAKT': {
        title: 'SBAKT',
        description: 'kitsprocket SBAKT',
        image: 'kitsprocket/SBAKT.png',
        sizes: ['Unica']
    },
    'SMRX': {
        title: 'SMRX',
        description: 'kitsprocket SMRX',
        image: 'kitsprocket/SMRX.png',
        sizes: ['Unica']
    },
    'SCR4': {
        title: 'SCR4',
        description: 'kitsprocket SCR4',
        image: 'kitsprocket/SCR4.png',
        sizes: ['Unica']
    },
    'SDR': {
        title: 'SDR',
        description: 'kitsprocket SDR',
        image: 'kitsprocket/SDR.png',
        sizes: ['Unica']
    },
    'SEVO': {
        title: 'SEVO',
        description: 'kitsprocket SEVO',
        image: 'kitsprocket/SEVO.png',
        sizes: ['Unica']
    },
    'SFZ2': {
        title: 'SFZ2',
        description: 'kitsprocket SFZ2',
        image: 'kitsprocket/SFZ2.png',
        sizes: ['Unica']
    },
    'SCB160': {
        title: 'SCB160',
        description: 'kitsprocket SCB160',
        image: 'kitsprocket/SCB160.png',
        sizes: ['Unica']
    },
    'SNEO': {
        title: 'SNEO',
        description: 'kitsprocket SNEO',
        image: 'kitsprocket/SNEO.png',
        sizes: ['Unica']
    },
    'STTR2': {
        title: 'STTR2',
        description: 'kitsprocket STTR2',
        image: 'kitsprocket/STTR2.png',
        sizes: ['Unica']
    },
    'SDT4': {
        title: 'SDT4',
        description: 'kitsprocket SDT4',
        image: 'kitsprocket/SDT4.png',
        sizes: ['Unica']
    },
    'SCBF150': {
        title: 'SCBF150',
        description: 'kitsprocket SCBF150',
        image: 'kitsprocket/SCBF150.png',
        sizes: ['Unica']
    },
    // LINEA DE PUFF
    'BASESPUFF': {
        title: 'Bases para puff',
        description: 'Bases para puff, corta, mediana y largo',
        image: 'lineadepuff/BASESPUFF.png',
        sizes: ['Corta', 'Mediana', 'Largo']
    },
    'REDONDOCORTO': {
        title: 'Redondo corto original',
        description: 'Redondo corto original',
        image: 'lineadepuff/REDONDOCORTO.png',
        sizes: ['Unica']
    },
    'REDONDOCORTOTORNASOL': {
        title: 'Redondo corto tornasol',
        description: 'Redondo corto tornasol',
        image: 'lineadepuff/REDONDOCORTOTORNASOL.png',
        sizes: ['Unica']
    },
    'REDONDOLARGO': {
        title: 'Redondo largo',
        description: 'Redondo largo',
        image: 'lineadepuff/REDONDOLARGO.png',
        sizes: ['Unica']
    },
    'REDONDOLARGOTORNASOL': {
        title: 'Redondo largo tornasol',
        description: 'Redondo largo tornasol',
        image: 'lineadepuff/REDONDOLARGOTORNASOL.png',
        sizes: ['Unica']
    },
    'RECTANGULOORIGINAL': {
        title: 'Rectangular original',
        description: 'Rectangular original',
        image: 'lineadepuff/RECTANGULOORIGINAL.png',
        sizes: ['Unica']
    },
    'RECTANGULOTORNASOL': {
        title: 'Rectangular tornasol',
        description: 'Rectangular tornasol',
        image: 'lineadepuff/RECTANGULOTORNASOL.png',
        sizes: ['Unica']
    },
    'CUADRADOORIGINAL': {
        title: 'Cuadrado original',
        description: 'Cuadrado original',
        image: 'lineadepuff/CUADRADOORIGINAL.png',
        sizes: ['Unica']
    },
    'CUADRADOTORNASOL': {
        title: 'Cuadrado tornasol',
        description: 'Cuadrado tornasol',
        image: 'lineadepuff/CUADRADOTORNASOL.png',
        sizes: ['Unica']
    },
    'PUFFCOLA': {
        title: 'Puff cola',
        description: 'Puff cola',
        image: 'lineadepuff/PUFFCOLA.png',
        sizes: ['Unica']
    },
    'DONASEXOSTO': {
        title: 'Donas exosto',
        description: 'Donas exosto',
        image: 'lineadepuff/DONASEXOSTO.png',
        sizes: ['Unica']
    },
    //herramientas
    'EMBUDO': {
        title: 'Embudos',
        description: 'Embudo grande, pequeño',
        image: 'herramientas/EMBUDO.png',
        sizes: ['Grande', 'Pequeño']
    },
    'GALGAS': {
        title: 'Galgas',
        description: 'Galgas',
        image: 'herramientas/GALGAS.png',
        sizes: ['Unica']
    },
    'COPAS': {
        title: 'Copas',
        description: 'Copas',
        image: 'herramientas/COPAS.png',
        sizes: ['Copa Y', 'Copa T']
    },
    'SUJETADOR': {
        title: 'Sujetador corona',
        description: 'Sujetador corona clutch boxer',
        image: 'herramientas/SUJETADOR.png',
        sizes: ['Unica']
    },
    'PESCADOR': {
        title: 'Pescador imantado',
        description: 'Pescador imantado',
        image: 'herramientas/PESCADOR.png',
        sizes: ['Unica']
    },
    'COPASTORRE': {
        title: 'Copas torre',
        description: 'Copas torre',
        image: 'herramientas/COPASTORRE.png',
        sizes: ['Discover AKT', 'Boxer, Pulsar']
    },
    'DESPEINADORDECADENA': {
        title: 'Despeinadores cadena',
        description: 'Despeinador de cadena',
        image: 'herramientas/DESPEINADORDECADENA.png',
        sizes: ['Marca Spartan', 'Chain Wrench']
    },
    'DESPEINADORDECADENILLA': {
        title: 'Despeinador cadenilla',
        description: 'Despeinador de cadenilla',
        image: 'herramientas/DESPEINADORDECADENILLA.png',
        sizes: ['Unica']
    },
    'O-RING': {
        title: 'O-rings',
        description: 'Caja de O-RING',
        image: 'herramientas/O-RING.png',
        sizes: ['Unica']
    },
    'O-RINGS': {
        title: 'O-RING',
        description: 'O-RING por aplicacion',
        image: 'herramientas/O-RINGS.png',
        sizes: ['Unica']
    },
    //LEVA
    'LDAX': {
        title: 'LDAX',
        description: 'kit leva LDAX',
        image: 'leva/LDAX.png',
        sizes: ['Unica']
    },
    'LDCB': {
        title: 'LDCB',
        description: 'kit Leva LDCB',
        image: 'leva/LDCB.png',
        sizes: ['Unica']
    },
    'LDECO': {
        title: 'LDECO',
        description: 'Kit leva LDECO',
        image: 'leva/LDECO.png',
        sizes: ['Unica']
    },
    'LDTVS': {
        title: 'LDTVS',
        description: 'Kit leva LDTVS',
        image: 'leva/LDTVS.png',
        sizes: ['Unica']
    },
    'LWAVE': {
        title: 'LWAVE',
        description: 'Kit leva LWAVE',
        image: 'leva/LWAVE.png',
        sizes: ['Unica']
    },
    'LDAX4': {
        title: 'LDAX4',
        description: 'Kit leva LDAX4',
        image: 'leva/LDAX4.png',
        sizes: ['Unica']
    },
    'LDCT': {
        title: 'LDCT',
        description: 'Kit leva LDCT',
        image: 'leva/LDCT.png',
        sizes: ['Unica']
    },
    'LTA110': {
        title: 'LTA110',
        description: 'Kit leva LTA110',
        image: 'leva/LTA110.png',
        sizes: ['Unica']
    },
    'LTAX': {
        title: 'LTAX',
        description: 'Kit leva LTAX',
        image: 'leva/LTAX.png',
        sizes: ['Unica']
    },
    'LTCT': {
        title: 'LTCT',
        description: 'Kit leva LTCT',
        image: 'leva/LTCT.png',
        sizes: ['Unica']
    },
    'LTCB': {
        title: 'LTCB',
        description: 'Kit leva LTCB',
        image: 'leva/LTCB.png',
        sizes: ['Unica']
    },
    'LTCR4': {
        title: 'LTCR4',
        description: 'Kit leva LTCR4',
        image: 'leva/LTCR4.png',
        sizes: ['Unica']
    },
    'LTCBF': {
        title: 'LTCBF',
        description: 'Kit leva LTCBF',
        image: 'leva/LTCBF.png',
        sizes: ['Unica']
    },
    'LTDI': {
        title: 'LTDI',
        description: 'Kit leva LTDI',
        image: 'leva/LTDI.png',
        sizes: ['Unica']
    },
    'LTCRY': {
        title: 'LTCRY',
        description: 'Kit leva LTCRY',
        image: 'leva/LTCRY.png',
        sizes: ['Unica']
    },
    'LTDT': {
        title: 'LTDT',
        description: 'Kit leva LTDT',
        image: 'leva/LTDT.png',
        sizes: ['Unica']
    },
    'LTD': {
        title: 'LTD',
        description: 'Kit leva LTD',
        image: 'leva/LTD.png',
        sizes: ['Unica']
    },
    'LTECO': {
        title: 'LTECO',
        description: 'Kit leva LTECO',
        image: 'leva/LTECO.png',
        sizes: ['Unica']
    },
    'LTEVO': {
        title: 'LTEVO',
        description: 'Kit leva LTEVO',
        image: 'leva/LTEVO.png',
        sizes: ['Unica']
    },
    'LTFLEX': {
        title: 'LTFLEX',
        description: 'Kit leva LTFLEX',
        image: 'leva/LTFLEX.png',
        sizes: ['Unica']
    },
    'LTFZ': {
        title: 'LTFZ',
        description: 'Kit leva LTFZ',
        image: 'leva/LTFZ.png',
        sizes: ['Unica']
    },
    'LTGS': {
        title: 'LTGS',
        description: 'Kit leva LTGS',
        image: 'leva/LTGS.png',
        sizes: ['Unica']
    },
    'LTHAYATE': {
        title: 'LTHAYATE',
        description: 'Kit leva LTHAYATE',
        image: 'leva/LTHAYATE.png',
        sizes: ['Unica']
    },
    'LTLIB': {
        title: 'LTLIB',
        description: 'Kit leva LTLIB',
        image: 'leva/LTLIB.png',
        sizes: ['Unica']
    },
    'LTYD': {
        title: 'LTYD',
        description: 'Kit leva LTYD',
        image: 'leva/LTYD.png',
        sizes: ['Unica']
    },
    'LTNEO': {
        title: 'LTNEO',
        description: 'Kit leva LTNEO',
        image: 'leva/LTNEO.png',
        sizes: ['Unica']
    },
    'LTNKD': {
        title: 'LTNKD',
        description: 'Kit leva LTNKD',
        image: 'leva/LTNKD.png',
        sizes: ['Unica']
    },
    'LTP180': {
        title: 'LTP180',
        description: 'Kit leva LTP180',
        image: 'leva/LTP180.png',
        sizes: ['Unica']
    },
    'LTRTR': {
        title: 'LTRTR',
        description: 'Kit leva LTRTR',
        image: 'leva/LTRTR.png',
        sizes: ['Unica']
    },
    'LTRX': {
        title: 'LTRX',
        description: 'Kit leva LTRX',
        image: 'leva/LTRX.png',
        sizes: ['Unica']
    },
    'LTSL': {
        title: 'LTSL',
        description: 'Kit leva LTSL',
        image: 'leva/LTSL.png',
        sizes: ['Unica']
    },
    'LTSZR': {
        title: 'LTSZR',
        description: 'Kit leva LTSZR',
        image: 'leva/LTSZR.png',
        sizes: ['Unica']
    },
    'LTTTR': {
        title: 'LTTTR',
        description: 'Kit leva LTTTR',
        image: 'leva/LTTTR.png',
        sizes: ['Unica']
    },
    'LTTVS': {
        title: 'LTTVS',
        description: 'Kit leva LTTVS',
        image: 'leva/LTTVS.png',
        sizes: ['Unica']
    },
    'LTWAVE': {
        title: 'LTWAVE',
        description: 'Kit leva LTWAVE',
        image: 'leva/LTWAVE.png',
        sizes: ['Unica']
    },
    'LTXR': {
        title: 'LTXR',
        description: 'Kit leva LTXR',
        image: 'leva/LTXR.png',
        sizes: ['Unica']
    },
    'LTXTZ1': {
        title: 'LTXTZ1',
        description: 'Kit leva LTXTZ1',
        image: 'leva/LTXTZ1.png',
        sizes: ['Unica']
    },
    'LTAG': {
        title: 'LTAG',
        description: 'Kit leva LTAG',
        image: 'leva/LTAG.png',
        sizes: ['Unica']
    },
    'LTAX4': {
        title: 'LTAX4',
        description: 'Kit leva LTAX4',
        image: 'leva/LTAX4.png',
        sizes: ['Unica']
    },
    'LTGN': {
        title: 'LTGN',
        description: 'Kit leva LTGN',
        image: 'leva/LTGN.png',
        sizes: ['Unica']
    },
    'LTGIX': {
        title: 'LTGIX',
        description: 'Kit leva LTGIX',
        image: 'leva/LTGIX.png',
        sizes: ['Unica']
    },
    'LTCB160': {
        title: 'LTCB160',
        description: 'Kit leva LTCB160',
        image: 'leva/LTCB160.png',
        sizes: ['Unica']
    },
    'LTXTZ2': {
        title: 'LTXTZ2',
        description: 'Kit leva LTXTZ2',
        image: 'leva/LTXTZ2.png',
        sizes: ['Unica']
    },
    'LTTTX': {
        title: 'LTTTX',
        description: 'Kit leva LTTTX',
        image: 'leva/LTTTX.png',
        sizes: ['Unica']
    },
    //TENSOR CADENA
    'TCSPORT': {
        title: 'TCSPORT',
        description: 'Tensor de cadena TCSPORT',
        image: 'tensordecadena/TCSPORT.png',
        sizes: ['Unica']
    },
    'TCAX': {
        title: 'TCAX',
        description: 'Tensor de cadena TCAX',
        image: 'tensordecadena/TCAX.png',
        sizes: ['Unica']
    },
    'TCBEST': {
        title: 'TCBEST',
        description: 'Tensor de cadena TCBEST',
        image: 'tensordecadena/TCBEST.png',
        sizes: ['Unica']
    },
    'TCCT': {
        title: 'TCCT',
        description: 'Tensor de cadena TCCT',
        image: 'tensordecadena/TCCT.png',
        sizes: ['Unica']
    },
    'TCBROSS': {
        title: 'TCBROSS',
        description: 'Tensor de cadena TCBROSS',
        image: 'tensordecadena/TCBROSS.png',
        sizes: ['Unica']
    },
    'TCCB110': {
        title: 'TCCB110',
        description: 'Tensor de cadena TCCB110',
        image: 'tensordecadena/TCCB110.png',
        sizes: ['Unica']
    },
    'TCCR4': {
        title: 'TCCR4',
        description: 'Tensor de cadena TCCR4',
        image: 'tensordecadena/TCCR4.png',
        sizes: ['Unica']
    },
    'TCCR5': {
        title: 'TCCR5',
        description: 'Tensor de cadena TCCR5',
        image: 'tensordecadena/TCCR5.png',
        sizes: ['Unica']
    },
    'TCCB190': {
        title: 'TCCB190',
        description: 'Tensor de cadena TCCB190',
        image: 'tensordecadena/TCCB190.png',
        sizes: ['Unica']
    },
    'TCCRY110': {
        title: 'TCCRY110',
        description: 'Tensor de cadena TCCRY110',
        image: 'tensordecadena/TCCRY110.png',
        sizes: ['Unica']
    },
    'TCECO': {
        title: 'TCECO',
        description: 'Tensor de cadena TCECO',
        image: 'tensordecadena/TCECO.png',
        sizes: ['Unica']
    },
    'TCDIS': {
        title: 'TCDIS',
        description: 'Tensor de cadena TCDIS',
        image: 'tensordecadena/TCDIS.png',
        sizes: ['Unica']
    },
    'TCFLEX': {
        title: 'TCFLEX',
        description: 'Tensor de cadena TCFLEX',
        image: 'tensordecadena/TCFLEX.png',
        sizes: ['Unica']
    },
    'TCFZ': {
        title: 'TCFZ',
        description: 'Tensor de cadena TCFZ',
        image: 'tensordecadena/TCFZ.png',
        sizes: ['Unica']
    },
    'TCEVO': {
        title: 'TCEVO',
        description: 'Tensor de cadena TCEVO',
        image: 'tensordecadena/TCEVO.png',
        sizes: ['Unica']
    },
    'TCGN': {
        title: 'TCGN',
        description: 'Tensor de cadena TCGN',
        image: 'tensordecadena/TCGN.png',
        sizes: ['Unica']
    },
    'TCHAYATE': {
        title: 'TCHAYATE',
        description: 'Tensor de cadena TCHAYATE',
        image: 'tensordecadena/TCHAYATE.png',
        sizes: ['Unica']
    },
    'TCGIX': {
        title: 'TCGIX',
        description: 'Tensor de cadena TCGIX',
        image: 'tensordecadena/TCGIX.png',
        sizes: ['Unica']
    },
    'TCRX': {
        title: 'TCRX',
        description: 'Tensor de cadena TCRX',
        image: 'tensordecadena/TCRX.png',
        sizes: ['Unica']
    },
    'TCSZR': {
        title: 'TCSZR',
        description: 'Tensor de cadena TCSZR',
        image: 'tensordecadena/TCSZR.png',
        sizes: ['Unica']
    },
    'TCNEO': {
        title: 'TCNEO',
        description: 'Tensor de cadena TCNEO',
        image: 'tensordecadena/TCNEO.png',
        sizes: ['Unica']
    },
    'TCTVS': {
        title: 'TCTVS',
        description: 'Tensor de cadena TCTVS',
        image: 'tensordecadena/TCTVS.png',
        sizes: ['Unica']
    },
    'TCAP': {
        title: 'TCAP',
        description: 'Tensor de cadena TCAP',
        image: 'tensordecadena/TCAP.png',
        sizes: ['Unica']
    },
    'TCTTR': {
        title: 'TCTTR',
        description: 'Tensor de cadena TCTTR',
        image: 'tensordecadena/TCTTR.png',
        sizes: ['Unica']
    },
    'TCXR': {
        title: 'TCXR',
        description: 'Tensor de cadena TCXR',
        image: 'tensordecadena/TCXR.png',
        sizes: ['Unica']
    },
    'TCV80': {
        title: 'TCV80',
        description: 'Tensor de cadena TCV80',
        image: 'tensordecadena/TCV80.png',
        sizes: ['Unica']
    },
    'TCXCD': {
        title: 'TCXCD',
        description: 'Tensor de cadena TCXCD',
        image: 'tensordecadena/TCXCD.png',
        sizes: ['Unica']
    },
    'TCVIVA': {
        title: 'TCVIVA',
        description: 'Tensor de cadena TCVIVA',
        image: 'tensordecadena/TCVIVA.png',
        sizes: ['Unica']
    },
    'TCWAVE': {
        title: 'TCWAVE',
        description: 'Tensor de cadena TCWAVE',
        image: 'tensordecadena/TCWAVE.png',
        sizes: ['Unica']
    },
    'TCWIND': {
        title: 'TCWIND',
        description: 'Tensor de cadena TCWIND',
        image: 'tensordecadena/TCWIND.png',
        sizes: ['Unica']
    },
    'TCUG': {
        title: 'TCUG',
        description: 'Tensor de cadena TCUG',
        image: 'tensordecadena/TCUG.png',
        sizes: ['Unica']
    },
    'TCYBR': {
        title: 'TCYBR',
        description: 'Tensor de cadena TCYBR',
        image: 'tensordecadena/TCYBR.png',
        sizes: ['Unica']
    },
    'TCDT': {
        title: 'TCDT',
        description: 'Tensor de cadena TCDT',
        image: 'tensordecadena/TCDT.png',
        sizes: ['Unica']
    },
    'TCXTZ1': {
        title: 'TCXTZ1',
        description: 'Tensor de cadena TCXTZ1',
        image: 'tensordecadena/TCXTZ1.png',
        sizes: ['Unica']
    },
    'TCNS': {
        title: 'TCNS',
        description: 'Tensor de cadena TCNS',
        image: 'tensordecadena/TCNS.png',
        sizes: ['Unica']
    },
    'TCXRE': {
        title: 'TCXRE',
        description: 'Tensor de cadena TCXRE',
        image: 'tensordecadena/TCXRE.png',
        sizes: ['Unica']
    },
    'TCNS160': {
        title: 'TCNS160',
        description: 'Tensor de cadena TCNS160',
        image: 'tensordecadena/TCNS160.png',
        sizes: ['Unica']
    },
    'TCCRY115': {
        title: 'TCCRY115',
        description: 'Tensor de cadena TCCRY115',
        image: 'tensordecadena/TCCRY115.png',
        sizes: ['Unica']
    },
    'TCUG2': {
        title: 'TCUG2',
        description: 'Tensor de cadena TCUG2',
        image: 'tensordecadena/TCUG2.png',
        sizes: ['Unica']
    },
    //EJES
    'EJEDELANTERO': {
        title: 'Eje Delantero',
        description: 'Eje delantero para Motocicletas',
        image: 'ejes/EJEDELANTERO.png',
        sizes: ["10x170", "10x185", "10x195", "10x200", "10x205", "10x210", "10x240", "12x175", "12x180", "12x195", "12x200", "12x210", "12x215", "12x220", "12x225", "12x235", "12x245", "12x255", "12x265", "12x270", "14x195", "14x215", "14x230", "14x240", "14x260", "15x285"]
    },
    'EJETRASERO': {
        title: 'Eje Trasero',
        description: 'Eje trasero para Motocicletas',
        image: 'ejes/EJETRASERO.png',
        sizes: ["10x235", "12x210", "12x220", "12x225", "12x230", "12x235", "12x240", "12x255", "12x265", "12x285", "14x230", "14x245", "14x250", "14x260", "14x290", "14x300", "14x320", "15x285", "15x305", "16x290"]
    },
    //PARRILLAS
    'PARRILLAAXCROMADA': {
        title: 'Parrilla Ax trasera',
        description: 'Parrilla Ax trasera cromada sencilla',
        image: 'parrillas/PARRILLAAXCROMADA.png',
        sizes: ['Unica']
    },
    'PARRILLAAXNEGRA': {
        title: 'Parrilla Ax trasera',
        description: 'Parrila Ax trasera negra sencilla',
        image: 'parrillas/PARRILLAAXNEGRA.png',
        sizes: ['Unica']
    },
    'PARRILLANKDNEGRA': {
        title: 'Parrilla akt',
        description: 'Parrilla akt nkd 125 trasera negra sencilla',
        image: 'parrillas/PARRILLANKDNEGRA.png',
        sizes: ['Unica']
    },
    'PARRILLANKDCROMADA': {
        title: 'Parrilla akt',
        description: 'Parrilla akt nkd 125 trasera cromada sencilla',
        image: 'parrillas/PARRILLANKDCROMADA.png',
        sizes: ['Unica']
    },
    //PATAS
    'PLAP180': {
        title: 'PLAP180',
        description: 'Muleta o pata PLAP180',
        image: 'patas/PLAP180.png',
        sizes: ['Unica']
    },
    'PLDR': {
        title: 'PLDR',
        description: 'Muleta o pata PLDR',
        image: 'patas/PLDR.png',
        sizes: ['Unica']
    },
    'PLDR2': {
        title: 'PLDR2',
        description: 'Muleta o pata PLDR2',
        image: 'patas/PLDR2.png',
        sizes: ['Unica']
    },
    'PLMRX': {
        title: 'PLMRX',
        description: 'Muleta o pata PLMRX',
        image: 'patas/PLMRX.png',
        sizes: ['Unica']
    },
    'PLCR4': {
        title: 'PLCR4',
        description: 'Muleta o pata PLCR4',
        image: 'patas/PLCR4.png',
        sizes: ['Unica']
    },
    'PLCR5': {
        title: 'PLCR5',
        description: 'Muleta o pata PLCR5',
        image: 'patas/PLCR5.png',
        sizes: ['Unica']
    },
    'PLTTR180': {
        title: 'PLTTR180',
        description: 'Muleta o pata PLTTR180',
        image: 'patas/PLTTR180.png',
        sizes: ['Unica']
    },
    'PLTTR125': {
        title: 'PLTTR125',
        description: 'Muleta o pata PLTTR125',
        image: 'patas/PLTTR125.png',
        sizes: ['Unica']
    },
    'PLTTX': {
        title: 'PLTTX',
        description: 'Muleta o pata PLTTX',
        image: 'patas/PLTTX.png',
        sizes: ['Unica']
    },
    'PLNKD': {
        title: 'PLNKD',
        description: 'Muleta o pata PLNKD',
        image: 'patas/PLNKD.png',
        sizes: ['Unica']
    },
    'PLD': {
        title: 'PLD',
        description: 'Muleta o pata PLD',
        image: 'patas/PLD.png',
        sizes: ['Unica']
    },
    'PLDST': {
        title: 'PLDST',
        description: 'Muleta o pata PLDST',
        image: 'patas/PLDST.png',
        sizes: ['Unica']
    },
    'PLA110': {
        title: 'PLA110',
        description: 'Muleta o pata PLA110',
        image: 'patas/PLA110.png',
        sizes: ['Unica']
    },
    'PLSL': {
        title: 'PLSL',
        description: 'Muleta o pata PLSL',
        image: 'patas/PLSL.png',
        sizes: ['Unica']
    },
    'PLCB': {
        title: 'PLCB',
        description: 'Muleta o pata PLCB',
        image: 'patas/PLCB.png',
        sizes: ['Unica']
    },
    'PLCB125': {
        title: 'PLCB125',
        description: 'Muleta o pata PLCB125',
        image: 'patas/PLCB125.png',
        sizes: ['Unica']
    },
    'PLCB160': {
        title: 'PLCB160',
        description: 'Muleta o pata PLCB160',
        image: 'patas/PLCB160.png',
        sizes: ['Unica']
    },
    'PLCB190': {
        title: 'PLCB190',
        description: 'Muleta o pata PLCB190',
        image: 'patas/PLCB190.png',
        sizes: ['Unica']
    },
    'PLYBR': {
        title: 'PLYBR',
        description: 'Muleta o pata PLYBR',
        image: 'patas/PLYBR.png',
        sizes: ['Unica']
    },
    'PLLIB': {
        title: 'PLLIB',
        description: 'Muleta o pata PLLIB',
        image: 'patas/PLLIB.png',
        sizes: ['Unica']
    },
    'PLCRY115': {
        title: 'PLCRY115',
        description: 'Muleta o pata PLCRY115',
        image: 'patas/PLCRY115.png',
        sizes: ['Unica']
    },
    'PLGN': {
        title: 'PLGN',
        description: 'Muleta o pata PLGN',
        image: 'patas/PLGN.png',
        sizes: ['Unica']
    },
    'PLVIVA': {
        title: 'PLVIVA',
        description: 'Muleta o pata PLVIVA',
        image: 'patas/PLVIVA.png',
        sizes: ['Unica']
    },
    'PLBEST': {
        title: 'PLBEST',
        description: 'Muleta o pata PLBEST',
        image: 'patas/PLBEST.png',
        sizes: ['Unica']
    },
    'PLAGI': {
        title: 'PLAGI',
        description: 'Muleta o pata PLAGI',
        image: 'patas/PLAGI.png',
        sizes: ['Unica']
    },
    'PLBWS': {
        title: 'PLBWS',
        description: 'Muleta o pata PLBWS',
        image: 'patas/PLBWS.png',
        sizes: ['Unica']
    },
    'PLBWSFI': {
        title: 'PLBWSFI',
        description: 'Muleta o pata PLBWSFI',
        image: 'patas/PLBWSFI.png',
        sizes: ['Unica']
    },
    'PLFZ': {
        title: 'PLFZ',
        description: 'Muleta o pata PLFZ',
        image: 'patas/PLFZ.png',
        sizes: ['Unica']
    },
    'PLFZ25': {
        title: 'PLFZ25',
        description: 'Muleta o pata PLFZ25',
        image: 'patas/PLFZ25.png',
        sizes: ['Unica']
    },
    'PLAX': {
        title: 'PLAX',
        description: 'Muleta o pata PLAX',
        image: 'patas/PLAX.png',
        sizes: ['Unica']
    },
    'PLAX4': {
        title: 'PLAX4',
        description: 'Muleta o pata PLAX4',
        image: 'patas/PLAX4.png',
        sizes: ['Unica']
    },
    'PLUG': {
        title: 'PLUG',
        description: 'Muleta o pata PLUG',
        image: 'patas/PLUG.png',
        sizes: ['Unica']
    },
    'PLP180': {
        title: 'PLP180',
        description: 'Muleta o pata PLP180',
        image: 'patas/PLP180.png',
        sizes: ['Unica']
    },
    'PLP135': {
        title: 'PLP135',
        description: 'Muleta o pata PLP135',
        image: 'patas/PLP135.png',
        sizes: ['Unica']
    },
    'PLPNS': {
        title: 'PLPNS',
        description: 'Muleta o pata PLPNS',
        image: 'patas/PLPNS.png',
        sizes: ['Unica']
    },
    'PLXR': {
        title: 'PLXR',
        description: 'Muleta o pata PLXR',
        image: 'patas/PLXR.png',
        sizes: ['Unica']
    },
    'PLB': {
        title: 'PLB',
        description: 'Muleta o pata PLB',
        image: 'patas/PLB.png',
        sizes: ['Unica']
    },
    'PLDT': {
        title: 'PLDT',
        description: 'Muleta o pata PLDT',
        image: 'patas/PLDT.png',
        sizes: ['Unica']
    },
    'PLRTX': {
        title: 'PLRTX',
        description: 'Muleta o pata PLRTX',
        image: 'patas/PLRTX.png',
        sizes: ['Unica']
    },
    'PLAP150': {
        title: 'PLAP150',
        description: 'Muleta o pata PLAP150',
        image: 'patas/PLAP150.png',
        sizes: ['Unica']
    },
    //DEFENSAS
    'P017': {
        title: 'Defensa Pulsar Ns 200 Aleron Logo',
        description: 'Defensa P017',
        image: 'defensas/P017.png',
        sizes: ['Unica']
    },
    'P019': {
        title: 'Defensa Pulsar N160 Aleron Logo',
        description: 'Defensa P019',
        image: 'defensas/P019.png',
        sizes: ['Unica']
    },
    'F006': {
        title: 'Defensa Stunt Yamaha Fz 2.0 Aleron Logo',
        description: 'Defensa F006',
        image: 'defensas/F006.png',
        sizes: ['Unica']
    },
    'GIX03': {
        title: 'Defensa Suzuki Gixxer 150',
        description: 'Defensa GIX03',
        image: 'defensas/GIX03.png',
        sizes: ['Unica']
    },
    'CR003': {
        title: 'Defensa Akt Cr4 Con Logo',
        description: 'Defensa CR003',
        image: 'defensas/CR003.png',
        sizes: ['Unica']
    },
    'NKD01': {
        title: 'Defensa Akt NKD 125',
        description: 'Defensa NKD01',
        image: 'defensas/NKD01.png',
        sizes: ['Unica']
    },
    'XR003': {
        title: 'Defensa Honda Xr 150/190 Aleron Logo con Tope',
        description: 'Defensa XR003',
        image: 'defensas/XR003.png',
        sizes: ['Unica']
    },
    'XTZ05': {
        title: 'Defensa Yamaha Xtz 125 Aleron Logo con Tope',
        description: 'Defensa XTZ05',
        image: 'defensas/XTZ05.png',
        sizes: ['Unica']
    },
    'XTZ06': {
        title: 'Defensa Yamaha Xtz 150 Aleron Logo con Tope',
        description: 'Defensa XTZ06',
        image: 'defensas/XTZ06.png',
        sizes: ['Unica']
    },
    'DR02': {
        title: 'Defensa Dr 150 Aleron Logo con Tope',
        description: 'Defensa DR02',
        image: 'defensas/DR02.png',
        sizes: ['Unica']
    },
    'MRX02': {
        title: 'Defensa Auteco Mrx 125/150 Aleron Logo con Tope',
        description: 'Defensa MRX02',
        image: 'defensas/MRX02.png',
        sizes: ['Unica']
    },
    'DI01': {
        title: 'Defensa Dominar 250',
        description: 'Defensa DI01',
        image: 'defensas/DI01.png',
        sizes: ['Unica']
    },
    'D006': {
        title: 'Defensa Mariposa Discover Cromada Con Logo',
        description: 'Defensa D006',
        image: 'defensas/D006.png',
        sizes: ['Unica']
    },
    'D007': {
        title: 'Defensa Mariposa Discover Negra Con Logo',
        description: 'Defensa D007',
        image: 'defensas/D007.png',
        sizes: ['Unica']
    },
    'A004': {
        title: 'Defensa Mariposa Ax 100/115 Cromada Logo',
        description: 'Defensa A004',
        image: 'defensas/A004.png',
        sizes: ['Unica']
    },
    'A003': {
        title: 'Defensa Mariposa Ax 100/115 Negra Logo',
        description: 'Defensa A003',
        image: 'defensas/A003.png',
        sizes: ['Unica']
    },
    'BN01': {
        title: 'Defensa Stunt Benelli',
        description: 'Defensa BN01',
        image: 'defensas/BN01.png',
        sizes: ['Unica']
    },
    'P015': {
        title: 'Defensa Stunt Ns 200',
        description: 'Defensa P015',
        image: 'defensas/P015.png',
        sizes: ['Unica']
    },
    'P016': {
        title: 'Defensa Stunt Pulsar 1/2/Ug/180/200/220',
        description: 'Defensa P016',
        image: 'defensas/P016.png',
        sizes: ['Unica']
    },
    'AP02': {
        title: 'Defensa Stunt Apache 160',
        description: 'Defensa AP02',
        image: 'defensas/AP02.png',
        sizes: ['Unica']
    },
    'AP03': {
        title: 'Defensa Stunt Apache 200',
        description: 'Defensa AP03',
        image: 'defensas/AP03.png',
        sizes: ['Unica']
    },
    'H009': {
        title: 'Defensa Stunt Honda Cb 125 F',
        description: 'Defensa H009',
        image: 'defensas/H009.png',
        sizes: ['Unica']
    },
    'GIX01': {
        title: 'Defensa Stunt Gixxer 150',
        description: 'Defensa GIX01',
        image: 'defensas/GIX01.png',
        sizes: ['Unica']
    },
    'GIX02': {
        title: 'Defensa Stunt Gixxer 250',
        description: 'Defensa GIX02',
        image: 'defensas/GIX02.png',
        sizes: ['Unica']
    },
    'F004': {
        title: 'Defensa Stunt Yamaha 2.0',
        description: 'Defensa F004',
        image: 'defensas/F004.png',
        sizes: ['Unica']
    },
    'F005': {
        title: 'Defensa Stunt Yamaha 2.5',
        description: 'Defensa F005',
        image: 'defensas/F005.png',
        sizes: ['Unica']
    },
    'CR002': {
        title: 'Defensa Stunt Akt Cr4',
        description: 'Defensa CR002',
        image: 'defensas/CR002.png',
        sizes: ['Unica']
    },
    'P002': {
        title: 'Defensa En Caucho Pulsar 180 / Ug / Pulsar 1y2 / Honda Cb 110',
        description: 'Defensa P002',
        image: 'defensas/P002.png',
        sizes: ['Unica']
    },
    'P003': {
        title: 'Defensa Doble Slaider Pulsar 180 / Ug / Pulsar 1y2 / Honda Cb 110',
        description: 'Defensa P003',
        image: 'defensas/P003.png',
        sizes: ['Unica']
    },
    'P005': {
        title: 'Defensa En Caucho Aleron Pulsar Ns 200',
        description: 'Defensa P005',
        image: 'defensas/P005.png',
        sizes: ['Unica']
    },
    'P006': {
        title: 'Defensa Gp En Caucho Pulsar 180',
        description: 'Defensa P006',
        image: 'defensas/P006.png',
        sizes: ['Unica']
    },
    'P007': {
        title: 'Defensa Slaider Dos Piesas Pulsar UG / 200/220',
        description: 'Defensa P007',
        image: 'defensas/P007.png',
        sizes: ['Unica']
    },
    'P009': {
        title: 'Defensa En Caucho Dos Piesas Ns 200',
        description: 'Defensa P009',
        image: 'defensas/P009.png',
        sizes: ['Unica']
    },
    'P010': {
        title: 'Defensa En Caucho Aleron Pulsar 180/ 1y2 / Ug / Honda Cb 110',
        description: 'Defensa P010',
        image: 'defensas/P010.png',
        sizes: ['Unica']
    },
    'P011': {
        title: 'Defensa En Caucho Pulsar UG / 200/220',
        description: 'Defensa P011',
        image: 'defensas/P011.png',
        sizes: ['Unica']
    },
    'P012': {
        title: 'Defensa En Caucho Aleron Doble Slider Pulsar 180 /1y2 / Cb100',
        description: 'Defensa P012',
        image: 'defensas/P012.png',
        sizes: ['Unica']
    },
    'P013': {
        title: 'Defensa En Caucho Pulsar 180/ 1y2 / Ug/ Honda Cb 110',
        description: 'Defensa P013',
        image: 'defensas/P013.png',
        sizes: ['Unica']
    },
    'P014': {
        title: 'Defensa Aleron Pulsar Ug Pulsar200 Pulsar 220',
        description: 'Defensa P014',
        image: 'defensas/P014.png',
        sizes: ['Unica']
    },
    'U002': {
        title: 'Defensa En Caucho Universal Una Barra Ax / Gn / Ybr / Cbf',
        description: 'Defensa U002',
        image: 'defensas/U002.png',
        sizes: ['Unica']
    },
    'U003': {
        title: 'Defensa En Caucho Universal Doble Slaider- Curva Fz16/ Cbf/ Gn/ Ybr /',
        description: 'Defensa U003',
        image: 'defensas/U003.png',
        sizes: ['Unica']
    },
    'U004': {
        title: 'Defensa En Caucho Universal Doble Slaider-Recta Ax / Gn / Ybr / Cbf /',
        description: 'Defensa U004',
        image: 'defensas/U004.png',
        sizes: ['Unica']
    },
    'U005': {
        title: 'Defensa En Caucho Universal Sencilla Chasis Ax / Gn / Ybr / Cbf / Akt',
        description: 'Defensa U005',
        image: 'defensas/U005.png',
        sizes: ['Unica']
    },
    'U006': {
        title: 'Defensa En Caucho Universal Curva Chasis Fz16/ Cbf/ Gn/ Ybr / Gixxer',
        description: 'Defensa U006',
        image: 'defensas/U006.png',
        sizes: ['Unica']
    },
    'U009': {
        title: 'Defensa En Caucho Universal 2 Piesas Suzuki / Honda / Yamaha / Akt',
        description: 'Defensa U009',
        image: 'defensas/U009.png',
        sizes: ['Unica']
    },
    'U010': {
        title: 'Defensa En Caucho Universal De Aro Para Chasis Gn/ Ax/ Akt100/ ',
        description: 'Defensa U010',
        image: 'defensas/U010.png',
        sizes: ['Unica']
    },
    'U011': {
        title: 'Defensa Gp En Caucho Pulsar 135/ Gn/ Akt 125 motos Sport',
        description: 'Defensa U011',
        image: 'defensas/U011.png',
        sizes: ['Unica']
    },
    'U012': {
        title: 'Defensa En Aleron Universal Chasis Akt/ Fz16/ Ybr/ Gn',
        description: 'Defensa U012',
        image: 'defensas/U012.png',
        sizes: ['Unica']
    },
    'U013': {
        title: 'Defensa Aleron Universal Curva Doble Slider Akt/ Fz16/ Ybr/ Cbf125f/ Gn',
        description: 'Defensa U013',
        image: 'defensas/U013.png',
        sizes: ['Unica']
    },
    'U015': {
        title: 'Defensa Leron Curva Honda Cb 125f',
        description: 'Defensa U015',
        image: 'defensas/U015.png',
        sizes: ['Unica']
    },
    'AP01': {
        title: 'Defensa en aleron Apache 160/ 180/ 200',
        description: 'Defensa AP01',
        image: 'defensas/AP01.png',
        sizes: ['Unica']
    },
    'S001': {
        title: 'Defensa En Caucho Boxer Ct/Yamaha Szr/Discover 135 St',
        description: 'Defensa S001',
        image: 'defensas/S001.png',
        sizes: ['Unica']
    },
    'RT002': {
        title: 'Defensa En Caucho Rtx 150',
        description: 'Defensa RT002',
        image: 'defensas/RT002.png',
        sizes: ['Unica']
    },
    'E002': {
        title: 'Defensa Eco 100 / Hero 100 Splendor',
        description: 'Defensa E002',
        image: 'defensas/E002.png',
        sizes: ['Unica']
    },
    'E003': {
        title: 'Defensa Mariposa Negra Eco 100/Hero 100/Splendor',
        description: 'Defensa E003',
        image: 'defensas/E003.png',
        sizes: ['Unica']
    },
    'E004': {
        title: 'Defensa Mariposa Cromada Eco 100/Hero 100/Splendor',
        description: 'Defensa E004',
        image: 'defensas/E004.png',
        sizes: ['Unica']
    },
    'D002': {
        title: 'Defensa Mariposa Discover St 125/150 / Boxer',
        description: 'Defensa D002',
        image: 'defensas/D002.png',
        sizes: ['Unica']
    },
    'D003': {
        title: 'Defensa En Caucho Discover 125/135 modelo viejo',
        description: 'Defensa D003',
        image: 'defensas/D003.png',
        sizes: ['Unica']
    },
    'D004': {
        title: 'Defensa Discover R',
        description: 'Defensa D004',
        image: 'defensas/D004.png',
        sizes: ['Unica']
    },
    'D005': {
        title: 'Defensa Marisposa Discover St 125/150 / Boxer Cromada',
        description: 'Defensa D005',
        image: 'defensas/D005.png',
        sizes: ['Unica']
    },
    'H002': {
        title: 'Defensa En Caucho Honda Cbf 160 Aleron',
        description: 'Defensa H002',
        image: 'defensas/H002.png',
        sizes: ['Unica']
    },
    'H003': {
        title: 'Defensa En Caucho Honda Xblade 160 Cb 190 Aleron Logo con tope',
        description: 'Defensa H003',
        image: 'defensas/H003.png',
        sizes: ['Unica']
    },
    'H004': {
        title: 'Defensa De Lujo Hero 110 Splendor Aleron',
        description: 'Defensa H004',
        image: 'defensas/H004.png',
        sizes: ['Unica']
    },
    'H006': {
        title: 'Defensa En Caucho Honda Navi Doble Slider Discover 125R Discover 150 St',
        description: 'Defensa H006',
        image: 'defensas/H006.png',
        sizes: ['Unica']
    },
    'H007': {
        title: 'Defensa En Caucho Honda Navi Discover 125R Discover 150 St',
        description: 'Defensa H007',
        image: 'defensas/H007.png',
        sizes: ['Unica']
    },
    'H008': {
        title: 'Defensa En Caucho Honda Cb 190 Aleron',
        description: 'Defensa H008',
        image: 'defensas/H008.png',
        sizes: ['Unica']
    },
    'F002': {
        title: 'Defensa En Caucho Fz 2.0 Aleron',
        description: 'Defensa F002',
        image: 'defensas/F002.png',
        sizes: ['Unica']
    },
    'F003': {
        title: 'Defensa En Caucho Fz 250 Aleron',
        description: 'Defensa F003',
        image: 'defensas/F003.png',
        sizes: ['Unica']
    },
    'A001': {
        title: 'Defensa Marisposa Negra Ax 100/115',
        description: 'Defensa A001',
        image: 'defensas/A001.png',
        sizes: ['Unica']
    },
    'A002': {
        title: 'Defensa Mariposa Cromada Ax 100/115',
        description: 'Defensa A002',
        image: 'defensas/A002.png',
        sizes: ['Unica']
    },
    'R001': {
        title: 'Defensa Mariposa Negra Rx 100/115',
        description: 'Defensa R001',
        image: 'defensas/R001.png',
        sizes: ['Unica']
    },
    'R002': {
        title: 'Defensa Mariposa Cromada Rx 100/115',
        description: 'Defensa R002',
        image: 'defensas/R002.png',
        sizes: ['Unica']
    },
    'B001': {
        title: 'Defensa Delantera Bws 125',
        description: 'Defensa B001',
        image: 'defensas/B001.png',
        sizes: ['Unica']
    },
    'B002': {
        title: 'Defensa Trasera Bws 125',
        description: 'Defensa B002',
        image: 'defensas/B002.png',
        sizes: ['Unica']
    },
    'B003': {
        title: 'Defensa Bws 125 Combo Delantera Y Trasera',
        description: 'Defensa B003',
        image: 'defensas/B003.png',
        sizes: ['Unica']
    },
    'M002': {
        title: 'Defensa Tipo Mariposa Universal Pesada tubo 2mm',
        description: 'Defensa M002',
        image: 'defensas/M002.png',
        sizes: ['Unica']
    },
    'M003': {
        title: 'Defensa Tipo Mariposa Negra Universal Liviana tubo 1.10 mm',
        description: 'Defensa M003',
        image: 'defensas/M003.png',
        sizes: ['Unica']
    },
    'M004': {
        title: 'Defensa Tipo Mariposa Cromada Universal liviana 1.10mm',
        description: 'Defensa M004',
        image: 'defensas/M004.png',
        sizes: ['Unica']
    },
    'DR01': {
        title: 'Defensa Suzuki Dr 150 Aleron Logo',
        description: 'Defensa DR01',
        image: 'defensas/DR01.png',
        sizes: ['Unica']
    },
    'XTZ01': {
        title: 'Defenza Xtz Yamaha 125 Aleron Logo',
        description: 'Defensa XTZ01',
        image: 'defensas/XTZ01.png',
        sizes: ['Unica']
    },
    'XTZ02': {
        title: 'Defenza Xtz Yamaha 150 Aleron Logo',
        description: 'Defensa XTZ02',
        image: 'defensas/XTZ02.png',
        sizes: ['Unica']
    },
    'MRX01': {
        title: 'Defensa Auteco Mrx 125/150 Aleron Logo',
        description: 'Defensa MRX01',
        image: 'defensas/MRX01.png',
        sizes: ['Unica']
    },
    'XR01': {
        title: 'Defensa Honda Xr 150/190 Aleron Logo',
        description: 'Defensa XR01',
        image: 'defensas/XR01.png',
        sizes: ['Unica']
    },
    'XR002': {
        title: 'Defensa Honda Xr 150/190 plaqueta marca',
        description: 'Defensa XR002',
        image: 'defensas/XR002.png',
        sizes: ['Unica']
    },
    'XTZ03': {
        title: 'Defenza Yamaha Xtz 125 plaqueta marca',
        description: 'Defensa XTZ03',
        image: 'defensas/XTZ03.png',
        sizes: ['Unica']
    },
    'XTZ04': {
        title: 'Defensa Mariposa Libero 110n Yamaha',
        description: 'Defensa XTZ04',
        image: 'defensas/XTZ04.png',
        sizes: ['Unica']
    },
    'CR001': {
        title: 'Defensa en caucho Akt Cr4 Aleron',
        description: 'Defensa CR001',
        image: 'defensas/CR001.png',
        sizes: ['Unica']
    },
    'AY001': {
        title: 'Defensa Ayate 100/115',
        description: 'Defensa AY001',
        image: 'defensas/AY001.png',
        sizes: ['Unica']
    },
    'KA001': {
        title: 'Defensa Kymco Agility',
        description: 'Defensa KA001',
        image: 'defensas/KA001.png',
        sizes: ['Unica']
    },
};

// --------------------------------------------
// Variables globales
// --------------------------------------------
let selectedSize = null; // Medida seleccionada
let currentProductId = null; // Producto actual

// --------------------------------------------
// Función para abrir el modal de producto
// --------------------------------------------
/**
 * Abre el modal de producto y muestra la información correspondiente
 * @param {string} productId - ID del producto a mostrar
 */
function openProductModal(productId) {
    const product = productsData[productId];
    if (!product) {
        return;
    }
    
    currentProductId = productId;
    
    // Llenar la información del modal
    const titleElement = document.getElementById('modalProductTitle');
    const descElement = document.getElementById('modalProductDescription');
    const imageElement = document.getElementById('modalProductImage');
    
    if (titleElement) titleElement.textContent = product.title;
    if (descElement) descElement.textContent = product.description;
    if (imageElement) {
        imageElement.src = product.image;
        imageElement.alt = product.title;
    }
    
    // Llenar las medidas
    const sizesContainer = document.getElementById('sizesContainer');
    if (sizesContainer) {
        sizesContainer.innerHTML = '';
        // Si hay muchas medidas, aplicar clase para scroll
        if (product.sizes.length > 8) {
            sizesContainer.classList.add('sizes-scroll');
        } else {
            sizesContainer.classList.remove('sizes-scroll');
        }
        product.sizes.forEach(size => {
            const sizeElement = document.createElement('div');
            sizeElement.className = 'size-option';
            sizeElement.textContent = size;
            sizeElement.onclick = () => selectSize(sizeElement, size);
            sizesContainer.appendChild(sizeElement);
        });
    }
    
    // Resetear cantidad y tamaño seleccionado
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) quantityInput.value = 1;
    selectedSize = null;
    
    // Mostrar el modal
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('data-product-id', productId);
    }
}

// --------------------------------------------
// Función para cerrar el modal
// --------------------------------------------
/**
 * Cierra el modal de producto y resetea selección
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
    }
    selectedSize = null;
    currentProductId = null;
}

// --------------------------------------------
// Función para seleccionar tamaño
// --------------------------------------------
/**
 * Selecciona una medida/tamaño para el producto
 * @param {HTMLElement} element - Elemento de la medida
 * @param {string} size - Medida seleccionada
 */
function selectSize(element, size) {
    // Remover selección anterior
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Agregar selección actual
    element.classList.add('selected');
    selectedSize = size;
}

// --------------------------------------------
// Funciones para controlar la cantidad
// --------------------------------------------
/**
 * Incrementa la cantidad seleccionada
 */
function incrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue < 99) {
            quantityInput.value = currentValue + 1;
        }
    }
}

/**
 * Decrementa la cantidad seleccionada
 */
function decrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }
}

// --------------------------------------------
// Función para añadir al carrito
// --------------------------------------------
/**
 * Añade el producto seleccionado al carrito
 */
function addToCart() {
    if (!currentProductId) {
        alert('Error: No hay producto seleccionado');
        return;
    }
    
    if (!selectedSize) {
        alert('Por favor selecciona una medida');
        return;
    }
    
    const product = productsData[currentProductId];
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput ? quantityInput.value : 1) || 1;
    
    // Usar la nueva clase ShoppingCart si está disponible
    if (typeof cart !== 'undefined' && cart.addItem) {
        const productData = {
            id: currentProductId,
            title: product.title,
            image: product.image
        };
        
        cart.addItem(productData, quantity, selectedSize);
        closeProductModal();
        return;
    }
    
    // Fallback para compatibilidad (código anterior)
    const cartItem = {
        id: `${currentProductId}-${selectedSize}`,
        productId: currentProductId,
        title: product.title,
        size: selectedSize,
        quantity: quantity,
        image: product.image
    };
    
    // Inicializar carrito si no existe
    let localCart = [];
    try {
        const savedCart = localStorage.getItem('macachi_cart');
        localCart = savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        console.error('Error cargando carrito:', e);
    }
    
    // Verificar si el item ya existe en el carrito
    const existingItemIndex = localCart.findIndex(item => 
        item.productId === currentProductId && item.size === selectedSize
    );
    
    if (existingItemIndex > -1) {
        // Si existe, incrementar la cantidad
        localCart[existingItemIndex].quantity += quantity;
    } else {
        // Si no existe, agregarlo
        localCart.push(cartItem);
    }
    
    // Guardar en localStorage
    try {
        localStorage.setItem('macachi_cart', JSON.stringify(localCart));
    } catch (e) {
        console.error('Error guardando en localStorage:', e);
    }
    
    // Mostrar mensaje de confirmación
    showCartNotification();
    
    // Cerrar modal
    closeProductModal();
}

// --------------------------------------------
// Función para mostrar notificación de carrito
// --------------------------------------------
/**
 * Muestra una notificación visual cuando se añade un producto al carrito
 */
function showCartNotification() {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #c53030;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    notification.textContent = '¡Producto añadido al carrito!';
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// --------------------------------------------
// Estilos para barra de desplazamiento en medidas
// --------------------------------------------
/**
 * Inserta estilos CSS para el scroll de medidas en el modal
 */
function injectSizesScrollStyle() {
    if (document.getElementById('sizes-scroll-style')) return;
    const style = document.createElement('style');
    style.id = 'sizes-scroll-style';
    style.textContent = `
        /* Centrado y estilo de la X de cierre del modal de producto */
        #productModal .close {
            position: absolute;
            top: 16px;
            right: 24px;
            font-size: 2rem;
            font-weight: bold;
            color: #c53030;
            cursor: pointer;
            z-index: 10;
            background: none;
            border: none;
            line-height: 1;
            transition: color 0.2s;
        }
        #productModal .close:hover {
            color: #ffffffff;
            scale: 1.1;
        }

        .sizes-scroll {
            max-height: 220px;
            overflow-y: auto;
            padding-right: 6px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }
        .sizes-scroll::-webkit-scrollbar {
            width: 8px;
            background: #eee;
            border-radius: 4px;
        }
        .sizes-scroll::-webkit-scrollbar-thumb {
            background: #c53030;
            border-radius: 4px;
        }
        .sizes-scroll .size-option {
            min-width: 0;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
}
injectSizesScrollStyle();

// --------------------------------------------
// Eventos para cerrar modal y accesibilidad
// --------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage (si existe)
    try {
        const savedCart = localStorage.getItem('macachi_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        cart = [];
    }
    
    // Cerrar modal al hacer clic fuera de él
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeProductModal();
            }
        };
    }
    
    // Manejar tecla ESC para cerrar modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProductModal();
        }
    });
    
    // Exponer funciones globalmente para uso en HTML
    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    window.selectSize = selectSize;
    window.incrementQuantity = incrementQuantity;
    window.decrementQuantity = decrementQuantity;
    window.addToCart = addToCart;
});
