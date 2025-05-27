import React, { useState } from 'react';
import './AddJob.css';
import { useUser } from '@clerk/clerk-react';

const AddJob = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'قيد الانتظار',
    notes: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من وجود مستخدم
    if (!user) {
      alert("يجب تسجيل الدخول لإضافة وظيفة.");
      return;
    }

    // تحضير البيانات مع ربط الوظيفة بالمستخدم
    const newJob = {
      ...formData,
      id: Date.now(),           // معرف فريد
      favorite: false,
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    // تخزين الوظائف
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    savedJobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(savedJobs)); 

    // رسالة نجاح وتهيئة النموذج
    setSuccess(true);
    setFormData({
      title: '',
      company: '',
      location: '',
      status: 'قيد الانتظار',
      notes: ''
    });

    // إزالة الرسالة بعد وقت
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div>
    <div className="add-job-container">
      <h2>➕ إضافة وظيفة جديدة</h2>

      {success && <div className="success-message">✅ تم حفظ الوظيفة بنجاح!</div>}

      <form onSubmit={handleSubmit} className="add-job-form">
        <label>
          المسمى الوظيفي:
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          اسم الشركة:
          <input 
            type="text" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          الموقع:
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
          />
        </label>

        <label>
          الحالة:
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
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
            value={formData.notes} 
            onChange={handleChange} 
          ></textarea>
        </label>

        <button type="submit">💾 حفظ الوظيفة</button>
      </form>
    </div>
    </div>
  );
};

export default AddJob;
