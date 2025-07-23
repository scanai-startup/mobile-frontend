import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { StatusBar as OriginalBar, StatusBarProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomStatusBarProps {
  backgroundColor?: string;
}
interface NewStatusBarProps
  extends Omit<StatusBarProps, "backgroundColor">,
    CustomStatusBarProps {}

function StatusBarManager({
  barStyle,
  translucent = true,
  hidden = false,
}: StatusBarProps) {
  useFocusEffect(
    React.useCallback(() => {
      OriginalBar.setBarStyle(barStyle!, true);
      OriginalBar.setTranslucent(translucent);
      OriginalBar.setHidden(hidden);
    }, [barStyle, translucent, hidden]),
  );

  return null;
}
function StatusBarWrapper({ backgroundColor }: CustomStatusBarProps) {
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <OriginalBar />
    </SafeAreaView>
  );
}
export default function StatusBar({
  backgroundColor,
  ...props
}: NewStatusBarProps) {
  return (
    <>
      <StatusBarManager {...props} />
      <StatusBarWrapper backgroundColor={backgroundColor} />
    </>
  );
}
