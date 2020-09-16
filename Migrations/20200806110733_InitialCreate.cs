using Microsoft.EntityFrameworkCore.Migrations;

namespace Projet_auto_ecole.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Eleve",
                columns: table => new
                {
                    Cin_Eleve = table.Column<string>(nullable: false),
                    Nom = table.Column<string>(nullable: true),
                    Prenom = table.Column<string>(nullable: true),
                    Date_naissance = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    Tel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eleve", x => x.Cin_Eleve);
                });

            migrationBuilder.CreateTable(
                name: "Examen",
                columns: table => new
                {
                    Id_Examen = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cin_Eleve = table.Column<string>(nullable: true),
                    Date = table.Column<string>(nullable: true),
                    Etat = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examen", x => x.Id_Examen);
                });

            migrationBuilder.CreateTable(
                name: "Moniteur",
                columns: table => new
                {
                    Cin_Moniteur = table.Column<string>(nullable: false),
                    Nom = table.Column<string>(nullable: true),
                    Prenom = table.Column<string>(nullable: true),
                    Date_naissance = table.Column<string>(nullable: true),
                    Adresse = table.Column<string>(nullable: true),
                    Tel = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moniteur", x => x.Cin_Moniteur);
                });

            migrationBuilder.CreateTable(
                name: "Paiement",
                columns: table => new
                {
                    Id_Paiement = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cin_Eleve = table.Column<string>(nullable: true),
                    Montant = table.Column<float>(nullable: false),
                    Date = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paiement", x => x.Id_Paiement);
                });

            migrationBuilder.CreateTable(
                name: "Prix",
                columns: table => new
                {
                    Id_Prix = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: true),
                    Montant = table.Column<float>(nullable: false),
                    Etat = table.Column<string>(nullable: true),
                    Date_debut = table.Column<string>(nullable: true),
                    Date_fin = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prix", x => x.Id_Prix);
                });

            migrationBuilder.CreateTable(
                name: "Seance",
                columns: table => new
                {
                    Id_Seance = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cin_Eleve = table.Column<string>(nullable: true),
                    Cin_Moniteur = table.Column<string>(nullable: true),
                    Date = table.Column<string>(nullable: true),
                    Heure_debut = table.Column<int>(nullable: false),
                    Heure_fin = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seance", x => x.Id_Seance);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eleve");

            migrationBuilder.DropTable(
                name: "Examen");

            migrationBuilder.DropTable(
                name: "Moniteur");

            migrationBuilder.DropTable(
                name: "Paiement");

            migrationBuilder.DropTable(
                name: "Prix");

            migrationBuilder.DropTable(
                name: "Seance");
        }
    }
}
