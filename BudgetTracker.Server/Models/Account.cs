using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.Server.Models
{
    public class Account
    {
        public int Id { get; set; }
        public required int Type { get; set; } // "cash" = 0, "card" = 1, "bank" = 2
        [MaxLength(255)]
        public required string Name { get; set; }
        [MaxLength(50)]
        public int Amount { get; set; } = 0;
        public string Currency { get; set; } = "UAH"; 
        public int Status { get; set; } = 1; // "Active" = 1, "Inactive" = 0
        [MaxLength(450)]
        public string? Owner { get; set; } // User.Id
        public DateTime Changed { get; set; }
    }
}
