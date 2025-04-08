using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required int Type { get; set; } // "expense" = 0, "income" = 1, "transfer" = 2
        [MaxLength(255)]
        public required string Name { get; set; }
        [MaxLength(50)]
        public string? Icon { get; set; }
        public int? ParentCategory { get; set; } // Nullable in case the category has no parent
        public int Status { get; set; } = 1; // "Active" = 1, "Inactive" = 0
        [MaxLength(450)]
        public string? Owner { get; set; } // User.Id
        public DateTime Changed { get; set; }
    }
}
