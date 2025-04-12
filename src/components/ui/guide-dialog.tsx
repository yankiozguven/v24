import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { motion, AnimatePresence } from "framer-motion";

interface GuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuideDialog({ open, onOpenChange }: GuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent className="bg-[#fdf2e4] border-neutral-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-[#1b100e]">Nasıl Kullanılır?</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-[#1b100e]">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  DineBot, yapay zeka destekli bir mekan arama asistanıdır. Size en uygun mekanı bulmanıza yardımcı olur.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold">Özellikler:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Doğal dil ile arama yapabilme</li>
                    <li>Detaylı mekan bilgileri</li>
                    <li>İnternette yer alan kullanıcı yorumlarının özeti</li>
                    <li>Tavsiyeler ve dikkat edilmesi gerekenler</li>
                    <li>Gireceğiniz özel istek komutları doğrultusunda arama yapabilme</li>
                    <li>Konum bazlı öneriler</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold">Nasıl Arama Yapılır?</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Arama kutusuna istediğiniz restoran özelliklerini yazın</li>
                    <li>Örnek: "Beşiktaş bölgesinde, manzaralı ve pizza konusunda iyi bir İtalyan restoranı"</li>
                    <li>Dilerseniz daha kısa bir arama komutu yazıp, "Geliştir" butonuyla önerilerimize göz atabilirsiniz (ör: Beşiktaş pizza)</li>
                    <li>Enter tuşuna basın veya gönder butonuna tıklayın</li>
                    <li>Size en uygun mekanları görüntüleyin</li>
                    <li>Görüntülediğiniz mekanların detaylı bilgi,yorum ve datalarını inceleyin</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
} 