type ValidationRule<T> = (value: T) => string | null;

export class Validator<T> {
    private rules: ValidationRule<T>[] = [];

    addRule(rule: ValidationRule<T>): this {
        this.rules.push(rule);
        return this;
    }

    validate(value: T): string[] {
        return this.rules.map((rule) => rule(value)).filter((error) => error !== null) as string[];
    }
}
