import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importar arquivos de tradução
import enTranslation from './locales/en/translation.json'
import ptBRTranslation from './locales/pt-BR/translation.json'

// Configuração do detector de idioma
const languageDetectorOptions = {
    // Ordem de detecção:
    // 1. localStorage (preferência do usuário)
    // 2. Idioma do navegador
    // 3. Fallback para português brasileiro
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'], // Excluir modo de desenvolvimento
}

// Recursos de tradução
const resources = {
    en: {
        translation: enTranslation
    },
    'pt-BR': {
        translation: ptBRTranslation
    }
}

// Configuração do i18next
i18n
    .use(LanguageDetector) // Detector de idioma do navegador
    .use(initReactI18next) // Passa instância do i18n para react-i18next
    .init({
        resources,
        fallbackLng: 'pt-BR', // Idioma padrão se tradução não encontrada (Brasil)
        supportedLngs: ['en', 'pt-BR'], // Idiomas suportados
        detection: languageDetectorOptions,

        // Interpolação
        interpolation: {
            escapeValue: false // React já faz escape por padrão
        },

        // Namespace padrão
        defaultNS: 'translation',
        ns: ['translation'],

        // Opções de debug (desabilitado em produção)
        debug: false,

        // Opções de react-i18next
        react: {
            useSuspense: false // Não usar Suspense para evitar problemas de renderização
        }
    })

export default i18n

