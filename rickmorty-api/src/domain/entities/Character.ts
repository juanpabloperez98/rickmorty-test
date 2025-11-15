import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "characters" })
export class Character extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING })
  status!: string;

  @Column({ type: DataType.STRING })
  species!: string;

  @Column({ type: DataType.STRING })
  gender!: string;

  @Column({ type: DataType.STRING })
  origin!: string;

  @Column({ type: DataType.STRING })
  image!: string;
}
