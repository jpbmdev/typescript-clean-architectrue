import {
  IsEmail,
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
} from "class-validator";

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  description: string;
}

export const validateAddUserDto = async (
  body: any
): Promise<ValidationError[]> => {
  const newAddUserDto = new AddUserDto();

  newAddUserDto.name = body.name;
  newAddUserDto.email = body.email;
  newAddUserDto.description = body.description;

  return validate(newAddUserDto);
};
