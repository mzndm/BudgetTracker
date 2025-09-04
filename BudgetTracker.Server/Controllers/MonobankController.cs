using BudgetTracker.Server.Models;
using BudgetTracker.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        public MonobankController(
            UserManager<IdentityUser> userManager,
            ApiKeyService apiKeyService,
            MonobankService monobankService
        )
        {
            _userManager = userManager;
            _apiKeyService = apiKeyService;
            _monobankService = monobankService;
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

            var apiKey = await _apiKeyService.GetMonobankApiKeyAsync(user.Id);

            if (string.IsNullOrEmpty(apiKey))
            {
                return BadRequest("Monobank API key not found for the user.");
            }

            var clientInfo = await _monobankService.GetClientInfo(apiKey);

            if (clientInfo == null)
            {
                return BadRequest("Monobank user not found.");
            }

            return Ok(clientInfo.Accounts);
        }

    }
}
