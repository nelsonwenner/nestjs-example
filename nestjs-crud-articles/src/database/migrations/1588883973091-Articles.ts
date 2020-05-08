import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Aticles1588883973091 implements MigrationInterface {

    private Articles = new Table({
        name: 'articles',
        columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },

            {
                name: 'slug',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'title',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'description',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'body',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'user_id',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },

            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            }
        ]
    })

    private foreignKey = new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'users',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.Articles)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.Articles)
    }
}
