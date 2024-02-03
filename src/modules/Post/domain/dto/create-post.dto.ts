import {
    IsEnum, IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsNumber()
    readonly authorId!: number;

    @IsNotEmpty()
    @IsString()
    readonly title!: string;

    @IsNotEmpty()
    @IsString()
    readonly content!: string;
}
