import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Brain, FileText, Target } from 'lucide-react';

function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Adım 1',
      content: 'Platformumuz, Google, TripAdvisor, YouTube ve Instagram gibi kaynaklardan restoran, kafe, bar ve lokantalara dair yapılan yorumları ve değerlendirme içeriklerini otomatik olarak tarar.',
      icon: Search
    },
    {
      title: 'Adım 2',
      content: 'Gelişmiş yapay zeka altyapımız, bu içerikleri analiz eder, tekrar eden görüşleri ayıklar, olumlu ve olumsuz yönleri belirler, yanıltıcı bilgileri filtreler.',
      icon: Brain
    },
    {
      title: 'Adım 3',
      content: 'Yapay zeka, her mekan için en güncel ve güvenilir içeriklerden yola çıkarak sade, anlaşılır ve kullanıcı dostu bir özet oluşturur. Bu sayede mekanın genel atmosferi ve hizmet kalitesi hızlıca anlaşılır.',
      icon: FileText
    },
    {
      title: 'Adım 4',
      content: 'Konumunuz, tercihleriniz ve istekleriniz analiz edilerek size en uygun mekanlar önerilir. Her öneri, detaylı özetler, istatistikler ve görsellerle desteklenir.',
      icon: Target
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] py-6 sm:py-12">
      <div className="max-w-xl mx-auto px-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">DineBot Nasıl Çalışır?</h1>
        
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white relative">
            <div className="absolute inset-0 border-2 border-[#f96815] rounded-lg animate-border-dance"></div>
            <div className="flex transition-transform duration-500 ease-in-out relative z-10" style={{ transform: `translateX(-${currentStep * 100}%)` }}>
              {steps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="aspect-square max-w-md mx-auto p-3 sm:p-6 flex flex-col justify-center items-center text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f96815] flex items-center justify-center mb-3 sm:mb-4">
                      <span className="text-lg sm:text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#f96815]" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h2>
                    <p className="text-gray-700 text-sm sm:text-base">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {currentStep > 0 && (
            <button 
              onClick={prevStep}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-md z-20"
              aria-label="Önceki adım"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          
          {currentStep < steps.length - 1 && (
            <button 
              onClick={nextStep}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 sm:p-2 rounded-full shadow-md z-20"
              aria-label="Sonraki adım"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          
          <div className="flex justify-center mt-3 sm:mt-4 space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  currentStep === index ? 'bg-[#f96815]' : 'bg-gray-300'
                }`}
                aria-label={`${index + 1}. adıma git`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes border-dance {
          0% {
            clip-path: inset(0 0 95% 0);
            border-color: #f96815;
          }
          25% {
            clip-path: inset(0 0 0 95%);
            border-color: #f96815;
          }
          50% {
            clip-path: inset(95% 0 0 0);
            border-color: #f96815;
          }
          75% {
            clip-path: inset(0 95% 0 0);
            border-color: #f96815;
          }
          100% {
            clip-path: inset(0 0 95% 0);
            border-color: #f96815;
          }
        }
        .animate-border-dance {
          animation: border-dance 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default HowItWorks;
