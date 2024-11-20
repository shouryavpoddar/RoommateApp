import { SettingsScreenContent } from "@/PageElements/SettingsPage/SettingsScreen";
import { SettingsProvider } from "@/PageElements/SettingsPage/Context";

export default function SettingsScreen() {
    return (
        <SettingsProvider>
            <SettingsScreenContent />
        </SettingsProvider>
    );
}

