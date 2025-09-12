"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, KeyRound, User } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {

    const [passwordShown, setPasswordShown] = useState(false)
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown)
    }

    const onSubmit = (values: LoginFormValues) => {
        console.log("Form submitted:", values);
        // 🔑 You can call your login API here
    };

    return (
        <div className="h-screen bg-cover bg-center bg-[url('/images/login.jpg')] flex flex-col items-center justify-center">
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/TafuriWhiteLogo.png"
                    alt="tafurilogo"
                    width={250}
                    height={250}
                    className="object-contain"
                />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-md shadow-lg p-8">
                <h1 className="text-[36px] font-bold text-center text-[#005D9E]">
                    Log In
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Sign in to your account
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        {/* Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <div className="bg-[#ebedef] p-2">
                                            <User className="text-gray-600" />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Username"
                                                autoComplete="username"
                                                className="h-10 rounded-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <div className="bg-[#ebedef] p-2">
                                            <KeyRound className="text-gray-600" />
                                        </div>
                                        <FormControl>
                                            <Input
                                                type={passwordShown ? 'Text' : 'Password'}
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                className="h-10 rounded-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <div className="bg-[#ebedef] p-2" onClick={togglePasswordVisiblity}>
                                            {passwordShown ? <Eye className="text-gray-600" /> : <EyeOff className="text-gray-600" />}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-[#0F75BC] text-white hover:bg-[#0d5d96] rounded-sm"
                        >
                            Log In
                        </Button>
                    </form>
                </Form>

                {/* Forgot Password */}
                <div className="mt-4 text-center">
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Forgotten password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
