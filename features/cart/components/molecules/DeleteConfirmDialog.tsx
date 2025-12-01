import React from 'react';
import { Text } from 'react-native';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  productName,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Item</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Text>Are you sure you want to remove {productName} from your cart?</Text>
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onPress={onCancel} disabled={isLoading}>
            <Text>Cancel</Text>
          </Button>
          <Button variant="destructive" onPress={onConfirm} disabled={isLoading}>
            <Text>{isLoading ? 'Removing...' : 'Remove'}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
