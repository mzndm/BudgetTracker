using System.ComponentModel.DataAnnotations;

namespace BudgetTracker.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public required int Type { get; set; } // "expense" = 0, "income" = 1, "transfer" = 2
        public int Amount { get; set; } = 0;
        public required int AccountId { get; set; }
        [MaxLength(255)]
        public string? AccountName { get; set; }
        public required DateTime? Date { get; set; }
        public int? CategoryId { get; set; }
        [MaxLength(255)]
        public string? CategoryName { get; set; }
        [MaxLength(50)]
        public string? CategoryIcon { get; set; }
        public int? AccountIdTo { get; set; }
        [MaxLength(255)]
        public string? AccountNameTo { get; set; }
        public string? Note { get; set; }
        [MaxLength(450)]
        public string? Owner { get; set; } // User.Id
        public DateTime Changed { get; set; }
    }
}
