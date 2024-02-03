import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export function validate<T extends object>(dto: ClassConstructor<T>, obj: any) {
    const data = plainToInstance(dto, obj);

    const errors = validateSync(data);
    if (errors.length > 0) {
        throw new Error(
            errors
                .map((error) => (error.constraints ? Object.values(error.constraints).join('. ') : ''))
                .join(';\n'),
        );
    }

    return data as T;
}