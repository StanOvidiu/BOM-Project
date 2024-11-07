using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class Categories
    {
        // MongoDB ID field
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        // Name property
        public string name { get; set; }

        // List of subcategories
        [Required]
        public List<string> subcategories { get; set; } = new List<string>();

        // Constructor
        public Categories()
        {
            subcategories = new List<string>();
        }

        // ToString override
        public override string ToString()
        {
            return $"Categories [Id={_id}, Name={name}, Subcategories={string.Join(", ", subcategories)}]";
        }

        // Equals and GetHashCode methods
        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;

            var other = (Categories)obj;
            return _id == other._id && name == other.name && subcategories.SequenceEqual(other.subcategories);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(_id, name, subcategories);
        }
    }
}
