import { Header } from 'components/logo/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import { fetchAll, onShouldSyncNotes } from 'api/note-api';
import { useDispatch } from 'react-redux';
import { setNoteList } from 'store/notes/notes-slice';
import { withAuthRequired } from 'hoc/withAuthRequired';
import { ButtonPrimary } from 'components/ButtonPrimary/ButtomPrimary';
import s from './style.module.css'

function App(props) {
  const disptach = useDispatch();
  const navigate = useNavigate();

  async function fetchAllNotes() {
    const noteList = await fetchAll();
    disptach(setNoteList(noteList))
  }
  useEffect(() => {
    let unSubscribe;
    ; (async () => {
      unSubscribe = await onShouldSyncNotes(fetchAllNotes);
    })();
    return () => unSubscribe()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Header />
      <ButtonPrimary className={s.buttonAdd} onClick={() => navigate('/note/new')}>+</ButtonPrimary>
      <div className={"workspace"}>
        <Outlet />
      </div>
    </div>
  );
}


export const ProtectedApp = withAuthRequired(App);