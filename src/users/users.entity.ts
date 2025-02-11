import {
  Entity,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import SnowflakeId from 'snowflake-id';

const snowflake = new SnowflakeId({
  mid: 42,
  offset: (2020 - 1970) * 31536000 * 1000,
});

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'char', length: 20 })
  id: string;

  @Column({ unique: true })
  username: string;

  @Exclude() // 这个字段将不会被序列化
  @Column()
  password: string;

  @Exclude() // 这个字段将不会被序列化
  @Column()
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generateId() {
    this.id = snowflake.generate().toString();
  }
}
