using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Component
    {
        public string componentId { get; set; }

        public string image { get; set; }

        public string name { get; set; }

        public string add_date { get; set; }

        public string add_user { get; set; }

        public int quantity { get; set; }
    }
}
