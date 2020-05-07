import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1588828483970 implements MigrationInterface {

    private Users = new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },

            {
                name: 'name',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'email',
                type: 'varchar',
                isNullable: false,
            },

            {
                name: 'password',
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

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.Users)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.Users)
    }
}
