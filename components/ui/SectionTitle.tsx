import { Text, View } from 'react-native';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={{ marginBottom: 14, marginHorizontal: 16, marginTop: 28 }}>
      <Text
        style={{
          color: '#0D3B95',
          fontFamily: 'Poppins_700Bold',
          fontSize: 28,
          letterSpacing: -0.4,
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            color: '#5C6B89',
            fontFamily: 'Poppins_400Regular',
            fontSize: 14,
            marginTop: 6,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
