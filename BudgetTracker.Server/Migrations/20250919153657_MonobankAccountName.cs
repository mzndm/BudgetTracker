using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class MonobankAccountName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "mono",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                schema: "mono",
                table: "Accounts");
        }
    }
}
