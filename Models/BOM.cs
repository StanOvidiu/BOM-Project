using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class BOM
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public bool selected { get; set; }

        public int bom_id { get; set; }

        public string project_name { get; set; }

        public string project_ds { get; set; }

        public string project_dg { get; set; }

        public string equipment_name { get; set; }

        public string variant { get; set; }

        public int sets { get; set; }

        public string created_by { get; set; }

        public string created_date { get; set; }

        public List<string> componentIDs { get; set; }
    }
}
