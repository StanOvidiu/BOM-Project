using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class Subcategory
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? name { get; set; } = string.Empty;

        [BsonElement("image")]
        [JsonPropertyName("image")]
        public string? image { get; set; } = string.Empty;
    }
}
