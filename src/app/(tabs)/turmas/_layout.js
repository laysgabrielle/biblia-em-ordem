import { Stack } from "expo-router";

export default function TurmasLayout()
{
    return    (
        <Stack screenOptions={{headerShown: false,}}>
            <Stack.Screen name="index" />
        </Stack>
    )
}