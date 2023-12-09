using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LandingPage.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathToPicture",
                table: "swiperModels");

            migrationBuilder.CreateTable(
                name: "swiperImagesAndPictures",
                columns: table => new
                {
                    CountryID = table.Column<int>(type: "INTEGER", nullable: false),
                    PathToPicture = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "swiperImagesAndPictures");

            migrationBuilder.AddColumn<string>(
                name: "PathToPicture",
                table: "swiperModels",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
