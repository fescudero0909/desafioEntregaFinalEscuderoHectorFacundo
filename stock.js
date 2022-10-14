//creamos arrays de productos
const products = [
    {
        id: 1,
        names: 'Bolivia',
        weight: 250,
        price: 2000,
        img: '/assets/img/cafeBolivia.jpg',
        quantity: 1

    },
    {
        id: 2,
        names: 'Bolivia Caturra 48',
        weight: 250,
        price: 2500,
        img: '/assets/img/cafeBoliviaCaturra48.jpg',
        quantity: 1

    },
    {
        id: 3,
        names: 'Bolivia Caturra 72',
        weight: 250,
        price: 2500,
        img: '/assets/img/cafeBoliviaCaturra72.jpg',
        quantity: 1

    },
    {
        id: 4,
        names: 'Bolivia Caturra NAT',
        weight: 250,
        price: 1500,
        img: '/assets/img/cafeBoliviaCaturraNAT.jpg',
        quantity: 1

    },
    {
        id: 5,
        names: 'Brasil',
        weight: 250,
        price: 3000,
        img: '/assets/img/cafeBrasil.jpg',
        quantity: 1

    },
    {
        id: 6,
        names: 'Colombia Volcanico',
        weight: 250,
        price: 3500,
        img: '/assets/img/cafeColombiaVolcanico.jpg',
        quantity: 1

    },
    {
        id: 7,
        names: 'Colombia El Corazón',
        weight: 250,
        price: 3500,
        img: '/assets/img/cafeColombiaElCorazon.jpg',
        quantity: 1

    }
];

//Desestructuracion de array con SPREAD
const [a,b,c, ...resto] = products
//console.log(a,b,c, resto)

//Desestructuracion de objeto
//let { names, price } = products
//console.log(names, price)



export{ products }
