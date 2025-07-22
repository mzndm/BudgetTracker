using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BudgetTracker.Server.Models
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }
        public required string UserId { get; set; }
        [JsonIgnore]
        [ForeignKey("UserId")]
        public IdentityUser? User { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string Currency { get; set; } = "UAH";
        public int CurrencyCode { get; set; } = 980;
        public string? ApiKeyMonobank { get; set; }
        public DateTime Created { get; set; }
        public DateTime Changed { get; set; }
    }
}
