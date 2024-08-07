import { Exclude } from 'class-transformer';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
  
  @AfterInsert()
  logInsert(){
    console.log(`inserted user by the id of ${this.id}`);
  }

  @AfterUpdate()
  logUpdate(){
    console.log(`updated user by the id of ${this.id}`);
  }

  @AfterRemove()
  logRemove(){
    console.log(`removed user by the id of ${this.id}`);
  }
}
