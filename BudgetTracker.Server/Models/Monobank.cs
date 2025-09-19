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
        public JarMono[]? Jars { get; set; }
    }

    [Table("Accounts", Schema = "mono")]
    public class AccountMono
    {
        public required string Id { get; set; }
        public required string SendId { get; set; }
        public long Balance { get; set; }
        public long CreditLimit { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public required int CurrencyCode { get; set; }
        public string? CashbackType { get; set; }
        public string[]? MaskedPan { get; set; }
        public string? Iban { get; set; }
        public string? Owner { get; set; } // User.Id

    }

    public class JarMono
    {
        public required string Id { get; set; }
        public required string SendId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public required int CurrencyCode { get; set; }
        public long Balance { get; set; }
        public long Goal { get; set; }
    }  

    [Table("Transactions", Schema = "mono")]
    public class TransactionMono
    {
        public required string Id { get; set; }
        public string? AccountId { get; set; } // Foreign key

        [ForeignKey("AccountId")]
        public AccountMono AccountMono { get; set; }
        public long? Time { get; set; }
        public string? Description { get; set; }
        public int? Mcc { get; set; }
        public int? OriginalMcc { get; set; }
        public bool? Hold { get; set; }
        public long? Amount { get; set; }
        public long? OperationAmount { get; set; }
        public int? CurrencyCode { get; set; }
        public long? CommissionRate { get; set; }
        public long? CashbackAmount { get; set; }
        public long? Balance { get; set; }
        public string? Comment { get; set; }
        public string? ReceiptId { get; set; }
        public string? InvoiceId { get; set; }
        public string? CounterEdrpou { get; set; }
        public string? CounterIban { get; set; }
        public string? CounterName { get; set; }
        public string? Owner { get; set; } // User.Id
    }

}
