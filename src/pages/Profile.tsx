import { useEffect } from 'react';

function Profile() {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0); // Sayfa yüklendiğinde en üstüne kaydır
    };

    handleScrollToTop(); // Sayfa yüklendiğinde kaydırma işlemi

    // Eğer sayfa değişiklikleri olursa, kaydırma işlemini tekrar yap
    window.addEventListener('popstate', handleScrollToTop);

    return () => {
      window.removeEventListener('popstate', handleScrollToTop); // Temizleme işlemi
    };
  }, []);

  return (
    <div>
      {/* Header kısmı */}
      <header>
        <h1>Profil Sayfası</h1>
        {/* Diğer header içeriği */}
      </header>
      {/* Profil içeriği */}
    </div>
  );
}

export default Profile; 