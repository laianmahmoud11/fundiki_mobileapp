import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  activeTab: 'active' | 'past';
  setActiveTab: (value: 'active' | 'past') => void;
};

export default function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'active' && styles.activeTab,
        ]}
        onPress={() => setActiveTab('active')}
        activeOpacity={0.85}
      >
        <Text
          style={[
            styles.text,
            activeTab === 'active' && styles.activeText,
          ]}
        >
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'past' && styles.activeTab,
        ]}
        onPress={() => setActiveTab('past')}
        activeOpacity={0.85}
      >
        <Text
          style={[
            styles.text,
            activeTab === 'past' && styles.activeText,
          ]}
        >
          Past
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 10,
    gap: 12,
  },

  tab: {
    backgroundColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    backgroundColor: '#1f4ba5',
  },

  text: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});