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
    [EnableCors("AllowSpecificOrigin")]
    public class CategoriesController : Controller
    {
        private readonly IMongoCollection<Categories> _categoriesCollection;

        // Injecting MongoDB client
        public CategoriesController(IMongoDatabase database)
        {
            _categoriesCollection = database.GetCollection<Categories>("categories");
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<List<Categories>>> GetCategories()
        {
            var categories = await GetListOfAllCategoriesFromDB();
            return Ok(categories);
        }

        // Method to fetch all Categories from the database
        private async Task<List<Categories>> GetListOfAllCategoriesFromDB()
        {
            return await _categoriesCollection.Find(_ => true).ToListAsync();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
