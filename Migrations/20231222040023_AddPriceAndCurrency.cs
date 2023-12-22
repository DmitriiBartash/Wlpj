using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LandingPage.Migrations
{
    /// <inheritdoc />
    public partial class AddPriceAndCurrency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "swiperModels");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "swiperModels");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "swiperModels",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "swiperModels",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "swiperModels");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "swiperModels");

            migrationBuilder.AddColumn<float>(
                name: "Currency",
                table: "swiperModels",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "swiperModels",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
