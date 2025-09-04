using BudgetTracker.Server.Models;

namespace BudgetTracker.Server.Services
{

    public class MonobankService
    {
        public MonobankService() { }

        public async Task<MonobankClient?> GetClientInfo(string apiKey)
        {
            using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Add("X-Token", apiKey);

            var response = await httpClient.GetAsync("https://api.monobank.ua/personal/client-info");

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<MonobankClient>();
        }

    }
}
