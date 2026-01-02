import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import RateLimitedUi from "../Component/RateLimitedUi";
import toast from "react-hot-toast";
import NoteCard from "../Component/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../Component/NotesNotFound";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Failed to fetch notes:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };
  return (
    <div className="min-h-screen">
      <Navbar />
<div className="flex-none">
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary btn-sm m-6"
          >
            Logout
          </button>
          </div>
      {/* Rate limit UI */}
      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loading */}
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}
        {notes.length > 0 && !isRateLimited && <NotesNotFound/>}

        {/* Notes */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
             <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {/* Empty state */}
        { notes.length === 0 && !isRateLimited && (
          <p className="text-center text-gray-500">No notes found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
