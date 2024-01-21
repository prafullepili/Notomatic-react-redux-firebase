import s from './style.module.css'
import { ReactComponent as LogoSVG } from "../../../assets/images/logo.svg"


export function AuthLayout({ children }) {
    return (
        <div className={s.root}>
            <div className={s.leftSection}>
                <div className={s.header}>
                    <LogoSVG className={s.logoTop} />
                    <h3 className={s.logoTitle}>Notomatic</h3>
                </div>
                {children}
            </div>
            <div className={`${s.rightSection}  d-none d-lg-flex`}>
                <div>
                    <div className="d-flex">
                        <LogoSVG className={s.logo} />
                        <h1 className={`${s.backgroundTitle}`}>Notomatic</h1>
                    </div>
                    <p className='text-light'>One place for the team notes</p>
                </div>
            </div>
        </div>
    )
}