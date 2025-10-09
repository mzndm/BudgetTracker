using BudgetTracker.Server.Data;
using BudgetTracker.Server.Models;
using BudgetTracker.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MonobankController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApiKeyService _apiKeyService;
        private readonly MonobankService _monobankService;
        private readonly ApplicationDbContext _context;

        public MonobankController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            ApiKeyService apiKeyService,
            MonobankService monobankService
        )
        {
            _userManager = userManager;
            _apiKeyService = apiKeyService;
            _monobankService = monobankService;
            _context = context;
        }

        // GET: api/Monobank/accounts
        [HttpGet("accounts")]
        public async Task<ActionResult<IEnumerable<AccountMono>>> GetMonobankAccounts()
        {
            var user = await _userManager.GetUserAsync(User); 

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var accounts = await _context.AccountsMono
                .Where(a => a.Owner == user.Id)
                .ToListAsync();

            return Ok(accounts);
        }

        // GET: api/Monobank/account/{id}
        [HttpGet("account/{id}")]
        public async Task<ActionResult<AccountMono>> GetMonobankAccount(string id)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var account = await _context.AccountsMono
                .FirstOrDefaultAsync(a => a.Id == id && a.Owner == user.Id);

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account);
        }

        // PUT: api/Monobank/account/{id}
        [HttpPut("account/{id}")]
        public async Task<IActionResult> UpdateMonobankAccount(string id, [FromBody] AccountMono updatedAccount)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            if (updatedAccount == null || id != updatedAccount.Id)
            {
                return BadRequest("Invalid account data.");
            }

            var account = await _context.AccountsMono
                .FirstOrDefaultAsync(a => a.Id == id && a.Owner == user.Id);

            if (account == null)
            {
                return NotFound();
            }

            // Update fields
            account.SendId = updatedAccount.SendId;
            account.Balance = updatedAccount.Balance;
            account.CreditLimit = updatedAccount.CreditLimit;
            account.Type = updatedAccount.Type;
            account.Name = updatedAccount.Name;
            account.CurrencyCode = updatedAccount.CurrencyCode;
            account.CashbackType = updatedAccount.CashbackType;
            account.MaskedPan = updatedAccount.MaskedPan;
            account.Iban = updatedAccount.Iban;
            // Owner should not be changed here

            _context.AccountsMono.Update(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Monobank/sync-accounts
        [HttpPost("sync-accounts")]
        public async Task<IActionResult> SyncAccounts()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var apiKey = await _apiKeyService.GetMonobankApiKeyAsync(user.Id);

            if (string.IsNullOrEmpty(apiKey))
            {
                return BadRequest("Monobank API key not found for the user.");
            }

            var clientInfo = await _monobankService.GetClientInfo(apiKey);

            if (clientInfo == null || clientInfo.Accounts == null)
            {
                return BadRequest("Monobank user or accounts not found.");
            }

            foreach (var monoAccount in clientInfo.Accounts)
            {
                var existingAccount = await _context.AccountsMono
                    .FirstOrDefaultAsync(a => a.Id == monoAccount.Id);

                if (existingAccount == null)
                {
                    // Add new account
                    monoAccount.Owner = user.Id;
                    _context.AccountsMono.Add(monoAccount);
                }
                else
                {
                    // Update existing account
                    existingAccount.Id = monoAccount.Id;
                    existingAccount.SendId = monoAccount.SendId;
                    existingAccount.Balance = monoAccount.Balance;
                    existingAccount.CreditLimit = monoAccount.CreditLimit;
                    existingAccount.Type = monoAccount.Type;
                    existingAccount.CurrencyCode = monoAccount.CurrencyCode;
                    existingAccount.CashbackType = monoAccount.CashbackType;
                    existingAccount.MaskedPan = monoAccount.MaskedPan;
                    existingAccount.Iban = monoAccount.Iban;
                    existingAccount.Owner = user.Id;
                }
            }

            await _context.SaveChangesAsync();

            // Return a JSON object instead of a plain string to avoid invalid JSON response
            return Ok(new { message = "Monobank accounts synchronized successfully." });
        }


        // GET: api/Monobank/statement
        [HttpGet("statement")]
        public async Task<ActionResult<IEnumerable<TransactionMono>>> GetMonobankStatement(
            [FromQuery] string? accountId,
            [FromQuery] long? from,
            [FromQuery] long? to)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var query = _context.TransactionsMono
                .Where(t => t.AccountMono.Owner == user.Id);

            if (!string.IsNullOrEmpty(accountId))
            {
                query = query.Where(t => t.AccountId == accountId);
            }

            if (from.HasValue)
            {
                query = query.Where(t => t.Time >= from.Value);
            }

            if (to.HasValue)
            {
                query = query.Where(t => t.Time <= to.Value);
            }

            var statement = await query.OrderByDescending(t => t.Time).ToListAsync();

            return Ok(statement);
        }


        // POST: api/Monobank/SyncTansactions
        [HttpPost("sync-transactions")]
        public async Task<IActionResult> SyncTransactions([FromQuery] string accountId, [FromQuery] long? from, [FromQuery] long? to = null)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var apiKey = await _apiKeyService.GetMonobankApiKeyAsync(user.Id);

            if (string.IsNullOrEmpty(apiKey))
            {
                return BadRequest("Monobank API key not found for the user.");
            }

            var clientInfo = await _monobankService.GetClientInfo(apiKey);

            if (clientInfo == null || clientInfo.Accounts == null)
            {
                return BadRequest("Monobank user or accounts not found.");
            }

            // Set default date range if not provided (e.g., last 30 days)
            long fromTimestamp = from ?? DateTimeOffset.UtcNow.AddDays(-30).ToUnixTimeSeconds();
            long toTimestamp = to ?? DateTimeOffset.UtcNow.ToUnixTimeSeconds();

            //foreach (var monoAccount in clientInfo.Accounts)
            var statement = await _monobankService.GetStatement(apiKey, accountId, fromTimestamp.ToString(), toTimestamp.ToString());

            if (statement != null)
            {
                foreach (var transaction in statement)
                {
                    var existingTransaction = await _context.TransactionsMono
                            .FirstOrDefaultAsync(t => t.Id == transaction.Id);

                    if (existingTransaction == null)
                    {
                        // Add new transaction
                        transaction.AccountId = accountId;
                        transaction.Owner = user.Id;
                        _context.TransactionsMono.Add(transaction);
                    }
                    else
                    {
                        existingTransaction.AccountId = accountId;
                        existingTransaction.Time = transaction.Time;
                        existingTransaction.Description = transaction.Description;
                        existingTransaction.Mcc = transaction.Mcc;
                        existingTransaction.OriginalMcc = transaction.OriginalMcc;
                        existingTransaction.Hold = transaction.Hold;
                        existingTransaction.Amount = transaction.Amount;
                        existingTransaction.OperationAmount = transaction.OperationAmount;
                        existingTransaction.CurrencyCode = transaction.CurrencyCode;
                        existingTransaction.CommissionRate = transaction.CommissionRate;
                        existingTransaction.CashbackAmount = transaction.CashbackAmount;
                        existingTransaction.Balance = transaction.Balance;
                        existingTransaction.Comment = transaction.Comment;
                        existingTransaction.ReceiptId = transaction.ReceiptId;
                        existingTransaction.InvoiceId = transaction.InvoiceId;
                        existingTransaction.CounterEdrpou = transaction.CounterEdrpou;
                        existingTransaction.CounterIban = transaction.CounterIban;
                        existingTransaction.CounterName = transaction.CounterName;
                        existingTransaction.Owner = user.Id;
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Monobank transactions synchronized successfully." });
        }

    }
}
