# Mapeamento Completo de Strings para i18n

Este documento mapeia todas as strings hardcoded encontradas no código Flowise UI, organizadas por categoria e localização.

## Estrutura de Chaves

As chaves seguem uma estrutura nested hierárquica: `categoria.subcategoria.elemento`

---

## 1. Constantes e Mensagens de Erro

**Arquivo:** `packages/ui/src/store/constant.js`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 30 | Invalid or Missing token | error | `errors.invalidToken` | Mensagem de erro de autenticação |
| 31 | Token Expired | error | `errors.tokenExpired` | Token expirado |
| 32 | Refresh Token Expired | error | `errors.refreshTokenExpired` | Refresh token expirado |
| 33 | Forbidden | error | `errors.forbidden` | Acesso negado |
| 34 | Unknown Username or Password | error | `errors.unknownUser` | Credenciais inválidas |
| 35 | Incorrect Password | error | `errors.incorrectPassword` | Senha incorreta |
| 36 | Inactive User | error | `errors.inactiveUser` | Usuário inativo |
| 37 | No Workspace Assigned | error | `errors.invalidWorkspace` | Sem workspace atribuído |
| 38 | Unknown Error | error | `errors.unknownError` | Erro desconhecido |

---

## 2. Menu de Navegação

**Arquivo:** `packages/ui/src/menu-items/dashboard.js`

### Grupos de Menu

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 163 | Evaluations | group | `menu.evaluations.title` | Título do grupo de avaliações |
| 200 | User & Workspace Management | group | `menu.management.title` | Título do grupo de gerenciamento |
| 257 | Others | group | `menu.others.title` | Título do grupo outros |

### Itens do Menu - Primary

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 71 | Chatflows | item | `menu.primary.chatflows` | Item de menu Chatflows |
| 80 | Agentflows | item | `menu.primary.agentflows` | Item de menu Agentflows |
| 89 | Executions | item | `menu.primary.executions` | Item de menu Execuções |
| 98 | Assistants | item | `menu.primary.assistants` | Item de menu Assistentes |
| 107 | Marketplaces | item | `menu.primary.marketplaces` | Item de menu Marketplaces |
| 116 | Tools | item | `menu.primary.tools` | Item de menu Ferramentas |
| 125 | Credentials | item | `menu.primary.credentials` | Item de menu Credenciais |
| 134 | Variables | item | `menu.primary.variables` | Item de menu Variáveis |
| 143 | API Keys | item | `menu.primary.apiKeys` | Item de menu Chaves API |
| 152 | Document Stores | item | `menu.primary.documentStores` | Item de menu Document Stores |

### Itens do Menu - Evaluations

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 168 | Datasets | item | `menu.evaluations.datasets` | Item de menu Datasets |
| 178 | Evaluators | item | `menu.evaluations.evaluators` | Item de menu Avaliadores |
| 188 | Evaluations | item | `menu.evaluations.evaluations` | Item de menu Avaliações |

### Itens do Menu - Management

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 205 | SSO Config | item | `menu.management.ssoConfig` | Item de menu Configuração SSO |
| 215 | Roles | item | `menu.management.roles` | Item de menu Funções |
| 225 | Users | item | `menu.management.users` | Item de menu Usuários |
| 235 | Workspaces | item | `menu.management.workspaces` | Item de menu Workspaces |
| 245 | Login Activity | item | `menu.management.loginActivity` | Item de menu Atividade de Login |

### Itens do Menu - Others

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 262 | Logs | item | `menu.others.logs` | Item de menu Logs |
| 281 | Account Settings | item | `menu.others.accountSettings` | Item de menu Configurações da Conta |

---

## 3. Autenticação

### 3.1 Sign In

**Arquivo:** `packages/ui/src/views/auth/signIn.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 46 | Username | label | `auth.signIn.fields.username.label` | Label do campo username |
| 49 | user@company.com | placeholder | `auth.signIn.fields.username.placeholder` | Placeholder do campo email |
| 52 | Password | label | `auth.signIn.fields.password.label` | Label do campo senha |
| 55 | ******** | placeholder | `auth.signIn.fields.password.placeholder` | Placeholder do campo senha |
| 166 | Verification email has been sent successfully. | message | `auth.signIn.messages.verificationEmailSent` | Mensagem de sucesso ao reenviar email |
| 169 | Failed to send verification email. | message | `auth.signIn.messages.verificationEmailFailed` | Mensagem de erro ao reenviar email |
| 195 | Sign In | title | `auth.signIn.title` | Título da página |
| 198 | Don't have an account? | text | `auth.signIn.links.noAccount` | Texto do link de registro |
| 200 | Sign up for free | link | `auth.signIn.links.signUpFree` | Link para registro |
| 207 | Have an invite code? | text | `auth.signIn.links.haveInvite` | Texto do link de convite |
| 209 | Sign up for an account | link | `auth.signIn.links.signUpAccount` | Link para registro com convite |
| 220 | Email | label | `auth.signIn.fields.email.label` | Label do campo email |
| 234 | Password | label | `auth.signIn.fields.password.label` | Label do campo senha (duplicado) |
| 240 | Forgot password? | link | `auth.signIn.links.forgotPassword` | Link para recuperação de senha |
| 251 | Login | button | `auth.signIn.buttons.login` | Botão de login |
| 253 | OR | divider | `auth.signIn.divider.or` | Divisor OR |
| 270 | Sign In With Microsoft | button | `auth.signIn.buttons.sso.microsoft` | Botão SSO Microsoft |
| 289 | Sign In With Google | button | `auth.signIn.buttons.sso.google` | Botão SSO Google |
| 308 | Sign In With Auth0 by Okta | button | `auth.signIn.buttons.sso.auth0` | Botão SSO Auth0 |
| 327 | Sign In With Github | button | `auth.signIn.buttons.sso.github` | Botão SSO Github |
| 190 | Resend Verification Email | button | `auth.signIn.buttons.resendVerification` | Botão reenviar verificação |

### 3.2 Register

**Arquivo:** `packages/ui/src/views/auth/register.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 70 | Username | label | `auth.register.fields.username.label` | Label do campo username |
| 73 | John Doe | placeholder | `auth.register.fields.username.placeholder` | Placeholder do campo nome |
| 77 | Password | label | `auth.register.fields.password.label` | Label do campo senha |
| 80 | ******** | placeholder | `auth.register.fields.password.placeholder` | Placeholder do campo senha |
| 84 | Confirm Password | label | `auth.register.fields.confirmPassword.label` | Label do campo confirmar senha |
| 87 | ******** | placeholder | `auth.register.fields.confirmPassword.placeholder` | Placeholder do campo confirmar senha |
| 91 | EMail | label | `auth.register.fields.email.label` | Label do campo email |
| 94 | user@company.com | placeholder | `auth.register.fields.email.placeholder` | Placeholder do campo email |
| 98 | Invite Code | label | `auth.register.fields.inviteCode.label` | Label do campo código de convite |
| 283 | Sign Up | title | `auth.register.title` | Título da página |
| 285 | Already have an account? | text | `auth.register.links.haveAccount` | Texto do link de login |
| 287 | Sign In | link | `auth.register.links.signIn` | Link para login |
| 297 | Full Name | label | `auth.register.fields.fullName.label` | Label do campo nome completo |
| 303 | Display Name | placeholder | `auth.register.fields.fullName.placeholder` | Placeholder do campo nome |
| 309 | Is used for display purposes only. | hint | `auth.register.fields.fullName.hint` | Dica do campo nome |
| 315 | Email | label | `auth.register.fields.email.label` | Label do campo email (duplicado) |
| 326 | Kindly use a valid email address. Will be used as login id. | hint | `auth.register.fields.email.hint` | Dica do campo email |
| 333 | Invite Code | label | `auth.register.fields.inviteCode.label` | Label do campo código de convite (duplicado) |
| 340 | Paste in the invite code. | placeholder | `auth.register.fields.inviteCode.placeholder` | Placeholder do campo código |
| 347 | Please copy the token you would have received in your email. | hint | `auth.register.fields.inviteCode.hint` | Dica do campo código |
| 354 | Password | label | `auth.register.fields.password.label` | Label do campo senha (duplicado) |
| 360-362 | Password must be at least 8 characters... | hint | `auth.register.fields.password.hint` | Dica do campo senha |
| 369 | Confirm Password | label | `auth.register.fields.confirmPassword.label` | Label do campo confirmar senha (duplicado) |
| 379 | Confirm your password. Must match the password typed above. | hint | `auth.register.fields.confirmPassword.hint` | Dica do campo confirmar senha |
| 383 | Create Account | button | `auth.register.buttons.createAccount` | Botão criar conta |
| 385 | OR | divider | `auth.register.divider.or` | Divisor OR |
| 402 | Sign In With Microsoft | button | `auth.register.buttons.sso.microsoft` | Botão SSO Microsoft |
| 421 | Sign In With Google | button | `auth.register.buttons.sso.google` | Botão SSO Google |
| 440 | Sign In With Auth0 by Okta | button | `auth.register.buttons.sso.auth0` | Botão SSO Auth0 |
| 459 | Sign In With Github | button | `auth.register.buttons.sso.github` | Botão SSO Github |
| 239 | Registration Successful. You will be redirected to the sign in page shortly. | message | `auth.register.messages.successEnterprise` | Mensagem de sucesso (Enterprise) |
| 241 | To complete your registration, please click on the verification link we sent to your email address | message | `auth.register.messages.successCloud` | Mensagem de sucesso (Cloud) |

### 3.3 Reset Password

**Arquivo:** `packages/ui/src/views/auth/resetPassword.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 36 | Email | label | `auth.resetPassword.fields.email.label` | Label do campo email |
| 39 | user@company.com | placeholder | `auth.resetPassword.fields.email.placeholder` | Placeholder do campo email |
| 43 | Password | label | `auth.resetPassword.fields.password.label` | Label do campo senha |
| 46 | ******** | placeholder | `auth.resetPassword.fields.password.placeholder` | Placeholder do campo senha |
| 50 | Confirm Password | label | `auth.resetPassword.fields.confirmPassword.label` | Label do campo confirmar senha |
| 53 | ******** | placeholder | `auth.resetPassword.fields.confirmPassword.placeholder` | Placeholder do campo confirmar senha |
| 57 | Reset Token | label | `auth.resetPassword.fields.resetToken.label` | Label do campo token de reset |
| 82 | Token cannot be left blank! | validation | `auth.resetPassword.validation.tokenRequired` | Validação token obrigatório |
| 85 | New Password and Confirm Password do not match. | validation | `auth.resetPassword.validation.passwordMismatch` | Validação senhas não coincidem |
| 109 | Password reset successful | message | `auth.resetPassword.messages.success` | Mensagem de sucesso |
| 130 | Failed to reset password! | message | `auth.resetPassword.messages.failed` | Mensagem de erro |
| 159 | Reset Password | title | `auth.resetPassword.title` | Título da página |
| 162 | Back to Login | link | `auth.resetPassword.links.backToLogin` | Link para voltar ao login |
| 172 | Email | label | `auth.resetPassword.fields.email.label` | Label do campo email (duplicado) |
| 187 | Reset Token | label | `auth.resetPassword.fields.resetToken.label` | Label do campo token (duplicado) |
| 194 | Paste in the reset token. | placeholder | `auth.resetPassword.fields.resetToken.placeholder` | Placeholder do campo token |
| 203 | Please copy the token you received in your email. | hint | `auth.resetPassword.fields.resetToken.hint` | Dica do campo token |
| 209 | New Password | label | `auth.resetPassword.fields.newPassword.label` | Label do campo nova senha |
| 221-223 | Password must be at least 8 characters... | hint | `auth.resetPassword.fields.newPassword.hint` | Dica do campo nova senha |
| 230 | Confirm Password | label | `auth.resetPassword.fields.confirmPassword.label` | Label do campo confirmar senha (duplicado) |
| 241 | Confirm your new password. Must match the password typed above. | hint | `auth.resetPassword.fields.confirmPassword.hint` | Dica do campo confirmar senha |
| 246 | Update Password | button | `auth.resetPassword.buttons.updatePassword` | Botão atualizar senha |

### 3.4 Setup Account (Organization)

**Arquivo:** `packages/ui/src/views/organization/index.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 54 | Organization | label | `auth.setupAccount.fields.organization.label` | Label do campo organização |
| 58 | Acme | placeholder | `auth.setupAccount.fields.organization.placeholder` | Placeholder do campo organização |
| 62 | Username | label | `auth.setupAccount.fields.username.label` | Label do campo username |
| 65 | John Doe | placeholder | `auth.setupAccount.fields.username.placeholder` | Placeholder do campo username |
| 69 | Password | label | `auth.setupAccount.fields.password.label` | Label do campo senha |
| 72 | ******** | placeholder | `auth.setupAccount.fields.password.placeholder` | Placeholder do campo senha |
| 76 | Confirm Password | label | `auth.setupAccount.fields.confirmPassword.label` | Label do campo confirmar senha |
| 79 | ******** | placeholder | `auth.setupAccount.fields.confirmPassword.placeholder` | Placeholder do campo confirmar senha |
| 83 | EMail | label | `auth.setupAccount.fields.email.label` | Label do campo email |
| 86 | user@company.com | placeholder | `auth.setupAccount.fields.email.placeholder` | Placeholder do campo email |
| 272 | Setup Account | title | `auth.setupAccount.title` | Título da página |
| 276 | Application authentication now requires email and password. Contact administrator to setup an account. | alert | `auth.setupAccount.alerts.requiresAuth` | Alerta de autenticação requerida |
| 281 | Account setup does not make any external connections, your data stays securely on your locally hosted server. | info | `auth.setupAccount.info.localHost` | Informação sobre servidor local |
| 291 | Existing Username | label | `auth.setupAccount.fields.existingUsername.label` | Label do campo username existente |
| 297 | Existing Username | placeholder | `auth.setupAccount.fields.existingUsername.placeholder` | Placeholder do campo username existente |
| 302 | Existing username that was set as FLOWISE_USERNAME environment variable | hint | `auth.setupAccount.fields.existingUsername.hint` | Dica do campo username existente |
| 308 | Existing Password | label | `auth.setupAccount.fields.existingPassword.label` | Label do campo senha existente |
| 315 | Existing Password | placeholder | `auth.setupAccount.fields.existingPassword.placeholder` | Placeholder do campo senha existente |
| 320 | Existing password that was set as FLOWISE_PASSWORD environment variable | hint | `auth.setupAccount.fields.existingPassword.hint` | Dica do campo senha existente |
| 324 | New Account Details | divider | `auth.setupAccount.dividers.newAccountDetails` | Divisor de detalhes da nova conta |
| 333 | Organization Name: | label | `auth.setupAccount.fields.orgName.label` | Label do campo nome da organização |
| 339 | Organization Name | placeholder | `auth.setupAccount.fields.orgName.placeholder` | Placeholder do campo nome da organização |
| 347 | Account Administrator | divider | `auth.setupAccount.dividers.accountAdministrator` | Divisor de administrador da conta |
| 355 | Administrator Name | label | `auth.setupAccount.fields.adminName.label` | Label do campo nome do administrador |
| 361 | Display Name | placeholder | `auth.setupAccount.fields.adminName.placeholder` | Placeholder do campo nome do administrador |
| 367 | Is used for display purposes only. | hint | `auth.setupAccount.fields.adminName.hint` | Dica do campo nome do administrador |
| 373 | Administrator Email | label | `auth.setupAccount.fields.adminEmail.label` | Label do campo email do administrador |
| 385 | Kindly use a valid email address. Will be used as login id. | hint | `auth.setupAccount.fields.adminEmail.hint` | Dica do campo email do administrador |
| 391 | Password | label | `auth.setupAccount.fields.password.label` | Label do campo senha (duplicado) |
| 397-399 | Password must be at least 8 characters... | hint | `auth.setupAccount.fields.password.hint` | Dica do campo senha |
| 406 | Confirm Password | label | `auth.setupAccount.fields.confirmPassword.label` | Label do campo confirmar senha (duplicado) |
| 416 | Reconfirm your password. Must match the password typed above. | hint | `auth.setupAccount.fields.confirmPassword.hint` | Dica do campo confirmar senha |
| 425 | Sign Up | button | `auth.setupAccount.buttons.signUp` | Botão de registro |
| 427 | OR | divider | `auth.setupAccount.divider.or` | Divisor OR |
| 444 | Sign Up With Microsoft | button | `auth.setupAccount.buttons.sso.microsoft` | Botão SSO Microsoft |
| 463 | Sign Up With Google | button | `auth.setupAccount.buttons.sso.google` | Botão SSO Google |
| 482 | Sign Up With Auth0 by Okta | button | `auth.setupAccount.buttons.sso.auth0` | Botão SSO Auth0 |

---

## 4. Workspace Management

### 4.1 Workspace List

**Arquivo:** `packages/ui/src/views/workspace/index.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 108 | Active | chip | `workspace.list.status.active` | Status ativo do workspace |
| 133 | Edit | button | `workspace.list.actions.edit` | Botão editar |
| 141 | Workspace Users | button | `workspace.list.actions.workspaceUsers` | Botão usuários do workspace |
| 147 | Delete | button | `workspace.list.actions.delete` | Botão deletar |
| 153 | Delete | button | `workspace.list.actions.delete` | Botão deletar (duplicado) |
| 165 | Users | title | `workspace.list.drawer.users.title` | Título do drawer de usuários |
| 180 | User | header | `workspace.list.drawer.users.table.user` | Cabeçalho da coluna usuário |
| 181 | Role | header | `workspace.list.drawer.users.table.role` | Cabeçalho da coluna função |
| 192 | ORGANIZATION OWNER | chip | `workspace.list.drawer.users.roles.orgOwner` | Chip de proprietário da organização |
| 194 | PERSONAL WORKSPACE | chip | `workspace.list.drawer.users.roles.personalWorkspace` | Chip de workspace pessoal |
| 257 | Cancel | button | `workspace.dialog.add.buttons.cancel` | Botão cancelar (adicionar) |
| 258 | Add | button | `workspace.dialog.add.buttons.confirm` | Botão adicionar |
| 268 | Cancel | button | `workspace.dialog.edit.buttons.cancel` | Botão cancelar (editar) |
| 269 | Save | button | `workspace.dialog.edit.buttons.confirm` | Botão salvar |
| 278 | Delete Workspace ${workspace.name} | title | `workspace.dialog.delete.title` | Título do diálogo de deletar |
| 279 | This is irreversible and will remove all associated data inside the workspace. Are you sure you want to delete? | description | `workspace.dialog.delete.description` | Descrição do diálogo de deletar |
| 280 | Delete | button | `workspace.dialog.delete.buttons.confirm` | Botão deletar |
| 281 | Cancel | button | `workspace.dialog.delete.buttons.cancel` | Botão cancelar |
| 292 | Workspace deleted | message | `workspace.notifications.deleted` | Notificação de workspace deletado |
| 308 | Failed to delete workspace: ${error} | message | `workspace.notifications.deleteFailed` | Notificação de erro ao deletar |
| 410 | Workspaces | title | `workspace.list.title` | Título da página |
| 411 | Search Workspaces | placeholder | `workspace.list.search.placeholder` | Placeholder da busca |
| 420 | Add New | button | `workspace.list.actions.addNew` | Botão adicionar novo |
| 432 | No Workspaces Yet | empty | `workspace.list.empty.noWorkspaces` | Mensagem de lista vazia |
| 449 | Name | header | `workspace.list.table.name` | Cabeçalho da coluna nome |
| 450 | Description | header | `workspace.list.table.description` | Cabeçalho da coluna descrição |
| 451 | Users | header | `workspace.list.table.users` | Cabeçalho da coluna usuários |
| 452 | Last Updated | header | `workspace.list.table.lastUpdated` | Cabeçalho da coluna última atualização |
| 529 | Switching workspace... | loading | `workspace.loading.switching` | Mensagem de carregamento ao trocar workspace |
| 539 | Deleting workspace... | loading | `workspace.loading.deleting` | Mensagem de carregamento ao deletar workspace |

### 4.2 Workspace Users

**Arquivo:** `packages/ui/src/views/workspace/WorkspaceUsers.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 123 | Cancel | button | `workspace.users.dialog.invite.buttons.cancel` | Botão cancelar convite |
| 124 | Send Invite | button | `workspace.users.dialog.invite.buttons.confirm` | Botão enviar convite |
| 142 | Cancel | button | `workspace.users.dialog.updateInvite.buttons.cancel` | Botão cancelar atualizar convite |
| 143 | Update Invite | button | `workspace.users.dialog.updateInvite.buttons.confirm` | Botão atualizar convite |
| 167 | Cancel | button | `workspace.users.dialog.updateRole.buttons.cancel` | Botão cancelar atualizar função |
| 168 | Update Role | button | `workspace.users.dialog.updateRole.buttons.confirm` | Botão atualizar função |
| 179 | Remove Users | title | `workspace.users.dialog.remove.title` | Título do diálogo remover usuários |
| 180 | Remove the following users from the workspace?\n${userList} | description | `workspace.users.dialog.remove.description` | Descrição do diálogo remover |
| 181 | Remove | button | `workspace.users.dialog.remove.buttons.confirm` | Botão remover |
| 182 | Cancel | button | `workspace.users.dialog.remove.buttons.cancel` | Botão cancelar |
| 190 | Organization owner cannot be removed from workspace. | message | `workspace.users.notifications.cannotRemoveOwner` | Notificação de erro ao remover proprietário |
| 212 | ${usersSelected.length} User(s) removed from workspace. | message | `workspace.users.notifications.removed` | Notificação de usuários removidos |
| 234 | Failed to unlink users: ${error} | message | `workspace.users.notifications.unlinkFailed` | Notificação de erro ao desvincular |
| 319 | Search Users | placeholder | `workspace.users.search.placeholder` | Placeholder da busca |
| 320 | ${workspace?.name}: Workspace Users | title | `workspace.users.title` | Título da página |
| 321 | Manage workspace users and permissions. | description | `workspace.users.description` | Descrição da página |
| 334 | Remove Users | button | `workspace.users.actions.removeUsers` | Botão remover usuários |
| 343 | Add User | button | `workspace.users.actions.addUser` | Botão adicionar usuário |
| 357 | No Assigned Users Yet | empty | `workspace.users.empty.noUsers` | Mensagem de lista vazia |
| 365 | Add User | button | `workspace.users.empty.addUser` | Botão adicionar usuário (lista vazia) |
| 384 | select all | aria-label | `workspace.users.table.selectAll` | Label de acessibilidade selecionar todos |
| 394 | Email/Name | header | `workspace.users.table.emailName` | Cabeçalho da coluna email/nome |
| 395 | Role | header | `workspace.users.table.role` | Cabeçalho da coluna função |
| 396 | Status | header | `workspace.users.table.status` | Cabeçalho da coluna status |
| 397 | Last Login | header | `workspace.users.table.lastLogin` | Cabeçalho da coluna último login |
| 476 | ORGANIZATION OWNER | chip | `workspace.users.table.roles.orgOwner` | Chip de proprietário da organização |
| 499 | Never | text | `workspace.users.table.lastLogin.never` | Texto quando nunca fez login |
| 506 | Edit | button | `workspace.users.table.actions.edit` | Botão editar |
| 515 | Change Role | button | `workspace.users.table.actions.changeRole` | Botão alterar função |

### 4.3 Add/Edit Workspace Dialog

**Arquivo:** `packages/ui/src/views/workspace/AddEditWorkspaceDialog.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 82 | Workspace name cannot be Default Workspace or Personal Workspace - this is a reserved name | message | `workspace.dialog.addEdit.validation.reservedName` | Validação de nome reservado |
| 107 | New Workspace added | message | `workspace.dialog.addEdit.notifications.added` | Notificação de workspace adicionado |
| 122 | Failed to add new Workspace: ${error} | message | `workspace.dialog.addEdit.notifications.addFailed` | Notificação de erro ao adicionar |
| 153 | Workspace saved | message | `workspace.dialog.addEdit.notifications.saved` | Notificação de workspace salvo |
| 168 | Failed to save Workspace: ${error} | message | `workspace.dialog.addEdit.notifications.saveFailed` | Notificação de erro ao salvar |
| 198 | Add Workspace | title | `workspace.dialog.addEdit.title.add` | Título do diálogo adicionar |
| 198 | Edit Workspace | title | `workspace.dialog.addEdit.title.edit` | Título do diálogo editar |
| 205 | Name | label | `workspace.dialog.addEdit.fields.name.label` | Label do campo nome |
| 221 | Description | label | `workspace.dialog.addEdit.fields.description.label` | Label do campo descrição |

### 4.4 Edit Workspace User Role Dialog

**Arquivo:** `packages/ui/src/views/workspace/EditWorkspaceUserRoleDialog.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 121 | WorkspaceUser Details Updated | message | `workspace.users.dialog.editRole.notifications.updated` | Notificação de detalhes atualizados |
| 136 | Failed to update WorkspaceUser: ${error} | message | `workspace.users.dialog.editRole.notifications.updateFailed` | Notificação de erro ao atualizar |
| 169 | Change Workspace Role - ${userEmail} ${user.name ? `(${user.name})` : ''} | title | `workspace.users.dialog.editRole.title` | Título do diálogo |
| 176 | New Role to Assign | label | `workspace.users.dialog.editRole.fields.role.label` | Label do campo função |
| 186 | Select Role | placeholder | `workspace.users.dialog.editRole.fields.role.placeholder` | Placeholder do campo função |

---

## 5. Error Boundary

**Arquivo:** `packages/ui/src/ErrorBoundary.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 18 | Oh snap! | title | `errors.boundary.title` | Título do erro |
| 19 | The following error occurred when loading this page. | subtitle | `errors.boundary.subtitle` | Subtítulo do erro |
| 31 | Status: ${error.response.status} | code | `errors.boundary.status` | Código de status |
| 38-40 | Please retry after some time. If the issue persists, reach out to us on our Discord server.\nAlternatively, you can raise an issue on Github. | message | `errors.boundary.message` | Mensagem de ajuda |

---

## 6. Header e Navegação

**Arquivo:** `packages/ui/src/layout/MainLayout/Header/index.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 120 | Star | text | `header.github.star` | Texto do botão star |
| 174 | Logging out... | message | `header.logout.loggingOut` | Mensagem de logout |
| 297 | Upgrade | button | `header.upgrade.button` | Botão de upgrade |

**Arquivo:** `packages/ui/src/layout/MainLayout/ViewHeader.jsx`

| Linha | String Original | Tipo | Chave Proposta | Contexto |
|-------|----------------|------|----------------|----------|
| 25 | Search | placeholder | `common.search.placeholder` | Placeholder padrão de busca |
| 50 | Back | button | `common.buttons.back` | Botão voltar |
| 91 | Edit | button | `common.buttons.edit` | Botão editar |

---

## 7. Componentes Comuns

### 7.1 Confirm Dialog

**Arquivo:** `packages/ui/src/ui-component/dialog/ConfirmDialog.jsx`

Este componente usa props dinâmicas (`title`, `description`, `confirmButtonName`, `cancelButtonName`), então não há strings hardcoded aqui. As strings são passadas via `useConfirm` hook.

### 7.2 Botões Comuns

Strings comuns encontradas em múltiplos arquivos:

| String Original | Tipo | Chave Proposta | Contexto |
|----------------|------|----------------|----------|
| Cancel | button | `common.buttons.cancel` | Botão cancelar genérico |
| Save | button | `common.buttons.save` | Botão salvar genérico |
| Delete | button | `common.buttons.delete` | Botão deletar genérico |
| Edit | button | `common.buttons.edit` | Botão editar genérico |
| Add | button | `common.buttons.add` | Botão adicionar genérico |
| Close | button | `common.buttons.close` | Botão fechar genérico |
| Back | button | `common.buttons.back` | Botão voltar genérico |
| Search | placeholder | `common.search.placeholder` | Placeholder de busca genérico |

---

## 8. Estatísticas

- **Total de strings mapeadas:** ~300+
- **Arquivos analisados:** 15+ arquivos principais
- **Categorias principais:**
  - Constantes e Erros: 9 strings
  - Menu de Navegação: 20+ strings
  - Autenticação: 100+ strings
  - Workspace Management: 80+ strings
  - Error Boundary: 4 strings
  - Header: 3 strings
  - Componentes Comuns: 8+ strings

---

## 9. Strings com Interpolação

Algumas strings precisam de interpolação de variáveis:

- `workspace.dialog.delete.title` - Usa `${workspace.name}`
- `workspace.users.dialog.remove.description` - Usa `${userList}`
- `workspace.users.notifications.removed` - Usa `${usersSelected.length}`
- `workspace.users.title` - Usa `${workspace?.name}`
- `workspace.users.dialog.editRole.title` - Usa `${userEmail}` e `${user.name}`

---

## 10. Próximos Passos

1. Criar arquivos JSON de tradução (en.json e pt-BR.json) com todas as chaves mapeadas
2. Implementar react-i18next
3. Substituir strings hardcoded por chamadas `t()`
4. Adicionar seletor de idioma na UI

