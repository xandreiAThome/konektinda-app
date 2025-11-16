import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppColors } from '../../../../config/colors';
import { Feather, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const IconPlaceholder = require('../../../../assets/images/icon-placeholder.png');

interface DeliveryCardProps {
  productName: string;
  quantity: number;
  unitPrice: number;
  statusText: string;
  statusColor: string;
  rightText: string;
  actionIconName: 'truck' | 'process' | 'delay' | 'cancel' | 'dash' | 'check';
}

export const M_DeliveryCard: React.FC<DeliveryCardProps> = ({
  productName,
  quantity,
  unitPrice,
  statusText,
  statusColor,
  rightText,
  actionIconName,
}) => {
  const ActionIcon = () => {
    if (actionIconName === 'truck') return <Feather name="truck" size={27} color="black" />;
    if (actionIconName === 'process') return <FontAwesome name="gears" size={27} color="black" />;
    if (actionIconName === 'delay')
      return <MaterialIcons name="assignment-late" size={27} color="black" />;
    if (actionIconName === 'cancel')
      return <MaterialIcons name="cancel-presentation" size={27} color="black" />;
    if (actionIconName === 'check') return <Feather name="check-square" size={27} color="black" />;
    return <AntDesign name="dash" size={27} color="black" />; // unknown icon
  };

  const isIncoming = statusText === 'Incoming';

  return (
    <View style={styles.card}>
      {/* Left column: image placeholder (fixed length) */}
      <View style={styles.columnImage}>
        <Image source={IconPlaceholder} style={styles.placeholderImage} resizeMode="contain" />
      </View>

      {/* midlle column: product info (dynamic length) */}
      <View style={styles.columnInfo}>
        <Text style={styles.productName}>
          {productName} {''}
          <Text style={styles.quantityText}>
            {'(x'}
            {quantity}
            {')'}
          </Text>
        </Text>
        <Text style={styles.priceText}>₱{(quantity * unitPrice).toFixed(2)}</Text>
      </View>

      {/* right column: delivery status (fixed length) */}
      <View style={styles.columnStatus}>
        <ActionIcon />
        {isIncoming ? (
          <Text style={styles.distanceText}>
            <Text>{rightText}</Text>
            <Text style={{ color: AppColors.TextSecondary }}>{' away'}</Text>
          </Text>
        ) : (
          <Text style={styles.deliveryActionText}>{rightText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.CardBackground,
    padding: 10,
    borderRadius: 21,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: AppColors.CardBackground,
    height: 80,
    width: '100%',

    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, //for android

    overflow: 'hidden',
  },
  // -- left column: image placeholder --
  columnImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    //backgroundColor: 'red', //AppColors.GrayLight || '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeholderImage: {
    width: '80%',
    height: '80%',
  },

  // -- middle column: product info --
  columnInfo: {
    flex: 1, //takes all available space
    justifyContent: 'center',
    paddingRight: 10,
    //backgroundColor: 'green',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.TextPrimary || '#333333',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: AppColors.TextPrimary || '#333333',
  },
  priceText: {
    fontSize: 16,
    color: AppColors.CardText || 'FF0000',
    fontWeight: 'bold',
    marginTop: 3,
  },

  // -- right column: delivery status --
  columnStatus: {
    //backgroundColor: 'blue',
    alignItems: 'center',
    width: 90, //ensures icons don't wrap text
    height: 60,
    marginLeft: 5,
    marginTop: 10,
  },
  deliveryActionText: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
    color: AppColors.TextSecondary || '#888888',
  },
  distanceText: {
    fontWeight: '600',
    color: AppColors.CardText || '#FF0000',
    fontStyle: 'italic',
  },
});
