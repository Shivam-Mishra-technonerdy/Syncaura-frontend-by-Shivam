import { useState } from 'react'
import { UserRound, Mail, LockKeyhole, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaFacebookF } from 'react-icons/fa'
import leftArt from "../assets/left-art.png";
import "./style9.css";

function PasswordField({ label, value, onChange }) {
  const [visible, setVisible] = useState(false)
  return <label className="field">
    <LockKeyhole size={19} strokeWidth={1.8} />
    <input type={visible ? 'text' : 'password'} placeholder={label} value={value} onChange={onChange} required />
    <button type="button" className="reveal" aria-label={`Show ${label}`} onClick={() => setVisible(!visible)}>
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </label>
}

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [message, setMessage] = useState('')
  const update = key => event => setForm({ ...form, [key]: event.target.value })

  function handleSubmit(event) {
    event.preventDefault()
    setMessage(form.password === form.confirm ? 'Account created successfully!' : 'Passwords do not match.')
  }

  return <main className="page"><section className="auth-card">
    <aside className="art" aria-hidden="true"><img src={leftArt} alt="" /></aside>
    <div className="form-pane"><form onSubmit={handleSubmit}>
      <p className="eyebrow">START YOUR JOURNEY</p>
      <h1>Create <em>Account</em></h1>
      <p className="lead">Join us and explore what's possible.</p>
      <div className="fields">
        <label className="field"><UserRound size={19} strokeWidth={1.8} /><input placeholder="Full name" value={form.name} onChange={update('name')} required /></label>
        <label className="field"><Mail size={19} strokeWidth={1.8} /><input type="email" placeholder="Email" value={form.email} onChange={update('email')} required /></label>
        <PasswordField label="Password" value={form.password} onChange={update('password')} />
        <PasswordField label="Confirm password" value={form.confirm} onChange={update('confirm')} />
      </div>
      <label className="check"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span></label>
      <button className="submit" type="submit">Create Account <ArrowRight size={20} /></button>
      {message && <p className="message" role="status">{message}</p>}
      <div className="divider"><span>OR CONTINUE WITH</span></div>
      <div className="socials">
        <button type="button" aria-label="Continue with Google"><FcGoogle size={23} /></button>
        <button type="button" aria-label="Continue with GitHub"><FaGithub size={22} /></button>
        <button type="button" className="facebook" aria-label="Continue with Facebook"><FaFacebookF size={19} /></button>
      </div>
      <p className="switch">Already have an account? <a href="#login">Log In</a></p>
    </form></div>
  </section></main>
}
