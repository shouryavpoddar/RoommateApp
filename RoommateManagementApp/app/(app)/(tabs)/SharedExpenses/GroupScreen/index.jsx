import { View, Text } from "react-native";
import GroupPage from "@/PageElements/ExpensesPage/Pages/GroupExpenses";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function GroupScreen() {
    // const router = useRouter();
    // const { name, friendId } = router.query;
    const { name, friendId } = useLocalSearchParams();

    return (
        <GroupPage name={name} friendId={friendId}/>
    );
}