using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetTracker.Server.Models
{
    public class MonobankClient
    {
        public string? ClientId { get; set; }
        public string? Name { get; set; }
        public string? WebHookUrl { get; set; }
        public string? Permissions { get; set; }
        public AccountMono[]? Accounts { get; set; }
    }

    [Table("Accounts", Schema = "mono")]
    public class AccountMono
    {
        public required string Id { get; set; }
        public required string SendId { get; set; }
        public required int CurrencyCode { get; set; }
        public string? CashbackType { get; set; }
        public int Balance { get; set; }
        public int CreditLimit { get; set; }
        public string[]? MaskedPan { get; set; }
        public string? Type { get; set; }
        public string? Iban { get; set; }
    }

    [Table("Transactions", Schema = "mono")]
    public class TransactionMono
    {
        public required int Id { get; set; }
        [Timestamp]
        public int? Time { get; set; }
        public string? Description { get; set; }
        public int? Mcc { get; set; }
        public int? OriginalMcc { get; set; }
        public int? Amount { get; set; }
        public int? OperationAmount { get; set; }
        public int? CurrencyCode { get; set; }
        public int? CommissionRate { get; set; }
        public int? CashbackAmount { get; set; }
        public int? Balance { get; set; }
        public bool? Hold { get; set; }
    }

}
