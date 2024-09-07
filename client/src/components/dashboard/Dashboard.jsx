import React from 'react';

function Dashboard() {
  return (
    <div className="mainContent">
      <div className="introContent">
        <h1>User Dashboard</h1>
      </div>
      <div className="detailsContainer">
        <div className="detail-item">
          <h3>Name: Aditya Dhiman</h3>
        </div>
        <div className="detail-item">
          <h3>Email: info@adityadhiman.in</h3>
        </div>
        <div className="detail-item">
          <h3>Level: 07</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
