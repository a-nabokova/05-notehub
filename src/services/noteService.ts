
import axios from "axios";
import type { Note } from "../types/note";
 
const token = import.meta.env.VITE_NOTEHUB_TOKEN;


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    page: number;
    perPage: number;
}

 
export default async function fetchNotes(page: number, perPage: number, search?: string) {
     const res = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params: {
            page,
            perPage,
            search,  
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return res.data; 
}


interface СreateNotes {
     title: string;
    content: string;
    tag: string; 
    
}

export  async function createNote(note: СreateNotes) {
    const res = await axios.post<Note>('https://notehub-public.goit.study/api/notes', note, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

        return res.data; 


}


export  async function deleteNote(id: string) {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

        return res.data; 


}