import { SafeAreaView as SafeArea } from "react-native-safe-area-context";

export default function SafeAreaView(props: any) {
  return (
    <SafeArea
      style={{
        flex: 1,
        paddingHorizontal: 24,
      }}
    >
      {props.children}
    </SafeArea>
  );
}
