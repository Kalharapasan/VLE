import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Modal, Badge } from 'react-bootstrap';
import { getPageContents, updatePageSection, deletePageSection } from '../../Service/pageContentService';

const PAGE_SLUGS = ['home', 'about', 'contact', 'academic'];
const SECTION_KEYS = {
  home: ['hero_title', 'hero_subtitle', 'about_title', 'about_description', 'about_image'],
  about: ['header_title', 'vision_title', 'vision', 'mission_title', 'mission', 'history_title', 'history', 'contact_title', 'address', 'phone', 'email', 'hours', 'about_image', 'map_placeholder'],
  contact: ['header_title', 'header_subtitle', 'info_title', 'address', 'phone', 'email', 'hours', 'map_placeholder'],
  academic: ['hero_title', 'hero_subtitle', 'ug_title', 'program_1', 'program_2', 'program_3', 'pg_title', 'pg_1', 'pg_2', 'faculties_title', 'faculties_desc', 'dept_title', 'dept_1', 'dept_2', 'dept_3'],
};

export default function PageEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({ section_key: '', content: '', image_path: '', title: '', sort_order: 0 });

  useEffect(() => {
    fetchSections();
  }, [selectedPage]);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await getPageContents(selectedPage);
      setSections(res.data || []);
    } catch (err) {
      console.error('Error fetching sections:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (section = null) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        section_key: section.section_key,
        content: section.content || '',
        image_path: section.image_path || '',
        title: section.title || '',
        sort_order: section.sort_order || 0,
      });
    } else {
      setEditingSection(null);
      setFormData({ section_key: '', content: '', image_path: '', title: '', sort_order: 0 });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePageSection(selectedPage, formData.section_key, {
        content: formData.content,
        image_path: formData.image_path,
        title: formData.title,
        sort_order: formData.sort_order,
      });
      alert('Section saved successfully!');
      setShowModal(false);
      fetchSections();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving section');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    try {
      await deletePageSection(id);
      fetchSections();
    } catch (err) {
      alert('Error deleting section');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Page Content Editor</h3>

      {/* Page Selector */}
      <div className="mb-4">
        <Button
          variant={selectedPage === 'home' ? 'primary' : 'outline-primary'}
          className="me-2 mb-2"
          onClick={() => setSelectedPage('home')}
        >
          Home Page
        </Button>
        <Button
          variant={selectedPage === 'about' ? 'primary' : 'outline-primary'}
          className="me-2 mb-2"
          onClick={() => setSelectedPage('about')}
        >
          About Page
        </Button>
        <Button
          variant={selectedPage === 'contact' ? 'primary' : 'outline-primary'}
          className="me-2 mb-2"
          onClick={() => setSelectedPage('contact')}
        >
          Contact Page
        </Button>
        <Button
          variant={selectedPage === 'academic' ? 'primary' : 'outline-primary'}
          className="me-2 mb-2"
          onClick={() => setSelectedPage('academic')}
        >
          Academic Page
        </Button>
      </div>

      {/* Add New Section */}
      <div className="mb-4">
        <Button variant="success" onClick={() => handleOpenModal()}>
          Add New Section
        </Button>
      </div>

      {/* Sections Table */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Section Key</th>
              <th>Title</th>
              <th>Content Preview</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, idx) => (
              <tr key={section.id || idx}>
                <td>{idx + 1}</td>
                <td><code>{section.section_key}</code></td>
                <td>{section.title || '-'}}</td>
                <td>
                  {section.content ? (
                    <span>
                      {section.content.length > 50
                        ? section.content.substring(0, 50) + '...'
                        : section.content}
                    </span>
                  ) : (
                    <span className="text-muted">No content</span>
                  )}
                </td>
                <td>
                  {section.image_path ? (
                    <Badge bg="success">Has Image</Badge>
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => handleOpenModal(section)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(section.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit/Add Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSection ? 'Edit Section' : 'Add New Section'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Section Key</Form.Label>
              <Form.Control
                type="text"
                value={formData.section_key}
                onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                required
                disabled={editingSection !== null}
              />
              <Form.Text className="text-muted">
                Available: {SECTION_KEYS[selectedPage]?.join(', ')}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Path (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={formData.image_path}
                onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                placeholder="/images/example.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sort Order</Form.Label>
              <Form.Control
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Section
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
