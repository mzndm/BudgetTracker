using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class MonobankTransactionOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Owner",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Owner",
                schema: "mono",
                table: "Transactions");
        }
    }
}
