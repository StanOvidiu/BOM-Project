namespace WebApplication1.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using System;
    using System.Text.Json.Serialization;

    namespace WebApplication1.Models
    {
        [BsonIgnoreExtraElements]
        public class BindingSocketProducerInner
        {
            // Name field
            [BsonElement("name")]
            [JsonPropertyName("name")]
            public string name { get; set; }

            // Quantity field
            [BsonElement("quantity")]
            [JsonPropertyName("quantity")]
            public int? quantity { get; set; }

            // Price field
            [BsonElement("price")]
            [JsonPropertyName("price")]
            public double? price { get; set; }

            // Fluent method to set the Name
            public BindingSocketProducerInner WithName(string name)
            {
                this.name = name;
                return this;
            }

            // Fluent method to set the Quantity
            public BindingSocketProducerInner WithQuantity(int quantity)
            {
                this.quantity = quantity;
                return this;
            }

            // Fluent method to set the Price
            public BindingSocketProducerInner WithPrice(double price)
            {
                this.price = price;
                return this;
            }

            // Overriding Equals method for object comparison
            public override bool Equals(object obj)
            {
                if (obj is BindingSocketProducerInner other)
                {
                    return this.name == other.name &&
                           this.quantity == other.quantity &&
                           this.price == other.price;
                }
                return false;
            }

            // Overriding GetHashCode for hashing
            public override int GetHashCode()
            {
                return HashCode.Combine(name, quantity, price);
            }

            // Custom ToString method
            public override string ToString()
            {
                return $"BindingSocketProducerInner {{ " +
                       $"Name: {name}, " +
                       $"Quantity: {quantity}, " +
                       $"Price: {price} }}";
            }
        }
    }

}