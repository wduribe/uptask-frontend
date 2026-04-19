import { Task } from '../../../types';
import { AddNotesForm } from './AddNotesForm';
import { NoteDetails } from './NoteDetails';

interface NotesPanelProps {
    notes: Task['notes'],
}

export const NotesPanel = ({ notes }: NotesPanelProps) => {
    return (
        <>
            <AddNotesForm />
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length
                    ?
                    <>
                        <p className='font-bold text-2xl text-slate-600 my-5'>Notas:</p>
                        {notes.map(note => <NoteDetails note={note} key={note._id} />)}
                    </>
                    :
                    <p className='text-gray-500 text-center pt-3'>No hay notas</p>
                }
            </div >
        </>
    )
}
