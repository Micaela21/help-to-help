const initialCategories = [
  {
    name: "Alimentos",
  },
  {
    name: "Deportes",
  },
  {
    name: "Indumentaria",
  },
  {
    name: "Animales",
  },
  {
    name: "Libreria",
  },
  {
    name: "Juguetes",
  },
  {
    name: "Calzado",
  },
  {
    name: "Limpieza",
  },
];
const initialProducts = [
  {
    name: "Remera",
    description: "Verde",
    price: 500,
    image: "https://www.remerasya.com/pub/media/catalog/product/cache/6b1c09900b407c50fce2db5e66ebc123/r/e/remera_verde_lisa_1.jpg",
    stock: 0,
  },
  {
    name: "Pantalon",
    description: "Joggin",
    price: 600,
    image: "https://dafitistaticar-a.akamaihd.net/p/g4-3185-162215-1-catalog-new.jpg",
    stock: 10,
  },
  {
    name: "Fideos",
    description: "Caseros",
    price: 95,
    image: "https://www.paulinacocina.net/wp-content/uploads/2020/05/fideos-caseros.jpg",
    stock: 10,
  },
  {
    name: "Mermelada",
    description: "Frutilla",
    price: 55,
    image: "https://www.enmicocinahoy.cl/wp-content/uploads/2015/07/mermelada-frutillas-h-3.jpg",
    stock: 10,
  },
  {
    name: "Raqueta",
    description: "Tennis",
    price: 500,
    image: "https://as01.epimg.net/showroom/imagenes/2018/08/30/portada/1535654183_505131_1535661107_sumario_normal.jpg",
    stock: 4,
  },
  {
    name: "Pelota",
    description: "Voley",
    price: 400,
    image: " https://media.istockphoto.com/photos/volleyball-ball-isolated-on-white-background-picture-id618341990?k=6&m=618341990&s=612x612&w=0&h=ueCkx_wJWDUVIczbnDHjE-BMISkLMRdsV3GOdjoZGp8=",
    stock: 10,
  },
  {
    name: "Alimento para mascotas",
    description: "De perro",
    price: 500,
    image: "https://mascotaselmolino.com.ar/5448-home_default/cereales-perro.jpg",
    stock: 50,
  },
  {
    name: "Accesorios para gatos",
    description: "Rascador para gatos",
    price: 1000,
    image: "https://eus3.aosomcdn.com/aws_image/600x600/es/catalog/product/7/4/74c56b97ff55ad31cd16f52ddaef2f9a.jpg",
    stock: 20,
  },
  {
    name: "Cuadernos",
    description: "Universitarios",
    price: 90,
    image: "https://www.planetoffice.com.ar/images_prg/cuadernos/avon/00002335-1372699040_gde.jpg",
    stock: 100,
  },
  {
    name: "Lapiceras",
    description: "De gel, fluor",
    price: 70,
    image: "https://d26lpennugtm8s.cloudfront.net/stores/891/147/products/3751ecdd-0028-45f7-bc12-cbee7a2b33f9_nube-b2a94a30e5363fdd3d15499207658084-1024-1024.jpg",
    stock: 7,
  },
  {
    name: "Pelotita de colores",
    description: "Para perros",
    price: 100,
    image: "https://http2.mlstatic.com/D_NQ_NP_947771-MLA40122848330_122019-V.jpg",
    stock: 11,
  },
  {
    name: "Muñeca",
    description: "Pepona",
    price: 105,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_984810-MLA42699032607_072020-V.jpg",
    stock: 20,
  },
  {
    name: "Zapatillas Nike",
    description: "Deportivas",
    price: 400,
    image: "https://http2.mlstatic.com/D_NQ_NP_725687-MLA40217039961_122019-W.jpg",
    stock: 9,
  },
  {
    name: "Zapatillas Addidas",
    description: "Casuales",
    price: 400,
    image: "https://essential.vteximg.com.br/arquivos/ids/254432-1000-1000/261-0312_1.jpg?v=636973399042430000",
    stock: 16,
  },
  {
    name: "Escoba",
    description: "De barrer",
    price: 400,
    image: "https://www.soyvisual.org/sites/default/files/styles/twitter_card/public/images/photos/lim_0001.jpg?itok=hGYlAkFW",
    stock: 20,
  },
  {
    name: "Bolsas",
    description: "De basura",
    price: 100,
    image: "https://www.climprofesional.com/880-large_default/bolsas-basura-extragrandes.jpg",
    stock: 60,
  },

];

const productCategory = [
  { categoryId: 3, productId: 1 },
  { categoryId: 3, productId: 2 },
  { categoryId: 1, productId: 3 },
  { categoryId: 1, productId: 4 },
  { categoryId: 2, productId: 5 },
  { categoryId: 2, productId: 6 },
  { categoryId: 4, productId: 7 },
  { categoryId: 4, productId: 8 },
  { categoryId: 5, productId: 9 },
  { categoryId: 5, productId: 10 },
  { categoryId: 6, productId: 11 },
  { categoryId: 6, productId: 12 },
  { categoryId: 7, productId: 13 },
  { categoryId: 7, productId: 14 },
  { categoryId: 8, productId: 15 },
  { categoryId: 8, productId: 16 },
  { categoryId: 2, productId: 2 },
  { categoryId: 1, productId: 7 },
  { categoryId: 4, productId: 11 },
  { categoryId: 2, productId: 13 },
  { categoryId: 3, productId: 13 },
  { categoryId: 3, productId: 14 },
  { categoryId: 6, productId: 5 },
  { categoryId: 6, productId: 6 },

];
// let initialUsers = [
//   {
//     username: "Ele",
//     fullname: "Elena Gonzalez",
//     email: "ele@admin.com",
//     phone: "123456789",
//     address: "Av siempre viva 123",
//     state: "Argentina",
//     isAdmin: true,
//     password: "password"
//   },
//   {
//     username: "Panchito",
//     fullname: "Francisco Gonzalez",
//     email: "pancho@admin.com",
//     phone: "123456789",
//     address: "Av siempre viva 123",
//     state: "Argentina",
//     isAdmin: false,
//     password: "SoyPancho"
//   },
//   {
//     username: "Homero",
//     fullname: "Homero Simpson",
//     email: "homero@admin.com",
//     phone: "123456789",
//     address: "Av siempre viva 123",
//     state: "Argentina",
//     isAdmin: false,
//     password: "LisaNecesitaFrenos"
//   }
// ];
// let initialOrders = [
  
//   {
//     total: 1000,
//     state: "cart",
//     userId: 1
//   },
//   {
//     total: 2000,
//     state: "created",
//     userId: 1
//   },
//   {
//     total: 1000,
//     state: "processing",
//     userId: 1
//   },
//   {
//     total: 1000,
//     state: "canceled",
//     userId: 1
//   },
//   {
//     total: 1000,
//     state: "completed",
//     userId: 1
//   },
//   {
//     total: 1000,
//     state: "cart",
//     userId: 2
//   },
//   {
//     total: 1000,
//     state: "canceled",
//     userId: 2
//   },
//   {
//     total: 1000,
//     state: "cart",
//     userId: 3
//   },
//   {
//     total: 1000,
//     state: "canceled",
//     userId: 3
//   },
//   {
//     total: 1000,
//     state: "completed",
//     userId: 3
//   },
// ]

// let initialOrderlines = [
//   {
//     productId: 3,
//     orderId: 1,
//     quantity: 6,
//     price: 50,
//     subtotal: 300
//   },
//   {
//     productId: 2,
//     orderId: 1,
//     quantity: 3,
//     price: 20,
//     subtotal: 60
//   },
//   {
//     productId: 5,
//     orderId: 2,
//     quantity: 7,
//     price: 25,
//     subtotal: 175
//   },
//   {
//     productId: 7,
//     orderId: 2,
//     quantity: 5,
//     price: 100,
//     subtotal: 500
//   },
//   {
//     productId: 12,
//     orderId: 3,
//     quantity: 3,
//     price: 300,
//     subtotal: 900
//   },
//   {
//     productId: 11,
//     orderId: 3,
//     quantity: 1,
//     price: 50,
//     subtotal: 50
//   },
//   {
//     productId: 2,
//     orderId: 3,
//     quantity: 2,
//     price: 20,
//     subtotal: 40
//   },

// ]

// let initialRates = [

//   {
//     id: 1,
//     qualification: 1, // wolverine
//     description: 'un capo el logan se la re banca quien pudiera tener adamantium en el cuerpo',
//     prodId: 5,
//     userId: 1,
//   }

// ]


module.exports = {
  initialCategories,
  initialProducts,
  productCategory,
  // initialUsers,
  // initialOrders,
  // initialOrderlines,
};
