import  { useEffect, useState } from 'react';
import './JobList.css';
import { useUser } from '@clerk/clerk-react';

const JobList = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'قيد الانتظار',
    notes: '',
    favorite: false,
  });

//
  useEffect(() => {
    if (user) {
      const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const userJobs = allJobs.filter(job => job.userId === user.id);
      setJobs(userJobs);
    }
  }, [user]);


  //
  const updateJobsStorage = (newUserJobs) => {
    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const otherJobs = allJobs.filter(job => job.userId !== user.id);
    const updatedJobs = [...otherJobs, ...newUserJobs];
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(newUserJobs);
  };

  //
  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    updateJobsStorage(updatedJobs);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  //
  const toggleFavorite = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].favorite = !updatedJobs[index].favorite;
    updateJobsStorage(updatedJobs);
  };

  //
  const startEditing = (index) => {
    const job = jobs[index];
    setEditFormData({...job});
    setEditingIndex(index);
  };

  //
  const cancelEditing = () => {
    setEditingIndex(null);
  };

  //
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //
  const saveEdit = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs];
    updatedJobs[editingIndex] = editFormData;
    updateJobsStorage(updatedJobs);
    setEditingIndex(null);
  };

  return (
    <div className="job-list-container">
      <h2>قائمة الوظائف</h2>

      {!user ? (
        <p>يرجي تسجيل الدخول لعرض الوظائف.</p>
      ) : jobs.length === 0 ? (
        <p>لا توجد وظائف مضافة بعد.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job, index) => (
            <div key={job.id || index} className="job-card">
              {editingIndex === index ? (
                <form onSubmit={saveEdit} className="edit-form">
                  <label>
                    المسمى الوظيفي:
                    <input 
                      type="text" 
                      name="title" 
                      value={editFormData.title} 
                      onChange={handleEditChange} 
                      required 
                    />
                  </label>
                  <label>
                    اسم الشركة:
                    <input 
                      type="text" 
                      name="company" 
                      value={editFormData.company} 
                      onChange={handleEditChange} 
                      required 
                    />
                  </label>
                  <label>
                    الموقع:
                    <input 
                      type="text" 
                      name="location" 
                      value={editFormData.location} 
                      onChange={handleEditChange} 
                    />
                  </label>
                  <label>
                    الحالة:
                    <select 
                      name="status" 
                      value={editFormData.status} 
                      onChange={handleEditChange}
                    >
                      <option value="قيد الانتظار">قيد الانتظار</option>
                      <option value="مقابلة">مقابلة</option>
                      <option value="مقبول">مقبول</option>
                      <option value="مرفوض">مرفوض</option>
                    </select>
                  </label>
                  <label>
                    ملاحظات:
                    <textarea 
                      name="notes" 
                      value={editFormData.notes} 
                      onChange={handleEditChange} 
                    ></textarea>
                  </label>

                  <div className="edit-actions">
                    <button type="submit">💾 حفظ</button>
                    <button type="button" onClick={cancelEditing}>❌ إلغاء</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <button 
                      className="favorite-btn" 
                      onClick={() => toggleFavorite(index)}
                      title="إضافة للمفضلة"
                    >
                      {job.favorite ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <p><strong>الشركة:</strong> {job.company}</p>
                  <p><strong>الموقع:</strong> {job.location || 'غير محدد'}</p>
                  <p><strong>الحالة:</strong> {job.status}</p>
                  {job.notes && <p><strong>ملاحظات:</strong> {job.notes}</p>}

                  <div className="job-actions">
                    <button onClick={() => startEditing(index)}>✏️ تعديل</button>
                    <button onClick={() => handleDelete(index)}>🗑️ حذف</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
