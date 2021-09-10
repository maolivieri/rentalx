import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1631220269276 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "license_plate",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "daily_rate",
                        type: "numeric",
                    },
                    {
                        name: "fine_amount",
                        type: "numeric",
                    },
                    {
                        name: "available",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "brand",
                        type: "varchar",
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCarCategory",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL", //"RESTRICT"|"CASCADE"|"SET NULL"
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }
}
