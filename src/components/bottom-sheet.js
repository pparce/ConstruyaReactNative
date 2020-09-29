import React from 'react';
import { View } from 'react-native';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Theme from '../assets/styles/theme';
import { Dialog } from 'react-native-paper';

export default function BoottomSheetComponent({ visible }) {
    const sheetRef = React.useRef(null);
    if (visible) {
        // sheetRef.current.snapTo(0)
    }

    return (
        <Dialog style={{ flex: 1, backgroundColor: Theme.colors.backdrop }}>
            <BottomSheetBehavior
                ref={sheetRef}
                snapPoints={[300, 0]}
                style={{
                    backgroundColor: '#f0f'
                }}
                initialSnap={1}
                enabledBottomInitialAnimation={true}
                borderRadius={10}

                renderContent={this.renderContent}
            />
        </Dialog>
    );
}