import { StudentsResponse } from '../types';

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(res.status + ' ' + (text || res.statusText));
    }
    return res.json();
}

export async function uploadStudents(file: File): Promise<void> {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/students/upload', {
        method: 'POST',
        body: form,
    });
    if (!res.ok) {
        const txt = await res.text();
        throw new Error('Upload failed: ' + (txt || res.statusText));
    }
}

export async function getAllStudents(): Promise<StudentsResponse> {
    return handleResponse<StudentsResponse>(await fetch('/students'));
}

export async function searchStudents(query: string): Promise<StudentsResponse> {
    const url = `/students/search?name=${encodeURIComponent(query)}`;
    console.log('Searching students with URL:', url); // Логируем URL
    return handleResponse<StudentsResponse>(await fetch(url));
}

export async function getFaculties(): Promise<string[]> {
    return handleResponse<string[]>(await fetch('/students/faculties'));
}

export async function deleteAllStudents(): Promise<void> {
    const res = await fetch('/students/deleteAll', { method: 'DELETE' });
    console.log(res);
    if (!res.ok) throw new Error('Delete failed: ' + res.statusText);
}
