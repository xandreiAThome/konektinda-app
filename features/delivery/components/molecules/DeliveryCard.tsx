import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AppColors } from '../../../../config/colors';

interface DeliveryCardProps {
  productName: string;
  size: string;
  price: number;
  statusText: string;
  statusColor: string;
  dateText: string;
  actionIconName: 'arrow-right' | 'check' | 'close';
}

export const M_DeliveryCard: React.FC<DeliveryCardProps> = ({
  productName,
  size,
  price,
  statusText,
  statusColor,
  dateText,
  actionIconName,
}) => {
  // Using a simplified icon placeholder since we don't have MaterialCommunityIcons here
  const ActionIcon = () => {
    if (actionIconName === 'check')
      return <Text style={{ color: AppColors.StatusIncoming, fontSize: 24 }}>✔</Text>;
    if (actionIconName === 'close')
      return <Text style={{ color: AppColors.StatusDelayed, fontSize: 24 }}>✖</Text>;
    return <Text style={{ color: AppColors.TextSecondary, fontSize: 24 }}>➔</Text>; // Default arrow
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.productName}>{productName}</Text>
        <ActionIcon />
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.priceText}>P{price.toFixed(2)}</Text>
        <Text style={styles.dateText}>{dateText}</Text>
      </View>

      <View style={[styles.statusPill, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.CardBackground,
    padding: 15,
    borderRadius: 21,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AppColors.GrayLight,

    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, //for android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.TextPrimary,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  priceText: {
    fontSize: 14,
    color: AppColors.TextPrimary,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: AppColors.TextSecondary,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  statusText: {
    color: AppColors.White,
    fontSize: 11,
    fontWeight: 'bold',
  },
});
