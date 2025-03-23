import LanguageRepository from "../repositories/LanguageRepository";
import LanguageRepositoryStatic from "../../infrastructure/repositories/LanguageRepositoryStatic";

export default class LanguageService {
    private languageRepository: LanguageRepository;

    constructor(
        languageRepository: LanguageRepository = new LanguageRepositoryStatic()
    ) {
        this.languageRepository = languageRepository;
    }

    async getLanguages() {
        return this.languageRepository.getLanguages();
    }

    async getLanguage(name: string) {
        const language = await this.languageRepository.getLanguage(name);
        if (!language) {
            throw new Error(`Language ${name} not found`);
        }

        return language;
    }
}
