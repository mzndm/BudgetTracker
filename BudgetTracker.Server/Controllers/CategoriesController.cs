using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetTracker.Server.Data;
using BudgetTracker.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace BudgetTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public CategoriesController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context; 
            _userManager = userManager;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var categories = await _context.Categories
                .Where(c => c.Owner == user.Id)
                .ToListAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found for the current user.");
            }

            return Ok(categories);

        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound("Category not found.");
            }

            if (category.Owner != user.Id)
            {
                return Forbid("You are not authorized to access this category.");
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var existingCategory = await _context.Categories.FindAsync(id);

            if (existingCategory == null)
            {
                return NotFound("Category not found.");
            }

            if (existingCategory.Owner != user.Id)
            {
                return Forbid("You are not authorized to update this category.");
            }

            existingCategory.Type = category.Type;
            existingCategory.Name = category.Name;
            existingCategory.Icon = category.Icon;
            existingCategory.ParentCategory = category.ParentCategory;
            existingCategory.Changed = DateTime.UtcNow;

            _context.Entry(existingCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound("Category not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            category.Owner = user.Id;
            category.Changed = DateTime.UtcNow;


            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
