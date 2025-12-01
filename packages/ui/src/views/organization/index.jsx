import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

// material-ui
import { Alert, Box, Button, Chip, Divider, Icon, List, ListItemText, Stack, TextField, Typography } from '@mui/material'

// project imports
import { StyledButton } from '@/ui-component/button/StyledButton'
import { Input } from '@/ui-component/input/Input'
import { BackdropLoader } from '@/ui-component/loading/BackdropLoader'

// API
import accountApi from '@/api/account.api'
import authApi from '@/api/auth'
import loginMethodApi from '@/api/loginmethod'

// Hooks
import useApi from '@/hooks/useApi'
import { store } from '@/store'
import { loginSuccess } from '@/store/reducers/authSlice'

// utils
import useNotifier from '@/utils/useNotifier'
import { passwordSchema } from '@/utils/validation'

// Icons
import Auth0SSOLoginIcon from '@/assets/images/auth0.svg'
import GoogleSSOLoginIcon from '@/assets/images/google.svg'
import AzureSSOLoginIcon from '@/assets/images/microsoft-azure.svg'
import { useConfig } from '@/store/context/ConfigContext'
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'

// ==============================|| Organization & Admin User Setup ||============================== //

// IMPORTANT: when updating this schema, update the schema on the server as well
// packages/server/src/enterprise/Interface.Enterprise.ts
const OrgSetupSchema = z
    .object({
        username: z.string().min(1, 'Name is required'),
        email: z.string().min(1, 'Email is required').email('Invalid email address'),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirm Password is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

const OrganizationSetupPage = () => {
    const { t } = useTranslation()
    useNotifier()
    const { isEnterpriseLicensed, isOpenSource } = useConfig()

    const orgNameInput = {
        label: t('auth.setupAccount.fields.organization.label'),
        name: 'organization',
        type: 'text',
        placeholder: t('auth.setupAccount.fields.organization.placeholder')
    }

    const usernameInput = {
        label: t('auth.setupAccount.fields.username.label'),
        name: 'username',
        type: 'text',
        placeholder: t('auth.setupAccount.fields.username.placeholder')
    }

    const passwordInput = {
        label: t('auth.setupAccount.fields.password.label'),
        name: 'password',
        type: 'password',
        placeholder: t('auth.setupAccount.fields.password.placeholder')
    }

    const confirmPasswordInput = {
        label: t('auth.setupAccount.fields.confirmPassword.label'),
        name: 'confirmPassword',
        type: 'password',
        placeholder: t('auth.setupAccount.fields.confirmPassword.placeholder')
    }

    const emailInput = {
        label: t('auth.setupAccount.fields.email.label'),
        name: 'email',
        type: 'email',
        placeholder: t('auth.setupAccount.fields.email.placeholder')
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [orgName, setOrgName] = useState('')
    const [existingUsername, setExistingUsername] = useState('')
    const [existingPassword, setExistingPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [successMsg, setSuccessMsg] = useState(undefined)
    const [requiresAuthentication, setRequiresAuthentication] = useState(false)

    const loginApi = useApi(authApi.login)
    const registerAccountApi = useApi(accountApi.registerAccount)
    const getBasicAuthApi = useApi(accountApi.getBasicAuth)
    const navigate = useNavigate()

    const getDefaultProvidersApi = useApi(loginMethodApi.getLoginMethods)
    const [configuredSsoProviders, setConfiguredSsoProviders] = useState([])

    const register = async (event) => {
        event.preventDefault()
        const result = OrgSetupSchema.safeParse({
            orgName,
            username,
            email,
            password,
            confirmPassword
        })
        if (result.success) {
            setLoading(true)
            setAuthError('')

            // Check authentication first if required
            if (requiresAuthentication) {
                try {
                    const authResult = await accountApi.checkBasicAuth({
                        username: existingUsername,
                        password: existingPassword
                    })

                    if (!authResult || !authResult.data || authResult.data.message !== 'Authentication successful') {
                        setAuthError('Authentication failed. Please check your existing credentials.')
                        setLoading(false)
                        return
                    }
                } catch (error) {
                    setAuthError('Authentication failed. Please check your existing credentials.')
                    setLoading(false)
                    return
                }
            }

            // Proceed with registration after successful authentication
            const body = {
                user: {
                    name: username,
                    email: email,
                    type: 'pro',
                    credential: password
                }
            }
            if (isEnterpriseLicensed) {
                body.organization = {
                    name: orgName
                }
            }
            await registerAccountApi.request(body)
        } else {
            // Handle validation errors
            const errorMessages = result.error.errors.map((error) => error.message)
            setAuthError(errorMessages.join(', '))
        }
    }

    useEffect(() => {
        if (registerAccountApi.error) {
            const errMessage =
                typeof registerAccountApi.error.response.data === 'object'
                    ? registerAccountApi.error.response.data.message
                    : registerAccountApi.error.response.data
            let finalErrMessage = ''
            if (isEnterpriseLicensed) {
                finalErrMessage = `Error in registering organization. Please contact your administrator. (${errMessage})`
            } else {
                finalErrMessage = `Error in registering account: ${errMessage}`
            }
            setAuthError(finalErrMessage)
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerAccountApi.error])

    useEffect(() => {
        if (getBasicAuthApi.data && getBasicAuthApi.data.isUsernamePasswordSet === true) {
            setRequiresAuthentication(true)
        }
    }, [getBasicAuthApi.data])

    useEffect(() => {
        if (!isOpenSource) {
            getDefaultProvidersApi.request()
        } else {
            getBasicAuthApi.request()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (getDefaultProvidersApi.data && getDefaultProvidersApi.data.providers) {
            setConfiguredSsoProviders(getDefaultProvidersApi.data.providers.map((provider) => provider))
        }
    }, [getDefaultProvidersApi.data])

    useEffect(() => {
        if (registerAccountApi.data) {
            setAuthError(undefined)
            setConfirmPassword('')
            setPassword('')
            setUsername('')
            setEmail('')
            setSuccessMsg(registerAccountApi.data.message)
            setTimeout(() => {
                const body = {
                    email,
                    password
                }
                loginApi.request(body)
            }, 1000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerAccountApi.data])

    useEffect(() => {
        if (loginApi.data) {
            setLoading(false)
            store.dispatch(loginSuccess(loginApi.data))
            localStorage.setItem('username', loginApi.data.name)
            navigate(location.state?.path || '/')
            //navigate(0)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginApi.data])

    const signInWithSSO = (ssoProvider) => {
        window.location.href = `/api/v1/${ssoProvider}/login`
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px'
                }}
            >
                <Stack flexDirection='column' sx={{ width: '480px', gap: 3 }}>
                    {authError && (
                        <Alert icon={<IconExclamationCircle />} variant='filled' severity='error'>
                            {authError.split(', ').length > 0 ? (
                                <List dense sx={{ py: 0 }}>
                                    {authError.split(', ').map((error, index) => (
                                        <ListItemText key={index} primary={error} primaryTypographyProps={{ color: '#fff !important' }} />
                                    ))}
                                </List>
                            ) : (
                                authError
                            )}
                        </Alert>
                    )}
                    {successMsg && (
                        <Alert icon={<IconCircleCheck />} variant='filled' severity='success'>
                            {successMsg}
                        </Alert>
                    )}
                    <Stack sx={{ gap: 1 }}>
                        <Typography variant='h1'>{t('auth.setupAccount.title')}</Typography>
                    </Stack>
                    {requiresAuthentication && (
                        <Alert severity='info'>
                            {t('auth.setupAccount.alerts.requiresAuth')}
                        </Alert>
                    )}
                    {(isOpenSource || isEnterpriseLicensed) && (
                        <Typography variant='caption'>
                            {t('auth.setupAccount.info.localHost')}
                        </Typography>
                    )}
                    <form onSubmit={register}>
                        <Stack sx={{ width: '100%', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 2 }}>
                            {requiresAuthentication && (
                                <>
                                    <Box>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography sx={{ mb: 1 }}>
                                                {t('auth.setupAccount.fields.existingUsername.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                            </Typography>
                                            <div style={{ flexGrow: 1 }}></div>
                                        </div>
                                        <TextField
                                            fullWidth
                                            placeholder={t('auth.setupAccount.fields.existingUsername.placeholder')}
                                            value={existingUsername}
                                            onChange={(e) => setExistingUsername(e.target.value)}
                                        />
                                        <Typography variant='caption'>
                                            <i>{t('auth.setupAccount.fields.existingUsername.hint')}</i>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography sx={{ mb: 1 }}>
                                                {t('auth.setupAccount.fields.existingPassword.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                            </Typography>
                                            <div style={{ flexGrow: 1 }}></div>
                                        </div>
                                        <TextField
                                            fullWidth
                                            type='password'
                                            placeholder={t('auth.setupAccount.fields.existingPassword.placeholder')}
                                            value={existingPassword}
                                            onChange={(e) => setExistingPassword(e.target.value)}
                                        />
                                        <Typography variant='caption'>
                                            <i>{t('auth.setupAccount.fields.existingPassword.hint')}</i>
                                        </Typography>
                                    </Box>
                                    <Divider>
                                        <Chip label={t('auth.setupAccount.dividers.newAccountDetails')} size='small' />
                                    </Divider>
                                </>
                            )}
                            {isEnterpriseLicensed && (
                                <>
                                    <Box>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography>
                                                {t('auth.setupAccount.fields.orgName.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                            </Typography>
                                            <div style={{ flexGrow: 1 }}></div>
                                        </div>
                                        <Input
                                            inputParam={orgNameInput}
                                            placeholder={t('auth.setupAccount.fields.orgName.placeholder')}
                                            onChange={(newValue) => setOrgName(newValue)}
                                            value={orgName}
                                            showDialog={false}
                                        />
                                    </Box>
                                    <Box>
                                        <Divider>
                                            <Chip label={t('auth.setupAccount.dividers.accountAdministrator')} size='small' />
                                        </Divider>
                                    </Box>
                                </>
                            )}
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('auth.setupAccount.fields.adminName.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={usernameInput}
                                    placeholder={t('auth.setupAccount.fields.adminName.placeholder')}
                                    onChange={(newValue) => setUsername(newValue)}
                                    value={username}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>{t('auth.setupAccount.fields.adminName.hint')}</i>
                                </Typography>
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('auth.setupAccount.fields.adminEmail.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={emailInput}
                                    onChange={(newValue) => setEmail(newValue)}
                                    type='email'
                                    value={email}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>{t('auth.setupAccount.fields.adminEmail.hint')}</i>
                                </Typography>
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('auth.setupAccount.fields.password.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input inputParam={passwordInput} onChange={(newValue) => setPassword(newValue)} value={password} />
                                <Typography variant='caption'>
                                    <i>{t('auth.setupAccount.fields.password.hint')}</i>
                                </Typography>
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('auth.setupAccount.fields.confirmPassword.label')}<span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={confirmPasswordInput}
                                    onChange={(newValue) => setConfirmPassword(newValue)}
                                    value={confirmPassword}
                                />
                                <Typography variant='caption'>
                                    <i>{t('auth.setupAccount.fields.confirmPassword.hint')}</i>
                                </Typography>
                            </Box>
                            <StyledButton
                                variant='contained'
                                style={{ borderRadius: 12, height: 40, marginRight: 5 }}
                                type='submit'
                                disabled={requiresAuthentication && (!existingUsername || !existingPassword)}
                            >
                                {t('auth.setupAccount.buttons.signUp')}
                            </StyledButton>
                            {configuredSsoProviders && configuredSsoProviders.length > 0 && <Divider sx={{ width: '100%' }}>{t('auth.setupAccount.divider.or')}</Divider>}
                            {configuredSsoProviders &&
                                configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        //https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-branding-in-apps
                                        ssoProvider === 'azure' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                style={{ borderRadius: 12, height: 45, marginRight: 5, lineHeight: 0 }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={AzureSSOLoginIcon} alt={'MicrosoftSSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                {t('auth.setupAccount.buttons.sso.microsoft')}
                                            </Button>
                                        )
                                )}
                            {configuredSsoProviders &&
                                configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'google' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                style={{ borderRadius: 12, height: 45, marginRight: 5, lineHeight: 0 }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={GoogleSSOLoginIcon} alt={'GoogleSSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                {t('auth.setupAccount.buttons.sso.google')}
                                            </Button>
                                        )
                                )}
                            {configuredSsoProviders &&
                                configuredSsoProviders.map(
                                    (ssoProvider) =>
                                        ssoProvider === 'auth0' && (
                                            <Button
                                                key={ssoProvider}
                                                variant='outlined'
                                                style={{ borderRadius: 12, height: 45, marginRight: 5, lineHeight: 0 }}
                                                onClick={() => signInWithSSO(ssoProvider)}
                                                startIcon={
                                                    <Icon>
                                                        <img src={Auth0SSOLoginIcon} alt={'Auth0SSO'} width={20} height={20} />
                                                    </Icon>
                                                }
                                            >
                                                {t('auth.setupAccount.buttons.sso.auth0')}
                                            </Button>
                                        )
                                )}
                        </Stack>
                    </form>
                </Stack>
            </Box>
            {loading && <BackdropLoader open={loading} />}
        </>
    )
}

export default OrganizationSetupPage
