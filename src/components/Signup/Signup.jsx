import { Link, useNavigate } from 'react-router-dom'
import { Input } from 'components/Input/Input'
import { AuthLayout } from 'components/layouts/AuthLayout/AuthLayout'
import { ButtonPrimary } from 'components/ButtonPrimary/ButtomPrimary'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AuthAPI } from 'api/auth'
import { setUser } from 'store/auth/auth-slice'

import s from './Style.module.css'
import { toast } from 'utils/sweet-alert'

export function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === password2) {
            try {
                const user = await AuthAPI.signup(email, password)
                dispatch(setUser(user));
                await toast("success", "Signup succeed, you are logging in.")
                navigate("/")
            } catch (error) {
                toast("error", error.message)
            }
        } else {
            toast("error", "Password not matched")
        }
    }

    return (
        <AuthLayout>
            <div className={s.formContainer}>
                <h2 className={s.title}>Signup <br /> to access your team notes</h2>
                <form onSubmit={handleSubmit} className={s.formGroup}>
                    <Input
                        type="email"
                        onTextChange={setEmail}
                        placeholder={'email'}
                        required={true}
                    />
                    <Input
                        type="password"
                        onTextChange={setPassword}
                        placeholder={'Password'}
                        required={true}
                    />
                    <Input
                        type="password"
                        onTextChange={setPassword2}
                        placeholder={'Confirm Password'}
                        required={true}
                    />
                    <ButtonPrimary type='submit' className={s.button}>Sign up</ButtonPrimary>
                    <span>Already have an account ? <Link to="/signup">Sign in</Link></span>
                </form>
            </div>
        </AuthLayout>
    )
}