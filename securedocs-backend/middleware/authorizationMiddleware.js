import mongoose from 'mongoose';
import Document from '../models/Document.js';

export const requireDocumentOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid document identifier'
      });
    }

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: 'Document not found'
      });
    }

    const isOwner = document.ownerId.toString() === req.session.userId;

    if (!isOwner) {
      return res.status(403).json({
        message: 'Access denied: you do not own this document'
      });
    }

    req.document = document;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Authorization check failed',
      error: error.message
    });
  }
};
