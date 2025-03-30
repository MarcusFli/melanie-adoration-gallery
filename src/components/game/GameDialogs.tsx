
import React from 'react';
import { Trophy, Cat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageLoader from '@/components/ImageLoader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GameDialogsProps {
  showAchievementDialog: boolean;
  setShowAchievementDialog: (show: boolean) => void;
}

const GameDialogs: React.FC<GameDialogsProps> = ({ 
  showAchievementDialog, 
  setShowAchievementDialog 
}) => {
  return (
    <>
      {/* Level 10 Achievement Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="bg-black border border-melanie-purple/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 text-melanie-purple">
              <Trophy className="h-6 w-6" /> ¡Logro Desbloqueado!
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Has alcanzado el nivel 10 y revelado la verdadera identidad del gato
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="relative w-64 h-64 mb-4 rounded-lg overflow-hidden border-4 border-melanie-purple/50 shadow-lg shadow-melanie-purple/30">
              <ImageLoader
                src="/lovable-uploads/f15488f5-ed08-4d00-9aee-533cd4744d7c.png"
                alt="Gato mágico"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Un gato mágico!</h3>
            <p className="text-center text-gray-300">
              Este gato especial tiene poderes místicos y ha elegido a Melanie como su compañera. ¡Completa todos los niveles para desbloquear su historia completa!
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              className="bg-melanie-purple hover:bg-melanie-purple/80"
              onClick={() => setShowAchievementDialog(false)}
            >
              Continuar la aventura
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Help dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="absolute bottom-4 right-4 bg-black/40 border-melanie-purple/30">
            ?
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black border border-melanie-purple/50 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cómo jugar</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              <ul className="list-disc pl-5 space-y-2">
                <li>Usa las flechas del teclado o los botones en pantalla para moverte</li>
                <li>Primero apuntas en la dirección que quieres ir, luego avanzas</li>
                <li>Encuentra al gato para pasar al siguiente nivel</li>
                <li>El objetivo es superar los 10 niveles</li>
                <li>Con cada nivel, el laberinto se hace más grande y complejo</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-melanie-purple hover:bg-melanie-purple/80">Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GameDialogs;
