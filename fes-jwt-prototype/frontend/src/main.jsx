import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { api, setAccessToken } from './api'
import './style.css'


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessTokenState] = useState(localStorage.getItem('accessToken') || '')
  const [refreshToken, setRefreshTokenState] = useState(localStorage.getItem('refreshToken') || '')
  const [usuario, setUsuario] = useState(null)
  const [resultado, setResultado] = useState('Aguardando ação...')

  useEffect(() => {
    setAccessToken(accessToken)
  }, [accessToken])

  function salvarSessao(data) {
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)
      setAccessTokenState(data.accessToken)
    }
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken)
      setRefreshTokenState(data.refreshToken)
    }
    if (data.usuario) setUsuario(data.usuario)
  }

  async function executar(label, fn) {
    try {
      const response = await fn()
      setResultado(`${label}\n\n${JSON.stringify({
        usuario: response.data.data.usuario, 
        autenticado: true}, null, 2)}`)
      return response
    } catch (error) {
      setPassword('')
      setResultado(`${label}\n\n${JSON.stringify(error.response?.data || { message: error.message }, null, 2)}`)
    }
  }

  async function login() {
    const response = await executar('POST /auth/login', () => api.post('/auth/login', { email, password } ))
    setPassword('')
    
    if (response?.data?.data) salvarSessao(response.data.data)
  }

  async function refresh() {
    const response = await executar('POST /auth/refresh', () => api.post('/auth/refresh', { refreshToken }))
    if (response?.data?.data) salvarSessao(response.data.data)
  }

  async function logout() {

    try { 
      await executar('POST /auth/logout', () => api.post('/auth/logout', { refreshToken }))
      
    } catch (error) {
      console.error('Erro ao executar logout seguro.', error)
    } finally{

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setAccessTokenState('')
      setRefreshTokenState('')
      setUsuario(null)
      setAccessToken(null)
    }
  }

  return (
    <main className="page">
      <section className="card hero">
        <p className="eyebrow">FictionalEnterpriseSolutions</p>
        <h1>Protótipo JWT Fullstack</h1>
        <p>Frontend inicial integrado ao backend para validar login, access token, refresh token e RBAC.</p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Login</h2>
          <label>E-mail</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
          <label>Senha</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password"/>
          <button onClick={login}>Entrar</button>
          <button className="secondary" onClick={() => { setEmail('rh.user@fictional.local'); }}>Usar UserFinal RH</button>
        </div>

        <div className="card">
          <h2>Sessão</h2>
          <p><strong>Status:</strong> {accessToken ? 'Autenticado' : 'Não autenticado'}</p>
          <p><strong>Usuário:</strong> {usuario?.email || 'não carregado'}</p>
          <p><strong>Roles:</strong> {usuario?.roles?.join(', ') || '-'}</p>
          <div className="actions">
            <button onClick={() => executar('GET /me', () => api.get('/me'))}>Testar /me</button>
            <button onClick={() => executar('GET /admin-area', () => api.get('/admin-area'))}>Testar Admin</button>
            <button onClick={() => executar('GET /user-area', () => api.get('/user-area'))}>Testar User</button>
            <button onClick={refresh}>Renovar token</button>
            <button className="danger" onClick={logout}>Logout</button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Resposta da API</h2>
        <pre>{resultado}</pre>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
