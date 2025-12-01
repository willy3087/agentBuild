# Relatório de Internacionalização (i18n) - Flowise

## 📋 Resumo Executivo

**Status:** ❌ **NÃO IMPLEMENTADO**

A internacionalização (i18n) **NÃO está implementada** no código do Flowise. O projeto possui apenas arquivos README traduzidos na pasta `i18n/`, mas não há nenhuma biblioteca ou configuração de i18n no código-fonte.

---

## 🔍 Análise Detalhada

### 1. Bibliotecas de i18n

**Resultado:** ❌ Nenhuma biblioteca de i18n encontrada

- Não há `i18next`, `react-i18next`, `react-intl` ou qualquer outra biblioteca de internacionalização nos `package.json`
- `packages/ui/package.json` - Sem dependências de i18n
- `packages/server/package.json` - Sem dependências de i18n

### 2. Arquivos de Configuração

**Resultado:** ❌ Nenhum arquivo de configuração de i18n encontrado

- Não há arquivos `i18n.js`, `i18n.ts`, `locales/`, `translations/` ou similares
- A pasta `i18n/` contém apenas:
  - `README-KR.md` (Coreano)
  - `README-TW.md` (Chinês Tradicional)
  - `README-ZH.md` (Chinês Simplificado)
  - `README-JA.md` (Japonês)
  - `CODE_OF_CONDUCT-ZH.md`
  - `CONTRIBUTING-ZH.md`

**Conclusão:** Estes são apenas documentos traduzidos, não arquivos de configuração de i18n.

### 3. Uso de Funções de Tradução

**Resultado:** ❌ Nenhuma função de tradução encontrada

- Não há uso de `useTranslation()`, `t()`, `translate()`, `i18n.t()` ou funções similares no código
- Todas as strings estão hardcoded em inglês

---

## 📝 Exemplos de Strings Hardcoded Encontradas

### Componentes de UI

#### 1. Mensagens de Erro (`packages/ui/src/store/constant.js`)
```javascript
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
```

#### 2. Página de Login (`packages/ui/src/views/auth/signIn.jsx`)
```javascript
const usernameInput = {
    label: 'Username',
    name: 'username',
    type: 'email',
    placeholder: 'user@company.com'
}
const passwordInput = {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '********'
}
```

#### 3. Página de Registro (`packages/ui/src/views/organization/index.jsx`)
```javascript
<Typography variant='h1'>Setup Account</Typography>
<Alert severity='info'>
    Application authentication now requires email and password. Contact administrator to setup an account.
</Alert>
```

#### 4. Error Boundary (`packages/ui/src/ErrorBoundary.jsx`)
```javascript
<Typography variant='h2'>Oh snap!</Typography>
<Typography variant='h3'>The following error occurred when loading this page.</Typography>
<Typography variant='body1'>
    Please retry after some time. If the issue persists, reach out to us on our Discord server.
    <br />
    Alternatively, you can raise an issue on Github.
</Typography>
```

#### 5. Workspace (`packages/ui/src/views/workspace/index.jsx`)
```javascript
title: `Delete Workspace ${workspace.name}`,
searchPlaceholder='Search Workspaces'
```

#### 6. Chat Message (`packages/ui/src/views/chatmessage/ChatMessage.jsx`)
```javascript
message: 'Message stopped',
message = 'Oops! There seems to be an error. Please try again.'
```

### Outros Exemplos Encontrados

- **Workspace Users:** "Send Invite", "Update Invite", "Change Role", "Remove Users", "Search Users"
- **Vector Store:** "Upsert Vector Store", "Upsert Vector Database"
- **Variables:** "How To Use Variables", "Variables can be used in..."
- **Tools:** Várias strings relacionadas a ferramentas
- **Settings:** Mensagens de configuração
- **Dialogs:** Títulos e mensagens de diálogos

---

## 📊 Estatísticas

- **Arquivos com strings hardcoded:** Centenas de arquivos `.jsx` e `.js`
- **Componentes principais afetados:**
  - Autenticação (login, registro, reset password)
  - Workspace management
  - Chat flows
  - Settings
  - Error handling
  - Dialogs e modais
  - Tabelas e listagens
  - Formulários

---

## ✅ Recomendações para Implementação

### 1. Escolher uma Biblioteca de i18n

**Recomendação:** `react-i18next` (mais popular para React)

```bash
cd packages/ui
pnpm add i18next react-i18next i18next-browser-languagedetector
```

### 2. Estrutura de Arquivos Sugerida

```
packages/ui/src/
├── i18n/
│   ├── config.js          # Configuração do i18next
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       ├── pt/
│       │   └── translation.json
│       ├── es/
│       │   └── translation.json
│       ├── zh/
│       │   └── translation.json
│       ├── ja/
│       │   └── translation.json
│       └── ko/
│           └── translation.json
```

### 3. Passos de Implementação

1. **Instalar dependências**
2. **Criar arquivos de tradução** para cada idioma
3. **Configurar i18next** no `index.jsx` ou `App.jsx`
4. **Substituir strings hardcoded** por chamadas `t('key')`
5. **Adicionar seletor de idioma** no header/settings
6. **Testar** todas as traduções

### 4. Exemplo de Implementação

**Antes:**
```jsx
<Typography variant='h1'>Setup Account</Typography>
```

**Depois:**
```jsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
<Typography variant='h1'>{t('auth.setupAccount')}</Typography>
```

**Arquivo de tradução (`en/translation.json`):**
```json
{
  "auth": {
    "setupAccount": "Setup Account"
  }
}
```

### 5. Priorização

**Alta Prioridade:**
- Mensagens de erro
- Formulários de autenticação
- Mensagens de feedback (sucesso/erro)
- Labels de formulários

**Média Prioridade:**
- Títulos de páginas
- Botões e ações
- Placeholders
- Tooltips

**Baixa Prioridade:**
- Mensagens de ajuda
- Textos informativos
- Comentários em código

---

## 🎯 Conclusão

O projeto Flowise **não possui implementação de i18n**. Todas as strings estão hardcoded em inglês e precisariam ser extraídas para arquivos de tradução para suportar múltiplos idiomas.

**Próximos Passos Sugeridos:**
1. Decidir quais idiomas suportar inicialmente
2. Instalar e configurar `react-i18next`
3. Criar estrutura de arquivos de tradução
4. Começar a migração pelos componentes mais críticos (autenticação, erros)
5. Adicionar seletor de idioma na interface

---

**Data do Relatório:** 2025-01-27
**Versão Analisada:** Flowise 3.0.8

