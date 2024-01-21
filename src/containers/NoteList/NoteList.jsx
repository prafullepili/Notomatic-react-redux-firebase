import { useDispatch } from "react-redux";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import s from './style.module.css'
import { deleteById } from "api/note-api";
import { deleteNote } from "store/notes/notes-slice";


export function NoteList({ noteList }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async (noteId) => {
        if (window.confirm("Delete note ?")) {
            deleteById(noteId)
            dispatch(deleteNote(noteId))
        }
    }
    return (
        <div className={`row justify-content-center`}>
            {
                noteList.map(note => {
                    return (
                        <div key={note.id} className={s.card_container}>
                            <TextCard
                                title={note.title}
                                content={note.content}
                                subtitle={note.created_at}
                                onClick={() => navigate('/note/' + note.id)}
                                onClickTrash={() => handleDelete(note.id)}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}