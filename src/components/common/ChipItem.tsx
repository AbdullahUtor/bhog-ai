
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import palette from '../../utils/colors.ts';

type ChipItem = {
  label: string;
  icon: string;
};

const chips: ChipItem[] = [
  { label: 'React', icon: 'https://reactnative.dev/img/tiny_logo.png' },
  { label: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
  { label: 'Flutter', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png' },
  { label: 'Node.js', icon: 'https://nodejs.org/static/images/logo.svg' },
  { label: 'GraphQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg' },
];

type ChipProps = {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, icon, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
  >
    <View style={styles.chipContent}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </View>
  </Pressable>
);

type ChipListProps = {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChipList: React.FC<ChipListProps> = ({ selectedItems, setSelectedItems }) => {
  const toggleChip = (label: string) => {
    setSelectedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrap}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip.label}
            icon={chip.icon}
            selected={selectedItems.includes(chip.label)}
            onPress={() => toggleChip(chip.label)}
          />
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    borderColor: palette.accent.accentDark,
    borderWidth: 1,
    paddingVertical: 11.5,
    paddingHorizontal: 16,
    borderRadius: 40,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: palette.accent.accentDark,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    color: '#000',
    fontWeight: '500',
    marginLeft: 8,
  },
  chipTextSelected: {
    color: '#fff',
  },
  icon: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

export default ChipList;
