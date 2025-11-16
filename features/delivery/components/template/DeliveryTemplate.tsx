import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../config/colors';
import { M_DeliveryCard } from '../molecules/DeliveryCard';

const mockData = [
  {
    id: 12,
    name: 'Product K',
    quantity: 4,
    unitPrice: 21.36,
    status: 'Incoming',
    statusColor: AppColors.StatusIncoming,
    rightText: '2.2Km',
    action: 'truck' as const,
  },
  {
    id: 1,
    name: 'Product A',
    quantity: 4,
    unitPrice: 200.366,
    status: 'Incoming',
    statusColor: AppColors.StatusIncoming,
    rightText: '12.3Km',
    action: 'truck' as const,
  },
  {
    id: 13,
    name: 'Product L',
    quantity: 4,
    unitPrice: 173.32,
    status: 'Processing',
    statusColor: AppColors.StatusProcessing,
    rightText: 'Preparing at [Factory B]',
    action: 'process' as const,
  },
  {
    id: 2,
    name: 'Product B',
    quantity: 2,
    unitPrice: 300,
    status: 'Processing',
    statusColor: AppColors.StatusProcessing,
    rightText: 'Preparing at [Factory A]',
    action: 'process' as const,
  },
  {
    id: 3,
    name: 'Product C',
    quantity: 1,
    unitPrice: 100,
    status: 'Delayed',
    statusColor: AppColors.StatusDelayed,
    rightText: 'Delayed',
    action: 'delay' as const,
  },
  {
    id: 4,
    name: 'Product D',
    quantity: 12,
    unitPrice: 332.442,
    status: 'Cancelled',
    statusColor: AppColors.StatusDelayed,
    rightText: 'Cancelled',
    action: 'cancel' as const,
  },
  {
    id: 5,
    name: 'Product E',
    quantity: 7,
    unitPrice: 5,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/12/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 6,
    name: 'Product F',
    quantity: 72,
    unitPrice: 21,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/4/2025 2:21pm',
    action: 'check' as const,
  },
  {
    id: 7,
    name: 'Product G',
    quantity: 1,
    unitPrice: 60,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/2/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 8,
    name: 'Product H',
    quantity: 25,
    unitPrice: 2,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/2/2025 10:23am',
    action: 'check' as const,
  },
  {
    id: 9,
    name: 'Product I',
    quantity: 2,
    unitPrice: 34,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/24/2025 11:43am',
    action: 'check' as const,
  },
  {
    id: 10,
    name: 'Product J',
    quantity: 3,
    unitPrice: 37,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/23/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 11,
    name: 'Product K',
    quantity: 4,
    unitPrice: 21,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/21/2025 2:22pm',
    action: 'check' as const,
  },
];

interface DeliveryTemplateProps {
  theme: 'supplier' | 'customer';
  pageState: 'delivered' | 'pending';
  setPageState: (state: 'delivered' | 'pending') => void;
}

export const DeliveryTemplate: React.FC<DeliveryTemplateProps> = ({
  theme,
  pageState,
  setPageState,
}) => {
  const isCustomer = theme === 'customer';
  const themeColor = isCustomer ? AppColors.CustomerBackground : AppColors.SupplierBackground;
  const isDelivered = pageState === 'delivered';

  const renderSection = (title: string, data: typeof mockData, sectionColor: string) => {
    // 🔑 FIX: Add conditional return for empty data
    if (data.length === 0) {
      return (
        <View style={styles.section} key={title}>
          {/* Section title/pill */}
          {title !== 'Delivered' && (
            <Text style={[styles.sectionTitle, { backgroundColor: sectionColor }]}>{title}</Text>
          )}

          {/* Message for empty state */}
          <Text style={styles.emptyMessageText}>No {title.toLowerCase()} items available.</Text>
        </View>
      );
    }

    // Original rendering logic for non-empty data
    return (
      <View style={styles.section} key={title}>
        {title !== 'Delivered' && (
          <Text style={[styles.sectionTitle, { backgroundColor: sectionColor }]}>{title}</Text>
        )}
        {data.map((item) => (
          <M_DeliveryCard
            key={item.id}
            productName={item.name}
            quantity={item.quantity}
            unitPrice={item.unitPrice}
            statusText={item.status}
            statusColor={item.statusColor}
            rightText={item.rightText}
            actionIconName={item.action}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <Text style={styles.deliveryTitle}>Deliveries</Text>

        {/* Delivered / Pending Tabs */}
        <View style={styles.topTabs}>
          <TouchableOpacity
            style={[styles.topTab, isDelivered && styles.topTabActive]}
            onPress={() => setPageState('delivered')}>
            <Text
              style={[
                styles.topTabText,
                { color: isDelivered ? AppColors.ActiveTabText : AppColors.NonActiveTabText },
              ]}>
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.topTab, !isDelivered && styles.topTabActive]}
            onPress={() => setPageState('pending')}>
            <Text
              style={[
                styles.topTabText,
                { color: !isDelivered ? AppColors.ActiveTabText : AppColors.NonActiveTabText },
              ]}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Delivery List */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Render different sections based on state */}
          {isDelivered && (
            <>
              {renderSection(
                'Delivered',
                mockData.filter((d) => d.status === 'Delivered'),
                AppColors.StatusIncoming
              )}
            </>
          )}
          {!isDelivered && (
            <>
              {renderSection(
                'Incoming',
                mockData.filter((d) => d.status === 'Incoming'),
                AppColors.StatusIncoming
              )}
              {renderSection(
                'Processing',
                mockData.filter((d) => d.status === 'Processing'),
                AppColors.StatusProcessing
              )}
              {renderSection(
                'Delayed/Cancelled',
                mockData.filter((d) => ['Delayed', 'Cancelled'].includes(d.status)),
                AppColors.StatusDelayed
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120, // Fixed height for header area
  },
  logo: {
    width: 150,
    height: 50,
  },
  pageTitle: {
    color: AppColors.White,
    fontSize: 12,
  },
  contentCard: {
    flex: 1,
    width: '100%',
    backgroundColor: AppColors.White,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  deliveryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 15,
    color: AppColors.TitleDelivery,
  },
  topTabs: {
    flexDirection: 'row',
    backgroundColor: AppColors.GrayLight,
    borderRadius: 20,
    marginBottom: 20,
    columnGap: 10,
  },
  topTab: {
    backgroundColor: AppColors.TopTabInactive,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,

    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, //for Android
  },
  topTabActive: {
    backgroundColor: AppColors.TopTabActive,
  },
  topTabText: {
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.StatusText,

    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 11,
  },
  emptyMessageText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    color: AppColors.TextSecondary,
  },
});
