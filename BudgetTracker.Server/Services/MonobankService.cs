using BudgetTracker.Server.Models;

namespace BudgetTracker.Server.Services
{

    public class MonobankService
    {
        private const string _apiURL = "https://api.monobank.ua";
        public MonobankService() { }

        public async Task<MonobankClient?> GetClientInfo(string apiKey)
        {
            using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Add("X-Token", apiKey);

            var response = await httpClient.GetAsync($"{_apiURL}/personal/client-info");

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<MonobankClient>();
        }

        public async Task<TransactionMono[]?> GetStatement(string apiKey, string account, string from, string? to)
        {
            using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Add("X-Token", apiKey);

            var response = await httpClient.GetAsync($"{_apiURL}/personal/statement/{account}/{from}/{to}");

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<TransactionMono[]>();
        }

    }
}
