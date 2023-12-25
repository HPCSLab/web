const images = import.meta.glob("../../public/**/*.jpg?jsx", { eager: true });

console.log(images);
