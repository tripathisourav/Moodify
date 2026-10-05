import { Link } from 'react-router-dom'

const AuthCard = ({ title, children, footerText, footerLinkText, footerLinkTo }) => {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__badge">Moodify</span>
          <h1>{title}</h1>
          <p className="auth-card__subtitle">Create your vibe and sync your mood with music.</p>
        </div>

        <div className="auth-card__body">{children}</div>

        <div className="auth-card__footer">
          <p>{footerText} <Link className="auth-card__link" to={footerLinkTo}>{footerLinkText}</Link></p>
        </div>
      </div>
    </main>
  )
}

export default AuthCard
