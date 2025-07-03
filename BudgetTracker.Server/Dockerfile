FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY BudgetTracker.sln .
COPY BudgetTracker.Server/ BudgetTracker.Server/
RUN dotnet restore BudgetTracker.Server/BudgetTracker.Server.csproj

WORKDIR /src/BudgetTracker.Server
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

RUN apt-get update && \
    apt-get install -y libgssapi-krb5-2 && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app .
ENTRYPOINT ["dotnet", "BudgetTracker.Server.dll"]
