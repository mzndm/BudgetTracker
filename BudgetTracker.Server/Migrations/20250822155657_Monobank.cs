using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Monobank : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "mono");

            migrationBuilder.AddColumn<string>(
                name: "MonobankClientId",
                table: "UserProfile",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Accounts",
                schema: "mono",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SendId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyCode = table.Column<int>(type: "int", nullable: false),
                    CashbackType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Balance = table.Column<int>(type: "int", nullable: false),
                    CreditLimit = table.Column<int>(type: "int", nullable: false),
                    MaskedPan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Iban = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                schema: "mono",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<int>(type: "int", rowVersion: true, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mcc = table.Column<int>(type: "int", nullable: true),
                    OriginalMcc = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<int>(type: "int", nullable: true),
                    OperationAmount = table.Column<int>(type: "int", nullable: true),
                    CurrencyCode = table.Column<int>(type: "int", nullable: true),
                    CommissionRate = table.Column<int>(type: "int", nullable: true),
                    CashbackAmount = table.Column<int>(type: "int", nullable: true),
                    Balance = table.Column<int>(type: "int", nullable: true),
                    Hold = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts",
                schema: "mono");

            migrationBuilder.DropTable(
                name: "Transactions",
                schema: "mono");

            migrationBuilder.DropColumn(
                name: "MonobankClientId",
                table: "UserProfile");
        }
    }
}
