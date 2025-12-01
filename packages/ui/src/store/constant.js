// constant
import {
    IconLibrary,
    IconTools,
    IconFunctionFilled,
    IconMessageCircleFilled,
    IconRobot,
    IconArrowsSplit,
    IconPlayerPlayFilled,
    IconSparkles,
    IconReplaceUser,
    IconRepeat,
    IconSubtask,
    IconNote,
    IconWorld,
    IconRelationOneToManyFilled,
    IconVectorBezier2
} from '@tabler/icons-react'

export const gridSpacing = 3
export const drawerWidth = 260
export const appDrawerWidth = 320
export const headerHeight = 80
export const maxScroll = 100000
export const baseURL = import.meta.env.VITE_API_BASE_URL || window.location.origin
export const uiBaseURL = import.meta.env.VITE_UI_BASE_URL || window.location.origin
export const FLOWISE_CREDENTIAL_ID = 'FLOWISE_CREDENTIAL_ID'
export const REDACTED_CREDENTIAL_VALUE = '_FLOWISE_BLANK_07167752-1a71-43b1-bf8f-4f32252165db'

// ErrorMessage mantém valores originais em inglês para compatibilidade com comparações do servidor
// Use getTranslatedErrorMessage() para obter traduções quando necessário
export const ErrorMessage = {
    INVALID_MISSING_TOKEN: 'Invalid or Missing token',
    TOKEN_EXPIRED: 'Token Expired',
    REFRESH_TOKEN_EXPIRED: 'Refresh Token Expired',
    FORBIDDEN: 'Forbidden',
    UNKNOWN_USER: 'Unknown Username or Password',
    INCORRECT_PASSWORD: 'Incorrect Password',
    INACTIVE_USER: 'Inactive User',
    INVALID_WORKSPACE: 'No Workspace Assigned',
    UNKNOWN_ERROR: 'Unknown Error'
}

// Mapeamento de ErrorMessage para chaves de tradução
const ERROR_MESSAGE_KEYS = {
    [ErrorMessage.INVALID_MISSING_TOKEN]: 'errors.invalidToken',
    [ErrorMessage.TOKEN_EXPIRED]: 'errors.tokenExpired',
    [ErrorMessage.REFRESH_TOKEN_EXPIRED]: 'errors.refreshTokenExpired',
    [ErrorMessage.FORBIDDEN]: 'errors.forbidden',
    [ErrorMessage.UNKNOWN_USER]: 'errors.unknownUser',
    [ErrorMessage.INCORRECT_PASSWORD]: 'errors.incorrectPassword',
    [ErrorMessage.INACTIVE_USER]: 'errors.inactiveUser',
    [ErrorMessage.INVALID_WORKSPACE]: 'errors.invalidWorkspace',
    [ErrorMessage.UNKNOWN_ERROR]: 'errors.unknownError'
}

// Função helper para obter tradução de mensagem de erro
// Retorna a mensagem traduzida ou a mensagem original se tradução não encontrada
// Esta função deve ser usada dentro de componentes React ou após i18n estar inicializado
export const getTranslatedErrorMessage = (errorMessage) => {
    // Importação dinâmica para evitar problemas de inicialização
    try {
        const i18n = require('@/i18n/config').default
        const translationKey = ERROR_MESSAGE_KEYS[errorMessage]
        if (translationKey && i18n && i18n.isInitialized) {
            return i18n.t(translationKey)
        }
    } catch (error) {
        // Se i18n ainda não estiver disponível, retorna mensagem original
        console.warn('i18n not initialized yet, returning original error message')
    }
    return errorMessage
}
export const AGENTFLOW_ICONS = [
    {
        name: 'conditionAgentflow',
        icon: IconArrowsSplit,
        color: '#FFB938'
    },
    {
        name: 'startAgentflow',
        icon: IconPlayerPlayFilled,
        color: '#7EE787'
    },
    {
        name: 'llmAgentflow',
        icon: IconSparkles,
        color: '#64B5F6'
    },
    {
        name: 'agentAgentflow',
        icon: IconRobot,
        color: '#4DD0E1'
    },
    {
        name: 'humanInputAgentflow',
        icon: IconReplaceUser,
        color: '#6E6EFD'
    },
    {
        name: 'loopAgentflow',
        icon: IconRepeat,
        color: '#FFA07A'
    },
    {
        name: 'directReplyAgentflow',
        icon: IconMessageCircleFilled,
        color: '#4DDBBB'
    },
    {
        name: 'customFunctionAgentflow',
        icon: IconFunctionFilled,
        color: '#E4B7FF'
    },
    {
        name: 'toolAgentflow',
        icon: IconTools,
        color: '#d4a373'
    },
    {
        name: 'retrieverAgentflow',
        icon: IconLibrary,
        color: '#b8bedd'
    },
    {
        name: 'conditionAgentAgentflow',
        icon: IconSubtask,
        color: '#ff8fab'
    },
    {
        name: 'stickyNoteAgentflow',
        icon: IconNote,
        color: '#fee440'
    },
    {
        name: 'httpAgentflow',
        icon: IconWorld,
        color: '#FF7F7F'
    },
    {
        name: 'iterationAgentflow',
        icon: IconRelationOneToManyFilled,
        color: '#9C89B8'
    },
    {
        name: 'executeFlowAgentflow',
        icon: IconVectorBezier2,
        color: '#a3b18a'
    }
]
