"use client";

import { Button } from "@/components/ui/button";
import { getCroppedImg } from "@/components/ui/crop-utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
  imageSrc: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedImage: File) => void;
}

export function ImageCropper({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-[90%] rounded-xl sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Crop Avatar
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteHandler}
              onZoomChange={onZoomChange}
            />
          )}
        </div>
        <div className="space-y-4 py-4">
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Zoom
            </span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center sm:hidden">
            Pinch to zoom, drag to move
          </p>
        </div>
        <DialogFooter className="flex-row items-center gap-3 sm:space-x-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 mt-0 sm:mt-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isProcessing}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white border-none"
          >
            {isProcessing ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
