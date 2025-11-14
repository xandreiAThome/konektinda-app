import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../config/colors';
import { A_Image } from '../atoms/Image';
import { M_DeliveryCard } from '../molecules/DeliveryCard';

const KonektindaLogo = require('../../../../assets/images/KonekTinda_Logo.png');
const UserAvatar = require('../../../../assets/images/avatar_user.png');

const mockData = [
  {
    id: 1,
    name: 'Product A',
    price: 200,
    status: 'Incoming',
    statusColor: AppColors.StatusIncoming,
    date: '10:00 AM',
    action: 'arrow-right' as const,
  },
  {
    id: 2,
    name: 'Product B',
    price: 300,
    status: 'Processing',
    statusColor: AppColors.StatusProcessing,
    date: 'Yesterday',
    action: 'arrow-right' as const,
  },
  {
    id: 3,
    name: 'Product C',
    price: 100,
    status: 'Delayed',
    statusColor: AppColors.StatusDelayed,
    date: '1 week ago',
    action: 'close' as const,
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

  const renderSection = (title: string, data: typeof mockData) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item) => (
        <M_DeliveryCard
          key={item.id}
          productName={item.name}
          size="(500mL)"
          price={item.price}
          statusText={item.status}
          statusColor={item.statusColor}
          dateText={item.date}
          actionIconName={item.action}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      {/* Header Area (Logo, User Icon, Page Title) */}
      <View style={styles.header}>
        <A_Image source={KonektindaLogo} style={styles.logo} />
        <Text style={styles.pageTitle}>
          {`[${isCustomer ? 'CARINDERIA OWNER' : 'SUPPLIER'}] Delivery Page (${isDelivered ? 'Delivered' : 'Pending'})`}
        </Text>
      </View>

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
                { color: isDelivered ? AppColors.TextPrimary : AppColors.TextSecondary },
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
                { color: !isDelivered ? AppColors.TextPrimary : AppColors.TextSecondary },
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
                'Incoming',
                mockData.filter((d) => d.status === 'Incoming')
              )}
              {renderSection(
                'Processing',
                mockData.filter((d) => d.status === 'Processing')
              )}
              {renderSection(
                'Delayed/Cancelled',
                mockData.filter((d) => d.status === 'Delayed')
              )}
            </>
          )}
          {!isDelivered && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No pending deliveries found.</Text>
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
    backgroundColor: AppColors.CardBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  deliveryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: AppColors.TextPrimary,
  },
  topTabs: {
    flexDirection: 'row',
    backgroundColor: AppColors.GrayLight,
    borderRadius: 20,
    marginBottom: 20,
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  topTabActive: {
    backgroundColor: AppColors.White,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
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
    paddingVertical: 10,
    color: AppColors.TextPrimary,
  },
});
