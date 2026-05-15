import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onPressButton?: () => void;
  hideButton?: boolean;
};

const EmptyState = ({
  title = 'No bookings yet',
  subtitle = 'Sign in or create an account to get started.',
  buttonText = 'Sign in',
  onPressButton,
  hideButton = false
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="calendar-outline"
          size={50}
          color="#1f4ba5"
        />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      {!hideButton && (
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },

  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    maxWidth: 300
  },

  button: {
    backgroundColor: '#1f4ba5',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
    minWidth: 140,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default EmptyState;