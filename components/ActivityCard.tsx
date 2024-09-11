import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface ActivityCardProps {
  icon: any;
  title: string;
  route: string;
}

export default function ActivityCard({
  icon,
  title,
  route,
}: ActivityCardProps) {
  return (
    <Link
      style={{ paddingHorizontal: 10, paddingVertical: 20, width: 130 }}
      href={route}
      asChild
    >
      <TouchableOpacity className="bg-white justify-between rounded-lg px-20">
        {icon}
        <Text className="text-black text-xl font-medium leading-3">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
