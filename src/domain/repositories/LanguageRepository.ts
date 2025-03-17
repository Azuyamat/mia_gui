import { Language } from "../types/Language";

export default interface LanguageRepository {
    getLanguages(): Promise<Language[]>;
    getLanguage(name: string): Promise<Language | null>;
}
