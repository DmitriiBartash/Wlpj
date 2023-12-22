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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "swiperModels");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "swiperModels");
        }
    }
}
