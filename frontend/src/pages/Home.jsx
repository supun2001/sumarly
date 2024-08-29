import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [user_type, setUsertype] = useState("");
    const [transcript, setTranscript] = useState("");
    const [time, setTime] = useState("");
    
    // State for the new form
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [context, setContext] = useState("");
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { user_type, transcript, time })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    // New function to handle YouTube URL and file upload submission
    const handleTranscribeSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (youtubeUrl) formData.append('url', youtubeUrl);
        if (context) formData.append('context', context);
        if (file) formData.append('file', file);

        try {
            const response = await api.post('/api/download/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setResult(response.data);
                setError(null);
            } else {
                setError(response.data.error);
                setResult(null);
            }
        } catch (err) {
            setError('Fetch Error: ' + err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="user_type">User Type:</label>
                <br />
                <input
                    type="text"
                    id="user_type"
                    name="user_type"
                    required
                    onChange={(e) => setUsertype(e.target.value)}
                    value={user_type}
                />
                <label htmlFor="transcript">Transcript:</label>
                <br />
                <input
                    type="text"
                    id="transcript"
                    name="transcript"
                    required
                    onChange={(e) => setTranscript(e.target.value)}
                    value={transcript}
                />
                <label htmlFor="time">Time :</label>
                <br />
                <input
                    type="text"
                    id="time"
                    name="time"
                    required
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>

            <h2>Download and Transcribe</h2>
            <form onSubmit={handleTranscribeSubmit}>
                <label htmlFor="youtubeUrl">YouTube URL:</label>
                <br />
                <input
                    type="text"
                    id="youtubeUrl"
                    name="youtubeUrl"
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    value={youtubeUrl}
                />
                <label htmlFor="context">Context:</label>
                <br />
                <textarea
                    id="context"
                    name="context"
                    onChange={(e) => setContext(e.target.value)}
                    value={context}
                />
                <label htmlFor="file">Upload File:</label>
                <br />
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>

            {result && (
                <div>
                    <h2>Transcription Result</h2>
                    <p><strong>Summary:</strong></p>
                    <p>{result.summary.join('\n')}</p>
                    <p><strong>Remaining Time:</strong> {result.remaining_time}</p>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Home;
