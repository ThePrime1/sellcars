import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  /*These are typeorm hooks that runs after every operations and logs a results
  These are decorator hooks
  */

  @AfterInsert()
  logInsert() {
    console.log('New user inserted with ID ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed with ID ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated with ID ', this.id);
  }
}
