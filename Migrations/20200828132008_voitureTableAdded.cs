using Microsoft.EntityFrameworkCore.Migrations;

namespace Projet_auto_ecole.Migrations
{
    public partial class voitureTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Immatriculation_Voiture",
                table: "Seance",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Voiture",
                columns: table => new
                {
                    Immatriculation = table.Column<string>(nullable: false),
                    Marque = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voiture", x => x.Immatriculation);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Voiture");

            migrationBuilder.DropColumn(
                name: "Immatriculation_Voiture",
                table: "Seance");
        }
    }
}
