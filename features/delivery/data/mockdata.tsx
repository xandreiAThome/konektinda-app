export type DeliveryStatus = 'Incoming' | 'Processing' | 'Delivered' | 'Cancelled';

export interface DeliveryItem {
  id: number;
  name: string;
  price: number;
  date: string;
  action: 'arrow-right' | 'check' | 'close' | 'truck';
  status: DeliveryStatus;
  statusCategory: 'pending' | 'delivered';
  location: string;
}

const CUSTOMER_DELIVERIES: DeliveryItem[] = [
  // --- PENDING ITEMS (Left Screen) ---
  {
    id: 1,
    name: 'Product A',
    price: 100,
    date: '12.3km away',
    status: 'Incoming',
    statusCategory: 'pending',
    action: 'truck',
  },
  {
    id: 2,
    name: 'Product B',
    price: 100,
    date: '12.3km away',
    status: 'Incoming',
    statusCategory: 'pending',
    action: 'truck',
  },
  {
    id: 3,
    name: 'Product C',
    price: 100,
    date: 'Processing at [FACTORY]',
    status: 'Processing',
    statusCategory: 'pending',
    action: 'truck',
  },
  {
    id: 4,
    name: 'Product D',
    price: 100,
    date: 'Processing at [FACTORY]',
    status: 'Processing',
    statusCategory: 'pending',
    action: 'truck',
  },
  {
    id: 5,
    name: 'Product E',
    price: 100,
    date: 'Cancelled',
    status: 'Cancelled',
    statusCategory: 'pending',
    action: 'close',
  },

  // --- DELIVERED ITEMS (Right Screen) ---
  {
    id: 6,
    name: 'Product F',
    price: 100,
    date: 'Nov 12, 2025 5:31pm',
    status: 'Delivered',
    statusCategory: 'delivered',
    action: 'check',
  },
  {
    id: 7,
    name: 'Product G',
    price: 100,
    date: 'Nov 4, 2025 9:31pm',
    status: 'Delivered',
    statusCategory: 'delivered',
    action: 'check',
  },
  {
    id: 8,
    name: 'Product H',
    price: 100,
    date: 'Nov 2, 2025 3:21pm',
    status: 'Delivered',
    statusCategory: 'delivered',
    action: 'check',
  },
  {
    id: 9,
    name: 'Product I',
    price: 100,
    date: 'Oct 24, 2025 11:43am',
    status: 'Delivered',
    statusCategory: 'delivered',
    action: 'check',
  },
  {
    id: 10,
    name: 'Product J',
    price: 100,
    date: 'Oct 23, 2025 5:31pm',
    status: 'Delivered',
    statusCategory: 'delivered',
    action: 'check',
  },
];
