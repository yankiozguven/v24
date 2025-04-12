import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Burada gerçek bir API çağrısı yapılabilir
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#fad6a5] py-8 sm:py-12">
      <div className="max-w-[960px] mx-auto px-4">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b100e]">
            Yeni mekanlar, yeni etkinlikler. İlk öğrenen sen ol.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Bültenimize abone olun ve bölgenizdeki en son restoranlar ve yemek etkinlikleri hakkında özel güncellemeler alın.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-postanızı girin"
              className="flex-1 px-3 sm:px-4 py-2 rounded-xl border border-[#e7d4d0] focus:outline-none focus:ring-2 focus:ring-[#f96815] focus:ring-offset-2 text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 sm:px-6 py-2 bg-[#f96815] text-white rounded-xl font-medium hover:bg-[#d13415] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? 'Abone Olunuyor...' : 'Abone Ol'}
            </button>
          </form>

          {isSuccess && (
            <p className="text-green-600 font-medium text-sm sm:text-base">
              Abone olduğunuz için teşekkürler! Sizi güncel tutacağız.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
