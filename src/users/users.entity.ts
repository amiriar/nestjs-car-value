import { Exclude } from 'class-transformer';
import { Reports } from 'src/reports/reports.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Reports, (report) => report.user)
  reports: Reports[];

  @AfterInsert()
  logInsert() {
    console.log(`inserted user by the id of ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`updated user by the id of ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`removed user by the id of ${this.id}`);
  }
}
