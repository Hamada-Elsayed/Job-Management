import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Favorites = () => {
  const { user } = useUser();
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const userFavorites = allJobs.filter(job => job.userId === user.id && job.favorite);
    setFavoriteJobs(userFavorites);
  };

  const handleDelete = (jobIndex) => {
    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    const updatedJobs = allJobs.filter(
      (job, index) =>
        !(job.userId === user.id && job.favorite && favoriteJobs[jobIndex] === job)
    );

    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    loadFavorites();
  };

  return (
    <div className="job-list-container">
      <h2>الوظائف المفضلة ❤️</h2>

      {!user ? (
        <p>يرجي تسجيل الدخول لعرض المفضلة.</p>
      ) : favoriteJobs.length === 0 ? (
        <p>لا توجد وظائف مفضلة حتى الآن.</p>
      ) : (
        <div className="job-list">
          {favoriteJobs.map((job, index) => (
            <div key={`${job.title}-${job.company}-${index}`} className="job-card">
              <div className="job-header" style={{gap:"180px"}}>
                <h3 style={{margin:"0"}}>{job.title}</h3>
                <span>❤️</span>
              </div>
              <p><strong>الشركة:</strong> {job.company}</p>
              <p><strong>الموقع:</strong> {job.location || 'غير محدد'}</p>
              <p><strong>الحالة:</strong> {job.status}</p>
              {job.notes && <p><strong>ملاحظات:</strong> {job.notes}</p>}

              <div className="job-actions" style={{justifyContent:"center"}}>
                <button onClick={() => handleDelete(index)}>🗑️ حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
