import LoginForm from "@/components/form/login/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="h-screen bg-cover bg-center bg-[url('/images/login.jpg')] flex flex-col items-center justify-center">
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/TafuriWhiteLogo.png"
                    alt="tafurilogo"
                    width={250}
                    height={250}
                    className="object-contain"
                    priority
                />
            </div>

            <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
                <h1 className="text-[36px] font-bold text-center text-[#005D9E]">Log In</h1>
                <p className="text-center text-gray-500 mt-2">Sign in to your account</p>

                <LoginForm />

                <div className="mt-4 text-center">
                    <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                        Forgotten password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
