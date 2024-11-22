using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models.WebApplication1.Models;

namespace WebApplication1.Models
{
    public class BOMComponent
    {
        public string componentId { get; set; }

        public string image { get; set; }

        public string name { get; set; }
        
        public int quantity { get; set; }

        public string selectedSupplier { get; set; }

        public List<BindingSocketProducerInner> suppliers { get; set; } = new List<BindingSocketProducerInner>();
    }
}
