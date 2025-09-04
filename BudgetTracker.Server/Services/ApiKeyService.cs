using BudgetTracker.Server.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace BudgetTracker.Server.Services
{
    public class ApiKeyService
    {
        private readonly ApplicationDbContext _context;

        public ApiKeyService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string?> GetMonobankApiKeyAsync(string userId)
        {
            var userProfile = await _context.UserProfile
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (string.IsNullOrEmpty(userProfile?.ApiKeyMonobank))
                return null;

            return userProfile.ApiKeyMonobank;
        }

    }
}
