class Bike {
  constructor(
    id,
    brandIds,
    title,
    affordability,
    complexity,
    imageUrl,
    price,
    description
  ) {
    this.id = id;
    this.brandIds = brandIds;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.price = price;

    this.description = description;
  }
}

export default Bike;
