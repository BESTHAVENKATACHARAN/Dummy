import React, { useState, useEffect } from 'react';

const DestinationEditForm = ({ destination, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    history: '',
    culture: '',
    attractions: '',
    lodging: '',
    dining: '',
    activities: '',
    status: 'draft'
  });

  useEffect(() => {
    if (destination) {
      // Convert arrays to comma-separated strings
      setFormData({
        title: destination.title || '',
        description: destination.description || '',
        history: destination.history || '',
        culture: destination.culture || '',
        attractions: destination.attractions ? destination.attractions.map(a => a.name).join(', ') : '',
        lodging: destination.lodging ? destination.lodging.map(l => l.name).join(', ') : '',
        dining: destination.dining ? destination.dining.map(d => d.name).join(', ') : '',
        activities: destination.activities ? destination.activities.map(a => a.name).join(', ') : '',
        status: destination.status || 'draft'
      });
    }
  }, [destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma-separated strings back to arrays of objects
    const processedData = {
      ...formData,
      attractions: formData.attractions.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      lodging: formData.lodging.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      dining: formData.dining.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      activities: formData.activities.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
    };
    
    onSave(processedData);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Destination</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="history" className="form-label">History</label>
                <textarea
                  className="form-control"
                  id="history"
                  name="history"
                  rows="3"
                  value={formData.history}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="culture" className="form-label">Culture</label>
                <textarea
                  className="form-control"
                  id="culture"
                  name="culture"
                  rows="3"
                  value={formData.culture}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="attractions" className="form-label">Attractions (comma separated)</label>
                <textarea
                  className="form-control"
                  id="attractions"
                  name="attractions"
                  rows="2"
                  value={formData.attractions}
                  onChange={handleChange}
                  placeholder="Uluwatu Temple, Tegallalang Rice Terraces, Ubud Monkey Forest"
                ></textarea>
                <div className="form-text">Enter attractions separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="lodging" className="form-label">Lodging Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="lodging"
                  name="lodging"
                  rows="2"
                  value={formData.lodging}
                  onChange={handleChange}
                  placeholder="Luxury resorts in Seminyak, eco-friendly hotels in Ubud"
                ></textarea>
                <div className="form-text">Enter lodging options separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="dining" className="form-label">Dining Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="dining"
                  name="dining"
                  rows="2"
                  value={formData.dining}
                  onChange={handleChange}
                  placeholder="Traditional warungs, beachfront cafes, fine dining restaurants"
                ></textarea>
                <div className="form-text">Enter dining options separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="activities" className="form-label">Activity Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="activities"
                  name="activities"
                  rows="2"
                  value={formData.activities}
                  onChange={handleChange}
                  placeholder="Surfing, yoga retreats, temple visits, hiking volcanoes"
                ></textarea>
                <div className="form-text">Enter activities separated by commas</div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationAddForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    history: '',
    culture: '',
    attractions: '',
    lodging: '',
    dining: '',
    activities: '',
    status: 'draft'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma-separated strings back to arrays of objects
    const processedData = {
      ...formData,
      attractions: formData.attractions.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      lodging: formData.lodging.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      dining: formData.dining.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
      activities: formData.activities.split(',').map(item => ({ name: item.trim() })).filter(item => item.name),
    };
    
    onSave(processedData);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Destination</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="history" className="form-label">History</label>
                <textarea
                  className="form-control"
                  id="history"
                  name="history"
                  rows="3"
                  value={formData.history}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="culture" className="form-label">Culture</label>
                <textarea
                  className="form-control"
                  id="culture"
                  name="culture"
                  rows="3"
                  value={formData.culture}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="attractions" className="form-label">Attractions (comma separated)</label>
                <textarea
                  className="form-control"
                  id="attractions"
                  name="attractions"
                  rows="2"
                  value={formData.attractions}
                  onChange={handleChange}
                  placeholder="Uluwatu Temple, Tegallalang Rice Terraces, Ubud Monkey Forest"
                ></textarea>
                <div className="form-text">Enter attractions separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="lodging" className="form-label">Lodging Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="lodging"
                  name="lodging"
                  rows="2"
                  value={formData.lodging}
                  onChange={handleChange}
                  placeholder="Luxury resorts in Seminyak, eco-friendly hotels in Ubud"
                ></textarea>
                <div className="form-text">Enter lodging options separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="dining" className="form-label">Dining Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="dining"
                  name="dining"
                  rows="2"
                  value={formData.dining}
                  onChange={handleChange}
                  placeholder="Traditional warungs, beachfront cafes, fine dining restaurants"
                ></textarea>
                <div className="form-text">Enter dining options separated by commas</div>
              </div>

              <div className="mb-3">
                <label htmlFor="activities" className="form-label">Activity Recommendations (comma separated)</label>
                <textarea
                  className="form-control"
                  id="activities"
                  name="activities"
                  rows="2"
                  value={formData.activities}
                  onChange={handleChange}
                  placeholder="Surfing, yoga retreats, temple visits, hiking volcanoes"
                ></textarea>
                <div className="form-text">Enter activities separated by commas</div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage in the main AdminPortal component
const AdminPortal = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      title: 'Bali Destination Guide',
      description: 'Explore the beautiful island of Bali with its rich culture and stunning landscapes.',
      history: 'Bali has a rich history influenced by Hindu culture...',
      culture: 'Balinese culture is a unique blend of Hinduism, Buddhism and ancient indigenous traditions...',
      attractions: [
        { name: 'Uluwatu Temple' },
        { name: 'Tegallalang Rice Terraces' },
        { name: 'Ubud Monkey Forest' }
      ],
      lodging: [
        { name: 'Luxury resorts in Seminyak' },
        { name: 'Eco-friendly hotels in Ubud' }
      ],
      dining: [
        { name: 'Traditional warungs' },
        { name: 'Beachfront cafes' },
        { name: 'Fine dining restaurants' }
      ],
      activities: [
        { name: 'Surfing' },
        { name: 'Yoga retreats' },
        { name: 'Temple visits' },
        { name: 'Hiking volcanoes' }
      ],
      status: 'published'
    }
  ]);

  const handleEdit = (destination) => {
    setSelectedDestination(destination);
    setShowEditForm(true);
  };

  const handleSaveEdit = (updatedData) => {
    setDestinations(destinations.map(dest => 
      dest.id === selectedDestination.id ? { ...dest, ...updatedData } : dest
    ));
    setShowEditForm(false);
    setSelectedDestination(null);
    // Show success notification
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleSaveAdd = (newData) => {
    const newDestination = {
      id: Math.max(...destinations.map(d => d.id)) + 1,
      ...newData
    };
    setDestinations([...destinations, newDestination]);
    setShowAddForm(false);
    // Show success notification
  };

  const handleCancel = () => {
    setShowEditForm(false);
    setShowAddForm(false);
    setSelectedDestination(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>TravelTrove Admin Portal</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus me-2"></i>Add Destination
        </button>
      </div>
      
      <div className="row">
        {destinations.map(destination => (
          <div key={destination.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{destination.title}</h5>
                <p className="card-text">{destination.description}</p>
                
                <h6 className="mt-3">Attractions</h6>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {destination.attractions.map((attraction, index) => (
                    <span key={index} className="badge bg-primary">{attraction.name}</span>
                  ))}
                </div>
                
                <h6>Lodging</h6>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {destination.lodging.map((lodging, index) => (
                    <span key={index} className="badge bg-success">{lodging.name}</span>
                  ))}
                </div>
                
                <h6>Dining</h6>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {destination.dining.map((dining, index) => (
                    <span key={index} className="badge bg-warning text-dark">{dining.name}</span>
                  ))}
                </div>
                
                <h6>Activities</h6>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {destination.activities.map((activity, index) => (
                    <span key={index} className="badge bg-info">{activity.name}</span>
                  ))}
                </div>
                
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => handleEdit(destination)}
                >
                  <i className="fas fa-edit me-2"></i>Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Render forms when needed */}
      {showEditForm && (
        <DestinationEditForm
          destination={selectedDestination}
          onSave={handleSaveEdit}
          onCancel={handleCancel}
        />
      )}
      
      {showAddForm && (
        <DestinationAddForm
          onSave={handleSaveAdd}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AdminPortal;
