using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using WebApplication1.Models.WebApplication1.Models;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class BindingSocket
    {
        // MongoDB ObjectId (_id)
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("_id")]
        public string _id { get; set; }

        // Image field
        [BsonElement("image")]
        [JsonPropertyName("image")]
        public string image { get; set; }

        // Name field
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string name { get; set; }

        // Size field
        [BsonElement("size")]
        [JsonPropertyName("size")]
        public double? size { get; set; }

        // Color field
        [BsonElement("color")]
        [JsonPropertyName("color")]
        public string color { get; set; }

        // Producer list, assumed to be a complex type
        [BsonElement("producer")]
        [JsonPropertyName("producer")]
        public List<BindingSocketProducerInner> producer { get; set; } = new List<BindingSocketProducerInner>();

        // MPN field
        [BsonElement("mpn")]
        [JsonPropertyName("mpn")]
        public string mpn { get; set; }

        // PriceMin field
        [BsonElement("pricemin")]
        [JsonPropertyName("pricemin")]
        public double? priceMin { get; set; }

        // Details field
        [BsonElement("details")]
        [JsonPropertyName("details")]
        public string details { get; set; }

        // Project field
        [BsonElement("project")]
        [JsonPropertyName("project")]
        public string project { get; set; }

        // Stock field
        [BsonElement("stock")]
        [JsonPropertyName("stock")]
        public int? stock { get; set; }

        [BsonElement("subcategory")]
        [JsonPropertyName("subcategory")]
        public string subcategory { get; set; }

        [BsonElement("selectedsupplier")]
        [JsonPropertyName("selectedsupplier")]
        public string selectedsupplier { get; set; }

        // Fluent method to set the image
        public BindingSocket WithImage(string image)
        {
            this.image = image;
            return this;
        }

        // Fluent method to set the name
        public BindingSocket WithName(string name)
        {
            this.name = name;
            return this;
        }

        // Fluent method to set the size
        public BindingSocket WithSize(double size)
        {
            this.size = size;
            return this;
        }

        // Fluent method to set the color
        public BindingSocket WithColor(string color)
        {
            this.color = color;
            return this;
        }

        // Fluent method to set the producer list
        public BindingSocket WithProducer(List<BindingSocketProducerInner> producer)
        {
            this.producer = producer;
            return this;
        }

        // Fluent method to add a producer item to the list
        public BindingSocket AddProducerItem(BindingSocketProducerInner producerItem)
        {
            if (this.producer == null)
            {
                this.producer = new List<BindingSocketProducerInner>();
            }
            this.producer.Add(producerItem);
            return this;
        }

        // Fluent method to set the mpn
        public BindingSocket WithMpn(string mpn)
        {
            this.mpn = mpn;
            return this;
        }

        // Fluent method to set the pricemin
        public BindingSocket WithPriceMin(double pricemin)
        {
            this.priceMin = pricemin;
            return this;
        }

        // Fluent method to set the details
        public BindingSocket WithDetails(string details)
        {
            this.details = details;
            return this;
        }

        // Fluent method to set the project
        public BindingSocket WithProject(string project)
        {
            this.project = project;
            return this;
        }

        // Fluent method to set the stock
        public BindingSocket WithStock(int stock)
        {
            this.stock = stock;
            return this;
        }

        // Overriding Equals method for object comparison
        public override bool Equals(object obj)
        {
            if (obj is BindingSocket other)
            {
                return this.image == other.image &&
                       this.name == other.name &&
                       this.size == other.size &&
                       this.color == other.color &&
                       this.producer == other.producer &&
                       this.mpn == other.mpn &&
                       this.priceMin == other.priceMin &&
                       this.details == other.details &&
                       this.project == other.project &&
                       this.stock == other.stock;
            }
            return false;
        }

        // Overriding GetHashCode for hashing
        public override int GetHashCode()
        {
            return HashCode.Combine(image, name, size, color, producer, mpn, HashCode.Combine(priceMin, details, project, stock));
        }

        // Custom ToString method
        public override string ToString()
        {
            return $"BindingSocket {{ " +
                   $"Image: {image}, " +
                   $"Name: {name}, " +
                   $"Size: {size}, " +
                   $"Color: {color}, " +
                   $"Producer: {producer}, " +
                   $"Mpn: {mpn}, " +
                   $"PriceMin: {priceMin}, " +
                   $"Details: {details}, " +
                   $"Project: {project}, " +
                   $"Stock: {stock} }}";
        }
    }
}
