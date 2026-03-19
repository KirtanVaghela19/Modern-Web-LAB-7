import Document from '../models/Document.js';

const formatDocument = (document) => ({
  documentId: document.documentId || document._id.toString(),
  title: document.title,
  description: document.description,
  ownerId: document.ownerId,
  creationDate: document.creationDate,
  lastUpdatedDate: document.lastUpdatedDate
});

const formatLastReviewedDocument = (lastReviewedDocument) => {
  if (!lastReviewedDocument) {
    return null;
  }

  return {
    documentId: lastReviewedDocument.documentId,
    title: lastReviewedDocument.title,
    reviewedAt: lastReviewedDocument.reviewedAt
  };
};

export const createDocument = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required'
      });
    }

    if (!title.trim() || !description.trim()) {
      return res.status(400).json({
        message: 'Title and description cannot be empty'
      });
    }

    const document = await Document.create({
      title: title.trim(),
      description: description.trim(),
      ownerId: req.session.userId
    });

    return res.status(201).json({
      message: 'Document created successfully',
      document: formatDocument(document)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating document',
      error: error.message
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      ownerId: req.session.userId
    }).sort({ creationDate: -1 });

    return res.status(200).json({
      documents: documents.map((doc) => formatDocument(doc)),
      lastReviewedDocument: formatLastReviewedDocument(req.session.lastReviewedDocument)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving documents',
      error: error.message
    });
  }
};

export const getDocumentById = async (req, res) => {
  const document = req.document;
  req.session.lastReviewedDocument = {
    documentId: document.documentId || document._id.toString(),
    title: document.title,
    reviewedAt: new Date().toISOString()
  };

  return res.status(200).json(formatDocument(document));
};

export const updateDocument = async (req, res) => {
  try {
    const document = req.document;
    const { title, description } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: 'Title cannot be empty'
        });
      }

      document.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          message: 'Description cannot be empty'
        });
      }

      document.description = description.trim();
    }

    await document.save();

    return res.status(200).json({
      message: 'Document updated successfully',
      document: formatDocument(document)
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating document',
      error: error.message
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await req.document.deleteOne();

    return res.status(200).json({
      message: 'Document deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting document',
      error: error.message
    });
  }
};
