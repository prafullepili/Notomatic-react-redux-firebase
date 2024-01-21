import { NoteForm } from "components/NoteForm/NoteForm";
import { create } from 'api/note-api'
import { useDispatch } from "react-redux";
import { addNote } from "store/notes/notes-slice";
import { useNavigate } from "react-router-dom";
// import { withAuthRequired } from "hoc/withAuthRequired";



export function NoteCreate(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (formValues) => {
        const createdNote = await create({ ...formValues, created_at: new Date().toLocaleDateString() });
        dispatch(addNote(createdNote))
        navigate('/')

    }
    return <NoteForm title="New note" onSubmit={handleSubmit} />
}

// export const ProtectedNoteCreate = withAuthRequired(NoteCreate)