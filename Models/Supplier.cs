using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Supplier
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string name { get; set; }

        public bool ceos_catalog { get; set; }

        public string contact_person { get; set; }

        public List<string> phone_number { get; set; } = new List<string>();

        public List<string> mail { get; set; } = new List<string>();

        public string details { get; set; }

        public string web_page { get; set; }

        public string ranking_details { get; set; }

        public List<string> projects { get; set; } = new List<string>();

        public string address { get; set; }
    }
}
