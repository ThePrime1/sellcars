import { Expose } from 'class-transformer';

//This one for out going data
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
