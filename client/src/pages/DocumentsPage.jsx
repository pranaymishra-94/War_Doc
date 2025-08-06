// src/pages/DocumentsPage.jsx

import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const DocumentsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await productService.getDocuments();
        if (Array.isArray(data)) {
          setDocuments(data);
        }
      } catch (err) {
        console.error("Could not fetch documents");
      }
    };
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const uploadResponse = await productService.uploadFile(selectedFile);
      const newDocumentData = {
        fileName: selectedFile.name,
        fileUrl: uploadResponse.url,
        fileType: selectedFile.type,
      };
      const newDocument = await productService.createDocument(newDocumentData);
      setDocuments(prevDocs => [...prevDocs, newDocument]);
      setSelectedFile(null);
    } catch (err) {
      setError('File upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // --- ADD THIS DELETE HANDLER ---
  const handleDeleteDocument = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await productService.deleteDocument(documentId);
        // Update the UI by filtering out the deleted document
        setDocuments(documents.filter(doc => doc._id !== documentId));
      } catch (error) {
        console.error('Failed to delete document', error);
        alert('Could not delete the document. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Manage Your Bills, Invoices, Warranty Slips or Receipts</h1>
      
      {/* Upload Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload a New Document</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center space-x-4">
          <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          <button onClick={handleUpload} disabled={loading || !selectedFile} className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Uploaded Files</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {documents.length === 0 ? (
            <p>No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="truncate text-sm text-gray-700">{doc.fileName}</span>
                  <div className="flex items-center space-x-4">
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View
                    </a>
                    {/* --- ADD THIS DELETE BUTTON --- */}
                    <button onClick={() => handleDeleteDocument(doc._id)} className="text-sm font-medium text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
