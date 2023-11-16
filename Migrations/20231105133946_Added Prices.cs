using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LandingPage.Migrations
{
    /// <inheritdoc />
    public partial class AddedPrices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "PriceEuro",
                table: "swiperModels",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "PriceUsd",
                table: "swiperModels",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceEuro",
                table: "swiperModels");

            migrationBuilder.DropColumn(
                name: "PriceUsd",
                table: "swiperModels");
        }
    }
}
