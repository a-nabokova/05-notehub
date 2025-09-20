// Загальні інтерфейси, які пов’язані з сутністю нотаток (Note, NoteTag) мають бути у файлі — src/types/note.ts.


export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: string;

}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

 