import { deleteById, updateById } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { deleteNote, updateNote } from "store/notes/notes-slice";
import { withAuthRequired } from "hoc/withAuthRequired";

export function Note(props) {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const note = useSelector(store => store.noteSlice.noteList.find(note => note.id === noteId))
    const [isEditable, setIsEditable] = useState(false);

    const handleSubmit = async (formValues) => {
        const updatedNote = await updateById(noteId, formValues)
        dispatch(updateNote(updatedNote))
        setIsEditable(false);
    }

    const handleDelete = async () => {
        if (window.confirm("Delete note ?")) {
            deleteById(noteId)
            dispatch(deleteNote(noteId))
            navigate('/')
        }
    }
    return <>
        {note && <NoteForm
            isEditable={isEditable}
            title={isEditable ? 'Edit note' : note.title}
            note={note}
            onClickEdit={() => { setIsEditable(!isEditable) }}
            onClickDelete={handleDelete}
            onSubmit={isEditable && handleSubmit}
        />}
    </>
}

export const ProtectedNote = withAuthRequired(Note)