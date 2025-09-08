using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class MonobankTransactionJarsModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Time",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                rowVersion: true,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldRowVersion: true,
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OperationAmount",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CommissionRate",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CashbackAmount",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Balance",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Amount",
                schema: "mono",
                table: "Transactions",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CounterEdrpou",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CounterIban",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CounterName",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceId",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReceiptId",
                schema: "mono",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CreditLimit",
                schema: "mono",
                table: "Accounts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "Balance",
                schema: "mono",
                table: "Accounts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CounterEdrpou",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CounterIban",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CounterName",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ReceiptId",
                schema: "mono",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "Time",
                schema: "mono",
                table: "Transactions",
                type: "int",
                rowVersion: true,
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldRowVersion: true,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OperationAmount",
                schema: "mono",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CommissionRate",
                schema: "mono",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CashbackAmount",
                schema: "mono",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Balance",
                schema: "mono",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                schema: "mono",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CreditLimit",
                schema: "mono",
                table: "Accounts",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "Balance",
                schema: "mono",
                table: "Accounts",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
