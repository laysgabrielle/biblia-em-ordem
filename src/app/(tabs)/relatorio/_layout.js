import { Stack } from "expo-router";

export default function RelatorioLayout()
{
    return    (
        <Stack screenOptions={{headerShown: false,}}>
            <Stack.Screen name="index" />
        </Stack>
    )
}