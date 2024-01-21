import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import { ButtonPrimary } from 'components/ButtonPrimary/ButtomPrimary'
import { useEffect, useState } from 'react'
import { ValidatorService } from 'utils/validator'
import { FieldError } from 'components/FieldError/FieldError'
import s from './style.module.css'

const VALIDATOR = {
    title: (value) => {
        return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
    },

    content: (value) => {
        return ValidatorService.min(value, 3)
    }
}

export function NoteForm({ isEditable = true, note, title, onClickEdit, onClickDelete, onSubmit }) {
    const formInitialValues = {
        title: note?.title || '',
        content: note?.content || ''
    }
    const [formValues, setFormValues] = useState(formInitialValues)

    useEffect(() => {
        setFormValues(formInitialValues)
        // eslint-disable-next-line
    }, [note])

    const [formErrors, setFormErrors] = useState({
        title: note?.title ? '' : true,
        content: note?.content ? '' : true
    })

    const updateFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }))
        validate(name, value)
    }
    const validate = (fieldName, fieldValue) => {
        setFormErrors({
            ...formErrors,
            [fieldName]: VALIDATOR[fieldName](fieldValue)
        })
    }

    const hasError = () => {
        for (const fieldName in formErrors) {
            if (formErrors[fieldName]) {
                return true
            }
        }
        return false
    }
    const actionIcons = (
        <>
            <div className="col">
                {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
            </div>
            <div className="col">
                {onClickDelete && <TrashFill onClick={onClickDelete} className={s.icon} />}
            </div>
        </>
    )
    const titleInput = (
        <div className='mb-5'>
            <label htmlFor="" className='form-label'>Title</label>
            <input type='text' value={formValues.title} onChange={updateFormValues} name="title" className='form-control' />
            <FieldError msg={formErrors.title} />
        </div>
    )
    const contentInput = (
        <div className='mb-5'>
            <label htmlFor="" className='form-label'>Content</label>
            <textarea type="text" value={formValues.content} onChange={updateFormValues} name="content" className='form-control' cols={10} rows="5" />
            <FieldError msg={formErrors.content} />
        </div>
    )

    const submitBtn = (
        <div className={s.submitBtn}>
            {onSubmit && <ButtonPrimary isDisabled={hasError()} onClick={() => onSubmit(formValues)}>Submit</ButtonPrimary>}
        </div>
    )
    return (
        <div className={s.container}>
            <div className='row justify-content-space-between'>
                <div className='col-10'>
                    <h2 className='mb-3'>{title}</h2>
                </div>
                {actionIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            <div className='mb-3'>{isEditable ? contentInput : <pre>{note.content}</pre>}</div>
            {submitBtn}
        </div>
    )
}