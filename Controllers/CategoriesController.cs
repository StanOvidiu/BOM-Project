using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<Categories>> GetCategoryById(string categoryId)
        {
            var filter = Builders<Categories>.Filter.Eq("_id", categoryId);
            Categories category = await _categoriesCollection.Find(filter).FirstOrDefaultAsync();
            return Ok(category);
        }


        [HttpPost]
        public async Task<ActionResult<Categories>> CreateCategory([FromBody] Categories categories)
        {
            if (categories == null)
            {
                return NotFound("Cannot add a null object to DB!");
            }


            var existingCategory = await _categoriesCollection.Find(c => c._id == categories._id).FirstOrDefaultAsync();

            if (existingCategory != null)
            {
                return Conflict("A category with the same name already exists!");
            }

            await _categoriesCollection.InsertOneAsync(categories);
            return Ok(categories);

        }


        [HttpPut("{categoryId}")]
        public async Task<IActionResult> UpdateCategory(string categoryId, [FromBody] Categories updatedCategories)
        {
            var filter = Builders<Categories>.Filter.Eq("_id", ObjectId.Parse(categoryId));
            var alreadyExistCategories = await _categoriesCollection.Find(filter).FirstOrDefaultAsync();
            if (alreadyExistCategories != null)
            {

                alreadyExistCategories.name = updatedCategories.name;
                alreadyExistCategories.image = updatedCategories.image;
                alreadyExistCategories.subcategories = updatedCategories.subcategories;

                await _categoriesCollection.ReplaceOneAsync(filter, alreadyExistCategories);
                return Ok();
            }
            return NotFound();
        }

        [HttpPost("{categoryId}/add-subcategory")]
        public async Task<ActionResult> AddSubcategory(string categoryId, [FromBody] Subcategory newSubcategory)
        {
            if (string.IsNullOrEmpty(newSubcategory.name))
            {
                return BadRequest("Subcategory name is required.");
            }

            var filter = Builders<Categories>.Filter.Eq("_id", categoryId);
            var update = Builders<Categories>.Update.Push("subcategories", newSubcategory);

            var updateResult = await _categoriesCollection.UpdateOneAsync(filter, update);

            if (updateResult.MatchedCount == 0)
            {
                return NotFound("Category not found.");
            }

            return Ok("Subcategory added successfully.");
        }

        [HttpPut("{categoryId}/update-subcategory/{subcategoryName}")]
        public async Task<ActionResult> UpdateSubcategory(string categoryId, string subcategoryName, [FromBody] Subcategory updatedSubcategory)
        {
            if (string.IsNullOrEmpty(updatedSubcategory.name))
            {
                return BadRequest("Subcategory name is required.");
            }

            var duplicateFilter = Builders<Categories>.Filter.And(
                Builders<Categories>.Filter.Eq("_id", categoryId),
                Builders<Categories>.Filter.ElemMatch(
                    c => c.subcategories,
                    sc => sc.name == updatedSubcategory.name && sc.name != subcategoryName
                )
            );

            var duplicateCheck = await _categoriesCollection.Find(duplicateFilter).FirstOrDefaultAsync();
            if (duplicateCheck != null)
            {
                return Conflict("A subcategory with the same name already exists.");
            }

            // Filtrul pentru a găsi categoria și subcategoria care trebuie actualizată
            var filter = Builders<Categories>.Filter.And(
                Builders<Categories>.Filter.Eq("_id", categoryId),
                Builders<Categories>.Filter.ElemMatch(
                    c => c.subcategories,
                    sc => sc.name == subcategoryName
                )
            );


            var update = Builders<Categories>.Update.Set("subcategories.$.name", updatedSubcategory.name)
                                                     .Set("subcategories.$.image", updatedSubcategory.image);


            var updateResult = await _categoriesCollection.UpdateOneAsync(filter, update);

            if (updateResult.MatchedCount == 0)
            {
                return NotFound("Subcategory not found or category does not exist.");
            }

            return Ok("Subcategory updated successfully.");
        }


        [HttpDelete("{categoryId}/delete-subcategory/{subcategoryName}")]
        public async Task<ActionResult> DeleteSubcategory(string categoryId, string subcategoryName)
        {
            if (string.IsNullOrEmpty(subcategoryName))
            {
                return BadRequest("Subcategory name is required.");
            }


            var filter = Builders<Categories>.Filter.Eq("_id", categoryId);


            var update = Builders<Categories>.Update.PullFilter(
                "subcategories",
                Builders<Subcategory>.Filter.Eq("name", subcategoryName)
            );


            var updateResult = await _categoriesCollection.UpdateOneAsync(filter, update);

            if (updateResult.MatchedCount == 0)
            {
                return NotFound("Category not found.");
            }

            if (updateResult.ModifiedCount == 0)
            {
                return NotFound("Subcategory not found.");
            }

            return Ok("Subcategory deleted successfully.");
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(string categoryId)
        {
            var filter = Builders<Categories>.Filter.Eq("_id", ObjectId.Parse(categoryId));
            await _categoriesCollection.DeleteOneAsync(filter);
            return Ok();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}

