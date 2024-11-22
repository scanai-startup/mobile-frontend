//TODO: try to make nativewind to work with those styles

import { BadgeAlert, BadgeCheck } from "lucide-react-native";
import { Text, View } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: 'white',
      width: '90%',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderLeftWidth: 8,
      borderLeftColor: "#22c55e",
    }}>
      <BadgeCheck color="#22c55e" size={40} />
      <View style={{
        maxWidth: '80%'
      }}>
        <Text className="font-bold text-xl">{props.text1}</Text>
        <Text  className="font-normal text-lg text-zinc-500">
          {props.text2}
        </Text>
      </View>
    </View>
  ),
  error: (props: any) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: 'white',
      width: '90%',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderLeftWidth: 8,
      borderLeftColor: "#ef4444",
    }}>
      <BadgeAlert color="#ef4444" size={40} />
      <View style={{
        maxWidth: '80%'
      }}>
        <Text className="font-bold text-xl">{props.text1}</Text>
        <Text className="font-normal text-lg text-zinc-500">
          {props.text2}
        </Text>
      </View>
    </View>
  ),
};
