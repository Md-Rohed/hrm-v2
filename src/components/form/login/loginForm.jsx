"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, KeyRound, User } from "lucide-react";
import { useLoginMutation } from "@/api/client/auth";
import { useAllCompanyDetails } from "@/api/client/common";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });
    const router = useRouter();

    const { data: companyData, refetch: refetchCompanies } = useAllCompanyDetails({
        enabled: false,
    });

    const { isPending, mutate: login } = useLoginMutation({
        onSuccess: async (res) => {
            localStorage.setItem("w_auth", JSON.stringify(res.data));
            try {
                const { data } = await refetchCompanies(); // QueryObserverResult<Company[]>
                if (data) {
                    const array = [...data.sort((a, b) => {
                        return (a.id - b.id);
                    })];
                    const companyOptions = [];
                    array.map((item) => {
                        const temp = {};
                        temp.value = item.id;
                        temp.label = item.name;
                        temp.establishDate = item.establishDate;
                        temp.details = { ...item };
                        companyOptions.push(temp);

                        return true;
                    });
                    localStorage.setItem("company", JSON.stringify(companyOptions));
                }
            } catch (e) {
                console.error("Company refetch failed", e);
            }
            router.push("/");
        },
        onError: ({ message }) => console.error("Login failed:", message),
    });

    const onSubmit = (values: LoginFormValues) => login(values);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <div className="bg-[#ebedef] p-2"><User className="text-gray-600" /></div>
                                <FormControl>
                                    <Input placeholder="Username" autoComplete="username" className="h-10 rounded-none" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <div className="bg-[#ebedef] p-2"><KeyRound className="text-gray-600" /></div>
                                <FormControl>
                                    <Input
                                        type={passwordShown ? "text" : "password"}
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        className="h-10 rounded-none"
                                        {...field}
                                    />
                                </FormControl>
                                <button
                                    type="button"
                                    className="bg-[#ebedef] p-2"
                                    onClick={() => setPasswordShown((v) => !v)}
                                    aria-label={passwordShown ? "Hide password" : "Show password"}
                                >
                                    {passwordShown ? <Eye className="text-gray-600" /> : <EyeOff className="text-gray-600" />}
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full bg-[#0F75BC] text-white hover:bg-[#0d5d96] rounded-sm">
                    {isPending ? "Signing in…" : "Log In"}
                </Button>
            </form>
        </Form>
    );
}
