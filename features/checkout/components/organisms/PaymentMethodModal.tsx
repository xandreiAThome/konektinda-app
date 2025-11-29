import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';

interface PaymentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMethod: string;
  onConfirm: (method: string) => void; // Renamed from onSelectMethod to be clearer
}

const PaymentOption = ({
  label,
  isSelected,
  onSelect,
}: {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.7}
    className="flex-row items-center border-b border-gray-100 py-3">
    <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-purple-100">
      <Text className="text-lg font-bold text-purple-600">A</Text>
    </View>
    <Text className="flex-1 font-sans text-base text-[#1e1e1e]">{label}</Text>

    {/* Simplified Logic for Checkbox */}
    <View
      className={`h-5 w-5 items-center justify-center rounded border ${isSelected ? 'border-[#EB5555] bg-[#EB5555]' : 'border-gray-400 bg-transparent'}`}>
      {isSelected && <Text className="text-xs font-bold text-white">✓</Text>}
    </View>
  </TouchableOpacity>
);

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  visible,
  onClose,
  selectedMethod,
  onConfirm,
}) => {
  // 1. Local State for the Modal
  const [internalSelection, setInternalSelection] = useState(selectedMethod);

  // 2. Sync state when modal opens
  useEffect(() => {
    if (visible) {
      setInternalSelection(selectedMethod);
    }
  }, [visible, selectedMethod]);

  const handleConfirm = () => {
    onConfirm(internalSelection); // Send final selection to parent
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* FIX: Absolute Backdrop - This catches clicks outside */}
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={onClose}
        />

        {/* Modal Content */}
        <View className="z-10 w-[85%] rounded-2xl bg-white p-6">
          <Text className="mb-6 text-center text-xl font-bold text-[#1e1e1e]">
            Choose Payment Method
          </Text>

          {/* Options update INTERNAL state */}
          <PaymentOption
            label="Cash On Delivery"
            isSelected={internalSelection === 'COD'}
            onSelect={() => setInternalSelection('COD')}
          />
          <PaymentOption
            label="GCash"
            isSelected={internalSelection === 'GCASH'}
            onSelect={() => setInternalSelection('GCASH')}
          />
          <PaymentOption
            label="Paymaya"
            isSelected={internalSelection === 'PAYMAYA'}
            onSelect={() => setInternalSelection('PAYMAYA')}
          />

          <View className="mt-8 flex-row justify-between px-2">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-sm font-bold text-[#EB5555]">Cancel</Text>
            </TouchableOpacity>

            {/* Confirm button saves changes */}
            <TouchableOpacity onPress={handleConfirm}>
              <Text className="text-sm font-bold text-[#EB5555]">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
