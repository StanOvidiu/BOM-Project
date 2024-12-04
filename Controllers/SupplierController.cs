using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    [EnableCors("AllowSpecificOrigin")]
    public class SupplierController : Controller
    {
        private readonly IMongoCollection<Supplier> _supplierCollection;

        public SupplierController(IMongoDatabase database)
        {
            _supplierCollection = database.GetCollection<Supplier>("supplierContacts");
        }

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> GetAllSuppliers()
        {
            var suppliers = await _supplierCollection.Find(_ => true).ToListAsync();
            return Ok(suppliers);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
