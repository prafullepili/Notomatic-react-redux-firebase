import { Logo } from '..'
import s from './style.module.css'
import logoSrc from 'assets/images/logo.png'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'store/auth/auth-selectore'
import { AuthAPI } from 'api/auth'
import { setUser } from 'store/auth/auth-slice'


export function Header(props) {
    const user = useSelector(getUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignoutUser = () => {
        AuthAPI.signout()
        dispatch(setUser(null))
    }
    const renderAuthProfile = () => {
        return <div>
            <img className='rounded-circle' style={{ width: 40 }} src={"https://api.dicebear.com/5.x/bottts/svg?seed=" + user.email} alt="" />
            <div>Hello, {user.email}</div>
            <Link to="#" onClick={handleSignoutUser}>Signout</Link>
        </div>
    }

    return <div className={`row ${s.container}`}>
        <div className="col-xs-12 col-sm-4">
            <Logo onClick={() => navigate('/')} title="Notomatic" subtitle="Manage your notes" image={logoSrc} />
        </div>
        <div className="col-xs-12 col-sm-8 text-end">
            {renderAuthProfile()}
        </div>
    </div>
}