
import React, { useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PDFViewer({ isOpen, onClose }: PDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    // Create object URL for viewing
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setPdfName(file.name);
    
    toast({
      title: "PDF uploaded",
      description: `"${file.name}" will be shown when you win the game`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/90 border border-melanie-purple/50 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {pdfUrl ? "Victory PDF" : "Upload Victory PDF"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        {pdfUrl ? (
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="bg-melanie-purple/20 rounded-lg p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-melanie-purple mr-2" />
                <span className="text-white">{pdfName}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-melanie-purple/50 text-white"
                onClick={() => {
                  setPdfUrl(null);
                  setPdfName('');
                }}
              >
                Change PDF
              </Button>
            </div>
            <div className="flex-1 bg-white rounded-lg overflow-hidden">
              <iframe 
                src={`${pdfUrl}#toolbar=0`} 
                className="w-full h-full" 
                title="PDF Viewer"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="mb-6 text-center">
              <FileText className="h-16 w-16 text-melanie-purple mx-auto mb-4" />
              <h3 className="text-lg text-white mb-2">Upload a PDF to display when you win</h3>
              <p className="text-gray-400 max-w-md">
                This PDF will be shown as a reward when you complete all 10 levels of the game.
              </p>
            </div>
            
            <label className="flex items-center justify-center w-64 p-4 border-2 border-dashed border-melanie-purple/50 rounded-lg cursor-pointer hover:bg-melanie-purple/10 transition-colors">
              <input 
                type="file" 
                accept="application/pdf" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <Upload className="h-6 w-6 mr-3 text-melanie-purple" />
              <span className="text-white">Select PDF File</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
