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

export function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await AuthAPI.singin(email, password)
            dispatch(setUser(user));
            await toast("success", "Auth succeed")
            navigate("/")
        } catch (error) {
            toast("error", error.message)
        }
    }

    return (
        <AuthLayout>
            <div className={s.formContainer}>
                <h2 className={s.title}>Signin <br /> to access your team notes</h2>
                <form onSubmit={handleSubmit} className={s.formGroup}>
                    <Input
                        type="email"
                        onTextChange={setEmail}
                        placeholder={'email'}
                        required={true}
                        value={email}
                    />
                    <Input
                        type="password"
                        onTextChange={setPassword}
                        placeholder={'password'}
                        required={true}
                        value={password}
                    />
                    <ButtonPrimary type='submit' className={s.button}>Sign in</ButtonPrimary>
                    <span>Don't have an account yet ? <Link to="/signup">Sigun</Link></span>
                </form>
            </div>
        </AuthLayout>
    )
}