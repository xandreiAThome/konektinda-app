import { Tabs } from 'expo-router';
import { HomeIcon, PlusCircleIcon, NetworkIcon } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Counter',
          tabBarIcon: ({ color, size }) => <PlusCircleIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="example"
        options={{
          title: 'Example Feature',
          tabBarIcon: ({ color, size }) => <NetworkIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
