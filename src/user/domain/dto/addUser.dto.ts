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

export const generateAddUserDto = async (
  data: any
): Promise<{ addUserDto: AddUserDto; errors: ValidationError[] }> => {
  const addUserDto = new AddUserDto();

  addUserDto.name = data?.name;
  addUserDto.email = data?.email;
  addUserDto.description = data?.description;

  const errors = await validate(addUserDto);

  return { addUserDto, errors };
};
