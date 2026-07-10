import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from './Icon';

const UploadModal = ({ isOpen, onClose, currentMood, MOODS, m, I, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedMood, setSelectedMood] = useState(currentMood === 'neutral' ? 'happy' : currentMood);
    const [uploading, setUploading] = useState(false);
    const [uploadPct, setUploadPct] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Update selectedMood when currentMood changes (when switching pages)
    useEffect(() => {
        if (isOpen) {
            setSelectedMood(currentMood === 'neutral' ? 'happy' : currentMood);
        }
    }, [isOpen, currentMood]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        if (!selectedMood) {
            setError('Please select a mood');
            return;
        }

        setUploading(true);
        setError(null);
        setUploadPct(0);

        try {
            const formData = new FormData();
            formData.append('song', selectedFile);
            formData.append('mood', selectedMood);

            const res = await axios.post('http://localhost:3000/api/songs/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    if (e.total) {
                        const pct = Math.round((e.loaded / e.total) * 100);
                        setUploadPct(pct);
                    }
                }
            });

            if (res && res.data) {
                setSuccess(true);
                if (onUploadSuccess) onUploadSuccess();

                setTimeout(() => {
                    setSelectedFile(null);
                    setSelectedMood(currentMood === 'neutral' ? 'happy' : currentMood);
                    setSuccess(false);
                    onClose();
                }, 1400);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload song');
        } finally {
            setUploading(false);
            setUploadPct(0);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(3,6,23,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(6px)'
            }}
            onClick={onClose}
        >
            <style>{`
                @keyframes modalIn { from { transform: translateY(8px) scale(.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
                @keyframes stripe { from { background-position: 0 0 } to { background-position: 40px 0 } }
                .upload-spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,.12); border-top-color: #fff; animation: spin 1s linear infinite }
                @keyframes spin { to { transform: rotate(360deg) } }
            `}</style>

            <div
                style={{
                    background: 'linear-gradient(180deg, #0f1220, #141427)',
                    border: `1px solid ${m.c}30`,
                    borderRadius: 14,
                    padding: '20px',
                    maxWidth: 520,
                    width: '92%',
                    boxShadow: `0 12px 48px rgba(2,6,23,0.6)` ,
                    animation: 'modalIn .22s cubic-bezier(.2,.9,.3,1)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Upload Song</h3>
                        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Share a track with the community</p>
                    </div>
                    <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.45)', cursor: 'pointer' }}>
                        <Icon d={I?.trashOutline || 'M6 19c0 1.1.9 2 2 2h8...'} sz={18} />
                    </button>
                </div>

                <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                    onDrop={handleDrop}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '18px',
                        borderRadius: 12,
                        border: dragActive ? `2px dashed ${m.c}` : `1px dashed rgba(255,255,255,.06)`,
                        background: dragActive ? `${m.c}12` : 'rgba(255,255,255,.02)',
                        marginBottom: 16,
                        transition: 'all .18s ease',
                        cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('upload-file-input')?.click()}
                >
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: `${m.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon d={I.play} sz={22} fill={m.c} />
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedFile ? selectedFile.name : 'Drop an MP3 file or click to choose'}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', marginTop: 6 }}>{selectedFile ? `${(selectedFile.size/1024/1024).toFixed(2)} MB` : 'Accepted: .mp3 — Max 10MB'}</div>
                            </div>
                            <div style={{ marginLeft: 12 }}>
                                {selectedFile ? (
                                    <div style={{ fontSize: 12, color: m.c }}>Selected</div>
                                ) : (
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.38)' }}>Browse</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <input id="upload-file-input" type="file" accept=".mp3" onChange={handleFileChange} disabled={uploading} style={{ display: 'none' }} />
                </div>

                <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'rgba(255,255,255,.85)' }}>Select Mood</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {Object.entries(MOODS).filter(([k]) => k !== 'neutral').map(([k, cfg]) => (
                            <button key={k} onClick={() => setSelectedMood(k)} disabled={uploading}
                                style={{
                                    padding: '8px 12px', borderRadius: 10, border: 'none',
                                    background: selectedMood === k ? `${cfg.c}18` : 'transparent',
                                    boxShadow: selectedMood === k ? `inset 0 0 0 1px ${cfg.c}22` : 'none',
                                    color: cfg.c, fontWeight: 600, cursor: 'pointer', transform: selectedMood === k ? 'scale(1.03)' : 'scale(1)',
                                    transition: 'all .15s ease'
                                }}
                            >
                                <span style={{ marginRight: 6 }}>{cfg.emoji}</span>
                                {cfg.label}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <div style={{ padding: 12, borderRadius: 8, background: '#ff5861', color: '#fff', marginBottom: 12 }}>{error}</div>}

                {/* progress */}
                {uploading && (
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ height: 8, borderRadius: 6, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${uploadPct}%`, background: `linear-gradient(90deg, ${m.c}, #6ee7b7)`, transition: 'width .2s ease' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                            <span>Uploading…</span>
                            <span>{uploadPct}%</span>
                        </div>
                    </div>
                )}

                {success && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 999, background: m.c, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transform: 'scale(1)', transition: 'transform .22s' }}>
                            ✓
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: m.c }}>Uploaded</div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 6 }}>
                    <button onClick={onClose} disabled={uploading} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,.06)', background: 'transparent', color: 'rgba(255,255,255,.7)', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleUpload} disabled={uploading || !selectedFile} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: m.c, color: m.dark ? '#000' : '#fff', fontWeight: 700, cursor: uploading || !selectedFile ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {uploading ? <div className="upload-spinner" /> : <Icon d={I.play} sz={14} fill={m.dark ? '#000' : '#fff'} />}
                        {uploading ? 'Uploading' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
