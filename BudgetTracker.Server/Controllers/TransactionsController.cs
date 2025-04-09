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
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TransactionsController(
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager
        )
        {
            _context = context;
            _userManager = userManager;
        }

        // GET /api/Transactions?startDate=2025-04-01&endDate=2025-04-09
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate
        )
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var query = _context.Transactions.Where(t => t.Owner == user.Id);

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(t => t.Date >= startDate.Value && t.Date <= endDate.Value);
            }
            else if (startDate.HasValue) // Single day filter (for the start date only)
            {
                query = query.Where(t => t.Date == startDate.Value.Date);
            }

            var transactions = await query.ToListAsync();

            return Ok(transactions);
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(int id)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            if (transaction.Owner != user.Id)
            {
                return Forbid("You are not authorized to access this account.");
            }

            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction(Transaction transaction)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            if (transaction.Amount <= 0 || transaction.Type < 0 || transaction.Type > 2)
            {
                return BadRequest("Invalid transaction data.");
            }            

            transaction.Owner = user.Id;
            transaction.Changed = DateTime.UtcNow;
            //transaction.Date = DateTime.UtcNow;

            // Update accounts
            try
            {
                await UpdateAccountsForTransaction(transaction, user.Id);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

            // Save transaction
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.Id }, transaction);
        }

        // PUT: api/Transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest("Transaction ID mismatch.");
            }

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var existingTransaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id && t.Owner == user.Id);
            if (existingTransaction == null)
            {
                return NotFound("Transaction not found.");
            }

            //transaction.Owner = user.Id;
            transaction.Changed = DateTime.UtcNow;

            // Adjust accounts for the updated transaction
            try
            {
                // Revert the effects of the previous transaction
                await UpdateAccountsForTransaction(new Transaction
                {
                    Type = existingTransaction.Type,
                    Date = existingTransaction.Date,
                    AccountId = existingTransaction.AccountId,
                    AccountIdTo = existingTransaction.AccountIdTo,
                    Amount = -existingTransaction.Amount // Reverse the previous amount
                }, user.Id);

                // Apply the new transaction
                await UpdateAccountsForTransaction(transaction, user.Id);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

            // Update the transaction
            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized("User not authenticated.");
            }

            // Find the transaction by ID and ensure it belongs to the authenticated user
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id && t.Owner == user.Id);

            if (transaction == null)
            {
                return NotFound("Transaction not found or you are not authorized to delete it.");
            }

            try
            {
                // Reverse the transaction by creating a compensating transaction
                var reverseTransaction = new Transaction
                {
                    Type = transaction.Type,          // Use the same type
                    Date = transaction.Date,
                    AccountId = transaction.AccountId,
                    AccountIdTo = transaction.AccountIdTo,
                    Amount = -transaction.Amount,     // Reverse the amount
                    Owner = transaction.Owner
                };

                await UpdateAccountsForTransaction(reverseTransaction, user.Id);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"Failed to reverse the transaction's impact on accounts: {ex.Message}");
            }

            // Remove the transaction
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task UpdateAccountsForTransaction(Transaction transaction, string userId)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == transaction.AccountId && a.Owner == userId);

            if (account == null || account.Status == 0) // Status "Inactive"
            {
                throw new InvalidOperationException("Invalid or inactive account.");
            }

            switch (transaction.Type)
            {
                case 0: // Expense
                    account.Amount -= transaction.Amount; // Allow negative balance
                    break;

                case 1: // Income
                    account.Amount += transaction.Amount;
                    break;

                case 2: // Transfer
                    var accountTo = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == transaction.AccountIdTo && a.Owner == userId);
                    if (accountTo == null || accountTo.Status == 0) // Status "Inactive"
                    {
                        throw new InvalidOperationException("Invalid or inactive target account.");
                    }

                    account.Amount -= transaction.Amount; // Allow negative balance
                    accountTo.Amount += transaction.Amount;

                    // Save changes for the target account
                    _context.Entry(accountTo).State = EntityState.Modified;
                    break;

                default:
                    throw new InvalidOperationException("Unsupported transaction type.");
            }

            // Save changes for the source account
            _context.Entry(account).State = EntityState.Modified;
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}
