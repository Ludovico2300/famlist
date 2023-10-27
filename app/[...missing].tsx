import { Link } from "expo-router";
import { useTailwind } from "tailwind-rn";

export default function NotFoundScreen() {
  const tw = useTailwind();
  return (
    <div style={tw("min-h-screen bg-white flex items-center justify-center")}>
      <div style={tw("text-center")}>
        <h1 style={tw("text-2xl font-bold")}>Oops!</h1>
        <p style={tw("text-lg")}>This screen doesn't exist.</p>
        <Link href="/" style={tw("text-blue-500 hover:underline")}>
          Go to home screen!
        </Link>
      </div>
    </div>
  );
}
