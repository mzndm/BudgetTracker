using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class RecreateTransactionsWithStringId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "mono");

            migrationBuilder.CreateTable(
                name: "Transactions",
                schema: "mono",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
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
                name: "Transactions",
                schema: "mono");
        }
    }
}
