import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPortal.css';

// Base API configuration
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Configure axios to include auth token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [destinations, setDestinations] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      fetchData();
      showNotification('Login successful', 'success');
    } catch (error) {
      showNotification('Login failed. Please check your credentials.', 'error');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    showNotification('Logged out successfully', 'info');
  };

  const fetchData = async () => {
    try {
      // In a real app, we would fetch data from the API
      // For demo purposes, we'll use mock data
      setDestinations([
        { id: 1, title: 'Bali Destination Guide', status: 'published', reviews: 42, rating: 4.7 },
        { id: 2, title: 'Paris Destination Guide', status: 'draft', reviews: 28, rating: 4.5 },
        { id: 3, title: 'Tokyo Destination Guide', status: 'published', reviews: 35, rating: 4.8 },
      ]);
      
      setItineraries([
        { id: 1, title: 'Week in Japan', destination: 'Japan', duration: '7 days', saves: 125 },
        { id: 2, title: 'European Adventure', destination: 'Multiple', duration: '14 days', saves: 89 },
      ]);
      
      setReviews([
        { id: 1, user: 'traveler123', destination: 'Bali', rating: 5, comment: 'Amazing guide!', status: 'approved' },
        { id: 2, user: 'wanderlust', destination: 'Paris', rating: 4, comment: 'Very helpful', status: 'pending' },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Error fetching data', 'error');
    }
  };

  const deleteDestination = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination guide?')) return;
    
    try {
      // In a real app: await axios.delete(`${API_BASE_URL}/destination-guides/${id}`);
      setDestinations(destinations.filter(dest => dest.id !== id));
      showNotification('Destination guide deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting destination:', error);
      showNotification('Error deleting destination guide', 'error');
    }
  };

  const deleteItinerary = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    
    try {
      // In a real app: await axios.delete(`${API_BASE_URL}/trip-itineraries/${id}`);
      setItineraries(itineraries.filter(it => it.id !== id));
      showNotification('Itinerary deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      showNotification('Error deleting itinerary', 'error');
    }
  };

  const updateReviewStatus = async (id, status) => {
    try {
      // In a real app: await axios.patch(`${API_BASE_URL}/reviews/${id}`, { status });
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, status } : review
      ));
      showNotification(`Review ${status} successfully`, 'success');
    } catch (error) {
      console.error('Error updating review:', error);
      showNotification('Error updating review', 'error');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>TravelTrove Admin Portal</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <header className="admin-header">
        <h1>TravelTrove Admin Portal</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'destinations' ? 'active' : ''}
          onClick={() => setActiveTab('destinations')}
        >
          Destination Guides
        </button>
        <button 
          className={activeTab === 'itineraries' ? 'active' : ''}
          onClick={() => setActiveTab('itineraries')}
        >
          Trip Itineraries
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          User Reviews
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add New Content
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'destinations' && (
          <div className="tab-content">
            <h2>Destination Guides</h2>
            <div className="content-grid">
              {destinations.map(dest => (
                <div key={dest.id} className="content-card">
                  <h3>{dest.title}</h3>
                  <div className="meta">
                    <span className={`status ${dest.status}`}>{dest.status}</span>
                    <span>⭐ {dest.rating} ({dest.reviews} reviews)</span>
                  </div>
                  <div className="actions">
                    <button className="btn-edit">Edit</button>
                    <button 
                      className="btn-delete"
                      onClick={() => deleteDestination(dest.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'itineraries' && (
          <div className="tab-content">
            <h2>Trip Itineraries</h2>
            <div className="content-grid">
              {itineraries.map(it => (
                <div key={it.id} className="content-card">
                  <h3>{it.title}</h3>
                  <div className="meta">
                    <span>Destination: {it.destination}</span>
                    <span>Duration: {it.duration}</span>
                    <span>Saved by {it.saves} users</span>
                  </div>
                  <div className="actions">
                    <button className="btn-edit">Edit</button>
                    <button 
                      className="btn-delete"
                      onClick={() => deleteItinerary(it.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="tab-content">
            <h2>User Reviews</h2>
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td>{review.user}</td>
                    <td>{review.destination}</td>
                    <td>{"⭐".repeat(review.rating)}</td>
                    <td>{review.comment}</td>
                    <td>
                      <span className={`status ${review.status}`}>
                        {review.status}
                      </span>
                    </td>
                    <td>
                      {review.status === 'pending' && (
                        <>
                          <button 
                            className="btn-approve"
                            onClick={() => updateReviewStatus(review.id, 'approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => updateReviewStatus(review.id, 'rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="tab-content">
            <h2>Add New Content</h2>
            <div className="add-options">
              <div className="add-option">
                <h3>Add Destination Guide</h3>
                <p>Create a new destination guide with information about history, culture, and attractions.</p>
                <button className="btn-primary">Create New Guide</button>
              </div>
              <div className="add-option">
                <h3>Add Itinerary Template</h3>
                <p>Create a new itinerary template that users can customize.</p>
                <button className="btn-primary">Create New Itinerary</button>
              </div>
              <div className="add-option">
                <h3>Add Activity</h3>
                <p>Add a new activity that can be included in itineraries.</p>
                <button className="btn-primary">Add Activity</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPortal;




/* AdminPortal.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-container button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-container button:hover {
  background-color: #2980b9;
}

.login-container button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.admin-portal {
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.admin-nav {
  display: flex;
  background-color: #34495e;
  padding: 0;
}

.admin-nav button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.admin-nav button:hover {
  background-color: #2c3e50;
}

.admin-nav button.active {
  background-color: #3498db;
  font-weight: bold;
}

.admin-content {
  padding: 2rem;
}

.tab-content h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.content-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.content-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status.published {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.draft {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status.pending {
  background-color: #e3f2fd;
  color: #1565c0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-approve {
  background-color: #2ecc71;
  color: white;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.25rem;
}

.btn-reject {
  background-color: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reviews-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reviews-table th,
.reviews-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.reviews-table th {
  background-color: #34495e;
  color: white;
  font-weight: 500;
}

.reviews-table tr:hover {
  background-color: #f9f9f9;
}

.add-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.add-option {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-option h3 {
  color: #2c3e50;
}

.add-option p {
  color: #7f8c8d;
  flex-grow: 1;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-start;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  color: white;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: #2ecc71;
}

.notification.error {
  background-color: #e74c3c;
}

.notification.info {
  background-color: #3498db;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .admin-nav {
    flex-direction: column;
  }
  
  .content-grid,
  .add-options {
    grid-template-columns: 1fr;
  }
  
  .reviews-table {
    display: block;
    overflow-x: auto;
  }
}


