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
    <Link href={route} asChild>
      <TouchableOpacity className="bg-white justify-between rounded-lg h-32 w-36 px-4 py-6">
        {icon}
        <Text className="text-black text-xl font-medium leading-5">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
