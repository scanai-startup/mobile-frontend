import { SafeAreaView, StatusBar, StatusBarProps, View } from "react-native";
interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor?: string;
}

export default function CustomStatusBar({
  backgroundColor,
  ...props
}: CustomStatusBarProps) {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  return (
    <View style={[{ height: STATUSBAR_HEIGHT }, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
}
