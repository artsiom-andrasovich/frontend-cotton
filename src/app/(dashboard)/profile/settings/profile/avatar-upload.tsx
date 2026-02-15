"use client";

import { Button } from "@/components/ui/button";
import { ImageCropper } from "@/components/ui/image-cropper";
import { Input } from "@/components/ui/input";
import { Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface AvatarUploadProps {
  avatarUrl?: string;
  isUploading: boolean;
  isDeleting: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

export function AvatarUpload({
  avatarUrl,
  isUploading,
  isDeleting,
  onUpload,
  onDelete,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload JPG, PNG, or WebP.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Max 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    onUpload(croppedFile);
    setSelectedImage(null); // Clear after upload
  };

  const handleCloseCropper = () => {
    setIsCropperOpen(false);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 overflow-hidden rounded-full ring-2 ring-border relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondary text-secondary-foreground">
              <span className="text-3xl text-muted-foreground">?</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-600"
              onClick={onDelete}
              disabled={isDeleting || !avatarUrl}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommend 800x800 px. Max 5MB.
          </p>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <ImageCropper
        imageSrc={selectedImage}
        isOpen={isCropperOpen}
        onClose={handleCloseCropper}
        onCropComplete={handleCropComplete}
      />
    </>
  );
}
