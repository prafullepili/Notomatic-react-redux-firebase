import { useState } from "react"
import { Trash } from "react-bootstrap-icons"

import s from "./style.module.css"


export function TextCard({ title, content, subtitle, onClick, onClickTrash }) {
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    const HandleOnClickTrash = (e) => {
        onClickTrash();
        e.stopPropagation();
    }

    return (
        <div
            onClick={onClick}
            className={`card ${s.container}`}
            style={{ borderColor: isCardHovered ? '#0d6efd' : '' }}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <div className="card-body">
                <div className={`${s.title_row}`}>
                    <h5 className="card-title">{title}</h5>
                    <Trash
                        size={20}
                        style={{ color: isTrashHovered ? '#ff7373' : '#b8b8b8' }}
                        onClick={HandleOnClickTrash}
                        onMouseEnter={() => setIsTrashHovered(true)}
                        onMouseLeave={() => setIsTrashHovered(false)}
                    />
                </div>
                <p className={`card-subtitle mb-2 text-muted`}>{subtitle}</p>
                <p className={`card-text ${s.text_content}`}>{content}</p>
            </div>
        </div>
    )
}