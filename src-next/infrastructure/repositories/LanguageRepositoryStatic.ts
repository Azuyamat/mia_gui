import LanguageRepository from "../../domain/repositories/LanguageRepository";
import { Language } from "../../domain/types/Language";
import { languages } from "../../data/languages";

export default class LanguageRepositoryStatic implements LanguageRepository {
    private get languages(): Language[] {
        return languages;
    }

    getLanguages(): Promise<Language[]> {
        return Promise.resolve(this.languages);
    }

    getLanguage(name: string): Promise<Language | null> {
        return Promise.resolve(
            this.languages.find((language) => language.name === name) || null
        );
    }
}
