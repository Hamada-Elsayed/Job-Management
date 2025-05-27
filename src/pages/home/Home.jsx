import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { SignInButton } from '@clerk/clerk-react';

const Home = () => {

  const { user, isSignedIn } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!isSignedIn) return;
    setTimeout(() => {
      const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const userJobs = allJobs.filter(job => job.userId === user.id);

      const counts = {
        total: userJobs.length,
        pending: userJobs.filter(job => job.status === 'قيد الانتظار').length,
        interview: userJobs.filter(job => job.status === 'مقابلة').length,
        accepted: userJobs.filter(job => job.status === 'مقبول').length,
        rejected: userJobs.filter(job => job.status === 'مرفوض').length,
        favorites: userJobs.filter(job => job.favorite).length,
      };
      setStats(counts);
      setLoading(false);
    }, 1000);
  }, [isSignedIn, user]);


  if (!isSignedIn) {
    return (
      <div className="home-container">
        <h2>👋مرحبًا،</h2>
        <p>يرجي تسجيل الدخول لعرض بياناتك</p>
        <div>
        <SignInButton mode="modal">
            <button style={{ padding: '10px 20px', background: '#042c45', color: 'white', border: 'none', borderRadius: '5px' }}>
              تسجيل الدخول
            </button>
          </SignInButton>
        </div>
        <div className="stats-grid fade-in">
          <div className="stat-card"><h3>إجمالي الوظائف</h3><p>0</p></div>
          <div className="stat-card"><h3>قيد الانتظار</h3><p>0</p></div>
          <div className="stat-card"><h3>مقابلة</h3><p>0</p></div>
          <div className="stat-card"><h3>مقبول</h3><p>0</p></div>
          <div className="stat-card"><h3>مرفوض</h3><p>0</p></div>
          <div className="stat-card"><h3>المفضلة</h3><p>0</p></div>
        </div>
        
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>👋مرحبًا،{user.firstName || user.username || "مستخدم"}!</h2>
      <p>
        إليك ملخص وظائفك في النظام 👇
      </p>

      {loading ? (
        <div className="loader">جارٍ التحميل...</div>
      ) : (
        <div className="stats-grid fade-in">
          <div className="stat-card"><h3>إجمالي الوظائف</h3><p>{stats.total}</p></div>
          <div className="stat-card"><h3>قيد الانتظار</h3><p>{stats.pending}</p></div>
          <div className="stat-card"><h3>مقابلة</h3><p>{stats.interview}</p></div>
          <div className="stat-card"><h3>مقبول</h3><p>{stats.accepted}</p></div>
          <div className="stat-card"><h3>مرفوض</h3><p>{stats.rejected}</p></div>
          <div className="stat-card"><h3>المفضلة</h3><p>{stats.favorites}</p></div>
        </div>
      )}
    </div>
  );
};

export default Home;
