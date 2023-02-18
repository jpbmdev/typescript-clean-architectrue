import {
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

export const generateUpdateUserDto = async (
  data: any
): Promise<{ updateUserDto: UpdateUserDto; errors: ValidationError[] }> => {
  const updateUserDto = new UpdateUserDto();

  updateUserDto.name = data?.name;
  updateUserDto.description = data?.description;

  const errors = await validate(updateUserDto);

  return { updateUserDto, errors };
};
