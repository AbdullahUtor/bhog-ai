import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={openSheet} />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <View style={styles.content}>
          <Text>This is a dummy bottom sheet!</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
